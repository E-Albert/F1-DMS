// Import tools we need: axios for HTTP requests, React for the component, and routing helpers
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// This component lets us edit an existing driver's information
export default function EditDriverForm() {
  const navigate = useNavigate(); // Allows redirecting after submitting
  const { id } = useParams(); // Gets the ID of the driver from the URL

  // The state that holds all the input values for the driver
  const [driver, setDriver] = useState({
    driverName: "",
    driverNumber: "",
    currentTeam: "",
    age: "",
    nationality: "",
    numberOfRaces: "",
    numberOfWins: "",
    isActiveDriver: "",
    height: "",
    careerPoints: "",
  });

  // These are variables pulled out of the driver object for easier use in JSX
  const {
    driverName,
    driverNumber,
    currentTeam,
    age,
    nationality,
    numberOfRaces,
    numberOfWins,
    isActiveDriver,
    height,
    careerPoints,
  } = driver;

  // When input fields change, this function updates the corresponding state value
  const onInputChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  // This runs when the user submits the form
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    // Convert strings to numbers/booleans before sending to the server
    const processedDriver = {
      ...driver,
      driverNumber: Number(driver.driverNumber),
      age: Number(driver.age),
      numberOfRaces: Number(driver.numberOfRaces),
      numberOfWins: Number(driver.numberOfWins),
      height: parseFloat(driver.height),
      careerPoints: Number(driver.careerPoints),
      isActiveDriver: driver.isActiveDriver === "true",
    };

    // Send the updated driver to the backend and redirect to home page
    await axios.put(`http://localhost:8080/drivers/${id}`, processedDriver);
    alert("Edit successful!"); // ✅ Show a success message
    navigate("/");
    console.log("Submitted Driver:", processedDriver);
  };

  // When the page loads, fetch the driver's current data by ID
  useEffect(() => {
    loadUser();
  }, []);

  // Function to get driver data from backend
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/drivers/${id}`);
    setDriver(result.data);
  };

  // This is the layout for the edit form
  return (
    <div
      className="d-flex justify-content-center align-items-start mt-5"
      style={{ minHeight: "100vh" }}
    >
      <form
        onSubmit={onSubmit}
        className="border p-4 rounded shadow mt-4"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h3 className="text-center mb-4">Edit Driver</h3>

        {/* Form fields for each property */}
        {/* Each has a value and onChange handler to keep the state updated */}
        <div className="mb-3">
          <label htmlFor="driverName" className="form-label">
            Driver Name
          </label>
          <input
            id="driverName"
            type="text"
            className="form-control"
            name="driverName"
            placeholder="Enter name"
            value={driverName}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driverNumber" className="form-label">
            Driver Number
          </label>
          <input
            id="driverNumber"
            type="number"
            className="form-control"
            name="driverNumber"
            placeholder="Enter number"
            value={driverNumber}
            onChange={onInputChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="currentTeam" className="form-label">
            Current Team
          </label>
          <input
            id="currentTeam"
            type="text"
            className="form-control"
            name="currentTeam"
            placeholder="Team name"
            value={currentTeam}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            className="form-control"
            name="age"
            placeholder="Driver age"
            value={age}
            onChange={onInputChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nationality" className="form-label">
            Nationality
          </label>
          <input
            id="nationality"
            type="text"
            className="form-control"
            name="nationality"
            placeholder="Country"
            value={nationality}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numberOfRaces" className="form-label">
            Number of Races
          </label>
          <input
            id="numberOfRaces"
            type="number"
            className="form-control"
            name="numberOfRaces"
            placeholder="Total races"
            value={numberOfRaces}
            onChange={onInputChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numberOfWins" className="form-label">
            Races Won
          </label>
          <input
            id="numberOfWins"
            type="number"
            className="form-control"
            name="numberOfWins"
            placeholder="Wins"
            value={numberOfWins}
            onChange={onInputChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="isActiveDriver" className="form-label">
            Is Active?
          </label>
          <select
            id="isActiveDriver"
            className="form-select"
            name="isActiveDriver"
            value={isActiveDriver}
            onChange={onInputChange}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Height (meters)
          </label>
          <input
            id="height"
            type="number"
            step="0.01"
            className="form-control"
            name="height"
            placeholder="e.g., 1.78"
            value={height}
            onChange={onInputChange}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="careerPoints" className="form-label">
            Career Points
          </label>
          <input
            id="careerPoints"
            type="number"
            className="form-control"
            name="careerPoints"
            placeholder="Total points"
            value={careerPoints}
            onChange={onInputChange}
            min="0"
            step="any"
          />
        </div>

        {/* Submit and cancel buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary w-45">
            Submit
          </button>
          <Link to="/" className="btn btn-danger w-45">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

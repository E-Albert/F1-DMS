// We need React and some tools from React Router and Axios to make things work
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// This is our main component where we add a driver
export default function AddDriver() {
  const navigate = useNavigate(); // helps us go to a different page after submitting

  // We create a "driver" object to store all the info the user types in
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

  // These are just shortcuts so we don't have to type driver.driverName every time
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

  // When the user types in an input, we update the "driver" object
  const onInputChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  // This function runs when the user submits the form
  const onSubmit = async (e) => {
    e.preventDefault(); // stops the page from refreshing

    // Check if any field is empty. If it is, show an alert and stop.
    if (
      !driverName ||
      !driverNumber ||
      !currentTeam ||
      !age ||
      !nationality ||
      !numberOfRaces ||
      !numberOfWins ||
      !isActiveDriver ||
      !height ||
      !careerPoints
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      // Convert the numbers from text to actual numbers
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

      // Send the driver's info to the backend (server)
      await axios.post("http://localhost:8080/drivers", processedDriver);
      alert("Driver added successfully!"); // Show a happy message
      navigate("/"); // Go back to the home page
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to add driver. Please try again."); // Show an error message
    }
  };

  // This function is for uploading a .txt file with many drivers inside
  const handleBulkUpload = (event) => {
    const file = event.target.files[0]; // get the file

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const fileContent = e.target.result.trim(); // read the file
          const driversArray = JSON.parse(fileContent); // try to turn it into an array

          if (!Array.isArray(driversArray))
            throw new Error("Data must be an array");

          // Send each driver in the array to the backend
          for (const d of driversArray) {
            await axios.post("http://localhost:8080/drivers", d);
          }

          alert("All drivers uploaded successfully!");
          navigate("/");
        } catch (err) {
          console.error("Upload error:", err);
          alert(
            "Upload failed. Please make sure the file contains valid JSON data."
          );
        }
      };

      reader.readAsText(file); // start reading the file
    }
  };

  // This is what the page looks like on screen
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
        <h3 className="text-center mb-4">Add New Driver</h3>

        {/* Each of these is one question on the form */}
        {/* When the user types something, it updates the state */}
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

        {/* Upload a .txt file with many drivers at once */}
        <div className="mb-4">
          <label htmlFor="bulkUpload" className="form-label">
            Upload Multiple Drivers (.txt)
          </label>
          <input
            type="file"
            accept=".txt"
            className="form-control"
            id="bulkUpload"
            onChange={handleBulkUpload}
          />
        </div>

        {/* Submit or Cancel buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary w-50 me-2">
            Submit
          </button>
          <Link to="/" className="btn btn-danger w-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

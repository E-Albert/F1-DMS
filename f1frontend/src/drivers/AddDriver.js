import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddDriver() {

    let navigate = useNavigate()

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

  const onInputChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

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
      await axios.post("http://localhost:8080/driver", driver);
      navigate("/")

    console.log("Submitted Driver:", processedDriver);
  };

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
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-secondary">
            Load from File
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

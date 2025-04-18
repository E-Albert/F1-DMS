// Import the tools we need to use React, work with routes, and fetch data
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// This component displays all drivers and lets you edit any of them
export default function EditDriver() {
  // Set up a state to hold all the drivers from the backend
  const [drivers, setDrivers] = useState([]);

  // When the page first loads, get the list of drivers
  useEffect(() => {
    loadDrivers();
  }, []);

  // This function fetches the list of drivers from the backend
  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/drivers");
    setDrivers(result.data); // Save the drivers into state
  };

  return (
    <div className="container py-5">
      {/* Page title */}
      <h2 className="text-center mb-4">Edit Driver</h2>

      {/* Table that holds all driver info */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          {/* Table headings */}
          <thead className="table-secondary">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Number</th>
              <th>Team</th>
              <th>Age</th>
              <th>Nationality</th>
              <th>Total Races</th>
              <th>Wins</th>
              <th>Active</th>
              <th>Height (m)</th>
              <th>Career Points</th>
              <th>Edit</th>
            </tr>
          </thead>

          {/* Table body: show one row per driver */}
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{driver.driverName}</td>
                <td>{driver.driverNumber}</td>
                <td>{driver.currentTeam}</td>
                <td>{driver.age}</td>
                <td>{driver.nationality}</td>
                <td>{driver.numberOfRaces}</td>
                <td>{driver.numberOfWins}</td>
                <td>{driver.isActiveDriver ? "true" : "false"}</td>
                <td>{driver.height}</td>
                <td>{driver.careerPoints}</td>

                {/* Edit button - links to the edit form for this driver */}
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editDriverForm/${driver.id}`} // Goes to the edit form page for this driver
                  >
                    <i className="bi bi-pencil-square"></i> {/* Bootstrap edit icon */}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to return to the homepage */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-danger">
          Return Home
        </Link>
      </div>
    </div>
  );
}

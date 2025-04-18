// Import React, hooks, axios for API calls, and routing tools
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// This component displays all drivers and their win ratios
export default function ViewDriver() {
  // State that holds the drivers and their win-to-race ratio
  const [driversWithRatio, setDriversWithRatio] = useState([]);

  // Load drivers when the page first loads
  useEffect(() => {
    loadDrivers();
  }, []);

  // This function gets all drivers and also fetches each driver's win ratio
  const loadDrivers = async () => {
    try {
      // Get all drivers from backend
      const result = await axios.get("http://localhost:8080/drivers");
      const drivers = result.data;

      // For each driver, also get their win ratio using another API call
      const driversWithRatio = await Promise.all(
        drivers.map(async (driver) => {
          try {
            // Ask backend for the win-to-race ratio of the current driver
            const ratioResponse = await axios.get(
              `http://localhost:8080/drivers/${driver.id}/ratio`
            );
            const winRatio = ratioResponse.data;

            // Add the winRatio to the driver object
            return { ...driver, winRatio };
          } catch (error) {
            // If something goes wrong, log it and return "N/A" for ratio
            console.error(
              `Error fetching ratio for driver ${driver.id}`,
              error
            );
            return { ...driver, winRatio: "N/A" };
          }
        })
      );

      // Save all drivers with their ratios in state
      setDriversWithRatio(driversWithRatio);
    } catch (err) {
      console.error("Error loading drivers:", err);
    }
  };

  // This is the UI part: show all drivers in a table
  return (
    <div className="container py-5">
      {/* Page title */}
      <h2 className="text-center mb-4">All Drivers</h2>

      {/* Responsive table container */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          {/* Table header */}
          <thead className="table-secondary">
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Team</th>
              <th scope="col">Age</th>
              <th scope="col">Nationality</th>
              <th scope="col">Total Races</th>
              <th scope="col">Wins</th>
              <th scope="col">Active</th>
              <th scope="col">Height (m)</th>
              <th scope="col">Career Points</th>
              <th scope="col">Win %</th>
            </tr>
          </thead>

          {/* Table body showing each driver */}
          <tbody>
            {driversWithRatio.map((driver, index) => (
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
                <td>
                  {/* Show win percentage if available, otherwise show N/A */}
                  {driver.winRatio !== "N/A"
                    ? (driver.winRatio * 100).toFixed(2) + "%"
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to return to homepage */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-danger">
          Return Home
        </Link>
      </div>
    </div>
  );
}
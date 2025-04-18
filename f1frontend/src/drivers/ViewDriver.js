import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewDriver() {
 const [driversWithRatio, setDriversWithRatio] = useState([]);


  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/drivers");
      const drivers = result.data;

      // Now get win ratio for each driver
      const driversWithRatio = await Promise.all(
        drivers.map(async (driver) => {
          try {
            const ratioResponse = await axios.get(
              `http://localhost:8080/drivers/${driver.id}/ratio`
            );
            const winRatio = ratioResponse.data;
            return { ...driver, winRatio };
          } catch (error) {
            console.error(
              `Error fetching ratio for driver ${driver.id}`,
              error
            );
            return { ...driver, winRatio: "N/A" };
          }
        })
      );

      setDriversWithRatio(driversWithRatio);
    } catch (err) {
      console.error("Error loading drivers:", err);
    }
  };


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Drivers</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
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
                  {driver.winRatio !== "N/A"
                    ? (driver.winRatio * 100).toFixed(2) + "%"
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-danger">
          Return Home
        </Link>
      </div>
    </div>
  );
}

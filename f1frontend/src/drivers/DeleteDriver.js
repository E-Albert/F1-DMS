// Import necessary tools from React and routing
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// This component displays all drivers and lets you delete one
export default function DeleteDriver() {
  const { id } = useParams(); // Grabs ID from URL if needed later

  // List of drivers
  const [drivers, setDrivers] = useState([]);

  // Driver selected for deletion
  const [driverToDelete, setDriverToDelete] = useState(null);

  // Load drivers on component mount
  useEffect(() => {
    loadDrivers();
  }, []);

  // Get all drivers from backend
  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/drivers");
    setDrivers(result.data);
  };

  // Confirm and delete selected driver
  const confirmDeleteDriver = async () => {
    if (!driverToDelete) return;
    await axios.delete(`http://localhost:8080/drivers/${driverToDelete.id}`);
    setDriverToDelete(null); // Close modal
    loadDrivers(); // Refresh list
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Delete Driver</h2>

      {/* Table to show all driver info */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
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
              <th>Delete</th>
            </tr>
          </thead>
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
                <td>
                  <button
                    className="btn btn-outline-danger mx-2"
                    onClick={() => setDriverToDelete(driver)} // Triggers modal
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Modal to confirm deletion */}
      {driverToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDriverToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{driverToDelete.driverName}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDriverToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteDriver}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button to return home */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-danger">
          Return Home
        </Link>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function EditDriver() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/drivers");
      setDrivers(result.data);
  };

  return (
    <div>
      <table className="table">
        <thead>
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
            <th scope="col">Height(m)</th>
            <th scope="col">Career Points</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{driver.driverName}</td>
              <td>{driver.driverNumber}</td>
              <td>{driver.currentTeam}</td>
              <td>{driver.age}</td>
              <td>{driver.nationality}</td>
              <td>{driver.numberOfRaces}</td>
              <td>{driver.numberOfWins}</td>
              <td>{driver.isActiveDriver === true ? "true" : "false"}</td>
              <td>{driver.height}</td>
              <td>{driver.careerPoints}</td>
              <td>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/editDriverForm/${driver.id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="btn btn-danger">
        Return Home
      </Link>
    </div>
  );
}

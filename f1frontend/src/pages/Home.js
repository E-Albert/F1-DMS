// Import React and Link for building the home page and routing to other pages
import React from "react";
import { Link } from "react-router-dom";

// This is the main Home page component
export default function Home() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Image Column */}
          <div className="col-md-4 text-center">
            <img
              src="../images/f1car-removebg-preview.png"
              alt="f1 car"
              className="img-fluid"
            />
          </div>

          {/* Middle Column with Navigation Buttons */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            {/* Button to go to Add Drivers page */}
            <Link className="btn btn-outline-danger my-2 w-75" to="/addDrivers">
              Add Drivers
            </Link>

            {/* Button to go to View All Drivers page */}
            <Link
              className="btn btn-outline-danger my-2 w-75"
              to="/viewDrivers"
            >
              View All Drivers
            </Link>

            {/* Button to go to Edit Drivers page */}
            <Link
              className="btn btn-outline-danger my-2 w-75"
              to="/editDrivers"
            >
              Edit Drivers
            </Link>

            {/* Button to go to Delete Drivers page */}
            <Link
              className="btn btn-outline-danger my-2 w-75"
              to="/deleteDrivers"
            >
              Delete Drivers
            </Link>
          </div>

          {/* Right Image Column */}
          <div className="col-md-4 text-center">
            <img
              src="../images/checkeredflag-removebg-preview.png"
              alt="checkered flag"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

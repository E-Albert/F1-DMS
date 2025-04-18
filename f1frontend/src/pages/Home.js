import React from "react";

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

          {/* Middle Buttons Column */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <button className="btn btn-outline-danger my-2 w-75">
              Add Drivers
            </button>
            <button className="btn btn-outline-danger my-2 w-75">
              View All Drivers
            </button>
            <button className="btn btn-outline-danger my-2 w-75">
              Edit Drivers
            </button>
            <button className="btn btn-outline-danger my-2 w-75">
              Delete Drivers
            </button>
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

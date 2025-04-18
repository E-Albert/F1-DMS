// Import React and Link so we can use JSX and link to routes
import React from "react";
import { Link } from "react-router-dom";

// This component renders the navigation bar at the top of the page
export default function Navbar() {
  return (
    // Bootstrap navbar with a light background
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        {/* Link that takes you to the homepage */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* Logo image on the left side of the navbar */}
          <img
            src="/images/f1logo.jpeg"
            alt="F1 Logo"
            width="80"
            height="80"
            className="d-inline-block me-2"
          />
          F1 Data Management System
        </Link>
      </div>
    </nav>
  );
}

import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="../images/f1logo.jpeg"
              alt="F1Logo"
              width="100"
              height="100"
              class="d-inline-block align-text-middle"
            />
            F1 Data Management System
          </a>
        </div>
      </nav>
    </div>
  );
}

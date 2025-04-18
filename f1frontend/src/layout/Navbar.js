import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
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

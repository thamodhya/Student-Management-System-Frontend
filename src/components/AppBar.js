import React from 'react';
import { Link } from 'react-router-dom';

export default function Appbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Student Management System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/Student" className="nav-link">Students</Link>
            </li>
            <li className="nav-item">
            <Link to="/User" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
            <Link to={`/MyProfile/:id`} className="nav-link">My Profile</Link>
            </li>
            <li className="nav-item">
            <Link to="/Student" className="nav-link">Record History</Link>
            </li>
            <li className="nav-item">
            <Link to="/Login" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


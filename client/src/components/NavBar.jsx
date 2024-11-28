import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Import the CSS file for navbar styling

export default function NavBar() {
  return (
    <header className="navbar">
      <h1 className="logo">PRINTHUB</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/listings">Listings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

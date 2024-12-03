import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css"; // Import the CSS file for navbar styling

export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e)=> {
    e.preventDefault();
    if (query.trim()){
      navigate.push(`/listings?search=${query}`);
    }
  };

  return (
    <header className="navbar">
      <h1 className="logo">PRINTHUB</h1>
      <form className="searchBar" onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)} className = "searchInput"/>
      </form>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listings">Shop All</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

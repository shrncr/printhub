import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Assuming you're using a UserContext
import "../styles/NavBar.css"; // Import the CSS file for navbar styling

export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useUser(); // Get user data from context
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/listings?search=${query}`);
    }
  };

  // Define role-specific links
  const buyerLinks = (
    <>
      <li>
        <Link to="/listings">Shop All</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
    </>
  );

  const sellerLinks = (
    <>
      <li>
        <Link to="/seller-listing">Create Listing</Link>
      </li>
      <li>
        <Link to="/my-listings">My Listings</Link>
      </li>
    </>
  );

  const commonLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Log in/out</Link>
      </li>
      <li>
        <Link to={user ? "/profile" : "/login"}>My Account</Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
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
      
    </>
  );
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <h1 className="logo">PrintHub</h1>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <form className="searchBar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
      </form>

      <nav>
         <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {user ? (
            <>
              {commonLinks}
              {user.isBuyer && buyerLinks}
              {user.isSeller && sellerLinks}
            </>
          ) : (
            guestLinks
          )}
        </ul>
      </nav>
    </header>
  );
}

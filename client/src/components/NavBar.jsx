import React from "react";
import { Link } from "react-router-dom";
export default function NavBar(){
return(
    <>
    <ul>
    
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/login">Log In</Link>
        </li>
        <li>
            <Link to="/signup">Sign Up</Link>
        </li>
        <li>
            <Link to ="/cart">Cart</Link>
        </li>
        <li>
            <Link to ="/listings">Listings</Link>
        </li>
    </ul>
    </>
)
}
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
            <Link to="/login">LogIn</Link>
        </li>
        <li>
            <Link to="/signup">Sign Up</Link>
        </li>
    </ul>
    </>
)
}
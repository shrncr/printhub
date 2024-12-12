import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // For backend requests
import "../styles/Checkout.css";
import Cookies from 'js-cookie';
import { useUser } from "./UserContext";

const Checkout = () => {
  const { user,logout, login, } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], total = 0 } = location.state || {};

  // Handle Confirm Purchase
  const handleConfirm = async () => {
    try {
      if(!user){
        alert("Please Sign In To Make A Purchase.")
      }
      else{
        //Update quantity in the backend for each cart item
      const promises = cartItems.map((item) =>
        axios.put(`https://printhubback.vercel.app/listings/${item.listingId}`, {
          quantity: item.quantity, // Send the quantity to be reduced
        })
      );
      await Promise.all(promises);
      Cookies.remove('cart');
      const response = await axios.post(`https://printhubback.vercel.app/purchases`, {
        items: cartItems.map((item) => item.listingId),
        user: user._id
      });

      alert("Purchase confirmed! Inventory updated.");
      navigate("/cart"); 
      }
      
    } catch (err) {
      console.error("Error confirming purchase:", err);
      alert("Failed to confirm purchase. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }} className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul className="checkoutList">
          {cartItems.map((item) => (
            <li key={item.listingId}>
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.listingName}
                style={{ width: "100px", height: "100px" }}
              />
              <strong>Name:</strong> {item.listingName}, 
              <strong>Price:</strong> ${item.price}, 
              <strong>Quantity:</strong> {item.quantity}
              <br />
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      {cartItems.length > 0 && (
        <button className="confirmButton" onClick={handleConfirm}>
          Confirm Purchase
        </button>
      )}
    </div>
  );
};

export default Checkout;

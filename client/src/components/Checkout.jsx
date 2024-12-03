import React from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const { cartItems = [], total = 0 } = location.state || {};

  return (
    <div style={{ padding: '20px' }} className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul className="checkoutList">
          {cartItems.map((item) => (
            <li key={item.listingId}>
              <img src={item.image || 'https://via.placeholder.com/200'} alt={item.listingName} style={{ width: '100px', height: '100px' }} />
              <strong>Name:</strong> {item.listingName}, 
              <strong>Price:</strong> ${item.price}, 
              <strong>Quantity:</strong> {item.quantity}
              <br />
              
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Checkout;

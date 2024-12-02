import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the cart
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/cart');
      setCartItems(response.data);
    } catch (err) {
      setError('Failed to fetch cart items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    console.log('Attempting to delete item with ID:', itemId);
    if (!itemId) {
      console.error('Invalid item ID:', itemId);
      return;
    }
    try {
      
  
      // Send delete request to the backend
      await axios.delete(`http://localhost:8082/cart/${itemId}`);
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
      
      // Optionally, you can re-fetch the cart items if you need the updated list from the backend
      fetchCartItems(); // This is not necessary if you're managing the cart locally after deletion
  
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
  
      // In case of error, revert the local cart items to the previous state
      fetchCartItems();
    }
  };
  

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }} className = "cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? ( //if there is nothing in the cart, output string
        <p>Your cart is empty.</p>
      ) : ( // else
        <ul className="cartList">
          {cartItems.map((item) => {
            console.log(item.listingId); // Log the item to verify its structure
            return (
              <li key={item.listingId}>
                <img src={item.image|| 'https://via.placeholder.com/200'} alt={item.listingName} style={{ width: '100px', height: '100px' }} />
                <strong>Name:</strong> {item.listingName}, <strong>Price:</strong> ${item.price}, <strong>Quantity:</strong> {item.quantity}
                <br />
                <p>{item.listingDesc}</p>
                <button className="removeButt"onClick={() => handleRemoveItem(item.listingId)}><img src="/trash.png"style={{width:'20px',height: '20px'}} ></img></button>
                
              </li>
            );
          })}

        </ul>
      )}
      <button className = "checkout">Checkout</button> 
    </div>
  );
};

export default CartPage;
//LINK CHECKOUT BUTTON
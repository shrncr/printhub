import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    try {
      await axios.delete(`http://localhost:8082/cart/${itemId}`);
      fetchCartItems();
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    }
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart</h2>
      {cartItems.length === 0 ? ( //if there is nothing in the cart, output string
        <p>Your cart is empty.</p>
      ) : ( // else
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <strong>Name:</strong> {item.listingName}, <strong>Price:</strong> ${item.price}, <strong>Quantity:</strong> {item.quantity}
              <br />
              <img src={item.image} alt={item.listingName} style={{ width: '100px', height: '100px' }} />
              <p>{item.listingDesc}</p>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;

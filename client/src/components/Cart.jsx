import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "../styles/Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from the cookie
  const fetchCartItems = () => {
    setLoading(true);
    try {
      const cookieCart = Cookies.get('cart');
      const parsedCart = cookieCart ? JSON.parse(cookieCart) : [];
      setCartItems(parsedCart);
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

  const handleRemoveItem = (itemId) => {
    console.log('Attempting to delete item with ID:', itemId);
    if (!itemId) {
      console.error('Invalid item ID:', itemId);
      return;
    }
    try {
      const updatedCartItems = cartItems.filter(item => item.listingId !== itemId);
      setCartItems(updatedCartItems);
      Cookies.set('cart', JSON.stringify(updatedCartItems));
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    }
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }} className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? ( // if there is nothing in the cart, output string
        <p>Your cart is empty.</p>
      ) : ( // else
        <ul className="cartList">
          {cartItems.map((item) => {
            console.log(item.listingId); // Log the item to verify its structure
            return (
              <li key={item.listingId}>
                <img src={item.image || 'https://via.placeholder.com/200'} alt={item.listingName} style={{ width: '100px', height: '100px' }} />
                <strong>Name:</strong> {item.listingName}, <strong>Price:</strong> ${item.price}, <strong>Quantity:</strong> {item.quantity}
                <br />
                <p>{item.listingDesc}</p>
                <button className="removeButt" onClick={() => handleRemoveItem(item.listingId)}><img src="/trash.png" style={{ width: '20px', height: '20px' }} alt="Remove" /></button>
              </li>
            );
          })}
        </ul>
      )}
      <button className="checkout">Checkout</button>
    </div>
  );
};

export default CartPage;

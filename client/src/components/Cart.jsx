import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom'; // For navigation
import "../styles/Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's navigate function

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
    try {
      const updatedCartItems = cartItems.filter(item => item.listingId !== itemId);
      setCartItems(updatedCartItems);
      Cookies.set('cart', JSON.stringify(updatedCartItems));
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    }
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigate('/checkout', { state: { cartItems, total } });
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }} className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cartList">
          {cartItems.map((item) => (
            <li key={item.listingId}>
              <img className="prodImg" src={item.image || "/holder.png"} alt={item.listingName} style={{ width: '100px', height: '100px' }} />
              <div className="detailsCart">
              <Link to={`/listings/single/${item.listingId}`} className="name">
                  {item.listingName}
                </Link>
                <div className="QuanPrice">
                  <p className="price">Price: ${item.price} </p>
                  <p className="quantity">Quantity: {item.quantity} </p> 
                </div>
              </div>
              
              
              <button className="removeButt" onClick={() => handleRemoveItem(item.listingId)}>
                <img src="/trash.png" style={{ width: '20px', height: '20px' }} alt="Remove" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="checkoutButt" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;

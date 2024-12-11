import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import "../styles/HomePage.css";

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch listings from the backend
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://printhubback.vercel.app/listings'); // Replace with your backend URL
      setListings(response.data);
    } catch (err) {
      setError('Failed to fetch listings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAddToCart = async (listingId, listingName,price) => {
    try {
      const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      const itemIndex = cart.findIndex(item=> item.listingId===listingId);

      //if it finds the same item already in the cart, update quantities
      if(itemIndex !== -1){
        cart[itemIndex].quantity +=1; 
      }
      else{
        cart.push({
          listingId,
          listingName: listings.find(listing => listing._id ===listingId).listingName,
          price: listings.find(listing => listing._id ===listingId).price,
          quantity:1,
          image: listings.find(listing=> listing._id === listingId).image,
          listingDesc: listings.find(listing => listing._id ===listingId).listingDesc,
        })
      }
      Cookies.set('cart', JSON.stringify(cart));
      setAlertMessage('Item added to Cart!');

      // Clear the alert message after 2 seconds
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  return (
    <div className="homepage" style={{ fontFamily: 'Arial, sans-serif' }}>
  {alertMessage && (
    <div className="alert">
      {alertMessage}
    </div>
  )}
  
  {/* Hero Section */}

  <div className="homepage" style={{ fontFamily: 'Arial, sans-serif' }}>
  {alertMessage && (
    <div className="alert">
      {alertMessage}
    </div>
  )}

  {/* Hero Section */}
  <section className="hero">
    {/* Background Video */}
    <video
      autoPlay
      muted
      loop
      className="hero-video"
    >
      <source src="/animate.mov" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Text Overlay */}
    <div className="hero-text">
      <h2 className="typing">Your Official Place for 3D Printing</h2>
    </div>
  </section>
</div>






      {/* Recommended Section */}
      <section className="recommended" style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Recommended</h2>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1rem', color: '#888' }}>Loading recommendations...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', fontSize: '1rem', color: 'red' }}>{error}</p>
        ) : (
          <div
            className="recommended-listings"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {listings.slice(0, 5).map((listing) => (
              <div
                key={listing._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  src={listing.image || 'https://via.placeholder.com/200'}
                  alt={listing.listingName}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="recommendedText" style={{ padding: '1rem' }}>
                  <div className="NamePrice">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {listing.listingName}
                  </h3>
                  {listing.oldPrice && (
                    <p style={{ color: '#888', textDecoration: 'line-through' }}>
                      ${listing.oldPrice}
                    </p>
                  )}
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${listing.price}</p>
                  </div>
                  
                  <button className = "AddCartButt"onClick={() => handleAddToCart(listing._id)}>
                    Add to Cart
                  </button>
                  <Link
                    to={`/listings/single/${listing._id}`}
                    style={{
                      display: 'block',
                      marginTop: '1rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#007bff',
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch listings from the backend
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/listings'); // Replace with your backend URL
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
          listingName,
          price,
          quantity:1,
          image: listings.find(listing=> listing._id === listingId).image,
          listingDesc: listings.find(listing => listing._id ===listingId).listingDesc,
        })
      }
      Cookies.set('cart', JSON.stringify(cart));
      alert('Item added to Cart!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  return (
    <div className="homepage" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <section className="hero" style={{ display: 'flex', alignItems: 'center', padding: '2rem' }}>
        <div className="hero-text" style={{ flex: 1, marginRight: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Official Place for 3D Printing</h2>
          <a
            href="/project"
            className="view-project"
            style={{
              textDecoration: 'none',
              color: '#007bff',
              fontWeight: 'bold',
            }}
          >
            View Project →
          </a>
        </div>
        <div className="hero-image" style={{ flex: 1 }}>
          <img
            src="https://via.placeholder.com/600x400" // Replace with your image URL
            alt="Hero"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          />
        </div>
      </section>

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
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {listing.listingName}
                  </h3>
                  {listing.oldPrice && (
                    <p style={{ color: '#888', textDecoration: 'line-through' }}>
                      ${listing.oldPrice}
                    </p>
                  )}
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${listing.price}</p>
                  <button
                    onClick={() => handleAddToCart(listing._id)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/listing/${listing._id}`}
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Listings.css"

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  // Fetch listings from the backend
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://printhubback.vercel.app/listings'); // Replace with your API URL
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
      setAlertMessage('Item added to Cart!');

      // Clear the alert message after 2 seconds
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  const filteredListings = listings.filter((listing) =>
    listing.listingName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      
      {alertMessage && (
        <div className="alert">
          {alertMessage}
        </div>
      )}

      {/* Listings Section */}
      <div className="Main"style={{ padding: '2rem' }}>
        <h2 >Available Products</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // Fixed 3 listings per row
            gap: '1.5rem',
          }}
        >
          {filteredListings.map((listing) => (
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
                <div className = "Products">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {listing.listingName}
                  </h3>
                  {listing.oldPrice && (
                    <p style={{ color: '#888', textDecoration: 'line-through' }}>
                      ${listing.oldPrice}
                    </p>
                )}
                <p style={{ fontSize: '1.2rem' }}>${listing.price}</p>
                </div>
               
                <button className="AddCartButt" onClick={() => handleAddToCart(listing._id, listing.listingName, listing.price)}>
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
      </div>
    </div>
  );
};

export default ListingsPage;

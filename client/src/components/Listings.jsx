import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  // Fetch listings from the backend
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/listings'); // Replace with your API URL
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
      await axios.post('http://localhost:8082/cart', {
        userId: 'userId_here', // Replace with actual user ID if available
        listingId,
        listingName,
        price,
        quantity:1,
      });
      alert('Item added to cart!');
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
      {/* Listings Section */}
      <div style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Available Products</h2>
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
                  onClick={() => handleAddToCart(listing._id, listing.listingName, listing.price)}
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
      </div>
    </div>
  );
};

export default ListingsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation to individual listing page

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all listings from the backend
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/listings');
      setListings(response.data);
    } catch (err) {
      setError('Failed to fetch listings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchListings();
  }, []);

  const handleAddToCart = async (listingId) => {
    // Add to cart logic goes here, for example:
    // - Assume `userId` and `quantity` are predefined
    try {
      await axios.post('http://localhost:8082/cart', {
        userId: 'userId_here',  // Replace with actual user ID
        listingId,
        quantity: 1
      });
      alert('Item added to cart!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Listings</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listings.map((listing) => (
          <div key={listing._id} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', width: '250px' }}>
            <h3>{listing.listingName}</h3>
            <img src={listing.image} alt={listing.listingName} style={{ width: '100%', height: 'auto' }} />
            <p><strong>Price:</strong> ${listing.price}</p>
            <p><strong>Stock:</strong> {listing.stock}</p>
            <p><strong>Rating:</strong> {listing.listingRating}</p>
            <p>{listing.listingDesc}</p>
            <button onClick={() => handleAddToCart(listing._id)}>Add to Cart</button>
            <br />
            <Link to={`/listing/${listing._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;

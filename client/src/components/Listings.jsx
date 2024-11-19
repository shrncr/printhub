import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

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

  // fetches listings when component starts
  useEffect(() => {
    fetchListings();
  }, []);

  const handleAddToCart = async (listingId) => {
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
    <div>
      <h2>All Listings</h2>
      <div >
        {listings.map((listing) => (
          <div key={listing._id} >
            <h3>{listing.listingName}</h3>
            <img src={listing.image} alt={listing.listingName} />
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IndividualListing = () => {
  const { id } = useParams(); // Grab the ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        setError('Failed to fetch listing');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{listing.listingName}</h2>
      <img src={listing.image} alt={listing.listingName} style={{ width: '200px', height: '200px' }} />
      <p><strong>Price:</strong> ${listing.price}</p>
      <p><strong>Stock:</strong> {listing.stock}</p>
      <p><strong>Rating:</strong> {listing.listingRating}</p>
      <p>{listing.listingDesc}</p>
      {/* You can add more elements here like Add to Cart button */}
    </div>
  );
};

export default IndividualListing;

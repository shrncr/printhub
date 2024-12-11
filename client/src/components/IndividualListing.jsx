import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../styles/IndividualListings.css"

const IndividualListing = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  console.log('Listing ID:', id);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://printhubback.vercel.app/listings/single/${id}`);
      setListing(response.data);
    } catch (err) {
      setError('Failed to fetch listing details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = async (listingId, listingName, price) => {
    try {
      const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      const itemIndex = cart.findIndex(item => item.listingId === listingId);

      // If it finds the same item already in the cart, update quantities
      if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
      } else {
        cart.push({
          listingId,
          listingName,
          price,
          quantity: 1,
          image: listing.image,
          listingDesc: listing.listingDesc,
        });
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

  useEffect(() => {
    fetchListing();
  }, [id]);

  if (loading) return <p>Loading listing details...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>No listing found</p>;

  return (
    <>
    {alertMessage && (
        <div className="alert">
          {alertMessage}
        </div>
      )}
        <div className="main">
          <div>
            <img
              className="pic"
              src={listing.image || 'https://via.placeholder.com/400'}
              alt={listing.listingName}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
        
          <div className="detailsIndiv">
            <h2>{listing.listingName}</h2>
              <p>{listing.listingDesc}</p>
              <p>
                {listing.oldPrice && (
                  <span style={{ color: '#888', textDecoration: 'line-through' }}>
                    ${listing.oldPrice}
                  </span>
                )}
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${listing.price}</span>
              </p>
              <button
                onClick={() => handleAddToCart(listing._id, listing.listingName, listing.price)}
                
              >
                Add to Cart
              </button>
          </div>
        
      </div>
    </>
    
  );
};

export default IndividualListing;

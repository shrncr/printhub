import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/MyListings.css";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the seller's listings from the backend
  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const sellerId = Cookies.get("sessionId"); // Get the sellerId from cookies
      if (!sellerId) {
        setError("No seller ID found. Please log in again.");
        return;
      }

      const response = await axios.get(`https://printhubback.vercel.app/listings?sellerId=${sellerId}`);
      setListings(response.data); // Set only the seller's listings
    } catch (err) {
      setError("Failed to fetch your listings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  if (loading) return <p>Loading your listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-listings">
      <h1>My Listings</h1>
      {listings.length === 0 ? (
        <p>You have not created any listings yet.</p>
      ) : (
        <div className="listings-container">
          {listings.map((listing) => (
            <div className="listing-card" key={listing._id}>
              <img
                src={listing.image || "https://via.placeholder.com/150"}
                alt={listing.listingName}
                className="listing-image"
              />
              <div className="listing-details">
                <h3>{listing.listingName}</h3>
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Stock:</strong> {listing.stock}</p>
                <p><strong>Description:</strong> {listing.listingDesc}</p>
                <div className="listing-actions">
                  <button className="edit-button" onClick={() => handleEditListing(listing._id)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteListing(listing._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Handle editing the listing (placeholder)
const handleEditListing = (listingId) => {
  alert(`Edit functionality for listing ID: ${listingId} not yet implemented.`);
};

// Handle deleting the listing
const handleDeleteListing = async (listingId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://printhubback.vercel.app/listings/${listingId}`);
    alert("Listing deleted successfully.");
    window.location.reload(); // Reload the page to fetch updated listings
  } catch (err) {
    console.error("Error deleting listing:", err);
    alert("Failed to delete the listing. Please try again.");
  }
};

export default MyListings;

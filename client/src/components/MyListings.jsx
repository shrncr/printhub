import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/MyListings.css";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingListing, setEditingListing] = useState(null); // Track the listing being edited
  const [editFormData, setEditFormData] = useState({
    listingName: "",
    price: "",
    stock: "",
    listingDesc: "",
  });

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

  // Handle editing the listing
  const handleEditListing = (listing) => {
    setEditingListing(listing._id);
    setEditFormData({
      listingName: listing.listingName,
      price: listing.price,
      stock: listing.stock,
      listingDesc: listing.listingDesc,
    });
  };

  // Handle saving the edited listing
  const handleSaveEdit = async (listingId) => {
    try {
      await axios.put(`https://printhubback.vercel.app/listings/${listingId}`, editFormData);
      alert("Listing updated successfully.");
      setEditingListing(null); // Close the edit form
      fetchMyListings(); // Refresh listings
    } catch (err) {
      console.error("Error updating listing:", err);
      alert("Failed to update the listing. Please try again.");
    }
  };

  // Handle deleting the listing
  const handleDeleteListing = async (listingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://printhubback.vercel.app/listings/${listingId}`);
      alert("Listing deleted successfully.");
      fetchMyListings(); // Refresh listings
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete the listing. Please try again.");
    }
  };

  if (loading) return <p>Loading your listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-listings-container">
      {/* Left Side - Listings */}
      <div className="listings-panel">
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
                    <button className="edit-button" onClick={() => handleEditListing(listing)}>
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

      {/* Right Side - Edit Form */}
      <div className="edit-panel">
        {editingListing ? (
          <div className="edit-form">
            <h2>Edit Listing</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingListing);
              }}
            >
              <div className="form-group">
                <label>Listing Name</label>
                <input
                  type="text"
                  value={editFormData.listingName}
                  onChange={(e) => setEditFormData({ ...editFormData, listingName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={editFormData.stock}
                  onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editFormData.listingDesc}
                  onChange={(e) => setEditFormData({ ...editFormData, listingDesc: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="save-button">Save</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditingListing(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <p>Select a listing to edit</p>
        )}
      </div>
    </div>
  );
};

export default MyListings;

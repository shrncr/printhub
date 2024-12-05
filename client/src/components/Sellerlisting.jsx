import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/SellerListing.css";

const SellerListing = () => {
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [listingName, setListingName] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validate required fields
    if (!listingName || !price || !stock) {
      setErrorMessage('Listing Name, Price, and Stock are required.');
      return;
    }

    try {
      // Get sellerId from session or context (this example uses Cookies)
      const sellerId = Cookies.get('sessionId'); // Replace with actual seller ID retrieval

      const response = await axios.post(
        'https://printhubback.vercel.app/listings',
        {
          price: parseFloat(price),
          stock: parseInt(stock),
          listingName,
          listingDesc: description,
          image: image || '', // Default to an empty string if no image is provided
          sellerId, // Include sellerId
          listingRating: 0, // Default to 0 unless ratings are provided
        },
        {
          headers: {
            Authorization: `Bearer ${sellerId}`, // Add token or authentication if required
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage('Listing created successfully!');
        // Reset form fields
        setPrice('');
        setStock('');
        setDescription('');
        setListingName('');
        setImage('');
      }
    } catch (error) {
      console.error('Error creating listing:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Failed to create listing. Please try again.');
    }
  };

  return (
    <div className="seller-listing">
      <h1>Create a New Listing</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleCreateListing} className="listing-form">
        <div className="form-group">
          <label htmlFor="listingName">Listing Name:</label>
          <input
            type="text"
            id="listingName"
            value={listingName}
            onChange={(e) => setListingName(e.target.value)}
            required
            placeholder="Enter listing name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description of the listing"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL (optional)"
          />
        </div>
        <button type="submit" className="create-listing-button">Create Listing</button>
      </form>
    </div>
  );
};

export default SellerListing;

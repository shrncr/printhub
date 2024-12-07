const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Gets all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving listings', error: err });
  }
});

// New listing
router.post('/', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: 'Error adding listing', error: err });
  }
});

// Update listing
router.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(400).json({ message: 'Error updating listing', error: err });
  }
});

//filer by listingid
router.get('/:sellerId', async (req, res) => {
  try {
    console.log("hi")
    const { sellerId } = req.params;
    console.log("hi2")
    if (!sellerId) {
      return res.status(400).json({ message: 'nos eler id' });
    }
    const listings = await Listing.find({ sellerId });

    if (listings.length == 0) {
      return res.status(404).json({ message: 'no listings' });
    }

    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


// Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting listing', error: err });
  }
});

// Deduct stock for purchase
router.put('/update-stock', async (req, res) => {
  try {
    const { listingId, quantity } = req.body;

    // Find the listing by ID
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }


    // Check if sufficient stock is available
    if (listing.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    // Deduct the stock
    listing.stock -= quantity;

    // Save the updated listing
    await listing.save();

    res.json({ message: 'Stock updated successfully', listing });
  } catch (err) {
    res.status(500).json({ message: 'Error updating stock', error: err });
  }
});

module.exports = router;

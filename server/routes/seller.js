const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

//get seller
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving sellers', error: err });
  }
});

//adds seller
router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ message: 'Error adding seller', error: err });
  }
});

//update seller
router.put('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    res.json(seller);
  } catch (err) {
    res.status(400).json({ message: 'Error updating seller', error: err });
  }
});

//delete seller
router.delete('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    res.json({ message: 'Seller deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting seller', error: err });
  }
});

module.exports = router;

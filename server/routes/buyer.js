const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

//gets all buyers
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving buyers', error: err });
  }
});

//add new buyer
router.post('/', async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).json(buyer);
  } catch (err) {
    res.status(400).json({ message: 'Error adding buyer', error: err });
  }
});

//update buyer info
router.put('/:id', async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    res.json(buyer);
  } catch (err) {
    res.status(400).json({ message: 'Error updating buyer', error: err });
  }
});

//delete buyer
router.delete('/:id', async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    res.json({ message: 'Buyer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting buyer', error: err });
  }
});

module.exports = router;

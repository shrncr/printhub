const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

//gets all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving purchases', error: err });
  }
}); 
//filer by listingid
router.get('/:userId', async (req, res) => {
  try {
    console.log("hi")
    const { userId } = req.params;
    console.log(req.params)
    console.log("hi2")
    if (!userId) {
      return res.status(400).json({ message: 'nos eler id' });
    }
    const listings = await Purchase.find({ userId });

    if (listings.length == 0) {
      return res.status(404).json({ message: 'no purchases' });
    }

    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//add new purchase
router.post('/', async (req, res) => {
  try {
    
    console.log("heyyy")
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`; //chat made this
    console.log(formattedDate)
    const purchase = new Purchase({'userId': req.body.user, 'listingIds':req.body.items, 'cardDigits':"0000", date:formattedDate});
    await purchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Error adding purchase', error: err });
  }
});

//update purchase info
router.put('/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ message: 'Error updating purchase', error: err });
  }
});

//deletes a purchase
router.delete('/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting purchase', error: err });
  }
});

module.exports = router;

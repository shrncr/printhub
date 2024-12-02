// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require("../models/cart");

// Mock database for cart items
let cartItems = [];

// POST request to add item to cart
router.post('/', async (req, res) => {
    const { userId, listingId, quantity } = req.body;
    
    let found = false;
    const newItem = { userId, listingId, quantity };
    cartItems.push(newItem);

    
    res.status(200).json({ message: 'Item added to cart', cartItems });
  });

// GET request to get all cart items
router.get('/', (req, res) => {
  res.status(200).json(cartItems);
});

// DELETE request to remove item from cart
router.delete('/cart/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
      // Assuming you're using MongoDB with Mongoose
      const deletedItem = await Cart.findByIdAndDelete(itemId);  // Deleting item by ID
  
      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }
  
      res.status(200).send({ message: "Item removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to delete item from cart" });
    }
  });

module.exports = router;

const mongoose = require('mongoose');

// Cart Item Schema - Defines an individual item in the cart
const cartItemSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },  // Reference to Listing model
  quantity: { type: Number, required: true },  // Quantity of the item
  listingName: { type: String, required: true },  // Name of the listing
  price: { type: Number, required: true },  // Price of the item
});

// Cart Schema - Defines the structure of a user's cart
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
  items: [cartItemSchema],  // Array of items in the cart
});

module.exports = mongoose.model('Cart', cartSchema);

const mongoose = require('mongoose');
const User = require('./User');

const sellerSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  sellerRating: { type: Number, default: 0 }
}, { collection: 'Seller' });

module.exports = User.discriminator('Seller', sellerSchema);

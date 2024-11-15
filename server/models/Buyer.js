const mongoose = require('mongoose');
const User = require('./User');

const buyerSchema = new mongoose.Schema({
  creditCard: { type: String, required: true },
  address: { type: String, required: true }
}, { collection: 'Buyer' });

module.exports = User.discriminator('Buyer', buyerSchema);

const mongoose = require('mongoose');
const User = require('./User');

const buyerSchema = new mongoose.Schema({
  creditCard: { type: String, required: false },
  address: { type: String, required: false }
}, { collection: 'Buyer' });

module.exports = User.discriminator('Buyer', buyerSchema);

const mongoose = require('mongoose');
const User = require('./User');

const buyerSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  creditCard: { type: String, required: false },
  address: { type: String, required: false }
}, { collection: 'Buyer' });

module.exports = User.discriminator('Buyer', buyerSchema);

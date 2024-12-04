const mongoose = require('mongoose');
const { isBoolean } = require('util');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password:{type:String, required:true},
  isSeller:{type:Boolean, required:true},
  isBuyer:{type:Boolean, required:true},
  sellerRating: { type: Number, default: 0 },
  creditCard: { type: String, required: false },
  address: { type: String, required: false }
}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);

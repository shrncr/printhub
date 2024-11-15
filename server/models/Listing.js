const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  listingRating: { type: Number, default: 0 },
  image: {type: String, required:false},
  listingName: {type:String, required:true},
  listingDesc: {type:String, required:false}
}, { collection: 'Listing' });

module.exports = mongoose.model('Listing', listingSchema);

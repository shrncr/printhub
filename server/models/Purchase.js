const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }],
  cardDigits: { type: String, required: true },
  date: {type: String, required:false}
}, { collection: 'Purchase' });

module.exports = mongoose.model('Purchases', purchaseSchema);

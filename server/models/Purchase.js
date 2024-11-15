const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  purchaseId: { type: String, required: true, unique: true },
  listingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }],
  cardDigits: { type: String, required: true }
}, { collection: 'Purchase' });

module.exports = mongoose.model('Purchases', purchaseSchema);

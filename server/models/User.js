const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password:{type:String, required:true}
}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);

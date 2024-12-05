const mongoose = require('mongoose');
const { isBoolean } = require('util');
const bcrypt = require('bcrypt');
const saltRounds = 10; // the # of times the pw is hashed. higher num is more secure but more time

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

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err);
          this.password = hash;
          next();
      });
  });
});

module.exports = mongoose.model('User', userSchema);
 
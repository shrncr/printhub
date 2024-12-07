const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Buyer = require('../models/Buyer');
const bcrypt = require('bcrypt');
const saltRounds = 10; // the # of times the pw is hashed. higher num is more secure but more time

// Adds a new user (Sign-up)
router.post('/', async (req, res) => {
  try {
    const { name, emailAddress, password, isSeller, isBuyer } = req.body;
    const existingUser = await User.findOne({ //make sure no user w same email or user
      $or: [{ emailAddress }, { name }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists.' 
      });
    }
    
    const user = new User({
      name,
      emailAddress,
      password,
      isSeller,
      isBuyer
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error adding user', 
      error: err.message 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ emailAddress: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log(user.password)
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("fe")
      res.status(401).json({ message: 'Incorrect password.' });
    } else{
res.status(200).json(user);
    }

    
  } catch (err) {
    res.status(400).json({ 
      message: 'Error during login', 
      error: err.message 
    });
  }
});


module.exports = router;
 
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Buyer = require('../models/Buyer');

//gets all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
});

//adds new user
router.post('/', async (req, res) => {
  try {
    console.log(
      "hey"
    )
    console.log(req.body)
    const user = new User(req.body);
    console.log('hey')
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error adding user', error: err });
  }
});

//updates a users info
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err });
  }
});

//updates a users info
router.post('/login', async (req, res) => {
 console.log(
  "bof"
 )
  try {
    console.log("je")
    let uemail = req.body.email
    console.log(uemail)
    const upass = req.body.password
    console.log(upass)
    const user = await User.findOne({"email":uemail, "password":upass});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{
      console.log(user)
      res.status(200).json(user);
    }
    console.log("skay")
    
  } catch (err) {
    console.log("antislap")
    res.status(400).json({ message: 'Error updating user', error: err });
  }
});

//bye bye user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = router;
 
/*
* Allows access to database
*/
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');//allows to clearly define filepaths
const db = process.env.URI;
//db uri

const connectDB = async () => { //connects db
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      dbName: 'printhubDB'
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB; //to use in other filess
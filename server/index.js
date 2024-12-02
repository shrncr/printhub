/*
Root file for backend. Brings together API endpoints, defines port number, and connects to database
*/
const express = require("express");
const cors = require("cors");
const connectDB = require("./conn");

const app = express();
require('core-js');

app.use(cors({
  origin: 'http://localhost:3000',//allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'Accept', 'Referer'], 
  credentials: true, //cookies
}));
app.use(express.json());
connectDB(); 

//oh crud ops
app.use('/users', require('./routes/user'));
app.use('/buyers', require('./routes/buyer'));
app.use('/sellers', require('./routes/seller'));
app.use('/listings', require('./routes/listing'));
app.use('/purchases', require('./routes/purchase'));




const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});


module.exports = app;

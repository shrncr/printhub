/*
Root file for backend. Brings together API endpoints, defines port number, and connects to database
*/
const express = require("express");
const cors = require("cors");

const connectDB = require("./conn");
const router = require("./api");

const app = express();
require('core-js');

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'Accept', 'Referer'], // Headers to allow
  credentials: true, // Allow setting of cookies or sessions
}));

// Ensure that the express.json middleware is used before defining the routes
app.use(express.json()); // Parse JSON bodies

connectDB(); // Connect to the database

// Use exhibits file to access routes
app.use("/", router); // At the main page, "/", refer to the exhibit routes CRUD operations

const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => { // Start server on defined port
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;

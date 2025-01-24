"use strict";

// Create express app
const express = require("express");
const app = express();

// Import packages
require('colors');
require("express-async-errors");
require("dotenv").config();
const cors = require('cors');

// Environment variables
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1";
const MODE = process.env.MODE || "development";

// Connect to DB
const { dbConnection } = require("./config/dbConnection.js");
dbConnection();

// Middlewares
// Parse JSON
app.use(express.json());
// Enable CORS
app.use(cors());



// Find/Pagination/Search/Sort:
app.use(require('./middlewares/findSearchSortPage.js'))

// App Routes

// HomePath: Welcome page
app.all("/", (req, res) => {
  res.send("Welcome to the API...");
});

// API Routes
app.use('/api', require('./routes'));


// Middleware to send an email 



// Express error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${MODE} mode on ${HOST}:${PORT}`.blue.underline
  )
);

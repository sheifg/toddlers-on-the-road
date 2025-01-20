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


// App Routes
// HomePath: Welcome page
app.all("/", (req, res) => {
  res.send("Welcome to the API...");
});


// Express Error Handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${MODE} mode on ${HOST}:${PORT}`.blue.underline
  )
);

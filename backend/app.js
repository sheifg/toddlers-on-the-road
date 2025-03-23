"use strict";

// Create express app
const express = require("express");
const app = express();

// Import packages
require("colors");
require("express-async-errors");
require("dotenv").config();

// Environment variables
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1";
const MODE = process.env.MODE || "development";

// Connect to DB
const { dbConnection } = require("./config/dbConnection.js");
dbConnection();

// Middlewares
// Parse JSON
app.use(express.json({ limit: '50mb' }));
// parse form data:
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use("/uploads", express.static("./uploads"));
app.use("/uploads-user", express.static("./uploads-user"));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Explicitly set CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Enable CORS
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both localhost variations
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add OPTIONS for preflight
  credentials: true, // Allow cookies/credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow these headers
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//cookie-parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  next();
});

// Find/Pagination/Search/Sort:
app.use(require("./middlewares/findSearchSortPage.js"));

// HomePath route:
app.all('/', (req, res) => {
  res.send({
      error: false,
      message: 'Welcome to Toddlers on the Road API',
      user: req.user
  })
})

// API Routes
app.use("/api", require("./routes"));

// Express error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${MODE} mode on ${HOST}:${PORT}`.blue.underline
  )
);
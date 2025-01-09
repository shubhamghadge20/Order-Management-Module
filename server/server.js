const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Check if MONGO_URI is set in the environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI not found in environment variables.");
  process.exit(1); // Exit the application if MONGO_URI is missing
}

// Connect to MongoDB
connectDB(); 

const app = express();

// Middleware to allow cross-origin requests and parse JSON
app.use(cors());
app.use(express.json());

// Routes for the API
app.use('/api/orders', require('./routes/orderRoutes'));  // Order routes
app.use('/api/auth', require('./routes/authRoutes'));      // Authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

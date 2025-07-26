const express = require('express');
const cors = require('cors'); // Corrected: require the cors package
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON request bodies

// Define Routes
// All routes defined in routes/auth.js will be prefixed with /api/auth
app.use('/api/auth', authRoutes);

// A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Authentication API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
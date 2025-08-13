const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications')); // Use application routes

// Serve uploaded files statically
// This makes files in the 'uploads' folder accessible via URL (e.g., http://localhost:5000/uploads/filename.pdf)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');

// Replace this with your MongoDB connection string
const MONGO_URI = "mongodb://127.0.0.1:27017/govportal";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
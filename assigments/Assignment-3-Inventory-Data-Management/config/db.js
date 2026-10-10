const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;

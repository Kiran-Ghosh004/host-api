const mongoose = require('mongoose');

const uri = process.env.DB_URI; // Make sure DB_URI includes DB name

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!uri) throw new Error('DB_URI not defined in environment variables');

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

module.exports = connectDB;

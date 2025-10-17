require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../db/connect');
const products = require('../routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless Function!');
});

app.use('/api/products', products);

// ✅ Instead of app.listen(), export a handler function
module.exports = async (req, res) => {
  try {
    await connectDB(); // Connect to DB each time the function is invoked
    return app(req, res); // Pass the request to Express
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

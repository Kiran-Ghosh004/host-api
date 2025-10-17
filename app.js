require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const products = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', products);
app.get('/', (req, res) => res.send('Hello from Vercel Serverless!'));

// Cache DB connection for serverless
let isDBConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isDBConnected) {
      await connectDB();
      isDBConnected = true;
    }
    return app(req, res);
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Local dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () =>
      console.log(`Local server running on port ${PORT}`)
    );
  });
}

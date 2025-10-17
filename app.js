require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const products = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

// Example root route
app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless!');
});

// Your products route
app.use('/api/products', products);

// ✅ Export handler instead of app.listen()
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res); // Let Express handle the request
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Optional: run locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () =>
      console.log(`Local server running on port ${PORT}`)
    );
  });
}

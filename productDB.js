require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/Product');
const products = require('./prouducts.json'); // make sure file name is correct

const start = async () => {
  try {
    await connectDB(`${process.env.DB_URI}/kiran-api`);
    
    // Delete all existing products in DB
    await Product.deleteMany();
    
    // Add new products
    await Product.create(products);
    
    console.log("✅ Products added successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
};

start();

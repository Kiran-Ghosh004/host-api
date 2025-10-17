
require('dotenv').config();
const express = require('express');


const app = express();

const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;



const products_routes =require('./routes/products');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', require('./routes/products'));



const start = async()=>{
    try{
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
    }catch(err){
        console.error('Error starting server:', err);
    }


    
}

start();


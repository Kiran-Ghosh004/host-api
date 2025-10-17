const mongoose = require('mongoose');

const uri = `${process.env.DB_URI}/kiran-api`;

const connectDB = async () => {
    console.log("connect db");
    
    return mongoose.connect(uri)
};

module.exports = connectDB;

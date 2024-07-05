require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_ACCESS;

/**
 * ROUTES IMPORTS
 */

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

/**
 * DB MANAGEMENT
 */

const connectDB = ()=>{
    mongoose.connect(`${uri}`)
    .then(()=>{
        console.log("DB connection successful.");
    })
    .catch((err)=>{
        console.log(`DB connection error:${err}`);
    });
}

connectDB()

/**
 * EXPRESS APP CREATION
 */
const app = express();

/**
 * CORS MANAGEMENT
 */
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * BODYPARSER MANAGEMENT
 */

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use(
    "/assets/images",
    express.static(path.join(__dirname, "assets/images"))
);

module.exports = app;

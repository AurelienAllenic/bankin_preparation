require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require("fs")

/**
 * ROUTES IMPORTS
 */

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

/**
 * DB MANAGEMENT
 */
mongoose.connect(process.env.DATABASE_ACCESS,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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

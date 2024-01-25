'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const ProductModel = require('./models/product-model');

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

mongoose.connect('mongodb://localhost:27017/nodeStore');

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Error connection to MongoDB:', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/product', productRoute);

module.exports = app;
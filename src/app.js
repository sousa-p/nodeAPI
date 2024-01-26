'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var swaggerUi = require('swagger-ui-express');

var fs = require('fs');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('./docs/swagger.yml', 'utf8');
var swaggerDocument = jsyaml.load(spec);


const app = express();

const CustomerModel = require('./models/customer-model');
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
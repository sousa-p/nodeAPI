'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  items: [{
    quantity: {
      type: Number,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
});

module.exports = mongoose.model('Order', schema);
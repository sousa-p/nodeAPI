'use strict';

const guid = require('guide');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getAll = async (data) => {
  let orders = Order.find({});
  return orders;
}

exports.post = async (data) => {
  let order = new Order();

  order.customer = data.customer;
  order.number = guid.raw().substring(0, 6);
  order.items = data.items;

  return order.save();
}
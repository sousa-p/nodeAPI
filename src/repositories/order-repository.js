'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getAll = async (data) => {
  let orders = Order.find({});
  return orders;
}

exports.post = async (data) => {
  let order = new Order(data);
  return order.save();
}
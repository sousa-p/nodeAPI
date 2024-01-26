'use strict';

const guid = require('guid');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getAll = () => {
  let orders = Order.find({})
    .populate('customer', 'name')
    .populate('items.product', 'title');
  return orders;
}

exports.post = (data) => {
  let order = new Order();

  order.customer = data.customer;
  order.number = guid.raw().substring(0, 6);
  order.items = data.items;

  return order.save();
}
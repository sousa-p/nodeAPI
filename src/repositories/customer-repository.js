'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = mongoose.model('Customer');

exports.getById = (id) => {
  let customer = Customer.findById(id);
  return customer;
}

exports.getByEmail = (email) => {
  let customer = Customer.findOne({ email: email });
  return customer;
}

exports.post = async (data) => {
  let customer = new Customer();

  customer.name = data.name;
  customer.email = data.email;
  customer.password = await bcrypt.hash(data.password + global.SALT_KEY, 12);

  return customer.save();
}
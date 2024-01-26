'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = mongoose.model('Customer');

exports.post = async (data) => {
  let customer = new Customer();
  
  customer.name = data.name;
  customer.email = data.email;
  customer.password =  await bcrypt.hash(data.password, 12);

  return customer.save();
}
'use strict'

const guid = require('guid');
const repository = require('../repositories/order-repository');

exports.post = async (req, res, next) => {
  try {
    const data = req.body;
    const order = await repository.post(data);
    return res.status(201).send(order);
  } catch (e) {
    return res.status(400).send(e);
  }
};

'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');

exports.getAll = async (req, res, next) => {
  try {
    const orders = await repository.getAll();
    return res.status(200).send(orders);
  } catch (e) {
    return res.status(400).send(e);
  }
};


exports.post = async (req, res, next) => {
  try {
    const data = req.body;
    const contract = new ValidationContract();
    contract.hasMinLen(data.items, 1, 'The order\'s must contain at least 1 item');

    if (!contract.isValid()) return res.status(400).send(contract.errors());

    const order = await repository.post(data);
    return res.status(201).send(order);
  } catch (e) {
    return res.status(400).send(e);
  }
};

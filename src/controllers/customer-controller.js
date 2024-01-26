'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.getAll = async (req, res, next) => {
  try {
    const customers = await repository.getAll();
    return res.status(200).send(customers);
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await repository.getById(id);
    return res.status(200).send(customer);
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.post = async (req, res, next) => {
  const data = req.body;
  const contract = new ValidationContract();
  contract.hasMinLen(data.name, 3, 'The customer\'s name must contain at least 3 letters');
  contract.isEmail(data.email, 'The customer\'s E-mail must be valid');
  contract.hasMinLen(data.password, 8, 'The customer\'s password must contain at least 8 letters');

  if (!contract.isValid()) return res.status(400).send(contract.errors());

  try {
    const customer = await repository.post(data);
    return res.status(201).send({ message: 'The customer has been created successfully!' });
  } catch (e) {
    return res.status(400).send(e);
  }
}
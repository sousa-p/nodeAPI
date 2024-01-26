'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();
  const data = req.body;

  contract.hasMinLen(data.name, 3, 'The customer\'s name must contain at least 3 letters');
  contract.isEmail(data.email, 'The customer\'s E-mail must be valid');
  contract.hasMinLen(data.password, 8, 'The customer\'s password must contain at least 8 letters');

  if (!contract.isValid()) return res.status(400).send(contract.errors());

  try {
    const customer = await repository.post(data);
    return res.status(201).send({ message: 'The customer has been created successfully!'});
  } catch (e) {
    return res.status(400).send(e);
  }
}
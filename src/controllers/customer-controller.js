'use strict'

const ValidationContract = require('../validators/fluent-validator');
const emailService = require('../services/email-service');
const repository = require('../repositories/customer-repository');
const bcrypt = require('bcrypt');
const authService = require('../services/auth-service');

exports.login = async (req, res, next) => {
  const data = req.body;
  const contract = new ValidationContract();
  contract.isEmail(data.email, 'The customer\'s E-mail must be valid');
  contract.isRequired(data.password, 'The customer\'s Password is required');

  if (!contract.isValid()) return res.status(400).send(contract.errors());

  try {
    const customer = await repository.getByEmail(data.email);
    if (!customer) return res.status(404).send({ message: 'Not found Customer' });

    let isValidLogin = await bcrypt.compare(data.password + global.SALT_KEY, customer.password);
    if (!isValidLogin) return res.status(400).send({ message: 'Invalid informations' });

    const payload = {
      _id: customer._id,
      email: customer.email,
      name: customer.name
    }

    return res.status(200).send({ data: payload, jwt: authService.generateToken(payload) });
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.refresh = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const data = authService.decodeToken(token);

    const customer = await repository.getById(data._id);
    
    const payload = {
      _id: customer._id,
      email: customer.email,
      name: customer.name
    }

    return res.status(200).send({ data: payload, jwt: authService.generateToken(payload) });
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.get = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const customer = authService.decodeToken(token);

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

    emailService.send(customer.email, 'Bem vindo a Node Store', global.EMAIL_TMPL.replace('{0}', customer.name));

    return res.status(201).send({ message: 'The customer has been created successfully!' });
  } catch (e) {
    return res.status(400).send(e);
  }
}
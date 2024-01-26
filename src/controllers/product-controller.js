
'use strict'

const repository = require('../repositories/product-repository');

exports.getAll = async (req, res, next) => {
  try {
    const products = await repository.getAll();
    return res.status(200).send(products)
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const product = await repository.getBySlug(slug)
    return (product)
      ? res.status(200).send(product)
      : res.status(404).send({ message: "Product not found" });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await repository.getById(id)
    return (product)
      ? res.status(200).send(product)
      : res.status(404).send({ message: "Product not found" });
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.getByTag = async (req, res, next) => {
  try {
    const tag = req.params.tag;
    const product = await repository.getByTag(tag)
    return (product)
      ? res.status(200).send(product)
      : res.status(404).send({ message: "Product not found" });
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.post = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await repository.post(data);
    return res.status(201).send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.put = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = req.body;
    await repository.put(id, product);
    return res.status(200).send({ message: "The product has been updated successfully!" });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await repository.delete(id);
    return res.status(200).send({ message: "The product has been removed successfully!" });
  } catch (e) {
    return res.status(400).send(e);
  }
};

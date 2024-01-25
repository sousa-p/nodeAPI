
'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getBySlug = (req, res, next) => {
  const slug = req.params.slug;

  Product
    .findOne({
      slug: slug,
      active: true
    }, 'title price slug tags description')
    .then(p => {
      if (p) return res.status(200).send(p)
      return res.status(404).send({ message: "Product not found" });

    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.getById = (req, res, next) => {
  const id = req.params.id;

  Product
    .findById(id)
    .then(p => {
      if (p) return res.status(200).send(p)
      return res.status(404).send({ message: "Product not found" });
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
}

exports.getByTag = (req, res, next) => {
  const tag = req.params.tag;

  Product
    .find({
      tags: tag,
      active: true
    })
    .then(p => {
      return res.status(200).send(p)
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
}

exports.getAll = (req, res, next) => {
  Product
    .find({ active: true }, 'title price slug')
    .then(p => {
      return res.status(200).send(p)
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  return res.status(200).send({
    id: id,
    item: req.body
  });
};

exports.post = (req, res, next) => {
  let product;
  product = new Product(req.body);
  product.save()
    .then((_) => {
      return res.status(201).send(product);
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.delete = (req, res, next) => {
  return res.status(200).send(req.body);
};
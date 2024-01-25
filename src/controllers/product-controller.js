
'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/product-repository');

exports.getAll = (req, res, next) => {
  repository.getAll()
    .then(p => {
      return res.status(200).send(p)
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.getBySlug = (req, res, next) => {
  const slug = req.params.slug;

  repository.getBySlug(slug)
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

  repository.getById(id)
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

  repository.getByTag(tag)
    .then(p => {
      return res.status(200).send(p)
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
}

exports.post = (req, res, next) => {
  const data = req.body;

  repository.post(data)
    .then((p) => {
      return res.status(201).send(p);
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  repository.put(id, data)
    .then((_) => {
      res.status(200).send({
        message: "The product has been updated successfully!"
      });
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

exports.delete = (req, res, next) => {
  const id = req.params.id;

  repository.delete(id)
    .then((_) => {
      res.status(200).send({
        message: "The product has been removed successfully!"
      });
    })
    .catch((e) => {
      return res.status(400).send(e);
    })
};

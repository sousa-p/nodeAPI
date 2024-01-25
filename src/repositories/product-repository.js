'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = () => {
  return Product
    .find({
      active: true
    }, 'title price slug');
}

exports.getBySlug = (slug) => {
  return Product
    .findOne({
      slug: slug,
      active: true
    }, 'title price slug tags description');
}

exports.getById = (id) => {
  return Product.findById(id);
}

exports.getByTag = (tag) => {
  return Product
    .find({
      tags: tag,
      active: true
    });
}

exports.post = (data) => {
  let product = new Product(data);
  return product.save();
}

exports.put = (id, data) => {
  return Product
    .findByIdAndDelete(id, {
      $set: {
        title: data.title,
        description: data.description,
        price: data.price,
        slug: data.slug
      }
    });
}

exports.delete = (id) => {
  return Product.findByIdAndDelete(id)
}

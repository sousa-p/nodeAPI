'use strict'

const express = require('express');
const router = express.Router();
const controller = require("../controllers/product-controller");

router.get('/:slug', controller.getBySlug);
router.get('/', controller.getAll);
router.put('/:id', controller.put);
router.post('/', controller.post);
router.delete('/', controller.delete);


module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();
const controller = require("../controllers/product-controller");

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/:slug', controller.getBySlug);
router.get('/tag/:tag', controller.getByTag);
router.get('/id/:id', controller.getById);

router.put('/id/:id', controller.put);
router.delete('/id/:id', controller.delete);


module.exports = router;
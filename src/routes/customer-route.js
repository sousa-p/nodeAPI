'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/', controller.getAll);
router.get('/id/:id', controller.getById);
router.post('/', controller.post);

module.exports = router;
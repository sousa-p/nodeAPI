'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');

router.get('/', controller.getAll);
router.post('/', controller.post);

module.exports = router;
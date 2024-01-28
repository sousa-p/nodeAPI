'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/id/:id', controller.getById);
router.get('/', controller.getAll);
router.get('/', controller.getAll);
router.post('/', controller.post);
router.post('/login', controller.login);


module.exports = router;
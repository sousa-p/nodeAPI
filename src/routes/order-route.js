'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.get('/', authService.isAdmin, controller.getAll);
router.post('/', authService.authorize, controller.post);

module.exports = router;
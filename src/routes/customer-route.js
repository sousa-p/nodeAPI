'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', controller.post);
router.post('/login', controller.login);
router.post('/refresh', authService.authorize, controller.refresh);


module.exports = router;
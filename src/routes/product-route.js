'use strict'

const express = require('express');
const router = express.Router();
const controller = require("../controllers/product-controller");
const authService = require("../services/auth-service");

router.post('/', authService.isAdmin, controller.post);

router.get('/', authService.authorize, controller.getAll);
router.get('/:slug', authService.authorize, controller.getBySlug);
router.get('/tag/:tag', authService.authorize, controller.getByTag);
router.get('/id/:id', authService.authorize, controller.getById);

router.put('/id/:id', authService.isAdmin, controller.put);
router.delete('/id/:id', authService.isAdmin, controller.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// Register
router.post('/register', userController.register);

// Authentication
router.post('/login', userController.login);

module.exports = router;
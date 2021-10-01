const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// Register
router.post('/register', userController.register);

// Authentication
router.post('/login', userController.login);

// Refresh token
router.post('/refresh', userController.refresh);

// Log out
router.post('/logout', userController.logout);

module.exports = router;
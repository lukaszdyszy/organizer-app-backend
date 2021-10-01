const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller.js');
const authorizeUser = require('../controllers/authorize.js');

// Create new note
router.post('/', authorizeUser, noteController.createNote);

module.exports = router;
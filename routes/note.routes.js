const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller.js');
const authorizeUser = require('../controllers/authorize.js');

// Create new note
router.get('/', authorizeUser, noteController.getNotes);

// Create new note
router.post('/', authorizeUser, noteController.createNote);

// Create new note
router.patch('/:id', authorizeUser, noteController.updateNote);

// Delete note
router.delete('/:id', authorizeUser, noteController.deleteNote);

module.exports = router;
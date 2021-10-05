const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');
const authorizeUser = require('../controllers/authorize.js');

// get todos from user
router.get('/', authorizeUser, todoController.getTodos);

// create new todo
router.post('/', authorizeUser, todoController.createTodo);

// mark/unmark done
router.patch('/:id/toggle', authorizeUser, todoController.toggle);

// change title
router.patch('/:id/edit', authorizeUser, todoController.edit);

// delete
router.delete('/:id', authorizeUser, todoController.deleteTodo);

module.exports = router;
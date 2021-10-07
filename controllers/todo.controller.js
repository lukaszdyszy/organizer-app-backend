const bcrypt = require('bcrypt');
const todoModel = require("../models/todo.model.js");
const createError = require('../errors/error.js');

async function getTodos(req, res, next) {
	try {
		const todo = new todoModel({
			id_user: req.user.id_user
		});

		let results = await todo.getAll();

		res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

async function createTodo(req, res, next) {
	try {
		const todo = new todoModel({
			id_user: req.user.id_user,
			title: req.body.title
		});

		await todo.add();

		res.status(200).json({message: 'Todo created successfully'});
	} catch (error) {
		next(error);
	}
}

async function toggle(req, res, next) {
	try {
		const todo = await isEditionPossible(req.user.id_user, req.params.id);

		let results = await todo.toggleDone();

		res.status(200).json({message: 'Todo toggled successfully'});
	} catch (error) {
		next(error);
	}
}

async function edit(req, res, next) {
	try {
		const todo = await isEditionPossible(req.user.id_user, req.params.id);

		todo.title = req.body.title;
		await todo.changeTitle();

		res.status(200).json({message: 'Todo edited successfully'});
	} catch (error) {
		next(error);
	}
}

async function deleteTodo(req, res, next) {
	try {
		const todo = await isEditionPossible(req.user.id_user, req.params.id);

		await todo.delete();

		res.status(200).json({message: 'Todo deleted successfully'});
	} catch (error) {
		next(error);
	}
}




// helpers
async function isEditionPossible(userid, todoid) {
	const todo = new todoModel({
		id_todo: todoid
	});

	// check if todo exists
	let todos = await todo.getById();
	if(todos.length===0){
		throw createError('TODO_NOT_FOUND');
	}
	todo.id_user = todos[0].id_user;

	// authorize
	if(todo.id_user!==userid){
		throw createError('UNAUTHORIZED');
	}

	return todo;
}

module.exports = {
	getTodos,
	createTodo,
	toggle,
	edit,
	deleteTodo
}
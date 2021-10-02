const bcrypt = require('bcrypt');
const noteModel = require("../models/note.model.js");
const createError = require('../errors/error.js');
const jwt = require('jsonwebtoken');

function getNotes(req, res, next) {
	try {
		const note = new noteModel({
			id_user: req.user.id_user
		});
	
		note.getAll().then(result => {
			res.status(200).json(result);
		}).catch(error => {
			next(error);
		});
	} catch (error) {
		console.log(error);
		next(createError(0));
	}
}

function createNote(req, res, next) {
	try {
		if(!req.body.title){
			next(createError('MISSING_PARAMETER_TITLE'));
			return;
		}
		const note = new noteModel({
			id_user: req.user.id_user,
			title: req.body.title
		});
	
		note.add().then(() => {
			res.status(200).json({message: 'Success'});
		}).catch(error => {
			next(error);
		});
	} catch (error) {
		console.log(error);
		next(createError(0));
	}
}

async function updateNote(req, res, next) {
	try {
		const note = new noteModel({
			id_note: req.params.id
		});

		// check if note exists
		const result = await note.getById();
		if(result.length===0){
			next(createError('NOTE_NOT_FOUND'));
			return;
		}
		note.id_user=result[0].id_user;

		// authorize user
		if(note.id_user !== req.user.id_user){
			next(createError('UNAUTHORIZED'));
			return;
		}

		// update title
		if(req.body.title){
			note.title = req.body.title;
			await note.setTitle();
		}
		// update content
		if(req.body.content){
			note.content = req.body.content;
			await note.setContent();
		}
		
		res.status(200).json({message: 'Success'});
	} catch (error) {
		console.log(error);
		next(createError(0));
	}
}


module.exports = {
	getNotes,
	createNote,
	updateNote
}
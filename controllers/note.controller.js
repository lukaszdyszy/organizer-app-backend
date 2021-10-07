const bcrypt = require('bcrypt');
const noteModel = require("../models/note.model.js");
const createError = require('../errors/error.js');
const jwt = require('jsonwebtoken');

async function getNotes(req, res, next) {
	try {
		const note = new noteModel({
			id_user: req.user.id_user
		});
	
		let results = await note.getAll();

		res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

async function createNote(req, res, next) {
	try {
		if(!req.body.title){
			throw createError('MISSING_PARAMETER_TITLE');
		}
		const note = new noteModel({
			id_user: req.user.id_user,
			title: req.body.title
		});
	
		await note.add();

		res.status(200).json({message: 'Note created successfully'});
	} catch (error) {
		next(error);
	}
}

async function updateNote(req, res, next) {
	try {
		const note = await isEditionPossible(req.user.id_user, req.params.id);

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
		
		res.status(200).json({message: 'Note updated successfully'});
	} catch (error) {
		next(error);
	}
}

async function deleteNote(req, res, next) {
	try {
		const note = await isEditionPossible(req.user.id_user, req.params.id);
	
		await note.delete();

		res.status(200).json({message: 'Note deleted successfully'});
	} catch (error) {
		next(error);
	}
}



// helpers
async function isEditionPossible(userid, noteid){
	const note = new noteModel({
		id_note: noteid
	});

	// check if note exists
	const result = await note.getById();
	if(result.length===0){
		throw createError('NOTE_NOT_FOUND');
	}
	note.id_user=result[0].id_user;

	// authorize user
	if(note.id_user !== userid){
		throw createError('UNAUTHORIZED');
	}

	return note;
}


module.exports = {
	getNotes,
	createNote,
	updateNote,
	deleteNote
}
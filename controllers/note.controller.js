const bcrypt = require('bcrypt');
const userModel = require("../models/note.model.js");
const createError = require('../errors/error.js');
const jwt = require('jsonwebtoken');

function createNote(req, res, next) {
	res.status(200).json({message: 'OK'});
}

module.exports = {
	createNote
}
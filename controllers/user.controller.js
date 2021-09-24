const bcrypt = require('bcrypt');
const userModel = require("../models/user.model.js");
const createError = require('../errors/error.js');

function register (req, res, next) {
	let {username, password} = req.body;
	if(username.length < 6 || username.length > 20){
		next(createError('INVALID_USERNAME'));
	}
	if(!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?]).{8,}/g)){
		next(createError('INVALID_PASSWORD'));
	}
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if(err){
			next(createError(0));
		}
		const user = new userModel({
			username: req.body.username,
			password: hash
		});
		user.register().then(msg => {
			res.status(200).json({message: msg});
		}).catch(error => {
			next(error);
		})
	})
}

function login (req, res, next) {
	// let usr = new userModel;
	res.status(200).send("login: to be implemented");
}

module.exports = {
	register,
	login
}
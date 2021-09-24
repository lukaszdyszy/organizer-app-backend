const bcrypt = require('bcrypt');
const userModel = require("../models/user.model.js");
const createError = require('../errors/error.js');

function register (req, res, next) {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if(err){
			next(createError(0));
		}
		const user = new userModel({
			username: req.body.username,
			password: hash
		});
		user.register().then(msg => {
			res.status(200).send(msg);
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
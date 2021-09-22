const bcrypt = require('bcrypt');
const userModel = require("../models/user.model.js");

function register (req, res, next) {
	// const user = new userModel({
	// 	username: req.body.username
	// })
	// res.status(200).send("register: to be implemented");
	const err = new Error();
	err.status = 405;
	// throw err;
	next(err);
}

function login (req, res, next) {
	// let usr = new userModel;
	res.status(200).send("login: to be implemented");
}

module.exports = {
	register,
	login
}
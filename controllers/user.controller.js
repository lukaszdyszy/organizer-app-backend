require('dotenv').config();
const bcrypt = require('bcrypt');
const userModel = require("../models/user.model.js");
const createError = require('../errors/error.js');
const jwt = require('jsonwebtoken');

async function register (req, res, next) {
	try {
		let {username, password} = req.body;
		if(username.length < 6 || username.length > 20){ // username validation
			throw createError('INVALID_USERNAME');
		}
		if(!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?]).{8,}/g)){ // password validation
			throw createError('INVALID_PASSWORD');
		}

		let hash = await bcrypt.hash(req.body.password, 10);

		const user = new userModel({
			username: req.body.username,
			password: hash
		});

		await user.register();

		res.status(200).json({message: 'User registred successfully'});
	} catch (error) {
		if(error.errno===1062){
			error = createError('USERNAME_TAKEN');
		}
		next(error);
	}
}

function login (req, res, next) {
	let {username, password} = req.body;
	const user = new userModel({
		username: username
	});
	user.login().then(users => {
		if(users.length === 0){
			next(createError('AUTHENTICATION_FAILED'));
			return;
		}
		bcrypt.compare(password, users[0].password, (err, result) => {
			if(err){
				next(createError(0));
				return;
			}
			if(!result){
				next(createError('AUTHENTICATION_FAILED'));
				return;
			}
			const payload = createUserPayload(users[0]);
			let authToken = generateAuthToken(payload);
			let refreshToken = generateRefreshToken(payload);
			user.saveRefreshToken(refreshToken).then(() => {
				res.status(200).json({authToken: authToken, refreshToken: refreshToken});
			}).catch(error => {
				next(error);
			});
		});
	}).catch(err => {
		next(err);
	});
}

// Refresh auth token
function refresh(req, res, next) {
	try {
		jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = createUserFromToken(req.body.refreshToken);

		user.getRefreshToken().then(result => {
			if(result.length===1 && result[0].refresh_token===req.body.refreshToken){
				res.status(200).json({token: generateAuthToken(createUserPayload(user))});
			} else {
				next(createError('UNAUTHORIZED'));
				return;
			}
		}).catch(error => {
			next(error);
		});
	} catch (error) {
		next(createError('UNAUTHORIZED'));
	}
}

// Log out
function logout(req, res, next) {
	try {
		jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = createUserFromToken(req.body.refreshToken);

		user.deleteRefreshToken().then(() => {
			res.status(200).json({message: 'Logged out'});
		}).catch(error => {
			next(error);
		});
	} catch (error) {
		next(createError('UNAUTHORIZED'));
	}
}



// helpers
function generateAuthToken(user) {
	return jwt.sign(user, process.env.AUTH_TOKEN_SECRET, {expiresIn: process.env.AUTH_TOKEN_EXPIRE});
}
function generateRefreshToken(user) {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE});
}

function createUserPayload(user){
	return{
		id_user: user.id_user,
		username: user.username
	}
}
function createUserFromToken(token) {
	const payload = jwt.decode(token);
	return new userModel({
		id_user: payload.id_user,
		username: payload.username
	});
}

module.exports = {
	register,
	login,
	refresh,
	logout
}
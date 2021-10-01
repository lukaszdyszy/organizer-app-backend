const jwt = require('jsonwebtoken');
const createError = require('../errors/error.js');

module.exports = function authorizeUser(req, res, next) {
	try {
		req.user = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.AUTH_TOKEN_SECRET);
		next();
	} catch (error) {
		next(createError('UNAUTHORIZED'));
	}
}
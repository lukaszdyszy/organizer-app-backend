function createError(code) {
	const error = new Error();
	switch (code) {
		case 'INVALID_USERNAME':
			error.status = 400;
			error.message = 'Invalid username (must contain 6-20 characters)';
			break;
		case 'INVALID_PASSWORD':
			error.status = 400;
			error.message = 'Invalid password (must contain at least 8 characters, lowercase, uppercase, number and special character)';
			break;
		case 'AUTHENTICATION_FAILED':
			error.status = 401;
			error.message = 'Invalid username or password';
			break;
		case 'UNAUTHORIZED':
			error.status = 403;
			error.message = 'Forbidden';
			break;
		default:
			error.status = 500;
			error.message = 'Internal server error';
			break;
	}
	return error;
}

module.exports = createError;
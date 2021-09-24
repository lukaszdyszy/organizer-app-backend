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
		default:
			error.status = 500;
			error.message = 'Internal server error';
			break;
	}
	return error;
}

module.exports = createError;
function createError(code) {
	const error = new Error();
	switch (code) {
		default:
			error.status = 500;
			error.message = 'Internal server error';
			break;
	}
	return error;
}

module.exports = createError;
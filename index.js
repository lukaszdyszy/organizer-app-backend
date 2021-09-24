require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.routes.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// routes
app.use('/user', userRouter);
app.use((req, res, next) => {
	const error = new Error('Not Found.');
	error.status = 404;
	// console.log(error);
	next(error);
})

// errors handling
app.use((err, req, res, next) => {
	// res.status(err.status).json({message: err.message});
	res.status(err.status).json({message: err.message});
})

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
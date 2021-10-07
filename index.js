require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.routes.js');
const noteRouter = require('./routes/note.routes.js');
const todoRouter = require('./routes/todo.routes.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// routes
app.use('/users', userRouter);
app.use('/notes', noteRouter);
app.use('/todos', todoRouter);
app.use((req, res, next) => {
	const error = new Error('Not Found.');
	error.status = 404;
	next(error);
});

// errors handling
app.use((err, req, res, next) => {
	if(!err.status){
		console.log(err);
		res.status(500).json({message: 'Internal server error'});
	} else {
		res.status(err.status).json({message: err.message});
	}
});

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
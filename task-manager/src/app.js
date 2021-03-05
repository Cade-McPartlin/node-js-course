const express = require('express');
// Ensure mongoose file runs to create db connection.
require('./db/mongoose');
// Require the user router.
const userRouter = require('./routers/user');
// Require the task router.
const taskRouter = require('./routers/task');

// Create express application.
const app = express();

// Automatically parse json into an object.
app.use(express.json());
// Tell express app to use the user router.
app.use(userRouter);
// Tell express app to use the task router.
app.use(taskRouter);

module.exports = app;
const express = require('express');
// Ensure mongoose file runs to create db connection.
require('./db/mongoose');
// Require the user router.
const userRouter = require('./routers/user');
// Require the task router.
const taskRouter = require('./routers/task');

// Create express application.
const app = express();
const port = process.env.PORT || 3000;

// Automatically parse json into an object.
app.use(express.json());
// Tell express app to use the user router.
app.use(userRouter);
// Tell express app to use the task router.
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse');
    console.log(data);
};

myFunction();

const express = require('express');
// Ensure mongoose file runs to create db connection.
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// Automatically parse json into an object.
app.use(express.json());

// Endpoint to save new users to the MongoDB database.
app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Endpoint to save new tasks to the MongoDB database.
app.post('/tasks', (req, res) => {
   const task = new Task(req.body);

   task.save().then(() => {
       res.status(201).send(task);
   }).catch((e) => {
       res.status(400).send(e);
   });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})


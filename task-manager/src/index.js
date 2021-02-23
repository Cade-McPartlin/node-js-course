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
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to get all users.
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to get user by id.
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.patch('/users/:id', async (req, res) => {

    // Get properties from object in request body.
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    // Check and make sure all of the updates in the object request body are in the allowed updates array.
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' });
    }

   try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

       if (!user) {
           return res.status(404).send();
       }

       res.send(user);
   } catch (e) {
       res.status(400).send(e);
   }
});

app.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to save new tasks to the MongoDB database.
app.post('/tasks', async (req, res) => {
   const task = new Task(req.body);

   try {
       await task.save();
       res.status(201).send(task);
   } catch (e) {
       res.status(400).send(e);
   }
});

// Endpoint to get all tasks.
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to get task by id.
app.get('/tasks/:id', async (req, res) => {
   const _id = req.params.id;

   try {
       const task = await Task.findById(_id);
       if (!task) {
           return res.status(404).send();
       }
       res.send(task);
   } catch (e) {
       res.status(500).send(e);
   }
});

app.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidUpdate = updates.every((update) => {
       return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

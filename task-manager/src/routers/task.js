const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');

// Endpoint to save new tasks to the MongoDB database.
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        // es6 spread operator to put each property from req.body on the object inside Task()
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to get all tasks. Optional query strings for filtering.
router.get('/tasks', auth, async (req, res) => {

    const match = {};

    // add completed filter if provided in query string.
    if (req.query.completed) {
        // if completed === string 'true' set completed to boolean true.
        match.completed = req.query.completed === 'true';
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to get task by id.
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id: _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to update task by id.
router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        // Update fields on task with values passed in req.body.
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to delete task by id.
router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
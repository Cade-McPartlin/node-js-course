const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Endpoint to save new users to the MongoDB database.
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user: user, token: token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to login a user.
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();
        res.send({ user: user, token: token });
    } catch (e) {
        res.status(400).send();
    }
});

// Endpoint to logout a user.
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint to logout a user from all of their sessions.
router.post('/users/logoutAll', auth, async (req, res) => {
   try {
       req.user.tokens = [];

       await req.user.save();

       res.send();
   }  catch (e) {
       res.status(500).send(e);
   }
});

// Endpoint to get all users. Pass auth middleware to route.
router.get('/users/me', auth, async (req, res) => {
    // Send the authenticated user back their user.
    res.send(req.user);
});

// Endpoint to get user by id.
router.get('/users/:id', async (req, res) => {
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

// Endpoint to update user by id.
router.patch('/users/:id', async (req, res) => {

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
        const user = await User.findById(req.params.id);

        // Update fields on user with values passed in req.body.
        updates.forEach((update) => {
           user[update] = req.body[update];
        });

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to delete user by id.
router.delete('/users/:id', async (req, res) => {

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

module.exports = router;
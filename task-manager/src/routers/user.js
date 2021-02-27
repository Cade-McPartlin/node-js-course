const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

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

// Endpoint to update user.
router.patch('/users/me', auth, async (req, res) => {
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
        // Update fields on user with values passed in req.body.
        updates.forEach((update) => {
           req.user[update] = req.body[update];
        });

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to delete user.
router.delete('/users/me', auth, async (req, res) => {
    try {
        // User is on the request parameter in the auth middleware function.
        // Delete user.
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint for uploading an avatar image for the user.
const upload = multer({
    dest: 'avatars'
});
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
   res.send();
});

module.exports = router;
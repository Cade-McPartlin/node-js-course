const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');


// Endpoint to save new users to the MongoDB database.
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);

        const token = await user.generateAuthToken();

        res.status(201).send({user: user, token: token});
    } catch (e) {
        res.status(400).send(e);
    }
});

// Endpoint to login a user.
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();
        res.send({user: user, token: token});
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
    } catch (e) {
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
        return res.status(400).send({error: 'Invalid updates.'});
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
        sendCancellationEmail(req.user.email, req.user.name);

        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Endpoint for uploading an avatar image for the user.
const upload = multer({
    limits: {
        // file size in bytes
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // Only accept image files.
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        // Accept the file upload.
        cb(undefined, true);
    }
});

// Endpoint for saving an avatar image to a user.
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // save image on user as a png.
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();

    res.send();
}, (error, req, res, next) => {
    // callback function to handle errors.
    res.status(400).send({error: error.message});
});

// Endpoint for deleting an avatar image on a user.
router.delete('/users/me/avatar', auth, async (req, res) => {
    // Delete avatar image off of user.
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
});

// Endpoint for returning a user's avatar image.
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;
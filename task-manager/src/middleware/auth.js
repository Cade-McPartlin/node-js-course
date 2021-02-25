const jwt = require('jsonwebtoken');
const User = require('../models/user');

// middleware function.
const auth = async (req, res, next) => {

    try {
        // Get authorization token from request header.
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the jwt token passed in the request header.
        const decoded = jwt.verify(token, 'thisismynewcourse');
        // Find a user with correct id and has the token stored.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // Add user to request so we don't need to fetch it from the database again in our route.
        req.user = user;

        // Call the next method to tell express we are done with the middleware function.
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }

};

module.exports = auth;
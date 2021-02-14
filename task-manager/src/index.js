const express = require('express');
// Ensure mongoose file runs to create db connection.
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Automatically parse json into an object.
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})


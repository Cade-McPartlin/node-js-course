const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

// Tell express which templating engine we are using.
app.set('view engine', 'hbs');

app.use(express.static(publicDirectoryPath));

// Create route for root of server
app.get('', (req, res) => {
    // render index template in views dir
    res.render('index', {
        title: 'Weather App',
        name: 'Cade McPartlin'
    });
});

// Create route for about page
app.get('/about', (req, res) => {
   res.render('about', {
        title: 'About Me',
        name: 'Cade McPartlin'
   });
});

// Create route for help page
app.get('/help', (req, res) => {
    res.render('help', {
       title: 'Help Page',
       message: 'This is some helpful text.'
    });
});

// Create route for weather page
app.get('/weather', (req, res) => {
   res.send({
       forecast: 'It is 5 degrees.',
       location: 'Brookfield'
   });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
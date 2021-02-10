const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Create route for root of server.
app.get('', (req, res) => {
    // render index template in views dir
    res.render('index', {
        title: 'Weather App',
        name: 'Cade McPartlin'
    });
});

// Create route for about page.
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cade McPartlin'
    });
});

// Create route for help page.
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Cade McPartlin',
        message: 'This is some helpful text.'
    });
});

// Create route for weather page.
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is 5 degrees.',
        location: 'Brookfield'
    });
});

// Create route for any page that is after /help/ and does not have a route.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cade McPartlin',
        errorMessage: 'Help article not found.',
    });
});

// Create route for any other page that does not have a route defined.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cade McPartlin',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
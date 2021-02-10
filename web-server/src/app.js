const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

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
        title: 'Weather',
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
    // Get data from query string via req.query.
    // Check for required address query parameter.
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    // Call geocode function to get location information.
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        // Call forecast function to get weather information for specified location using latitude and longitude
        // returned from geocode callback.
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

// Create route for any page that is after /help/ and does not have a route.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cade McPartlin',
        errorMessage: 'Help article not found.'
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
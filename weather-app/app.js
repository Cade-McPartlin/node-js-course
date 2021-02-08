const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Get location name from command line argument. Get the third argument.
const address = process.argv[2];

// Only geocode location if a location was provided.
if (!address) {
    console.log('Please provide a location');
} else {
    // Call geocode function to get location information.
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }
        // Call forecast function to get weather information for specified location using data returned from geocode callback.
        forecast(latitude, longitude, (error, weatherData) => {
            if (error) {
                return console.log(error);
            }

            console.log(location);
            console.log(weatherData);
        });
    });
}

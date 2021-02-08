const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Get location name from command line argument. Ignore the first two arguments.
const locationName = process.argv.slice(2)[0];

// Only geocode location if a location was provided.
if (!locationName) {
    console.log('Please provide a location');
} else {
    // Call geocode function to get location information.
    geocode(locationName, (error, locationData) => {
        if (error) {
            return console.log(error);
        }
        // Call forecast function to get weather information for specified location using data returned from geocode callback.
        forecast(locationData.latitude, locationData.longitude, (error, weatherData) => {
            if (error) {
                return console.log(error);
            }

            console.log(locationData.location);
            console.log(weatherData);
        });
    });
}

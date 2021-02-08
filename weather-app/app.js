const request = require('request');

// Weather API call
const url = 'http://api.weatherstack.com/current?access_key=5f6cff2508231da38c3edd9d370c5f9d&query=37.8267,-122.4233&units=f';

request({ url: url, json: true }, (error, response) => {

    if (error) {
        console.log('Unable to connect to weather service!');
    } else if (response.body.error) {
        console.log('Unable to find location');
    } else {
        console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
    }
});

// Geocoding
// Address -> Lat/Long -> Weather
const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/brookfield.json?access_token=pk.eyJ1IjoiY2FkZW1jcGFydGxpbiIsImEiOiJja2t2bGhoMmIxZndhMm9wNnJmdTlyaWhyIn0.DnPlV7F2U-x8HHqgv_DyAw&limit=1';

request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!');
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try again with another search.');
    } else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];
        console.log('Latitude: ' + latitude + ' Longitude: ' + longitude);
    }
});


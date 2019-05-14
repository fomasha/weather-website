const request = require('request');

const geocode = (address, callback) => {
    const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/'
        ${encodeURIComponent(address)}
        .json?access_token=pk.eyJ1IjoibWFzaGFmb21hc2hpbmEiLCJhIjoiY2p2OTRveW5lMGwwNzQ0bnIzNGl6b3R0NSJ9.q3P4SWMrDLLv4V54ePTnvg`;

    request({
        url,
        json: true,
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service!')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location!')
        } else {
            const { features } = response.body;
            const { center, place_name } = features[0];

            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name,
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f8c3eddd868e32f885ca55f1fdd66e86/${latitude},${longitude}`;

    request({
        url,
        json: true,
    }, (error, response) => {
        if (error) {
            callback('Unable to connect weather service!')
        } else if (response.body.error) {
            callback(response.body.error)
        } else {
            const { currently, daily } = response.body;
            const { summary,windSpeed, cloudCover } = daily.data[0];

            callback(undefined, `${summary} It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability}% chance of rain. Wind speed is ${windSpeed} and cloud cover is ${cloudCover}`);
        }
    })
}

module.exports = {
    geocode,
    forecast,
}
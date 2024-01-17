const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoiY29uZ3ZpZW4iLCJhIjoiY2xyNGp5czB2MHNuMDJybzdzNWU3cnlpMyJ9.qP_kEHA-K17jTI6Ou6Gbhw&limit=1";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            const features = body.features[0];
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name,
            });
        }
    });
};

module.exports = geocode;

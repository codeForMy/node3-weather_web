const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=4751086189939d655724d069c0f70f9e&query=" +
        latitude +
        "," +
        longitude;
    // + "&units=f";
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback(
                "Unable to find location. Try another location",
                undefined
            );
        } else {
            const current = body.current;
            callback(
                undefined,
                current.weather_descriptions[0] +
                    ". It is currently " +
                    current.temperature +
                    " degrees out. It is seems like " +
                    current.feelslike +
                    " degrees out."
            );
        }
    });
};

module.exports = forecast;

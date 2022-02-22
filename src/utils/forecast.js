const request = require("request");

const foreCast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=eb3cdb62f78b7ab3ba6f8236905135f3&query=" +
    lattitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". it is currently " +
          body.current.temperature +
          " degrees Fahrenheit out.It feels like " +
          body.current.feelslike +
          " degrees Fahrenheit out"
      );
    }
  });
};
module.exports = foreCast;

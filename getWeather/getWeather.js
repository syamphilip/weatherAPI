const request = require("request");
require('dotenv').config()

const getWeather = (data, callback) => {
  let URL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=${process.env.OPEN_API}`;

  request({ url: URL, json: true }, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      callback(JSON.stringify(body));
    }
  });
};

module.exports = getWeather;

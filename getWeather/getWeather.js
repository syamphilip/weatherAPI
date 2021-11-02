const request = require("request");

const getWeather = (data, callback) => {
  let URL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=9deba395bfcb5cc8cd468d3325ac665b`;

  request({ url: URL, json: true }, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      callback(JSON.stringify(body));
    }
  });
};

module.exports = getWeather;

const request = require("request");
const getWeather = require("../getWeather/getWeather");
require('dotenv').config()

const getGeo = (address, callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.GEOMAP_API}&limit=1`;
  request({ url: URL, json: true }, (error, response) => {

    if (error) {
      callback(error);
    } else {
      let data = {
        lat: JSON.stringify(response.body.features[0].center[1]),
        long: JSON.stringify(response.body.features[0].center[0]),
        loc: JSON.stringify(response.body.features[0].place_name)
      }
      callback(data);
    }
  });
};

module.exports = getGeo;

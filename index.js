const http = require("http");
const url = require('url');
const getGeo = require("./geoCoding/geo");
const getWeather = require("./getWeather/getWeather");
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  weatherLocation: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const WeatherData = mongoose.model("LocationHistory", WeatherSchema);

const connectionURL =
  "mongodb+srv://syamphilip96:syamphilip96@cluster0.oeec8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to DB");
  server.listen(process.env.PORT || 3000);
})

let server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  if (req.url === `/search?location=${queryObject.location}`) {
    if (queryObject.location) {
      return getGeo(queryObject.location, (body) => {
        getWeather(body, (data) => {
          const newWeatherHistory = new WeatherData({
            weatherLocation: queryObject.location
          })
          newWeatherHistory.save();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        });
      });
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("location is missing ");
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("soon active");
  }
});



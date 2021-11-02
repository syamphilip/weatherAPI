const http = require("http");
const url = require('url');
const getGeo = require("./geoCoding/geo");
const getWeather = require("./getWeather/getWeather");

let server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  if (req.url === `/search?location=${queryObject.location}`) {
    if (queryObject.location) {
      return getGeo(queryObject.location, (body) => {
        getWeather(body, (data) => {
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

server.listen(process.env.PORT || 3000);

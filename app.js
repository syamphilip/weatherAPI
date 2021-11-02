const http = require("http");
const getGeo = require("./geoCoding/geo");
const getWeather = require("./getWeather/getWeather");

let server = http.createServer((req, res) => {
  if (req.url === "/") {
    return getGeo("kottayam", (body) => {
      getWeather(body, (data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      });
    });
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("vera url ane\n");
});

server.listen(3000, () => {
  console.log("Server Running");
});

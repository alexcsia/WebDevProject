const express = require("express");
const addMiddlewares = require("./middlewares/index.js");
const mongoose = require("./database");

const app = express();

addMiddlewares(app);

// Logging all the requests being made
app.use((req, res, next) => {
  console.log(`Request made: ${req.method} ${req.url}`);

  next();
});

//Logging responses(file names)
function logResponseData(req, res, filename) {
  console.log(`Response for ${req.method} ${req.url}: Sent ${filename}`);
}

// Server listens on port 3000
app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

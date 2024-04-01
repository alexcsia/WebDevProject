const express = require("express");
const addMiddlewares = require("./middlewares/index.js");
const mongoose = require("./database");

const app = express();

addMiddlewares(app);

// Server listens on port 3000
app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

const express = require("express");
const addMiddlewares = require("./middlewares/index.js");
const mongoose = require("./database");
require("dotenv").config();

const app = express();

addMiddlewares(app);

// Server listens on port 3000
app.listen(process.env.PORT, () => {
  console.log(` Server is listening on port ${process.env.PORT}`);
});

module.exports = app;

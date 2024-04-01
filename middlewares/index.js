const express = require("express");
const path = require("path");
const session = require("express-session");
const { router: authRoutes } = require("../routes/auth.js");
const registerRoutes = require("../routes/register.js");
const searchRoutes = require("../routes/search.js");
const createRoutes = require("../routes/create.js");
const userRoutes = require("../routes/user.js");

function addMiddlewares(app) {
  //EJS config
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");

  //parsing URL encoded and json files
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  //static folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  //mounting routers
  app.use("/auth", authRoutes);
  app.use("/register", registerRoutes);
  app.use("/search", searchRoutes);
  app.use("/create", createRoutes);
  app.use("/user", userRoutes);
}

module.exports = addMiddlewares;

const express = require("express");
const path = require("path");
const session = require("express-session");
const { router: authRoutes } = require("../routes/User/auth.js");
const registerRoutes = require("../routes/User/register.js");
const searchRoutes = require("../routes/Post/search.js");
const createRoutes = require("../routes/Post/post.js");
const userRoutes = require("../routes/User/users.js");

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
  app.use("/post", createRoutes);
  app.use("/users", userRoutes);
}

module.exports = addMiddlewares;

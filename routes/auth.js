const express = require("express");
const router = express.Router();
exports.router = router;
const session = require("express-session");
const User = require("../models/User");
const bcrypt = require("bcrypt");

let isAuthenticated = false;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      console.log("password incorrect");
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    req.session.user = user; //store user data in session
    console.log("user successfully logged in");

    isAuthenticated = true;

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/check-authentication", (req, res) => {
  res.json({ isAuthenticated });
});

router.get("/session", (req, res) => {
  const user = req.session.user;
  res.send(user);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("session ended");
  isAuthenticated = false;
  res.redirect("/");
});

module.exports = {
  router: router,
};

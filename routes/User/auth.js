const express = require("express");
const router = express.Router();
exports.router = router;
const session = require("express-session");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

let isAuthenticated = false;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const loginResponse = await handleLogin(username, password);

  if (loginResponse.success) {
    req.session.user = loginResponse.user;
    isAuthenticated = true;
    res.redirect("/");
  } else {
    res.status(401).json(loginResponse);
  }
});

const handleLogin = async (user, password) => {
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) {
      return { success: false, message: "Invalid login credentials" };
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      return { success: false, message: "Invalid login credentials" };
    }

    //return object containing user
    return { success: true, user: foundUser };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

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

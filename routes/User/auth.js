const express = require("express");
const router = express.Router();
exports.router = router;
const session = require("express-session");
const { handleLogin } = require("../../helperFunctions/userFunctions");
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

router.get("/check-authentication", (req, res) => {
  res.json({ isAuthenticated });
});

// router.get("/session", (req, res) => {
//   const user = req.session.user;
//   res.send(user);
// });

router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("session ended");
  isAuthenticated = false;
  res.redirect("/");
});

module.exports = {
  router: router,
};

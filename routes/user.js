const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.get("/profile", async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.render("profile", {
    user,
  });
});

router.get("/delete", async (req, res) => {
  const user = req.session.user;

  const delUser = await User.deleteOne({ _id: user._id });

  if (delUser.deletedCount === 1) {
    console.log("User deleted successfully");
  } else {
    console.log("User not found");
  }
});

router.post("/edit", async (req, res) => {
  let { first_name, last_name, username, email, phone_number, password } =
    req.body;
  const user = req.session.user;
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  const updatedInfo = {
    $set: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      username: username,
      password: hashedPassword,
    },
  };
  const updateUser = await User.updateOne({ _id: user._id }, updatedInfo);
});

module.exports = router;

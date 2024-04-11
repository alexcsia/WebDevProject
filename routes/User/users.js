const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const {
  deleteUser,
  editProfile,
} = require("../../helperFunctions/userFunctions");

router.get("/profile", async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.render("profile", {
    user,
  });
});

router.delete("/delete", async (req, res) => {
  try {
    const user = req.session.user;

    await deleteUser(user);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user");
  }
});

router.post("/edit", async (req, res) => {
  try {
    let { first_name, last_name, username, email, phone_number, password } =
      req.body;

    const user = req.session.user;
    let hashedPassword;
    if (password.length === 0) {
      password = user.password;
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let newUser = await editProfile(
      first_name,
      last_name,
      username,
      email,
      phone_number,
      hashedPassword,
      user
    );

    if (newUser === undefined) {
      throw new Error("This email/username is already in use");
    }

    req.session.user = newUser;

    console.log(req.session.user);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    console.log(
      JSON.stringify({
        message: error.message,
        stack: error.stack,
      })
    );
    res.status(500).json(error.message);
  }
});

module.exports = router;

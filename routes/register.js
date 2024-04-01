const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/submit", async (req, res) => {
  console.log(req.body);

  try {
    const { first_name, last_name, username, email, phone_number, password } =
      req.body;

    //create a new user
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      username: username,
      password: password,
    });

    console.log(newUser);

    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    console.log(error);
    console.log("yaaaaaapp");
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

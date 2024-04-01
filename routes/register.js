const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/submit", async (req, res) => {
  console.log(req.body);
  // Adding registered users to the user array. Should be done by the database

  try {
    const { first_name, last_name, username, email, phone_number, password } =
      req.body;

    //Create a new user
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
    // Handle any errors that occurred during user creation
    console.error("Error creating user:", error);
    console.log(error);
    console.log("yaaaaaapp");
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

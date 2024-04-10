const express = require("express");
const User = require("../../models/User");

const router = express.Router();

router.post("/submit", async (req, res) => {
  console.log(req.body);

  const { first_name, last_name, username, email, phone_number, password } =
    req.body;

  const handleRegister = await registerUser(
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password
  );

  if (handleRegister.succes) {
    res.redirect("/");
    console.log(handleRegister.message);
  } else {
    return res.status(500).json(handleRegister);
  }
});

const registerUser = async (
  first_name,
  last_name,
  username,
  email,
  phone_number,
  password
) => {
  try {
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

    return { succes: true, message: "User created successfully!" };
  } catch {
    return {
      succes: false,
      message: "Error creating user: Username/Email already exists!",
    };
  }
};

module.exports = router;

const express = require("express");
const User = require("../../models/User");
const { registerUser } = require("../../helperFunctions/userFunctions");
const router = express.Router();

router.post("/submit", async (req, res) => {
  const { first_name, last_name, username, email, phone_number, password } =
    req.body;

  console.log(
    "REQUEST BODY:",
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password
  );
  const handleRegister = await registerUser(
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password
  );

  if (handleRegister.success) {
    res.redirect("/");
    console.log(handleRegister.message);
  } else {
    return res.status(500).json(handleRegister);
  }
});

module.exports = router;

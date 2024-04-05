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

router.delete("/delete", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const delUser = await User.deleteOne({ _id: user._id });
    if (delUser.deletedCount === 1) {
      console.log("User deleted successfully");
      res.sendStatus(200);
    } else {
      console.log("User not deleted");
      res.status(500).send("User not deleted");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    let { first_name, last_name, username, email, phone_number, password } =
      req.body;

    const user = req.session.user;
    let hashedPasswordToChange;
    let passwordUnchanged;
    let passwordsMatch;

    if (password.length === 0) {
      throw new Error("Invalid password");
    } else if (password.length < 60) {
      hashedPasswordToChange = await bcrypt.hash(password, 10);

      passwordUnchanged = await bcrypt.compare(password, user.password);
    } else {
      passwordsMatch = await bcrypt.compareSync(password, user.password);
    }

    const updatedInfo = {
      $set: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        username: username,
      },
    };

    // if it changed, update the password field in the database
    if (!passwordUnchanged) {
      updatedInfo.$set.password = hashedPasswordToChange;
    } else if (!passwordsMatch) {
      updatedInfo.$set.password = password;
    }

    const updateUser = await User.updateOne({ _id: user._id }, updatedInfo);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

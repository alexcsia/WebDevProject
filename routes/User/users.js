const express = require("express");
const session = require("express-session");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { getPostsNumber } = require("../../stats/postsPerUser");
const getCommentsPerUser = require("../../stats/commentsPerUser");
const userFunctions = require("../../services/userFunctions");

const router = express.Router();

router.get("/profile", async (req, res) => {
  const user = req.session.user;
  const posts = await getPostsNumber(user);
  const comments = await getCommentsPerUser(user);

  let postsMade = posts[0].totalPosts;
  let commentsMade = comments[0].totalComments;

  res.render("profile", {
    user,
    postsMade,
    commentsMade,
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

    console.log("the user in session", user);

    //if password field has been modified, hash the new password
    if (password.length === 0) {
      password = user.password;
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let newUser = await userFunctions.editProfile(
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

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    console.log(
      JSON.stringify({
        message: error.message,
      })
    );
    res.status(500).json(error.message);
  }
});

module.exports = router;

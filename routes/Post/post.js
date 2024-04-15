const express = require("express");
const router = express.Router();
const session = require("express-session");
const { createPost } = require("../../services/postFunctions");

router.post("/new", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { first_name, last_name } = req.session.user;

    await createPost(title, content, tags, first_name, last_name);

    console.log("post created successfully");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An article with the same title already exists!" });
  }
});

module.exports = router;

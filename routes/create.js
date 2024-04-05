const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const session = require("express-session");

router.post("/newPost", async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newPost = await Post.create({
      title: title,
      content: content,
      tags: tags,
      author: {
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
      },
    });
    console.log("post created successfully");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while creating post: Title already exists" });
  }
});

module.exports = router;

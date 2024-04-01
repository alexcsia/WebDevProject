const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const session = require("express-session");

router.post("/newPost", async (req, res) => {
  console.log("Session:", req.session);
  console.log("User in session:", req.session.user);
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
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error while creating post" });
  }
});

module.exports = router;

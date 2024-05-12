const express = require("express");
const router = express.Router();
const session = require("express-session");
const { createPost, getArticle } = require("../../services/postFunctions");
const createComment = require("../../services/commentFunctions");

router.post("/new", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { first_name, last_name, username } = req.session.user;

    await createPost(title, content, tags, first_name, last_name, username);

    console.log("post created successfully");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An article with the same title already exists!" });
  }
});

router.post("/comment/:articleName", async (req, res) => {
  const { content } = req.body;
  const user = req.session.user;
  const articleName = req.params.articleName;

  const article = await getArticle(articleName);
  const comment = await createComment(article._id, user.username, content);
  res.sendStatus(200);
});

module.exports = router;

const express = require("express");

const { route } = require("../User/auth");
const router = express.Router();
const Post = require("../../models/Post");

router.get("/find", async (req, res) => {
  const searchedString = req.query.searchTerm;
  const searchTerms = searchedString
    .split(" ")
    .filter((term) => term.trim() !== "");

  try {
    const articles = await Post.find({
      $or: [
        //case insensitive search, one query for all searched terms per title/tags
        { title: { $regex: new RegExp(searchTerms.join("|"), "i") } },
        { tags: { $regex: new RegExp(searchTerms.join("|"), "i") } },
      ],
    });

    res.render("searchResults", {
      searchTerms,
      articles,
      searchedString,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/articles/:articlename", async (req, res) => {
  const articlename = req.params.articlename;

  console.log(articlename);
  const article = await Post.findOne({ title: articlename }).timeout(5000);

  const { title, content, tags, author, _id } = article;

  res.render("article", { title, author, tags, content });
});

module.exports = router;

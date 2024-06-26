const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const {
  postCountByTag,
  findArticle,
  getArticle,
} = require("../../services/postFunctions");
const getCommentsPerPost = require("../../stats/commentsPerPost");

router.get("/find", async (req, res) => {
  const searchedString = req.query.searchTerm;
  const searchTerms = searchedString
    .split(" ")
    .filter((term) => term.trim() !== "");

  try {
    const articles = await findArticle(searchTerms);

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

  try {
    const { title, content, tags, author, _id } = await getArticle(articlename);

    const commentsArr = await getCommentsPerPost(_id);

    res.render("article", {
      commentsArr,
      title,
      author,
      tags,
      content,
    });
  } catch (error) {
    res.status(404).json({ error: "Article not found" });
    console.log(error);
  }
});

module.exports = router;

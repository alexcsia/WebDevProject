const express = require("express");
const db = require("../fakeDB.json");
const { route } = require("./auth");
const router = express.Router();
const Post = require("../models/Post");

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
  console.log("req received");
  console.log(articlename);
  const article = await Post.findOne({ title: articlename });
  const { title, content, tags, author, _id } = article;
  //send the test file modified as a template with the content and title and whatever else
  // res.send(
  //   `This is a response for the article ${article.title}, ${article.author}, ${article.tags}, ${article.content}`
  // );

  res.render("article", { title, author, tags, content });
});

//displaying articles
router.get("/testing", (req, res) => {
  console.log("request for article");

  res.render("article");
});

module.exports = router;

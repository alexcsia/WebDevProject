const Post = require("../models/Post");

const findArticle = async (searchTerms) => {
  const articles = await Post.find({
    $or: [
      //case insensitive search, one query for all searched terms per title/tags
      { title: { $regex: new RegExp(searchTerms.join("|"), "i") } },
      { tags: { $regex: new RegExp(searchTerms.join("|"), "i") } },
    ],
  });
  return articles;
};

const getArticle = async (articlename) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const article = await Post.findOne({ title: articlename });
  return article;
};

const createPost = async (
  title,
  content,
  tags,
  first_name,
  last_name,
  username
) => {
  const newPost = await Post.create({
    title: title,
    content: content,
    tags: tags,
    author: {
      first_name: first_name,
      last_name: last_name,
      username: username,
    },
  });
};

module.exports = { findArticle, getArticle, createPost };

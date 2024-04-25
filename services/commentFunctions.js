const Comment = require("../models/Comment");

const createComment = async (articleID, username, content) => {
  const comment = Comment.create({
    author: { username: username },
    content: content,
    postID: articleID,
  });
  return comment;
};

module.exports = createComment;

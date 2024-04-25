const Comment = require("../models/Comment");
const Post = require("../models/Post");

async function getCommentsPerPost(id) {
  const pipeline = [
    {
      $match: { postID: id },
    },

    {
      $project: {
        _id: 0,
        username: "$author.username",
        content: 1,
      },
    },
  ];

  const result = await Comment.aggregate(pipeline);
  return result;
}

module.exports = getCommentsPerPost;

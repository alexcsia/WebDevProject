const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

async function getCommentsPerUser(user) {
  const pipeline = [
    {
      $match: { author: { username: user.username } },
    },
    {
      $group: {
        _id: "$author.username",
        totalComments: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalComments: 1,
      },
    },
  ];

  const result = Comment.aggregate(pipeline);
  return result;
}

module.exports = getCommentsPerUser;

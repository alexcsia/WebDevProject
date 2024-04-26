const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
require("dotenv").config();

async function postsPerUser() {
  try {
    const aggregation = [
      {
        $group: {
          _id: "$author.username",
          totalPosts: { $sum: 1 },
        },
      },

      {
        $sort: { totalPosts: -1 },
      },
      {
        $project: {
          _id: 0,
          username: "$_id",
          totalPosts: 1,
        },
      },
      {
        $limit: 25,
      },
    ];

    const result = await Post.aggregate(aggregation);
    console.log(result);

    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getPostsNumber(user) {
  try {
    const aggregation = [
      {
        $match: { "author.username": user.username },
      },
      {
        $group: {
          _id: user.username,
          totalPosts: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalPosts: 1,
        },
      },
    ];

    const result = await Post.aggregate(aggregation);

    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = { postsPerUser, getPostsNumber };

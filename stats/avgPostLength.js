const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
require("dotenv").config();

async function avgPostLengthPerUser() {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$author.username",
          totalWords: { $sum: { $size: { $split: ["$content", " "] } } }, // calculate total words
          totalPosts: { $sum: 1 },
        },
      },
      {
        $addFields: {
          avgPostLength: {
            $toInt: { $divide: ["$totalWords", "$totalPosts"] },
          },
        },
      },
      {
        $sort: { avgPostLength: -1 },
      },
      {
        $project: {
          _id: 0,
          username: "$_id",
          avgPostLength: 1,
        },
      },
      {
        $limit: 25,
      },
    ];

    const result = await Post.aggregate(pipeline);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = avgPostLengthPerUser;

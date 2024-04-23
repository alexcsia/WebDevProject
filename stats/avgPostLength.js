const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

mongoose.connect("mongodb://localhost:27017/blogwebsite");

const db = mongoose.connection;

async function avgPostLengthPerUser() {
  try {
    const pipeline = [
      { $limit: 100 },

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
    ];

    const result = await Post.aggregate(pipeline);
    const explain = await Post.aggregate(pipeline).explain();
    console.log(result);
    console.log(explain);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

avgPostLengthPerUser();

module.exports = avgPostLengthPerUser;

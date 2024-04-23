const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

mongoose.connect("mongodb://localhost:27017/blogwebsite");

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
    ];

    // Analyze the aggregation pipeline
    const result = await Post.aggregate(aggregation); //.analyze();

    // Explain the aggregation pipeline
    const explanation = await Post.aggregate(aggregation).explain(
      "executionStats"
    );

    console.log("Analysis Result:", result);
    // console.log("Aggregation Explanation:", explanation);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

postsPerUser();

module.exports = postsPerUser;
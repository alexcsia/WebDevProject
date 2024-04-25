const mongoose = require("mongoose");
const Post = require("../models/Post");
require("dotenv").config();

const postCountByTag = async () => {
  try {
    const postCount = await Post.aggregate([
      {
        //deconstructs the tags array in each document and creates a separate doc for each tag
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1,
        },
      },
    ]);

    return postCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = postCountByTag;

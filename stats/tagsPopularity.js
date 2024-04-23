const mongoose = require("mongoose");
const Post = require("../models/Post");

mongoose.connect("mongodb://localhost:27017/blogwebsite");

const postCountByTag = async () => {
  try {
    const postCount = await Post.aggregate([
      {
        //deconstructs the tags array in each document and creates a separate doc for each tag
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags", //group by tags field and count each tag occurance
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, //sort by count in descending order
      },
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1,
        },
      },
    ]);
    console.log(postCount);
    return postCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
postCountByTag();
module.exports = postCountByTag;

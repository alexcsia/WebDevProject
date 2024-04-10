const Post = require("../models/Post");

const postCountByTag = async () => {
  try {
    const postCount = await Post.aggregate([
      {
        $unwind: "$tags", // Deconstruct the tags array
      },
      {
        $addFields: {
          // Add a new field to split tags into an array
          individualTags: {
            $split: ["$tags", " "], // Split the tags by space
          },
        },
      },
      {
        $unwind: "$individualTags", // Deconstruct the individualTags array
      },
      {
        $group: {
          _id: "$individualTags", // Group by individual tag
          count: { $sum: 1 }, // Count the occurrences of each tag
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from output
          tag: "$_id", // Rename _id field to tag
          count: 1, // Include count field in output
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

const createPost = async (title, content, tags, first_name, last_name) => {
  const newPost = await Post.create({
    title: title,
    content: content,
    tags: tags,
    author: {
      first_name: first_name,
      last_name: last_name,
    },
  });
};

module.exports = { postCountByTag, findArticle, getArticle, createPost };

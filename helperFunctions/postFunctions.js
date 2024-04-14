const Post = require("../models/Post");

const postCountByTag = async () => {
  try {
    const postCount = await Post.aggregate([
      {
        $unwind: "$tags", // deconstruct the tags array
      },
      {
        $addFields: {
          // add a new field to split tags into an array
          individualTags: {
            $split: ["$tags", " "],
          },
        },
      },
      {
        $unwind: "$individualTags", // deconstruct the individualTags array
      },
      {
        // group by individual tag and count the occurrences of each tag
        $group: {
          _id: "$individualTags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // exclude _id field from output
          tag: "$_id", // rename _id field to tag
          count: 1, // include count field in output
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

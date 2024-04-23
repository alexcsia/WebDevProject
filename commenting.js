const Comment = require("./models/Comment");
const Post = require("./models/Post");
const User = require("./models/User");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/blogwebsite");
mongoose.connect(process.env.MONGODB_URI);

async function test() {
  const newUser = await User.create({
    first_name: "test_fn",
    last_name: "test_ln",
    email: "existing@email",
    phone_number: "test_pn",
    username: "test_username",
    password: "test_password",
  });

  const newPost = await Post.create({
    title: "test-article",
    content: "content",
    tags: "tags",
    author: {
      first_name: "first_name",
      last_name: "last_name",
      username: "username",
    },
  });

  const newComment = await Comment.create({
    author: { username: newUser.username },
    content: "This is a comment",
    postID: newPost._id,
  });

  console.log(newUser);
  console.log(newPost);
  console.log(newComment);
  console.log("***************************");
  const postInQuestionID = newComment.postID;
  const amgasitpostarea = await Post.findById(postInQuestionID);

  console.log(amgasitpostarea);

  await User.deleteOne({ email: "existing@email" });
  await Post.deleteOne({ title: "test-article" });
  await Comment.deleteOne({ postID: newPost._id });
}

test();

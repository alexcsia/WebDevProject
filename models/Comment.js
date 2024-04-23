const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    username: { type: String, required: true },
  },
  content: { type: String, required: true },
  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = mongoose.model("Comment", commentSchema);

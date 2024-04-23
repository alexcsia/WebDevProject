const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
  },
});

module.exports = mongoose.model("Post", postSchema);

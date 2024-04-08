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
  },
  // TODO: commenting system
  comments: {
    user: { type: String },
    comment: { type: String },
    date: { type: Date },
  },
});

module.exports = mongoose.model("Post", postSchema);

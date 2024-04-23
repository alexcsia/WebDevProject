const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const popularTags = require("../../stats/tagsPopularity");
const postsPerUser = require("../../stats/postsPerUser");
const avgPostLengthPerUser = require("../../stats/avgPostLength");

router.get("/trending/tags", async (req, res) => {
  const tagPopularity = await popularTags();
  const userPostCount = await postsPerUser();
  const postLength = await avgPostLengthPerUser();

  console.log(userPostCount);
  console.log(postLength);

  res.render("trending", { tagPopularity, userPostCount, postLength });
});
module.exports = router;

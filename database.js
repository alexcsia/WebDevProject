require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
console.log("connected to mongodb");

module.exports = mongoose;

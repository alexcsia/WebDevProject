const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging all the requests being made
app.use((req, res, next) => {
  console.log(`Request made: ${req.method} ${req.url}`);

  next();
});

//Logging responses(file names)
function logResponseData(req, res, filename) {
  console.log(`Response for ${req.method} ${req.url}: Sent ${filename}`);
}

// Route handler for POST requests to '/submit'
app.post("/submit", (req, res) => {
  console.log(req.body);
});

// Route handler for serving the index.html file
app.get("/", (req, res) => {
  const file_path = path.join(__dirname + "/public", "index.html");
  res.status(200).sendFile(file_path);
  logResponseData(req, res, "index.html");
});

// Dynamic file routing for the rest of the files
app.get("/:fileName", (req, res) => {
  const filename = req.params.fileName;
  const filePath = path.join(__dirname + "/public", filename);
  res.status(200).sendFile(filePath);
  logResponseData(req, res, filename);
});

// Server listens on port 3000
app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});

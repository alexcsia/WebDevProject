const http = require("http");
const assert = require("assert");

// Test series 1 - correct status code and correct response type (html)

const optionsArray = [
  { hostname: "localhost", port: 3000, path: "/about.html", method: "GET" },
  { hostname: "localhost", port: 3000, path: "/index.html", method: "GET" },
  { hostname: "localhost", port: 3000, path: "/third.html", method: "GET" },
  { hostname: "localhost", port: 3000, path: "/test.html", method: "GET" },
  {
    hostname: "localhost",
    port: 3000,
    path: "/non_existent_page.html",
    method: "GET",
  },
];

optionsArray.forEach((options) => {
  const req = http.request(options, (res) => {
    let responseData = "";

    // Event handler for receiving data chunks - this captures the data incrementally
    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      //Testing inexistent pages separately
      if (options.path.startsWith("/non_existent_page")) {
        try {
          assert.strictEqual(
            res.statusCode,
            404,
            `Status code should be 404, but was ${res.statusCode}`
          );
          //All tests passed
          console.log("All tests passed for:", options.path);
        } catch (error) {
          console.error(
            `Assertion error for ${options.path}: ${error.message}`
          );
        }
      }
      //Testing the existent pages
      else {
        try {
          //Asserting if status code is correct
          assert.strictEqual(
            res.statusCode,
            200,
            `Status code should be 200, but was ${res.statusCode}`
          );
        } catch (error) {
          console.error(
            `Assertion error for ${options.path}: ${error.message}`
          );
        }
        try {
          //Asserting if response type is correct(html)
          const contentType = res.headers["content-type"];
          const mediaType = contentType.split(";")[0].trim();
          assert.strictEqual(
            mediaType,
            "text/html",
            `Response type should be html, but was ${contentType}`
          );

          //All tests passed
          console.log("All tests passed for:", options.path);
        } catch (error) {
          console.error(
            `Assertion error for ${options.path}: ${error.message}`
          );
        }
      }
    });
  });

  // Event handler for request errors
  req.on("error", (err) => {
    console.error("Request error:", err.message);
  });

  // End the request
  req.end();
});

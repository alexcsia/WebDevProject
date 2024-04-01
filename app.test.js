const app = require("./server");
const User = require("./models/User");
const assert = require("assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("supertest");

//Commands to run the tests:
//in cmd line:
//set NODE_OPTIONS=--experimental-vm-modules
//npx jest

// Mock the User model's create method
jest.mock("./models/User", () => ({
  create: jest.fn(),
}));

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});
describe("POST /submit", () => {
  describe("given user register values", () => {
    test.only("should respond with 200 status code", async () => {
      // Define the request body
      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      // Mock the behavior of User.create()
      User.create.mockResolvedValue({});

      // Make the request to your Express app
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      // Assert the response status code
      expect(response.statusCode).toBe(302);

      // Assert that User.create() was called with the correct arguments
      expect(User.create).toHaveBeenCalledWith(reqBody);

      // Optionally, you can assert other aspects of the response or mock behavior as needed
    }, 50000); // Timeout placed outside the test call
  });
});

// describe("POST /submit", () => {
//   describe("given user register values", () => {
//     // should save the values to the db
//     // should return status for redirect
//     // should redirect to homepage
//     test.only("should respond with 200 status code", async () => {
//       console.log("test");
//       const response = await request(app).post("/register/submit").send({
//         first_name: "test_fn",
//         last_name: "test_ln",
//         email: "test@email",
//         phone_number: "test_pn",
//         username: "test_username",
//         password: "test_password",
//       });

//       //status code for redirect
//       expect(response.statusCode).toBeOneOf([200, 302, 303]);
//     }, 10000);
//   });
// });

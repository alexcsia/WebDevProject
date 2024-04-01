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

// mock User model's create method
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
      // request body
      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      // mocking the behavior of User.create()
      User.create.mockResolvedValue({});
      //make request
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      // asserting the response status code
      expect(response.statusCode).toBe(302);

      // asserting that User.create() was called with req body
      expect(User.create).toHaveBeenCalledWith(reqBody);
    }, 50000); // Timeout placed outside the test call
  });
});

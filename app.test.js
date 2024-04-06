const app = require("./server");
const User = require("./models/User");
const assert = require("assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("supertest");
const session = require("supertest-session");

//Commands to run the tests:
//in cmd line:
//set NODE_OPTIONS=--experimental-vm-modules
//npx jest

// mock the user model, replace create with empty function
jest.mock("./models/User", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

const mockSession = {
  user: null,
  save: jest.fn(),
};

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});
describe("POST /submit", () => {
  describe("given user register values", () => {
    test("should respond with 302 status code", async () => {
      // request body
      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      //make request
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      // asserting the response status code is a redirect
      expect(response.statusCode).toBe(302);

      // asserting that User.create() was called with the correct req body
      expect(User.create).toHaveBeenCalledWith(reqBody);
    });
  });
});

describe("POST /login", () => {
  describe("when user authenticates correctly", () => {
    test("response should redirect", async () => {
      const userData = {
        username: "testuser",
        password: "testpassword",
      };
      //findOne will always return the userData
      User.findOne.mockResolvedValueOnce(userData);
      //mocking bcrypt to always return true
      bcrypt.compare.mockResolvedValueOnce(true);

      const response = await request(app).post("/auth/login").send(userData);

      expect(response.statusCode).toBe(302);
    });
    test("user object should be stored in session when authenticated", async () => {
      const userData = {
        username: "testuser",
        password: "testpassword",
      };

      //findOne will always return the userData
      User.findOne.mockResolvedValueOnce(userData);
      //mocking bcrypt to always return true
      bcrypt.compare.mockResolvedValueOnce(true);

      const testSession = session(app); // Initialize supertest-session with your Express app

      const response = await testSession.post("/auth/login").send(userData);

      // Access session data from the testSession object
      console.log(testSession._store); // Log the session data to see its contents
      expect(testSession._store).toHaveProperty("user");
      expect(testSession._store).toHaveProperty("user"); // Check if user exists in session
      expect(testSession._store.user).toEqual(userData); // Assert user data in session
    });
  });
  describe("when user is not authenticated", () => {
    test("should respond with 401 status code and error message", async () => {
      const userData = {
        username: "testuser",
        password: "testpassword",
      };
      //findOne will always return the userData
      User.findOne.mockResolvedValueOnce(userData);
      //mocking bcrypt to always return false
      bcrypt.compare.mockResolvedValueOnce(false);
      const response = await request(app).post("/auth/login").send(userData);
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ message: "Invalid login credentials" });
    });
  });
});

describe("POST /logout", () => {
  describe("when user is authenticated", () => {
    test("should respond with 200 status code", async () => {
      // Test logic for testing GET /profile route when user is authenticated...
    });
  });
});

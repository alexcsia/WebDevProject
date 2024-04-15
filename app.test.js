const app = require("./server");
const User = require("./models/User");
const assert = require("assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("supertest");
const Post = require("./models/Post");

//Commands to run the tests:
//in cmd line:
//set NODE_OPTIONS=--experimental-vm-modules
//npx jest

jest.mock("./models/Post", () => ({
  findOne: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

beforeAll((done) => {
  server = app.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});
describe("POST /submit", () => {
  describe("when user registers correctly", () => {
    test("should respond with 302 status code", async () => {
      const createUserMock = jest.spyOn(User, "create").mockResolvedValueOnce({
        _id: "user_id",
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      });

      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      // make request
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      // assert the response status code is a redirect
      expect(response.statusCode).toBe(302);

      // assert that User.create() was called with the correct req body
      expect(User.create).toHaveBeenCalledWith(reqBody);
    });
  });
  describe("when registering with already existing credentials", () => {
    test("should respond with 500 status code and error message", async () => {
      const userFunctions = require("./services/userFunctions");

      const mockedRegisterUser = jest.spyOn(userFunctions, "registerUser");
      mockedRegisterUser.mockResolvedValueOnce({
        success: false,
        message: "Error creating user: Username/Email already exists!",
      });

      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "test@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      // make request
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      expect(User.create).toHaveBeenCalledWith(reqBody);

      expect(response.body).toEqual({
        success: false,
        message: "Error creating user: Username/Email already exists!",
      });
    });
  });
});

describe("POST /login", () => {
  describe("when user authenticates correctly", () => {
    test("response should redirect", async () => {
      const createUserMock = jest.spyOn(User, "findOne").mockResolvedValueOnce({
        username: "testuser",
        password: "testpassword",
      });

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
  });
  describe("when user is not authenticated correctly", () => {
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
      const responseBody = response.body;
      expect(responseBody).toEqual({
        success: false,
        message: "Invalid login credentials",
      });
    });
  });
});

describe("GET /articles/:articlename", () => {
  describe("when user clicks on an article", () => {
    test("should retrieve the rendered article", async () => {
      const articlename = "test-article";
      const mockArticle = {
        title: "Test Article",
        content: "This is a test article.",
        author: { first_name: "first name", last_name: "last name" },
      };

      Post.findOne.mockResolvedValueOnce(mockArticle);

      const response = await request(app).get(
        `/search/articles/${articlename}`
      );

      expect(response.statusCode).toBe(200);

      expect(response.text).toContain(mockArticle.title);
      expect(response.text).toContain(mockArticle.content);
      expect(response.text).toContain(mockArticle.author.first_name);
      expect(response.text).toContain(mockArticle.author.last_name);
    });
  });
});

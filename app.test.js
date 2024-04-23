const app = require("./server");
const User = require("./models/User");
const assert = require("assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("supertest");
const Post = require("./models/Post");
const reqs = require("supertest-session");
//const { password } = require("pg/lib/defaults");

//npx jest app.test.js'

//Commands to run the tests:
//in cmd line:
//set NODE_OPTIONS=--experimental-vm-modules
//npx jest

beforeAll((done) => {
  server = app.listen(3002, done);
});

afterAll(async () => {
  server.close();
});

afterEach(async () => {
  await User.deleteMany({ username: "test_username" });
});

describe("POST /submit", () => {
  describe("when user registers correctly", () => {
    test("should respond with 302 status code", async () => {
      //insert a user
      const reqBody = {
        first_name: "firstname",
        last_name: "lastname",
        email: "test@email",
        phone_number: "123456789",
        username: "test_username",
        password: "password",
      };

      // make request
      const response = await request(app)
        .post("/register/submit")
        .send(reqBody);

      // assert the response status code is a redirect
      expect(response.statusCode).toBe(302);
    });
  });
});
describe("when registering with already existing credentials", () => {
  test("should respond with 500 status code and error message", async () => {
    const newUser = await User.create({
      first_name: "firstname",
      last_name: "lastname",
      email: "test@email",
      phone_number: "123456789",
      username: "test_username",
      password: "password",
    });

    //attempting to register already existing user
    const testReq = {
      first_name: "firstname",
      last_name: "lastname",
      email: "test@email",
      phone_number: "123456789",
      username: "test_username",
      password: "password",
    };

    const testResponse = await request(app)
      .post("/register/submit")
      .send(testReq);

    expect(testResponse.body).toEqual({
      success: false,
      message: "Error creating user: Username/Email already exists!",
    });
  });
});

describe("POST /login", () => {
  describe("when user authenticates correctly", () => {
    test("response should redirect", async () => {
      const newUser = await User.create({
        first_name: "firstname",
        last_name: "lastname",
        email: "test@email",
        phone_number: "123456789",
        username: "test_username",
        password: "password",
      });

      const userData = {
        username: "test_username",
        password: "password",
      };

      const response = await request(app).post("/auth/login").send(userData);

      expect(response.statusCode).toBe(302);
    });
  });
  describe("when user is not authenticated correctly", () => {
    test("should respond with 401 status code and error message", async () => {
      const newUser = await User.create({
        first_name: "firstname",
        last_name: "lastname",
        email: "test@email",
        phone_number: "123456789",
        username: "test_username",
        password: "password",
      });

      const userData = {
        username: "test_username",
        password: "testpassword",
      };

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

describe("POST /users/edit", () => {
  describe("when the user attempts to edit their profile", () => {
    let agent;
    agent = reqs(app);
    test("should send status 200", async () => {
      // Create a user in the test database
      const newUser = await User.create({
        first_name: "firstname",
        last_name: "lastname",
        email: "test@email",
        phone_number: "123456789",
        username: "tobechanged_username",
        password: "password",
      });

      // log in as the created user to establish a session
      await agent
        .post("/auth/login")
        .send({ username: "tobechanged_username", password: "password" });

      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "testing@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      const response = await agent.post("/users/edit").send(reqBody);

      expect(response.statusCode).toBe(200);
      agent.cookies = [];
    });
  });
  describe("when the user attempts to edit their profile with already existing info", () => {
    let agent;
    agent = reqs(app);

    test("should send status 500 and throw error", async () => {
      const existingUser = await User.create({
        first_name: "existingfirstname",
        last_name: "existinglastname",
        email: "test@email",
        phone_number: "123456789",
        username: "test_username",
        password: "existingpassword",
      });

      const editedUser = await User.create({
        first_name: "firstname",
        last_name: "lastname",
        email: "edited@email",
        phone_number: "123456789",
        username: "edit_username",
        password: "password",
      });

      // log in as the created user to establish a session
      await agent
        .post("/auth/login")
        .send({ username: "edit_username", password: "password" });

      const reqBody = {
        first_name: "test_fn",
        last_name: "test_ln",
        email: "existing@email",
        phone_number: "test_pn",
        username: "test_username",
        password: "test_password",
      };

      const response = await agent.post("/users/edit").send(reqBody);
      expect(response.statusCode).toBe(500);

      const responseBody = response.body;
      expect(responseBody).toEqual("This email/username is already in use");
      const delUser = await User.deleteOne({ username: "edit_username" });
      agent.cookies = [];
    });
  });
});

describe("GET /articles/:articlename", () => {
  describe("when user clicks on an article", () => {
    test("should retrieve the rendered article", async () => {
      const newPost = await Post.create({
        title: "test-article",
        content: "content",
        tags: "tags",
        author: {
          first_name: "first_name",
          last_name: "last_name",
          username: "username",
        },
      });

      const articlename = "test-article";

      const response = await request(app).get(
        `/search/articles/${articlename}`
      );

      expect(response.statusCode).toBe(200);

      expect(response.text).toContain(newPost.title);
      expect(response.text).toContain(newPost.content);
      expect(response.text).toContain(newPost.author.first_name);
      expect(response.text).toContain(newPost.author.last_name);

      const delPost = await Post.deleteOne({ title: "test-article" });
    });
  });
});

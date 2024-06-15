import bcrypt from "bcrypt";
import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

import AuthRoutes from "../../src/routes/Auth.routes.js";
import AuthService from "../../src/services/Auth.services.js";
import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import LocationRoutes from "../../src/routes/Location.routes.js";
import Server from "../../src/server/Server.js";
import testData from "../data/testUsers.js";
import User from "../../src/models/User.model.js";
import AuthController from "../../src/controllers/Auth.controller.js";

const { testUsers, newUser, existingUser } = testData;

describe("Integration Tests:", () => {
  let server;
  let database;
  let request;
  let authController;
  let authService;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    authService = new AuthService();
    authController = new AuthController(authService);
    const authRoutes = new AuthRoutes(authController);
    const locationRoutes = new LocationRoutes();
    database = new Database(DB_URI);
    server = new Server(PORT, HOST, authRoutes, locationRoutes);
    server.start();
    await database.connect();
    request = supertest(server.getApp());
  });

  after(async () => {
    await server.close();
    await database.close();
  });

  beforeEach(async () => {
    try {
      await User.deleteMany();
      console.log("Database successfully cleared.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when clearing.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[0].password, 10);
      const hashedTestUser0 = { ...testUsers[0], password: hashedPassword };
      await User.create(hashedTestUser0);
      console.log("Database successfully added first user.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting first user.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[1].password, 10);
      const hashedTestUser1 = { ...testUsers[1], password: hashedPassword };
      await User.create(hashedTestUser1);
      console.log("Database successfully added second user.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting second user.");
      throw new Error();
    }
  });

  describe("POST requests to /signup on authRoutes:", () => {
    it("should respond with a 201 status code for a POST request to /signup.", async () => {
      const response = await request.post("/auth/signup").send(newUser);
      expect(response.status).to.equal(201);
    });

    it('should respond with a "X-Access-Token" header.', async () => {
      const response = await request.post("/auth/signup").send(newUser);
      expect(response.headers["x-access-token"]).to.exist;
    });

    it("should respond with a 500 status code if there is an error.", async () => {
      const stub = sinon.stub(authService, "signUp");
      stub.throws(new Error("Test Error"));
      const response = await request.post("/auth/signup").send(newUser);
      expect(response.status).to.equal(500);
    });

    it("should respond with a 422 status code if invalid data - missing email", async () => {
      const invalidUser = { ...newUser, email: null };
      const response = await request.post("/auth/signup").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - missing password", async () => {
      const invalidUser = { ...newUser, password: null };
      const response = await request.post("/auth/signup").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - no email key", async () => {
      const invalidUser = { ...newUser };
      delete invalidUser.email;
      const response = await request.post("/auth/signup").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - no password key", async () => {
      const invalidUser = { ...newUser };
      delete invalidUser.password;
      const response = await request.post("/auth/signup").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - with additional key", async () => {
      const invalidUser = { ...newUser, injection: "bad person code" };
      delete invalidUser.password;
      const response = await request.post("/auth/signup").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 400 status code if email already exists - prevent duplicate", async () => {
      const response = await request.post("/auth/signup").send(existingUser);
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal(
        "Sign up failed - email already exists."
      );
    });
  });

  describe("POST requests to /login on authRoutes:", () => {
    const { email, password } = existingUser;
    const userLogin = { email, password };

    it("should return a 200 status code if email and password are valid", async () => {
      const response = await request.post("/auth/login").send(userLogin);
      expect(response.status).to.equal(200);
    });

    it("should have an X-Access-Token header in the response", async () => {
      const response = await request.post("/auth/login").send(userLogin);
      expect(response.headers["x-access-token"]).to.exist;
    });

    it("should return a 401 status code if email is invalid", async () => {
      const invalidLogin = { email: "wrong", password: "Password456!" };
      const response = await request.post("/auth/login").send(invalidLogin);
      console.log(response.body.message);
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Invalid credentials.");
    });

    it("should return a 401 status code if password is invalid", async () => {
      const invalidLogin = { email, password: "invalid" };
      const response = await request.post("/auth/login").send(invalidLogin);
      console.log(response.body.message);
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Invalid credentials.");
    });
  });
});

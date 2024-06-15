import { expect } from "chai";
import sinon from "sinon";

import AuthController from "../../src/controllers/Auth.controller.js";
import testData from "../data/testUsers.js";
const { testUsers, newUser, existingUser } = testData;

describe("Testing AuthController", () => {
  let authServices;
  let authController;
  let createdUser;
  let loginUser;
  let req;
  let res;

  beforeEach(() => {
    authServices = {
      signUp: sinon.stub(),
      login: sinon.stub(),
    };
    authController = new AuthController(authServices);
    req = {
      body: {},
    };
    res = {
      set: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
      header: sinon.stub().returnsThis(),
    };
    createdUser = { ...newUser, accessToken: "aToken" };
    const { email, password } = existingUser;
    loginUser = { email, password };
  });

  describe("signUp tests", () => {
    it("should respond with a 201 status code when sent a valid new user", async () => {
      authServices.signUp.resolves(createdUser);

      await authController.signUp(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it("should respond with a 500 status code and error message when signUp fails", async () => {
      const errorMessage = "An error!";
      authServices.signUp.rejects(new Error(errorMessage));

      await authController.signUp(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });

  describe("login tests", () => {
    it("should respond with a 200 status code if login successful", async () => {
      authServices.login.resolves(loginUser);

      await authController.login(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should respond with a 401 status code if the user is invalid", async () => {
      const errorMessage = "Invalid credentials.";
      authServices.login.resolves(null);

      await authController.login(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });
});

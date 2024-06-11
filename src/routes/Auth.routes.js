import AuthController from "../controllers/Auth.controller.js";
import { Router } from "express";
import Validation from "../middleware/Validation.middleware.js";

export default class AuthRoutes {
  #router;
  #routerPath;
  #controller;

  constructor() {
    this.#routerPath = "/auth";
    this.#router = Router();
    this.#controller = new AuthController();
    this.#initialise();
  }

  #initialise = () => {
    this.#router.post(
      "/signup",
      [Validation.checkSignUpFields(), Validation.checkDuplicateUser],
      this.#controller.signUp
    );
    this.#router.post("/login", this.#controller.login);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouterPath = () => {
    return this.#routerPath;
  };
}

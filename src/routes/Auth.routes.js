import { Router } from "express";
import Validation from "../middleware/Validation.middleware.js";

export default class AuthRoutes {
  #router;
  #routerPath;
  #controller;

  constructor(routerPath, controller) {
    this.#routerPath = routerPath;
    this.#router = Router();
    this.#controller = controller;
    this.#initialise();
  }

  #initialise = () => {
    this.#router.post(
      "/signup",
      Validation.checkSignUpFields(),
      this.#controller.signUp
    );
  };

  getRouter = () => {
    return this.#router;
  };
  getRouterPath = () => {
    return this.#routerPath;
  };
}

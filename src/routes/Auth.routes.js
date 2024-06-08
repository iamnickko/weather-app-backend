import { Router } from "express";
import { body } from "express-validator";

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
      [
        body("name").exists().escape(),
        body("email").exists().normalizeEmail().escape().isEmail(),
        body("password").exists().escape(),
      ],
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

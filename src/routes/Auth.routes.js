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
        body("name").trim().exists().isLength({ min: 2 }).escape(),
        body("email").trim().exists().normalizeEmail().escape().isEmail(),
        body("password").trim().exists().isLength({ min: 8 }).escape(),
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

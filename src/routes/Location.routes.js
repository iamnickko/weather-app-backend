import { Router } from "express";
import LocationController from "../controllers/Location.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class LocationRoutes {
  #router;
  #routerPath;
  #controller;

  constructor() {
    this.#routerPath = "/";
    this.#router = Router();
    this.#controller = new LocationController();
    this.#initialise();
  }

  #initialise = () => {
    this.#router.get("/", (req, res) => {
      res.status(200).json({ message: "This will be the homepage" });
    });
    this.#router.put(
      "/savedLocations",
      [AuthMiddleware.authoriseRequest],
      this.#controller.addLocation
    );
  };

  getRouterPath = () => {
    return this.#routerPath;
  };

  getRouter = () => {
    return this.#router;
  };
}

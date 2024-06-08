import AuthService from "../services/Auth.services.js";
import { validationResult } from "express-validator";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
    this.#service = service;
  }

  signUp = async (req, res) => {
    try {
      const validationErrors = validationResult(req);
      if (validationErrors.errors.length !== 0) {
        return res
          .status(422)
          .json({ message: "Unable to process because the data is invalid." });
      }
      const newUser = await this.#service.signUp(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  };
}

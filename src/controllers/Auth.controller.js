import { validationResult } from "express-validator";
import AuthService from "../services/Auth.services.js";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
    this.#service = service;
  }

  signUp = async (req, res) => {
    try {
      const validationErrors = validationResult(req);
      console.log(validationErrors);
      const newUser = await this.#service.signUp(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  };
}

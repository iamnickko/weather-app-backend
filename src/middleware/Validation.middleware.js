import { body, validationResult } from "express-validator";
import User from "../models/User.model.js";

export default class Validation {
  static checkSignUpFields = () => {
    try {
      return [
        body("name").trim().exists().isLength({ min: 2 }).escape(),
        body("email").trim().exists().normalizeEmail().escape().isEmail(),
        body("password").trim().exists().isLength({ min: 8 }).escape(),
        Validation.handleValidationErrors,
      ];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (validationErrors.errors.length !== 0) {
      return res
        .status(422)
        .json({ message: "Unable to process because the data is invalid." });
    }
    next();
  };

  static checkDuplicateUser = async (req, res, next) => {
    const userToCheck = await User.findOne({ email: req.body.email });
    if (userToCheck) {
      return res
        .status(400)
        .json({ message: "Sign up failed - email already exists." });
    }
    next();
  };
}

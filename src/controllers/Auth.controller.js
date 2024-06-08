import AuthService from "../services/Auth.services.js";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
    this.#service = service;
  }

  signUp = async (req, res) => {
    try {
      const newUser = await this.#service.signUp(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req, res) => {
    try {
      const user = await this.#service.login(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  };
}

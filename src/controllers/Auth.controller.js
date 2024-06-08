import AuthService from "../services/Auth.services.js";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
    this.#service = service;
  }

  addNewUser = async (req, res) => {
    try {
      const newUser = await this.#service.addNewUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  };
}

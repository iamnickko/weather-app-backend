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
      const userToken = await this.#service.login(req.body);
      if (!userToken)
        return res
          .status(401)
          .json({ message: "Invalid or unauthorised details." });
      return res.status(200).json({ userToken });
    } catch (error) {
      console.log(error);
    }
  };
}

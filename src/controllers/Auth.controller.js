import AuthService from "../services/Auth.services.js";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
    this.#service = service;
  }

  signUp = async (req, res) => {
    try {
      const newUser = await this.#service.signUp(req.body);
      res.set("X-Access-Token", newUser.accessToken).status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const validUser = await this.#service.login(req.body);
      if (!validUser) {
        res.status(401).json({ message: "Invalid or unauthorised details." });
      }
      res
        .set("X-Access-Token", validUser.accessToken)
        .status(200)
        .json({ ...validUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

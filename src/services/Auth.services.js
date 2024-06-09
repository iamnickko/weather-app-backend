import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export default class AuthService {
  signUp = async (newUser) => {
    const { password, ...others } = newUser;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return await User.create({ password: hashedPassword, ...others });
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      return User.findOne({ email: user.email });
    } catch (error) {
      console.log(error);
    }
  };
}

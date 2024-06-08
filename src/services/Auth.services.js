import User from "../models/User.model.js";

export default class AuthService {
  signUp = async (newUser) => {
    try {
      return await User.create(newUser);
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

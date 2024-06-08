import User from "../models/User.model.js";

export default class AuthService {
  addNewUser = async (newUser) => {
    try {
      return await User.create(newUser);
    } catch (error) {
      throw new Error(error);
    }
  };
}

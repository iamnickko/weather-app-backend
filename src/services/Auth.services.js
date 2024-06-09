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
      const dbUser = await User.findOne({ email: user.email });
      console.log(dbUser);
      const validPassword = bcrypt.compareSync(user.password, dbUser.password);
      if (validPassword) return dbUser;
      // } else {
      //   return res.status(422).json({ message: "Unauthorised details." });
      // }
    } catch (error) {
      console.log(error);
    }
  };
}

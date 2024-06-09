import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      const validPassword = bcrypt.compareSync(user.password, dbUser.password);
      if (validPassword) {
        const token = jwt.sign(
          { id: dbUser._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: 86400 }
        );
        return { accessToken: token, ...user };
      }
    } catch (error) {
      console.log(error);
    }
  };
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class AuthService {
  //  signToken = (user) => {
  //   return (accessToken = jwt.sign(
  //     { id: user._id.toString() },
  //     process.env.JWT_SECRET,
  //     { expiresIn: 86400 }
  //   ));
  // };

  signUp = async (newUser) => {
    const { password, ...others } = newUser;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        ...others,
        password: hashedPassword,
      });
      const accessToken = jwt.sign(
        { id: newUser._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: 86400 }
      );
      return { accessToken, newUser };
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      const dbUser = await User.findOne({ email: user.email });
      const validPassword = bcrypt.compareSync(user.password, dbUser.password);
      if (validPassword) {
        const accessToken = jwt.sign(
          { id: dbUser._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: 86400 }
        );
        return {
          accessToken,
          name: dbUser.name,
          email: dbUser.email,
          savedLocations: dbUser.savedLocations,
        };
      } else {
        throw new Error("Invalid password.");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class AuthService {
  signUp = async (newUser) => {
    const { password, ...others } = newUser;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        ...others,
        password: hashedPassword,
      });
      return { newUser: createdUser };
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      throw new Error("Invalid credentials.");
    }

    const validPassword = await bcrypt.compare(user.password, dbUser.password);
    if (!validPassword) {
      throw new Error("Invalid credentials.");
    }

    const accessToken = jwt.sign(
      { id: dbUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: 86400 }
    );

    return {
      accessToken,
      email: dbUser.email,
      savedLocations: dbUser.savedLocations,
    };
  };

  changePassword = async ({ email, newPassword }) => {
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);
    const dbUser = await User.findOneAndUpdate({
      email,
      password: newHashedPassword,
      new: true,
      upsert: false,
    });
    return dbUser;
  };
}

import { Schema, model } from "mongoose";
import locationSchema from "./Location.model.js";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  savedLocations: [locationSchema],
});

const User = model("User", userSchema);

export default User;

import { Schema, model } from "mongoose";
import { User } from "../interfaces/user";

/**
 * Define the User schema for ts
 */
const userSchema = new Schema<User>({
  name: { type: String, required: true, min: 6, max: 200 },
  email: { type: String, required: true, min: 6, max: 200, unique: true },
  password: { type: String, required: true, min: 8, max: 200 },
  registeredAt: { type: Date, required: true, default: Date.now },
});

export const userModel = model<User>("User", userSchema);

import mongoose from "mongoose";
import { userRole, UserType } from "../types";

const userSchema = new mongoose.Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.USER,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    resetPasswordExpiresAt: Date,
    resetPasswordToken: String,
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<UserType>("User", userSchema);

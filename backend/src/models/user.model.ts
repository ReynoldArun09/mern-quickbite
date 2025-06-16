import mongoose from "mongoose";
import { UserType } from "../types";

type UserSchemaType = UserType & Document;

const userSchema = new mongoose.Schema<UserSchemaType>(
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
      enum: ["user", "admin"],
      default: "user",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<UserSchemaType>("User", userSchema);

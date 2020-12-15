import { model, Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  password: string;
  email: string;
  mobileNumber: Number;
}

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const UserModel = model<User>("User", UserSchema);

import { Document, Model, model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 16
  },
  status: {
    type: String,
    enum: ["new", "active", "archived"],
    default: "new"
  },
  role: {
    type: String,
    enum: ["moderator", "admin"],
    default: "moderator"
  }
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export { User };

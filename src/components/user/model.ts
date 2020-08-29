import { Document, Model, model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  status: string;
  role: string;
  topicsAnswers: object[];
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  status: {
    type: String,
    enum: ["new", "active", "archived"],
    default: "new",
  },
  role: {
    type: String,
    enum: ["moderator", "admin"],
    default: "moderator",
  },
  topicsAnswers: [
    {
      topicId: {
        type: String,
        required: true,
      },
      answer: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export { User };

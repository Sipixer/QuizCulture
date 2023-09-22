import { Schema, model } from "mongoose";
import { Users } from "./UserSchema";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: Users,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
tokenSchema.index({ token: 1, user_id: 1 }, { unique: true });

export const Tokens = model("tokens", tokenSchema);

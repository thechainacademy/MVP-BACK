import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    calendly: {
      type: String,
      trim: true,
    },

    language: {
      type: String,
      trim: true,
    },

    skills: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    birth: String,

    priceToken: Number,

    balanceToken: { type: Number, default: 0 },

    passwordHash: { type: String, require: true },

    profilePic: { type: String },

    bounties: [{ type: Schema.Types.ObjectId, ref: "Bountie" }],

    calls: [{ type: Schema.Types.ObjectId, ref: "Call" }],

    resetToken: String,

    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

import { Schema, model } from "mongoose";

const callSchema = new Schema({
  userCaller: { type: Schema.Types.ObjectId, ref: "User" },
  userReciver: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  duration: String,
  description: String,
});

const CallModel = model("Call", callSchema);

export default CallModel;

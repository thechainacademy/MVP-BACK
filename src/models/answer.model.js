import { Schema, model } from "mongoose";

const answerSchema = new Schema(
  {
    answer: { type: String, required: true },
    bountie: { type: Schema.Types.ObjectId, ref: "Bountie" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Answer = model("Answer", answerSchema);

export default Answer;

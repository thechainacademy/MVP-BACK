import { Schema, model } from "mongoose";
import Answer from "./answers.model.js";

const AnswerModel = model("Answer", Answer.schema);

const bountieSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    price: { type: Number, required: true },
    category: String,
    skill: String,
    complete: { type: Boolean, default: false },
    dateFin: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    collab: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["created", "initialized", "finalized"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Bountie = model("Bountie", bountieSchema);

export default Bountie;

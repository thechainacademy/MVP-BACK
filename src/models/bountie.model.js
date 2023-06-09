import { Schema, model } from "mongoose";

const bountieSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    skill: String,
    complete: { type: Boolean, default: false },
    dateFin: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    collab: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["creating", "initializing", "finalizing"],
      default: "created",
    },
  },
  { timestamps: true }
);

const BountieModel = model("Bountie", bountieSchema);

export default BountieModel;

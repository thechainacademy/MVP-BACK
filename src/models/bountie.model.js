import { Schema, model } from "mongoose";

const bountieSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: String,
    skill: String,
    complete: { type: Boolean, default: false },
    dateFin: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    collab: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["criada", "iniciada", "finalizando"],
      default: "criada",
    },
  },
  { timestamps: true }
);

const BountieModel = model("Bountie", bountieSchema);

export default BountieModel;

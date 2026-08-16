// src/models/Comment.ts
import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
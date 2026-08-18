// src/models/Comment.ts
import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    guestName: { type: String, required: true, trim: true, maxlength: 50 },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
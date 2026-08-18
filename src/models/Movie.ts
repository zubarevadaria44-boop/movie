import mongoose, { Schema, models } from "mongoose";

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    runtimeMin: { type: Number, required: true },
    genres: [{ type: String }],
    posterUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    rating: { type: Number, default: 0 },
    synopsis: { type: String, default: "" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Movie = models.Movie || mongoose.model("Movie", MovieSchema);
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/models/Comment";

export async function GET(req: NextRequest) {
  const movieId = req.nextUrl.searchParams.get("movieId");
  if (!movieId) {
    return NextResponse.json({ error: "movieId required" }, { status: 400 });
  }

  await connectDB();
  const comments = await Comment.find({ movie: movieId, status: "approved" })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { movieId, guestName, text } = body;

  if (!movieId || !guestName?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();
  const comment = await Comment.create({
    movie: movieId,
    guestName: guestName.trim(),
    text: text.trim(),
  });

  return NextResponse.json(comment, { status: 201 });
}
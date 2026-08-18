import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Comment } from "@/models/Comment";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  await connectDB();
  const comments = await Comment.find()
    .populate("movie", "title slug")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(comments);
}
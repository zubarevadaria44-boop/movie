import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";

export async function GET() {
  await connectDB();
  const movies = await Movie.find().sort({ createdAt: -1 });
  return NextResponse.json(movies);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  await connectDB();
  const body = await req.json();
  const movie = await Movie.create(body);
  return NextResponse.json(movie, { status: 201 });
}
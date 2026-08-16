// src/app/api/movies/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const { id } = await params;

  await connectDB();
  const body = await req.json();
  const movie = await Movie.findByIdAndUpdate(id, body, { new: true });

  if (!movie) {
    return NextResponse.json({ error: "Фильм не найден" }, { status: 404 });
  }

  return NextResponse.json(movie);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const { id } = await params;

  await connectDB();
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
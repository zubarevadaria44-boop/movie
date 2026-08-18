import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Comment } from "@/models/Comment";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  await connectDB();
  const comment = await Comment.findByIdAndUpdate(id, { status: body.status }, { new: true });

  if (!comment) {
    return NextResponse.json({ error: "Комментарий не найден" }, { status: 404 });
  }

  return NextResponse.json(comment);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const { id } = await params;

  await connectDB();
  await Comment.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
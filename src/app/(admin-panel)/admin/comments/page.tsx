"use client";

import { useEffect, useState } from "react";

interface AdminComment {
  _id: string;
  guestName: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  movie: { title: string; slug: string } | null;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    const res = await fetch("/api/admin/comments");
    const data = await res.json();
    setComments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch(`/api/admin/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadComments();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    loadComments();
  }

  const statusColors: Record<string, string> = {
    approved: "text-[#4CAF50]",
    pending: "text-[#E8A33D]",
    rejected: "text-[#B33A3A]",
  };

  if (loading) return <p className="text-[#8B90A0]">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Comments</h1>

      {comments.length === 0 ? (
        <p className="text-[#8B90A0]">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="bg-[#1B1E2A] border border-[#2A2E3E] rounded-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-[#E8A33D]">{c.guestName}</span>
                  <span className="text-xs text-[#8B90A0] font-mono ml-2">
                    on {c.movie?.title || "deleted movie"}
                  </span>
                </div>
                <span className={`text-xs font-mono uppercase ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>

              <p className="text-[#F2EFEA] mb-3">{c.text}</p>

              <div className="flex gap-3 text-sm">
                {c.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(c._id, "approved")}
                    className="text-[#4CAF50] hover:underline"
                  >
                    Approve
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(c._id, "rejected")}
                    className="text-[#E8A33D] hover:underline"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-[#B33A3A] hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
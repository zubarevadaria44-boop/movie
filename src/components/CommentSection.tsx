"use client";

import { useEffect, useState } from "react";

interface CommentItem {
  _id: string;
  guestName: string;
  text: string;
  createdAt: string;
}

export function CommentSection({ movieId }: { movieId: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadComments() {
    const res = await fetch(`/api/comments?movieId=${movieId}`);
    const data = await res.json();
    setComments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadComments();
  }, [movieId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setSubmitting(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, guestName: name, text }),
    });
    setSubmitting(false);

    if (res.ok) {
      setName("");
      setText("");
      loadComments();
    }
  }

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-[#1B1E2A] border border-[#2A2E3E] rounded-sm px-3 py-2 outline-none focus:border-[#E8A33D]"
        />
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={3}
          className="w-full bg-[#1B1E2A] border border-[#2A2E3E] rounded-sm px-3 py-2 outline-none focus:border-[#E8A33D]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#E8A33D] text-[#12141C] font-bold px-5 py-2 rounded-sm hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <p className="text-[#8B90A0] text-sm">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-[#8B90A0] text-sm">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="border-b border-[#2A2E3E] pb-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-[#E8A33D]">{c.guestName}</span>
                <span className="text-xs text-[#8B90A0] font-mono">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-[#F2EFEA]">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
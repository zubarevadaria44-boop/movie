// src/app/(admin-panel)/admin/movies/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AdminMovie {
  _id: string;
  title: string;
  year: number;
  rating: number;
  views: number;
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<AdminMovie[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMovies() {
    const res = await fetch("/api/movies");
    const data = await res.json();
    setMovies(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMovies();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Удалить фильм?")) return;
    await fetch(`/api/movies/${id}`, { method: "DELETE" });
    loadMovies();
  }

  if (loading) return <p className="text-[#8B90A0]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Movies</h1>
        <Link
          href="/admin/movies/new"
          className="bg-[#E8A33D] text-[#12141C] font-bold px-4 py-2 rounded-sm text-sm hover:opacity-90"
        >
          + Add Movie
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[#8B90A0] border-b border-[#2A2E3E]">
            <th className="py-2">Title</th>
            <th className="py-2">Year</th>
            <th className="py-2">Rating</th>
            <th className="py-2">Views</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id} className="border-b border-[#2A2E3E]/50">
              <td className="py-3">{movie.title}</td>
              <td className="py-3 font-mono">{movie.year}</td>
              <td className="py-3 font-mono">{movie.rating.toFixed(1)}</td>
              <td className="py-3 font-mono">{movie.views}</td>
              <td className="py-3 text-right space-x-3">
                <Link href={`/admin/movies/${movie._id}`} className="text-[#E8A33D] hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(movie._id)} className="text-[#B33A3A] hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {movies.length === 0 && (
        <p className="text-[#8B90A0] mt-8 text-center">No movies yet. Add the first one.</p>
      )}
    </div>
  );
}
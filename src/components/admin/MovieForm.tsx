// src/components/admin/MovieForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MovieFormData {
  title: string;
  slug: string;
  year: number;
  runtimeMin: number;
  genres: string;
  posterUrl: string;
  videoUrl: string;
  synopsis: string;
}

export function MovieForm({
  initialData,
  movieId,
}: {
  initialData?: Partial<MovieFormData>;
  movieId?: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MovieFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    year: initialData?.year || new Date().getFullYear(),
    runtimeMin: initialData?.runtimeMin || 90,
    genres: initialData?.genres || "",
    posterUrl: initialData?.posterUrl || "",
    videoUrl: initialData?.videoUrl || "",
    synopsis: initialData?.synopsis || "",
  });

  function update<K extends keyof MovieFormData>(key: K, value: MovieFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
    };

    const url = movieId ? `/api/movies/${movieId}` : "/api/movies";
    const method = movieId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert("Ошибка при сохранении фильма"+ (data.error || res.status));
      return;
    }

    router.push("/admin/movies");
    router.refresh();
  }

  const inputClass =
    "w-full bg-[#12141C] border border-[#2A2E3E] rounded-sm px-3 py-2 outline-none focus:border-[#E8A33D]";
  const labelClass = "block text-sm text-[#8B90A0] mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div>
        <label className={labelClass}>Slug (for URL)</label>
        <input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Year</label>
          <input
            type="number"
            className={inputClass}
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Runtime (minutes)</label>
          <input
            type="number"
            className={inputClass}
            value={form.runtimeMin}
            onChange={(e) => update("runtimeMin", Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Genres (comma-separated)</label>
        <input className={inputClass} value={form.genres} onChange={(e) => update("genres", e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Poster URL</label>
        <input className={inputClass} value={form.posterUrl} onChange={(e) => update("posterUrl", e.target.value)} required />
      </div>

      <div>
        <label className={labelClass}>Video URL</label>
        <input className={inputClass} value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} required />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.synopsis}
          onChange={(e) => update("synopsis", e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-[#E8A33D] text-[#12141C] font-bold px-6 py-2 rounded-sm hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
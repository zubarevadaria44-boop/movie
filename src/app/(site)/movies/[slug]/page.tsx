// src/app/(site)/movies/[slug]/page.tsx
import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";
import { notFound } from "next/navigation";

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const movie = await Movie.findOne({ slug }).lean();

  if (!movie) return notFound();

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <video
        controls
        className="w-full rounded-sm bg-black aspect-video mb-6"
        poster={movie.posterUrl}
      >
        <source src={movie.videoUrl} />
        Ваш браузер не поддерживает видео.
      </video>

      <h1 className="font-display text-4xl mb-2">{movie.title}</h1>
      <p className="font-mono text-sm text-[#8B90A0] mb-4">
        {movie.year} · {movie.runtimeMin} мин · {movie.genres.join(", ")} · ★ {movie.rating.toFixed(1)}
      </p>

      {movie.synopsis && <p className="text-[#F2EFEA] leading-relaxed">{movie.synopsis}</p>}
    </main>
  );
}
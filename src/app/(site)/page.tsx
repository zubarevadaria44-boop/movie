// src/app/(site)/page.tsx
import { MovieCard } from "@/components/MovieCard";
import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";

export default async function Home() {
  await connectDB();
  const movies = await Movie.find().sort({ createdAt: -1 }).lean();

  const nowShowing = movies.map((m) => m.title).join("   ★   ") || "Movies coming soon";

  return (
    <main>
      <div className="overflow-hidden border-y border-[#2A2E3E] py-2">
        <div className="font-display text-lg text-[#E8A33D] whitespace-nowrap animate-marquee">
          {nowShowing}   ★   {nowShowing}
        </div>
      </div>
      <div className="film-perf h-2" />

      <section className="px-4 py-8">
        <h1 className="font-display text-4xl mb-6">Now Showing</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id.toString()}
              movie={{
                _id: movie._id.toString(),
                title: movie.title,
                slug: movie.slug,
                year: movie.year,
                runtimeMin: movie.runtimeMin,
                genres: movie.genres,
                posterUrl: movie.posterUrl,
                rating: movie.rating,
                synopsis: movie.synopsis,
              }}
            />
          ))}
        </div>
        {movies.length === 0 && (
          <p className="text-[#8B90A0] text-center mt-12">No movies available — add the first one in the admin panel.</p>
        )}
      </section>
    </main>
  );
}
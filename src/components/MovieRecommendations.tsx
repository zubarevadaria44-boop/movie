// src/components/MovieRecommendations.tsx
import Link from "next/link";
import Image from "next/image";

interface RecMovie {
  _id: string;
  title: string;
  slug: string;
  posterUrl: string;
  year: number;
}

export function MovieRecommendations({ movies }: { movies: RecMovie[] }) {
  if (movies.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl mb-4">You Might Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {movies.map((m) => (
          <Link key={m._id} href={`/movies/${m.slug}`} className="group block">
            <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-[#1B1E2A]">
              <Image
                src={m.posterUrl}
                alt={m.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="font-display text-lg mt-1 leading-none group-hover:text-[#E8A33D] transition-colors">
              {m.title}
            </p>
            <p className="font-mono text-xs text-[#8B90A0]">{m.year}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
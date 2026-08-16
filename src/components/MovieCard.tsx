// src/components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-[#1B1E2A]">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-[#E8A33D] text-[#12141C] font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm">
          {movie.rating.toFixed(1)}
        </div>
      </div>
      <h3 className="font-display text-xl mt-2 leading-none group-hover:text-[#E8A33D] transition-colors">
        {movie.title}
      </h3>
      <p className="font-mono text-xs text-[#8B90A0] mt-1">
        {movie.year} · {movie.runtimeMin} мин · {movie.genres.join(", ")}
      </p>
    </Link>
  );
}
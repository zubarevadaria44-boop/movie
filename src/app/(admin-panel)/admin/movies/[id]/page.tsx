import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";
import { MovieForm } from "@/components/admin/MovieForm";

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await Movie.findById(id).lean();

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Edit: {movie.title}</h1>
      <MovieForm
        movieId={id}
        initialData={{
          title: movie.title,
          slug: movie.slug,
          year: movie.year,
          runtimeMin: movie.runtimeMin,
          genres: movie.genres.join(", "),
          posterUrl: movie.posterUrl,
          videoUrl: movie.videoUrl,
          synopsis: movie.synopsis,
        }}
      />
    </div>
  );
}
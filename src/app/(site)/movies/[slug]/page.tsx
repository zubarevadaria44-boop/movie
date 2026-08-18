import { connectDB } from "@/lib/db";
import { Movie } from "@/models/Movie";
import { notFound } from "next/navigation";
import {getYouTubeId} from "@/lib/youtube";
import { CommentSection } from "@/components/CommentSection";
import { MovieRecommendations } from "@/components/MovieRecommendations";

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const movie = await Movie.findOne({ slug }).lean();

  if (!movie) return notFound();

  const youtubeId = getYouTubeId(movie.videoUrl);

   const recommended = await Movie.find({ _id: { $ne: movie._id } })
    .limit(4)
    .lean();

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      {youtubeId ? (
        <div className="w-full aspect-video mb-6 rounded-sm overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
      <video
        controls
        className="w-full rounded-sm bg-black aspect-video mb-6"
        poster={movie.posterUrl}
      >
        <source src={movie.videoUrl} />
        Your browser does not support the video tag.
      </video>
      )}

      <h1 className="font-display text-4xl mb-2">{movie.title}</h1>
      <p className="font-mono text-sm text-[#8B90A0] mb-4">
        {movie.year} · {movie.runtimeMin} mins · {movie.genres.join(", ")} · ★ {movie.rating.toFixed(1)}
      </p>

      {movie.synopsis && <p className="text-[#F2EFEA] leading-relaxed">{movie.synopsis}</p>}

      <MovieRecommendations
        movies={recommended.map((m) => ({
          _id: m._id.toString(),
          title: m.title,
          slug: m.slug,
          posterUrl: m.posterUrl,
          year: m.year,
        }))}
      />

      <CommentSection movieId={movie._id.toString()} />
    </main>
  );
}
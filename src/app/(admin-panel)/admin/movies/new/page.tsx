// src/app/(admin-panel)/admin/movies/new/page.tsx
import { MovieForm } from "@/components/admin/MovieForm";

export default function NewMoviePage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">New Movie</h1>
      <MovieForm />
    </div>
  );
}
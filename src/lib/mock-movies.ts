// src/lib/mock-movies.ts
import { Movie } from "./types";

export const mockMovies: Movie[] = [
  { _id: "1", title: "Полночь в Самаре", slug: "midnight-samara", year: 2024, runtimeMin: 118, genres: ["Драма", "Триллер"], posterUrl: "/posters/1.jpg", rating: 8.1, synopsis: "..." },
  { _id: "2", title: "Тихий двор", slug: "quiet-yard", year: 2023, runtimeMin: 96, genres: ["Комедия"], posterUrl: "/posters/2.jpg", rating: 7.3, synopsis: "..." },
];
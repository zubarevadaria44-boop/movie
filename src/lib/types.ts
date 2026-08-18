export interface Movie {
  _id: string;
  title: string;
  slug: string;
  year: number;
  runtimeMin: number;
  genres: string[];
  posterUrl: string;
  rating: number; // 0-10
  synopsis: string;
}
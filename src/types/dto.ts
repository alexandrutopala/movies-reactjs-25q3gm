import { Movie } from "./movie";

export interface MovieListDto {
  id: number,
  title: string,
  tagline: string,
  vote_average: number,
  vote_count: number,
  release_date: string,
  poster_path: string,
  overview: string,
  budget: number,
  revenue: number,
  genres: string[],
  runtime: number
}

export function toMovie(m: MovieListDto): Movie {
  return {
    id: m.id,
    name: m.title,
    releaseYear: parseInt(m.release_date.slice(0, 4), 10),
    imageUrl: m.poster_path,
    rating: m.vote_average,
    genres: m.genres,
    description: m.overview,
    duration: m.runtime
  } satisfies Movie
}

export function toMovieDto(m: Movie): MovieListDto {
  return {
    id: m.id,
    title: m.name,
    release_date: m.releaseYear.toString(),
    poster_path: m.imageUrl,
    vote_average: m.rating,
    vote_count: 1,
    tagline: m.name,
    overview: m.description,
    budget: 10,
    revenue: 10,
    genres: m.genres,
    runtime: m.duration
  } satisfies MovieListDto
}

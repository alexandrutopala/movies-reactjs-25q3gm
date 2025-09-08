export interface Movie {
  id: number;
  imageUrl: string,
  name: string,
  releaseYear: number,
  genres: string[],
  rating: number,
  duration: number,
  description: string,
}

export interface MoviePage {
  totalElements: number,
  movies: Movie[]
}

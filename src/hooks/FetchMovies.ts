import { useEffect, useState } from "react";
import { Movie, MoviePage } from "@/types/movie";
import { MovieListDto } from "@/types/dto";

export interface FetchMoviesProps {
  page: number | null,
  sortBy: "release_date" | "title" | null
  genre: string | null,
  titleQuery: string | null,
}

const pageSize = 6
const baseUrl = `http://localhost:4000/movies?limit=${pageSize}`

export const useFetchMovies = (params: FetchMoviesProps) => {
  const [moviePage, setMoviePage] = useState<MoviePage | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string>(baseUrl)

  useEffect(() => {
    let parsedUrl = baseUrl

    if (params.page) {
      parsedUrl += `&offset=${Math.max(params.page, 0) * pageSize}`
    }

    if (params.sortBy) {
      let sortOrder: "desc" | "asc" = "asc"
      if (params.sortBy === "release_date") {
        sortOrder = "desc"
      }
      parsedUrl += `&sortBy=${params.sortBy}&sortOrder=${sortOrder}`
    }

    if (params.genre) {
      parsedUrl += `&filter=${params.genre}`
    }

    if (params.titleQuery) {
      parsedUrl += `&search=${params.titleQuery}&searchBy=title`
    }

    setUrl(parsedUrl)
  }, [params])

  useEffect(() => {
    setLoading(true)

    fetch(url)
      .then(res => res.json())
      .then((response: {totalAmount: number, data: MovieListDto[]}) => {
        const parsedMovies = response.data.map(m => ({
          id: m.id,
          name: m.title,
          releaseYear: parseInt(m.release_date.slice(0, 4), 10),
          imageUrl: m.poster_path,
          rating: m.vote_average,
          genres: m.genres,
          description: m.overview,
          duration: m.runtime
        } satisfies Movie))

        const totalPages = Math.ceil(response.totalAmount / pageSize)

        return {
          movies: parsedMovies,
          totalElements: response.totalAmount,
          totalPages: totalPages,
          currentPage: params.page && params.page > 0 ? Math.min(params.page, totalPages - 1) : 0
        } satisfies MoviePage
      })
      .then(moviePage => {
        setError(null)
        setMoviePage(moviePage)
      })
      .catch((error: Error) => {
        setError(error.message)
        setMoviePage(null)
      })
      .finally(() => setLoading(false))
  }, [url])

  return { moviePage, loading, error }
}

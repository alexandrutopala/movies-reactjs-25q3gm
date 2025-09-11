import React, { useEffect, useState } from 'react';
import SearchForm from '../components/movie/SearchForm';
import GenreSelect from '../components/movie/GenreSelect';
import SortControl from '../components/common/SortControl';
import MovieTile from '../components/movie/MovieTile';
import { Movie } from '@/types/movie';
import { FetchMoviesProps, useFetchMovies } from "../hooks/FetchMovies";
import Pagination from '../components/common/Pagination';
import MovieCard from "../components/movie/MovieCard";
import { useSearchParams } from "react-router";
import { SearchMovieCard } from "../components/movie/SearchMovieCard";

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
const sortOptions = ['Release Date', 'Title'];

const MovieListPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [fetchParams, setFetchParams] = useState<FetchMoviesProps>({
    page: parseInt(searchParams.get("page") ?? "0", 10),
    sortBy: searchParams.get("sortBy") as "release_date" | "title" | null ?? "release_date",
    genre: searchParams.get("genre"),
    titleQuery: searchParams.get("title"),
  })
  const { moviePage } = useFetchMovies(fetchParams)

  useEffect(() => {
    const newSearchParams: { [key: string]: string } = {};

    if (fetchParams.titleQuery) {
      newSearchParams.title = fetchParams.titleQuery;
    }
    if (fetchParams.genre) {
      newSearchParams.genre = fetchParams.genre;
    }
    if (fetchParams.sortBy) {
      newSearchParams.sortBy = fetchParams.sortBy;
    }
    if (fetchParams.page && fetchParams.page > 0) {
      newSearchParams.page = fetchParams.page.toString();
    }

    setSearchParams(newSearchParams);
  }, [fetchParams, setSearchParams]);

  const handleSearch = (query: string) => {
    setFetchParams((prev) => ({ ...prev, titleQuery: (query === "" ? null : query), page: 0 }))
  };

  const handleGenreSelect = (genre: string) => {
    setFetchParams((prev) => ({ ...prev, genre: (genre === "All" ? null : genre), page: 0 }))
  }

  const handleSortChange = (option: string) => {
    switch (option) {
      case 'Release Date':
        setFetchParams((prev) => ({ ...prev, sortBy: "release_date", page: 0 }))
        break
      case 'Title':
        setFetchParams((prev) => ({ ...prev, sortBy: "title", page: 0 }))
        break
      default:
        setFetchParams((prev) => ({ ...prev, sortBy: null, page: 0 }))
    }
  }

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handlePageChange = (page: number) => {
    setFetchParams((prev) => ({ ...prev, page: page }))
  }

  if (!moviePage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen font-montserrat">
      {/* Header with background */}
      {
        selectedMovie ? (
          <MovieCard movie={selectedMovie} onDismiss={() => setSelectedMovie(null)} />
        ) : (
          <SearchMovieCard onSearch={handleSearch} initialQuery={fetchParams.titleQuery}/>
        )
      }

      {/* Movie Listing Section */}
      <main className="container mx-auto px-8 py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-700 pb-4">
          <GenreSelect genreNames={genres} currentGenre={fetchParams.genre ?? "All"} onSelect={handleGenreSelect}/>
          <SortControl options={sortOptions} onChange={handleSortChange}/>
        </div>

        {/* Movie Count */}
        <p className="text-gray-400 mb-6">
          <span className="font-bold">{moviePage.totalElements}</span> movies found
        </p>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {moviePage.movies.map(movie => (
            <MovieTile key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)}/>
          ))}
        </div>

        <Pagination currentPage={moviePage.currentPage} totalPages={moviePage.totalPages}
                    onPageChange={handlePageChange}/>
      </main>
    </div>
  )
}

export default MovieListPage

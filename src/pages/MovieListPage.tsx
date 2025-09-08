import React, { useState } from 'react';
import SearchForm from '../components/movie/SearchForm';
import GenreSelect from '../components/movie/GenreSelect';
import SortControl from '../components/common/SortControl';
import MovieTile from '../components/movie/MovieTile';
import { Movie } from '@/types/movie';
import { MovieListDto } from "@/types/dto";
import { FetchMoviesProps, useFetchMovies } from "../hooks/FetchMovies";

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
const sortOptions = ['Release Date', 'Title'];

const MovieListPage = () => {
  const [fetchParams, setFetchParams] = useState<FetchMoviesProps>({
    page: 0,
    sortBy: "release_date",
    genre: null,
    titleQuery: null
  })
  const { moviePage } = useFetchMovies(fetchParams)

  const handleSearch = (query: string) => {
    setFetchParams((prev) => ({ ...prev, titleQuery: (query === "" ? null : query) }))
  };

  const handleGenreSelect = (genre: string) => {
    setFetchParams((prev) => ({ ...prev, genre: (genre === "All" ? null : genre) }))
  }

  const handleSortChange = (option: string) => {
    switch (option) {
      case 'Release Date':
        setFetchParams((prev) => ({ ...prev, sortBy: "release_date" }))
        break
      case 'Title':
        setFetchParams((prev) => ({ ...prev, sortBy: "title" }))
        break
      default:
        setFetchParams((prev) => ({ ...prev, sortBy: null }))
    }
  }

  const handleMovieClick = (movie: Movie) => {
    console.log('Clicked movie:', movie.name);
  }

  if (!moviePage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen font-montserrat">
      {/* Header with background */}
      <header className="relative bg-cover bg-center bg-no-repeat h-96" style={{ backgroundImage: "url('https://www.themoviedb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="absolute top-5 right-5">
            <button className="bg-main-red text-white uppercase px-4 py-2 rounded">
              + Add Movie
            </button>
          </div>
          <h1 className="text-5xl font-thin uppercase tracking-widest mb-8">
            Find your movie
          </h1>
          <div className="w-full max-w-3xl">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Movie Listing Section */}
      <main className="container mx-auto px-8 py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-700 pb-4">
          <GenreSelect genreNames={genres} currentGenre={fetchParams.genre ?? "All"} onSelect={handleGenreSelect} />
          <SortControl options={sortOptions} onChange={handleSortChange} />
        </div>

        {/* Movie Count */}
        <p className="text-gray-400 mb-6">
          <span className="font-bold">{moviePage.totalElements}</span> movies found
        </p>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {moviePage.movies.map(movie => (
            <MovieTile key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="flex justify-center mt-12">
            <p className="text-gray-500">Pagination coming soon...</p>
        </div>
      </main>
    </div>
  )
}

export default MovieListPage

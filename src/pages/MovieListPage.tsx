import React, { useState } from 'react';
import SearchForm from '../components/movie/SearchForm';
import GenreSelect from '../components/movie/GenreSelect';
import SortControl from '../components/common/SortControl';
import MovieTile from '../components/movie/MovieTile';
import { Movie } from '@/types/movie';
import { FetchMoviesProps, useFetchMovies } from "../hooks/FetchMovies";
import Pagination from '../components/common/Pagination';
import MovieCard from "../components/movie/MovieCard";

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
const sortOptions = ['Release Date', 'Title'];

const MovieListPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [fetchParams, setFetchParams] = useState<FetchMoviesProps>({
    page: 0,
    sortBy: "release_date",
    genre: null,
    titleQuery: null
  })
  const { moviePage } = useFetchMovies(fetchParams)

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
          <div className="w-full h-auto relative p-8 bg-gray-900">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-5 right-5 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <MovieCard movie={selectedMovie} />
          </div>
        ) : (
          <header className="relative bg-cover bg-center bg-no-repeat h-96"
                  style={{ backgroundImage: "url('https://www.themoviedb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg')" }}>
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
                <SearchForm onSearch={handleSearch}/>
              </div>
            </div>
          </header>
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

import React, { useEffect, useState } from 'react';
import GenreSelect from '../components/movie/GenreSelect';
import SortControl from '../components/common/SortControl';
import MovieTile from '../components/movie/MovieTile';
import { Movie } from '@/types/movie';
import { FetchMoviesProps, useFetchMovies } from "../hooks/FetchMovies";
import Pagination from '../components/common/Pagination';
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

const genres = ['All', 'Action', 'Documentary', 'Comedy', 'Horror', 'Crime'];
const sortOptions = ['Release Date', 'Title'];

const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [fetchParams, setFetchParams] = useState<FetchMoviesProps>({
    page: parseInt(searchParams.get("page") ?? "0", 10),
    sortBy: searchParams.get("sortBy") as "release_date" | "title" | null ?? "release_date",
    genre: searchParams.get("genre"),
    titleQuery: searchParams.get("title"),
  });
  const { moviePage, error, loading } = useFetchMovies(fetchParams);

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
    setFetchParams((prev) => ({ ...prev, titleQuery: (!query ? null : query), page: 0 }));
  };

  const handleGenreSelect = (genre: string) => {
    setFetchParams((prev) => ({ ...prev, genre: (genre === "All" ? null : genre), page: 0 }));
  };

  const handleSortChange = (option: string) => {
    switch (option) {
      case 'Release Date':
        setFetchParams((prev) => ({ ...prev, sortBy: "release_date", page: 0 }));
        break;
      case 'Title':
        setFetchParams((prev) => ({ ...prev, sortBy: "title", page: 0 }));
        break;
      default:
        setFetchParams((prev) => ({ ...prev, sortBy: null, page: 0 }));
    }
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/${movie.id}`);
  };

  const handlePageChange = (page: number) => {
    setFetchParams((prev) => ({ ...prev, page: page }));
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen font-montserrat">
      <Outlet context={{ onSearch: handleSearch, initialQuery: fetchParams.titleQuery }} />

      <main className="container mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-700 pb-4">
          <GenreSelect genreNames={genres} currentGenre={fetchParams.genre ?? "All"} onSelect={handleGenreSelect} />
          <SortControl options={sortOptions} onChange={handleSortChange} />
        </div>

        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {moviePage && (
          <>
            <p className="text-gray-400 mb-6">
              <span className="font-bold">{moviePage.totalElements}</span> movies found
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {moviePage.movies.map(movie => (
                <MovieTile key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
              ))}
            </div>

            <Pagination
              currentPage={moviePage.currentPage}
              totalPages={moviePage.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default MovieListPage;

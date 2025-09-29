import React, { useEffect } from 'react';
import MovieListPage from './pages/MovieListPage';
import { createBrowserRouter, RouterProvider, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Movie } from "./types/movie";
import MovieCard from "./components/movie/MovieCard";
import { SearchMovieCard } from "./components/movie/SearchMovieCard";
import { MovieListDto, toMovie } from "./types/dto";


const movieLoader = async ({ params }: { params: { movieId?: string } }): Promise<Movie | null> => {
  if (!params.movieId) {
    return null;
  }
  try {
    const response = await fetch(`http://localhost:4000/movies/${params.movieId}`);
    if (response.ok) {
      const movieDto: MovieListDto = await response.json()
      return toMovie(movieDto)
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch movie", error);
    return null;
  }
};

const SearchMovieWrapper = () => {
  const { onSearch, initialQuery } = useOutletContext<{ onSearch: (query: string) => void; initialQuery: string | null; }>();
  return <SearchMovieCard onSearch={onSearch} initialQuery={initialQuery} />;
};

const MovieCardWrapper = () => {
  const movie = useLoaderData() as Movie | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (movie === null) {
      navigate('..', { replace: true });
    }
  }, [movie, navigate]);

  if (movie === null) {
    return null;
  }

  return <MovieCard movie={movie} onDismiss={() => navigate('..')} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    children: [
      {
        index: true,
        element: <SearchMovieWrapper />,
      },
      {
        path: ":movieId",
        element: <MovieCardWrapper />,
        loader: movieLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import SearchForm from "./SearchForm";
import React, { useState, useEffect } from "react";
import Dialog from "../common/Dialog";
import MovieForm from "./MovieForm";
import { Movie } from "@/types/movie";

export const SearchMovieCard = ({
  onSearch,
  initialQuery,
  onAddMovie,
}: {
  onSearch: (query: string) => void,
  initialQuery: string | null,
  onAddMovie: (movie: Movie) => void,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enableFocusTrap, setEnableFocusTrap] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      // Delay enabling focus trap to ensure form elements are in the DOM
      const timer = setTimeout(() => setEnableFocusTrap(true), 50);
      return () => clearTimeout(timer);
    } else {
      setEnableFocusTrap(false);
    }
  }, [isDialogOpen]);

  const handleAddMovie = (movie: Movie) => {
    onAddMovie(movie);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <header className="relative bg-cover bg-center bg-no-repeat h-96"
            style={{ backgroundImage: "url('https://www.themoviedb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="absolute top-5 right-5">
          <button 
            className="bg-main-red text-white uppercase px-4 py-2 rounded"
            onClick={() => setIsDialogOpen(true)}
          >
            + Add Movie
          </button>
        </div>
        <h1 className="text-5xl font-thin uppercase tracking-widest mb-8">
          Find your movie
        </h1>
        <div className="w-full max-w-3xl">
          <SearchForm onSearch={onSearch} initialQuery={initialQuery ?? undefined}/>
        </div>
      </div>
      
      {isDialogOpen && (
        <Dialog title="Add Movie" onClose={handleCancel} maxWidth="3xl" _disableFocusTrap={!enableFocusTrap}>
          <MovieForm onSubmit={handleAddMovie} onCancel={handleCancel} />
        </Dialog>
      )}
    </header>
  )
}

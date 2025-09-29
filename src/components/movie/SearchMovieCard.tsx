import SearchForm from "./SearchForm";
import React from "react";

export const SearchMovieCard = ({
  onSearch,
  initialQuery,
}: {
  onSearch: (query: string) => void,
  initialQuery: string | null,
}) => {
  return (
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
          <SearchForm onSearch={onSearch} initialQuery={initialQuery ?? undefined}/>
        </div>
      </div>
    </header>
  )
}

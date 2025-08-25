import { Movie } from "@/types/movie";
import React, { MouseEventHandler } from "react";

const MovieTile = ({ movie, onClick }: { movie: Movie, onClick: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div className="cursor-pointer font-montserrat w-full sm:w-64 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-105" onClick={onClick}>
      <img src={movie.imageUrl} alt={movie.name} className="w-full h-auto rounded-md" />
      <div className="flex justify-between items-start mt-3">
        <div className="flex flex-col">
          <span className="text-lg font-bold font-montserrat">{movie.name}</span>
          <span className="text-sm text-gray-400 mt-1 font-montserrat">{movie.genres.join(', ')}</span>
        </div>
        <div>
          <span className="border border-gray-400 rounded px-2 py-1 text-xs font-bold">{movie.releaseYear}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieTile;

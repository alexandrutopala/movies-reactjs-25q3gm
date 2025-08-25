import { Movie } from "@/types/movie";
import React from "react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="flex p-4 bg-gray-800 rounded-lg text-white font-montserrat max-w-2xl mx-auto">
      <div className="w-1/4 flex-shrink-0">
        <img src={movie.imageUrl} alt={movie.name} className="w-full h-auto rounded-md" />
      </div>
      <div className="w-3/4 pl-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold text-white font-montserrat">{movie.name}</h2>
            <div className="border border-white rounded-full w-10 h-10 flex items-center justify-center ml-4">
              <span className="text-white font-light text-base">{movie.rating}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">{movie.genres.join(' & ')}</p>
          <div className="flex items-center text-red-500 text-lg mb-4 font-light">
            <span>{movie.releaseYear}</span>
            <span className="ml-4">{formatDuration(movie.duration)}</span>
          </div>
        </div>
        <p className="text-gray-300 text-base leading-relaxed font-montserrat">
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

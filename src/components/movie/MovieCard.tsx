import { Movie } from "@/types/movie";
import React, { useRef } from "react";

const MovieCard = ({ movie, onDismiss }: { movie: Movie, onDismiss?: () => void }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const imgRef = useRef<HTMLImageElement>(null)
  const onImageError = () => {
    if (imgRef.current) {
      imgRef.current.src = "https://placehold.co/400x600?text=Poster+not+available"
    }
  }

  return (
    <div className="w-full h-auto relative p-8 bg-gray-900 flex rounded-lg text-white font-montserrat" data-cy="movie-card">
      <button
        onClick={onDismiss}
        className="absolute top-5 right-5 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex-shrink-0" style={{width: '300px'}}>
        <img src={movie.imageUrl} alt={movie.name} ref={imgRef} onError={onImageError} className="w-full h-auto rounded-md" />
      </div>
      <div className="pl-6 flex flex-col">
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
        <p className="text-gray-300 text-base leading-relaxed font-montserrat mt-4">
          {movie.description}
        </p>
      </div>
    </div>
  )
}

export default MovieCard;

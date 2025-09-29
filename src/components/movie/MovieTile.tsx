import { Movie } from "@/types/movie";
import React, { MouseEventHandler, useRef, useState } from "react";

const MovieTile = (
  { movie, onClick, onEdit, onDelete }: {
    movie: Movie,
    onClick: MouseEventHandler<HTMLDivElement>,
    onEdit?: (movie: Movie) => void,
    onDelete?: (movie: Movie) => void
  }
) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const onImageError = () => {
    if (imgRef.current) {
      imgRef.current.src = "https://placehold.co/400x600?text=Poster+not+available"
    }
  }

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsMenuOpen(false)
    onEdit?.(movie)
  }

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsMenuOpen(false)
    onDelete?.(movie)
  }

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="cursor-pointer font-montserrat w-full sm:w-64 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-105"
         onClick={onClick}
         onMouseEnter={e => setIsHovered(true)}
         onMouseLeave={e => { setIsHovered(false); setIsMenuOpen(false); }}
         data-cy="movie-list"
    >
      {isHovered && (
        <div className="absolute top-2 right-2 bg-gray-800 rounded-full p-1">
          <button className="text-white bg-gray-800 rounded-full p-2" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">                                                                                                                                                                                                                                                           │
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12" />                                                                                                                                                                                                                                                                 │
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
              <button onClick={handleEdit} className="block w-full text-left px-2 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-t-md">Edit</button>
              <button onClick={handleDelete} className="block w-full text-left px-2 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-b-md">Delete</button>
            </div>
          )}
        </div>
      )}
      <img ref={imgRef} src={movie.imageUrl} alt={movie.name} onError={onImageError} className="w-full h-auto rounded-md" />
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

export default MovieTile

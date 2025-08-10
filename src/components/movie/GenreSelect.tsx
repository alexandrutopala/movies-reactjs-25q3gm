import React from "react";

interface GenreSelectProps {
    genreNames: string[]
    currentGenre: string
    onSelect: (genre: string) => void
}

const GenreSelect = ({genreNames, currentGenre, onSelect}: GenreSelectProps) => {
    return (
        <div className="flex flex-row font-montserrat">
            {genreNames.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onSelect(genre)}
                    className={`
                        px-3 py-2 text-sm font-medium transition-colors duration-200
                        ${currentGenre === genre 
                            ? 'text-main-red border-b-2 border-main-red' 
                            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                        }
                    `}
                >
                    {genre}
                </button>
            ))}
        </div>
    )
}

export default GenreSelect;
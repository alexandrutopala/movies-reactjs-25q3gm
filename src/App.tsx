import React, { useState } from 'react';
import Counter from './components/common/Counter';
import SearchForm from './components/movie/SearchForm';
import GenreSelect from './components/movie/GenreSelect';
import MovieTile from "./components/movie/MovieTile";
import MovieCard from "./components/movie/MovieCard";
import SortControl from "./components/common/SortControl";

function App() {
  const [currentGenre, setCurrentGenre] = useState('All');
  const genreNames = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance'];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Movies App
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8">
          Welcome to your TypeScript React Movies Application!
        </p>
        <Counter initialValue={0} />
        <SearchForm onSearch={(query) => {console.log(query)}} />
        <GenreSelect 
          genreNames={genreNames}
          currentGenre={currentGenre}
          onSelect={setCurrentGenre}
        />
        <MovieTile
          movie={
            {
              id: 1,
              name: "Pulp Fiction",
              releaseYear: 2004,
              genres: ["Action", "Adventure"],
              imageUrl: "https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
              rating: 4.8,
              duration: 154,
              description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            }
          }
          onClick={(e) => console.log("clicked")} />
        <MovieCard
          movie={
            {
              id: 2,
              name: "Pulp Fiction",
              releaseYear: 2004,
              genres: ["Action", "Adventure"],
              imageUrl: "https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
              rating: 4.8,
              duration: 154,
              description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            }
          }
          />
        <SortControl options={["Release Date", "Title"]} onChange={(option: string) => console.log(option)} />
      </header>
    </div>
  );
}

export default App;

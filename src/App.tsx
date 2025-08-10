import React, { useState } from 'react';
import Counter from './components/common/Counter';
import SearchForm from './components/movie/SearchForm';
import GenreSelect from './components/movie/GenreSelect';

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
      </header>
    </div>
  );
}

export default App;

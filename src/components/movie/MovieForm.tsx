import React, { useState } from 'react';
import Select from 'react-select';
import { Movie } from '@/types/movie';

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (movie: Movie) => void;
  onCancel: () => void;
}

const genreOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Thriller', label: 'Thriller' },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#4a5568', // gray-700
    borderColor: 'transparent',
    minHeight: '40px',
    height: '40px',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    padding: '0 6px'
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#2d3748', // gray-800
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4a5568' : '#2d3748', // gray-700 on select, gray-800 otherwise
    color: 'white',
    '&:hover': {
      backgroundColor: '#4a5568', // gray-700 on hover
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#2d3748', // gray-800
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
};

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Movie>(movie || {
    id: 0,
    name: '',
    releaseYear: new Date().getFullYear(),
    imageUrl: '',
    rating: 0,
    genres: [],
    duration: 0,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (selectedOptions: any) => {
    setFormData(prev => ({ ...prev, genres: selectedOptions.map((option: any) => option.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-red-500 font-montserrat">Title</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" placeholder="Moana" />
        </div>
        <div>
          <label htmlFor="releaseYear" className="block text-sm font-medium text-red-500 font-montserrat">Release Date</label>
          <input type="number" min="1850" max="2100" name="releaseYear" id="releaseYear" value={movie && formData.releaseYear} onChange={handleChange} placeholder="2015" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-red-500 font-montserrat">Movie URL</label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-red-500 font-montserrat">Rating</label>
          <input type="number" name="rating" id="rating" value={movie && formData.rating} onChange={handleChange} min="1" max="10" step="0.1" placeholder="7.8" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" />
        </div>
        <div>
          <label htmlFor="genres" className="block text-sm font-medium text-red-500 font-montserrat">Genre</label>
          <Select
            inputId="genres"
            isMulti
            name="genres"
            options={genreOptions}
            styles={customStyles}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0"
            onChange={handleGenreChange}
            value={genreOptions.filter(option => formData.genres.includes(option.value))}
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-red-500 font-montserrat">Runtime</label>
          <input type="number" name="duration" id="duration" value={movie && formData.duration} onChange={handleChange} placeholder="minutes" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" />
        </div>
        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-red-500 font-montserrat">Overview</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Movie summary" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2"></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500">Submit</button>
      </div>
    </form>
  );
};

export default MovieForm;

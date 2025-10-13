import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors } 
  } = useForm<Movie>({
    mode: 'onBlur',
    defaultValues: movie || {
      id: 0,
      name: '',
      releaseYear: new Date().getFullYear(),
      imageUrl: '',
      rating: 0,
      genres: [],
      duration: 0,
      description: '',
    }
  });

  const onSubmitForm = (data: Movie) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="p-4 bg-gray-800 text-white rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-red-500 font-montserrat">Title</label>
          <input 
            type="text" 
            id="name" 
            {...register('name', { required: 'Title is required' })} 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" 
            placeholder="Moana" 
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="releaseYear" className="block text-sm font-medium text-red-500 font-montserrat">Release Date</label>
          <input 
            type="number" 
            id="releaseYear" 
            {...register('releaseYear', { 
              required: 'Release year is required',
              min: { value: 1850, message: 'Year must be 1850 or later' },
              max: { value: 2100, message: 'Year must be 2100 or earlier' },
              valueAsNumber: true
            })} 
            placeholder="2015" 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" 
          />
          {errors.releaseYear && <p className="mt-1 text-xs text-red-400">{errors.releaseYear.message}</p>}
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-red-500 font-montserrat">Movie URL</label>
          <input 
            type="url" 
            id="imageUrl" 
            {...register('imageUrl', { 
              required: 'Movie URL is required',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL'
              }
            })} 
            placeholder="https://" 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" 
          />
          {errors.imageUrl && <p className="mt-1 text-xs text-red-400">{errors.imageUrl.message}</p>}
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-red-500 font-montserrat">Rating</label>
          <input 
            type="number" 
            id="rating" 
            {...register('rating', { 
              required: 'Rating is required',
              min: { value: 0, message: 'Rating must be at least 0' },
              max: { value: 10, message: 'Rating must be 10 or less' },
              valueAsNumber: true
            })} 
            step="0.1" 
            placeholder="7.8" 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" 
          />
          {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating.message}</p>}
        </div>
        <div>
          <label htmlFor="genres" className="block text-sm font-medium text-red-500 font-montserrat">Genre</label>
          <Controller
            name="genres"
            control={control}
            rules={{ required: 'At least one genre is required' }}
            render={({ field }) => (
              <Select
                {...field}
                inputId="genres"
                isMulti
                options={genreOptions}
                styles={customStyles}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0"
                value={genreOptions.filter(option => field.value?.includes(option.value))}
                onChange={(selectedOptions) => field.onChange(selectedOptions.map((option: any) => option.value))}
              />
            )}
          />
          {errors.genres && <p className="mt-1 text-xs text-red-400">{errors.genres.message}</p>}
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-red-500 font-montserrat">Runtime</label>
          <input 
            type="number" 
            id="duration" 
            {...register('duration', { 
              required: 'Runtime is required',
              min: { value: 1, message: 'Runtime must be at least 1 minute' },
              valueAsNumber: true
            })} 
            placeholder="minutes" 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2" 
          />
          {errors.duration && <p className="mt-1 text-xs text-red-400">{errors.duration.message}</p>}
        </div>
        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-red-500 font-montserrat">Overview</label>
          <textarea 
            id="description" 
            {...register('description', { required: 'Overview is required' })} 
            rows={4} 
            placeholder="Movie summary" 
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 p-2"
          />
          {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
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

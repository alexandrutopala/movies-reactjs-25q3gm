import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm';
import { Movie } from '@/types/movie';

const movie: Movie = {
  id: 1,
  name: 'Test Movie',
  releaseYear: 2022,
  imageUrl: 'http://test.com/image.jpg',
  rating: 8.5,
  genres: ['Action', 'Drama'],
  duration: 120,
  description: 'This is a test movie.',
};

describe('MovieForm', () => {
  it('renders all form fields', () => {
    render(<MovieForm onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Release Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Movie URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Runtime')).toBeInTheDocument();
    expect(screen.getByLabelText('Overview')).toBeInTheDocument();
  });

  it('fills the form with movie data', () => {
    render(<MovieForm movie={movie} onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByLabelText('Title')).toHaveValue(movie.name);
    expect(screen.getByLabelText('Release Date')).toHaveValue(movie.releaseYear);
    expect(screen.getByLabelText('Movie URL')).toHaveValue(movie.imageUrl);
    expect(screen.getByLabelText('Rating')).toHaveValue(movie.rating);
    expect(screen.getByLabelText('Runtime')).toHaveValue(movie.duration);
    expect(screen.getByLabelText('Overview')).toHaveValue(movie.description);
  });

  it('calls onSubmit with form data when submitted', () => {
    const handleSubmit = jest.fn();
    render(<MovieForm movie={movie} onSubmit={handleSubmit} onCancel={() => {}} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledWith(movie);
  });

  it('calls onCancel when the cancel button is clicked', () => {
    const handleCancel = jest.fn();
    render(<MovieForm onSubmit={() => {}} onCancel={handleCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });
});

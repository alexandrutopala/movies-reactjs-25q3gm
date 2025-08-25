import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    name: 'Django Unchained',
    releaseYear: 2012,
    genres: ['Western', 'Drama'],
    imageUrl: '/logo512.png',
    rating: 8.4,
    duration: 165, // This should be formatted to "2h 45m"
    description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
  };

  it('renders all movie details correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    // Check for title
    expect(screen.getByText('Django Unchained')).toBeInTheDocument();

    // Check for rating
    expect(screen.getByText('8.4')).toBeInTheDocument();

    // Check for genres (joined with ' & ')
    expect(screen.getByText('Western & Drama')).toBeInTheDocument();

    // Check for release year
    expect(screen.getByText('2012')).toBeInTheDocument();

    // Check for formatted duration
    expect(screen.getByText('2h 45m')).toBeInTheDocument();

    // Check for description
    expect(screen.getByText(/With the help of a German bounty-hunter/)).toBeInTheDocument();

    // Check for image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/logo512.png');
    expect(image).toHaveAttribute('alt', 'Django Unchained');
  });
});

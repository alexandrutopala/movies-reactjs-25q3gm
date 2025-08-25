import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieTile from './MovieTile';
import { Movie } from '@/types/movie';

describe('MovieTile', () => {
  const mockMovie: Movie = {
    name: 'Pulp Fiction',
    releaseYear: 1994,
    genres: ['Crime', 'Drama'],
    imageUrl: '/logo512.png',
  };

  it('renders movie information correctly', () => {
    render(<MovieTile movie={mockMovie} onClick={() => {}} />);

    // Check for movie name
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();

    // Check for release year
    expect(screen.getByText('1994')).toBeInTheDocument();

    // Check for genres
    expect(screen.getByText('Crime, Drama')).toBeInTheDocument();

    // Check for image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/logo512.png');
    expect(image).toHaveAttribute('alt', 'Pulp Fiction');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={handleClick} />);

    const tileElement = screen.getByText('Pulp Fiction').closest('div');
    if (tileElement) {
        fireEvent.click(tileElement);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

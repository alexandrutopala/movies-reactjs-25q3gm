import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MovieTile from './MovieTile';
import { Movie } from '@/types/movie';

const meta: Meta<typeof MovieTile> = {
  title: 'Components/Movie/MovieTile',
  component: MovieTile,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MovieTile>;

const mockMovie: Movie = {
  name: 'Pulp Fiction',
  releaseYear: 1994,
  genres: ['Crime', 'Drama'],
  imageUrl: 'https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
  rating: 4.8,
  duration: 154,
  description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
};

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};

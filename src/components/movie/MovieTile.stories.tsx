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
};

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};

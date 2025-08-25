import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

const meta: Meta<typeof MovieCard> = {
  title: 'Components/Movie/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

const mockMovie: Movie = {
  id: 1,
  name: 'Django Unchained',
  releaseYear: 2012,
  genres: ['Western', 'Drama'],
  imageUrl: 'https://www.themoviedb.org/t/p/w1280/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg',
  rating: 8.4,
  duration: 165,
  description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
};

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};


import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import MovieForm from './MovieForm';
import Dialog from "../common/Dialog";
import { Movie } from '@/types/movie';

export default {
  title: 'Components/Movie/MovieForm',
  component: MovieForm,
} as Meta;

const movie: Movie = {
  id: 1,
  name: 'The Shawshank Redemption',
  releaseYear: 1994,
  imageUrl: 'https://via.placeholder.com/300x450',
  rating: 9.3,
  genres: ['Drama'],
  duration: 142,
  description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
}

const Template: StoryFn<typeof MovieForm> = (args) => <MovieForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (movie: Movie) => alert(`Submitting movie: ${movie.name}`),
  onCancel: () => alert('Cancelled'),
};

export const WithMovie = Template.bind({});
WithMovie.args = {
  movie,
  onSubmit: (movie: Movie) => alert(`Submitting movie: ${movie.name}`),
  onCancel: () => alert('Cancelled'),
};

const MovieFormDialogTemplate: StoryFn<typeof MovieForm> = ({movie, onSubmit, onCancel}) => (
  <Dialog title="Add movie" onClose={onCancel}>
    <MovieForm movie={movie} onSubmit={onSubmit} onCancel={onCancel} />
  </Dialog>
)

export const DialogWithoutMovie = MovieFormDialogTemplate.bind({})
DialogWithoutMovie.args = {
  onSubmit: (movie: Movie) => alert(`Submitting movie: ${movie.name}`),
  onCancel: () => alert('Cancelled'),
}

export const DialogWithMovie = MovieFormDialogTemplate.bind({})
DialogWithMovie.args = {
  movie,
  onSubmit: (movie: Movie) => alert(`Submitting movie: ${movie.name}`),
  onCancel: () => alert('Cancelled'),
}

const DeleteDialogTemplate: StoryFn<{onConfirm: () => void, onCancel: () => void}> = ({onConfirm, onCancel}) => (
  <Dialog title="Delete movie" onClose={onCancel}>
    <p className="text-white font-montserrat">
      Are you sure you want to delete this movie?
    </p>
    <div className="flex justify-end mt-4">
      <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500">Cancel</button>
      <button type="button" onClick={onConfirm} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500">Confirm</button>
    </div>
  </Dialog>
)

export const DeleteDialog = DeleteDialogTemplate.bind({})
DeleteDialog.args = {
  onConfirm: () => alert('Movie deleted'),
  onCancel: () => alert('Cancelled'),
}

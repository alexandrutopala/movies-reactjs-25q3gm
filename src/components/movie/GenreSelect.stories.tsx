import type { Meta, StoryObj } from '@storybook/react-webpack5';

import GenreSelect from './GenreSelect';

const meta = {
  component: GenreSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof GenreSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genreNames: ["action", "drama"],
    currentGenre: "action",
    onSelect: () => {}
  }
};

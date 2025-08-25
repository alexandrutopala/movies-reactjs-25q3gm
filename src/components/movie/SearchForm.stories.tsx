import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SearchForm from './SearchForm';

const meta = {
  component: SearchForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: () => {},
    initialQuery: ""
  }
};

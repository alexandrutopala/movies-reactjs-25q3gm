import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import SortControl from './SortControl';

const meta: Meta<typeof SortControl> = {
  title: 'Components/Common/SortControl',
  component: SortControl,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SortControl>;

const sortOptions = ['Release Date', 'Title', 'Rating'];

export const Default: Story = {
  args: {
    options: sortOptions,
    onChange: fn(),
  },
};

export const WithDefaultSelection: Story = {
  args: {
    options: sortOptions,
    onChange: fn(),
    defaultOptionIndex: 1, // Should select 'Title' initially
  },
};

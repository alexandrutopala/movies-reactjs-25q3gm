
import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import Dialog from './Dialog';

export default {
  title: 'Components/Common/Dialog',
  component: Dialog,
} as Meta;

const Template: StoryFn<typeof Dialog> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'My Dialog',
  children: <p>This is the content of the dialog.</p>,
  onClose: () => alert('Dialog closed'),
};

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header and counter', () => {
  render(<App />);
  expect(screen.getByText('Movies App')).toBeInTheDocument();
  expect(screen.getByText('Counter')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
});

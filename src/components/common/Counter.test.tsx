import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('renders initial value provided in props', () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('clicking "decrement" button decrements the displayed value', async () => {
    render(<Counter initialValue={5} />);

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('clicking "increment" button increments the displayed value', async () => {
    render(<Counter initialValue={5} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('6')).toBeInTheDocument();
  });
});



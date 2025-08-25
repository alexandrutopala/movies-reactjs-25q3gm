import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from './SortControl';

describe('SortControl', () => {
  const options = ['Release Date', 'Title', 'Rating'];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    // Clear mock calls before each test
    mockOnChange.mockClear();
  });

  it('renders with the first option selected by default', () => {
    render(<SortControl options={options} onChange={mockOnChange} />);

    // Check that the select element's value is the first option
    expect(screen.getByRole('combobox')).toHaveValue('Release Date');
  });

  it('renders with the option specified by defaultOptionIndex selected', () => {
    render(<SortControl options={options} onChange={mockOnChange} defaultOptionIndex={1} />);

    // Check that the select element's value is the second option ('Title')
    expect(screen.getByRole('combobox')).toHaveValue('Title');
  });

  it('calls onChange with the new value when a different option is selected', () => {
    render(<SortControl options={options} onChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Title' } });

    // Expect onChange to be called once with the new value
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('Title');

    // Check if the component's internal state has updated
    expect(select).toHaveValue('Title');
  });

  it('does not call onChange when the same option is selected again', () => {
    render(<SortControl options={options} onChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    // First selection is 'Release Date' by default
    fireEvent.change(select, { target: { value: 'Release Date' } });

    // Expect onChange not to be called
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SearchForm from './SearchForm';

describe('SearchForm', () => {
  test('renders initial value provided in props', () => {
    render(<SearchForm onSearch={() => {}} initialQuery='testQuery'/>)
    expect(screen.getByDisplayValue('testQuery')).toBeInTheDocument()
  })

  test('calls onSearch with typed value after clicking Search button', () => {
    const handleSearch = jest.fn()
    render(<SearchForm onSearch={handleSearch} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Batman' } })
    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    expect(handleSearch).toHaveBeenCalledTimes(1)
    expect(handleSearch).toHaveBeenCalledWith('Batman')
  })

  test('calls onSearch with typed value after pressing Enter', () => {
    const handleSearch = jest.fn()
    render(<SearchForm onSearch={handleSearch} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Spiderman' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(handleSearch).toHaveBeenCalledTimes(1)
    expect(handleSearch).toHaveBeenCalledWith('Spiderman')
  })

})
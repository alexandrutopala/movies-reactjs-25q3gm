import { fireEvent, render, screen } from "@testing-library/react"
import GenreSelect from "./GenreSelect"

describe('GenreSelect', () => {
  test('render all genres', () => {
    render(<GenreSelect genreNames={['action', 'drama']} currentGenre='action' onSelect={() => {}} />)
    expect(screen.getByText('action')).toBeInTheDocument()
    expect(screen.getByText('drama')).toBeInTheDocument()
  })

  test('highlight selected genre', () => {
    render(<GenreSelect genreNames={['action', 'drama']} currentGenre='action' onSelect={() => {}} />)
    const actionButton = screen.getByRole('button', { name: 'action' })

    expect(actionButton).toHaveClass('text-main-red')
  })

  test('correct select genre after click', () => {
    const onChangeHandler = jest.fn()
    render(<GenreSelect genreNames={['action', 'drama']} currentGenre='action' onSelect={onChangeHandler} />)

    const dramaButton = screen.getByText('drama')
    fireEvent.click(dramaButton)

    expect(onChangeHandler).toHaveBeenCalledTimes(1)
    expect(onChangeHandler).toHaveBeenCalledWith('drama')
  })
})

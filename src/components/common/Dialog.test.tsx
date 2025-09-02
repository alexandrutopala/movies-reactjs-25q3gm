import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './Dialog';

describe('Dialog', () => {
  it('renders the dialog with title and children', () => {
    render(
      <Dialog title="Test Dialog" onClose={() => {}} _disableFocusTrap>
        <p>Test content</p>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Dialog title="Test Dialog" onClose={handleClose} _disableFocusTrap>
        <p>Test content</p>
      </Dialog>
    );

    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalled();
  });
});

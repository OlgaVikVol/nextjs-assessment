import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';
import '@testing-library/jest-dom';

describe('Textarea component', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the error class when error is provided', () => {
    const { container } = render(
      <Textarea error={{ message: 'Error message', type: 'validation' }} />
    );
    expect(container.firstChild).toHaveClass('textarea-wrapper');
    expect(container.querySelector('textarea')).toHaveClass('error');
  });

  it('forwards ref correctly to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('accepts and applies additional className', () => {
    const { container } = render(<Textarea className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('displays error message when error prop is passed', () => {
    render(
      <Textarea error={{ message: 'Required field', type: 'validation' }} />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });
});

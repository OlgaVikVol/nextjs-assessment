import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import '@testing-library/jest-dom';

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the error class when error is provided', () => {
    const { container } = render(
      <Input error={{ message: 'Required field', type: 'validation' }} />
    );
    expect(container.firstChild).toHaveClass('input-wrapper');
    expect(container.querySelector('input')).toHaveClass('error');
  });

  it('forwards ref correctly to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('accepts and applies additional className', () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('displays error message when error prop is passed', () => {
    render(<Input error={{ message: 'Required field', type: 'validation' }} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });
});

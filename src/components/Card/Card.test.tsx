import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import '@testing-library/jest-dom';

describe('Card component', () => {
  it('renders children inside the card', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the default color class when no color is provided', () => {
    const { container } = render(<Card>Default Card</Card>);
    expect(container.firstChild).toHaveClass('card'); 
  });

  it('applies the blue color class when color="blue"', () => {
    const { container } = render(<Card color="blue">Blue Card</Card>);
    expect(container.firstChild).toHaveClass('blue');
  });

  it('forwards ref correctly to the card element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Card with Ref</Card>);
    expect(ref.current).not.toBeNull(); 
    expect(ref.current?.tagName).toBe('DIV'); 
  });

  it('accepts and applies additional className', () => {
    const { container } = render(
      <Card className="custom-class">Styled Card</Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

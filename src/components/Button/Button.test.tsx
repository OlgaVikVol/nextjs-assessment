import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

jest.mock('./arrow.svg', () => {
  const ArrowIconMock = () => <svg data-testid="arrow-icon" />;
  ArrowIconMock.displayName = 'ArrowIconMock';
  return ArrowIconMock;
});

describe('Button', () => {
  it('renders with children', () => {
    render(<Button appearance="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary class', () => {
    const { container } = render(<Button appearance="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('button');
    expect(container.firstChild).toHaveClass('primary');
  });

  it('applies ghost class', () => {
    const { container } = render(<Button appearance="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass('ghost');
  });

  it('does not render arrow by default', () => {
    render(<Button appearance="primary">No Arrow</Button>);
    expect(screen.queryByTestId('arrow-icon')).not.toBeInTheDocument();
  });

  it('renders arrow when specified', () => {
    render(
      <Button appearance="primary" arrow="right">
        With Arrow
      </Button>
    );
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('adds custom className', () => {
    const { container } = render(
      <Button appearance="primary" className="custom-class">
        Custom
      </Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

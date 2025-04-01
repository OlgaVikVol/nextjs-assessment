import { render, screen } from '@testing-library/react';
import { ButtonIcon } from './ButtonIcon';
import '@testing-library/jest-dom';

// Mock icon components as React SVG components
jest.mock('./ButtonIcon.props', () => ({
  icons: {
    up: () => <svg data-testid="icon-up" />,
    close: () => <svg data-testid="icon-close" />,
    menu: () => <svg data-testid="icon-menu" />
  }
}));

describe('ButtonIcon', () => {
  it('renders "up" icon correctly', () => {
    render(<ButtonIcon icon="up" appearance="primary" />);
    expect(screen.getByTestId('icon-up')).toBeInTheDocument();
  });

  it('renders "close" icon correctly', () => {
    render(<ButtonIcon icon="close" appearance="white" />);
    expect(screen.getByTestId('icon-close')).toBeInTheDocument();
  });

  it('renders "menu" icon correctly', () => {
    render(<ButtonIcon icon="menu" appearance="primary" />);
    expect(screen.getByTestId('icon-menu')).toBeInTheDocument();
  });

  it('applies primary class', () => {
    const { container } = render(<ButtonIcon icon="menu" appearance="primary" />);
    expect(container.firstChild).toHaveClass('primary');
  });

  it('applies white class', () => {
    const { container } = render(<ButtonIcon icon="menu" appearance="white" />);
    expect(container.firstChild).toHaveClass('white');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ButtonIcon icon="menu" appearance="primary" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

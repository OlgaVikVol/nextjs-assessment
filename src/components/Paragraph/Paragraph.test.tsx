import { render, screen } from '@testing-library/react';
import { Paragraph } from './Paragraph';
import '@testing-library/jest-dom';

describe('Paragraph Component', () => {
  it('renders with children', () => {
    render(<Paragraph>Test Paragraph</Paragraph>);
    expect(screen.getByText('Test Paragraph')).toBeInTheDocument();
  });

  it('applies default size (medium) when no size prop is provided', () => {
    render(<Paragraph>Default Size Paragraph</Paragraph>);
    const paragraph = screen.getByText('Default Size Paragraph');
    expect(paragraph).toHaveClass('p');
    expect(paragraph).toHaveClass('m'); 
  });

  it('applies small size when size prop is "s"', () => {
    render(<Paragraph size="s">Small Size Paragraph</Paragraph>);
    expect(screen.getByText('Small Size Paragraph')).toHaveClass('s');
  });

  it('applies medium size when size prop is "m"', () => {
    render(<Paragraph size="m">Medium Size Paragraph</Paragraph>);
    expect(screen.getByText('Medium Size Paragraph')).toHaveClass('m');
  });

  it('applies large size when size prop is "l"', () => {
    render(<Paragraph size="l">Large Size Paragraph</Paragraph>);
    expect(screen.getByText('Large Size Paragraph')).toHaveClass('l');
  });

  it('applies additional className if provided', () => {
    render(
      <Paragraph className="custom-class">
        Paragraph with Custom Class
      </Paragraph>
    );
    expect(screen.getByText('Paragraph with Custom Class')).toHaveClass(
      'custom-class'
    );
  });
});


import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';
import '@testing-library/jest-dom';

describe('Tag Component', () => {
  it('renders with children', () => {
    render(<Tag size='m'>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('applies default size (small) when no size prop is provided', () => {
    render(<Tag size='s'>Default Size Tag</Tag>);
    const tag = screen.getByText('Default Size Tag').closest('div');
    expect(tag).toHaveClass('tag');
    expect(tag).toHaveClass('s'); 
  });

  it('applies small size when size prop is "s"', () => {
    render(<Tag size="s">Small Tag</Tag>);
    expect(screen.getByText('Small Tag').closest('div')).toHaveClass('s');
  });

  it('applies medium size when size prop is "m"', () => {
    render(<Tag size="m">Medium Tag</Tag>);
    expect(screen.getByText('Medium Tag').closest('div')).toHaveClass('m');
  });

  it('applies default color (ghost) when no color prop is provided', () => {
    render(<Tag size='m'>Default Color Tag</Tag>);
    expect(screen.getByText('Default Color Tag').closest('div')).toHaveClass('ghost');
  });

  it('applies specific color classes', () => {
    const colors = ['ghost', 'red', 'grey', 'green', 'primary'] as const;

    colors.forEach((color) => {
      render(<Tag size="m" color={color}>Tag {color}</Tag>);
      expect(screen.getByText(`Tag ${color}`).closest('div')).toHaveClass(color);
    });
  });

  it('renders an anchor tag when href is provided', () => {
    render(<Tag size='m' href="https://example.com">Link Tag</Tag>);
    const link = screen.getByText('Link Tag').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders children without anchor when href is not provided', () => {
    render(<Tag size='m'>Non-Link Tag</Tag>);
    expect(screen.getByText('Non-Link Tag').closest('a')).not.toBeInTheDocument();
  });

  it('applies additional className when provided', () => {
    render(
      <Tag size='m' className="custom-class">
        Tag with Custom Class
      </Tag>
    );
    expect(screen.getByText('Tag with Custom Class').closest('div')).toHaveClass('custom-class');
  });
});

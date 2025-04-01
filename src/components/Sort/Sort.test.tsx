import { render, screen, fireEvent } from '@testing-library/react';
import { Sort } from './Sort';
import { SortEnum } from './Sort.props';
import '@testing-library/jest-dom';

// Mock the SortIcon
jest.mock('./sort.svg', () => () => <svg data-testid="sort-icon" />);

describe('Sort component', () => {
  it('renders both sort buttons with icons and labels', () => {
    render(<Sort sort={SortEnum.Rating} setSort={jest.fn()} />);

    expect(screen.getByRole('tab', { name: /by rating/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /by price/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('sort-icon')).toHaveLength(2);
  });

  it('applies active class and aria-selected correctly', () => {
    const { container } = render(<Sort sort={SortEnum.Price} setSort={jest.fn()} />);
    const priceButton = screen.getByRole('tab', { name: /by price/i });

    expect(priceButton).toHaveClass('active');
    expect(priceButton).toHaveAttribute('aria-selected', 'true');

    const ratingButton = screen.getByRole('tab', { name: /by rating/i });
    expect(ratingButton).not.toHaveClass('active');
    expect(ratingButton).toHaveAttribute('aria-selected', 'false');
  });

  it('calls setSort with correct value on click', () => {
    const mockSetSort = jest.fn();
    render(<Sort sort={SortEnum.Rating} setSort={mockSetSort} />);

    const priceButton = screen.getByRole('tab', { name: /by price/i });
    fireEvent.click(priceButton);

    expect(mockSetSort).toHaveBeenCalledWith(SortEnum.Price);

    const ratingButton = screen.getByRole('tab', { name: /by rating/i });
    fireEvent.click(ratingButton);

    expect(mockSetSort).toHaveBeenCalledWith(SortEnum.Rating);
  });
});

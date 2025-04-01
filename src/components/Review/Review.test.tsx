import { render, screen } from '@testing-library/react';
import { Review } from './Review';
import '@testing-library/jest-dom';

// Mock SVG icon
jest.mock('./user.svg', () => () => <svg data-testid="user-icon" />);

// Mock Rating component
jest.mock('../Rating/Rating', () => ({
  Rating: ({ rating }: { rating: number }) => (
    <div data-testid="rating">Rating: {rating}</div>
  )
}));

describe('Review', () => {
  const mockReview = {
    _id: '123',
    name: 'Ivan',
    title: 'Отличный товар',
    description: 'Очень доволен качеством!',
    createdAt: new Date('2023-05-15T10:30:00.000Z'),
    rating: 4
  };

  it('renders all review fields correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    expect(screen.getByText('Ivan:')).toBeInTheDocument();
    expect(screen.getByText('Отличный товар')).toBeInTheDocument();
    expect(screen.getByText('Очень доволен качеством!')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveTextContent('Rating: 4');
    expect(screen.getByText('15 мая 2023')).toBeInTheDocument(); 
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { Rating } from './Rating';
import '@testing-library/jest-dom';

// Mock the SVG star
jest.mock('./star.svg', () => {
  const StarIconMock = () => <svg data-testid="star-icon" />;
  StarIconMock.displayName = 'StarIconMock';
  return StarIconMock;
});

describe('Rating', () => {
  it('renders 5 stars', () => {
    render(<Rating rating={3} />);
    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  });

  it('allows click to change rating when editable', () => {
    const setRating = jest.fn();
    render(<Rating rating={2} isEditable={true} setRating={setRating} />);

    const stars = screen.getAllByTestId('star-icon');
    fireEvent.click(stars[3]);
    expect(setRating).toHaveBeenCalledWith(4);
  });

  it('renders error message when error is passed', () => {
    render(
      <Rating
        rating={3}
        error={{ message: 'Rating is required', type: 'manual' }}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Rating is required');
  });
});

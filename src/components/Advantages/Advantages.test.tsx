import { render, screen } from '@testing-library/react';
import { Advantages } from './Advantages';
import '@testing-library/jest-dom';

jest.mock('./check.svg', () => () => <svg data-testid="check-icon" />);

describe('Advantages component', () => {
  const mockAdvantages = [
		{ _id: '1', title: 'Fast performance', description: 'Everything loads quickly' },
		{ _id: '2', title: 'Cross-platform support', description: 'Works on all devices' },
  ];

  it('renders all advantages with title and icon', () => {
    render(<Advantages advantages={mockAdvantages} />);

    // Check icon count
    const icons = screen.getAllByTestId('check-icon');
    expect(icons).toHaveLength(mockAdvantages.length);

    // Check title text appears twice per item
    mockAdvantages.forEach(({ title }) => {
      const matches = screen.getAllByText(title);
      expect(matches.length).toBe(2); 
    });
  });
});

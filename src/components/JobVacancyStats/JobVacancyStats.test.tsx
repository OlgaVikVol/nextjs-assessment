import { render, screen } from '@testing-library/react';
import { JobVacancyStats } from './JobVacancyStats';
import '@testing-library/jest-dom';

// Mock SVG component
jest.mock('./rate.svg', () => {
  const RateIconMock = () => <svg data-testid="rate-icon" />;
  RateIconMock.displayName = 'RateIconMock';
  return RateIconMock;
});

// Mock currency formatting
jest.mock('@/helpers/helpers', () => ({
  priceUSD: (n: number) => `$${n}`,
}));

describe('JobVacancyStats', () => {
  const props = {
    count: 42,
    juniorSalary: 1000,
    middleSalary: 3000,
    seniorSalary: 6000,
    _id: 'test-id',
    updatedAt: new Date(),
  };

  beforeEach(() => {
    render(<JobVacancyStats {...props} />);
  });

  it('renders total vacancy count', () => {
    expect(screen.getByText('Total vacancies')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders formatted salaries', () => {
    expect(screen.getByText('$1000')).toBeInTheDocument(); // Junior
    expect(screen.getByText('$3000')).toBeInTheDocument(); // Middle
    expect(screen.getByText('$6000')).toBeInTheDocument(); // Senior
  });

  it('renders section titles', () => {
    expect(screen.getByText('Junior')).toBeInTheDocument();
    expect(screen.getByText('Middle')).toBeInTheDocument();
    expect(screen.getByText('Senior')).toBeInTheDocument();
  });

  it('renders correct number of rate icons', () => {
    const icons = screen.getAllByTestId('rate-icon');
    expect(icons.length).toBe(9); // 3 per level × 3 levels
  });
});

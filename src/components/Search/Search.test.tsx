import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import '@testing-library/jest-dom';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Search component', () => {
  it('renders input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value and triggers search on button click', () => {
    const routerPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: routerPush });

    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'angular' } });
    fireEvent.click(button);

    expect(routerPush).toHaveBeenCalledWith({
      pathname: '/search',
      query: { q: 'angular' },
    });
  });

  it('triggers search on Enter key press', () => {
    const routerPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: routerPush });

    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'nextjs' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(routerPush).toHaveBeenCalledWith({
      pathname: '/search',
      query: { q: 'nextjs' },
    });
  });
});

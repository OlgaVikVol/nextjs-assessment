import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';
import type { NextRouter } from 'next/router';

describe('Search component', () => {
  let routerPush: jest.Mock;

  beforeEach(() => {
    routerPush = jest.fn();

    const mockRouter = {
      push: routerPush,
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
      isReady: true,
      isFallback: false,
      isPreview: false,
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
    } as unknown as NextRouter;

    jest.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);
  });

  it('renders input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value and triggers search on button click', () => {
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



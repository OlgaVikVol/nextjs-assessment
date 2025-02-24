import React from 'react';
import { render, screen } from '@testing-library/react';
import { Htag } from './Htag';

describe('Htag component', () => {
  it('renders an h1 element with the correct text and class', () => {
    render(<Htag tag="h1">Heading 1</Htag>);
    const heading = screen.getByText('Heading 1');
    expect(heading.tagName).toBe('H1');
  });

  it('renders an h2 element with the correct text and class', () => {
    render(<Htag tag="h2">Heading 2</Htag>);
    const heading = screen.getByText('Heading 2');
    expect(heading.tagName).toBe('H2');

  });

  it('renders an h3 element with the correct text and class', () => {
    render(<Htag tag="h3">Heading 3</Htag>);
    const heading = screen.getByText('Heading 3');
    expect(heading.tagName).toBe('H3');

  });
});

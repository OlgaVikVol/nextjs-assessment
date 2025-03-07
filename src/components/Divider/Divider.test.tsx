import React from 'react';
import { render } from '@testing-library/react';
import { Divider } from './Divider';
import '@testing-library/jest-dom';

describe('Divider component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as an `hr` element', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies the default styles from CSS module', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('hr');
  });
});

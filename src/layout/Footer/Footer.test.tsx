import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom';
import { format } from 'date-fns';

describe('Footer Component', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the current year', () => {
    render(<Footer />);
    const currentYear = format(new Date(), 'yyyy');
    expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
  });

  it('contains a "User agreement" link with target _blank', () => {
    render(<Footer />);
    const userAgreementLink = screen.getByText('User agreement').closest('a');
    expect(userAgreementLink).toBeInTheDocument();
    expect(userAgreementLink).toHaveAttribute('href', '#');
    expect(userAgreementLink).toHaveAttribute('target', '_blank');
  });

  it('contains a "Privacy policy" link with target _blank', () => {
    render(<Footer />);
    const privacyPolicyLink = screen.getByText('Privacy policy').closest('a');
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '#');
    expect(privacyPolicyLink).toHaveAttribute('target', '_blank');
  });

  it('applies additional className when provided', () => {
    render(<Footer className="custom-footer-class" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('custom-footer-class');
  });
});

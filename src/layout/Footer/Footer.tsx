import { FooterProps } from './Footer.props';
import cn from 'classnames';
import styles from './Footer.module.css';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>© {format(new Date(), 'yyyy')} All rights reserved.</div>
      <a href="#" target="_blank">
        User agreement
      </a>
      <a href="#" target="_blank">
        Privacy policy
      </a>
    </footer>
  );
};

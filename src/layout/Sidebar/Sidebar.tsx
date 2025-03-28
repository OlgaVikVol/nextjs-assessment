import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import { Search } from '@/components';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Logo className={styles.logo} height="50px" width="170px" />
      <Search />
      <Menu />
    </div>
  );
};

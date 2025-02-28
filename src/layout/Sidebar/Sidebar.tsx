import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { Menu } from '../Menu/Menu';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Menu />
    </div>
  );
};

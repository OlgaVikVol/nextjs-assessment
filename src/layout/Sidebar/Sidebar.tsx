import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      Sidebar
    </div>
  );
};

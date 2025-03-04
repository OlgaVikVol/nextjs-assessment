import { JSX, useState } from 'react';
import { SearchProps } from './Search.props';
import { useRouter } from 'next/navigation';
import GlassIcon from './glass.svg';
import cn from 'classnames';
import styles from './Search.module.css';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const goToSearch = () => {};

  const handleKeyDown = () => {};

  return (
    <form
      className={cn(className, styles.search)}
      {...props}
      role="search"
    ></form>
  );
};

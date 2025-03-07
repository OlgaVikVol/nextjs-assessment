import { JSX, useState, KeyboardEvent } from 'react';
import { SearchProps } from './Search.props';
import { useRouter } from 'next/router';
import GlassIcon from './glass.svg';
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Search"
      >
        <GlassIcon />
      </Button>
    </form>
  );
};

import { JSX } from 'react';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import cn from 'classnames';
import styles from './Sort.module.css';

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles['sort-name']} id="sort">
        Sorting
      </div>
      <button
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({ [styles.active]: sort === SortEnum.Rating })}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby='sort by rating'
      >
        <SortIcon className={styles['sort-icon']} />
        By Rating
      </button>
			<button
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        className={cn({ [styles.active]: sort === SortEnum.Price})}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby='sort by price'
      >
        <SortIcon className={styles['sort-icon']} />
        By Price
      </button>
    </div>
  );
};

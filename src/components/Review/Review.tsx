import { JSX } from 'react';
import { ReviewProps } from './Review.props';
import cn from 'classnames';
import styles from './Review.module.css';
import UserIcon from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating';

export const Review = ({
  review,
  className,
  ...props
}: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={cn(styles.review, className)} {...props}>
      <UserIcon className={styles.user} width={30} height={30}/>
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
			<div className={styles.description}>
				{description}
			</div>
    </div>
  );
};

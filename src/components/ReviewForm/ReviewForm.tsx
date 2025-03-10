import { JSX, useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [error, setError] = useState<string>();

  return (
    <form>
      <div className={cn(styles['review-form'])} {...props}>
        <Input placeholder="Name" />
        <Input placeholder="Review Title" className={styles.title} />
        <div className={styles.rating}>
          <span>Rating:</span>
          <Rating rating={0} />
        </div>
        <Textarea placeholder="Review Text" />
        <div className={styles.submit}>
          <Button appearance="primary">Send</Button>
          <span className={styles.info}>
            * The review will undergo preliminary moderation and verification
            before publication.
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles['success-title']}>
            Your review has been sent
          </div>
          <div>
            Thank you, your review will be published after verification.
          </div>
          <button className={styles.close} aria-label="Close review">
            {' '}
            <CloseIcon />
          </button>
        </div>
      )}
			{error && <div className={cn(styles.error, styles.panel)} role="alert">
			Something went wrong, try refreshing the page.
			<button className={styles.close} aria-label="Close review">
            {' '}
            <CloseIcon />
          </button>
				</div>}
    </form>
  );
};

import { JSX, useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState(true);
  const [error, setError] = useState<string>();

  const onSubmit = (data: IReviewForm) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles['review-form'])} {...props}>
        <Input {...register('name')} placeholder="Name" />
        <Input
          {...register('title')}
          placeholder="Review Title"
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Rating:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => <Rating isEditable rating={field.value} setRating={field.onChange}/>}
          />
        </div>
        <Textarea {...register('description')} placeholder="Review Text" />
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
      {error && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Something went wrong, try refreshing the page.
          <button className={styles.close} aria-label="Close review">
            {' '}
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};

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
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '@/helpers/api';

export const ReviewForm = ({
  productId,
  isOpened,
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

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId,
        }
      );

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Error');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles['review-form'], className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Add name' },
          })}
          error={errors.name}
          placeholder="Name"
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Add title' },
          })}
          error={errors.title}
          placeholder="Review Title"
          className={styles.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Rating:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Add rating' } }}
            render={({ field }) => (
              <Rating
                isEditable
                ref={field.ref}
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
                aria-label="Review text"
                aria-invalid={errors.description ? true : false}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Add description' },
          })}
          error={errors.description}
          placeholder="Review Text"
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Send
          </Button>
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
          <button
            className={styles.close}
            aria-label="Close review"
            onClick={() => setIsSuccess(false)}
          >
            {' '}
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Something went wrong, try refreshing the page.
          <button
            className={styles.close}
            aria-label="Close review"
            onClick={() => setIsSuccess(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};

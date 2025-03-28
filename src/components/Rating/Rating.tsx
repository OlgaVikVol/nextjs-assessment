import {
  JSX,
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
  useCallback,
} from 'react';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import cn from 'classnames';
import styles from './Rating.module.css';

export const Rating = forwardRef(
  (
    { isEditable, rating, setRating, error, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const constructRating = useCallback(
      (currentRating: number) => {
        const computeFocus = (r: number, i: number): number => {
          if (!isEditable) return -1;
          if (!rating && i === 0) return tabIndex ?? 0;
          if (r === i + 1) return tabIndex ?? 0;
          return -1;
        };

        const handleKey = (e: KeyboardEvent) => {
          if (!isEditable || !setRating) return;

          if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            if (!rating) {
              setRating(1);
            } else {
              e.preventDefault();
              setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
          }

          if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
          }
        };

        const updatedArray = new Array(5).fill(null).map((_, i) => (
          <span
            key={i}
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => {
              if (isEditable) constructRating(i + 1);
            }}
            onMouseLeave={() => {
              if (isEditable) constructRating(rating);
            }}
            onClick={() => {
              if (isEditable && setRating) setRating(i + 1);
            }}
            onKeyDown={handleKey}
            ref={(el) => {
              ratingArrayRef.current[i] = el;
            }}
            tabIndex={computeFocus(currentRating, i)}
            role={isEditable ? 'slider' : ''}
            aria-invalid={!!error}
            aria-valuenow={rating}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label={isEditable ? 'Add rating' : `rating ${rating}`}
          >
            <StarIcon height="20px" width="20px" />
          </span>
        ));

        setRatingArray(updatedArray);
      },
      [isEditable, rating, setRating, tabIndex, error]
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex, constructRating]);

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles['rating-wrapper'], {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles['error-message']}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

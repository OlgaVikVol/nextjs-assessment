import { ForwardedRef, forwardRef, JSX } from 'react';
import { CardProps } from './Card.props';
import cn from 'classnames';
import styles from './Card.module.css';

export const Card = forwardRef(
  (
    { color = 'write', children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color === 'blue',
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

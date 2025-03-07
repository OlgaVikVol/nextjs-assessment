import { forwardRef, ForwardedRef, JSX } from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import Image from 'next/image';

export const Product = forwardRef(
  (
    { product, className, ...props }: ProductProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
          <div>
            <Image
              src={product.image}
              alt={product.title}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>{product.price}</div>
          <div className={styles.credit}>{product.credit}</div>
          <div className={styles.rating}>
            <Rating rating={product.reviewAvg ?? product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map((category) => (
              <Tag key={category} color="ghost" size="m">
                {category}
              </Tag>
            ))}
          </div>
          <div className={styles['price-title']}>Price</div>
          <div className={styles['credit-title']}>Credit</div>
          <div className={styles['rate-title']}>{product.reviewCount}</div>
        </Card>
      </div>
    );
  }
);

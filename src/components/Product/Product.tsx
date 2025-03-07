import { forwardRef, ForwardedRef, JSX } from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import Image from 'next/image';
import { Button } from '../Button/Button';

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
              className={styles.image}
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
          <div className={styles.hr}>
            <hr />{' '}
          </div>
          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>feature</div>
          <div className={styles['adv-block']}>
            <div className={styles.advantages}>
              <div>Advantges</div>
              <div>{product.advantages}</div>
            </div>
            <div className={styles.disadvantages}>
              <div>Disadvantages</div>
              <div>{product.disadvantages}</div>
            </div>
          </div>
          <div className={styles.hr}>
            <hr />{' '}
          </div>
          <div className={styles.actions}>
            <Button appearance="primary">Узнать подробнее</Button>
            <Button appearance="ghost" arrow={'right'}>
              Читать отзывы
            </Button>
          </div>
        </Card>
      </div>
    );
  }
);

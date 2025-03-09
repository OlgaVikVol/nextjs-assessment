import { forwardRef, ForwardedRef, JSX } from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { decOfNum, priceUSD } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';

export const Product = forwardRef(
  (
    { product, className, ...props }: ProductProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
          <div className={styles.logo}>
            <Image
              className={styles.image}
              src={product.image}
              alt={product.title}
              width={60}
              height={60}
            />
          </div>
          <div className={styles.title}>
            <span>{product.title}</span>
          </div>
          <div className={styles.price}>
            <span>{priceUSD(product.price)}</span>
            {product.oldPrice && (
              <Tag className={styles['old-price']} color="green" size="m">
                {priceUSD(product.price - product.oldPrice)}
              </Tag>
            )}
          </div>
          <div className={styles.credit}>
            {priceUSD(product.credit)}/<span className={styles.month}>мес</span>
          </div>
          <div className={styles.rating}>
            <Rating rating={product.reviewAvg || product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map((category) => (
              <Tag key={category} className={styles.tag} color="ghost" size="m">
                {category}
              </Tag>
            ))}
          </div>
          <div className={styles['price-title']}>Price</div>
          <div className={styles['credit-title']}>Credit</div>
          <div className={styles['rate-title']}>
            {product.reviewCount}{' '}
            {decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </div>
          <Divider className={styles.hr} />
          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>
            {product.characteristics.map((c) => (
              <div className={styles.characteristics} key={c.name}>
                <span className={styles['characteristics-name']}>{c.name}</span>
                <span className={styles['characteristics-dots']}></span>
                <span className={styles['characteristics-value']}>{c.value}</span>
              </div>
            ))}
          </div>
          <div className={styles['adv-block']}>
            {product.advantages && (
              <div className={styles.advantages}>
                <div className={styles['adv-title']}>Преимущества</div>
                <div>{product.advantages}</div>
              </div>
            )}
            {product.disadvantages && (
              <div className={styles.disadvantages}>
                <div className={styles['adv-title']}>Недостатки</div>
                <div>{product.disadvantages}</div>
              </div>
            )}
          </div>
          <Divider className={cn(styles.hr, styles.hr2)} />
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

import { forwardRef, ForwardedRef, JSX, useRef, useState } from 'react';
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
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = forwardRef(
  (
    { product, className, ...props }: ProductProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
      setIsReviewOpened(true);
      setTimeout(() => {
        if (reviewRef.current) {
          reviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50)
    };

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
            <a href="#ref" onClick={scrollToReview}>
              {product.reviewCount}{' '}
              {decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
          </div>
          <Divider className={styles.hr} />
          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>
            {product.characteristics.map((c) => (
              <div className={styles.characteristics} key={c.name}>
                <span className={styles['characteristics-name']}>{c.name}</span>
                <span className={styles['characteristics-dots']}></span>
                <span className={styles['characteristics-value']}>
                  {c.value}
                </span>
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
            <Button
              appearance="ghost"
              arrow={isReviewOpened ? 'down' : 'right'}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
              aria-expanded={isReviewOpened}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        {isReviewOpened && (
          <Card
            color="blue"
            className={styles.reviews}
            ref={reviewRef}
            tabIndex={isReviewOpened ? 0 : -1}
          >
            {product.reviews.map((r) => (
              <div key={r._id}>
                <Review review={r} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        )}
      </div>
    );
  }
);

import { JSX, useEffect, useReducer } from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Htag, Tag, JobVacancyStats, Sort, Product } from '@/components';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { Advantages } from '@/components/Advantages/Advantages';
import { SortEnum } from '@/components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );
  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m" aria-label={products.length + 'elements'}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((product) => (
            <Product role="listitem" layout={shouldReduceMotion ? false: true} product={product} key={product._id} />
          ))}
      </div>
      <div className={styles['hh-title']}>
        <Htag tag="h2">Vacancy - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <JobVacancyStats {...page.hh}></JobVacancyStats>
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Advantages</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Acquired skills</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color="primary" size="m" className={styles.tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};

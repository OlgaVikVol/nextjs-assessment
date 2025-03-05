import { JSX } from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Htag, Tag, JobVacancyStats } from '@/components';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '@/interfaces/page.interface';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m" aria-label={products.length + 'elements'}>
            {products.length}
          </Tag>
        )}
        <span>Sorting</span>
      </div>
      <div>
        {products &&
          products.map((product) => (
            <div key={product._id}>{product.title}</div>
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
    </div>
  );
};

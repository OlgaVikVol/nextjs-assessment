import { JobVacancyStatsProps } from './JobVacancyStats.props';
import styles from './JobVacancyStats.module.css';
import { Card } from '../Card/Card';
import { priceUSD } from '@/helpers/helpers';
import RateIcon from './rate.svg';

export const JobVacancyStats = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: JobVacancyStatsProps) => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Total vacancies</div>
        <div className={styles['count-value']}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Junior</div>
          <div className={styles['salary-value']}>{priceUSD(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} height="20px" width="20px" />
            <RateIcon height="20px" width="20px" />
            <RateIcon height="20px" width="20px" />
          </div>
        </div>

        <div>
          <div className={styles.title}>Middle</div>
          <div className={styles['salary-value']}>{priceUSD(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} height="20px" width="20px"/>
            <RateIcon className={styles.filled} height="20px" width="20px"/>
            <RateIcon height="20px" width="20px"/>
          </div>
        </div>

        <div>
          <div className={styles.title}>Senior</div>
          <div className={styles['salary-value']}>{priceUSD(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} height="20px" width="20px"/>
            <RateIcon className={styles.filled} height="20px" width="20px"/>
            <RateIcon className={styles.filled} height="20px" width="20px"/>
          </div>
        </div>
      </Card>
    </div>
  );
};

import { AppContext } from '@/context/app.context';
import { firstLevelMenu } from '@/helpers/helpers';
import Link from 'next/link';
import {
  JSX,
  useContext,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import { useRouter } from 'next/router';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    if (setMenu) {
      setMenu(
        menu.map((m) =>
          m._id.secondCategory === secondCategory
            ? { ...m, isOpened: !m.isOpened }
            : m
        )
      );
      setAnnounce(
        menu.find((m) => m._id.secondCategory === secondCategory)?.isOpened
          ? 'closed'
          : 'opened'
      );
    }
  };

  const openSecondLevelKey = (
    key: ReactKeyboardEvent<HTMLButtonElement>,
    secondCategory: string
  ) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles['first-level-list']}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`} className={styles['first-level']}>
              {' '}
              <span>{m.name}</span>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles['second-block']}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={styles['second-level']}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>

              {m.isOpened && buildThirdLevel(m.pages, menuItem.route)}
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <ul className={styles['third-block']}>
        {pages.map((p) => (
          <li key={p._id}>
            <Link
              href={`/${route}/${p.alias}`}
              className={cn(styles['third-level'], {
                [styles['third-level-active']]:
                  `/${route}/${p.alias}` === router.asPath,
              })}
              aria-current={
                `/${route}/${p.alias}` === router.asPath ? 'page' : undefined
              }
            >
              {p.category}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {buildFirstLevel()}
    </nav>
  );
};

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
import { FirstLevelMenuItem, MenuItem, PageItem } from '@/interfaces/menu.interface';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shouldReducedMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReducedMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: shouldReducedMotion ? 1 : 0, height: 0 },
  };

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
          <li key={m.route}>
            <Link href={`/${m.route}`} className={styles['first-level']}>
              <span className={styles['icon-wrapper']}>{m.icon}</span>
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
        {menu.map((m: MenuItem) => {
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
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles['second-level-block']}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      <ul className={styles['third-block']}>
        {pages.map((p) => (
          <motion.li key={p._id} variants={variantsChildren}>
            <Link
              href={`/${route}/${p.alias}`}
              tabIndex={isOpened ? 0 : -1}
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
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visualy-hidden">
          {announce == 'opened' ? 'visible' : 'hidden'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};

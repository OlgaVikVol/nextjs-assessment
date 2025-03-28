import { FunctionComponent, JSX, useRef, useState, KeyboardEvent } from 'react';
import { LayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.css';
import cn from 'classnames';
import { AppContextProvider, IAppContext } from '@/context/app.context';
import { ScrollToTopButton } from '@/components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if(key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false)
  };

  return (
    <div className={styles.wrapper}>
      <a
        className={cn(styles['skip-link'], {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        tabIndex={0}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <ScrollToTopButton />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};

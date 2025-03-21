import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from "../logo.svg";
import { ButtonIcon } from '@/components';
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from '../Sidebar/Sidebar';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false)
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: shouldReduceMotion ? 1: 0,
      x: "100%"
    }
  }

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo height="50px" width="170px" />
      <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)} />
      <motion.div
        className={styles["mobile-menu"]}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon className={styles["menu-close"]} appearance="white" icon="close" onClick={() => setIsOpened(false)}/>
      </motion.div>

    </header>
  );
};

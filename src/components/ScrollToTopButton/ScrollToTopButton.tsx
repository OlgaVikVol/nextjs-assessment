import { JSX, useEffect } from 'react';
import styles from './ScrollToTopButton.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '@/hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const ScrollToTopButton = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        appearance="primary"
        icon="up"
        aria-label="Up"
        onClick={scrollToTop}
      />
    </motion.div>
  );
};

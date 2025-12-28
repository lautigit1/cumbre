"use client";

import styles from './BotonCobre.module.scss';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type Props = PropsWithChildren<{
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}>;

export function BotonCobre({ children, onClick, type = 'button' }: Props) {
  return (
    <motion.button
      className={styles.boton}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}

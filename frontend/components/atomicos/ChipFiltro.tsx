"use client";

import styles from './ChipFiltro.module.scss';
import { motion } from 'framer-motion';

type Props = {
  label: string;
  activo?: boolean;
  onClick?: () => void;
};

export function ChipFiltro({ label, activo = false, onClick }: Props) {
  return (
    <motion.button
      className={`${styles.chip} ${activo ? styles.activo : ''}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

"use client";

import styles from './TarjetaActivo.module.scss';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  titulo: string;
  descripcion: string;
  precio?: string;
  rendimiento?: string;
  icono?: LucideIcon;
  onClick?: () => void;
};

export function TarjetaActivo({ titulo, descripcion, precio, rendimiento, icono: Icon, onClick }: Props) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <header className={styles.header}>
        {Icon && <Icon size={20} />}
        <h3>{titulo}</h3>
      </header>
      <p className={styles.desc}>{descripcion}</p>
      <div className={styles.meta}>
        {precio && <span className={styles.precio}>{precio}</span>}
        {rendimiento && <span className={styles.rend}>{rendimiento}</span>}
      </div>
    </motion.article>
  );
}

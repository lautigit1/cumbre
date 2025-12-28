"use client";

import styles from './StarRating.module.scss';
import { LucideIcon, Star } from 'lucide-react';

type Props = {
  valor: number;
  max?: number;
  icono?: LucideIcon;
};

export function StarRating({ valor, max = 5, icono: Icon = Star }: Props) {
  return (
    <div className={styles.wrap}>
      {Array.from({ length: max }).map((_, idx) => {
        const filled = idx < valor;
        return (
          <Icon
            key={idx}
            size={16}
            className={`${styles.star} ${filled ? styles.full : ''}`}
          />
        );
      })}
    </div>
  );
}

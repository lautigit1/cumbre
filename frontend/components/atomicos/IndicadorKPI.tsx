"use client";

import styles from './IndicadorKPI.module.scss';
import { LucideIcon } from 'lucide-react';

export type IndicadorKPIProps = {
  label: string;
  valor: string;
  delta?: string;
  icono?: LucideIcon;
  tono?: 'positivo' | 'negativo' | 'neutro';
  hint?: string;
};

export function IndicadorKPI({ label, valor, delta, icono: Icon, tono = 'neutro', hint }: IndicadorKPIProps) {
  return (
    <article className={`${styles.card} ${styles[tono]}`}>
      <div className={styles.top}>
        <p className={styles.label}>{label}</p>
        {Icon && <Icon size={18} />}
      </div>
      <h4 className={styles.valor}>{valor}</h4>
      {delta && <span className={styles.delta}>{delta}</span>}
      {hint && <p className={styles.hint}>{hint}</p>}
    </article>
  );
}

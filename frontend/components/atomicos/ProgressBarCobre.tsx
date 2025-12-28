"use client";

import styles from './ProgressBarCobre.module.scss';

type Props = {
  valor: number; // 0 - 100
  label?: string;
};

export function ProgressBarCobre({ valor, label }: Props) {
  const clamped = Math.min(100, Math.max(0, valor));
  return (
    <div className={styles.wrap}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
      <span className={styles.value}>{clamped}%</span>
    </div>
  );
}

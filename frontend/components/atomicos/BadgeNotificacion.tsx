"use client";

import styles from './BadgeNotificacion.module.scss';
import { ReactNode } from 'react';

type Props = {
  tipo?: 'SISTEMA' | 'MENSAJE' | 'INVERSION' | 'HITO' | 'POSTULACION' | string;
  unread?: boolean;
  conteo?: number | string;
  tono?: string;
  children?: ReactNode;
};

export function BadgeNotificacion({ tipo, unread = false, conteo, tono, children }: Props) {
  const label = children ?? tipo;
  return (
    <span className={`${styles.badge} ${unread ? styles.unread : ''}`}>
      {label}
      {conteo !== undefined && <strong>{String(conteo)}</strong>}
    </span>
  );
}

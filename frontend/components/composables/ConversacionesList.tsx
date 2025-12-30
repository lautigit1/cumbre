"use client";

import styles from './ConversacionesList.module.scss';

type Conversacion = {
  id: string;
  usuario: string;
  ultimo: string;
  noLeidos: number;
};

type Props = {
  conversaciones: Conversacion[];
  onSelect: (id: string) => void;
  activa?: string;
};

export function ConversacionesList({ conversaciones, onSelect, activa }: Props) {
  return (
    <div className={styles.list}>
      {conversaciones.map((c) => (
        <button
          key={c.id}
          className={`${styles.item} ${c.id === activa ? styles.active : ''}`}
          onClick={() => onSelect(c.id)}
        >
          <div className={styles.top}>
            <span className={styles.usuario}>{c.usuario}</span>
            {c.noLeidos > 0 && <span className={styles.badge}>{c.noLeidos}</span>}
          </div>
          <div className={styles.ultimo}>{c.ultimo}</div>
        </button>
      ))}
    </div>
  );
}

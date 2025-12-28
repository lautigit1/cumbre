"use client";

import styles from './ConversacionesList.module.scss';
import { motion } from 'framer-motion';

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
    <div className={styles.list}>
      {items.map((c) => (
        <motion.button
          key={c.id}
          className={styles.item}
          whileHover={{ y: -2 }}
          onClick={() => onSelect(c.id)}
        >
          <div className={styles.top}>
            <span className={styles.usuario}>{c.usuario}</span>
            {c.noLeidos > 0 && <span className={styles.badge}>{c.noLeidos}</span>}
          </div>
          <div className={styles.ultimo}>{c.ultimo}</div>
        </motion.button>
      ))}
    </div>
  );
}

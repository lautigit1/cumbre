"use client";

import styles from './TimelineEventos.module.scss';

export type Evento = {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  estado: 'programado' | 'hecho' | 'atrasado';
};

type Props = {
  items: Evento[];
};

export function TimelineEventos({ items }: Props) {
  return (
    <div className={styles.timeline}>
      {items.map((ev) => (
        <div key={ev.id} className={styles.item}>
          <div className={`${styles.dot} ${styles[ev.estado]}`} />
          <div>
            <p className={styles.fecha}>{ev.fecha}</p>
            <h4 className={styles.titulo}>{ev.titulo}</h4>
            <p className={styles.desc}>{ev.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

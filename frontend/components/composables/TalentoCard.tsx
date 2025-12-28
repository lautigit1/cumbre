"use client";

import styles from './TalentoCard.module.scss';
import { StarRating } from '@/components/atomicos/StarRating';
import { BotonCobre } from '@/components/atomicos/BotonCobre';

export type Talento = {
  id: string;
  nombre: string;
  rol: string;
  skills: string[];
  rating: number;
  propuestas: number;
};

type Props = {
  data: Talento;
  onVer?: (id: string) => void;
  onInvitar?: (id: string) => void;
};

export function TalentoCard({ data, onVer, onInvitar }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <p className={styles.nombre}>{data.nombre}</p>
          <span className={styles.rol}>{data.rol}</span>
        </div>
        <StarRating valor={data.rating} max={5} />
      </div>
      <div className={styles.skills}>
        {data.skills.map((s) => (
          <span key={s} className={styles.skill}>{s}</span>
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.propuestas}>{data.propuestas} propuestas</span>
        <div className={styles.actions}>
          <BotonCobre onClick={() => onVer?.(data.id)}>Perfil</BotonCobre>
          <BotonCobre onClick={() => onInvitar?.(data.id)}>Invitar</BotonCobre>
        </div>
      </div>
    </article>
  );
}

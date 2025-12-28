"use client";

import styles from './ReviewCard.module.scss';
import { StarRating } from '@/components/atomicos/StarRating';

export type Review = {
  id: string;
  autor: string;
  rol: string;
  comentario: string;
  rating: number;
  fecha: string;
};

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <p className={styles.autor}>{review.autor}</p>
          <span className={styles.rol}>{review.rol}</span>
        </div>
        <StarRating valor={review.rating} max={5} />
      </header>
      <p className={styles.comentario}>{review.comentario}</p>
      <span className={styles.fecha}>{review.fecha}</span>
    </article>
  );
}

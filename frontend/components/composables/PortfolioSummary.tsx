"use client";

import styles from './PortfolioSummary.module.scss';
import { TarjetaActivo } from '@/components/atomicos/TarjetaActivo';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';

export type ResumenPortafolio = {
  valorTotal: number;
  pnl: number;
  variacion: number;
  liquidez: number;
  moneda?: string;
};

export type Posicion = {
  titulo: string;
  descripcion: string;
  precio?: string;
  rendimiento?: string;
};

type Props = {
  resumen: ResumenPortafolio;
  posiciones: Posicion[];
};

export function PortfolioSummary({ resumen, posiciones }: Props) {
  const formato = new Intl.NumberFormat('es-ES', { style: 'currency', currency: resumen.moneda ?? 'USD' });
  const variacionTexto = `${resumen.variacion.toFixed(2)}%`;
  const pnlTexto = `${resumen.pnl >= 0 ? '+' : ''}${resumen.pnl.toFixed(2)}%`;

  return (
    <section className={styles.portfolio}>
      <header className={styles.header}>
        <div>
          <p className={styles.label}>Valor total</p>
          <h3>{formato.format(resumen.valorTotal)}</h3>
          <span className={styles.sub}>{`P&L ${pnlTexto} · Variación 24h ${variacionTexto}`}</span>
        </div>
        <BadgeNotificacion conteo={resumen.liquidez} tono="cobre">Liquidez</BadgeNotificacion>
      </header>
      <div className={styles.grid}>
        {posiciones.map((pos, idx) => (
          <TarjetaActivo
            key={`${pos.titulo}-${idx}`}
            titulo={pos.titulo}
            descripcion={pos.descripcion}
            precio={pos.precio}
            rendimiento={pos.rendimiento}
          />
        ))}
      </div>
    </section>
  );
}

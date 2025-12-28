'use client';

import styles from './PrecioChart.module.scss';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';
import React from 'react';

export type PuntoPrecio = {
  fecha: string;
  valor: number;
};

type Props = {
  titulo: string;
  puntos: PuntoPrecio[];
};

export function PrecioChart({ titulo, puntos }: Props) {
  const AreaChartAny = AreaChart as unknown as React.ComponentType<any>;
  return (
    <section className={styles.chartBox}>
      <header className={styles.header}>
        <div>
          <p className={styles.label}>Precio · 24h</p>
          <h3>{titulo}</h3>
        </div>
        <BadgeNotificacion conteo={puntos.at(-1)?.valor ?? 0} tono="cobre">
          Último
        </BadgeNotificacion>
      </header>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChartAny data={puntos} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cobreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e6b37e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e6b37e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="fecha" stroke="rgba(255,255,255,0.55)" tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.55)" tickLine={false} domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ background: '#161616', border: '1px solid rgba(230,179,126,0.4)' }} />
            <Area type="monotone" dataKey="valor" stroke="#e6b37e" fill="url(#cobreGradient)" strokeWidth={2} />
          </AreaChartAny>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

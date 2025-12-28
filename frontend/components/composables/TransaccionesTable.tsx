"use client";

import styles from './TransaccionesTable.module.scss';
import { ProgressBarCobre } from '@/components/atomicos/ProgressBarCobre';

export type Transaccion = {
  id: string;
  concepto: string;
  tipo: 'compra' | 'venta' | 'deposito' | 'retiro';
  monto: string;
  fecha: string;
  estado: 'pendiente' | 'ejecutada' | 'fallida';
  avance?: number;
};

type Props = {
  data: Transaccion[];
};

const estadoEtiqueta: Record<Transaccion['estado'], string> = {
  pendiente: 'Pendiente',
  ejecutada: 'Ejecutada',
  fallida: 'Fallida',
};

export function TransaccionesTable({ data }: Props) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.header}>
        <span>Concepto</span>
        <span>Tipo</span>
        <span>Monto</span>
        <span>Fecha</span>
        <span>Estado</span>
        <span>Avance</span>
      </div>
      <div className={styles.body}>
        {data.map((t) => (
          <div key={t.id} className={styles.row}>
            <span className={styles.concepto}>{t.concepto}</span>
            <span className={styles.tipo}>{t.tipo}</span>
            <span className={styles.monto}>{t.monto}</span>
            <span>{t.fecha}</span>
            <span className={`${styles.badge} ${styles[t.estado]}`}>{estadoEtiqueta[t.estado]}</span>
            <div>{t.avance !== undefined ? <ProgressBarCobre valor={t.avance} /> : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

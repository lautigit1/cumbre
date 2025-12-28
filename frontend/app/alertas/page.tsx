"use client";

import React, { useState } from 'react';
import secciones from '@/styles/sections.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { Skeleton } from '@/components/atomicos/Skeleton';
import { servicios } from '@/services';
import { useServicio } from '@/lib/useServicio';

type Alerta = {
  id: string;
  ticker: string;
  umbral: number;
  direccion: 'arriba' | 'abajo';
  creada?: string;
};

export default function AlertasPage() {
  const { data: alertas, loading, error, refetch } = useServicio<Alerta[]>(
    () => servicios.alertasPrecio() as unknown as Promise<Alerta[]>,
    [],
  );

  const [ticker, setTicker] = useState('');
  const [umbral, setUmbral] = useState<number>(0);
  const [direccion, setDireccion] = useState<'arriba' | 'abajo'>('arriba');
  const [creando, setCreando] = useState(false);

  async function crearAlerta() {
    setCreando(true);
    try {
      await servicios.crearAlertaPrecio({ ticker, umbral, direccion });
      setTicker('');
      setUmbral(0);
      setDireccion('arriba');
      await refetch();
    } catch (e) {
      // noop: error surfaced below
    } finally {
      setCreando(false);
    }
  }

  async function borrarAlerta(id: string) {
    await servicios.borrarAlertaPrecio(id);
    await refetch();
  }

  return (
    <div className={secciones.page}>
      <HeaderGlass />

      <div className={secciones.headerRow}>
        <h2>Alertas de Precio</h2>
        <span className={secciones.muted}>Crea y gestiona tus alertas</span>
      </div>

      <div className={`${secciones.grid} ${secciones.twoCols}`}>
        <div className={secciones.card}>
          <h3>Nueva alerta</h3>
          <div className={secciones.formGrid}>
            <label>
              <span>Ticker</span>
              <InputSoberano
                placeholder="p. ej. BTC, AAPL"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              />
            </label>
            <label>
              <span>Umbral</span>
              <InputSoberano
                type="number"
                value={umbral}
                onChange={(e) => setUmbral(Number(e.target.value))}
              />
            </label>
            <div className={secciones.pillRow}>
              <BotonCobre onClick={() => setDireccion('arriba')}>Arriba</BotonCobre>
              <BotonCobre onClick={() => setDireccion('abajo')}>Abajo</BotonCobre>
              <span className={secciones.muted}>Dirección: {direccion}</span>
            </div>
            <div>
              <BotonCobre type="button" onClick={crearAlerta}>
                {creando ? 'Creando…' : 'Crear alerta'}
              </BotonCobre>
            </div>
          </div>
          {error && <div className={secciones.muted}>Error: {error}</div>}
        </div>

        <div className={secciones.card}>
          <h3>Mis alertas</h3>
          {loading && (
            <div className={secciones.grid}>
              <Skeleton height={16} />
              <Skeleton height={16} />
              <Skeleton height={16} />
            </div>
          )}
          {!loading && alertas && alertas.length === 0 && (
            <div className={secciones.muted}>Aún no tienes alertas</div>
          )}
          {!loading && alertas && alertas.length > 0 && (
            <div className={secciones.grid}>
              {alertas.map((a) => (
                <div key={a.id} className={secciones.pillRow}>
                  <strong>{a.ticker}</strong>
                  <span className={secciones.muted}>
                    {a.direccion === 'arriba' ? '≥' : '≤'} {a.umbral}
                  </span>
                  <BotonCobre onClick={() => borrarAlerta(a.id)}>Borrar</BotonCobre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

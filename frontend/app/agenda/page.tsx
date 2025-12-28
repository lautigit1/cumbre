"use client";

import React, { useState } from 'react';
import secciones from '@/styles/sections.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { Skeleton } from '@/components/atomicos/Skeleton';
import { servicios } from '@/services';
import { useServicio } from '@/lib/useServicio';

type Evento = {
  id: string;
  titulo: string;
  fecha: string;
  descripcion?: string;
  estado?: string;
};

export default function AgendaPage() {
  const { data: eventos, loading, error, refetch } = useServicio<Evento[]>(
    () => servicios.agendaEventos() as unknown as Promise<Evento[]>,
    [],
  );

  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creando, setCreando] = useState(false);

  async function crearEvento() {
    if (!titulo || !fecha) return;
    setCreando(true);
    try {
      await servicios.crearEvento({ titulo, fecha, descripcion });
      setTitulo('');
      setFecha('');
      setDescripcion('');
      await refetch();
    } catch (e) {
      // error surfaced below
    } finally {
      setCreando(false);
    }
  }

  async function cancelar(id: string) {
    await servicios.cancelarEvento(id);
    await refetch();
  }

  return (
    <div className={secciones.page}>
      <HeaderGlass />
      <div className={secciones.headerRow}>
        <h2>Agenda</h2>
        <span className={secciones.muted}>Eventos y recordatorios</span>
      </div>

      <div className={`${secciones.grid} ${secciones.twoCols}`}>
        <div className={secciones.card}>
          <h3>Nuevo evento</h3>
          <div className={secciones.formGrid}>
            <label>
              <span>Título</span>
              <InputSoberano
                placeholder="ej. Reunión con equipo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>
            <label>
              <span>Fecha</span>
              <InputSoberano
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </label>
            <label>
              <span>Descripción</span>
              <textarea
                style={{ width: '100%', minHeight: 80 }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Opcional"
              />
            </label>
            <div>
              <BotonCobre onClick={crearEvento}>{creando ? 'Creando…' : 'Crear evento'}</BotonCobre>
            </div>
          </div>
          {error && <div className={secciones.muted}>Error: {error}</div>}
        </div>

        <div className={secciones.card}>
          <h3>Próximos eventos</h3>
          {loading && (
            <div className={secciones.grid}>
              <Skeleton height={16} />
              <Skeleton height={16} />
              <Skeleton height={16} />
            </div>
          )}
          {!loading && eventos && eventos.length === 0 && (
            <div className={secciones.muted}>No hay eventos programados</div>
          )}
          {!loading && eventos && eventos.length > 0 && (
            <div className={secciones.grid}>
              {eventos.map((ev) => (
                <div key={ev.id} className={secciones.pillRow}>
                  <strong>{ev.titulo}</strong>
                  <span className={secciones.muted}>{new Date(ev.fecha).toLocaleString()}</span>
                  {ev.estado && <span className={secciones.muted}>{ev.estado}</span>}
                  <BotonCobre onClick={() => cancelar(ev.id)}>Cancelar</BotonCobre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

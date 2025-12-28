"use client";

import React, { useState } from 'react';
import secciones from '@/styles/sections.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { Skeleton } from '@/components/atomicos/Skeleton';
import { servicios } from '@/services';
import { useServicio } from '@/lib/useServicio';

type Documento = {
  id: string;
  nombre: string;
  creado?: string;
};

export default function DocumentosPage() {
  const { data: documentos, loading, error, refetch } = useServicio<Documento[]>(
    () => servicios.documentos() as unknown as Promise<Documento[]>,
    [],
  );

  const [nombre, setNombre] = useState('');
  const [contenido, setContenido] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  async function subir() {
    if (!nombre || !contenido) return;
    setSubiendo(true);
    try {
      await servicios.subirDocumento(nombre, contenido);
      setNombre('');
      setContenido('');
      await refetch();
    } catch (e) {
      // error surfaced below
    } finally {
      setSubiendo(false);
    }
  }

  async function eliminar(id: string) {
    await servicios.eliminarDocumento(id);
    await refetch();
  }

  return (
    <div className={secciones.page}>
      <HeaderGlass />
      <div className={secciones.headerRow}>
        <h2>Documentos</h2>
        <span className={secciones.muted}>Sube y gestiona tus archivos</span>
      </div>

      <div className={`${secciones.grid} ${secciones.twoCols}`}>
        <div className={secciones.card}>
          <h3>Nuevo documento</h3>
          <div className={secciones.formGrid}>
            <label>
              <span>Nombre</span>
              <InputSoberano
                placeholder="ej. contrato.pdf"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label>
              <span>Contenido</span>
              <textarea
                style={{ width: '100%', minHeight: 120 }}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Pegá texto o JSON para pruebas"
              />
            </label>
            <div>
              <BotonCobre onClick={subir}>{subiendo ? 'Subiendo…' : 'Subir documento'}</BotonCobre>
            </div>
          </div>
          {error && <div className={secciones.muted}>Error: {error}</div>}
        </div>

        <div className={secciones.card}>
          <h3>Mis documentos</h3>
          {loading && (
            <div className={secciones.grid}>
              <Skeleton height={16} />
              <Skeleton height={16} />
              <Skeleton height={16} />
            </div>
          )}
          {!loading && documentos && documentos.length === 0 && (
            <div className={secciones.muted}>Aún no hay documentos</div>
          )}
          {!loading && documentos && documentos.length > 0 && (
            <div className={secciones.grid}>
              {documentos.map((d) => (
                <div key={d.id} className={secciones.pillRow}>
                  <strong>{d.nombre}</strong>
                  {d.creado && <span className={secciones.muted}>{new Date(d.creado).toLocaleString()}</span>}
                  <BotonCobre onClick={() => eliminar(d.id)}>Eliminar</BotonCobre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

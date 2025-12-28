'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/sections.module.scss';
import { ConversacionesList } from '@/components/composables/ConversacionesList';
import { ChatWindow, Mensaje } from '@/components/composables/ChatWindow';
import { DrawerNotificaciones } from '@/components/composables/DrawerNotificaciones';
import { ChipFiltro } from '@/components/atomicos/ChipFiltro';
import { servicios } from '@/services';

const conversacionesMock = [
  { id: '1', nombre: 'Equipo Helios', ultimoMensaje: 'Listo el informe', hora: '12:20', activo: true },
  { id: '2', nombre: 'Astrid Vega', ultimoMensaje: '¿Revisaste el PR?', hora: '11:40' },
  { id: '3', nombre: 'Core Cumbre', ultimoMensaje: 'Sprint demo viernes', hora: '09:10' },
];

const mensajesBase: Record<string, Mensaje[]> = {
  '1': [
    { id: 'm1', autor: 'otro', contenido: 'Hola, iniciemos la revisión', leido: true },
    { id: 'm2', autor: 'yo', contenido: 'Voy en camino', leido: true },
  ],
  '2': [
    { id: 'm3', autor: 'otro', contenido: 'Nuevo endpoint listo', leido: false },
  ],
  '3': [],
};

const bandeja = [
  { id: 'n1', titulo: 'Recordatorio', mensaje: 'Demo en 2h', tipo: 'sistema', leida: false },
  { id: 'n2', titulo: 'Entrega', mensaje: 'Se subió el PR de sockets', tipo: 'dev', leida: true },
];

export default function MensajesPage() {
  const [activa, setActiva] = useState('1');
  const [mensajes, setMensajes] = useState<Record<string, Mensaje[]>>(mensajesBase);
  const [filtro, setFiltro] = useState<'todas' | 'no-leidas'>('todas');

  const lista = useMemo(
    () =>
      conversacionesMock
        .filter((c) => (filtro === 'no-leidas' ? (mensajes[c.id]?.some((m) => m.leido === false) ?? false) : true))
        .map((c) => ({ ...c, activo: c.id === activa })),
    [activa, filtro, mensajes],
  );

  const enviar = (texto: string) => {
    setMensajes((prev) => ({
      ...prev,
      [activa]: [...(prev[activa] ?? []), { id: crypto.randomUUID(), autor: 'yo', contenido: texto, leido: false }],
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await servicios.mensajesPorConversacion(activa);
        const mapped: Mensaje[] = res.map((m) => ({ id: m.id, autor: 'otro', contenido: m.contenido, leido: m.leido }));
        setMensajes((prev) => ({ ...prev, [activa]: mapped }));
      } catch {
        // mantiene mock si falla
      }
    })();
  }, [activa]);

  return (
    <main className={styles.page}>
      <header className={styles.headerRow}>
        <div>
          <p>Coordina en tiempo real</p>
          <h1>Mensajes</h1>
        </div>
        <div className={styles.pillRow}>
          <ChipFiltro label="Todas" activo={filtro === 'todas'} onClick={() => setFiltro('todas')} />
          <ChipFiltro label="No leídas" activo={filtro === 'no-leidas'} onClick={() => setFiltro('no-leidas')} />
        </div>
      </header>
      <div className={`${styles.grid} ${styles.twoCols}`}>
        <div className={styles.card}>
          <ConversacionesList conversaciones={lista} onSelect={setActiva} />
        </div>
        <div className={styles.card}>
          <ChatWindow mensajes={mensajes[activa] ?? []} onSend={enviar} />
        </div>
      </div>
      <DrawerNotificaciones items={bandeja} titulo="Panel rápido" />
    </main>
  );
}

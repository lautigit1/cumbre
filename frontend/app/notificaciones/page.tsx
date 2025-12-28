'use client';

import styles from '@/styles/sections.module.scss';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { ChipFiltro } from '@/components/atomicos/ChipFiltro';
import { useEffect, useState } from 'react';
import { servicios } from '@/services';

const lista = [
  { id: '1', titulo: 'Precio objetivo', detalle: 'ETH cruzó $3,2K', leida: false, tipo: 'alerta' },
  { id: '2', titulo: 'Nuevo review', detalle: 'Mara dejó feedback 5★', leida: true, tipo: 'review' },
  { id: '3', titulo: 'Deposito', detalle: 'Se acreditaron $5,000', leida: true, tipo: 'finanzas' },
  { id: '4', titulo: 'Talento guardado', detalle: 'Nova Quinn disponible', leida: false, tipo: 'talento' },
];

export default function NotificacionesPage() {
  const [filtro, setFiltro] = useState<'todas' | 'pendientes'>('todas');
  const [items, setItems] = useState(lista);
  useEffect(() => {
    (async () => {
      try {
        const res = await servicios.obtenerNotificaciones();
        // normalizar a estructura local
        const mapped = res.map((n) => ({ id: n.id, titulo: n.titulo, detalle: n.mensaje, leida: n.leida, tipo: 'sistema' }));
        setItems(mapped);
      } catch {
        // mantener mock si falla
      }
    })();
  }, []);
  const itemsFiltrados = filtro === 'todas' ? items : items.filter((i) => !i.leida);

  return (
    <main className={styles.page}>
      <header className={styles.headerRow}>
        <div>
          <p>Eventos del sistema</p>
          <h1>Notificaciones</h1>
        </div>
        <div className={styles.pillRow}>
          <ChipFiltro label="Todas" activo={filtro === 'todas'} onClick={() => setFiltro('todas')} />
          <ChipFiltro label="Pendientes" activo={filtro === 'pendientes'} onClick={() => setFiltro('pendientes')} />
          <BotonCobre onClick={() => console.log('marcar todas')}>Marcar todas</BotonCobre>
        </div>
      </header>
      <div className={styles.grid}>
        {itemsFiltrados.map((item) => (
          <div key={item.id} className={styles.card}>
            <BadgeNotificacion conteo={item.leida ? 0 : 1} tono={item.leida ? 'opaco' : 'cobre'}>{item.titulo}</BadgeNotificacion>
            <p>{item.detalle}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

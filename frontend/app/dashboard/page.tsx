'use client';

import styles from '@/styles/dashboard.module.scss';
import pageStyles from '@/styles/sections.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';
import { DrawerNotificaciones } from '@/components/composables/DrawerNotificaciones';
import { PortfolioSummary } from '@/components/composables/PortfolioSummary';
import { PrecioChart } from '@/components/composables/PrecioChart';
import { TarjetaActivo } from '@/components/atomicos/TarjetaActivo';
import { IndicadorKPI } from '@/components/atomicos/IndicadorKPI';
import { TransaccionesTable } from '@/components/composables/TransaccionesTable';
import { TimelineEventos } from '@/components/composables/TimelineEventos';
import { ReviewCard } from '@/components/composables/ReviewCard';
import { Star } from 'lucide-react';
import { servicios } from '@/services';
import { useEffect, useState } from 'react';

const posicionesMock = [
  { titulo: 'Nave Ares', descripcion: 'IA · Series B', precio: '$120.4K', rendimiento: '+8.2%' },
  { titulo: 'Cobre Labs', descripcion: 'Infra · Seed', precio: '$82.0K', rendimiento: '+3.1%' },
  { titulo: 'Constelación', descripcion: 'Data · Serie A', precio: '$64.7K', rendimiento: '-1.2%' },
];

const puntos = [
  { fecha: '08:00', valor: 102 },
  { fecha: '10:00', valor: 108 },
  { fecha: '12:00', valor: 110 },
  { fecha: '14:00', valor: 106 },
  { fecha: '16:00', valor: 113 },
  { fecha: '18:00', valor: 117 },
];

const notificaciones = [
  { id: '1', titulo: 'Alerta de precio', mensaje: 'BTC superó $45K', tipo: 'alerta', leida: false },
  { id: '2', titulo: 'Nuevo talento', mensaje: 'Perfil Solana Dev disponible', tipo: 'talento', leida: true },
];

const transacciones = [
  { id: 't1', concepto: 'Compra ARES', tipo: 'compra', monto: '$12,400', fecha: 'Hoy 12:10', estado: 'ejecutada', avance: 100 },
  { id: 't2', concepto: 'Retiro USDC', tipo: 'retiro', monto: '$4,000', fecha: 'Hoy 10:05', estado: 'pendiente', avance: 45 },
  { id: 't3', concepto: 'Venta COBRE', tipo: 'venta', monto: '$2,300', fecha: 'Ayer', estado: 'fallida', avance: 10 },
];

const eventos = [
  { id: 'e1', titulo: 'Comité de riesgo', fecha: 'Hoy · 15:00', descripcion: 'Revisión semanal de VaR', estado: 'programado' },
  { id: 'e2', titulo: 'Demo sprint', fecha: 'Vie · 11:00', descripcion: 'Mostrar nuevas pantallas de mensajes', estado: 'hecho' },
  { id: 'e3', titulo: 'Entrega talento', fecha: 'Lun · 09:00', descripcion: 'Onboarding de Astrid Vega', estado: 'atrasado' },
];

const reviews = [
  { id: 'r1', autor: 'Mara Orion', rol: 'Product Lead', comentario: 'Respuestas rápidas y claridad en los KPIs.', rating: 5, fecha: 'Hace 2 días' },
  { id: 'r2', autor: 'Diego Sol', rol: 'Backend', comentario: 'Buen handoff de requisitos y API.', rating: 4, fecha: 'Hace 1 semana' },
];

export default function DashboardPage() {
  const [resumenApi, setResumenApi] = useState<{ valorTotal: number; pnl: number; variacion: number; liquidez: number } | null>(null);
  const [activos, setActivos] = useState<typeof posicionesMock>(posicionesMock);
  const [serie, setSerie] = useState<typeof puntos>(puntos);

  useEffect(() => {
    (async () => {
      try {
        const resumen = await servicios.resumenPortafolio();
        setResumenApi(resumen);
      } catch {}
      try {
        const destacados = await servicios.activosDestacados();
        setActivos(
          destacados.map((a: any) => ({ titulo: a.nombre, descripcion: a.ticker, precio: `$${a.precio ?? '-'}`, rendimiento: `${a.rendimiento ?? 0}%` })),
        );
      } catch {}
      try {
        const hist = await servicios.historicoPrecios('COBRE');
        setSerie(hist.map((h: any) => ({ fecha: h.fecha, valor: h.valor })));
      } catch {}
    })();
  }, []);
  return (
    <main className={pageStyles.page}>
      <HeaderGlass usuario="Lautaro" rol="Commander" />
      <div className={styles.shell}>
        <Sidebar onSelect={() => undefined} activo="dashboard" />
        <section className={styles.main}>
          <div className={styles.kpiGrid}>
            <IndicadorKPI label="Liquidez disponible" valor="$128.4K" delta="+4.1%" tono="positivo" hint="Comparado a ayer" />
            <IndicadorKPI label="Alertas activas" valor="9" delta="2 nuevas" tono="neutro" />
            <IndicadorKPI label="Tickets abiertos" valor="3" delta="-1 hoy" tono="positivo" />
            <IndicadorKPI label="Drawdown" valor="-2.1%" delta="Últimos 7d" tono="negativo" />
          </div>
          <PortfolioSummary
            resumen={{ valorTotal: resumenApi?.valorTotal ?? 426000, pnl: resumenApi?.pnl ?? 5.4, variacion: resumenApi?.variacion ?? 1.8, liquidez: resumenApi?.liquidez ?? 3, moneda: 'USD' }}
            posiciones={activos}
          />
          <div className={styles.widgets}>
            <PrecioChart titulo="Índice Cobre" puntos={serie} />
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>
                <h3>Activos sugeridos</h3>
              </div>
              <div className={styles.badges}>
                <TarjetaActivo titulo="Cumbre One" descripcion="Fondo multi sector" precio="$12.3" rendimiento="+2.4%" icono={Star} />
                <TarjetaActivo titulo="Helios" descripcion="Energía limpia" precio="$8.1" rendimiento="+5.8%" icono={Star} />
              </div>
            </div>
            <DrawerNotificaciones items={notificaciones} titulo="Bandeja de alertas" />
          </div>
          <div className={styles.split}>
            <TransaccionesTable data={transacciones} />
            <TimelineEventos items={eventos} />
          </div>
          <div className={styles.widgets}>
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

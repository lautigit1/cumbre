'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';
import { 
  Bell, CheckCircle, AlertTriangle, Info, DollarSign, 
  Star, TrendingUp, Users, Filter, X, Check, Trash2
} from 'lucide-react';
import styles from '@/styles/notificaciones.module.scss';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'alerta' | 'info' | 'exito' | 'advertencia';
  leida: boolean;
  fecha: string;
  categoria: 'mercado' | 'sistema' | 'talento' | 'finanzas';
}

export default function NotificacionesPage() {
  const [mounted, setMounted] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      titulo: 'Precio Objetivo Alcanzado',
      mensaje: 'ETH ha cruzado el umbral de $3,200 que configuraste',
      tipo: 'alerta',
      leida: false,
      fecha: 'Hace 5 min',
      categoria: 'mercado'
    },
    {
      id: '2',
      titulo: 'Nuevo Review Recibido',
      mensaje: 'Mara Quantum dejó un feedback de 5 estrellas en tu proyecto',
      tipo: 'exito',
      leida: false,
      fecha: 'Hace 1 hora',
      categoria: 'talento'
    },
    {
      id: '3',
      titulo: 'Depósito Acreditado',
      mensaje: 'Se acreditaron $5,000 en tu cuenta desde Banco Nación',
      tipo: 'exito',
      leida: true,
      fecha: 'Hace 3 horas',
      categoria: 'finanzas'
    },
    {
      id: '4',
      titulo: 'Talento Guardado Disponible',
      mensaje: 'Nova Quinn ahora está disponible para nuevos proyectos',
      tipo: 'info',
      leida: false,
      fecha: 'Ayer',
      categoria: 'talento'
    },
    {
      id: '5',
      titulo: 'Volatilidad Alta Detectada',
      mensaje: 'El activo CUMBRE ONE muestra volatilidad del 15% en las últimas 24h',
      tipo: 'advertencia',
      leida: true,
      fecha: 'Ayer',
      categoria: 'mercado'
    },
    {
      id: '6',
      titulo: 'Actualización del Sistema',
      mensaje: 'Nueva versión 2.4.1 disponible con mejoras de seguridad',
      tipo: 'info',
      leida: true,
      fecha: '2 días',
      categoria: 'sistema'
    }
  ]);

  const [filtroTipo, setFiltroTipo] = useState<'todas' | 'no-leidas'>('todas');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const tiposNotificacion = [
    { value: 'alerta', label: 'Alerta', icon: AlertTriangle, color: '#ff6b6b' },
    { value: 'exito', label: 'Éxito', icon: CheckCircle, color: '#26de81' },
    { value: 'advertencia', label: 'Advertencia', icon: Bell, color: '#ffa502' },
    { value: 'info', label: 'Info', icon: Info, color: '#665ce7' }
  ];

  const categorias = [
    { value: 'todas', label: 'Todas', icon: Bell },
    { value: 'mercado', label: 'Mercado', icon: TrendingUp },
    { value: 'finanzas', label: 'Finanzas', icon: DollarSign },
    { value: 'talento', label: 'Talento', icon: Users },
    { value: 'sistema', label: 'Sistema', icon: Info }
  ];

  const notificacionesFiltradas = notificaciones.filter(n => {
    const matchTipo = filtroTipo === 'todas' || !n.leida;
    const matchCategoria = filtroCategoria === 'todas' || n.categoria === filtroCategoria;
    return matchTipo && matchCategoria;
  });

  const stats = {
    total: notificaciones.length,
    noLeidas: notificaciones.filter(n => !n.leida).length,
    alertas: notificaciones.filter(n => n.tipo === 'alerta').length,
    leidas: notificaciones.filter(n => n.leida).length
  };

  const handleMarcarLeida = (id: string) => {
    setNotificaciones(prev => prev.map(n =>
      n.id === id ? { ...n, leida: true } : n
    ));
  };

  const handleMarcarTodasLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const handleEliminar = (id: string) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  const handleEliminarLeidas = () => {
    setNotificaciones(prev => prev.filter(n => !n.leida));
  };

  const getIconoTipo = (tipo: string) => {
    const tipoData = tiposNotificacion.find(t => t.value === tipo);
    const Icon = tipoData?.icon || Bell;
    return { Icon, color: tipoData?.color || '#E6B37E' };
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={styles.page}><HeaderGlass /><div className={styles.container}><Sidebar /></div></div>;

  return (
    <div className={styles.page}>
      <HeaderGlass />
      <div className={styles.container}>
        <Sidebar />
        <motion.div className={styles.mainContent} initial={false} animate={{ opacity: 1 }}>
          {/* Hero */}
          <div className={styles.heroSection}>
            <div>
              <h1 className={styles.pageTitle}>Centro de Notificaciones</h1>
              <p className={styles.pageSubtitle}>Mantente al día con tus alertas y eventos</p>
            </div>
            <div className={styles.heroActions}>
              <button className={styles.markAllBtn} onClick={handleMarcarTodasLeidas}>
                <Check size={20} />
                Marcar Todas Leídas
              </button>
              <button className={styles.deleteReadBtn} onClick={handleEliminarLeidas}>
                <Trash2 size={20} />
                Eliminar Leídas
              </button>
            </div>
          </div>

          {/* Stats */}
          <motion.div 
            className={styles.statsGrid}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            {[
              { label: 'Total', value: stats.total, icon: Bell, color: 'rgba(230, 179, 126, 0.15)' },
              { label: 'No Leídas', value: stats.noLeidas, icon: AlertTriangle, color: 'rgba(255, 107, 107, 0.15)' },
              { label: 'Alertas', value: stats.alertas, icon: Bell, color: 'rgba(255, 165, 2, 0.15)' },
              { label: 'Leídas', value: stats.leidas, icon: CheckCircle, color: 'rgba(38, 222, 129, 0.15)' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className={styles.statIcon} style={{ background: stat.color }}>
                    <Icon size={24} style={{ color: '#E6B37E' }} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>{stat.label}</div>
                    <div className={styles.statValue}>{stat.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Filtros */}
          <motion.div 
            className={styles.controls}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.filters}>
              <button
                className={`${styles.filterBtn} ${filtroTipo === 'todas' ? styles.active : ''}`}
                onClick={() => setFiltroTipo('todas')}
              >
                Todas
              </button>
              <button
                className={`${styles.filterBtn} ${filtroTipo === 'no-leidas' ? styles.active : ''}`}
                onClick={() => setFiltroTipo('no-leidas')}
              >
                No Leídas
              </button>
            </div>

            <div className={styles.categoriaFilters}>
              {categorias.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    className={`${styles.categoriaBtn} ${filtroCategoria === cat.value ? styles.active : ''}`}
                    onClick={() => setFiltroCategoria(cat.value)}
                  >
                    <Icon size={16} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Lista de Notificaciones */}
          <div className={styles.notificacionesList}>
            {notificacionesFiltradas.map((notif, i) => {
              const { Icon, color } = getIconoTipo(notif.tipo);
              return (
                <motion.div
                  key={notif.id}
                  className={`${styles.notificacionCard} ${!notif.leida ? styles.noLeida : ''}`}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.notificacionIcon} style={{ background: `${color}20` }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div className={styles.notificacionContent}>
                    <div className={styles.notificacionHeader}>
                      <h3>{notif.titulo}</h3>
                      <span className={styles.fecha}>{notif.fecha}</span>
                    </div>
                    <p>{notif.mensaje}</p>
                    <div className={styles.notificacionFooter}>
                      <span className={`${styles.tipoBadge} ${styles[notif.tipo]}`}>
                        {tiposNotificacion.find(t => t.value === notif.tipo)?.label}
                      </span>
                      <span className={styles.categoriaBadge}>{notif.categoria}</span>
                    </div>
                  </div>
                  <div className={styles.notificacionActions}>
                    {!notif.leida && (
                      <button 
                        className={styles.markReadBtn}
                        onClick={() => handleMarcarLeida(notif.id)}
                        title="Marcar como leída"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => handleEliminar(notif.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {!notif.leida && <div className={styles.unreadIndicator} />}
                </motion.div>
              );
            })}
          </div>

          {notificacionesFiltradas.length === 0 && (
            <div className={styles.emptyState}>
              <Bell size={64} style={{ opacity: 0.3 }} />
              <p>No hay notificaciones para mostrar</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

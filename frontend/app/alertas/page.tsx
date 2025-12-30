'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell, Plus, TrendingUp, TrendingDown, X, Check,
  AlertTriangle, Filter, Search, Calendar, Clock
} from 'lucide-react';
import styles from '@/styles/alertas.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';

type Alerta = {
  id: string;
  tipo: 'precio' | 'volumen' | 'evento';
  activo: string;
  condicion: string;
  valor: number;
  estado: 'activa' | 'disparada' | 'pausada';
  creada: string;
  ultimaEjecucion?: string;
};

export default function AlertasPage() {
  const [mounted, setMounted] = useState(false);
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'precio',
      activo: 'CUMBRE ONE',
      condicion: 'mayor a',
      valor: 45000,
      estado: 'activa',
      creada: '2024-12-28',
    },
    {
      id: '2',
      tipo: 'volumen',
      activo: 'HELIOS',
      condicion: 'supera',
      valor: 100000,
      estado: 'disparada',
      creada: '2024-12-27',
      ultimaEjecucion: '2024-12-28 14:30',
    },
    {
      id: '3',
      tipo: 'evento',
      activo: 'ARES',
      condicion: 'nueva emisión',
      valor: 0,
      estado: 'activa',
      creada: '2024-12-26',
    },
  ]);

  const [showCreate, setShowCreate] = useState(false);
  const [filtro, setFiltro] = useState<'todas' | 'activas' | 'disparadas'>('todas');
  const [busqueda, setBusqueda] = useState('');

  const [nuevaAlerta, setNuevaAlerta] = useState({
    tipo: 'precio' as 'precio' | 'volumen' | 'evento',
    activo: '',
    condicion: 'mayor a',
    valor: 0,
  });

  const handleCrearAlerta = () => {
    const alerta: Alerta = {
      id: Date.now().toString(),
      ...nuevaAlerta,
      estado: 'activa',
      creada: new Date().toISOString().split('T')[0],
    };
    setAlertas([...alertas, alerta]);
    setShowCreate(false);
    setNuevaAlerta({ tipo: 'precio', activo: '', condicion: 'mayor a', valor: 0 });
  };

  const handleEliminarAlerta = (id: string) => {
    setAlertas(alertas.filter(a => a.id !== id));
  };

  const handleToggleEstado = (id: string) => {
    setAlertas(alertas.map(a => 
      a.id === id 
        ? { ...a, estado: a.estado === 'pausada' ? 'activa' : 'pausada' } 
        : a
    ));
  };

  const alertasFiltradas = alertas.filter(a => {
    const matchFiltro = filtro === 'todas' || a.estado === (filtro === 'activas' ? 'activa' : 'disparada');
    const matchBusqueda = a.activo.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const stats = {
    total: alertas.length,
    activas: alertas.filter(a => a.estado === 'activa').length,
    disparadas: alertas.filter(a => a.estado === 'disparada').length,
    pausadas: alertas.filter(a => a.estado === 'pausada').length,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={styles.page}><HeaderGlass /><div className={styles.container}><Sidebar /></div></div>;

  return (
    <main className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.container}>
        <Sidebar />
        
        <section className={styles.mainContent}>
          {/* Header con Stats */}
          <div className={styles.heroSection}>
            <div>
              <h1 className={styles.pageTitle}>Sistema de Alertas</h1>
              <p className={styles.pageSubtitle}>Monitorea tus activos y recibe notificaciones en tiempo real</p>
            </div>

            <button className={styles.createBtn} onClick={() => setShowCreate(true)}>
              <Plus size={20} />
              Nueva Alerta
            </button>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <motion.div className={styles.statCard} initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className={styles.statIcon} style={{ background: 'rgba(230, 179, 126, 0.15)', color: '#E6B37E' }}>
                <Bell size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Total</p>
                <p className={styles.statValue}>{stats.total}</p>
              </div>
            </motion.div>

            <motion.div className={styles.statCard} initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className={styles.statIcon} style={{ background: 'rgba(38, 222, 129, 0.15)', color: '#26de81' }}>
                <Check size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Activas</p>
                <p className={styles.statValue}>{stats.activas}</p>
              </div>
            </motion.div>

            <motion.div className={styles.statCard} initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className={styles.statIcon} style={{ background: 'rgba(255, 165, 2, 0.15)', color: '#ffa502' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Disparadas</p>
                <p className={styles.statValue}>{stats.disparadas}</p>
              </div>
            </motion.div>

            <motion.div className={styles.statCard} initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className={styles.statIcon} style={{ background: 'rgba(102, 92, 231, 0.15)', color: '#665ce7' }}>
                <Clock size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Pausadas</p>
                <p className={styles.statValue}>{stats.pausadas}</p>
              </div>
            </motion.div>
          </div>

          {/* Filtros y Búsqueda */}
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar por activo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className={styles.filterButtons}>
              <button 
                className={filtro === 'todas' ? styles.active : ''}
                onClick={() => setFiltro('todas')}
              >
                Todas
              </button>
              <button 
                className={filtro === 'activas' ? styles.active : ''}
                onClick={() => setFiltro('activas')}
              >
                Activas
              </button>
              <button 
                className={filtro === 'disparadas' ? styles.active : ''}
                onClick={() => setFiltro('disparadas')}
              >
                Disparadas
              </button>
            </div>
          </div>

          {/* Lista de Alertas */}
          <div className={styles.section}>
            <div className={styles.alertasList}>
              {alertasFiltradas.map((alerta, i) => (
                <motion.div
                  key={alerta.id}
                  className={`${styles.alertaCard} ${styles[alerta.estado]}`}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.alertaHeader}>
                    <div className={styles.alertaIcon} style={{
                      background: alerta.tipo === 'precio' ? 'rgba(230, 179, 126, 0.15)' :
                                 alerta.tipo === 'volumen' ? 'rgba(38, 222, 129, 0.15)' :
                                 'rgba(102, 92, 231, 0.15)',
                      color: alerta.tipo === 'precio' ? '#E6B37E' :
                            alerta.tipo === 'volumen' ? '#26de81' :
                            '#665ce7'
                    }}>
                      {alerta.tipo === 'precio' && <TrendingUp size={20} />}
                      {alerta.tipo === 'volumen' && <TrendingDown size={20} />}
                      {alerta.tipo === 'evento' && <Bell size={20} />}
                    </div>

                    <div className={styles.alertaInfo}>
                      <h3>{alerta.activo}</h3>
                      <p>{alerta.tipo} {alerta.condicion} ${alerta.valor.toLocaleString()}</p>
                    </div>

                    <div className={styles.alertaActions}>
                      <button 
                        className={styles.toggleBtn}
                        onClick={() => handleToggleEstado(alerta.id)}
                        title={alerta.estado === 'pausada' ? 'Activar' : 'Pausar'}
                      >
                        {alerta.estado === 'pausada' ? '▶' : '⏸'}
                      </button>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => handleEliminarAlerta(alerta.id)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.alertaMeta}>
                    <span className={styles.alertaEstado}>
                      {alerta.estado === 'activa' && '🟢 Activa'}
                      {alerta.estado === 'disparada' && '🔴 Disparada'}
                      {alerta.estado === 'pausada' && '⏸ Pausada'}
                    </span>
                    <span className={styles.alertaFecha}>
                      Creada: {alerta.creada}
                    </span>
                    {alerta.ultimaEjecucion && (
                      <span className={styles.alertaUltimaEjecucion}>
                        Última ejecución: {alerta.ultimaEjecucion}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Modal Crear Alerta */}
          {showCreate && (
            <div className={styles.modal} onClick={() => setShowCreate(false)}>
              <motion.div 
                className={styles.modalContent}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Nueva Alerta</h2>
                  <button onClick={() => setShowCreate(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.formField}>
                    <label>Tipo de Alerta</label>
                    <select 
                      value={nuevaAlerta.tipo}
                      onChange={(e) => setNuevaAlerta({...nuevaAlerta, tipo: e.target.value as any})}
                    >
                      <option value="precio">Precio</option>
                      <option value="volumen">Volumen</option>
                      <option value="evento">Evento</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label>Activo</label>
                    <input
                      type="text"
                      placeholder="CUMBRE ONE, HELIOS, ARES..."
                      value={nuevaAlerta.activo}
                      onChange={(e) => setNuevaAlerta({...nuevaAlerta, activo: e.target.value})}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label>Condición</label>
                    <select
                      value={nuevaAlerta.condicion}
                      onChange={(e) => setNuevaAlerta({...nuevaAlerta, condicion: e.target.value})}
                    >
                      <option value="mayor a">Mayor a</option>
                      <option value="menor a">Menor a</option>
                      <option value="igual a">Igual a</option>
                      <option value="supera">Supera</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label>Valor</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={nuevaAlerta.valor}
                      onChange={(e) => setNuevaAlerta({...nuevaAlerta, valor: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button className={styles.cancelModalBtn} onClick={() => setShowCreate(false)}>
                    Cancelar
                  </button>
                  <button className={styles.createModalBtn} onClick={handleCrearAlerta}>
                    Crear Alerta
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

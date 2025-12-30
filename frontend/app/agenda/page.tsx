'use client';

import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Plus, ChevronLeft, ChevronRight,
  Bell, MapPin, Users, Video, Phone, FileText,
  CheckCircle, AlertCircle, X, Edit2, MoreVertical
} from 'lucide-react';
import styles from '@/styles/agenda.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';

type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: 'reunion' | 'llamada' | 'vencimiento' | 'evento';
  prioridad: 'alta' | 'media' | 'baja';
  completado: boolean;
};

export default function AgendaPage() {
  const [mounted, setMounted] = useState(false);
  const [mesActual, setMesActual] = useState(new Date());
  const [eventos, setEventos] = useState<Evento[]>([]);

  const [showCreate, setShowCreate] = useState(false);
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    tipo: 'reunion' as const,
    prioridad: 'media' as const,
  });

  useEffect(() => {
    setMounted(true);
    const eventosData: Evento[] = [
      {
        id: '1',
        titulo: 'Reunión con Inversores',
        descripcion: 'Presentación de resultados Q4',
        fecha: '2024-12-29',
        hora: '14:00',
        tipo: 'reunion',
        prioridad: 'alta',
        completado: false,
      },
      {
        id: '2',
        titulo: 'Llamada con Asesor Legal',
        descripcion: 'Revisión de contratos CUMBRE ONE',
        fecha: '2024-12-29',
        hora: '16:30',
        tipo: 'llamada',
        prioridad: 'media',
        completado: false,
      },
      {
        id: '3',
        titulo: 'Vencimiento Inversión HELIOS',
        descripcion: 'Renovar o retirar fondos',
        fecha: '2024-12-30',
        hora: '10:00',
        tipo: 'vencimiento',
        prioridad: 'alta',
        completado: false,
      },
      {
        id: '4',
        titulo: 'Webinar Tokenización de Activos',
        descripcion: 'Evento online sobre nuevas regulaciones',
        fecha: '2024-12-30',
        hora: '15:00',
        tipo: 'evento',
        prioridad: 'baja',
        completado: false,
      },
    ];
    setEventos(eventosData);
  }, []);

  const eventosHoy = eventos.filter(e => e.fecha === new Date().toISOString().split('T')[0]);
  const eventosPendientes = eventos.filter(e => !e.completado);

  const handleCrearEvento = () => {
    const evento: Evento = {
      id: Date.now().toString(),
      ...nuevoEvento,
      completado: false,
    };
    setEventos([...eventos, evento]);
    setShowCreate(false);
    setNuevoEvento({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      tipo: 'reunion',
      prioridad: 'media',
    });
  };

  const handleToggleCompletado = (id: string) => {
    setEventos(eventos.map(e => 
      e.id === id ? { ...e, completado: !e.completado } : e
    ));
  };

  const handleEliminarEvento = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id));
  };

  const getDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const dias = [];
    
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(año, mes, i));
    }
    
    return dias;
  };

  const getIconoTipo = (tipo: string) => {
    switch(tipo) {
      case 'reunion': return <Users size={18} />;
      case 'llamada': return <Phone size={18} />;
      case 'vencimiento': return <Clock size={18} />;
      case 'evento': return <FileText size={18} />;
      default: return <Calendar size={18} />;
    }
  };

  if (!mounted) return <div className={styles.page}><HeaderGlass /><div className={styles.container}><Sidebar /></div></div>;

  return (
    <main className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.container}>
        <Sidebar />
        
        <section className={styles.mainContent}>
          {/* Header */}
          <div className={styles.heroSection}>
            <div>
              <h1 className={styles.pageTitle}>Mi Agenda</h1>
              <p className={styles.pageSubtitle}>Organiza tus eventos, reuniones y recordatorios</p>
            </div>

            <button className={styles.createBtn} onClick={() => setShowCreate(true)}>
              <Plus size={20} />
              Nuevo Evento
            </button>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(230, 179, 126, 0.15)', color: '#E6B37E' }}>
                <Calendar size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Eventos Hoy</p>
                <p className={styles.statValue}>{eventosHoy.length}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(255, 165, 2, 0.15)', color: '#ffa502' }}>
                <Clock size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Pendientes</p>
                <p className={styles.statValue}>{eventosPendientes.length}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(38, 222, 129, 0.15)', color: '#26de81' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Completados</p>
                <p className={styles.statValue}>{eventos.filter(e => e.completado).length}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(255, 107, 107, 0.15)', color: '#ff6b6b' }}>
                <AlertCircle size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Alta Prioridad</p>
                <p className={styles.statValue}>{eventos.filter(e => e.prioridad === 'alta').length}</p>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className={styles.mainGrid}>
            {/* Mini Calendario */}
            <div className={styles.section}>
              <div className={styles.calendarHeader}>
                <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1))}>
                  <ChevronLeft size={20} />
                </button>
                <h2>
                  {mesActual.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1))}>
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className={styles.calendar}>
                <div className={styles.calendarWeekdays}>
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(dia => (
                    <div key={dia} className={styles.weekday}>{dia}</div>
                  ))}
                </div>
                <div className={styles.calendarDays}>
                  {getDiasDelMes().map((dia, i) => {
                    const fechaStr = dia.toISOString().split('T')[0];
                    const tieneEventos = eventos.some(e => e.fecha === fechaStr);
                    const esHoy = fechaStr === new Date().toISOString().split('T')[0];
                    
                    return (
                      <button
                        key={i}
                        className={`${styles.calendarDay} ${esHoy ? styles.today : ''} ${tieneEventos ? styles.hasEvents : ''}`}
                        onClick={() => setDiaSeleccionado(fechaStr)}
                      >
                        {dia.getDate()}
                        {tieneEventos && <span className={styles.eventDot} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Eventos Próximos */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
              
              <div className={styles.eventosList}>
                {eventos.slice(0, 6).map((evento, i) => (
                  <div
                    key={evento.id}
                    className={`${styles.eventoCard} ${evento.completado ? styles.completado : ''}`}
                  >
                    <div className={styles.eventoHeader}>
                      <div className={styles.eventoIcon} style={{
                        background: evento.tipo === 'reunion' ? 'rgba(230, 179, 126, 0.15)' :
                                   evento.tipo === 'llamada' ? 'rgba(38, 222, 129, 0.15)' :
                                   evento.tipo === 'vencimiento' ? 'rgba(255, 165, 2, 0.15)' :
                                   'rgba(102, 92, 231, 0.15)',
                        color: evento.tipo === 'reunion' ? '#E6B37E' :
                              evento.tipo === 'llamada' ? '#26de81' :
                              evento.tipo === 'vencimiento' ? '#ffa502' :
                              '#665ce7'
                      }}>
                        {getIconoTipo(evento.tipo)}
                      </div>

                      <div className={styles.eventoInfo}>
                        <h3>{evento.titulo}</h3>
                        <p>{evento.descripcion}</p>
                      </div>

                      <button 
                        className={`${styles.completeBtn} ${evento.completado ? styles.completed : ''}`}
                        onClick={() => handleToggleCompletado(evento.id)}
                      >
                        <CheckCircle size={20} />
                      </button>
                    </div>

                    <div className={styles.eventoFooter}>
                      <div className={styles.eventoTiming}>
                        <Calendar size={16} />
                        <span>{evento.fecha}</span>
                        <Clock size={16} />
                        <span>{evento.hora}</span>
                      </div>
                      
                      <div className={styles.eventoActions}>
                        <span className={`${styles.prioridadBadge} ${styles[evento.prioridad]}`}>
                          {evento.prioridad}
                        </span>
                        <button 
                          className={styles.deleteSmallBtn}
                          onClick={() => handleEliminarEvento(evento.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Crear Evento */}
          {showCreate && (
            <div className={styles.modal} onClick={() => setShowCreate(false)}>
              <div 
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Nuevo Evento</h2>
                  <button onClick={() => setShowCreate(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.formField}>
                    <label>Título</label>
                    <input
                      type="text"
                      placeholder="Nombre del evento..."
                      value={nuevoEvento.titulo}
                      onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label>Descripción</label>
                    <textarea
                      placeholder="Detalles del evento..."
                      value={nuevoEvento.descripcion}
                      onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Fecha</label>
                      <input
                        type="date"
                        value={nuevoEvento.fecha}
                        onChange={(e) => setNuevoEvento({...nuevoEvento, fecha: e.target.value})}
                      />
                    </div>

                    <div className={styles.formField}>
                      <label>Hora</label>
                      <input
                        type="time"
                        value={nuevoEvento.hora}
                        onChange={(e) => setNuevoEvento({...nuevoEvento, hora: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Tipo</label>
                      <select
                        value={nuevoEvento.tipo}
                        onChange={(e) => setNuevoEvento({...nuevoEvento, tipo: e.target.value as any})}
                      >
                        <option value="reunion">Reunión</option>
                        <option value="llamada">Llamada</option>
                        <option value="vencimiento">Vencimiento</option>
                        <option value="evento">Evento</option>
                      </select>
                    </div>

                    <div className={styles.formField}>
                      <label>Prioridad</label>
                      <select
                        value={nuevoEvento.prioridad}
                        onChange={(e) => setNuevoEvento({...nuevoEvento, prioridad: e.target.value as any})}
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button className={styles.cancelModalBtn} onClick={() => setShowCreate(false)}>
                    Cancelar
                  </button>
                  <button className={styles.createModalBtn} onClick={handleCrearEvento}>
                    Crear Evento
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

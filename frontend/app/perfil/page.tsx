'use client';

import { useEffect, useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  Shield, Edit2, Save, X, Upload, Camera, Lock,
  TrendingUp, Star, Target, Briefcase, Wallet, Trophy,
  Clock, Activity, BarChart3, LineChart, Eye, Settings,
  Bell, CreditCard, FileText, Download, Share2, ChevronRight
} from 'lucide-react';
import styles from '@/styles/perfil.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { servicios } from '@/services';

// Función para formatear números de manera consistente (evita errores de hidratación)
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function PerfilPage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'portfolio' | 'settings'>('overview');
  const [avatarOk, setAvatarOk] = useState(true);
  
  const [usuario, setUsuario] = useState({
    nombre: 'Lautaro',
    apellido: 'Salinas',
    correo: 'lauti@cumbre.ar',
    telefono: '+54 9 11 1234-5678',
    ubicacion: 'Buenos Aires, Argentina',
    bio: 'Inversor experimentado en mercados digitales y activos tokenizados. Especializado en minería y proyectos de soberanía económica provincial.',
    tipoUsuario: 'INVERSOR GOLD',
    reputacion: 950,
    nivel: 'Elite',
    avatar: '/avatars/default.png',
    fechaRegistro: '2024-01-15',
    verificado: true,
    membresia: 'gold'
  });

  const [stats, setStats] = useState({
    totalInvertido: 426000,
    retornoPromedio: 23.4,
    proyectosActivos: 8,
    reputacion: 950,
    rentabilidadAnual: 156000,
    proyectosCompletados: 24,
    activos: 12,
    racha: 45
  });

  const [portfolio, setPortfolio] = useState([
    { id: 1, nombre: 'CUMBRE ONE', tipo: 'Minería', inversion: 125000, valor: 156800, cambio: 25.4, color: '#26de81' },
    { id: 2, nombre: 'Token Provincial SJ', tipo: 'Token', inversion: 80000, valor: 94200, cambio: 17.8, color: '#E6B37E' },
    { id: 3, nombre: 'Desarrollo Turístico', tipo: 'Proyecto', inversion: 65000, valor: 72100, cambio: 10.9, color: '#665ce7' },
    { id: 4, nombre: 'Energía Solar', tipo: 'Infraestructura', inversion: 156000, valor: 168200, cambio: 7.8, color: '#f39c12' },
  ]);

  const [actividad, setActividad] = useState([
    { id: 1, tipo: 'inversion', titulo: 'Nueva inversión en CUMBRE ONE', monto: 12400, fecha: '2024-12-28', hora: '14:35', estado: 'completado' },
    { id: 2, tipo: 'retiro', titulo: 'Retiro de ganancias', monto: 5200, fecha: '2024-12-27', hora: '09:20', estado: 'pendiente' },
    { id: 3, tipo: 'review', titulo: 'Review positiva recibida', puntos: 50, fecha: '2024-12-27', hora: '11:45', estado: 'completado' },
    { id: 4, tipo: 'proyecto', titulo: 'Proyecto Energía Solar completado', fecha: '2024-12-26', hora: '16:00', estado: 'completado' },
    { id: 5, tipo: 'nivel', titulo: 'Alcanzaste nivel Elite', fecha: '2024-12-25', hora: '10:00', estado: 'completado' },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const data = await servicios.obtenerPerfil();
        setUsuario(prev => ({
          ...prev,
          nombre: data.nombre,
          correo: (data as any).correo ?? data.email,
        }));
      } catch {
        // fallback al mock
      }
    })();
  }, []);

  const handleSave = () => {
    // Aquí iría la llamada a la API para actualizar el perfil
    setEditMode(false);
  };

  return (
    <main className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.container}>
        <section className={styles.mainContent}>
          
          {/* Hero Premium Section */}
          <div className={styles.heroSection}>
            {/* Profile Card con Cover */}
            <div className={styles.profileCard}>
              <div className={styles.coverImage}>
                <div className={styles.coverGradient}></div>
                <button className={styles.coverEditBtn}>
                  <Camera size={18} />
                </button>
              </div>

              <div className={styles.profileHeader}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatarWrapper}>
                    {avatarOk ? (
                      <img
                        src={usuario.avatar}
                        alt={`${usuario.nombre} ${usuario.apellido}`}
                        className={styles.avatar}
                        onError={() => setAvatarOk(false)}
                      />
                    ) : (
                      <div className={styles.avatarFallback} aria-label={`${usuario.nombre} ${usuario.apellido}`}>
                        {usuario.nombre?.[0]}
                        {usuario.apellido?.[0]}
                      </div>
                    )}
                    {usuario.verificado && (
                      <div className={styles.verifiedBadge}>
                        <Shield size={16} />
                      </div>
                    )}
                    <button className={styles.avatarUpload}>
                      <Camera size={18} />
                    </button>
                  </div>

                  <div className={styles.profileInfo}>
                    <div className={styles.nameSection}>
                      <h1 className={styles.userName}>{usuario.nombre} {usuario.apellido}</h1>
                      <div className={styles.badges}>
                        <span className={`${styles.badge} ${styles.memberBadge}`}>
                          <Trophy size={14} />
                          {usuario.membresia.toUpperCase()}
                        </span>
                        <span className={`${styles.badge} ${styles.levelBadge}`}>
                          {usuario.nivel}
                        </span>
                      </div>
                    </div>
                    
                    <p className={styles.userBio}>{usuario.bio}</p>

                    <div className={styles.quickStats}>
                      <div className={styles.quickStat}>
                        <Star size={16} />
                        <span>{usuario.reputacion} pts</span>
                      </div>
                      <div className={styles.quickStat}>
                        <Calendar size={16} />
                        <span>Desde {new Date(usuario.fechaRegistro).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.quickStat}>
                        <Award size={16} />
                        <span>{stats.racha} días racha</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.profileActions}>
                  <button className={styles.actionBtn} onClick={() => setEditMode(!editMode)}>
                    <Edit2 size={18} />
                    Editar Perfil
                  </button>
                  <button className={styles.actionBtn}>
                    <Share2 size={18} />
                    Compartir
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid Mega */}
            <div className={styles.statsSection}>
              <div className={styles.statsMegaGrid}>
                <div className={styles.statCardLarge}>
                  <div className={styles.statHeader}>
                    <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)' }}>
                      <Wallet size={28} />
                    </div>
                    <span className={styles.statTrend}>+23.4%</span>
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Portfolio Total</p>
                    <p className={styles.statValue}>${formatNumber(stats.totalInvertido)}</p>
                    <p className={styles.statSubtext}>+${formatNumber(stats.rentabilidadAnual)} este año</p>
                  </div>
                  <div className={styles.statChart}>
                    <div className={styles.miniChart} style={{ width: '100%', height: '40px', background: 'rgba(38, 222, 129, 0.1)', borderRadius: '8px' }}></div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #E6B37E 0%, #D4A06C 100%)' }}>
                    <Target size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Retorno Promedio</p>
                    <p className={styles.statValue}>+{stats.retornoPromedio}%</p>
                    <p className={styles.statSubtext}>Anual</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #665ce7 0%, #5147d4 100%)' }}>
                    <Briefcase size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Proyectos Activos</p>
                    <p className={styles.statValue}>{stats.proyectosActivos}</p>
                    <p className={styles.statSubtext}>{stats.proyectosCompletados} completados</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' }}>
                    <BarChart3 size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Activos</p>
                    <p className={styles.statValue}>{stats.activos}</p>
                    <p className={styles.statSubtext}>Diversificados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Eye size={20} />
              Vista General
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'portfolio' ? styles.active : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              <LineChart size={20} />
              Portfolio
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'activity' ? styles.active : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={20} />
              Actividad
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Configuración
            </button>
          </div>

          {/* Content Sections */}
          {activeTab === 'overview' && (
            <div className={styles.tabContent}>
              {/* Portfolio Overview */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Portfolio Highlights</h2>
                    <p className={styles.sectionSubtitle}>Tus mejores inversiones</p>
                  </div>
                  <button className={styles.viewAllBtn}>
                    Ver Todo
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className={styles.portfolioGrid}>
                  {portfolio.map((item) => (
                    <div key={item.id} className={styles.portfolioCard}>
                      <div className={styles.portfolioHeader}>
                        <div className={styles.portfolioIcon} style={{ background: `${item.color}20`, color: item.color }}>
                          <Wallet size={20} />
                        </div>
                        <span className={styles.portfolioTipo}>{item.tipo}</span>
                      </div>

                      <h3 className={styles.portfolioNombre}>{item.nombre}</h3>

                      <div className={styles.portfolioValues}>
                        <div className={styles.portfolioValue}>
                          <span className={styles.portfolioLabel}>Inversión</span>
                          <span className={styles.portfolioAmount}>${formatNumber(item.inversion)}</span>
                        </div>
                        <div className={styles.portfolioValue}>
                          <span className={styles.portfolioLabel}>Valor Actual</span>
                          <span className={styles.portfolioAmount}>${formatNumber(item.valor)}</span>
                        </div>
                      </div>

                      <div className={styles.portfolioChange} style={{ color: item.cambio > 0 ? '#26de81' : '#ff4757' }}>
                        <TrendingUp size={16} />
                        +{item.cambio}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actividad Reciente Resumida */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Actividad Reciente</h2>
                    <p className={styles.sectionSubtitle}>Últimas 5 transacciones</p>
                  </div>
                  <button className={styles.viewAllBtn} onClick={() => setActiveTab('activity')}>
                    Ver Todo
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className={styles.activityList}>
                  {actividad.slice(0, 5).map((item) => (
                    <div key={item.id} className={styles.activityItem}>
                      <div className={styles.activityIcon} style={{
                        background: item.tipo === 'inversion' ? 'rgba(38, 222, 129, 0.15)' :
                                   item.tipo === 'retiro' ? 'rgba(255, 107, 107, 0.15)' :
                                   item.tipo === 'review' ? 'rgba(230, 179, 126, 0.15)' :
                                   item.tipo === 'nivel' ? 'rgba(243, 156, 18, 0.15)' :
                                   'rgba(102, 92, 231, 0.15)',
                        color: item.tipo === 'inversion' ? '#26de81' :
                               item.tipo === 'retiro' ? '#ff6b6b' :
                               item.tipo === 'review' ? '#E6B37E' :
                               item.tipo === 'nivel' ? '#f39c12' :
                               '#665ce7'
                      }}>
                        {item.tipo === 'inversion' && <TrendingUp size={20} />}
                        {item.tipo === 'retiro' && <Download size={20} />}
                        {item.tipo === 'review' && <Star size={20} />}
                        {item.tipo === 'proyecto' && <Briefcase size={20} />}
                        {item.tipo === 'nivel' && <Trophy size={20} />}
                      </div>

                      <div className={styles.activityContent}>
                        <p className={styles.activityTitle}>{item.titulo}</p>
                        <p className={styles.activityTime}>{item.fecha} • {item.hora}</p>
                      </div>

                      {item.monto && (
                        <p className={styles.activityMonto} style={{ 
                          color: item.tipo === 'retiro' ? '#ff6b6b' : '#26de81' 
                        }}>
                          {item.tipo === 'retiro' ? '-' : '+'}${formatNumber(item.monto)}
                        </p>
                      )}
                      {item.puntos && <p className={styles.activityPuntos}>+{item.puntos} pts</p>}

                      <span className={`${styles.activityStatus} ${styles[item.estado]}`}>
                        {item.estado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className={styles.tabContent}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Portfolio Completo</h2>
                    <p className={styles.sectionSubtitle}>Todas tus inversiones</p>
                  </div>
                  <button className={styles.addBtn}>
                    <Target size={18} />
                    Nueva Inversión
                  </button>
                </div>

                <div className={styles.portfolioGrid}>
                  {portfolio.map((item) => (
                    <div key={item.id} className={styles.portfolioCard}>
                      <div className={styles.portfolioHeader}>
                        <div className={styles.portfolioIcon} style={{ background: `${item.color}20`, color: item.color }}>
                          <Wallet size={20} />
                        </div>
                        <span className={styles.portfolioTipo}>{item.tipo}</span>
                      </div>

                      <h3 className={styles.portfolioNombre}>{item.nombre}</h3>

                      <div className={styles.portfolioValues}>
                        <div className={styles.portfolioValue}>
                          <span className={styles.portfolioLabel}>Inversión</span>
                          <span className={styles.portfolioAmount}>${formatNumber(item.inversion)}</span>
                        </div>
                        <div className={styles.portfolioValue}>
                          <span className={styles.portfolioLabel}>Valor Actual</span>
                          <span className={styles.portfolioAmount}>${formatNumber(item.valor)}</span>
                        </div>
                      </div>

                      <div className={styles.portfolioChange} style={{ color: item.cambio > 0 ? '#26de81' : '#ff4757' }}>
                        <TrendingUp size={16} />
                        +{item.cambio}%
                      </div>

                      <button className={styles.portfolioBtn}>Ver Detalles</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={styles.tabContent}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Historial Completo</h2>
                    <p className={styles.sectionSubtitle}>Todas tus transacciones</p>
                  </div>
                  <button className={styles.filterBtn}>
                    <Download size={18} />
                    Exportar
                  </button>
                </div>

                <div className={styles.activityList}>
                  {actividad.map((item) => (
                    <div key={item.id} className={styles.activityItem}>
                      <div className={styles.activityIcon} style={{
                        background: item.tipo === 'inversion' ? 'rgba(38, 222, 129, 0.15)' :
                                   item.tipo === 'retiro' ? 'rgba(255, 107, 107, 0.15)' :
                                   item.tipo === 'review' ? 'rgba(230, 179, 126, 0.15)' :
                                   item.tipo === 'nivel' ? 'rgba(243, 156, 18, 0.15)' :
                                   'rgba(102, 92, 231, 0.15)',
                        color: item.tipo === 'inversion' ? '#26de81' :
                               item.tipo === 'retiro' ? '#ff6b6b' :
                               item.tipo === 'review' ? '#E6B37E' :
                               item.tipo === 'nivel' ? '#f39c12' :
                               '#665ce7'
                      }}>
                        {item.tipo === 'inversion' && <TrendingUp size={20} />}
                        {item.tipo === 'retiro' && <Download size={20} />}
                        {item.tipo === 'review' && <Star size={20} />}
                        {item.tipo === 'proyecto' && <Briefcase size={20} />}
                        {item.tipo === 'nivel' && <Trophy size={20} />}
                      </div>

                      <div className={styles.activityContent}>
                        <p className={styles.activityTitle}>{item.titulo}</p>
                        <p className={styles.activityTime}>{item.fecha} • {item.hora}</p>
                      </div>

                      {item.monto && (
                        <p className={styles.activityMonto} style={{ 
                          color: item.tipo === 'retiro' ? '#ff6b6b' : '#26de81' 
                        }}>
                          {item.tipo === 'retiro' ? '-' : '+'}${formatNumber(item.monto)}
                        </p>
                      )}
                      {item.puntos && <p className={styles.activityPuntos}>+{item.puntos} pts</p>}

                      <span className={`${styles.activityStatus} ${styles[item.estado]}`}>
                        {item.estado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={styles.tabContent}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Información Personal</h2>
                </div>

                <div className={styles.infoGrid}>
                  <div className={styles.infoField}>
                    <div className={styles.fieldIcon}>
                      <User size={20} />
                    </div>
                    <div className={styles.fieldContent}>
                      <label>Nombre Completo</label>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={`${usuario.nombre} ${usuario.apellido}`}
                          onChange={(e) => {
                            const [nombre, ...apellido] = e.target.value.split(' ');
                            setUsuario({ ...usuario, nombre, apellido: apellido.join(' ') });
                          }}
                        />
                      ) : (
                        <p>{usuario.nombre} {usuario.apellido}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoField}>
                    <div className={styles.fieldIcon}>
                      <Mail size={20} />
                    </div>
                    <div className={styles.fieldContent}>
                      <label>Correo Electrónico</label>
                      {editMode ? (
                        <input 
                          type="email" 
                          value={usuario.correo}
                          onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
                        />
                      ) : (
                        <p>{usuario.correo}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoField}>
                    <div className={styles.fieldIcon}>
                      <Phone size={20} />
                    </div>
                    <div className={styles.fieldContent}>
                      <label>Teléfono</label>
                      {editMode ? (
                        <input 
                          type="tel" 
                          value={usuario.telefono}
                          onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                        />
                      ) : (
                        <p>{usuario.telefono}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoField}>
                    <div className={styles.fieldIcon}>
                      <MapPin size={20} />
                    </div>
                    <div className={styles.fieldContent}>
                      <label>Ubicación</label>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={usuario.ubicacion}
                          onChange={(e) => setUsuario({ ...usuario, ubicacion: e.target.value })}
                        />
                      ) : (
                        <p>{usuario.ubicacion}</p>
                      )}
                    </div>
                  </div>
                </div>

                {editMode && (
                  <div className={styles.editActions}>
                    <button className={styles.saveBtn} onClick={() => setEditMode(false)}>
                      <Save size={18} />
                      Guardar Cambios
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>
                      <X size={18} />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              {/* Seguridad */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Seguridad y Privacidad</h2>
                </div>

                <div className={styles.settingsList}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingIcon}>
                      <Lock size={20} />
                    </div>
                    <div className={styles.settingContent}>
                      <h3>Cambiar Contraseña</h3>
                      <p>Actualiza tu contraseña regularmente</p>
                    </div>
                    <button className={styles.settingBtn}>Cambiar</button>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingIcon}>
                      <Shield size={20} />
                    </div>
                    <div className={styles.settingContent}>
                      <h3>Autenticación de Dos Factores</h3>
                      <p>Protege tu cuenta con 2FA</p>
                    </div>
                    <button className={styles.settingBtn}>Activar</button>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingIcon}>
                      <Bell size={20} />
                    </div>
                    <div className={styles.settingContent}>
                      <h3>Notificaciones</h3>
                      <p>Gestiona tus preferencias</p>
                    </div>
                    <button className={styles.settingBtn}>Configurar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

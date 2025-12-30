'use client';

import { useState, useEffect } from 'react';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { 
  Briefcase, Plus, Search, Filter, Star, MapPin, Clock, 
  DollarSign, Users, Code, Palette, TrendingUp, FileText,
  X, Send, Heart, Award, Target, Zap, CheckCircle, Calendar,
  Eye, MessageCircle, Bookmark, Share2, ThumbsUp, ArrowRight,
  BadgeCheck, Sparkles, Rocket, Grid, List, SlidersHorizontal
} from 'lucide-react';
import styles from '@/styles/talento.module.scss';

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  cliente: string;
  categoria: 'desarrollo' | 'diseño' | 'marketing' | 'finanzas';
  presupuesto: string;
  presupuestoMin: number;
  presupuestoMax: number;
  plazo: string;
  habilidades: string[];
  calificacion: number;
  postulantes: number;
  favorito: boolean;
  fechaPublicacion: string;
  nivel: 'junior' | 'mid' | 'senior';
  tipo: 'fijo' | 'hora';
  urgente?: boolean;
  destacado?: boolean;
}

export default function TalentoPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [proyectos, setProyectos] = useState<Proyecto[]>([
    {
      id: '1',
      titulo: 'Desarrollo de Plataforma Web3 DeFi',
      descripcion: 'Necesitamos un desarrollador blockchain experto para crear una plataforma DeFi completa con smart contracts en Solidity, integración con wallets y dashboard de trading.',
      cliente: 'Crypto Ventures Inc.',
      categoria: 'desarrollo',
      presupuesto: '$15,000 - $25,000',
      presupuestoMin: 15000,
      presupuestoMax: 25000,
      plazo: '3 meses',
      habilidades: ['Solidity', 'React', 'Node.js', 'Web3.js', 'TypeScript'],
      calificacion: 4.8,
      postulantes: 12,
      favorito: false,
      fechaPublicacion: '2024-12-28',
      nivel: 'senior',
      tipo: 'fijo',
      urgente: true,
      destacado: true
    },
    {
      id: '2',
      titulo: 'Diseño UI/UX para App Móvil FinTech',
      descripcion: 'Buscamos diseñador creativo para app de finanzas personales. Debe incluir sistema de diseño completo, prototipos interactivos y guías de estilo.',
      cliente: 'FinTech Solutions',
      categoria: 'diseño',
      presupuesto: '$8,000 - $12,000',
      presupuestoMin: 8000,
      presupuestoMax: 12000,
      plazo: '6 semanas',
      habilidades: ['Figma', 'Adobe XD', 'Prototyping', 'UI Design', 'Design Systems'],
      calificacion: 4.9,
      postulantes: 24,
      favorito: true,
      fechaPublicacion: '2024-12-27',
      nivel: 'mid',
      tipo: 'fijo',
      destacado: true
    },
    {
      id: '3',
      titulo: 'Campaña de Marketing Digital & Growth',
      descripcion: 'Proyecto de marketing integral para lanzamiento de token provincial. Incluye estrategia SEO, contenido para redes sociales, growth hacking y análisis de métricas.',
      cliente: 'Token Launch Co.',
      categoria: 'marketing',
      presupuesto: '$10,000 - $18,000',
      presupuestoMin: 10000,
      presupuestoMax: 18000,
      plazo: '2 meses',
      habilidades: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'Growth Hacking'],
      calificacion: 4.7,
      postulantes: 18,
      favorito: false,
      fechaPublicacion: '2024-12-26',
      nivel: 'mid',
      tipo: 'fijo'
    },
    {
      id: '4',
      titulo: 'Análisis Financiero de Portfolio Cripto',
      descripcion: 'Análisis profundo de cartera de inversiones cripto con recomendaciones estratégicas, modelado de riesgo, proyecciones y reportes ejecutivos.',
      cliente: 'Investment Group',
      categoria: 'finanzas',
      presupuesto: '$5,000 - $9,000',
      presupuestoMin: 5000,
      presupuestoMax: 9000,
      plazo: '4 semanas',
      habilidades: ['Financial Analysis', 'Excel', 'Python', 'Risk Management', 'Crypto'],
      calificacion: 5.0,
      postulantes: 8,
      favorito: true,
      fechaPublicacion: '2024-12-25',
      nivel: 'senior',
      tipo: 'fijo',
      urgente: true
    },
    {
      id: '5',
      titulo: 'Desarrollo Frontend con Next.js',
      descripcion: 'Desarrollo de interfaz moderna para plataforma de gestión de proyectos. Se requiere experiencia con Next.js, TypeScript y diseño responsive.',
      cliente: 'Tech Startup',
      categoria: 'desarrollo',
      presupuesto: '$60 - $90',
      presupuestoMin: 60,
      presupuestoMax: 90,
      plazo: '8 semanas',
      habilidades: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'API Integration'],
      calificacion: 4.6,
      postulantes: 15,
      favorito: false,
      fechaPublicacion: '2024-12-24',
      nivel: 'mid',
      tipo: 'hora'
    },
    {
      id: '6',
      titulo: 'Branding & Identidad Visual Completa',
      descripcion: 'Creación de identidad visual desde cero para nuevo proyecto blockchain. Incluye logo, paleta de colores, tipografías y manual de marca.',
      cliente: 'Blockchain Ventures',
      categoria: 'diseño',
      presupuesto: '$6,000 - $10,000',
      presupuestoMin: 6000,
      presupuestoMax: 10000,
      plazo: '5 semanas',
      habilidades: ['Branding', 'Illustrator', 'Photoshop', 'Logo Design', 'Brand Guidelines'],
      calificacion: 4.8,
      postulantes: 20,
      favorito: false,
      fechaPublicacion: '2024-12-23',
      nivel: 'senior',
      tipo: 'fijo'
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [showPostularModal, setShowPostularModal] = useState(false);

  const [postulacion, setPostulacion] = useState({
    propuesta: '',
    presupuestoOfrecido: '',
    tiempoEstimado: '',
    experienciaRelevante: ''
  });

  const categorias = [
    { value: 'todas', label: 'Todas', icon: Briefcase, color: '#E6B37E' },
    { value: 'desarrollo', label: 'Desarrollo', icon: Code, color: '#665ce7' },
    { value: 'diseño', label: 'Diseño', icon: Palette, color: '#ff6b6b' },
    { value: 'marketing', label: 'Marketing', icon: TrendingUp, color: '#26de81' },
    { value: 'finanzas', label: 'Finanzas', icon: DollarSign, color: '#ffa502' }
  ];

  const proyectosFiltrados = proyectos.filter(p => {
    const matchCategoria = filtroCategoria === 'todas' || p.categoria === filtroCategoria;
    const matchBusqueda = p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                          p.habilidades.some(h => h.toLowerCase().includes(busqueda.toLowerCase()));
    return matchCategoria && matchBusqueda;
  });

  const stats = {
    total: proyectos.length,
    misPostulaciones: 3,
    enProgreso: 2,
    completados: 8
  };

  const handleToggleFavorito = (id: string) => {
    setProyectos(proyectos.map(p => 
      p.id === id ? { ...p, favorito: !p.favorito } : p
    ));
  };

  const handlePostular = () => {
    console.log('Postulación enviada:', postulacion);
    setShowPostularModal(false);
    setPostulacion({
      propuesta: '',
      presupuestoOfrecido: '',
      tiempoEstimado: '',
      experienciaRelevante: ''
    });
    alert('¡Postulación enviada exitosamente!');
  };

  const getIconoCategoria = (categoria: string) => {
    const cat = categorias.find(c => c.value === categoria);
    const Icon = cat?.icon || Briefcase;
    return <Icon size={20} />;
  };

  const getColorCategoria = (categoria: string) => {
    return categorias.find(c => c.value === categoria)?.color || '#E6B37E';
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.page}>
      <HeaderGlass />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          
          {/* Hero Premium Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <span className={styles.heroTag}>
                  <Sparkles size={16} />
                  Plataforma de Talento
                </span>
                <h1 className={styles.pageTitle}>Descubre Proyectos</h1>
                <p className={styles.pageSubtitle}>
                  Conecta con empresas líderes y trabaja en proyectos increíbles
                </p>
              </div>

              <div className={styles.heroActions}>
                <button className={styles.createBtn}>
                  <Plus size={20} />
                  Crear Perfil Pro
                  <ArrowRight size={18} />
                </button>
                <button className={styles.secondaryBtn}>
                  <Bookmark size={18} />
                  Mis Favoritos
                </button>
              </div>
            </div>
          </div>

          {/* Stats Premium */}
          <div className={styles.statsContainer}>
            <div className={styles.statsMegaGrid}>
              <div className={styles.statCardLarge}>
                <div className={styles.statHeader}>
                  <div className={styles.statIconLarge} style={{ background: 'linear-gradient(135deg, #E6B37E 0%, #D4A06C 100%)' }}>
                    <Rocket size={32} />
                  </div>
                  <span className={styles.statBadge}>
                    +12 hoy
                  </span>
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Proyectos Activos</p>
                  <p className={styles.statValue}>{stats.total}</p>
                  <p className={styles.statSubtext}>Oportunidades disponibles ahora</p>
                </div>
                <div className={styles.statProgress}>
                  <div className={styles.progressBar} style={{ width: '75%', background: 'linear-gradient(90deg, #E6B37E, #D4A06C)' }}></div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #665ce7 0%, #5147d4 100%)' }}>
                  <FileText size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Postulaciones</p>
                  <p className={styles.statValue}>{stats.misPostulaciones}</p>
                  <p className={styles.statSubtext}>En proceso</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #ffa502 0%, #e67e22 100%)' }}>
                  <Clock size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>En Progreso</p>
                  <p className={styles.statValue}>{stats.enProgreso}</p>
                  <p className={styles.statSubtext}>Activos ahora</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)' }}>
                  <CheckCircle size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Completados</p>
                  <p className={styles.statValue}>{stats.completados}</p>
                  <p className={styles.statSubtext}>Con éxito</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters Premium */}
          <div className={styles.filtersSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Buscar proyectos por título, skills o descripción..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button className={styles.clearBtn} onClick={() => setBusqueda('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className={styles.viewToggle}>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            <div className={styles.filterChips}>
              {categorias.map(cat => {
                const Icon = cat.icon;
                const isActive = filtroCategoria === cat.value;
                return (
                  <button
                    key={cat.value}
                    className={`${styles.filterChip} ${isActive ? styles.active : ''}`}
                    onClick={() => setFiltroCategoria(cat.value)}
                    style={{
                      borderColor: isActive ? cat.color : 'rgba(255, 255, 255, 0.1)',
                      background: isActive ? `${cat.color}20` : 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <Icon size={18} style={{ color: cat.color }} />
                    {cat.label}
                    {isActive && (
                      <span className={styles.chipCount}>
                        {proyectosFiltrados.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proyectos Grid */}
          <div className={styles.proyectosSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Proyectos Disponibles</h2>
                <p className={styles.sectionSubtitle}>
                  {proyectosFiltrados.length} oportunidades encontradas
                </p>
              </div>

              <button className={styles.filterAdvanced}>
                <SlidersHorizontal size={18} />
                Filtros Avanzados
              </button>
            </div>

            <div className={`${styles.proyectosGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
              {proyectosFiltrados.map((proyecto) => {
                const Icon = categorias.find(c => c.value === proyecto.categoria)?.icon || Briefcase;
                const color = getColorCategoria(proyecto.categoria);

                return (
                  <div
                    key={proyecto.id}
                    className={`${styles.proyectoCard} ${proyecto.destacado ? styles.destacado : ''}`}
                    onClick={() => setProyectoSeleccionado(proyecto)}
                  >
                    {proyecto.destacado && (
                      <div className={styles.destacadoBadge}>
                        <Sparkles size={14} />
                        Destacado
                      </div>
                    )}
                    
                    {proyecto.urgente && (
                      <div className={styles.urgenteBadge}>
                        <Zap size={14} />
                        Urgente
                      </div>
                    )}

                    <div className={styles.proyectoHeader}>
                      <div className={styles.proyectoIcon} style={{ background: `${color}20`, color }}>
                        <Icon size={24} />
                      </div>

                      <button
                        className={`${styles.favoriteBtn} ${proyecto.favorito ? styles.active : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorito(proyecto.id);
                        }}
                      >
                        <Heart size={18} fill={proyecto.favorito ? '#ff6b6b' : 'none'} />
                      </button>
                    </div>

                    <div className={styles.proyectoContent}>
                      <div className={styles.proyectoMeta}>
                        <span className={styles.categoriaBadge} style={{ borderColor: color, color }}>
                          {proyecto.categoria}
                        </span>
                        <span className={styles.nivelBadge}>
                          {proyecto.nivel}
                        </span>
                      </div>

                      <h3 className={styles.proyectoTitulo}>{proyecto.titulo}</h3>
                      <p className={styles.proyectoDescripcion}>{proyecto.descripcion}</p>

                      <div className={styles.proyectoCliente}>
                        <div className={styles.clienteAvatar}>
                          {proyecto.cliente.charAt(0)}
                        </div>
                        <div>
                          <p className={styles.clienteNombre}>{proyecto.cliente}</p>
                          <div className={styles.clienteRating}>
                            <Star size={14} fill="#ffa502" color="#ffa502" />
                            <span>{proyecto.calificacion}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.proyectoSkills}>
                        {proyecto.habilidades.slice(0, 4).map((skill, i) => (
                          <span key={i} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                        {proyecto.habilidades.length > 4 && (
                          <span className={styles.skillMore}>
                            +{proyecto.habilidades.length - 4}
                          </span>
                        )}
                      </div>

                      <div className={styles.proyectoFooter}>
                        <div className={styles.proyectoInfo}>
                          <div className={styles.infoItem}>
                            <DollarSign size={16} />
                            <span>{proyecto.presupuesto}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <Clock size={16} />
                            <span>{proyecto.plazo}</span>
                          </div>
                        </div>

                        <div className={styles.proyectoStats}>
                          <div className={styles.statItem}>
                            <Eye size={14} />
                            {Math.floor(Math.random() * 50) + 20}
                          </div>
                          <div className={styles.statItem}>
                            <Users size={14} />
                            {proyecto.postulantes}
                          </div>
                        </div>
                      </div>

                      <button
                        className={styles.applyBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setProyectoSeleccionado(proyecto);
                          setShowPostularModal(true);
                        }}
                      >
                        Postular Ahora
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalle Proyecto */}
      {proyectoSeleccionado && !showPostularModal && (
        <div className={styles.modal} onClick={() => setProyectoSeleccionado(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setProyectoSeleccionado(null)}>
              <X size={24} />
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIcon} style={{ 
                background: `${getColorCategoria(proyectoSeleccionado.categoria)}20`,
                color: getColorCategoria(proyectoSeleccionado.categoria)
              }}>
                {getIconoCategoria(proyectoSeleccionado.categoria)}
              </div>
              <div>
                <h2>{proyectoSeleccionado.titulo}</h2>
                <p className={styles.modalCliente}>{proyectoSeleccionado.cliente}</p>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h3>Descripción del Proyecto</h3>
                <p>{proyectoSeleccionado.descripcion}</p>
              </div>

              <div className={styles.modalSection}>
                <h3>Habilidades Requeridas</h3>
                <div className={styles.skillsList}>
                  {proyectoSeleccionado.habilidades.map((skill, i) => (
                    <span key={i} className={styles.skillBadge}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalDetails}>
                <div className={styles.detailItem}>
                  <DollarSign size={20} />
                  <div>
                    <span className={styles.detailLabel}>Presupuesto</span>
                    <span className={styles.detailValue}>{proyectoSeleccionado.presupuesto}</span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <Clock size={20} />
                  <div>
                    <span className={styles.detailLabel}>Duración</span>
                    <span className={styles.detailValue}>{proyectoSeleccionado.plazo}</span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <Users size={20} />
                  <div>
                    <span className={styles.detailLabel}>Postulantes</span>
                    <span className={styles.detailValue}>{proyectoSeleccionado.postulantes}</span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <Star size={20} />
                  <div>
                    <span className={styles.detailLabel}>Calificación Cliente</span>
                    <span className={styles.detailValue}>{proyectoSeleccionado.calificacion}/5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.shareBtn}>
                <Share2 size={18} />
                Compartir
              </button>
              <button 
                className={styles.applyBtnLarge}
                onClick={() => setShowPostularModal(true)}
              >
                <Send size={18} />
                Enviar Postulación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Postulación */}
      {showPostularModal && (
        <div className={styles.modal} onClick={() => setShowPostularModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowPostularModal(false)}>
              <X size={24} />
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIcon} style={{ background: 'rgba(230, 179, 126, 0.2)', color: '#E6B37E' }}>
                <Send size={32} />
              </div>
              <div>
                <h2>Enviar Postulación</h2>
                <p className={styles.modalSubtitle}>
                  {proyectoSeleccionado?.titulo}
                </p>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Propuesta</label>
                <textarea
                  value={postulacion.propuesta}
                  onChange={(e) => setPostulacion({ ...postulacion, propuesta: e.target.value })}
                  placeholder="Describe tu propuesta y por qué eres el candidato ideal..."
                  rows={5}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Presupuesto Ofrecido</label>
                  <input
                    type="text"
                    value={postulacion.presupuestoOfrecido}
                    onChange={(e) => setPostulacion({ ...postulacion, presupuestoOfrecido: e.target.value })}
                    placeholder="Ej: $15,000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Tiempo Estimado</label>
                  <input
                    type="text"
                    value={postulacion.tiempoEstimado}
                    onChange={(e) => setPostulacion({ ...postulacion, tiempoEstimado: e.target.value })}
                    placeholder="Ej: 3 meses"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Experiencia Relevante</label>
                <textarea
                  value={postulacion.experienciaRelevante}
                  onChange={(e) => setPostulacion({ ...postulacion, experienciaRelevante: e.target.value })}
                  placeholder="Menciona proyectos similares o experiencia relacionada..."
                  rows={4}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelBtnLarge}
                onClick={() => setShowPostularModal(false)}
              >
                Cancelar
              </button>
              <button 
                className={styles.applyBtnLarge}
                onClick={handlePostular}
              >
                <Send size={18} />
                Enviar Postulación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


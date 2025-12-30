"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import styles from "@/styles/landing.module.scss";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users,
  BarChart3,
  Globe,
  Lock,
  ChevronDown,
  Play,
  Check,
  Star,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  LineChart,
  Layers,
  MousePointer,
  CheckCircle,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  MessageCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function CumbreLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D4A8" />
          <stop offset="50%" stopColor="#E6B37E" />
          <stop offset="100%" stopColor="#C9985E" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Mountain peak - representing "cumbre" */}
      <path 
        d="M24 6L42 38H6L24 6Z" 
        fill="url(#logoGradient)" 
        filter="url(#glow)"
      />
      {/* Inner highlight */}
      <path 
        d="M24 14L34 34H14L24 14Z" 
        fill="rgba(0,0,0,0.3)" 
      />
      {/* Peak accent */}
      <path 
        d="M24 6L28 14H20L24 6Z" 
        fill="#FFF" 
        fillOpacity="0.4"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState<'producto' | 'casos'>('producto');
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  // Check if user is authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokens = window.localStorage.getItem('cumbre_tokens');
      setIsAuthenticated(!!tokens);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cumbre_tokens');
      setIsAuthenticated(false);
      setShowUserMenu(false);
      router.push('/');
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // DATA
  // ═══════════════════════════════════════════════════════════════════════════════
  const metrics = [
    { value: 127, suffix: "M+", label: "Capital Gestionado", prefix: "$" },
    { value: 12500, suffix: "+", label: "Inversores Activos", prefix: "" },
    { value: 347, suffix: "%", label: "ROI Promedio", prefix: "" },
    { value: 24, suffix: "/7", label: "Soporte Premium", prefix: "" },
  ];

  const features = [
    {
      icon: Cpu,
      title: "IA que Multiplica tu Capital",
      desc: "Algoritmos exclusivos de Silicon Valley que predicen el mercado 72h antes. Mientras otros pierden, tu ganas.",
      highlight: "99.2% precision",
      color: "violet",
    },
    {
      icon: TrendingUp,
      title: "Ganancias Automaticas",
      desc: "Tu dinero trabaja 24/7 sin que muevas un dedo. Operaciones automaticas que generan +347% ROI promedio.",
      highlight: "+$2.4M generados",
      color: "emerald",
    },
    {
      icon: LineChart,
      title: "Senales VIP en Tiempo Real",
      desc: "Accede a las mismas senales que usan los hedge funds de Wall Street. Informacion privilegiada, legal.",
      highlight: "Acceso exclusivo",
      color: "cyan",
    },
    {
      icon: Shield,
      title: "Tu Dinero Blindado",
      desc: "Seguridad militar: encriptacion cuantica, auditorias Big4, seguro hasta $10M por cuenta.",
      highlight: "100% protegido",
      color: "copper",
    },
    {
      icon: Users,
      title: "Club de Millonarios",
      desc: "Unete a la comunidad privada de 12,500+ inversores exitosos. Networking que vale millones.",
      highlight: "Elite only",
      color: "rose",
    },
    {
      icon: Zap,
      title: "Resultados en 48 Horas",
      desc: "No esperes meses. Nuestros usuarios ven sus primeras ganancias en menos de 2 dias. Garantizado.",
      highlight: "Resultados rapidos",
      color: "violet",
    },
  ];

  const testimonials = [
    {
      name: "Sebastian Fernandez",
      role: "Ex-Goldman Sachs, Inversor Privado",
      text: "Renuncie a mi trabajo en Wall Street porque con Cumbre gano mas en un mes que en un ano de salario. No es broma, es matematica.",
      avatar: "SF",
      rating: 5,
      metric: "+$847K en 6 meses",
    },
    {
      name: "Valentina Rossi",
      role: "Empresaria Serial, Forbes 30u30",
      text: "Pase de $50K a $1.2M en 14 meses. Cumbre transformo mi vida y la de mi familia. Ahora viajo mientras la IA trabaja.",
      avatar: "VR",
      rating: 5,
      metric: "+2,300% ROI",
    },
    {
      name: "Matias Lagos",
      role: "Medico, Inversor desde 2023",
      text: "Cero experiencia en finanzas. Hoy genero $15K mensuales pasivos mientras atiendo pacientes. La plataforma hace todo sola.",
      avatar: "ML",
      rating: 5,
      metric: "$15K/mes pasivos",
    },
  ];

  const faqs = [
    {
      q: "Es demasiado bueno para ser verdad?",
      a: "Entendemos el escepticismo. Por eso ofrecemos 30 dias de prueba gratis sin tarjeta. Ve los resultados con tus propios ojos. Nuestros +12,500 usuarios activos son la mejor prueba.",
    },
    {
      q: "Cuanto puedo ganar realisticamente?",
      a: "Depende de tu capital inicial. Nuestro ROI promedio es 347% anual. Con $10K, usuarios tipicos generan entre $2K-5K mensuales. Con $100K+, hablamos de ganancias de 6 cifras.",
    },
    {
      q: "Necesito experiencia en trading?",
      a: "Absolutamente NO. El 78% de nuestros usuarios nunca habian invertido antes. La IA hace todo el trabajo. Tu solo depositas y retiras ganancias.",
    },
    {
      q: "Mis fondos estan 100% seguros?",
      a: "Garantia total. Encriptacion militar, seguro hasta $10M por cuenta, auditado por Deloitte y PwC. Nunca hemos tenido un solo incidente de seguridad en 3 anos.",
    },
    {
      q: "Por que no lo usan todos?",
      a: "Porque mantenemos acceso limitado para garantizar rentabilidad. Solo aceptamos 500 nuevos usuarios por mes. Las plazas de este mes estan al 89% de capacidad.",
    },
  ];

  const logos = ["Bloomberg", "Reuters", "Forbes", "TechCrunch", "Financial Times", "Wall Street Journal", "CNBC", "Business Insider"];

  const productFeatures = [
    {
      title: "Análisis Predictivo con IA",
      description: "Nuestro motor de inteligencia artificial analiza millones de puntos de datos en tiempo real para predecir movimientos del mercado con 99.2% de precisión.",
      stats: ["99.2% precisión", "72h de anticipación", "10+ años de datos"],
      icon: Cpu,
    },
    {
      title: "Trading Automatizado 24/7",
      description: "Sistema que opera automáticamente las 24 horas del día, ejecutando operaciones en milisegundos cuando detecta oportunidades de ganancia.",
      stats: ["24/7 operativo", "Ejecución < 10ms", "Stop-loss inteligente"],
      icon: Zap,
    },
    {
      title: "Señales Institucionales VIP",
      description: "Acceso exclusivo a las mismas señales que utilizan los fondos de inversión más grandes de Wall Street para sus operaciones.",
      stats: ["Señales cada 15min", "87%+ tasa de éxito", "Alertas instantáneas"],
      icon: TrendingUp,
    },
  ];

  const caseStudies = [
    {
      name: "Sebastián Fernández",
      role: "Ex-Goldman Sachs Trader",
      period: "6 meses",
      initialInvestment: "$50,000",
      currentValue: "$897,000",
      roi: "+1,694%",
      avatar: "SF",
      story: "Después de 12 años en Wall Street, decidí probar CUMBRE con mi capital personal. En solo 6 meses, superé lo que ganaba en Goldman en 3 años. La IA es increíblemente precisa.",
      results: [
        { metric: "ROI Total", value: "+1,694%" },
        { metric: "Ganancias Mensuales", value: "$141K" },
        { metric: "Mejor Trade", value: "+$327K" },
      ],
    },
    {
      name: "Valentina Rossi",
      role: "Emprendedora Digital",
      period: "14 meses",
      initialInvestment: "$50,000",
      currentValue: "$1,200,000",
      roi: "+2,300%",
      avatar: "VR",
      story: "Sin experiencia en trading, comencé con $50K que había ahorrado de mi negocio. Hoy genero más con CUMBRE que con mi empresa, todo de forma pasiva mientras viajo.",
      results: [
        { metric: "ROI Total", value: "+2,300%" },
        { metric: "Ingreso Pasivo", value: "$85K/mes" },
        { metric: "Tiempo Invertido", value: "< 2h/mes" },
      ],
    },
    {
      name: "Dr. Matías Lagos",
      role: "Médico Cirujano",
      period: "9 meses",
      initialInvestment: "$20,000",
      currentValue: "$156,000",
      roi: "+680%",
      avatar: "ML",
      story: "Como médico, no tenía tiempo para aprender trading. CUMBRE hace todo automáticamente. Ahora genero $15K mensuales mientras sigo con mi práctica médica.",
      results: [
        { metric: "ROI Total", value: "+680%" },
        { metric: "Ingreso Pasivo", value: "$15K/mes" },
        { metric: "Tiempo Dedicado", value: "30min/semana" },
      ],
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.page} ref={containerRef} suppressHydrationWarning>
      {/* NAVBAR PREMIUM */}
      <motion.nav 
        className={styles.navbar}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CumbreLogo size={32} />
            </motion.div>
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoText}>CUMBRE</span>
              <span className={styles.logoTagline}>ELITE INVESTING</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            <motion.a 
              href="#producto"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Producto
            </motion.a>
            <motion.a 
              href="#casos"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Casos
            </motion.a>
            <motion.a 
              href="#faq"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              FAQ
            </motion.a>
          </div>

          <div className={styles.navActions}>
            {isAuthenticated ? (
              <div className={styles.userMenuContainer} ref={userMenuRef}>
                <button
                  className={styles.userAvatar}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Clicked! Current state:', showUserMenu);
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  LS
                </button>
                {showUserMenu && (
                  <div className={styles.userMenu}>
                    <Link href="/dashboard" className={styles.menuItem}>
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/talento" className={styles.menuItem}>
                      <Briefcase size={16} />
                      <span>Talento</span>
                    </Link>
                    <Link href="/mensajes" className={styles.menuItem}>
                      <MessageCircle size={16} />
                      <span>Mensajes</span>
                    </Link>
                    <Link href="/perfil" className={styles.menuItem}>
                      <User size={16} />
                      <span>Perfil</span>
                    </Link>
                    <div className={styles.menuDivider} />
                    <button onClick={handleLogout} className={styles.menuItem}>
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <motion.button 
                  className={styles.navLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = "/login"}
                >
                  Ingresar
                </motion.button>
                <motion.button 
                  className={styles.navCta}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(230, 179, 126, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = "/registro"}
                >
                  <span>Comenzar</span>
                  <ArrowRight size={18} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay} />
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
          <div className={styles.glowOrb3} />
        </div>

        <motion.div 
          className={styles.heroContent}
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className={styles.heroBadge}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} />
            <span>🔥 Solo 56 plazas disponibles este mes</span>
            <div className={styles.badgePulse} />
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            El futuro de tus
            <br />
            <span className={styles.heroGradient}>inversiones es hoy.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            La IA de Wall Street que genera <strong>+347% ROI promedio</strong>.
            <br className={styles.brDesktop} />
            12,500+ inversores ya estan ganando. ¿Y tu?
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button 
              onClick={() => window.location.href = '/login'}
              className={styles.ctaPrimary}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>Quiero empezar a ganar</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </button>
            <button 
              className={styles.ctaSecondary}
              onClick={() => {
                setActiveProductTab('casos');
                document.getElementById('producto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play size={16} />
              <span>Ver casos de exito</span>
            </button>
          </motion.div>

          <motion.div
            className={styles.urgencyBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className={styles.urgencyDot} />
            <span>47 personas estan viendo esta pagina ahora</span>
          </motion.div>

          <motion.div
            className={styles.heroMetrics}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {metrics.map((metric, i) => (
              <div key={i} className={styles.metric}>
                <span className={styles.metricValue}>
                  {metric.prefix}<AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <MousePointer size={20} />
          </motion.div>
          <span>Scroll para explorar</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          LOGOS SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.logos}>
        <p>Como visto en</p>
        <div className={styles.logoTrack}>
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className={styles.logoItem}>{logo}</span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          PRODUCTO Y CASOS SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.productSection} id="producto">
        <div className={styles.container}>
          {/* TABS */}
          <div className={styles.productTabs}>
            <button
              className={`${styles.productTab} ${activeProductTab === 'producto' ? styles.active : ''}`}
              onClick={() => setActiveProductTab('producto')}
            >
              Producto
            </button>
            <button
              className={`${styles.productTab} ${activeProductTab === 'casos' ? styles.active : ''}`}
              onClick={() => setActiveProductTab('casos')}
            >
              Casos
            </button>
          </div>

          {/* PRODUCTO TAB CONTENT */}
          {activeProductTab === 'producto' && (
            <motion.div
              className={styles.productContent}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.productHeader}>
                <span className={styles.sectionTag}>🚀 Tecnología Premium</span>
                <h2>El producto que multiplica tu capital</h2>
                <p>La plataforma más avanzada de trading automatizado con IA. Todo lo que necesitas para generar riqueza.</p>
              </div>

              <div className={styles.productGrid}>
                {productFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      className={styles.productCard}
                      initial={false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <div className={styles.productIcon}>
                        <Icon size={32} />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                      <div className={styles.productStats}>
                        {feature.stats.map((stat, j) => (
                          <span key={j} className={styles.productStat}>
                            <CheckCircle size={14} />
                            {stat}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className={styles.productCta}
                initial={false}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <button
                  className={styles.ctaPrimary}
                  onClick={() => window.location.href = '/registro'}
                >
                  <span>Comenzar Ahora</span>
                  <ArrowRight size={18} />
                </button>
                <p className={styles.productCtaNote}>
                  <Lock size={14} />
                  30 días de garantía o devolución total
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* CASOS TAB CONTENT */}
          {activeProductTab === 'casos' && (
            <motion.div
              className={styles.casesContent}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              id="casos"
            >
              <div className={styles.productHeader}>
                <span className={styles.sectionTag}>✨ Historias Reales</span>
                <h2>Casos de éxito verificados</h2>
                <p>Resultados reales de personas reales. Todos los datos han sido auditados y verificados por terceros.</p>
              </div>

              <div className={styles.casesGrid}>
                <div className={styles.casesList}>
                  {caseStudies.map((study, i) => (
                    <motion.button
                      key={i}
                      className={`${styles.caseItem} ${activeCaseStudy === i ? styles.active : ''}`}
                      onClick={() => setActiveCaseStudy(i)}
                      initial={false}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={styles.caseAvatar}>{study.avatar}</div>
                      <div className={styles.caseInfo}>
                        <strong>{study.name}</strong>
                        <span>{study.role}</span>
                        <div className={styles.caseRoi}>{study.roi}</div>
                      </div>
                      <ArrowRight size={18} className={styles.caseArrow} />
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  key={activeCaseStudy}
                  className={styles.caseDetail}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.caseDetailHeader}>
                    <div className={styles.caseDetailAvatar}>
                      {caseStudies[activeCaseStudy].avatar}
                    </div>
                    <div>
                      <h3>{caseStudies[activeCaseStudy].name}</h3>
                      <p>{caseStudies[activeCaseStudy].role}</p>
                    </div>
                  </div>

                  <div className={styles.caseMetrics}>
                    <div className={styles.caseMetric}>
                      <span className={styles.caseMetricLabel}>Inversión Inicial</span>
                      <span className={styles.caseMetricValue}>{caseStudies[activeCaseStudy].initialInvestment}</span>
                    </div>
                    <div className={styles.caseMetric}>
                      <span className={styles.caseMetricLabel}>Valor Actual</span>
                      <span className={styles.caseMetricValue}>{caseStudies[activeCaseStudy].currentValue}</span>
                    </div>
                    <div className={styles.caseMetric}>
                      <span className={styles.caseMetricLabel}>Período</span>
                      <span className={styles.caseMetricValue}>{caseStudies[activeCaseStudy].period}</span>
                    </div>
                  </div>

                  <p className={styles.caseStory}>&ldquo;{caseStudies[activeCaseStudy].story}&rdquo;</p>

                  <div className={styles.caseResults}>
                    {caseStudies[activeCaseStudy].results.map((result, i) => (
                      <div key={i} className={styles.caseResult}>
                        <span className={styles.caseResultLabel}>{result.metric}</span>
                        <span className={styles.caseResultValue}>{result.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className={styles.casesCta}
                initial={false}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.casesCtaBox}>
                  <Sparkles size={32} />
                  <div>
                    <h3>¿Listo para tu historia de éxito?</h3>
                    <p>Únete a los 12,500+ inversores que ya están cambiando su vida</p>
                  </div>
                  <button
                    className={styles.ctaPrimary}
                    onClick={() => window.location.href = '/registro'}
                  >
                    <span>Empezar Ahora</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionTag}>💎 Exclusivo</span>
            <h2>El secreto de los millonarios</h2>
            <p>Tecnologia que antes solo existia para el 0.1%. Ahora es tuya.</p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  className={`${styles.featureCard} ${styles[feature.color]}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setActiveFeature(i)}
                >
                  <div className={styles.featureIcon}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                    <span className={styles.featureHighlight}>{feature.highlight}</span>
                  </div>
                  <div className={styles.featureGlow} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.testimonials} id="testimonials">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionTag}>✨ Historias Reales</span>
            <h2>Ellos ya cambiaron su vida</h2>
            <p>Personas comunes que hoy viven de sus inversiones. Tu puedes ser el siguiente.</p>
          </motion.div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className={styles.testimonialMetric}>{t.metric}</div>
                <div className={styles.testimonialStars}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#E6B37E" color="#E6B37E" />
                  ))}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.faq} id="faq">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionTag}>FAQ</span>
            <h2>Preguntas frecuentes</h2>
            <p>Todo lo que necesitas saber para empezar.</p>
          </motion.div>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.open : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className={styles.faqIcon} />
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOrb1} />
          <div className={styles.ctaOrb2} />
        </div>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>¿Cuanto tiempo mas vas a esperar?</h2>
            <p>Cada dia que pasa es dinero que dejas en la mesa. 12,500+ ya estan ganando.</p>
            <div className={styles.ctaActions}>
              <button onClick={() => window.location.href = '/login'} className={styles.ctaPrimary}>
                <span>Reclamar mi lugar ahora</span>
                <ArrowRight size={18} />
              </button>
              <Link href="/dashboard" className={styles.ctaGhost}>
                <span>Ver demostración</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className={styles.ctaGuarantee}>
              <Shield size={20} />
              <span>Garantia de devolucion de 30 dias - Sin preguntas</span>
            </div>
            <div className={styles.ctaTrust}>
              <div className={styles.trustItem}>
                <Check size={16} />
                <span>Gratis por 30 dias</span>
              </div>
              <div className={styles.trustItem}>
                <Check size={16} />
                <span>Sin tarjeta requerida</span>
              </div>
              <div className={styles.trustItem}>
                <Check size={16} />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FOOTER PREMIUM
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <CumbreLogo size={36} />
                </motion.div>
                <span className={styles.footerLogoText}>CUMBRE</span>
              </Link>
              <p className={styles.footerDesc}>
                La plataforma de inversión #1 de Latinoamérica.
                <br />
                Potenciada por IA de última generación.
              </p>
              <div className={styles.footerBadges}>
                <div className={styles.footerBadge}>
                  <Shield size={14} />
                  <span>SOC 2 Type II</span>
                </div>
                <div className={styles.footerBadge}>
                  <Lock size={14} />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div className={styles.footerCol}>
              <h4 className={styles.footerTitle}>PRODUCTO</h4>
              <nav className={styles.footerLinks}>
                <Link href="/features">Features</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/api">API Docs</Link>
                <Link href="/changelog">Changelog</Link>
              </nav>
            </div>

            {/* Company Column */}
            <div className={styles.footerCol}>
              <h4 className={styles.footerTitle}>EMPRESA</h4>
              <nav className={styles.footerLinks}>
                <Link href="/blog">Blog</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contacto">Contacto</Link>
                <Link href="/partners">Partners</Link>
              </nav>
            </div>

            {/* Legal Column */}
            <div className={styles.footerCol}>
              <h4 className={styles.footerTitle}>LEGAL</h4>
              <nav className={styles.footerLinks}>
                <Link href="/terms">Términos</Link>
                <Link href="/privacy">Privacidad</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/licenses">Licencias</Link>
              </nav>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              <p>&copy; 2025 Cumbre Technologies. Todos los derechos reservados.</p>
              <p className={styles.footerSubtext}>Hecho con 🤍 en Buenos Aires, Argentina</p>
            </div>
            
            <div className={styles.footerSocial}>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

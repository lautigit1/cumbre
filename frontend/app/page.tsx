"use client";

import Link from "next/link";
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

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

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.page} ref={containerRef}>
      {/* NAVBAR */}
      <motion.nav 
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <CumbreLogo size={36} />
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoText}>CUMBRE</span>
              <span className={styles.logoTagline}>Inversiones IA</span>
            </div>
          </Link>
          <div className={styles.navLinks}>
            <Link href="#features">Producto</Link>
            <Link href="#testimonials">Casos</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="/login" className={styles.navCta}>
              Comenzar
              <ArrowRight size={16} />
            </Link>
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles size={14} />
            <span>🔥 Solo 56 plazas disponibles este mes</span>
            <div className={styles.badgePulse} />
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            El futuro de tus
            <br />
            <span className={styles.heroGradient}>inversiones es hoy.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA de Wall Street que genera <strong>+347% ROI promedio</strong>.
            <br className={styles.brDesktop} />
            12,500+ inversores ya estan ganando. ¿Y tu?
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link 
              href="/login" 
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
            </Link>
            <button className={styles.ctaSecondary}>
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
              <Link href="/login" className={styles.ctaPrimary}>
                <span>Reclamar mi lugar ahora</span>
                <ArrowRight size={18} />
              </Link>
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
          FOOTER
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <CumbreLogo size={32} />
                <span>CUMBRE</span>
              </Link>
              <p>La plataforma de inversion #1 de Latinoamerica. Potenciada por IA de ultima generacion.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <h4>Producto</h4>
                <Link href="#">Features</Link>
                <Link href="#">Pricing</Link>
                <Link href="#">API Docs</Link>
                <Link href="#">Changelog</Link>
              </div>
              <div className={styles.footerCol}>
                <h4>Empresa</h4>
                <Link href="#">Blog</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Contacto</Link>
                <Link href="#">Partners</Link>
              </div>
              <div className={styles.footerCol}>
                <h4>Legal</h4>
                <Link href="#">Terminos</Link>
                <Link href="#">Privacidad</Link>
                <Link href="#">Cookies</Link>
                <Link href="#">Licencias</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 Cumbre Technologies. Todos los derechos reservados.</p>
            <div className={styles.footerSocial}>
              <span>Twitter</span>
              <span>LinkedIn</span>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

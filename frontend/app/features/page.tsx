'use client';

import Link from 'next/link';
import { ArrowLeft, Cpu, TrendingUp, Shield, Zap, LineChart, Users, Lock, BarChart3, Sparkles, Globe, CheckCircle } from 'lucide-react';
import styles from './features.module.scss';

export default function FeaturesPage() {
  const features = [
    {
      icon: Cpu,
      title: "IA Predictiva Avanzada",
      description: "Algoritmos de machine learning que analizan millones de datos en tiempo real para predecir movimientos del mercado con 99.2% de precisión.",
      benefits: [
        "Análisis predictivo 72h adelantado",
        "Modelos entrenados con 10+ años de data",
        "Actualización continua del algoritmo",
        "Backtesting con datos históricos"
      ]
    },
    {
      icon: TrendingUp,
      title: "Trading Automatizado",
      description: "Sistema de trading automático que ejecuta operaciones las 24 horas del día, maximizando cada oportunidad de ganancia sin intervención manual.",
      benefits: [
        "Operaciones automáticas 24/7",
        "Ejecución en milisegundos",
        "Stop-loss inteligente",
        "Take-profit optimizado"
      ]
    },
    {
      icon: Shield,
      title: "Seguridad Militar",
      description: "Infraestructura de seguridad con encriptación de nivel militar, auditada por las Big4 y certificada con los más altos estándares internacionales.",
      benefits: [
        "Encriptación AES-256",
        "Autenticación multifactor",
        "Cold storage para fondos",
        "Seguro hasta $10M por cuenta"
      ]
    },
    {
      icon: LineChart,
      title: "Señales en Tiempo Real",
      description: "Acceso exclusivo a señales de trading institucionales utilizadas por los mayores hedge funds de Wall Street.",
      benefits: [
        "Señales VIP cada 15 minutos",
        "Alertas push instantáneas",
        "Análisis técnico profesional",
        "Ratios de éxito 87%+"
      ]
    },
    {
      icon: BarChart3,
      title: "Dashboard Profesional",
      description: "Panel de control intuitivo con métricas en tiempo real, gráficos avanzados y reportes detallados de tu portfolio.",
      benefits: [
        "Métricas en tiempo real",
        "Gráficos interactivos TradingView",
        "Reportes de performance",
        "Exportación de datos"
      ]
    },
    {
      icon: Users,
      title: "Comunidad Elite",
      description: "Únete a una comunidad privada de 12,500+ inversores exitosos. Networking, mentorías y estrategias exclusivas.",
      benefits: [
        "Chat privado 24/7",
        "Webinars semanales",
        "Mentoría 1 a 1",
        "Estrategias compartidas"
      ]
    },
    {
      icon: Zap,
      title: "Ejecución Ultra-Rápida",
      description: "Infraestructura con latencia ultra-baja conectada directamente a los principales exchanges para ejecución instantánea.",
      benefits: [
        "Latencia < 10ms",
        "Servidores colocados",
        "Conexión directa exchanges",
        "99.99% uptime"
      ]
    },
    {
      icon: Lock,
      title: "Cumplimiento Regulatorio",
      description: "100% regulado y auditado por organismos internacionales. Cumplimiento total con normativas KYC y AML.",
      benefits: [
        "Licencia regulatoria activa",
        "Auditorías Big4 trimestrales",
        "Cumplimiento KYC/AML",
        "Transparencia total"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Mercado",
      description: "Opera en múltiples mercados globales: acciones, forex, cripto, commodities y más desde una sola plataforma.",
      benefits: [
        "50+ mercados disponibles",
        "200+ activos tradeable",
        "Forex, cripto, acciones",
        "Commodities y futuros"
      ]
    }
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          
          <div>
            <h1 className={styles.title}>
              Características <span className={styles.gradient}>Premium</span>
            </h1>
            <p className={styles.subtitle}>
              Tecnología de punta que transforma tu forma de invertir
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <feature.icon size={28} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
                
                <ul className={styles.benefitsList}>
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <Sparkles size={40} className={styles.ctaIcon} />
          <h2>¿Listo para experimentar el futuro?</h2>
          <p>Únete a más de 12,500 inversores que ya están maximizando sus ganancias</p>
          <Link href="/registro" className={styles.ctaBtn}>
            Comenzar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
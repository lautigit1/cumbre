'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Zap, Crown } from 'lucide-react';
import styles from './pricing.module.scss';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "0",
      period: "30 días gratis",
      description: "Perfecto para comenzar tu viaje de inversión",
      features: [
        "Acceso a IA básica",
        "5 señales diarias",
        "Dashboard básico",
        "Hasta $10K capital",
        "Soporte email 24h",
        "Comunidad pública"
      ],
      cta: "Comenzar gratis",
      popular: false
    },
    {
      name: "Professional",
      icon: Sparkles,
      price: "149",
      period: "/mes",
      description: "Para inversores serios que buscan resultados",
      features: [
        "IA predictiva avanzada",
        "Señales ilimitadas",
        "Dashboard profesional",
        "Hasta $100K capital",
        "Soporte prioritario 24/7",
        "Trading automático",
        "Análisis técnico avanzado",
        "Reportes detallados",
        "Comunidad VIP"
      ],
      cta: "Elegir plan",
      popular: true
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "499",
      period: "/mes",
      description: "Máximo poder para inversores institucionales",
      features: [
        "Todo de Professional +",
        "IA con modelos personalizados",
        "Capital ilimitado",
        "Account manager dedicado",
        "Soporte telefónico directo",
        "API access completo",
        "Multi-cuenta",
        "Reportes personalizados",
        "Sesiones estratégicas 1:1",
        "Acceso a fondo hedge privado"
      ],
      cta: "Contactar ventas",
      popular: false
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
              Planes <span className={styles.gradient}>Transparentes</span>
            </h1>
            <p className={styles.subtitle}>
              Elige el plan perfecto para tu estrategia de inversión. Sin sorpresas, sin letra chica.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
              >
                {plan.popular && (
                  <div className={styles.badge}>
                    <Sparkles size={14} />
                    <span>Más Popular</span>
                  </div>
                )}

                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <plan.icon size={28} />
                  </div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDesc}>{plan.description}</p>
                </div>

                <div className={styles.pricing}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.period}>{plan.period}</span>
                  </div>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.name === "Enterprise" ? "#contact" : "/registro"}
                  className={`${styles.ctaBtn} ${plan.popular ? styles.ctaPrimary : ''}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>Preguntas Frecuentes</h2>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>¿Puedo cambiar de plan en cualquier momento?</h4>
              <p>Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican inmediatamente.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h4>¿Hay período de prueba?</h4>
              <p>Todos los planes incluyen 30 días de garantía de devolución. Sin preguntas.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h4>¿Qué métodos de pago aceptan?</h4>
              <p>Aceptamos tarjetas de crédito, débito, transferencias bancarias y criptomonedas.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h4>¿Hay comisiones ocultas?</h4>
              <p>No. El precio que ves es el precio que pagas. Cero comisiones ocultas, cero sorpresas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

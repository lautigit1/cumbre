'use client';

import Link from 'next/link';
import { ArrowLeft, Handshake, TrendingUp, Globe, Award } from 'lucide-react';
import styles from './partners.module.scss';

export default function PartnersPage() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          
          <div>
            <h1 className={styles.title}>
              <span className={styles.gradient}>Partners</span>
            </h1>
            <p className={styles.subtitle}>
              Construyamos el futuro del trading juntos
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2>Por qué ser partner de CUMBRE</h2>
            <p>
              Únete a nuestro ecosistema de partners y accede a tecnología de clase mundial, 
              comisiones atractivas y soporte dedicado para hacer crecer tu negocio.
            </p>
          </div>

          <div className={styles.benefits}>
            <div 
              className={styles.benefitCard}
            >
              <TrendingUp size={40} />
              <h3>Comisiones Competitivas</h3>
              <p>Hasta 30% de comisión recurrente por cada cliente referido. Modelo escalable y transparente.</p>
            </div>

            <div 
              className={styles.benefitCard}
            >
              <Handshake size={40} />
              <h3>Soporte Dedicado</h3>
              <p>Account manager asignado, materiales de marketing y formación continua para tu equipo.</p>
            </div>

            <div 
              className={styles.benefitCard}
            >
              <Globe size={40} />
              <h3>Tecnología Avanzada</h3>
              <p>Acceso a APIs, white-label solutions y herramientas de integración de última generación.</p>
            </div>
          </div>

          <div className={styles.types}>
            <h2>Tipos de Partnership</h2>
            
            <div 
              className={styles.typeCard}
            >
              <div className={styles.typeHeader}>
                <Award size={32} />
                <div>
                  <h3>Technology Partner</h3>
                  <p className={styles.typeDesc}>Para empresas fintech, exchanges y proveedores de infraestructura</p>
                </div>
              </div>
              <ul className={styles.typeFeatures}>
                <li>Integración API completa</li>
                <li>Co-branding opportunities</li>
                <li>Soporte técnico prioritario</li>
                <li>Revenue sharing personalizado</li>
              </ul>
              <Link href="#" className={styles.typeBtn}>Solicitar Partnership</Link>
            </div>

            <div 
              className={styles.typeCard}
            >
              <div className={styles.typeHeader}>
                <TrendingUp size={32} />
                <div>
                  <h3>Affiliate Partner</h3>
                  <p className={styles.typeDesc}>Para influencers, educadores y comunidades de trading</p>
                </div>
              </div>
              <ul className={styles.typeFeatures}>
                <li>Comisión del 25% recurrente</li>
                <li>Dashboard de analytics en tiempo real</li>
                <li>Materiales de marketing personalizados</li>
                <li>Pagos mensuales automáticos</li>
              </ul>
              <Link href="#" className={styles.typeBtn}>Aplicar como Afiliado</Link>
            </div>

            <div 
              className={styles.typeCard}
            >
              <div className={styles.typeHeader}>
                <Globe size={32} />
                <div>
                  <h3>Reseller Partner</h3>
                  <p className={styles.typeDesc}>Para brokers, consultoras y empresas de servicios financieros</p>
                </div>
              </div>
              <ul className={styles.typeFeatures}>
                <li>White-label solution disponible</li>
                <li>Márgenes de hasta 40%</li>
                <li>Soporte multiidioma</li>
                <li>Formación y certificación incluida</li>
              </ul>
              <Link href="#" className={styles.typeBtn}>Convertirse en Reseller</Link>
            </div>
          </div>

          <div className={styles.cta}>
            <h2>¿Listo para comenzar?</h2>
            <p>Completa el formulario y nuestro equipo se pondrá en contacto en menos de 24 horas.</p>
            <Link href="/contacto" className={styles.ctaBtn}>Contactar Equipo de Partnerships</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

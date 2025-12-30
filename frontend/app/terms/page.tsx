'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import styles from './legal.module.scss';

export default function TermsPage() {
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
              Términos y <span className={styles.gradient}>Condiciones</span>
            </h1>
            <p className={styles.subtitle}>
              Última actualización: 15 de Enero de 2024
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div 
            className={styles.document}
          >
            <div className={styles.toc}>
              <h3>Contenido</h3>
              <ul>
                <li><a href="#aceptacion">1. Aceptación de Términos</a></li>
                <li><a href="#servicios">2. Descripción de Servicios</a></li>
                <li><a href="#cuenta">3. Cuenta de Usuario</a></li>
                <li><a href="#riesgos">4. Riesgos de Trading</a></li>
                <li><a href="#pagos">5. Pagos y Facturación</a></li>
                <li><a href="#propiedad">6. Propiedad Intelectual</a></li>
                <li><a href="#limitacion">7. Limitación de Responsabilidad</a></li>
                <li><a href="#modificaciones">8. Modificaciones</a></li>
              </ul>
            </div>

            <div className={styles.section} id="aceptacion">
              <h2>1. Aceptación de Términos</h2>
              <p>
                Al acceder y utilizar la plataforma CUMBRE, usted acepta estar sujeto a estos 
                Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, 
                no debe utilizar nuestros servicios.
              </p>
              <p>
                Estos términos constituyen un acuerdo legal entre usted y CUMBRE S.A., 
                con domicilio en Buenos Aires, Argentina.
              </p>
            </div>

            <div className={styles.section} id="servicios">
              <h2>2. Descripción de Servicios</h2>
              <p>
                CUMBRE proporciona una plataforma de trading algorítmico y análisis de mercados 
                financieros mediante inteligencia artificial. Nuestros servicios incluyen:
              </p>
              <ul>
                <li>Señales de trading en tiempo real</li>
                <li>Análisis predictivo mediante modelos de IA</li>
                <li>Dashboard profesional de gestión de portafolio</li>
                <li>API para integración con brokers y exchanges</li>
                <li>Herramientas de backtesting y simulación</li>
              </ul>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier 
                aspecto de nuestros servicios en cualquier momento.
              </p>
            </div>

            <div className={styles.section} id="cuenta">
              <h2>3. Cuenta de Usuario</h2>
              <p>
                Para utilizar CUMBRE, debe crear una cuenta proporcionando información precisa 
                y completa. Usted es responsable de:
              </p>
              <ul>
                <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                <li>Todas las actividades que ocurran bajo su cuenta</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                <li>Cumplir con las leyes y regulaciones aplicables en su jurisdicción</li>
              </ul>
              <p>
                Debe tener al menos 18 años para crear una cuenta. Nos reservamos el derecho 
                de suspender o cancelar cuentas que violen estos términos.
              </p>
            </div>

            <div className={styles.section} id="riesgos">
              <h2>4. Riesgos de Trading</h2>
              <div className={styles.warning}>
                <p><strong>ADVERTENCIA IMPORTANTE:</strong></p>
                <p>
                  El trading de instrumentos financieros conlleva un alto nivel de riesgo y 
                  puede no ser adecuado para todos los inversores. Puede perder parte o la 
                  totalidad de su capital invertido.
                </p>
              </div>
              <p>
                Las señales y análisis proporcionados por CUMBRE son únicamente con fines 
                informativos y no constituyen asesoramiento financiero. Usted es el único 
                responsable de sus decisiones de inversión.
              </p>
              <p>
                Los rendimientos pasados no garantizan resultados futuros. Los modelos de IA 
                pueden fallar y no hay garantía de precisión en las predicciones.
              </p>
            </div>

            <div className={styles.section} id="pagos">
              <h2>5. Pagos y Facturación</h2>
              <p>
                Los planes de suscripción se facturan de forma anticipada según el ciclo elegido 
                (mensual o anual). Los precios están sujetos a cambios con 30 días de aviso previo.
              </p>
              <ul>
                <li>No ofrecemos reembolsos por cancelaciones anticipadas</li>
                <li>Las suscripciones se renuevan automáticamente</li>
                <li>Puede cancelar su suscripción en cualquier momento desde su dashboard</li>
                <li>Aceptamos tarjetas de crédito, débito y criptomonedas</li>
              </ul>
            </div>

            <div className={styles.section} id="propiedad">
              <h2>6. Propiedad Intelectual</h2>
              <p>
                Todo el contenido, diseño, código, modelos de IA, algoritmos y materiales de 
                CUMBRE son propiedad exclusiva de CUMBRE S.A. y están protegidos por leyes de 
                propiedad intelectual.
              </p>
              <p>
                Está prohibido copiar, modificar, distribuir o crear trabajos derivados sin 
                autorización expresa por escrito.
              </p>
            </div>

            <div className={styles.section} id="limitacion">
              <h2>7. Limitación de Responsabilidad</h2>
              <p>
                CUMBRE no será responsable por daños directos, indirectos, incidentales, 
                especiales o consecuentes que resulten del uso o la imposibilidad de usar 
                nuestros servicios, incluyendo pero no limitado a:
              </p>
              <ul>
                <li>Pérdidas financieras por decisiones de trading</li>
                <li>Interrupciones del servicio o errores técnicos</li>
                <li>Errores en señales, análisis o predicciones de IA</li>
                <li>Pérdida de datos o información</li>
              </ul>
            </div>

            <div className={styles.section} id="modificaciones">
              <h2>8. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigencia tras su publicación en esta página.
              </p>
              <p>
                El uso continuado de nuestros servicios después de cambios en los términos 
                constituye su aceptación de dichos cambios.
              </p>
            </div>

            <div className={styles.contact}>
              <FileText size={24} />
              <div>
                <h3>¿Preguntas sobre estos términos?</h3>
                <p>Contáctanos en <a href="mailto:legal@cumbre.io">legal@cumbre.io</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

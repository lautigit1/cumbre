'use client';

import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import styles from '../terms/legal.module.scss';

export default function CookiesPage() {
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
              Política de <span className={styles.gradient}>Cookies</span>
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
                <li><a href="#que-son">1. ¿Qué son las Cookies?</a></li>
                <li><a href="#tipos">2. Tipos de Cookies que Usamos</a></li>
                <li><a href="#proposito">3. Propósito de las Cookies</a></li>
                <li><a href="#terceros">4. Cookies de Terceros</a></li>
                <li><a href="#gestion">5. Gestión de Cookies</a></li>
                <li><a href="#actualizaciones">6. Actualizaciones</a></li>
              </ul>
            </div>

            <div className={styles.section} id="que-son">
              <h2>1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo 
                cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios 
                web funcionen de manera más eficiente y proporcionen información a los propietarios.
              </p>
              <p>
                CUMBRE utiliza cookies para mejorar su experiencia, recordar sus preferencias 
                y proporcionar funcionalidades esenciales de la plataforma.
              </p>
            </div>

            <div className={styles.section} id="tipos">
              <h2>2. Tipos de Cookies que Usamos</h2>
              
              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Cookies Esenciales (Obligatorias)
              </h3>
              <p>
                Estas cookies son necesarias para el funcionamiento básico de la plataforma. 
                Sin ellas, no podríamos proporcionar servicios esenciales como autenticación 
                y seguridad.
              </p>
              <ul>
                <li><strong>auth_token:</strong> Mantiene su sesión activa (duración: 30 días)</li>
                <li><strong>csrf_token:</strong> Protección contra ataques CSRF (duración: sesión)</li>
                <li><strong>session_id:</strong> Identificador único de sesión (duración: sesión)</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Cookies Funcionales (Opcionales)
              </h3>
              <p>
                Estas cookies permiten recordar sus elecciones y preferencias para mejorar 
                su experiencia personalizada.
              </p>
              <ul>
                <li><strong>theme_preference:</strong> Tema claro/oscuro seleccionado (duración: 1 año)</li>
                <li><strong>language:</strong> Idioma preferido (duración: 1 año)</li>
                <li><strong>dashboard_layout:</strong> Configuración del dashboard (duración: 6 meses)</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Cookies de Analytics (Opcionales)
              </h3>
              <p>
                Nos ayudan a entender cómo los usuarios interactúan con la plataforma para 
                realizar mejoras continuas.
              </p>
              <ul>
                <li><strong>_ga:</strong> Google Analytics - Distingue usuarios (duración: 2 años)</li>
                <li><strong>_gid:</strong> Google Analytics - Distingue sesiones (duración: 24 horas)</li>
                <li><strong>cumbre_analytics:</strong> Métricas internas (duración: 1 año)</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Cookies de Marketing (Opcionales)
              </h3>
              <p>
                Utilizadas para mostrar publicidad relevante y medir la efectividad de campañas.
              </p>
              <ul>
                <li><strong>_fbp:</strong> Facebook Pixel - Tracking de conversiones (duración: 3 meses)</li>
                <li><strong>referral_source:</strong> Fuente de referencia (duración: 30 días)</li>
              </ul>
            </div>

            <div className={styles.section} id="proposito">
              <h2>3. Propósito de las Cookies</h2>
              <p>Utilizamos cookies para:</p>
              <ul>
                <li>Mantener su sesión activa y segura</li>
                <li>Recordar sus preferencias de idioma y tema</li>
                <li>Analizar el uso de la plataforma y detectar problemas</li>
                <li>Mejorar el rendimiento y la experiencia del usuario</li>
                <li>Personalizar contenido y recomendaciones</li>
                <li>Medir la efectividad de nuestras campañas de marketing</li>
                <li>Prevenir fraudes y actividades maliciosas</li>
              </ul>
            </div>

            <div className={styles.section} id="terceros">
              <h2>4. Cookies de Terceros</h2>
              <p>
                Además de nuestras propias cookies, utilizamos servicios de terceros que 
                pueden establecer sus propias cookies:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento</li>
                <li><strong>Stripe:</strong> Procesamiento seguro de pagos</li>
                <li><strong>Intercom:</strong> Chat de soporte en vivo</li>
                <li><strong>Facebook Pixel:</strong> Seguimiento de conversiones publicitarias</li>
              </ul>
              <p>
                Estos terceros tienen sus propias políticas de privacidad. Le recomendamos 
                revisarlas para comprender cómo manejan sus datos.
              </p>
            </div>

            <div className={styles.section} id="gestion">
              <h2>5. Gestión de Cookies</h2>
              <p>
                Tiene control total sobre las cookies que acepta. Puede gestionar sus 
                preferencias de varias maneras:
              </p>
              
              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px' }}>
                Desde su navegador:
              </h3>
              <ul>
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar cookies</li>
                <li><strong>Edge:</strong> Configuración → Cookies y permisos</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px' }}>
                Desde nuestra plataforma:
              </h3>
              <p>
                Puede ajustar sus preferencias de cookies en cualquier momento desde 
                Configuración → Privacidad → Gestión de Cookies.
              </p>

              <div className={styles.warning}>
                <p><strong>NOTA IMPORTANTE:</strong></p>
                <p>
                  Si deshabilita las cookies esenciales, algunas funcionalidades de la 
                  plataforma podrían no estar disponibles. Las cookies funcionales y de 
                  analytics son opcionales.
                </p>
              </div>
            </div>

            <div className={styles.section} id="actualizaciones">
              <h2>6. Actualizaciones</h2>
              <p>
                Podemos actualizar esta política de cookies para reflejar cambios en las 
                tecnologías que utilizamos o en la legislación aplicable.
              </p>
              <p>
                Le notificaremos sobre cambios significativos mediante un aviso en la plataforma 
                o por email si ha proporcionado su consentimiento para comunicaciones.
              </p>
            </div>

            <div className={styles.contact}>
              <Cookie size={24} />
              <div>
                <h3>¿Preguntas sobre cookies?</h3>
                <p>Contáctanos en <a href="mailto:privacy@cumbre.io">privacy@cumbre.io</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

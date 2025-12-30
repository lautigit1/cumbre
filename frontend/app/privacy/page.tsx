'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import styles from '../terms/legal.module.scss';

export default function PrivacyPage() {
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
              Política de <span className={styles.gradient}>Privacidad</span>
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
                <li><a href="#intro">1. Introducción</a></li>
                <li><a href="#recopilacion">2. Información que Recopilamos</a></li>
                <li><a href="#uso">3. Cómo Usamos su Información</a></li>
                <li><a href="#compartir">4. Compartir Información</a></li>
                <li><a href="#seguridad">5. Seguridad de Datos</a></li>
                <li><a href="#derechos">6. Sus Derechos</a></li>
                <li><a href="#cookies">7. Cookies y Tecnologías</a></li>
                <li><a href="#cambios">8. Cambios a esta Política</a></li>
              </ul>
            </div>

            <div className={styles.section} id="intro">
              <h2>1. Introducción</h2>
              <p>
                En CUMBRE, respetamos su privacidad y nos comprometemos a proteger sus datos 
                personales. Esta política explica cómo recopilamos, usamos y compartimos su 
                información cuando utiliza nuestra plataforma.
              </p>
              <p>
                Cumplimos con el GDPR (Reglamento General de Protección de Datos) europeo y 
                la Ley de Protección de Datos Personales de Argentina.
              </p>
            </div>

            <div className={styles.section} id="recopilacion">
              <h2>2. Información que Recopilamos</h2>
              <p>Recopilamos diferentes tipos de información:</p>
              
              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px' }}>
                Información que usted proporciona:
              </h3>
              <ul>
                <li>Datos de registro (nombre, email, contraseña)</li>
                <li>Información de perfil y preferencias</li>
                <li>Datos de pago y facturación</li>
                <li>Comunicaciones con soporte técnico</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px' }}>
                Información recopilada automáticamente:
              </h3>
              <ul>
                <li>Dirección IP y ubicación geográfica</li>
                <li>Tipo de dispositivo y navegador</li>
                <li>Páginas visitadas y tiempo de uso</li>
                <li>Registros de actividad en la plataforma</li>
              </ul>
            </div>

            <div className={styles.section} id="uso">
              <h2>3. Cómo Usamos su Información</h2>
              <p>Utilizamos sus datos para:</p>
              <ul>
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar pagos y gestionar su cuenta</li>
                <li>Enviar notificaciones importantes sobre su cuenta</li>
                <li>Personalizar su experiencia en la plataforma</li>
                <li>Detectar y prevenir fraudes</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Realizar análisis y mejoras de producto</li>
              </ul>
            </div>

            <div className={styles.section} id="compartir">
              <h2>4. Compartir Información</h2>
              <p>
                No vendemos sus datos personales. Solo compartimos información en las 
                siguientes circunstancias:
              </p>
              <ul>
                <li><strong>Proveedores de servicios:</strong> Procesadores de pago, hosting, analytics</li>
                <li><strong>Requisitos legales:</strong> Cuando sea requerido por ley o autoridades</li>
                <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos legales</li>
                <li><strong>Fusiones/adquisiciones:</strong> En caso de venta o transferencia de la empresa</li>
              </ul>
            </div>

            <div className={styles.section} id="seguridad">
              <h2>5. Seguridad de Datos</h2>
              <p>
                Implementamos medidas de seguridad de nivel empresarial para proteger sus datos:
              </p>
              <ul>
                <li>Encriptación SSL/TLS para todas las transmisiones</li>
                <li>Encriptación de datos en reposo (AES-256)</li>
                <li>Autenticación de dos factores (2FA) disponible</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Certificaciones SOC 2 Type II e ISO 27001</li>
                <li>Monitoreo continuo de amenazas</li>
              </ul>
            </div>

            <div className={styles.section} id="derechos">
              <h2>6. Sus Derechos</h2>
              <p>Usted tiene derecho a:</p>
              <ul>
                <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir datos incorrectos o incompletos</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                <li><strong>Restricción:</strong> Limitar cómo procesamos sus datos</li>
              </ul>
              <p>
                Para ejercer estos derechos, contáctenos en{' '}
                <a href="mailto:privacy@cumbre.io" style={{ color: '#E6B37E' }}>
                  privacy@cumbre.io
                </a>
              </p>
            </div>

            <div className={styles.section} id="cookies">
              <h2>7. Cookies y Tecnologías</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia. 
                Puede gestionar las cookies desde la configuración de su navegador.
              </p>
              <p>Tipos de cookies que usamos:</p>
              <ul>
                <li><strong>Esenciales:</strong> Necesarias para el funcionamiento básico</li>
                <li><strong>Funcionales:</strong> Recordar preferencias y configuraciones</li>
                <li><strong>Analytics:</strong> Entender cómo usa la plataforma</li>
                <li><strong>Marketing:</strong> Personalizar anuncios (con su consentimiento)</li>
              </ul>
            </div>

            <div className={styles.section} id="cambios">
              <h2>8. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política ocasionalmente. Le notificaremos sobre cambios 
                significativos por email o mediante un aviso en la plataforma.
              </p>
              <p>
                La fecha de "Última actualización" al inicio del documento indica cuándo se 
                realizó la última modificación.
              </p>
            </div>

            <div className={styles.contact}>
              <Shield size={24} />
              <div>
                <h3>¿Preguntas sobre privacidad?</h3>
                <p>Contáctanos en <a href="mailto:privacy@cumbre.io">privacy@cumbre.io</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

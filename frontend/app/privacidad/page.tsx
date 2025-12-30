'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Bell, Globe } from 'lucide-react';
import styles from './privacidad.module.scss';

export default function PrivacidadPage() {
  return (
    <div className={styles.container}>
      <div className={styles.bgGradient} />
      
      <div className={styles.content}>
        <Link href="/registro" className={styles.backButton}>
          <ArrowLeft size={20} />
          Volver al registro
        </Link>

        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Shield size={48} />
          </div>
          <h1>Política de Privacidad</h1>
          <p className={styles.lastUpdate}>Última actualización: 29 de diciembre de 2025</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Eye size={24} />
            </div>
            <h2>1. Introducción</h2>
            <p>
              En CUMBRE, valoramos su privacidad y nos comprometemos a proteger su información personal. 
              Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su 
              información cuando utiliza nuestra plataforma de soberanía digital.
            </p>
            <p>
              Al utilizar CUMBRE, usted acepta las prácticas descritas en esta política. Si no está de 
              acuerdo con alguna parte de esta política, le recomendamos que no utilice nuestros servicios.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Database size={24} />
            </div>
            <h2>2. Información que Recopilamos</h2>
            
            <h3>2.1 Información de Registro</h3>
            <p>Cuando crea una cuenta en CUMBRE, recopilamos:</p>
            <ul>
              <li><strong>Información personal:</strong> nombre, apellido, dirección de correo electrónico</li>
              <li><strong>Información de contacto:</strong> número de teléfono, dirección física (opcional)</li>
              <li><strong>Credenciales:</strong> nombre de usuario y contraseña encriptada</li>
              <li><strong>Fecha de nacimiento:</strong> para verificar que cumple con la edad mínima</li>
            </ul>

            <h3>2.2 Información de Verificación (KYC)</h3>
            <p>Para cumplir con regulaciones financieras, podemos solicitar:</p>
            <ul>
              <li>Documento de identidad (DNI, pasaporte, licencia de conducir)</li>
              <li>Comprobante de domicilio</li>
              <li>Selfie para verificación facial</li>
              <li>Información de ingresos o empleo (para transacciones de alto valor)</li>
            </ul>

            <h3>2.3 Información Financiera</h3>
            <ul>
              <li>Historial de transacciones en la plataforma</li>
              <li>Saldos de activos digitales</li>
              <li>Información de métodos de pago (encriptada)</li>
              <li>Direcciones de billeteras blockchain</li>
            </ul>

            <h3>2.4 Información de Uso</h3>
            <p>Recopilamos automáticamente información sobre cómo usa nuestra plataforma:</p>
            <ul>
              <li>Dirección IP y ubicación geográfica aproximada</li>
              <li>Tipo de dispositivo, sistema operativo y navegador</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Acciones realizadas en la plataforma</li>
              <li>Cookies y tecnologías similares</li>
            </ul>

            <h3>2.5 Información de Comunicaciones</h3>
            <ul>
              <li>Mensajes enviados y recibidos en la plataforma</li>
              <li>Correos electrónicos con soporte técnico</li>
              <li>Comentarios y valoraciones en el marketplace</li>
            </ul>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <UserCheck size={24} />
            </div>
            <h2>3. Cómo Usamos su Información</h2>
            
            <h3>3.1 Prestación de Servicios</h3>
            <ul>
              <li>Crear y administrar su cuenta</li>
              <li>Procesar transacciones y pagos</li>
              <li>Proporcionar funcionalidades de la plataforma</li>
              <li>Conectar freelancers con clientes en el marketplace</li>
              <li>Facilitar comunicaciones entre usuarios</li>
            </ul>

            <h3>3.2 Seguridad y Prevención de Fraude</h3>
            <ul>
              <li>Verificar su identidad</li>
              <li>Detectar y prevenir actividades fraudulentas</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
              <li>Proteger contra accesos no autorizados</li>
              <li>Monitorear actividad sospechosa</li>
            </ul>

            <h3>3.3 Mejora del Servicio</h3>
            <ul>
              <li>Analizar patrones de uso para mejorar la experiencia</li>
              <li>Desarrollar nuevas funcionalidades</li>
              <li>Personalizar contenido y recomendaciones</li>
              <li>Realizar investigación y análisis de mercado</li>
            </ul>

            <h3>3.4 Comunicaciones</h3>
            <ul>
              <li>Enviar notificaciones sobre su cuenta</li>
              <li>Informar sobre cambios en términos o políticas</li>
              <li>Responder a sus consultas y solicitudes</li>
              <li>Enviar actualizaciones y alertas de seguridad</li>
              <li>Marketing y promociones (solo con su consentimiento)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Globe size={24} />
            </div>
            <h2>4. Compartir Información</h2>
            
            <h3>4.1 Con Otros Usuarios</h3>
            <p>
              En el marketplace de talento, su perfil público (nombre, foto, reputación, habilidades) 
              es visible para otros usuarios. Las comunicaciones directas solo son visibles para las 
              partes involucradas.
            </p>

            <h3>4.2 Proveedores de Servicios</h3>
            <p>Compartimos información con terceros que nos ayudan a operar la plataforma:</p>
            <ul>
              <li><strong>Procesadores de pago:</strong> para procesar transacciones</li>
              <li><strong>Servicios de hosting:</strong> para almacenar datos</li>
              <li><strong>Servicios de verificación:</strong> para KYC/AML</li>
              <li><strong>Análisis:</strong> para comprender el uso de la plataforma</li>
              <li><strong>Email y notificaciones:</strong> para comunicaciones</li>
            </ul>
            <p>
              Todos estos proveedores están obligados contractualmente a proteger su información 
              y solo pueden usarla para los fines especificados.
            </p>

            <h3>4.3 Autoridades Legales</h3>
            <p>Podemos divulgar información si:</p>
            <ul>
              <li>Es requerido por ley o proceso legal</li>
              <li>Es necesario para prevenir fraude o actividad ilegal</li>
              <li>Protege la seguridad de nuestros usuarios o la plataforma</li>
              <li>Cumple con solicitudes gubernamentales legítimas</li>
            </ul>

            <h3>4.4 Transferencias Corporativas</h3>
            <p>
              En caso de fusión, adquisición o venta de activos, su información puede ser transferida. 
              Le notificaremos antes de que su información esté sujeta a una política de privacidad diferente.
            </p>

            <h3>4.5 Nunca Compartimos</h3>
            <p>Nunca vendemos su información personal a terceros para propósitos de marketing.</p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Lock size={24} />
            </div>
            <h2>5. Seguridad de la Información</h2>
            
            <h3>5.1 Medidas Técnicas</h3>
            <ul>
              <li><strong>Encriptación:</strong> SSL/TLS para datos en tránsito, AES-256 para datos en reposo</li>
              <li><strong>Autenticación:</strong> 2FA obligatorio para transacciones sensibles</li>
              <li><strong>Firewalls:</strong> protección contra accesos no autorizados</li>
              <li><strong>Monitoreo:</strong> sistemas 24/7 para detectar amenazas</li>
              <li><strong>Backups:</strong> copias de seguridad regulares encriptadas</li>
            </ul>

            <h3>5.2 Medidas Organizativas</h3>
            <ul>
              <li>Acceso limitado a información personal solo al personal autorizado</li>
              <li>Capacitación regular en seguridad y privacidad</li>
              <li>Auditorías de seguridad periódicas</li>
              <li>Políticas estrictas de retención de datos</li>
            </ul>

            <h3>5.3 Su Responsabilidad</h3>
            <p>La seguridad también depende de usted:</p>
            <ul>
              <li>Use una contraseña fuerte y única</li>
              <li>Habilite autenticación de dos factores</li>
              <li>No comparta sus credenciales</li>
              <li>Cierre sesión en dispositivos compartidos</li>
              <li>Mantenga su software actualizado</li>
            </ul>

            <h3>5.4 Notificación de Brechas</h3>
            <p>
              En el improbable caso de una brecha de seguridad que afecte su información, 
              le notificaremos dentro de las 72 horas según lo requerido por ley, junto con 
              las medidas que estamos tomando.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Sus Derechos de Privacidad</h2>
            
            <h3>6.1 Acceso y Portabilidad</h3>
            <p>
              Puede solicitar una copia de toda la información personal que tenemos sobre usted 
              en formato estructurado y legible por máquina.
            </p>

            <h3>6.2 Rectificación</h3>
            <p>
              Puede actualizar o corregir su información personal en cualquier momento desde 
              su configuración de cuenta o contactándonos.
            </p>

            <h3>6.3 Eliminación</h3>
            <p>
              Puede solicitar la eliminación de su cuenta y datos personales. Tenga en cuenta que:
            </p>
            <ul>
              <li>Debemos retener cierta información por obligaciones legales (7 años para datos financieros)</li>
              <li>Información en transacciones completadas puede mantenerse para registros</li>
              <li>Backups pueden retener información por un período limitado</li>
            </ul>

            <h3>6.4 Restricción y Objeción</h3>
            <p>
              Puede solicitar que restrinjamos el procesamiento de su información o puede oponerse 
              a ciertos tipos de procesamiento, incluido el marketing directo.
            </p>

            <h3>6.5 Revocación de Consentimiento</h3>
            <p>
              Donde el procesamiento se basa en su consentimiento, puede retirarlo en cualquier momento. 
              Esto no afectará la legalidad del procesamiento previo.
            </p>

            <h3>6.6 Ejercer sus Derechos</h3>
            <p>
              Para ejercer cualquiera de estos derechos, contacte a: 
              <strong> privacidad@cumbre.ar</strong>
            </p>
            <p>
              Responderemos a su solicitud dentro de 30 días. Puede que necesitemos verificar 
              su identidad antes de procesar ciertas solicitudes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Retención de Datos</h2>
            
            <h3>7.1 Período de Retención</h3>
            <ul>
              <li><strong>Información de cuenta:</strong> mientras su cuenta esté activa</li>
              <li><strong>Datos financieros:</strong> 7 años (requisito legal)</li>
              <li><strong>Documentos KYC:</strong> 5 años después del cierre de cuenta</li>
              <li><strong>Logs de seguridad:</strong> 2 años</li>
              <li><strong>Marketing:</strong> hasta que retire su consentimiento</li>
            </ul>

            <h3>7.2 Eliminación Automática</h3>
            <p>
              Después del período de retención, eliminamos o anonimizamos su información de manera segura.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Cookies y Tecnologías de Rastreo</h2>
            
            <h3>8.1 Tipos de Cookies</h3>
            <ul>
              <li><strong>Esenciales:</strong> necesarias para el funcionamiento de la plataforma</li>
              <li><strong>Funcionales:</strong> recuerdan sus preferencias</li>
              <li><strong>Analíticas:</strong> nos ayudan a entender cómo usa la plataforma</li>
              <li><strong>Marketing:</strong> personalizan anuncios (solo con consentimiento)</li>
            </ul>

            <h3>8.2 Gestión de Cookies</h3>
            <p>
              Puede gestionar sus preferencias de cookies en la configuración de su navegador. 
              Tenga en cuenta que deshabilitar cookies esenciales puede afectar la funcionalidad.
            </p>

            <h3>8.3 No Rastrear (DNT)</h3>
            <p>
              Respetamos las señales "Do Not Track" de su navegador para cookies no esenciales.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Bell size={24} />
            </div>
            <h2>9. Transferencias Internacionales</h2>
            
            <p>
              Si bien operamos principalmente en Argentina, algunos de nuestros proveedores de servicios 
              pueden estar ubicados en otros países. Aseguramos que:
            </p>
            <ul>
              <li>Todas las transferencias cumplen con las leyes de protección de datos aplicables</li>
              <li>Implementamos salvaguardas apropiadas (cláusulas contractuales estándar)</li>
              <li>Los datos sensibles están encriptados durante la transmisión</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>10. Privacidad de Menores</h2>
            
            <p>
              CUMBRE no está diseñado para menores de 18 años. No recopilamos intencionalmente 
              información de menores. Si descubrimos que hemos recopilado información de un menor:
            </p>
            <ul>
              <li>Eliminaremos la información inmediatamente</li>
              <li>Cerraremos la cuenta</li>
              <li>Notificaremos a los padres o tutores si es posible</li>
            </ul>
            <p>
              Si cree que un menor ha proporcionado información a CUMBRE, contacte a: 
              <strong> privacidad@cumbre.ar</strong>
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Cambios a esta Política</h2>
            
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en:
            </p>
            <ul>
              <li>Nuestras prácticas de información</li>
              <li>Regulaciones de privacidad aplicables</li>
              <li>Nuevas funcionalidades de la plataforma</li>
            </ul>

            <p>
              <strong>Cambios Importantes:</strong> Le notificaremos por correo electrónico o mediante 
              un aviso destacado en la plataforma al menos 30 días antes de que entren en vigencia.
            </p>

            <p>
              <strong>Cambios Menores:</strong> Se publicarán en esta página con la fecha de actualización.
            </p>

            <p>
              Su uso continuado de la plataforma después de los cambios constituye su aceptación 
              de la política actualizada.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Contacto y Reclamos</h2>
            
            <h3>12.1 Oficial de Privacidad</h3>
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> privacidad@cumbre.ar</p>
              <p><strong>Dirección:</strong> Buenos Aires, Argentina</p>
              <p><strong>Teléfono:</strong> +54 (11) XXXX-XXXX</p>
            </div>

            <h3>12.2 Tiempo de Respuesta</h3>
            <p>
              Nos comprometemos a responder a todas las consultas de privacidad dentro de 5 días hábiles 
              y resolver solicitudes dentro de 30 días.
            </p>

            <h3>12.3 Autoridad de Control</h3>
            <p>
              Si no está satisfecho con nuestra respuesta, tiene derecho a presentar una queja ante 
              la Agencia de Acceso a la Información Pública (AAIP) de Argentina:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Web:</strong> www.argentina.gob.ar/aaip</p>
              <p><strong>Email:</strong> datospersonales@aaip.gob.ar</p>
              <p><strong>Teléfono:</strong> 0800-333-AAIP (2247)</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>13. Prácticas de Privacidad Específicas</h2>
            
            <h3>13.1 Blockchain y Transparencia</h3>
            <p>
              Las transacciones en blockchain son públicas por naturaleza. No podemos eliminar o modificar 
              transacciones registradas en la blockchain. Sin embargo:
            </p>
            <ul>
              <li>No asociamos públicamente su identidad con direcciones de billetera</li>
              <li>Usamos direcciones únicas para cada transacción cuando es posible</li>
              <li>Proporcionamos educación sobre privacidad en blockchain</li>
            </ul>

            <h3>13.2 Análisis y Machine Learning</h3>
            <p>
              Usamos algoritmos de ML para detección de fraude y recomendaciones. Estos sistemas:
            </p>
            <ul>
              <li>Se entrenan con datos anonimizados cuando es posible</li>
              <li>No toman decisiones automatizadas que afecten significativamente sus derechos</li>
              <li>Están sujetos a revisión humana para decisiones importantes</li>
            </ul>

            <h3>13.3 Comunicaciones en la Plataforma</h3>
            <p>
              Los mensajes en la plataforma pueden ser monitoreados para:
            </p>
            <ul>
              <li>Prevenir fraude y abuso</li>
              <li>Resolver disputas</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
            <p>
              No leemos sus mensajes para propósitos de marketing sin su consentimiento explícito.
            </p>
          </section>
        </div>

        <div className={styles.acknowledgment}>
          <Lock size={32} />
          <p>
            Su privacidad es fundamental para nosotros. Si tiene preguntas sobre esta política 
            o cómo manejamos su información, no dude en contactarnos en 
            <strong> privacidad@cumbre.ar</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

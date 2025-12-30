'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, AlertCircle, Users, Scale } from 'lucide-react';
import styles from './terminos.module.scss';

export default function TerminosPage() {
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
            <Scale size={48} />
          </div>
          <h1>Términos de Servicio</h1>
          <p className={styles.lastUpdate}>Última actualización: 29 de diciembre de 2025</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <FileText size={24} />
            </div>
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar CUMBRE ("la Plataforma"), usted acepta estar sujeto a estos Términos de Servicio 
              y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, 
              no debe utilizar esta Plataforma.
            </p>
            <p>
              CUMBRE es una plataforma de soberanía digital que facilita la gestión de activos digitales, 
              marketplace de talento, y servicios de inversión. El uso de nuestros servicios está condicionado 
              a su aceptación de estos términos.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Users size={24} />
            </div>
            <h2>2. Registro y Cuenta de Usuario</h2>
            <h3>2.1 Requisitos de Elegibilidad</h3>
            <ul>
              <li>Debe tener al menos 18 años de edad</li>
              <li>Debe proporcionar información precisa y completa durante el registro</li>
              <li>Debe mantener la seguridad de su cuenta y contraseña</li>
              <li>Es responsable de todas las actividades que ocurran bajo su cuenta</li>
            </ul>

            <h3>2.2 Verificación de Identidad</h3>
            <p>
              Para cumplir con las regulaciones KYC (Know Your Customer) y AML (Anti-Money Laundering), 
              nos reservamos el derecho de solicitar verificación de identidad antes de permitir ciertas 
              transacciones o actividades en la Plataforma.
            </p>

            <h3>2.3 Suspensión y Terminación</h3>
            <p>
              Nos reservamos el derecho de suspender o terminar su cuenta si:
            </p>
            <ul>
              <li>Viola estos Términos de Servicio</li>
              <li>Proporciona información falsa o engañosa</li>
              <li>Participa en actividades fraudulentas o ilegales</li>
              <li>Compromete la seguridad o integridad de la Plataforma</li>
            </ul>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Shield size={24} />
            </div>
            <h2>3. Servicios Ofrecidos</h2>
            
            <h3>3.1 Gestión de Activos Digitales</h3>
            <p>
              CUMBRE proporciona herramientas para visualizar, gestionar y realizar transacciones con activos 
              digitales. Sin embargo:
            </p>
            <ul>
              <li>No somos una entidad financiera regulada ni un banco</li>
              <li>No proporcionamos asesoramiento financiero o de inversión</li>
              <li>Los usuarios son responsables de sus propias decisiones de inversión</li>
              <li>El valor de los activos digitales puede fluctuar significativamente</li>
            </ul>

            <h3>3.2 Marketplace de Talento</h3>
            <p>
              La Plataforma conecta freelancers con clientes para proyectos. CUMBRE actúa como intermediario:
            </p>
            <ul>
              <li>No somos parte de los contratos entre freelancers y clientes</li>
              <li>No garantizamos la calidad del trabajo o el pago</li>
              <li>Proporcionamos un sistema de reputación y valoración</li>
              <li>Cobramos una comisión por transacciones exitosas</li>
            </ul>

            <h3>3.3 Mensajería y Comunicaciones</h3>
            <p>
              Ofrecemos servicios de mensajería para facilitar la comunicación entre usuarios. 
              El uso indebido de este servicio para spam, acoso o actividades ilegales resultará 
              en la suspensión inmediata de la cuenta.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <AlertCircle size={24} />
            </div>
            <h2>4. Tarifas y Pagos</h2>
            
            <h3>4.1 Estructura de Tarifas</h3>
            <ul>
              <li><strong>Transacciones de activos:</strong> 0.5% - 2% dependiendo del volumen</li>
              <li><strong>Marketplace de talento:</strong> 10% de comisión en proyectos completados</li>
              <li><strong>Transferencias:</strong> Tarifas según la red blockchain utilizada</li>
              <li><strong>Retiros:</strong> Tarifas variables según el método y monto</li>
            </ul>

            <h3>4.2 Modificación de Tarifas</h3>
            <p>
              Nos reservamos el derecho de modificar nuestras tarifas con un aviso previo de 30 días. 
              Las nuevas tarifas no se aplicarán retroactivamente a transacciones ya completadas.
            </p>

            <h3>4.3 Reembolsos</h3>
            <p>
              Las tarifas de servicio generalmente no son reembolsables. Los reembolsos en proyectos 
              del marketplace se manejan caso por caso según nuestro sistema de resolución de disputas.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Propiedad Intelectual</h2>
            
            <h3>5.1 Contenido de CUMBRE</h3>
            <p>
              Todo el contenido de la Plataforma, incluyendo diseño, código, logos, textos y gráficos, 
              es propiedad de CUMBRE y está protegido por leyes de propiedad intelectual.
            </p>

            <h3>5.2 Contenido del Usuario</h3>
            <p>
              Usted retiene todos los derechos sobre el contenido que publica en la Plataforma. 
              Sin embargo, nos otorga una licencia mundial, no exclusiva y libre de regalías para 
              usar, reproducir y distribuir su contenido en relación con la operación de la Plataforma.
            </p>

            <h3>5.3 Prohibiciones</h3>
            <p>No está permitido:</p>
            <ul>
              <li>Copiar, modificar o distribuir contenido de la Plataforma sin autorización</li>
              <li>Realizar ingeniería inversa de nuestro software</li>
              <li>Usar nuestros servicios para desarrollar productos competitivos</li>
              <li>Eliminar avisos de copyright o marcas comerciales</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Conducta del Usuario</h2>
            
            <p>Al usar CUMBRE, usted se compromete a:</p>
            <ul>
              <li>No violar ninguna ley local, nacional o internacional</li>
              <li>No infringir derechos de propiedad intelectual de terceros</li>
              <li>No transmitir malware, virus o código dañino</li>
              <li>No intentar acceder a cuentas o sistemas sin autorización</li>
              <li>No manipular precios o participar en prácticas comerciales deshonestas</li>
              <li>No crear cuentas falsas o múltiples sin autorización</li>
              <li>No acosar, intimidar o amenazar a otros usuarios</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Limitación de Responsabilidad</h2>
            
            <h3>7.1 Exclusión de Garantías</h3>
            <p>
              La Plataforma se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas. 
              No garantizamos que:
            </p>
            <ul>
              <li>El servicio será ininterrumpido o libre de errores</li>
              <li>Los defectos serán corregidos</li>
              <li>El servicio cumplirá con sus requisitos específicos</li>
              <li>Los resultados obtenidos serán precisos o confiables</li>
            </ul>

            <h3>7.2 Limitación de Daños</h3>
            <p>
              En ningún caso CUMBRE será responsable por daños indirectos, incidentales, especiales, 
              consecuentes o punitivos, incluyendo pérdida de beneficios, datos o uso, incluso si 
              se nos ha advertido de la posibilidad de tales daños.
            </p>

            <h3>7.3 Indemnización</h3>
            <p>
              Usted acepta indemnizar y eximir de responsabilidad a CUMBRE, sus directores, empleados 
              y agentes de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda, 
              y gasto que surja de su uso de la Plataforma o violación de estos Términos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Resolución de Disputas</h2>
            
            <h3>8.1 Ley Aplicable</h3>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de Argentina, 
              sin dar efecto a ningún principio de conflictos de leyes.
            </p>

            <h3>8.2 Arbitraje</h3>
            <p>
              Cualquier disputa que surja de o esté relacionada con estos Términos se resolverá 
              mediante arbitraje vinculante, de acuerdo con las reglas de la Cámara Arbitral de 
              la Bolsa de Comercio de Buenos Aires.
            </p>

            <h3>8.3 Disputas entre Usuarios</h3>
            <p>
              Para disputas entre usuarios (por ejemplo, en proyectos del marketplace), 
              proporcionamos un sistema interno de mediación. Ambas partes aceptan participar 
              de buena fe en este proceso antes de buscar recursos legales externos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Modificaciones al Servicio</h2>
            
            <p>
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto 
              de la Plataforma en cualquier momento, con o sin previo aviso. No seremos responsables 
              ante usted o terceros por cualquier modificación, suspensión o discontinuación del servicio.
            </p>

            <h3>9.1 Actualizaciones de Términos</h3>
            <p>
              Podemos actualizar estos Términos periódicamente. Los cambios significativos se 
              notificarán por correo electrónico o mediante un aviso destacado en la Plataforma. 
              Su uso continuado después de dichos cambios constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Privacidad y Protección de Datos</h2>
            
            <p>
              El uso de la Plataforma también está sujeto a nuestra <Link href="/privacidad">Política de Privacidad</Link>, 
              que describe cómo recopilamos, usamos y protegemos su información personal. 
              Le recomendamos leerla detenidamente.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Contacto</h2>
            
            <p>
              Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> legal@cumbre.ar</p>
              <p><strong>Dirección:</strong> Buenos Aires, Argentina</p>
              <p><strong>Soporte:</strong> soporte@cumbre.ar</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>12. Disposiciones Generales</h2>
            
            <h3>12.1 Acuerdo Completo</h3>
            <p>
              Estos Términos constituyen el acuerdo completo entre usted y CUMBRE con respecto 
              al uso de la Plataforma y reemplazan todos los acuerdos anteriores.
            </p>

            <h3>12.2 Divisibilidad</h3>
            <p>
              Si alguna disposición de estos Términos se considera inválida o inaplicable, 
              las disposiciones restantes seguirán siendo válidas y aplicables.
            </p>

            <h3>12.3 Renuncia</h3>
            <p>
              El hecho de que no ejerzamos o hagamos cumplir cualquier derecho o disposición 
              de estos Términos no constituye una renuncia a ese derecho o disposición.
            </p>

            <h3>12.4 Cesión</h3>
            <p>
              No puede ceder estos Términos sin nuestro consentimiento previo por escrito. 
              Podemos ceder estos Términos libremente sin su consentimiento.
            </p>
          </section>
        </div>

        <div className={styles.acknowledgment}>
          <Shield size={32} />
          <p>
            Al utilizar CUMBRE, usted reconoce que ha leído, comprendido y acepta estar sujeto 
            a estos Términos de Servicio.
          </p>
        </div>
      </div>
    </div>
  );
}

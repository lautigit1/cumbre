'use client';

import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import styles from '../terms/legal.module.scss';

export default function LicensesPage() {
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
              <span className={styles.gradient}>Licencias</span> y Atribuciones
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
                <li><a href="#licencia-software">1. Licencia de Software CUMBRE</a></li>
                <li><a href="#open-source">2. Componentes Open Source</a></li>
                <li><a href="#api-data">3. Licencias de APIs y Datos</a></li>
                <li><a href="#fonts">4. Fuentes Tipográficas</a></li>
                <li><a href="#icons">5. Iconografía y Assets</a></li>
              </ul>
            </div>

            <div className={styles.section} id="licencia-software">
              <h2>1. Licencia de Software CUMBRE</h2>
              <p>
                El software de CUMBRE (plataforma web, APIs, algoritmos de IA) es propiedad 
                exclusiva de CUMBRE S.A. y está protegido por leyes de propiedad intelectual.
              </p>
              <p>
                Al suscribirse a CUMBRE, se le otorga una licencia limitada, no exclusiva, 
                no transferible y revocable para:
              </p>
              <ul>
                <li>Acceder y utilizar la plataforma para fines comerciales personales</li>
                <li>Consumir datos y señales a través de nuestra API (según su plan)</li>
                <li>Integrar nuestra API en sus aplicaciones (con límites de rate-limit)</li>
              </ul>
              
              <div className={styles.warning}>
                <p><strong>PROHIBIDO:</strong></p>
                <p>
                  Está estrictamente prohibido: copiar, modificar, crear trabajos derivados, 
                  aplicar ingeniería inversa, vender, sublicenciar o distribuir cualquier 
                  parte del software de CUMBRE sin autorización expresa por escrito.
                </p>
              </div>
            </div>

            <div className={styles.section} id="open-source">
              <h2>2. Componentes Open Source</h2>
              <p>
                CUMBRE utiliza bibliotecas y frameworks de código abierto. Agradecemos a la 
                comunidad open source por su contribución. A continuación, listamos los principales:
              </p>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Frontend
              </h3>
              <ul>
                <li><strong>React</strong> - MIT License - © Facebook Inc.</li>
                <li><strong>Next.js</strong> - MIT License - © Vercel Inc.</li>
                <li><strong>Framer Motion</strong> - MIT License - © Framer B.V.</li>
                <li><strong>TailwindCSS</strong> - MIT License - © Tailwind Labs</li>
                <li><strong>Recharts</strong> - MIT License - © Recharts Group</li>
                <li><strong>Lucide Icons</strong> - ISC License - © Lucide Contributors</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Backend
              </h3>
              <ul>
                <li><strong>NestJS</strong> - MIT License - © Kamil Myśliwiec</li>
                <li><strong>Prisma</strong> - Apache 2.0 - © Prisma Data Inc.</li>
                <li><strong>TypeScript</strong> - Apache 2.0 - © Microsoft Corporation</li>
                <li><strong>Express</strong> - MIT License - © TJ Holowaychuk</li>
                <li><strong>Socket.io</strong> - MIT License - © Socket.io Contributors</li>
              </ul>

              <h3 style={{ fontSize: '20px', marginTop: '24px', marginBottom: '12px', color: '#E6B37E' }}>
                Machine Learning
              </h3>
              <ul>
                <li><strong>TensorFlow</strong> - Apache 2.0 - © Google Inc.</li>
                <li><strong>PyTorch</strong> - BSD License - © Facebook AI Research</li>
                <li><strong>scikit-learn</strong> - BSD License - © scikit-learn developers</li>
                <li><strong>pandas</strong> - BSD License - © pandas-dev</li>
              </ul>

              <p style={{ marginTop: '24px', fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                Puede encontrar las licencias completas en los repositorios oficiales de cada proyecto.
              </p>
            </div>

            <div className={styles.section} id="api-data">
              <h2>3. Licencias de APIs y Datos</h2>
              <p>
                CUMBRE integra datos de múltiples fuentes para proporcionar señales precisas:
              </p>
              <ul>
                <li><strong>CoinGecko API</strong> - Datos de criptomonedas en tiempo real</li>
                <li><strong>Binance API</strong> - Datos de precios y volúmenes de exchange</li>
                <li><strong>Alpha Vantage</strong> - Datos de mercados tradicionales</li>
                <li><strong>TradingView</strong> - Gráficos y análisis técnico</li>
              </ul>
              <p>
                Los datos son proporcionados "tal cual" por los proveedores. CUMBRE no 
                garantiza su exactitud absoluta. Consulte las licencias de cada proveedor 
                para más detalles sobre uso permitido.
              </p>
            </div>

            <div className={styles.section} id="fonts">
              <h2>4. Fuentes Tipográficas</h2>
              <p>CUMBRE utiliza las siguientes fuentes con sus respectivas licencias:</p>
              <ul>
                <li>
                  <strong>Inter</strong> - SIL Open Font License 1.1 - © Rasmus Andersson
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Fuente principal para interfaz de usuario
                  </span>
                </li>
                <li>
                  <strong>Fira Code</strong> - SIL Open Font License 1.1 - © Nikita Prokopov
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Fuente monospace para código y terminal
                  </span>
                </li>
                <li>
                  <strong>JetBrains Mono</strong> - SIL Open Font License 1.1 - © JetBrains
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Fuente alternativa para editor de código
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.section} id="icons">
              <h2>5. Iconografía y Assets</h2>
              <p>Los iconos y elementos visuales provienen de:</p>
              <ul>
                <li>
                  <strong>Lucide Icons</strong> - ISC License - Uso comercial permitido
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Biblioteca principal de iconos SVG
                  </span>
                </li>
                <li>
                  <strong>Heroicons</strong> - MIT License - © Tailwind Labs
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Iconos complementarios para UI
                  </span>
                </li>
                <li>
                  <strong>Custom Assets</strong> - © CUMBRE S.A. - Todos los derechos reservados
                  <br />
                  <span style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.5)' }}>
                    Logo, ilustraciones personalizadas y branding
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.contact}>
              <Scale size={24} />
              <div>
                <h3>¿Preguntas sobre licencias?</h3>
                <p>Contáctanos en <a href="mailto:legal@cumbre.io">legal@cumbre.io</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

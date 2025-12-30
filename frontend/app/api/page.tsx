'use client';

import Link from 'next/link';
import { ArrowLeft, Book, Code, FileText, Terminal, Zap } from 'lucide-react';
import styles from './api.module.scss';

export default function APIPage() {
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
              API <span className={styles.gradient}>Documentation</span>
            </h1>
            <p className={styles.subtitle}>
              Integra CUMBRE en tus aplicaciones con nuestra API RESTful
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div 
              className={styles.card}
            >
              <Book size={32} className={styles.icon} />
              <h3>Guía de Inicio</h3>
              <p>Aprende los conceptos básicos y realiza tu primera llamada API en minutos.</p>
              <Link href="#" className={styles.cardLink}>Comenzar →</Link>
            </div>

            <div 
              className={styles.card}
            >
              <Code size={32} className={styles.icon} />
              <h3>Referencia API</h3>
              <p>Documentación completa de todos los endpoints disponibles y sus parámetros.</p>
              <Link href="#" className={styles.cardLink}>Ver docs →</Link>
            </div>

            <div 
              className={styles.card}
            >
              <Terminal size={32} className={styles.icon} />
              <h3>Ejemplos de Código</h3>
              <p>Snippets listos para usar en Python, JavaScript, Ruby y más lenguajes.</p>
              <Link href="#" className={styles.cardLink}>Explorar →</Link>
            </div>
          </div>

          <div className={styles.codeExample}>
            <h2>Ejemplo Rápido</h2>
            <pre>
              <code>{`// Autenticación
const response = await fetch('https://api.cumbre.io/v1/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'YOUR_API_KEY',
    apiSecret: 'YOUR_SECRET'
  })
});

const { token } = await response.json();

// Obtener señales de trading
const signals = await fetch('https://api.cumbre.io/v1/signals', {
  headers: { 'Authorization': \`Bearer \${token}\` }
});`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, GitBranch, Sparkles, Bug, Plus, Minus } from 'lucide-react';
import styles from './changelog.module.scss';

export default function ChangelogPage() {
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
              <span className={styles.gradient}>Changelog</span>
            </h1>
            <p className={styles.subtitle}>
              Historial completo de actualizaciones, mejoras y correcciones
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.timeline}>
            <div 
              className={styles.release}
            >
              <div className={styles.releaseHeader}>
                <div className={styles.versionBadge}>v2.4.0</div>
                <span className={styles.date}>15 Ene 2024</span>
              </div>
              
              <div className={styles.changes}>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Integración con Binance Futures para trading de derivados</span>
                </div>
                <div className={styles.changeItem}>
                  <Sparkles size={18} />
                  <span><strong>Mejora:</strong> Motor de IA actualizado con +40% precisión en predicciones</span>
                </div>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Dashboard multi-mercado con vista unificada de todas las posiciones</span>
                </div>
                <div className={styles.changeItem}>
                  <Bug size={18} />
                  <span><strong>Fix:</strong> Corrección de latencia en señales durante alta volatilidad</span>
                </div>
              </div>
            </div>

            <div 
              className={styles.release}
            >
              <div className={styles.releaseHeader}>
                <div className={styles.versionBadge}>v2.3.1</div>
                <span className={styles.date}>28 Dic 2023</span>
              </div>
              
              <div className={styles.changes}>
                <div className={styles.changeItem}>
                  <Bug size={18} />
                  <span><strong>Fix:</strong> Mejora de estabilidad en conexión WebSocket</span>
                </div>
                <div className={styles.changeItem}>
                  <Sparkles size={18} />
                  <span><strong>Mejora:</strong> Optimización de rendimiento en gráficos en tiempo real</span>
                </div>
                <div className={styles.changeItem}>
                  <Bug size={18} />
                  <span><strong>Fix:</strong> Corrección de formato de fecha en reporte de ganancias</span>
                </div>
              </div>
            </div>

            <div 
              className={styles.release}
            >
              <div className={styles.releaseHeader}>
                <div className={styles.versionBadge}>v2.3.0</div>
                <span className={styles.date}>10 Dic 2023</span>
              </div>
              
              <div className={styles.changes}>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Sistema de alertas inteligentes con ML adaptativo</span>
                </div>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Integración con TradingView para análisis avanzado</span>
                </div>
                <div className={styles.changeItem}>
                  <Sparkles size={18} />
                  <span><strong>Mejora:</strong> Rediseño completo del sistema de notificaciones push</span>
                </div>
                <div className={styles.changeItem}>
                  <Minus size={18} />
                  <span><strong>Deprecado:</strong> API v1 será discontinuada en Marzo 2024</span>
                </div>
              </div>
            </div>

            <div 
              className={styles.release}
            >
              <div className={styles.releaseHeader}>
                <div className={styles.versionBadge}>v2.2.0</div>
                <span className={styles.date}>15 Nov 2023</span>
              </div>
              
              <div className={styles.changes}>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Copy Trading - Replica estrategias de traders profesionales</span>
                </div>
                <div className={styles.changeItem}>
                  <Sparkles size={18} />
                  <span><strong>Mejora:</strong> Dashboard de rendimiento con métricas avanzadas</span>
                </div>
                <div className={styles.changeItem}>
                  <Plus size={18} />
                  <span><strong>Nueva:</strong> Simulador de estrategias con backtesting histórico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

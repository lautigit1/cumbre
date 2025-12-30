'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import styles from './blog.module.scss';

export default function BlogPage() {
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
              <span className={styles.gradient}>Blog</span>
            </h1>
            <p className={styles.subtitle}>
              Insights, estrategias y novedades del mundo del trading
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.featured}>
            <article 
              className={styles.featuredCard}
            >
              <div className={styles.featuredBadge}>Destacado</div>
              <div className={styles.featuredContent}>
                <div className={styles.meta}>
                  <span><Calendar size={16} /> 10 Ene 2024</span>
                  <span><User size={16} /> María Gonzalez</span>
                </div>
                <h2>Cómo la IA está revolucionando el trading algorítmico en 2024</h2>
                <p>
                  Los modelos de machine learning están cambiando radicalmente la forma en que 
                  los traders profesionales toman decisiones. Descubre las últimas tendencias 
                  y estrategias que están dominando el mercado.
                </p>
                <Link href="#" className={styles.readMore}>
                  Leer artículo <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          </div>

          <div className={styles.grid}>
            <article 
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 5 Ene 2024</span>
                <span><User size={14} /> Carlos Mendez</span>
              </div>
              <h3>5 estrategias de gestión de riesgo para traders principiantes</h3>
              <p>
                La gestión de riesgo es fundamental para el éxito a largo plazo. 
                Aprende las técnicas esenciales que todo trader debe conocer.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>

            <article 
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 28 Dic 2023</span>
                <span><User size={14} /> Ana Silva</span>
              </div>
              <h3>Análisis técnico vs fundamental: ¿Cuál es mejor?</h3>
              <p>
                Comparamos ambas metodologías y cómo pueden complementarse para 
                mejorar tus decisiones de inversión.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>

            <article
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 20 Dic 2023</span>
                <span><User size={14} /> Roberto Paz</span>
              </div>
              <h3>El impacto de las tasas de interés en los mercados cripto</h3>
              <p>
                Analizamos cómo las decisiones de los bancos centrales afectan 
                directamente el precio de Bitcoin y otras criptomonedas.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>

            <article 
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 15 Dic 2023</span>
                <span><User size={14} /> Laura Fernández</span>
              </div>
              <h3>Trading automatizado: Ventajas y desventajas</h3>
              <p>
                Los bots de trading pueden ser herramientas poderosas, pero 
                también tienen limitaciones. Descubre cuándo usarlos.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>

            <article 
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 8 Dic 2023</span>
                <span><User size={14} /> Diego Morales</span>
              </div>
              <h3>Psicología del trading: Controla tus emociones</h3>
              <p>
                El trading es 80% psicología y 20% estrategia. Aprende a 
                dominar tus emociones para operar con disciplina.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>

            <article 
              className={styles.card}
            >
              <div className={styles.meta}>
                <span><Calendar size={14} /> 1 Dic 2023</span>
                <span><User size={14} /> Sofía Ramírez</span>
              </div>
              <h3>Criptomonedas emergentes para vigilar en 2024</h3>
              <p>
                Más allá de Bitcoin y Ethereum, exploramos proyectos prometedores 
                que podrían ser las estrellas del próximo ciclo alcista.
              </p>
              <Link href="#" className={styles.cardLink}>
                Leer más <ArrowRight size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, Briefcase, MapPin, Clock, Users } from 'lucide-react';
import styles from './careers.module.scss';

export default function CareersPage() {
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
              Únete a <span className={styles.gradient}>CUMBRE</span>
            </h1>
            <p className={styles.subtitle}>
              Construye el futuro del trading junto a un equipo de clase mundial
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.benefits}>
            <h2>Por qué trabajar con nosotros</h2>
            <div className={styles.benefitsGrid}>
              <div 
                className={styles.benefitCard}
              >
                <Users size={32} />
                <h3>Cultura de Innovación</h3>
                <p>Fomenta tus ideas en un ambiente que prioriza la creatividad y la experimentación</p>
              </div>

              <div 
                className={styles.benefitCard}
              >
                <Clock size={32} />
                <h3>Horarios Flexibles</h3>
                <p>Trabajo remoto y horarios adaptables para balance entre vida personal y profesional</p>
              </div>

              <div 
                className={styles.benefitCard}
              >
                <Briefcase size={32} />
                <h3>Desarrollo Profesional</h3>
                <p>Presupuesto anual para conferencias, cursos y certificaciones</p>
              </div>
            </div>
          </div>

          <div className={styles.positions}>
            <h2>Posiciones Abiertas</h2>
            
            <div 
              className={styles.job}
            >
              <div className={styles.jobHeader}>
                <div>
                  <h3>Senior Backend Engineer</h3>
                  <div className={styles.jobMeta}>
                    <span><MapPin size={16} /> Remoto</span>
                    <span><Clock size={16} /> Full-time</span>
                    <span><Briefcase size={16} /> Ingeniería</span>
                  </div>
                </div>
                <Link href="#" className={styles.applyBtn}>Aplicar</Link>
              </div>
              <p className={styles.jobDesc}>
                Buscamos un ingeniero backend experimentado para trabajar en la arquitectura 
                de nuestros sistemas de trading de alta frecuencia. Experiencia con NestJS, 
                microservicios y bases de datos distribuidas.
              </p>
            </div>

            <div 
              className={styles.job}
            >
              <div className={styles.jobHeader}>
                <div>
                  <h3>Machine Learning Engineer</h3>
                  <div className={styles.jobMeta}>
                    <span><MapPin size={16} /> Remoto</span>
                    <span><Clock size={16} /> Full-time</span>
                    <span><Briefcase size={16} /> Data Science</span>
                  </div>
                </div>
                <Link href="#" className={styles.applyBtn}>Aplicar</Link>
              </div>
              <p className={styles.jobDesc}>
                Únete a nuestro equipo de IA para desarrollar modelos predictivos avanzados 
                para análisis de mercados. Python, TensorFlow, experiencia en trading algorítmico.
              </p>
            </div>

            <div 
              className={styles.job}
            >
              <div className={styles.jobHeader}>
                <div>
                  <h3>Product Designer</h3>
                  <div className={styles.jobMeta}>
                    <span><MapPin size={16} /> Remoto</span>
                    <span><Clock size={16} /> Full-time</span>
                    <span><Briefcase size={16} /> Diseño</span>
                  </div>
                </div>
                <Link href="#" className={styles.applyBtn}>Aplicar</Link>
              </div>
              <p className={styles.jobDesc}>
                Diseña experiencias de usuario excepcionales para nuestra plataforma de trading. 
                Figma, sistemas de diseño, experiencia en productos fintech.
              </p>
            </div>

            <div 
              className={styles.job}
            >
              <div className={styles.jobHeader}>
                <div>
                  <h3>DevOps Engineer</h3>
                  <div className={styles.jobMeta}>
                    <span><MapPin size={16} /> Remoto</span>
                    <span><Clock size={16} /> Full-time</span>
                    <span><Briefcase size={16} /> Infraestructura</span>
                  </div>
                </div>
                <Link href="#" className={styles.applyBtn}>Aplicar</Link>
              </div>
              <p className={styles.jobDesc}>
                Mantén y escala nuestra infraestructura cloud. Kubernetes, Docker, CI/CD, 
                experiencia en sistemas de alta disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

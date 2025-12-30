'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import styles from './contacto.module.scss';

export default function ContactoPage() {
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
              <span className={styles.gradient}>Contacto</span>
            </h1>
            <p className={styles.subtitle}>
              Estamos aquí para ayudarte. Escríbenos y te responderemos pronto.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.info}>
              <div 
                className={styles.infoCard}
              >
                <Mail size={28} />
                <h3>Email</h3>
                <p>soporte@cumbre.io</p>
                <p className={styles.secondary}>ventas@cumbre.io</p>
              </div>

              <div 
                className={styles.infoCard}
              >
                <Phone size={28} />
                <h3>Teléfono</h3>
                <p>+54 11 4567-8900</p>
                <p className={styles.secondary}>Lun - Vie, 9:00 - 18:00 ART</p>
              </div>

              <div 
                className={styles.infoCard}
              >
                <MapPin size={28} />
                <h3>Oficina</h3>
                <p>Av. Corrientes 1234, Piso 8</p>
                <p className={styles.secondary}>Buenos Aires, Argentina</p>
              </div>

              <div 
                className={styles.infoCard}
              >
                <Clock size={28} />
                <h3>Tiempo de Respuesta</h3>
                <p>Soporte: &lt; 2 horas</p>
                <p className={styles.secondary}>Ventas: &lt; 24 horas</p>
              </div>
            </div>

            <div 
              className={styles.formWrapper}
            >
              <h2>Envíanos un mensaje</h2>
              <form className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                      type="text" 
                      id="apellido" 
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="tu@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="asunto">Asunto</label>
                  <select id="asunto">
                    <option value="">Selecciona un tema</option>
                    <option value="ventas">Consulta de Ventas</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="billing">Facturación</option>
                    <option value="partnerships">Alianzas</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea 
                    id="mensaje" 
                    rows={6} 
                    placeholder="Describe tu consulta..."
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import styles from './DrawerNotificaciones.module.scss';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: string;
  leida: boolean;
};

type Props = {
  items: Notificacion[];
  titulo?: string;
};

export function DrawerNotificaciones({ items, titulo = 'Notificaciones' }: Props) {
  const [abierto, setAbierto] = useState(true);
  const MotionAside = motion.aside as unknown as React.ComponentType<any>;

  return (
    <div className={styles.wrap}>
      <button className={styles.toggle} onClick={() => setAbierto(!abierto)}>
        Centro de notificaciones
      </button>
      <AnimatePresence>
        {abierto && (
          <MotionAside
            className={styles.drawer}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <header className={styles.header}>
              <h3>{titulo}</h3>
              <BadgeNotificacion tipo={`Total ${items.length}`} />
            </header>
            <div className={styles.list}>
              {items.map((n) => (
                <article key={n.id} className={`${styles.item} ${!n.leida ? styles.unread : ''}`}>
                  <div className={styles.titulo}>{n.titulo}</div>
                  <div className={styles.msg}>{n.mensaje}</div>
                  <BadgeNotificacion tipo={n.tipo} unread={!n.leida} />
                </article>
              ))}
            </div>
          </MotionAside>
        )}
      </AnimatePresence>
    </div>
  );
}

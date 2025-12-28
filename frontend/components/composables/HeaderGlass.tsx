"use client";
import styles from './HeaderGlass.module.scss';
import Link from 'next/link';
import { Bell, MessageCircle, LineChart } from 'lucide-react';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';

export function HeaderGlass() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>CUMBRE</div>
      <nav className={styles.nav}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/talento">Talento</Link>
        <Link href="/mensajes">Mensajes</Link>
      </nav>
      <div className={styles.actions}>
        <Link href="/notificaciones" className={styles.icono}>
          <Bell size={18} />
          <BadgeNotificacion tipo="NOTIF" unread />
        </Link>
        <Link href="/mensajes" className={styles.icono}>
          <MessageCircle size={18} />
        </Link>
        <Link href="/dashboard" className={styles.icono}>
          <LineChart size={18} />
        </Link>
      </div>
    </header>
  );
}

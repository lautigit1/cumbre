"use client";
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bell, Calendar, FileText } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link href="/notificaciones" className={pathname === '/notificaciones' ? styles.active : ''}>
          <Bell size={18} /> Notificaciones
        </Link>
        <Link href="/alertas" className={pathname === '/alertas' ? styles.active : ''}>
          <Bell size={18} /> Alertas
        </Link>
        <Link href="/agenda" className={pathname === '/agenda' ? styles.active : ''}>
          <Calendar size={18} /> Agenda
        </Link>
        <Link href="/documentos" className={pathname === '/documentos' ? styles.active : ''}>
          <FileText size={18} /> Documentos
        </Link>
      </div>
    </aside>
  );
}

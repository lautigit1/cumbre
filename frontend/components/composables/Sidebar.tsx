"use client";
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { LayoutDashboard, Users, MessageCircle, Bell, User, Calendar, FileText } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <Link href="/dashboard"><LayoutDashboard size={18} /> Dashboard</Link>
        <Link href="/talento"><Users size={18} /> Talento</Link>
        <Link href="/mensajes"><MessageCircle size={18} /> Mensajes</Link>
        <Link href="/notificaciones"><Bell size={18} /> Notificaciones</Link>
        <Link href="/alertas"><Bell size={18} /> Alertas</Link>
        <Link href="/agenda"><Calendar size={18} /> Agenda</Link>
        <Link href="/documentos"><FileText size={18} /> Documentos</Link>
        <Link href="/perfil"><User size={18} /> Perfil</Link>
      </div>
    </aside>
  );
}

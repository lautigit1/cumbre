"use client";
import styles from './HeaderGlass.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Triangle, User, LogOut, Briefcase, MessageCircle, LayoutDashboard } from 'lucide-react';

export function HeaderGlass() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cumbre_tokens');
      setShowUserMenu(false);
      router.push('/');
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <div className={styles.logoIcon}>
          <Triangle size={28} strokeWidth={2.5} fill="currentColor" />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>CUMBRE</span>
          <span className={styles.brandTagline}>Soberanía Digital</span>
        </div>
      </Link>
      <div className={styles.spacer}></div>
      <div className={styles.userSection}>
        <div className={styles.userMenuContainer} ref={userMenuRef}>
          <button
            className={styles.userAvatar}
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(!showUserMenu);
            }}
          >
            LS
          </button>
          {showUserMenu && (
            <div className={styles.userMenu}>
              <Link href="/dashboard" className={styles.menuItem}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <Link href="/talento" className={styles.menuItem}>
                <Briefcase size={16} />
                <span>Talento</span>
              </Link>
              <Link href="/mensajes" className={styles.menuItem}>
                <MessageCircle size={16} />
                <span>Mensajes</span>
              </Link>
              <Link href="/perfil" className={styles.menuItem}>
                <User size={16} />
                <span>Perfil</span>
              </Link>
              <div className={styles.menuDivider} />
              <button onClick={handleLogout} className={styles.menuItem}>
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

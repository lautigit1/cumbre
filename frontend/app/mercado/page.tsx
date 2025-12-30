import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import styles from '@/styles/dashboard.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';

export default function MercadoPage() {
  return (
    <main className={styles.page}>
      <HeaderGlass />

      <div className={styles.container}>
        <Sidebar />

        <section className={styles.mainContent}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Mercado</h2>

              <Link className={styles.viewAllBtn} href="/dashboard">
                <ChevronLeft size={16} /> Volver
              </Link>
            </div>

            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)' }}>
              Próximamente: marketplace de activos e inversiones.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

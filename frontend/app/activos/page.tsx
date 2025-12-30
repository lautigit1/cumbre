import Link from 'next/link';
import { ChevronLeft, Star, TrendingDown, TrendingUp } from 'lucide-react';

import styles from '@/styles/dashboard.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';

const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const activos = [
  { name: 'CUMBRE ONE', value: 128400, change: 8.2, allocation: 30 },
  { name: 'HELIOS', value: 82000, change: 5.4, allocation: 19 },
  { name: 'ARES', value: 64700, change: -1.2, allocation: 15 },
  { name: 'CONSTELACIÓN', value: 45200, change: 3.8, allocation: 11 },
  { name: 'NEXO', value: 38900, change: 2.1, allocation: 9 },
  { name: 'ATLAS', value: 27100, change: -0.6, allocation: 7 },
];

export default function ActivosPage() {
  return (
    <main className={styles.page}>
      <HeaderGlass />

      <div className={styles.container}>
        <Sidebar />

        <section className={styles.mainContent}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Activos</h2>

              <Link className={styles.viewAllBtn} href="/dashboard">
                <ChevronLeft size={16} /> Volver
              </Link>
            </div>

            <div className={styles.assetsGrid}>
              {activos.map((asset) => (
                <Link key={asset.name} href="/mercado" className={styles.assetCard}>
                  <div className={styles.assetHeader}>
                    <div className={styles.assetIcon}>
                      <Star size={20} />
                    </div>
                    <div className={styles.assetInfo}>
                      <h4>{asset.name}</h4>
                      <p className={styles.assetValue}>${formatNumber(asset.value)}</p>
                    </div>
                  </div>

                  <div className={styles.assetStats}>
                    <div className={styles.assetChange} style={{ color: asset.change >= 0 ? '#26de81' : '#ff6b6b' }}>
                      {asset.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </div>
                    <div className={styles.assetAllocation}>
                      {asset.allocation}% del portfolio
                    </div>
                  </div>

                  <div className={styles.assetProgress}>
                    <div
                      className={styles.assetProgressBar}
                      style={{ width: `${asset.allocation}%`, background: '#E6B37E' }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

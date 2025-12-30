'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, 
  Bell, Calendar, FileText, Users, MessageSquare,
  Zap, Shield, Award, ChevronRight, PlusCircle,
  ArrowUpRight, Eye, Star, Target, Briefcase
} from 'lucide-react';
import styles from '@/styles/dashboard.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';
import { servicios } from '@/services';

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    portfolioValue: 0,
    dailyChange: 0,
    weeklyChange: 0,
    monthlyChange: 0,
    totalAssets: 0,
    activeAlerts: 0,
    pendingTasks: 0,
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [topAssets, setTopAssets] = useState<any[]>([]);

  useEffect(() => {
    setStats({
      portfolioValue: 426000,
      dailyChange: 5.4,
      weeklyChange: 12.8,
      monthlyChange: 23.4,
      totalAssets: 12,
      activeAlerts: 9,
      pendingTasks: 3,
    });

    setRecentActivity([
      { id: 1, type: 'buy', asset: 'CUMBRE ONE', amount: '$12,400', time: '10 min', status: 'completed' },
      { id: 2, type: 'alert', message: 'BTC alcanzó $45K', time: '1h', status: 'new' },
      { id: 3, type: 'message', from: 'Astrid Vega', preview: 'Revisión de código lista', time: '2h', status: 'unread' },
      { id: 4, type: 'sell', asset: 'HELIOS', amount: '$8,200', time: '3h', status: 'completed' },
    ]);

    setTopAssets([
      { name: 'CUMBRE ONE', value: 128400, change: 8.2, allocation: 30 },
      { name: 'HELIOS', value: 82000, change: 5.4, allocation: 19 },
      { name: 'ARES', value: 64700, change: -1.2, allocation: 15 },
      { name: 'CONSTELACIÓN', value: 45200, change: 3.8, allocation: 11 },
    ]);
  }, []);

  const quickActions = [
    { icon: PlusCircle, label: 'Invertir', color: '#26de81', path: '/mercado' },
    { icon: Bell, label: 'Alertas', color: '#ffa502', path: '/alertas' },
    { icon: Calendar, label: 'Agenda', color: '#6c5ce7', path: '/agenda' },
    { icon: Users, label: 'Talento', color: '#00d2d3', path: '/talento' },
  ];

  if (stats.portfolioValue === 0) {
    return <div className={styles.page}><HeaderGlass /><div className={styles.container}><Sidebar /></div></div>;
  }

  return (
    <main className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.container}>
        <Sidebar />
        <section className={styles.mainContent}>
          {/* Hero Stats */}
          <div className={styles.heroSection}>
            <div className={styles.portfolioCard}>
              <div className={styles.portfolioHeader}>
                <div>
                  <p className={styles.portfolioLabel}>Valor Total del Portfolio</p>
                  <h1 className={styles.portfolioValue}>
                    ${stats.portfolioValue.toLocaleString()}
                    <span className={styles.currency}>USD</span>
                  </h1>
                </div>
                <div className={styles.changeIndicator}>
                  <TrendingUp size={32} />
                </div>
              </div>
              
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(38, 222, 129, 0.15)' }}>
                    <Activity size={20} style={{ color: '#26de81' }} />
                  </div>
                  <div>
                    <p className={styles.statLabel}>24h</p>
                    <p className={styles.statValue}>+{stats.dailyChange}%</p>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(102, 92, 231, 0.15)' }}>
                    <TrendingUp size={20} style={{ color: '#665ce7' }} />
                  </div>
                  <div>
                    <p className={styles.statLabel}>7d</p>
                    <p className={styles.statValue}>+{stats.weeklyChange}%</p>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(230, 179, 126, 0.15)' }}>
                    <Target size={20} style={{ color: '#E6B37E' }} />
                  </div>
                  <div>
                    <p className={styles.statLabel}>30d</p>
                    <p className={styles.statValue}>+{stats.monthlyChange}%</p>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(0, 210, 211, 0.15)' }}>
                    <Briefcase size={20} style={{ color: '#00d2d3' }} />
                  </div>
                  <div>
                    <p className={styles.statLabel}>Activos</p>
                    <p className={styles.statValue}>{stats.totalAssets}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h3 className={styles.sectionTitle}>Acciones Rápidas</h3>
              <div className={styles.actionsGrid}>
                {quickActions.map((action, i) => (
                  <motion.button
                    key={i}
                    className={styles.actionBtn}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => router.push(action.path)}
                  >
                    <div className={styles.actionIcon} style={{ background: `${action.color}15`, color: action.color }}>
                      <action.icon size={24} />
                    </div>
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Top Assets */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Mis Activos Principales</h2>
              <button
                className={styles.viewAllBtn}
                type="button"
                onClick={() => router.push('/activos')}
              >
                Ver todos <ChevronRight size={16} />
              </button>
            </div>
            
            <div className={styles.assetsGrid}>
              {topAssets.map((asset, i) => (
                <motion.div
                  key={i}
                  className={styles.assetCard}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push('/activos')}
                >
                  <div className={styles.assetHeader}>
                    <div className={styles.assetIcon}>
                      <Star size={20} />
                    </div>
                    <div className={styles.assetInfo}>
                      <h4>{asset.name}</h4>
                      <p className={styles.assetValue}>${asset.value.toLocaleString()}</p>
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Actividad Reciente</h2>
              <button
                className={styles.viewAllBtn}
                type="button"
                onClick={() => router.push('/notificaciones')}
              >
                Ver todo <ChevronRight size={16} />
              </button>
            </div>
            
            <div className={styles.activityList}>
              {recentActivity.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={styles.activityItem}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => {
                    if (item.type === 'buy' || item.type === 'sell') router.push('/mercado');
                    else if (item.type === 'alert') router.push('/alertas');
                    else if (item.type === 'message') router.push('/mensajes');
                    else router.push('/notificaciones');
                  }}
                >
                  <div className={styles.activityIcon} style={{ 
                    background: item.type === 'buy' ? 'rgba(38, 222, 129, 0.15)' :
                               item.type === 'sell' ? 'rgba(255, 107, 107, 0.15)' :
                               item.type === 'alert' ? 'rgba(255, 165, 2, 0.15)' :
                               'rgba(102, 92, 231, 0.15)',
                    color: item.type === 'buy' ? '#26de81' :
                          item.type === 'sell' ? '#ff6b6b' :
                          item.type === 'alert' ? '#ffa502' :
                          '#665ce7'
                  }}>
                    {item.type === 'buy' && <TrendingUp size={20} />}
                    {item.type === 'sell' && <TrendingDown size={20} />}
                    {item.type === 'alert' && <Bell size={20} />}
                    {item.type === 'message' && <MessageSquare size={20} />}
                  </div>
                  
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>
                      {item.type === 'buy' && `Compra de ${item.asset}`}
                      {item.type === 'sell' && `Venta de ${item.asset}`}
                      {item.type === 'alert' && item.message}
                      {item.type === 'message' && `Mensaje de ${item.from}`}
                    </p>
                    {(item.type === 'buy' || item.type === 'sell') && (
                      <p className={styles.activityAmount}>{item.amount}</p>
                    )}
                    {item.type === 'message' && (
                      <p className={styles.activityPreview}>{item.preview}</p>
                    )}
                  </div>
                  
                  <div className={styles.activityMeta}>
                    <span className={styles.activityTime}>{item.time}</span>
                    {item.status === 'new' && <span className={styles.activityBadge}>Nuevo</span>}
                    {item.status === 'unread' && <span className={styles.activityBadge}>No leído</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

'use client';

import styles from '@/styles/sections.module.scss';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { TalentoCard, Talento } from '@/components/composables/TalentoCard';
import { ChipFiltro } from '@/components/atomicos/ChipFiltro';

const talentos: Talento[] = [
  { id: 't1', nombre: 'Astrid Vega', rol: 'AI Researcher', rating: 4.8, propuestas: 12, skills: ['PyTorch', 'RL', 'NLP'] },
  { id: 't2', nombre: 'Diego Sol', rol: 'Backend Senior', rating: 4.6, propuestas: 7, skills: ['Node', 'Nest', 'Postgres'] },
  { id: 't3', nombre: 'Mara Orion', rol: 'Product Lead', rating: 4.9, propuestas: 5, skills: ['Discovery', 'KPIs', 'Roadmap'] },
  { id: 't4', nombre: 'Nova Quinn', rol: 'Data Engineer', rating: 4.7, propuestas: 6, skills: ['Spark', 'Airflow', 'dbt'] },
];

export default function TalentoPage() {
  const filtros = ['Todos', 'IA', 'Backend', 'Data', 'Producto'];
  return (
    <main className={styles.page}>
      <header className={styles.headerRow}>
        <div>
          <p>Descubre talento curado</p>
          <h1>Talento</h1>
        </div>
        <div className={styles.pillRow}>
          {filtros.map((f, idx) => (
            <ChipFiltro key={f} label={f} activo={idx === 0} />
          ))}
          <BotonCobre>Publicar búsqueda</BotonCobre>
        </div>
      </header>
      <div className={styles.grid}>
        {talentos.map((t) => (
          <TalentoCard key={t.id} data={t} />
        ))}
      </div>
    </main>
  );
}

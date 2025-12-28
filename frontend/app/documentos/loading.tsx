import { Skeleton } from '@/components/atomicos/Skeleton';
import secciones from '@/styles/sections.module.scss';

export default function LoadingDocumentos() {
  return (
    <div className={secciones.page}>
      <div className={secciones.headerRow}>
        <Skeleton width={160} height={24} />
      </div>
      <div className={`${secciones.grid} ${secciones.twoCols}`}>
        <div className={secciones.card}>
          <Skeleton height={20} />
          <div className={secciones.formGrid}>
            <Skeleton height={40} />
            <Skeleton height={120} />
            <Skeleton height={32} />
          </div>
        </div>
        <div className={secciones.card}>
          <Skeleton height={20} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from '@/components/atomicos/Skeleton';

export default function LoadingMensajes() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Skeleton height="48px" />
      <Skeleton height="240px" />
    </div>
  );
}

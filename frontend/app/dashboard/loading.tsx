import { Skeleton } from '@/components/atomicos/Skeleton';

export default function LoadingDashboard() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Skeleton height="64px" />
      <Skeleton height="200px" />
      <Skeleton height="180px" />
    </div>
  );
}

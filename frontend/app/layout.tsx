import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'CUMBRE v2.0',
  description: 'Frontend CUMBRE v2.0 - Piedra y Cobre',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

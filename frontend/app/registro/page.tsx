'use client';

import Link from 'next/link';
import { useState } from 'react';
import { servicios, setTokens } from '@/services';
import { useRouter } from 'next/navigation';
import styles from '@/styles/sections.module.scss';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { ProgressBarCobre } from '@/components/atomicos/ProgressBarCobre';

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const actualizar = (campo: string, valor: string) => setForm((prev) => ({ ...prev, [campo]: valor }));

  return (
    <main className={styles.page}>
      <header className={styles.headerRow}>
        <div>
          <p>Comienza tu perfil</p>
          <h1>Registro</h1>
        </div>
        <Link href="/login">¿Ya tienes cuenta? Ingresa</Link>
      </header>
      <section className={styles.card}>
        <div className={styles.formGrid}>
          <InputSoberano label="Nombre" placeholder="Tu nombre" value={form.nombre} onChange={(e) => actualizar('nombre', e.target.value)} />
          <InputSoberano label="Correo" placeholder="tu@email.com" value={form.email} onChange={(e) => actualizar('email', e.target.value)} />
          <InputSoberano label="Contraseña" type="password" placeholder="••••••" value={form.password} onChange={(e) => actualizar('password', e.target.value)} />
          <BotonCobre
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                const tokens = await servicios.registro(form);
                setTokens(tokens);
                router.push('/dashboard');
              } catch (e) {
                setError('Error al registrar');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Creando…' : 'Crear cuenta'}
          </BotonCobre>
          {error && <p style={{ color: '#ff9aa2' }}>{error}</p>}
        </div>
        <div>
          <p className={styles.muted}>Checklist onboarding</p>
          <ProgressBarCobre valor={33} label="Paso 1/3" />
        </div>
      </section>
    </main>
  );
}

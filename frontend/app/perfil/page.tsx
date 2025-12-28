'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/sections.module.scss';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { BadgeNotificacion } from '@/components/atomicos/BadgeNotificacion';
import { ProgressBarCobre } from '@/components/atomicos/ProgressBarCobre';
import { servicios } from '@/services';

export default function PerfilPage() {
  const [perfil, setPerfil] = useState({ nombre: 'Lautaro', email: 'lautaro@cumbre.ai', rol: 'Commander' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const actualizar = (campo: string, valor: string) => setPerfil((prev) => ({ ...prev, [campo]: valor }));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await servicios.obtenerPerfil();
        setPerfil({ nombre: data.nombre, email: data.email, rol: data.rol });
      } catch {
        // fallback al mock
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.headerRow}>
        <div>
          <p>Control de identidad</p>
          <h1>Perfil</h1>
        </div>
        <BadgeNotificacion conteo={1}>Plan activo</BadgeNotificacion>
      </header>
      <section className={styles.card}>
        <div className={styles.formGrid}>
          <InputSoberano label="Nombre" value={perfil.nombre} onChange={(e) => actualizar('nombre', e.target.value)} />
          <InputSoberano label="Correo" value={perfil.email} onChange={(e) => actualizar('email', e.target.value)} />
          <InputSoberano label="Rol" value={perfil.rol} onChange={(e) => actualizar('rol', e.target.value)} />
          <BotonCobre
            onClick={async () => {
              try {
                setLoading(true);
                await servicios.actualizarPerfil({ nombre: perfil.nombre });
              } catch (e) {
                setError('Error al guardar');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Guardando…' : 'Guardar perfil'}
          </BotonCobre>
          {error && <p style={{ color: '#ff9aa2' }}>{error}</p>}
        </div>
      </section>
      <section className={styles.card}>
        <h3>Seguridad y plan</h3>
        <div className={styles.grid} style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <p className={styles.muted}>2FA activo</p>
            <p>Revisa tus dispositivos autorizados.</p>
            <BotonCobre variante="secundario">Gestionar 2FA</BotonCobre>
          </div>
          <div>
            <p className={styles.muted}>Uso de cuota</p>
            <ProgressBarCobre valor={68} label="Almacenamiento seguro" />
          </div>
        </div>
      </section>
    </main>
  );
}

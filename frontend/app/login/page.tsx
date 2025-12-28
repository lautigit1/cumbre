'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicios } from '@/services';
import { setTokens } from '@/services';
import loginStyles from '@/styles/login.module.scss';
import { BotonCobre } from '@/components/atomicos/BotonCobre';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const actualizar = (campo: string, valor: string) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValido = form.password.length >= 6;
  const formValido = emailValido && passwordValido && !loading;

  const manejarLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await servicios.login(form);
      setTokens(tokens);
      router.push('/dashboard');
    } catch (e) {
      setError((e as Error).message || 'Error de autenticación. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.bgGradient} />
      <div className={loginStyles.bgParticles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={loginStyles.particle}
            animate={{
              y: [0, -100 - i * 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <main className={loginStyles.main}>
        <motion.section
          className={loginStyles.branding}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={loginStyles.brandContent}>
            <h1 className={loginStyles.logo}>CUMBRE</h1>
            <p className={loginStyles.tagline}>Invierte con inteligencia. Colabora sin límites.</p>
            <ul className={loginStyles.features}>
              <li>✓ Dashboard con métricas en tiempo real</li>
              <li>✓ Red de talento global verificada</li>
              <li>✓ Portafolio inteligente con IA</li>
              <li>✓ Chat seguro y notificaciones</li>
            </ul>
            <div className={loginStyles.stats}>
              <div className={loginStyles.stat}>
                <strong>2.4K+</strong>
                <span>Usuarios activos</span>
              </div>
              <div className={loginStyles.stat}>
                <strong>$48M</strong>
                <span>Invertido</span>
              </div>
              <div className={loginStyles.stat}>
                <strong>99.9%</strong>
                <span>SLA garantizado</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className={loginStyles.formSection}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={loginStyles.formCard}>
            <div className={loginStyles.header}>
              <h2>Bienvenido de vuelta</h2>
              <p>Ingresa con tus credenciales para acceder</p>
            </div>

            <div className={loginStyles.inputGroup}>
              <label htmlFor="email" className={loginStyles.label}>
                <Mail size={16} />
                Correo electrónico
              </label>
              <motion.div
                className={`${loginStyles.inputWrapper} ${focused === 'email' ? loginStyles.focused : ''} ${emailValido ? loginStyles.valid : ''}`}
                animate={{
                  borderColor: focused === 'email' ? 'rgba(230, 179, 126, 0.8)' : 'rgba(230, 179, 126, 0.3)',
                }}
              >
                <InputSoberano
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => actualizar('email', e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
                {emailValido && <span className={loginStyles.checkmark}>✓</span>}
              </motion.div>
              {form.email && !emailValido && <p className={loginStyles.error}>Email inválido</p>}
            </div>

            <div className={loginStyles.inputGroup}>
              <label htmlFor="password" className={loginStyles.label}>
                <Lock size={16} />
                Contraseña
              </label>
              <motion.div
                className={`${loginStyles.inputWrapper} ${focused === 'password' ? loginStyles.focused : ''} ${passwordValido ? loginStyles.valid : ''}`}
                animate={{
                  borderColor: focused === 'password' ? 'rgba(230, 179, 126, 0.8)' : 'rgba(230, 179, 126, 0.3)',
                }}
              >
                <InputSoberano
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={(e) => actualizar('password', e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  className={loginStyles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </motion.div>
              {form.password && !passwordValido && <p className={loginStyles.error}>Mínimo 6 caracteres</p>}
            </div>

            {error && (
              <motion.div
                className={loginStyles.errorBox}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{error}</p>
              </motion.div>
            )}

            <motion.button
              className={`${loginStyles.submitBtn} ${formValido ? loginStyles.enabled : ''}`}
              onClick={manejarLogin}
              disabled={!formValido}
              whileHover={formValido ? { scale: 1.02 } : {}}
              whileTap={formValido ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ↻
                </motion.span>
              ) : (
                <>
                  Acceder al dashboard
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>

            <div className={loginStyles.divider}>O continúa con</div>

            <div className={loginStyles.socialLogins}>
              <button className={loginStyles.socialBtn} title="Google" disabled>
                G
              </button>
              <button className={loginStyles.socialBtn} title="GitHub" disabled>
                ⚙
              </button>
              <button className={loginStyles.socialBtn} title="Microsoft" disabled>
                ⊞
              </button>
            </div>

            <div className={loginStyles.footer}>
              <p>
                ¿Sin cuenta?{' '}
                <Link href="/registro" className={loginStyles.link}>
                  Regístrate aquí
                </Link>
              </p>
              <p className={loginStyles.legal}>
                Al continuar aceptas nuestros <Link href="#" className={loginStyles.legalLink}>Términos</Link> y{' '}
                <Link href="#" className={loginStyles.legalLink}>Privacidad</Link>
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { servicios, setTokens } from '@/services';
import loginStyles from '@/styles/login.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles, Shield, Zap, TrendingUp, Cpu } from 'lucide-react';

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

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValido) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await servicios.identidad.ingreso({
        correo: form.email,
        clave: form.password,
      });
      setTokens(response);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error de autenticación. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={loginStyles.container}>
      {/* Fondo animado con gradiente */}
      <div className={loginStyles.bgGradient} />
      
      {/* Malla de puntos animada */}
      <div className={loginStyles.bgGrid} />

      {/* Logo flotante arriba izquierda */}
      <motion.div 
        className={loginStyles.floatingLogo}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={loginStyles.logoIcon}>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D4A8" />
                <stop offset="50%" stopColor="#E6B37E" />
                <stop offset="100%" stopColor="#C9985E" />
              </linearGradient>
            </defs>
            <path d="M24 6L42 38H6L24 6Z" fill="url(#logoGradient)" />
            <path d="M24 14L34 34H14L24 14Z" fill="rgba(0,0,0,0.3)" />
            <path d="M24 6L28 14H20L24 6Z" fill="#FFF" fillOpacity="0.4" />
          </svg>
        </div>
        <h1 className={loginStyles.logo}>CUMBRE</h1>
      </motion.div>

      {/* Cards flotantes con info */}
      <motion.div 
        className={loginStyles.floatingCard}
        style={{ top: '15%', left: '8%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Shield size={20} />
        <span>Seguridad Empresarial</span>
      </motion.div>

      <motion.div 
        className={loginStyles.floatingCard}
        style={{ top: '25%', right: '10%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Zap size={20} />
        <span>Acceso Instantáneo</span>
      </motion.div>

      <motion.div 
        className={loginStyles.floatingCard}
        style={{ bottom: '20%', left: '12%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <TrendingUp size={20} />
        <span>12,500+ Usuarios</span>
      </motion.div>

      <motion.div 
        className={loginStyles.floatingCard}
        style={{ bottom: '15%', right: '12%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Cpu size={20} />
        <span>IA Avanzada</span>
      </motion.div>

      <motion.div 
        className={loginStyles.floatingCard}
        style={{ top: '50%', right: '5%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <Sparkles size={20} />
        <span>99.9% Uptime</span>
      </motion.div>

      <main className={loginStyles.main}>
        {/* Formulario centrado */}
        <motion.section
          className={loginStyles.formSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <form className={loginStyles.card} onSubmit={manejarLogin}>
            <div className={loginStyles.header}>
              <h2>Bienvenido de vuelta</h2>
              <p>Accede a tu panel de control</p>
            </div>

            {/* Campo de email */}
            <div className={loginStyles.inputGroup}>
              <label htmlFor="email" className={loginStyles.label}>
                <Mail size={16} />
                Correo electrónico
              </label>
              <div
                className={`${loginStyles.inputWrapper} ${
                  focused === 'email' ? loginStyles.focused : ''
                } ${form.email && emailValido ? loginStyles.valid : ''} ${
                  form.email && !emailValido ? loginStyles.invalid : ''
                }`}
              >
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => actualizar('email', e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className={loginStyles.input}
                  autoComplete="email"
                />
                {form.email && emailValido && (
                  <motion.span
                    className={loginStyles.checkmark}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
              {form.email && !emailValido && (
                <motion.p
                  className={loginStyles.errorText}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Ingresa un email válido
                </motion.p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className={loginStyles.inputGroup}>
              <label htmlFor="password" className={loginStyles.label}>
                <Lock size={16} />
                Contraseña
              </label>
              <div
                className={`${loginStyles.inputWrapper} ${
                  focused === 'password' ? loginStyles.focused : ''
                } ${form.password && passwordValido ? loginStyles.valid : ''} ${
                  form.password && !passwordValido ? loginStyles.invalid : ''
                }`}
              >
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={(e) => actualizar('password', e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className={loginStyles.input}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={loginStyles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && !passwordValido && (
                <motion.p
                  className={loginStyles.errorText}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  La contraseña debe tener al menos 6 caracteres
                </motion.p>
              )}
            </div>

            {/* Mensaje de error del servidor */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className={loginStyles.errorBox}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de enviar */}
            <motion.button
              type="submit"
              className={`${loginStyles.submitBtn} ${formValido ? loginStyles.enabled : ''}`}
              disabled={!formValido}
              whileHover={formValido ? { scale: 1.01, y: -1 } : {}}
              whileTap={formValido ? { scale: 0.99 } : {}}
            >
              {loading ? (
                <motion.span
                  className={loginStyles.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⟳
                </motion.span>
              ) : (
                <>
                  Acceder al dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <div className={loginStyles.divider}>
              <span>O continúa con</span>
            </div>

            {/* Botones sociales */}
            <div className={loginStyles.socialLogins}>
              <motion.button
                type="button"
                className={loginStyles.socialBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Google"
                disabled
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className={loginStyles.socialBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="GitHub"
                disabled
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className={loginStyles.socialBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Microsoft"
                disabled
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
              </motion.button>
            </div>

            {/* Footer */}
            <div className={loginStyles.footer}>
              <p>
                ¿No tienes cuenta?{' '}
                <button onClick={() => window.location.href = '/registro'} className={loginStyles.link} style={{background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer'}}>
                  Regístrate gratis
                </button>
              </p>
              <p className={loginStyles.legal}>
                Al continuar aceptas nuestros{' '}
                <Link href="#" className={loginStyles.legalLink}>
                  Términos
                </Link>{' '}
                y{' '}
                <Link href="#" className={loginStyles.legalLink}>
                  Privacidad
                </Link>
              </p>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  );
}

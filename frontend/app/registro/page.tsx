'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicios, setTokens } from '@/services';
import loginStyles from '@/styles/login.module.scss';
import { ArrowRight, Mail, Lock, Eye, EyeOff, User, Sparkles, Shield, CheckCircle2, Users, } from 'lucide-react';

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'ESTUDIANTE' as const
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const actualizar = (campo: string, valor: string) => setForm((prev) => ({ ...prev, [campo]: valor }));
  
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValido = 
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /[0-9]/.test(form.password) &&
    /[^A-Za-z0-9]/.test(form.password);
  const passwordsCoinciden = form.password === form.confirmPassword && form.confirmPassword.length > 0;
  const nombreValido = form.nombre.trim().length >= 2;
  const apellidoValido = form.apellido.trim().length >= 2;
  const formValido = emailValido && passwordValido && passwordsCoinciden && nombreValido && apellidoValido && !loading;

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValido) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await servicios.registro({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.email,
        clave: form.password,
      });
      setTokens(response);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Error al registrar. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const pw = form.password;
    if (pw.length === 0) return { text: '', color: '', percent: 0 };
    
    let score = 0;
    let text = '';
    let color = '';
    
    // Longitud mínima (8 caracteres)
    if (pw.length >= 8) score += 25;
    else return { text: 'Muy Débil - Mínimo 8 caracteres', color: '#ff6b6b', percent: 10 };
    
    // Mayúscula
    if (/[A-Z]/.test(pw)) score += 25;
    
    // Minúscula
    if (/[a-z]/.test(pw)) score += 25;
    
    // Número
    if (/[0-9]/.test(pw)) score += 12.5;
    
    // Carácter especial
    if (/[^A-Za-z0-9]/.test(pw)) score += 12.5;
    
    if (score < 50) {
      text = 'Débil';
      color = '#ff6b6b';
    } else if (score < 75) {
      text = 'Media';
      color = '#ffa502';
    } else if (score < 100) {
      text = 'Buena';
      color = '#ffb142';
    } else {
      text = 'Excelente';
      color = '#26de81';
    }
    
    return { text, color, percent: score };
  };

  const strength = passwordStrength();

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.bgGradient} />
      <div className={loginStyles.bgGrid} />

      {/* Logo flotante arriba izquierda */}
      <div 
        className={loginStyles.floatingLogo}
      >
        <div className={loginStyles.logoIcon}>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradientReg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D4A8" />
                <stop offset="50%" stopColor="#E6B37E" />
                <stop offset="100%" stopColor="#C9985E" />
              </linearGradient>
            </defs>
            <path d="M24 6L42 38H6L24 6Z" fill="url(#logoGradientReg)" />
            <path d="M24 14L34 34H14L24 14Z" fill="rgba(0,0,0,0.3)" />
            <path d="M24 6L28 14H20L24 6Z" fill="#FFF" fillOpacity="0.4" />
          </svg>
        </div>
        <h1 className={loginStyles.logo}>CUMBRE</h1>
      </div>

      {/* Cards flotantes con info */}
      <div 
        className={loginStyles.floatingCard}
        style={{ top: '18%', left: '10%' }}
      >
        <Sparkles size={20} />
        <span>100% Gratis</span>
      </div>

      <div 
        className={loginStyles.floatingCard}
        style={{ top: '30%', right: '8%' }}
      >
        <Shield size={20} />
        <span>Datos Protegidos</span>
      </div>

      <div 
        className={loginStyles.floatingCard}
        style={{ bottom: '25%', left: '8%' }}
      >
        <CheckCircle2 size={20} />
        <span>Acceso Inmediato</span>
      </div>

      <div 
        className={loginStyles.floatingCard}
        style={{ bottom: '18%', right: '10%' }}
      >
        <Users size={20} />
        <span>12,500+ Miembros</span>
      </div>

      <div 
        className={loginStyles.floatingCard}
        style={{ top: '55%', right: '6%' }}
      >
        <Lock size={20} />
        <span>Encriptación E2E</span>
      </div>

      <main className={loginStyles.main}>
        <section
          className={loginStyles.formSection}
        >
          <form className={loginStyles.card} onSubmit={manejarRegistro}>
            <div className={loginStyles.header}>
              <h2>Crea tu cuenta</h2>
              <p>Únete a la revolución digital</p>
            </div>

            {/* Nombre y Apellido */}
            <div className={loginStyles.inputRow}>
              <div className={loginStyles.inputGroup}>
                <label htmlFor="nombre" className={loginStyles.label}>
                  <User size={16} />
                  Nombre
                </label>
                <div
                  className={`${loginStyles.inputWrapper} ${
                    focused === 'nombre' ? loginStyles.focused : ''
                  } ${nombreValido && form.nombre ? loginStyles.valid : ''}`}
                >
                  <input
                    id="nombre"
                    type="text"
                    className={loginStyles.input}
                    placeholder="Juan"
                    value={form.nombre}
                    onChange={(e) => actualizar('nombre', e.target.value)}
                    onFocus={() => setFocused('nombre')}
                    onBlur={() => setFocused(null)}
                  />
                  {nombreValido && form.nombre && <span className={loginStyles.checkmark}>✓</span>}
                </div>
              </div>

              <div className={loginStyles.inputGroup}>
                <label htmlFor="apellido" className={loginStyles.label}>
                  <User size={16} />
                  Apellido
                </label>
                <div
                  className={`${loginStyles.inputWrapper} ${
                    focused === 'apellido' ? loginStyles.focused : ''
                  } ${apellidoValido && form.apellido ? loginStyles.valid : ''}`}
                >
                  <input
                    id="apellido"
                    type="text"
                    className={loginStyles.input}
                    placeholder="Pérez"
                    value={form.apellido}
                    onChange={(e) => actualizar('apellido', e.target.value)}
                    onFocus={() => setFocused('apellido')}
                    onBlur={() => setFocused(null)}
                  />
                  {apellidoValido && form.apellido && <span className={loginStyles.checkmark}>✓</span>}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className={loginStyles.inputGroup}>
              <label htmlFor="email" className={loginStyles.label}>
                <Mail size={16} />
                Correo electrónico
              </label>
              <div
                className={`${loginStyles.inputWrapper} ${
                  focused === 'email' ? loginStyles.focused : ''
                } ${emailValido && form.email ? loginStyles.valid : ''}`}
              >
                <input
                  id="email"
                  type="email"
                  className={loginStyles.input}
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => actualizar('email', e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
                {emailValido && form.email && <span className={loginStyles.checkmark}>✓</span>}
              </div>
            </div>

            {/* Contraseña */}
            <div className={loginStyles.inputGroup}>
              <label htmlFor="password" className={loginStyles.label}>
                <Lock size={16} />
                Contraseña
              </label>
              <div
                className={`${loginStyles.inputWrapper} ${
                  focused === 'password' ? loginStyles.focused : ''
                } ${passwordValido && form.password ? loginStyles.valid : ''}`}
              >
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={loginStyles.input}
                  placeholder="Mínimo 8 caracteres, incluye mayúsculas, números y símbolos"
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {form.password && (
                <div className={loginStyles.strengthBar}>
                  <div className={loginStyles.strengthProgress}>
                    <div
                      className={loginStyles.strengthFill}
                      style={{
                        width: `${strength.percent}%`,
                        backgroundColor: strength.color,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: strength.color, fontWeight: 600 }}>
                    {strength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className={loginStyles.inputGroup}>
              <label htmlFor="confirmPassword" className={loginStyles.label}>
                <Lock size={16} />
                Confirmar contraseña
              </label>
              <div
                className={`${loginStyles.inputWrapper} ${
                  focused === 'confirmPassword' ? loginStyles.focused : ''
                } ${
                  passwordsCoinciden
                    ? loginStyles.valid
                    : form.confirmPassword && !passwordsCoinciden
                    ? loginStyles.invalid
                    : ''
                }`}
              >
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={loginStyles.input}
                  placeholder="Repite tu contraseña"
                  value={form.confirmPassword}
                  onChange={(e) => actualizar('confirmPassword', e.target.value)}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  className={loginStyles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {passwordsCoinciden && <span className={loginStyles.checkmark}>✓</span>}
              </div>
              {form.confirmPassword && !passwordsCoinciden && (
                <p className={loginStyles.errorText}>Las contraseñas no coinciden</p>
              )}
            </div>

            {/* Error */}
            <>
              {error && (
                <div
                  className={loginStyles.errorBox}
                >
                  <p>{error}</p>
                </div>
              )}
            </>

            {/* Botón de registro */}
            <button
              type="submit"
              className={`${loginStyles.submitBtn} ${formValido ? loginStyles.enabled : ''}`}
              disabled={!formValido}
            >
              {loading ? (
                <>
                  <span className={loginStyles.spinner}>⏳</span>
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <span>Crear cuenta</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Footer */}
            <div className={loginStyles.footer}>
              <p>
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => window.location.href = '/login'} className={loginStyles.link} style={{background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer'}}>
                  Inicia sesión
                </button>
              </p>
              <p className={loginStyles.legal}>
                Al registrarte aceptas nuestros{' '}
                <Link href="/terminos" className={loginStyles.legalLink}>
                  Términos de Servicio
                </Link>{' '}
                y{' '}
                <Link href="/privacidad" className={loginStyles.legalLink}>
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

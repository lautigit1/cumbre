import { z } from 'zod';
import { apiFetch, setTokens as setTokensInternal, clearTokens as clearTokensInternal } from './client';
import { ActivoSchema, MensajeSchema, NotificacionSchema, PrecioSchema, TokenSchema, UsuarioSchema } from './schemas';

export type Credenciales = { correo: string; clave: string };
export type RegistroPayload = { nombre: string; apellido: string; correo: string; clave: string };
export type AlertaPayload = { ticker: string; umbral: number; direccion: 'arriba' | 'abajo' };
export type MensajePayload = { contenido: string };
export type EventoPayload = { titulo: string; fecha: string; descripcion?: string };

export const servicios = {
  login: (credenciales: Credenciales) => apiFetch('login', { body: credenciales, schema: TokenSchema }),
  registro: (payload: RegistroPayload) => apiFetch('registro', { body: payload, schema: TokenSchema }),
  refresh: (refreshToken: string) => apiFetch('refresh', { body: { refreshToken }, schema: TokenSchema }),
  logout: () => apiFetch('logout'),

  obtenerPerfil: () => apiFetch('perfil', { schema: UsuarioSchema }),
  actualizarPerfil: (datos: Partial<{ nombre: string; foto: string }>) => apiFetch('actualizarPerfil', { body: datos, schema: UsuarioSchema }),
  subirAvatar: (archivo: string) => apiFetch('subirAvatar', { body: { archivo } }),
  obtenerPreferencias: () => apiFetch('preferencias'),
  actualizarPreferencias: (payload: Record<string, unknown>) => apiFetch('actualizarPreferencias', { body: payload }),
  alternarNotificaciones: () => apiFetch('notificacionesToggle'),

  obtenerNotificaciones: () => apiFetch('obtenerNotificaciones', { schema: z.array(NotificacionSchema) }),
  marcarNotificacionLeida: (id: string) => apiFetch('marcarNotificacionLeida', { params: { id } }),
  marcarTodasLeidas: () => apiFetch('marcarTodasLeidas'),
  borrarNotificacion: (id: string) => apiFetch('borrarNotificacion', { params: { id } }),

  obtenerConversaciones: () => apiFetch('conversaciones'),
  crearConversacion: (usuarios: string[]) => apiFetch('crearConversacion', { body: { usuarios } }),
  mensajesPorConversacion: (id: string) => apiFetch('mensajesPorConversacion', { params: { id }, schema: z.array(MensajeSchema) }),
  enviarMensaje: (id: string, payload: MensajePayload) => apiFetch('enviarMensaje', { params: { id }, body: payload, schema: MensajeSchema }),
  marcarMensajeLeido: (id: string) => apiFetch('marcarMensajeLeido', { params: { id } }),

  resumenPortafolio: () => apiFetch('resumenPortafolio'),
  posiciones: () => apiFetch('posiciones', { schema: z.array(ActivoSchema) }),
  transacciones: () => apiFetch('transacciones'),
  depositar: (monto: number) => apiFetch('depositar', { body: { monto } }),
  retirar: (monto: number) => apiFetch('retirar', { body: { monto } }),
  generarCuentaVirtual: () => apiFetch('generarCuentaVirtual'),

  activosDestacados: () => apiFetch('activosDestacados', { schema: z.array(ActivoSchema) }),
  detalleActivo: (id: string) => apiFetch('detalleActivo', { params: { id }, schema: ActivoSchema }),
  comprarActivo: (id: string, monto: number) => apiFetch('comprarActivo', { params: { id }, body: { monto } }),
  venderActivo: (id: string, monto: number) => apiFetch('venderActivo', { params: { id }, body: { monto } }),

  crearAlertaPrecio: (payload: AlertaPayload) => apiFetch('crearAlertaPrecio', { body: payload }),
  alertasPrecio: () => apiFetch('alertasPrecio'),
  borrarAlertaPrecio: (id: string) => apiFetch('borrarAlertaPrecio', { params: { id } }),
  preciosTiempoReal: () => apiFetch('preciosTiempoReal', { schema: z.array(PrecioSchema) }),
  historicoPrecios: (ticker: string) => apiFetch('historicoPrecios', { query: { ticker }, schema: z.array(PrecioSchema) }),

  reviewsRecibidas: () => apiFetch('reviewsRecibidas'),
  reviewsEmitidas: () => apiFetch('reviewsEmitidas'),
  dejarReview: (destinatarioId: string, rating: number, comentario?: string) => apiFetch('dejarReview', { body: { destinatarioId, rating, comentario } }),

  skillsCatalogo: () => apiFetch('skillsCatalogo'),
  talentosDestacados: () => apiFetch('talentosDestacados'),
  aplicarTalento: (id: string) => apiFetch('aplicarTalento', { params: { id } }),
  guardarTalento: (id: string) => apiFetch('guardarTalento', { params: { id } }),
  eliminarTalentoGuardado: (id: string) => apiFetch('eliminarTalentoGuardado', { params: { id } }),

  dashboardWidgets: () => apiFetch('dashboardWidgets'),
  health: () => apiFetch('health'),

  subirDocumento: (nombre: string, contenido: string) => apiFetch('subirDocumento', { body: { nombre, contenido } }),
  documentos: () => apiFetch('documentos'),
  eliminarDocumento: (id: string) => apiFetch('eliminarDocumento', { params: { id } }),

  agendaEventos: () => apiFetch('agendaEventos'),
  crearEvento: (payload: EventoPayload) => apiFetch('crearEvento', { body: payload }),
  cancelarEvento: (id: string) => apiFetch('cancelarEvento', { params: { id } }),

  onboardingChecklist: () => apiFetch('onboardingChecklist'),
};

export const setTokens = setTokensInternal;
export const clearTokens = clearTokensInternal;

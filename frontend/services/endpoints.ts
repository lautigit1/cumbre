export type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointDef = {
  path: string;
  method: MetodoHttp;
};

// Prefijo de API según backend Nest: /api/v1
const API_PREFIX = '/api/v1';

export const endpoints = {
  // Identidad
  login: { path: `${API_PREFIX}/identidad/ingreso`, method: 'POST' },
  registro: { path: `${API_PREFIX}/identidad/registro`, method: 'POST' },
  refresh: { path: `${API_PREFIX}/identidad/refrescar-token`, method: 'POST' },
  logout: { path: `${API_PREFIX}/identidad/cerrar-sesion`, method: 'POST' },
  perfil: { path: `${API_PREFIX}/identidad/perfil`, method: 'GET' },
  actualizarPerfil: { path: `${API_PREFIX}/identidad/perfil`, method: 'PATCH' },
  subirAvatar: { path: `${API_PREFIX}/identidad/avatar`, method: 'POST' },
  preferencias: { path: `${API_PREFIX}/identidad/preferencias`, method: 'GET' },
  actualizarPreferencias: { path: `${API_PREFIX}/identidad/preferencias`, method: 'POST' },

  // Notificaciones
  obtenerNotificaciones: { path: `${API_PREFIX}/notificaciones`, method: 'GET' },
  marcarTodasLeidas: { path: `${API_PREFIX}/notificaciones/marcar-leidas`, method: 'POST' },
  borrarNotificacion: { path: `${API_PREFIX}/notificaciones/:id`, method: 'DELETE' },
  preferenciasNotificaciones: { path: `${API_PREFIX}/notificaciones/preferencias`, method: 'GET' },
  actualizarPreferenciasNotificaciones: { path: `${API_PREFIX}/notificaciones/preferencias`, method: 'POST' },
  marcarNotificacionLeida: { path: `${API_PREFIX}/notificaciones/:id/marcar-leida`, method: 'POST' },
  notificacionesToggle: { path: `${API_PREFIX}/notificaciones/toggle`, method: 'POST' },

  // Mensajería
  conversaciones: { path: `${API_PREFIX}/mensajeria/conversaciones`, method: 'GET' },
  crearConversacion: { path: `${API_PREFIX}/mensajeria/conversaciones`, method: 'POST' },
  enviarMensaje: { path: `${API_PREFIX}/mensajeria/enviar`, method: 'POST' },
  mensajesPorConversacion: { path: `${API_PREFIX}/mensajeria/:id/mensajes`, method: 'GET' },
  marcarMensajeLeido: { path: `${API_PREFIX}/mensajeria/:id/marcar-leido`, method: 'PATCH' },
  borrarMensaje: { path: `${API_PREFIX}/mensajeria/:id`, method: 'DELETE' },

  // Talento
  explorarProyectos: { path: `${API_PREFIX}/talento/proyectos/explorar`, method: 'GET' },
  detalleProyecto: { path: `${API_PREFIX}/talento/proyectos/:id`, method: 'GET' },
  favoritosAgregar: { path: `${API_PREFIX}/talento/favoritos`, method: 'POST' },
  favoritosEliminar: { path: `${API_PREFIX}/talento/favoritos/:tipo/:entidadId`, method: 'DELETE' },
  favoritosListar: { path: `${API_PREFIX}/talento/favoritos`, method: 'GET' },
  reviewsPorEntidad: { path: `${API_PREFIX}/talento/reviews/:tipo/:entidadId`, method: 'GET' },
  reviewsMias: { path: `${API_PREFIX}/talento/mis-reviews`, method: 'GET' },
  crearReview: { path: `${API_PREFIX}/talento/reviews/crear`, method: 'POST' },
  reviewsRecibidas: { path: `${API_PREFIX}/talento/mis-reviews/recibidas`, method: 'GET' },
  reviewsEmitidas: { path: `${API_PREFIX}/talento/mis-reviews/emitidas`, method: 'GET' },
  dejarReview: { path: `${API_PREFIX}/talento/reviews/crear`, method: 'POST' },
  skillsCatalogo: { path: `${API_PREFIX}/talento/skills/catalogo`, method: 'GET' },
  talentosDestacados: { path: `${API_PREFIX}/talento/destacados`, method: 'GET' },
  aplicarTalento: { path: `${API_PREFIX}/talento/proyectos/:id/aplicar`, method: 'POST' },
  guardarTalento: { path: `${API_PREFIX}/talento/proyectos/:id/guardar`, method: 'POST' },
  eliminarTalentoGuardado: { path: `${API_PREFIX}/talento/guardados/:id`, method: 'DELETE' },

  // Mercado
  activosDisponibles: { path: `${API_PREFIX}/mercado/activos/disponibles`, method: 'GET' },
  detalleActivo: { path: `${API_PREFIX}/mercado/activos/:id`, method: 'GET' },
  historialPrecioActivo: { path: `${API_PREFIX}/mercado/activos/:activoId/historial-precio`, method: 'GET' },
  transaccionesHistorial: { path: `${API_PREFIX}/mercado/transacciones/historial`, method: 'GET' },
  misInversiones: { path: `${API_PREFIX}/mercado/mis-inversiones`, method: 'GET' },
  resumenPortafolio: { path: `${API_PREFIX}/mercado/portafolio/resumen`, method: 'GET' },
  posiciones: { path: `${API_PREFIX}/mercado/portafolio/posiciones`, method: 'GET' },
  transacciones: { path: `${API_PREFIX}/mercado/transacciones/historial`, method: 'GET' },
  depositar: { path: `${API_PREFIX}/mercado/cuenta/depositar`, method: 'POST' },
  retirar: { path: `${API_PREFIX}/mercado/cuenta/retirar`, method: 'POST' },
  generarCuentaVirtual: { path: `${API_PREFIX}/mercado/cuenta/virtual`, method: 'POST' },
  activosDestacados: { path: `${API_PREFIX}/mercado/activos/destacados`, method: 'GET' },
  comprarActivo: { path: `${API_PREFIX}/mercado/activos/:id/comprar`, method: 'POST' },
  venderActivo: { path: `${API_PREFIX}/mercado/activos/:id/vender`, method: 'POST' },
  crearAlertaPrecio: { path: `${API_PREFIX}/mercado/alertas`, method: 'POST' },
  alertasPrecio: { path: `${API_PREFIX}/mercado/alertas`, method: 'GET' },
  borrarAlertaPrecio: { path: `${API_PREFIX}/mercado/alertas/:id`, method: 'DELETE' },
  preciosTiempoReal: { path: `${API_PREFIX}/mercado/precios/tiempo-real`, method: 'GET' },
  historicoPrecios: { path: `${API_PREFIX}/mercado/precios/historico`, method: 'GET' },

  // Sistema
  saludSistema: { path: `${API_PREFIX}/sistema/salud`, method: 'GET' },
  metricasTopUsuarios: { path: `${API_PREFIX}/sistema/metricas/top-usuarios`, method: 'GET' },
  dashboardWidgets: { path: `${API_PREFIX}/sistema/dashboard/widgets`, method: 'GET' },
  health: { path: `${API_PREFIX}/sistema/salud`, method: 'GET' },
  subirDocumento: { path: `${API_PREFIX}/sistema/documentos`, method: 'POST' },
  documentos: { path: `${API_PREFIX}/sistema/documentos`, method: 'GET' },
  eliminarDocumento: { path: `${API_PREFIX}/sistema/documentos/:id`, method: 'DELETE' },
  agendaEventos: { path: `${API_PREFIX}/sistema/agenda/eventos`, method: 'GET' },
  crearEvento: { path: `${API_PREFIX}/sistema/agenda/eventos`, method: 'POST' },
  cancelarEvento: { path: `${API_PREFIX}/sistema/agenda/eventos/:id/cancelar`, method: 'POST' },
  onboardingChecklist: { path: `${API_PREFIX}/sistema/onboarding/checklist`, method: 'GET' },
} satisfies Record<string, EndpointDef>;

export type EndpointKey = keyof typeof endpoints;

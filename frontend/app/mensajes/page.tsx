'use client';

import { useState, useRef, useEffect } from 'react';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { 
  Search, Send, Paperclip, Smile, 
  Phone, Video, MoreVertical, Check, CheckCheck
} from 'lucide-react';
import styles from '@/styles/mensajes.module.scss';

interface Conversacion {
  id: string;
  usuario: string;
  avatar: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  online: boolean;
}

interface Mensaje {
  id: string;
  autor: 'yo' | 'otro';
  contenido: string;
  hora: string;
  leido: boolean;
}

export default function MensajesPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([
    {
      id: '1',
      usuario: 'Equipo Helios',
      avatar: 'EH',
      ultimoMensaje: 'El informe está listo para revisión',
      hora: '10:24',
      noLeidos: 3,
      online: true
    },
    {
      id: '2',
      usuario: 'Astrid Vega',
      avatar: 'AV',
      ultimoMensaje: '¿Ya revisaste el pull request?',
      hora: 'Ayer',
      noLeidos: 0,
      online: true
    },
    {
      id: '3',
      usuario: 'Core Cumbre',
      avatar: 'CC',
      ultimoMensaje: 'Sprint demo el viernes a las 15h',
      hora: '2d',
      noLeidos: 1,
      online: false
    },
    {
      id: '4',
      usuario: 'Mara Quantum',
      avatar: 'MQ',
      ultimoMensaje: 'Perfecto, nos vemos mañana 👍',
      hora: '3d',
      noLeidos: 0,
      online: false
    }
  ]);

  const [mensajes, setMensajes] = useState<Record<string, Mensaje[]>>({
    '1': [
      { id: 'm1', autor: 'otro', contenido: 'Hola, ¿cómo va el análisis del mercado?', hora: '09:15', leido: true },
      { id: 'm2', autor: 'yo', contenido: 'Muy bien, estoy finalizando los gráficos', hora: '09:18', leido: true },
      { id: 'm3', autor: 'otro', contenido: 'Genial, necesitamos incluir la proyección Q2', hora: '09:25', leido: true },
      { id: 'm4', autor: 'yo', contenido: 'Claro, ya lo agregué con el modelo actualizado', hora: '09:42', leido: true },
      { id: 'm5', autor: 'otro', contenido: 'El informe está listo para revisión', hora: '10:24', leido: false }
    ],
    '2': [
      { id: 'm6', autor: 'otro', contenido: '¿Ya revisaste el pull request?', hora: 'Ayer', leido: true },
      { id: 'm7', autor: 'yo', contenido: 'Sí, lo aprobé esta mañana', hora: 'Ayer', leido: true }
    ],
    '3': [
      { id: 'm8', autor: 'otro', contenido: 'Sprint demo el viernes a las 15h', hora: '2d', leido: false }
    ],
    '4': [
      { id: 'm9', autor: 'otro', contenido: 'Perfecto, nos vemos mañana 👍', hora: '3d', leido: true }
    ]
  });

  const [conversacionActiva, setConversacionActiva] = useState('1');
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversacionSeleccionada = conversaciones.find(c => c.id === conversacionActiva);
  const mensajesActivos = mensajes[conversacionActiva] || [];

  const conversacionesFiltradas = conversaciones.filter(c =>
    c.usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajesActivos]);

  const handleEnviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;

    setIsTyping(false);
    const mensaje: Mensaje = {
      id: `m${Date.now()}`,
      autor: 'yo',
      contenido: nuevoMensaje,
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      leido: false
    };

    setMensajes(prev => ({
      ...prev,
      [conversacionActiva]: [...(prev[conversacionActiva] || []), mensaje]
    }));

    setConversaciones(prev => prev.map(c =>
      c.id === conversacionActiva
        ? { ...c, ultimoMensaje: nuevoMensaje, hora: 'Ahora', noLeidos: 0 }
        : c
    ));

    setNuevoMensaje('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje();
    }
  };

  return (
    <div className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.chatLayout}>
        {/* Sidebar de conversaciones */}
        <aside className={styles.conversationsSidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Mensajes</h2>
          </div>

          <div className={styles.searchContainer}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className={styles.conversationsList}>
            {conversacionesFiltradas.map((conv) => (
              <div
                key={conv.id}
                className={`${styles.conversationItem} ${conv.id === conversacionActiva ? styles.active : ''}`}
                onClick={() => setConversacionActiva(conv.id)}
              >
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>{conv.avatar}</div>
                  {conv.online && <span className={styles.onlineIndicator} />}
                </div>
                
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationHeader}>
                    <span className={styles.userName}>{conv.usuario}</span>
                    <span className={styles.time}>{conv.hora}</span>
                  </div>
                  <div className={styles.conversationPreview}>
                    <span className={styles.lastMessage}>{conv.ultimoMensaje}</span>
                    {conv.noLeidos > 0 && (
                      <span className={styles.unreadBadge}>{conv.noLeidos}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Área de chat */}
        <main className={styles.chatArea}>
          {conversacionSeleccionada ? (
            <>
              {/* Header del chat */}
              <div className={styles.chatHeader}>
                <div className={styles.chatUserInfo}>
                  <div className={styles.chatAvatar}>
                    {conversacionSeleccionada.avatar}
                    {conversacionSeleccionada.online && <span className={styles.onlineDot} />}
                  </div>
                  <div>
                    <h3>{conversacionSeleccionada.usuario}</h3>
                    <span className={styles.status}>
                      {isTyping && conversacionSeleccionada.online ? (
                        <span className={styles.typingIndicator}>
                          <span></span><span></span><span></span>
                        </span>
                      ) : conversacionSeleccionada.online ? 'En línea' : 'Desconectado'}
                    </span>
                  </div>
                </div>
                
                <div className={styles.chatActions}>
                  <button className={styles.actionBtn}><Phone size={20} /></button>
                  <button className={styles.actionBtn}><Video size={20} /></button>
                  <button className={styles.actionBtn}><MoreVertical size={20} /></button>
                </div>
              </div>

              {/* Mensajes */}
              <div className={styles.messagesContainer}>
                <div className={styles.messages}>
                  {mensajesActivos.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${styles[msg.autor]}`}
                    >
                      <div className={styles.messageBubble}>
                        <p>{msg.contenido}</p>
                        <div className={styles.messageFooter}>
                          <span className={styles.messageTime}>{msg.hora}</span>
                          {msg.autor === 'yo' && (
                            <span className={styles.messageStatus}>
                              {msg.leido ? <CheckCheck size={16} /> : <Check size={16} />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input de mensaje */}
              <div className={styles.messageInput}>
                <button className={styles.inputActionBtn}>
                  <Paperclip size={20} />
                </button>
                
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={nuevoMensaje}
                  onChange={(e) => {
                    setNuevoMensaje(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyPress={handleKeyPress}
                />
                
                <button className={styles.inputActionBtn}>
                  <Smile size={20} />
                </button>
                
                <button 
                  className={styles.sendButton}
                  onClick={handleEnviarMensaje}
                  disabled={!nuevoMensaje.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Selecciona una conversación para comenzar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

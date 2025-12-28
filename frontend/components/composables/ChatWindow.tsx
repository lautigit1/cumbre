import styles from './ChatWindow.module.scss';
import { useState } from 'react';
import { InputSoberano } from '@/components/atomicos/InputSoberano';
import { BotonCobre } from '@/components/atomicos/BotonCobre';

export type Mensaje = {
  id: string;
  autor: 'yo' | 'otro';
  contenido: string;
  leido?: boolean;
};

type Props = {
  mensajes: Mensaje[];
  onSend: (texto: string) => void;
};

export function ChatWindow({ mensajes, onSend }: Props) {
  const [texto, setTexto] = useState('');

  const enviar = () => {
    if (!texto.trim()) return;
    onSend(texto);
    setTexto('');
  };

  return (
    <div className={styles.chat}>
      <div className={styles.historial}>
        {mensajes.map((m) => (
          <div key={m.id} className={`${styles.bubble} ${m.autor === 'yo' ? styles.yo : styles.otro}`}>
            <p>{m.contenido}</p>
            {m.leido && <span className={styles.status}>Leído</span>}
          </div>
        ))}
      </div>
      <div className={styles.form}>
        <InputSoberano
          placeholder="Escribe un mensaje"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') enviar();
          }}
        />
        <BotonCobre onClick={enviar}>Enviar</BotonCobre>
      </div>
    </div>
  );
}

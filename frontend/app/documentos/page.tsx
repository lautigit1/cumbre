'use client';

import { useState, useEffect } from 'react';
import {
  FileText, Upload, Download, Trash2, Eye, Search,
  Filter, FolderOpen, File, Image, Archive,
  Calendar, Clock, MoreVertical, Star, Share2, X
} from 'lucide-react';
import styles from '@/styles/documentos.module.scss';
import { HeaderGlass } from '@/components/composables/HeaderGlass';
import { Sidebar } from '@/components/composables/Sidebar';

type Documento = {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'imagen' | 'documento' | 'otro';
  tamaño: string;
  categoria: 'contrato' | 'legal' | 'financiero' | 'personal';
  fechaSubida: string;
  favorito: boolean;
};

export default function DocumentosPage() {
  const [mounted, setMounted] = useState(false);
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const [showUpload, setShowUpload] = useState(false);
  const [categoria, setCategoria] = useState<'todas' | 'contrato' | 'legal' | 'financiero' | 'personal'>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [vistaGrid, setVistaGrid] = useState(true);

  useEffect(() => {
    setMounted(true);
    const documentosData: Documento[] = [
      {
        id: '1',
        nombre: 'Contrato CUMBRE ONE.pdf',
        tipo: 'pdf',
        tamaño: '2.4 MB',
        categoria: 'contrato',
        fechaSubida: '2024-12-28',
        favorito: true,
      },
      {
        id: '2',
        nombre: 'Reporte Anual 2024.pdf',
        tipo: 'pdf',
        tamaño: '5.1 MB',
        categoria: 'financiero',
        fechaSubida: '2024-12-27',
        favorito: false,
      },
      {
        id: '3',
        nombre: 'Documentación Legal.pdf',
        tipo: 'pdf',
        tamaño: '1.8 MB',
        categoria: 'legal',
        fechaSubida: '2024-12-26',
        favorito: false,
      },
      {
        id: '4',
        nombre: 'Certificado Inversor.jpg',
        tipo: 'imagen',
        tamaño: '856 KB',
        categoria: 'personal',
        fechaSubida: '2024-12-25',
        favorito: true,
      },
    ];
    setDocumentos(documentosData);
  }, []);

  const documentosFiltrados = documentos.filter(doc => {
    const matchCategoria = categoria === 'todas' || doc.categoria === categoria;
    const matchBusqueda = doc.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  const stats = {
    total: documentos.length,
    contratos: documentos.filter(d => d.categoria === 'contrato').length,
    legales: documentos.filter(d => d.categoria === 'legal').length,
    financieros: documentos.filter(d => d.categoria === 'financiero').length,
  };

  const handleEliminar = (id: string) => {
    setDocumentos(documentos.filter(d => d.id !== id));
  };

  const handleToggleFavorito = (id: string) => {
    setDocumentos(documentos.map(d => 
      d.id === id ? { ...d, favorito: !d.favorito } : d
    ));
  };

  const getIconoTipo = (tipo: string) => {
    switch(tipo) {
      case 'pdf': return <FileText size={24} />;
      case 'imagen': return <Image size={24} />;
      case 'documento': return <File size={24} />;
      default: return <Archive size={24} />;
    }
  };

  if (!mounted) return <div className={styles.page}><HeaderGlass /><div className={styles.container}><Sidebar /></div></div>;

  return (
    <main className={styles.page}>
      <HeaderGlass />
      
      <div className={styles.container}>
        <Sidebar />
        
        <section className={styles.mainContent}>
          {/* Header */}
          <div className={styles.heroSection}>
            <div>
              <h1 className={styles.pageTitle}>Mis Documentos</h1>
              <p className={styles.pageSubtitle}>Administra todos tus documentos de inversión en un solo lugar</p>
            </div>

            <button className={styles.uploadBtn} onClick={() => setShowUpload(true)}>
              <Upload size={20} />
              Subir Documento
            </button>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(230, 179, 126, 0.15)', color: '#E6B37E' }}>
                <FolderOpen size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Total</p>
                <p className={styles.statValue}>{stats.total}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(38, 222, 129, 0.15)', color: '#26de81' }}>
                <FileText size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Contratos</p>
                <p className={styles.statValue}>{stats.contratos}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(102, 92, 231, 0.15)', color: '#665ce7' }}>
                <File size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Legales</p>
                <p className={styles.statValue}>{stats.legales}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(255, 165, 2, 0.15)', color: '#ffa502' }}>
                <Archive size={24} />
              </div>
              <div>
                <p className={styles.statLabel}>Financieros</p>
                <p className={styles.statValue}>{stats.financieros}</p>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className={styles.filterButtons}>
              <button className={categoria === 'todas' ? styles.active : ''} onClick={() => setCategoria('todas')}>
                Todos
              </button>
              <button className={categoria === 'contrato' ? styles.active : ''} onClick={() => setCategoria('contrato')}>
                Contratos
              </button>
              <button className={categoria === 'legal' ? styles.active : ''} onClick={() => setCategoria('legal')}>
                Legal
              </button>
              <button className={categoria === 'financiero' ? styles.active : ''} onClick={() => setCategoria('financiero')}>
                Financiero
              </button>
              <button className={categoria === 'personal' ? styles.active : ''} onClick={() => setCategoria('personal')}>
                Personal
              </button>
            </div>

            <div className={styles.viewToggle}>
              <button className={vistaGrid ? styles.active : ''} onClick={() => setVistaGrid(true)}>
                Grid
              </button>
              <button className={!vistaGrid ? styles.active : ''} onClick={() => setVistaGrid(false)}>
                Lista
              </button>
            </div>
          </div>

          {/* Documentos Grid/Lista */}
          <div className={styles.section}>
            <div className={vistaGrid ? styles.documentosGrid : styles.documentosLista}>
              {documentosFiltrados.map((doc, i) => (
                <div
                  key={doc.id}
                  className={styles.documentoCard}
                >
                  <div className={styles.documentoPreview}>
                    <div className={styles.documentoIcon} style={{
                      background: doc.tipo === 'pdf' ? 'rgba(255, 107, 107, 0.15)' :
                                 doc.tipo === 'imagen' ? 'rgba(38, 222, 129, 0.15)' :
                                 'rgba(102, 92, 231, 0.15)',
                      color: doc.tipo === 'pdf' ? '#ff6b6b' :
                            doc.tipo === 'imagen' ? '#26de81' :
                            '#665ce7'
                    }}>
                      {getIconoTipo(doc.tipo)}
                    </div>
                    <button 
                      className={`${styles.favoritoBtn} ${doc.favorito ? styles.active : ''}`}
                      onClick={() => handleToggleFavorito(doc.id)}
                    >
                      <Star size={18} fill={doc.favorito ? '#E6B37E' : 'none'} />
                    </button>
                  </div>

                  <div className={styles.documentoInfo}>
                    <h3>{doc.nombre}</h3>
                    <div className={styles.documentoMeta}>
                      <span className={styles.documentoTamaño}>{doc.tamaño}</span>
                      <span className={styles.documentoFecha}>{doc.fechaSubida}</span>
                    </div>
                    <span className={styles.documentoCategoria}>{doc.categoria}</span>
                  </div>

                  <div className={styles.documentoActions}>
                    <button className={styles.actionBtn} title="Ver">
                      <Eye size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Descargar">
                      <Download size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Compartir">
                      <Share2 size={18} />
                    </button>
                    <button 
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleEliminar(doc.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Upload */}
          {showUpload && (
            <div className={styles.modal} onClick={() => setShowUpload(false)}>
              <div 
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Subir Documento</h2>
                  <button onClick={() => setShowUpload(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.uploadZone}>
                    <Upload size={48} />
                    <p>Arrastra archivos aquí o haz click para seleccionar</p>
                    <span>Soporta: PDF, JPG, PNG, DOCX (Max 10MB)</span>
                  </div>

                  <div className={styles.formField}>
                    <label>Categoría</label>
                    <select>
                      <option value="contrato">Contrato</option>
                      <option value="legal">Legal</option>
                      <option value="financiero">Financiero</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button className={styles.cancelModalBtn} onClick={() => setShowUpload(false)}>
                    Cancelar
                  </button>
                  <button className={styles.uploadModalBtn}>
                    Subir Documento
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

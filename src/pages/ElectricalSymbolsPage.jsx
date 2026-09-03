import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Info, Zap, AlertTriangle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { componentsData, CATEGORIES } from '../data/symbolsData';

const ElectricalSymbolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalComponent, setActiveModalComponent] = useState(null);
  const [ansiToggles, setAnsiToggles] = useState({});

  const toggleAnsi = (id, e) => {
    e.stopPropagation();
    setAnsiToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredComponents = useMemo(() => {
    return componentsData.filter(item => {
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        item.name.toLowerCase().includes(query) ||
        item.designator.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.operation.toLowerCase().includes(query) ||
        (item.applications && item.applications.some(app => app.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = { 'Todos': componentsData.length };
    CATEGORIES.forEach(cat => {
      if (cat !== 'Todos') {
        counts[cat] = componentsData.filter(c => c.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="app-container" style={{ padding: '2rem 1rem 4rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header Banner */}
      <motion.div 
        className="glass-card" 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          marginBottom: '2.5rem', 
          textAlign: 'center', 
          padding: '2.5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0, 242, 255, 0.25)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 132, 199, 0.15) 100%)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 242, 255, 0.12)', padding: '6px 14px', borderRadius: '30px', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem', border: '1px solid rgba(0, 242, 255, 0.3)' }}>
          <Zap size={16} /> Norma IEC / IRAM & ANSI • Manual Técnico Didáctico
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: '900',
          letterSpacing: '-1px',
          lineHeight: '1.2',
          marginBottom: '1rem'
        }}>
          Simbología Eléctrica y Electrónica
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-dim)', 
          maxWidth: '820px', 
          margin: '0 auto', 
          lineHeight: '1.7' 
        }}>
          Explora los componentes esenciales de la electrónica analógica, digital y potencia. Compara su <strong>representación esquemática normalizada</strong> con su <strong>encapsulado físico real</strong>, terminales, precauciones de taller y principio de funcionamiento.
        </p>

        {/* Buscador en tiempo real */}
        <div style={{ 
          maxWidth: '650px', 
          margin: '2rem auto 0 auto', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={20} color="var(--primary-color)" style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }} />
          <input 
            type="text"
            placeholder="Buscar por nombre, designador (R, C, Q), término o aplicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 44px 14px 48px',
              borderRadius: '50px',
              border: '2px solid rgba(0, 242, 255, 0.3)',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              transition: 'all 0.3s ease'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Borrar búsqueda"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Selector de Categorías (Pills) */}
      <div style={{ 
        display: 'flex', 
        gap: '0.6rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        marginBottom: '2.5rem' 
      }}>
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category;
          const count = categoryCounts[category] || 0;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, var(--primary-color) 0%, #0284c7 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#001a2c' : 'var(--text-main)',
                border: isActive ? '1px solid var(--primary-color)' : '1px solid rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 'bold' : '500',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 15px rgba(0, 242, 255, 0.4)' : 'none'
              }}
            >
              <span>{category}</span>
              <span style={{
                background: isActive ? '#001a2c' : 'rgba(255,255,255,0.1)',
                color: isActive ? 'var(--primary-color)' : 'var(--text-dim)',
                padding: '2px 7px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Conteo de Resultados */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', margin: 0 }}>
          Mostrando <strong style={{ color: 'var(--primary-color)' }}>{filteredComponents.length}</strong> de {componentsData.length} componentes
          {searchQuery && <span> para la búsqueda "<em>{searchQuery}</em>"</span>}
        </p>
      </div>

      {/* Grid de Componentes */}
      {filteredComponents.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Layers size={48} color="var(--text-dim)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ color: 'var(--text-main)' }}>No se encontraron componentes</h3>
          <p style={{ color: 'var(--text-dim)' }}>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
            style={{ 
              marginTop: '1rem', 
              background: 'var(--primary-color)', 
              color: '#002b49', 
              border: 'none', 
              padding: '8px 20px', 
              borderRadius: '20px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredComponents.map((item, index) => {
            const isAnsiActive = ansiToggles[item.id];
            const currentSymbolSvg = (isAnsiActive && item.symbolAltSvg) ? item.symbolAltSvg : item.symbolSvg;

            return (
              <motion.div 
                key={item.id}
                className="glass-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
                whileHover={{ y: -6, boxShadow: '0 12px 35px rgba(0, 242, 255, 0.15)' }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  padding: '1.5rem',
                  border: '1px solid rgba(0, 242, 255, 0.18)',
                  borderRadius: '16px',
                  position: 'relative',
                  background: 'var(--glass-bg)'
                }}
              >
                {/* Header de la tarjeta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%)', 
                      color: 'var(--primary-color)', 
                      fontSize: '0.85rem', 
                      padding: '3px 9px', 
                      borderRadius: '8px', 
                      fontWeight: '800',
                      border: '1px solid rgba(0, 242, 255, 0.4)',
                      letterSpacing: '0.5px'
                    }}>
                      {item.designator}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '15px' }}>
                      {item.category}
                    </span>
                  </div>

                  {item.symbolAltSvg && (
                    <button
                      onClick={(e) => toggleAnsi(item.id, e)}
                      title="Alternar entre norma IEC (Europea) y ANSI (Americana)"
                      style={{
                        background: isAnsiActive ? 'rgba(245, 158, 11, 0.2)' : 'rgba(2, 132, 199, 0.2)',
                        color: isAnsiActive ? '#f59e0b' : 'var(--primary-color)',
                        border: `1px solid ${isAnsiActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(0, 242, 255, 0.3)'}`,
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {isAnsiActive ? 'ANSI (Zig-Zag)' : 'IEC (IRAM)'}
                    </button>
                  )}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  color: 'var(--text-main)', 
                  marginBottom: '1.2rem', 
                  lineHeight: '1.3',
                  fontWeight: '700'
                }}>
                  {item.name}
                </h3>

                {/* Contenedor de Símbolo vs Físico */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                  {/* Símbolo Esquemático */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 'bold' }}>
                      Símbolo Esquemático
                    </span>
                    <div style={{ 
                      width: '100%', 
                      aspectRatio: '1.4 / 1', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '12px', 
                      padding: '10px', 
                      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      {currentSymbolSvg}
                    </div>
                  </div>

                  {/* Encapsulado Físico */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 'bold' }}>
                      Aspecto Físico
                    </span>
                    <div style={{ 
                      width: '100%', 
                      aspectRatio: '1.4 / 1', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)', 
                      borderRadius: '12px', 
                      padding: '10px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)'
                    }}>
                      {item.physicalSvg}
                    </div>
                  </div>
                </div>

                {/* Explicación de Funcionamiento */}
                <div style={{ flexGrow: 1, marginBottom: '1.2rem' }}>
                  <p style={{ 
                    fontSize: '0.92rem', 
                    color: 'var(--text-dim)', 
                    lineHeight: '1.6', 
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.operation}
                  </p>
                </div>

                {/* Botón de Ficha Técnica */}
                <button
                  onClick={() => setActiveModalComponent(item)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(0, 242, 255, 0.08)',
                    color: 'var(--primary-color)',
                    border: '1px solid rgba(0, 242, 255, 0.3)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-color)';
                    e.currentTarget.style.color = '#002b49';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 242, 255, 0.08)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                  }}
                >
                  <BookOpen size={16} /> Ver Ficha Técnica y Conexión
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Detalle Pedagógico */}
      <AnimatePresence>
        {activeModalComponent && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setActiveModalComponent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-color)',
                border: '1px solid rgba(0, 242, 255, 0.4)',
                borderRadius: '20px',
                maxWidth: '750px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                position: 'relative'
              }}
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveModalComponent(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              {/* Título y Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  background: 'var(--primary-color)', 
                  color: '#002b49', 
                  fontWeight: '800', 
                  fontSize: '0.85rem', 
                  padding: '3px 10px', 
                  borderRadius: '8px' 
                }}>
                  Designador: {activeModalComponent.designator}
                </span>
                <span style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  color: 'var(--text-dim)', 
                  fontSize: '0.85rem', 
                  padding: '3px 10px', 
                  borderRadius: '8px' 
                }}>
                  {activeModalComponent.category}
                </span>
                {activeModalComponent.unit && (
                  <span style={{ 
                    background: 'rgba(14, 165, 233, 0.2)', 
                    color: '#38bdf8', 
                    fontSize: '0.85rem', 
                    padding: '3px 10px', 
                    borderRadius: '8px',
                    fontWeight: 'bold' 
                  }}>
                    Unidad: {activeModalComponent.unit}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                {activeModalComponent.name}
              </h2>

              {/* Comparativa Visual Ampliada */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={16} /> Símbolo Esquemático Técnico
                  </h4>
                  <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {activeModalComponent.symbolSvg}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px', textAlign: 'center' }}>
                    Norma: {activeModalComponent.symbolStandard}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={16} /> Aspecto Físico Real / Encapsulado
                  </h4>
                  <div style={{ background: '#090d16', padding: '15px', borderRadius: '10px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {activeModalComponent.physicalSvg}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px', textAlign: 'center' }}>
                    Aspecto representativo de taller
                  </div>
                </div>
              </div>

              {/* Principio de Funcionamiento */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={18} /> Principio de Funcionamiento
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.7', opacity: 0.95 }}>
                  {activeModalComponent.operation}
                </p>
              </div>

              {/* Terminales y Polaridad */}
              {activeModalComponent.terminals && (
                <div style={{ marginBottom: '1.5rem', background: 'rgba(2, 132, 199, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(2, 132, 199, 0.25)' }}>
                  <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Conexión de Terminales y Polaridad
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {activeModalComponent.terminals.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fórmulas Clave */}
              {activeModalComponent.formula && (
                <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1rem', borderRadius: '10px', borderLeft: '4px solid var(--primary-color)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', textTransform: 'uppercase', fontWeight: 'bold' }}>Fórmula o Ley Asociada:</span>
                  <div style={{ fontSize: '1rem', color: '#fff', fontFamily: 'monospace', marginTop: '4px', fontWeight: 'bold' }}>
                    {activeModalComponent.formula}
                  </div>
                </div>
              )}

              {/* Aplicaciones Prácticas */}
              {activeModalComponent.applications && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    Aplicaciones Típicas en Laboratorio / Taller:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeModalComponent.applications.map((app, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          background: 'rgba(255,255,255,0.06)', 
                          color: 'var(--text-dim)', 
                          padding: '4px 10px', 
                          borderRadius: '15px', 
                          fontSize: '0.85rem' 
                        }}
                      >
                        • {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Advertencia / Precaución de Taller */}
              {activeModalComponent.caution && (
                <div style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.4)', 
                  borderRadius: '10px', 
                  padding: '1rem', 
                  display: 'flex', 
                  gap: '12px', 
                  alignItems: 'flex-start' 
                }}>
                  <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ef4444', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                      Precaución de Taller / Regla de Seguridad:
                    </strong>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      {activeModalComponent.caution}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectricalSymbolsPage;

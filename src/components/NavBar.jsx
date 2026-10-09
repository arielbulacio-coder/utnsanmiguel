import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { MobileAccessModal, isMobileUnlocked, lockMobileCourse } from './MobileAccessGate';

// ============================================
// NAVIGATION DATA STRUCTURE - Single Source of Truth
// ============================================
export const NAVIGATION_STRUCTURE = [
  {
    id: 'cursos',
    label: '📚 Cursos',
    icon: '📚',
    type: 'dropdown',
    subSections: [
      {
        type: 'course-highlight',
        title: 'Cursos Destacados',
        courses: [
          {
            path: '/electricidad-1ro',
            title: '⚡ Electricidad 1°',
            description: '12 Semanas - 24 Clases',
            badges: ['Popular', 'Nuevo']
          },
          {
            path: '/aplicaciones-moviles',
            title: '📱 React Native',
            description: 'Desarrollo Móvil',
            badges: ['Protegido']
          },
          {
            path: '/taller-robotica',
            title: '🤖 Robótica',
            description: 'Arduino & ESP32',
            badges: ['Hands-on']
          }
        ]
      }
    ]
  },
  {
    id: 'electricidad',
    label: '⚡ Electricidad',
    icon: '⚡',
    type: 'mega-dropdown',
    columns: 2,
    subSections: [
      {
        type: 'sub-header',
        title: 'Fundamentos'
      },
      { path: '/ley-ohm', title: 'Ley de Ohm' },
      { path: '/kirchhoff', title: 'Leyes de Kirchhoff' },
      { path: '/potencia', title: 'Potencia Eléctrica' },
      { path: '/electricidad-basica', title: 'Electricidad Básica' },
      { path: '/circuitos-domiciliarios', title: 'Instal. Domiciliarias' },
      
      {
        type: 'sub-header',
        title: 'Análisis de Circuitos'
      },
      { path: '/simbologia-electronica', title: 'Simbología' },
      { path: '/codigos-resistencias', title: 'Códigos de Resistencias' },
      { path: '/resistencias-serie-paralelo', title: 'Serie / Paralelo' },
      { path: '/teorema-thevenin', title: 'Teorema de Thévenin' },
      { path: '/teorema-norton', title: 'Teorema de Norton' },
      { path: '/componentes-electronica', title: 'Componentes y Lógica' },
      
      {
        type: 'sub-header',
        title: 'Electrónica Digital'
      },
      { path: '/electronica-digital/numeracion', title: '1. Sistemas de Numeración' },
      { path: '/electronica-digital/codigos-algebra', title: '2. Códigos y Álgebra Boole' },
      { path: '/electronica-digital/compuertas', title: '3. Compuertas Lógicas' },
      { path: '/electronica-digital/formas-canonicas', title: '4. Formas Canónicas' },
      { path: '/electronica-digital/karnaugh', title: '5. Mapas de Karnaugh' },
      { path: '/electronica-digital/bloques-funcionales', title: '6. MUX, DEMUX' },
      { path: '/electronica-digital/bloques-aritmeticos', title: '7. Sumadores' },
      { path: '/electronica-digital/secuenciales', title: '8. Secuenciales' },
      { path: '/electronica-digital/proyecto-integrador', title: '9. Proyecto Integrador' }
    ]
  },
  {
    id: 'robotica',
    label: '🤖 Robótica',
    icon: '🤖',
    type: 'mega-dropdown',
    columns: 2,
    subSections: [
      {
        type: 'sub-header',
        title: 'Arduino & C++'
      },
      { path: '/arduino-intro', title: 'Introducción' },
      { path: '/cpp-basico', title: 'C/C++ Básico' },
      { path: '/pwm', title: 'Señales PWM' },
      { path: '/sensores', title: 'Sensores' },
      { path: '/comunicacion-serial', title: 'Configuración Serial' },
      
      {
        type: 'sub-header',
        title: 'ESP32 & IoT'
      },
      { path: '/arduino/esp32-sim', title: '🤖 Simulador ESP32' },
      { path: '/arduino/iot-dashboards', title: '📊 Dashboards IoT' },
      { path: '/arduino/web-designer', title: '🌐 Web Designer' },
      
      {
        type: 'sub-header',
        title: 'Proyectos'
      },
      { path: '/taller-robotica', title: 'Taller de Robótica' },
      { path: '/robot-evita-obstaculos', title: 'Robot Evasor' },
      { path: '/scratch', title: 'Programación Scratch 😺' }
    ]
  },
  {
    id: 'taller',
    label: '🛠️ Taller',
    icon: '🛠️',
    type: 'mega-dropdown',
    columns: 2,
    subSections: [
      {
        type: 'sub-header',
        title: 'Metrología'
      },
      { path: '/calibre', title: 'Calibre Pie de Rey' },
      { path: '/micrometro', title: 'Micrómetro' },
      { path: '/metro-carpintero', title: 'Metro de Carpintero' },
      
      {
        type: 'sub-header',
        title: 'Herramientas'
      },
      { path: '/seguridad-epp', title: 'Seguridad y EPP' },
      { path: '/herramientas-electricidad', title: 'Herramientas Electricidad' },
      { path: '/herramientas-electronica', title: 'Herramientas Electrónica' },
      { path: '/herramientas-carpinteria', title: 'Carpintería' },
      { path: '/metal-mecanica', title: 'Metal-Mecánica' },
      { path: '/soldadura', title: '🔥 Soldadura y Desoldado' },
      { path: '/circuitos-impresos', title: '🔌 PCB' },
      
      {
        type: 'sub-header',
        title: 'Dibujo Técnico'
      },
      { path: '/dibujo-tecnico/normas-iram', title: 'Normas IRAM' },
      { path: '/dibujo-tecnico/proyecciones', title: 'Proyecciones Ortogonales' },
      { path: '/dibujo-tecnico/axonometrica', title: 'Axonometrías (ISO)' },
      { path: '/dibujo-2do/normalizacion', title: 'Normalización Avanzada' },
      { path: '/dibujo-tecnico/construcciones-geometricas', title: 'Construcciones Geom.' },
      { path: '/dibujo-2do/poligonos', title: 'Polígonos Regulares' },
      { path: '/dibujo-2do/tangencias', title: 'Tangencias' },
      { path: '/ar-arquitectura', title: '🧊 Arquitectura 3D' }
    ]
  },
  {
    id: 'recursos',
    label: '📖 Recursos',
    icon: '📖',
    type: 'dropdown',
    subSections: [
      {
        type: 'sub-header',
        title: 'Matemática & Física'
      },
      { path: '/conversion-unidades', title: 'Conversión Unidades' },
      { path: '/pitagoras', title: 'Teorema Pitágoras' },
      { path: '/trigonometria', title: 'Trigonometría' },
      { path: '/cinematica', title: 'Cinemática (MRU/MRUV)' },
      { path: '/simulador-circuitos', title: '🧪 Simulador de Circuitos' },
      { path: '/energias-renovables', title: 'Energías Renovables' },
      { path: '/osciloscopio', title: 'Osciloscopio' },
      { path: '/multimetro', title: 'Multímetros' },
      
      {
        type: 'sub-header',
        title: 'Cultura Digital'
      },
      { path: '/generaciones-computadoras', title: '🎮 Generaciones de Computadoras' },
      { path: '/arquitectura-von-neumann', title: '⚙️ Arquitectura Von Neumann' },
      { path: '/arquitectura-harvard', title: '🔬 Arquitectura Harvard' },
      { path: '/cpu-simulator', title: '🧠 La CPU: Motor de Ejecucion' },
      { path: '/memoria', title: '💾 Jerarquía de Memoria' },
      { path: '/arranque', title: '🔌 Hardware y Boot' },
      { path: '/cultura-digital', title: '📱 Cultura Digital' },
      { path: '/representacion-datos', title: '🔢 Representación de Datos' },
      { path: '/sistema-operativo', title: '🖥️ Sistema Operativo' },
      { path: '/seguridad-informatica', title: '🔒 Seguridad Informatica' },
      
      {
        type: 'sub-header',
        title: 'Institucionales'
      },
      { 
        type: 'external-link',
        href: 'https://drive.google.com/drive/folders/1B2vp3KrPw-nD7JQKJL1gETrOt_ZWNmqp?usp=sharing',
        title: '📁 Carpeta Drive UTN'
      },
      { 
        type: 'external-link',
        href: 'https://docs.google.com/spreadsheets/d/1OjScpndyRb-eljHQCWzH7S9P9JgMg8BofPhRYcBXGl4/edit?usp=sharing',
        title: '📊 Planilla institucional'
      },
      {
        type: 'external-link',
        href: 'https://notebooklm.google.com/notebook/8d04d621-ac7b-43b2-8d62-3a0b5f88c961/artifact/1eed6dc1-0b38-4295-8d4d-0b87bead32d9',
        title: '📘 Tutorial NotebookLM'
      }
    ]
  },
  {
    id: 'appmoviles',
    label: '📱 App Móviles',
    icon: '📱',
    type: 'protected-dropdown',
    protected: true,
    subSections: [
      { path: '/aplicaciones-moviles', title: '📘 Programa & Unidades' },
      { path: '/simulador-react-native', title: '⚛️ Simulador Interactivo' }
    ]
  }
];

// ============================================
// STYLES (Inline for portability - can move to CSS file)
// ============================================
const getStyles = (theme) => ({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0 1.25rem',
    height: '58px',
    background: 'var(--nav-bg)',
    borderBottom: '1px solid var(--nav-border)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'background-color 0.3s ease',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    boxShadow: '0 1px 4px rgba(15,23,42,0.06)'
  },
  navLink: {
    color: 'var(--text-dim)',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    padding: '0.5rem 0.85rem',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit'
  },
  navLinkActive: {
    color: 'var(--primary-color)',
    background: 'var(--brand-blue-light)',
    fontWeight: '600'
  },
  dropdownTrigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 0.85rem',
    borderRadius: '7px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.875rem',
    color: 'var(--text-dim)',
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease'
  },
  dropdownTriggerActive: {
    background: 'var(--brand-blue-light)',
    color: 'var(--primary-color)',
    fontWeight: '600'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    padding: '0.75rem',
    minWidth: '280px',
    maxHeight: '70vh',
    overflowY: 'auto',
    zIndex: 1001,
    marginTop: '0.5rem'
  },
  megaMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    padding: '1rem',
    width: '90vw',
    maxWidth: '900px',
    maxHeight: '70vh',
    overflowY: 'auto',
    zIndex: 1001,
    marginTop: '0.5rem'
  },
  megaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  },
  megaCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  colTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
    marginTop: '0.75rem'
  },
  subHeader: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-dim)',
    padding: '0.5rem 0 0.25rem',
    marginTop: '0.5rem'
  },
  courseCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem',
    background: 'var(--brand-blue-light)',
    border: '1px solid rgba(26,86,219,0.2)',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  },
  courseTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: 'var(--primary-color)',
    marginBottom: '0.25rem'
  },
  courseDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-dim)'
  },
  courseBadges: {
    display: 'flex',
    gap: '0.25rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap'
  },
  badge: {
    fontSize: '0.625rem',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});

// ============================================
// HELPER COMPONENTS
// ============================================
const CourseCard = ({ course, onClick, styles }) => (
  <a href={course.path} style={styles.courseCard} onClick={onClick}>
    <span style={styles.courseTitle}>{course.title}</span>
    <span style={styles.courseDesc}>{course.description}</span>
    {course.badges && course.badges.length > 0 && (
      <div style={styles.courseBadges}>
        {course.badges.map((badge, i) => (
          <span key={i} style={{
            ...styles.badge,
            background: 'var(--primary-color)',
            color: '#fff'
          }}>
            {badge}
          </span>
        ))}
      </div>
    )}
  </a>
);

const MenuContent = ({ item, onClose, styles, isMobileCourseUnlocked, setAccessModalOpen, setAccessModalOpen: setModal }) => {
  if (item.type === 'protected-dropdown') {
    return (
      <>
        {item.subSections.map((sub, idx) => (
          sub.type === 'external-link' ? (
            <a
              key={idx}
              href={sub.href}
              style={{
                ...styles.navLink,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {sub.title}
            </a>
          ) : (
            <Link
              key={idx}
              to={sub.path}
              style={{
                ...styles.navLink,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={(e) => {
                if (!isMobileCourseUnlocked) {
                  e.preventDefault();
                  setModal(true);
                }
                onClose();
              }}
            >
              {sub.title} {!isMobileCourseUnlocked && '🔒'}
            </Link>
          )
        ))}
        {!isMobileCourseUnlocked && (
          <button
            onClick={() => {
              setModal(true);
              onClose();
            }}
            style={{
              ...styles.navLink,
              width: '100%',
              justifyContent: 'center',
              background: 'var(--primary-color)',
              color: '#fff',
              fontWeight: '600',
              marginTop: '0.5rem'
            }}
          >
            🔑 Ingresar Palabra Clave
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {item.subSections.map((section, idx) => {
        if (section.type === 'course-highlight') {
          return (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-dim)', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                {section.title}
              </div>
              {section.courses.map((course, cIdx) => (
                <CourseCard 
                  key={cIdx} 
                  course={course} 
                  onClick={onClose} 
                  styles={styles} 
                />
              ))}
            </div>
          );
        }
        
        if (section.type === 'sub-header') {
          return (
            <div key={idx} style={styles.subHeader}>
              {section.title}
            </div>
          );
        }
        
        if (section.type === 'external-link') {
          return (
            <a
              key={idx}
              href={section.href}
              style={{
                ...styles.navLink,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {section.title}
            </a>
          );
        }
        
        return (
          <Link
            key={idx}
            to={section.path}
            style={{
              ...styles.navLink,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={onClose}
          >
            {section.title}
          </Link>
        );
      })}
    </>
  );
};

const DesktopDropdown = ({ item, isOpen, onToggle, onClose, styles, isMobileCourseUnlocked, setAccessModalOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        style={{
          ...styles.dropdownTrigger,
          ...(isOpen ? styles.dropdownTriggerActive : {})
        }}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.icon} {item.label.replace(/[📚⚡🤖🛠️📖📱]/g, '').trim()}
        <span style={{ fontSize: '10px', marginLeft: '4px' }}>▼</span>
      </button>
      
      {isOpen && (
        <div style={item.columns ? styles.megaMenu : styles.dropdownMenu}>
          <MenuContent 
            item={item} 
            onClose={onClose} 
            styles={styles}
            isMobileCourseUnlocked={isMobileCourseUnlocked}
            setAccessModalOpen={setAccessModalOpen}
          />
        </div>
      )}
    </div>
  );
};

const MobileExpandedMenu = ({ isOpen, onClose, styles, isMobileCourseUnlocked, setAccessModalOpen }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '58px',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--card-bg)',
      zIndex: 999,
      overflowY: 'auto',
      padding: '1rem'
    }} onClick={(e) => e.stopPropagation()}>
      {NAVIGATION_STRUCTURE.map((item) => (
        <div key={item.id} style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--primary-color)',
            padding: '0.5rem',
            marginBottom: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {item.icon} {item.label.replace(/[📚⚡🤖🛠️📖📱]/g, '').trim()}
          </div>
          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
            <MenuContent 
              item={item} 
              onClose={onClose} 
              styles={styles}
              isMobileCourseUnlocked={isMobileCourseUnlocked}
              setAccessModalOpen={setAccessModalOpen}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [isMobileCourseUnlocked, setIsMobileCourseUnlocked] = useState(isMobileUnlocked());
  const styles = getStyles(theme);

  useEffect(() => {
    const updateMobile = () => setIsMobileCourseUnlocked(isMobileUnlocked());
    window.addEventListener('mobile_course_unlock_changed', updateMobile);
    return () => window.removeEventListener('mobile_course_unlock_changed', updateMobile);
  }, []);

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={styles.nav}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: 'var(--text-main)', 
              fontWeight: '700', 
              fontSize: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
            onClick={closeAll}
          >
            <img
              src={`${import.meta.env.BASE_URL || '/'}logo_simutec.png`.replace('//', '/')}
              alt="Logo SimuTec"
              style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain', background: 'transparent' }}
            />
            <span style={{ color: 'var(--primary-color)', fontWeight: '800', letterSpacing: '-0.3px' }}>
              simutec.com.ar
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '7px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: 'var(--text-main)'
            }}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              marginLeft: '0.5rem'
            }}
            aria-label="Toggle menu"
          >
            <div style={{
              width: '22px',
              height: '2px',
              background: 'var(--text-dim)',
              borderRadius: '2px'
            }} />
            <div style={{
              width: '22px',
              height: '2px',
              background: 'var(--text-dim)',
              borderRadius: '2px'
            }} />
            <div style={{
              width: '22px',
              height: '2px',
              background: 'var(--text-dim)',
              borderRadius: '2px'
            }} />
          </button>

          {/* Desktop Menu Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', marginLeft: '1rem' }}>
            {/* Inicio */}
            <Link
              to="/"
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.navLinkActive : {})
              }}
              onClick={closeAll}
            >
              🏠 Inicio
            </Link>

            {/* Navigation Dropdowns */}
            {NAVIGATION_STRUCTURE.map((item) => (
              <DesktopDropdown
                key={item.id}
                item={item}
                isOpen={openSubmenu === item.id}
                onToggle={() => toggleSubmenu(item.id)}
                onClose={closeAll}
                styles={styles}
                isMobileCourseUnlocked={isMobileCourseUnlocked}
                setAccessModalOpen={setAccessModalOpen}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Expanded Menu */}
      <MobileExpandedMenu
        isOpen={isMenuOpen}
        onClose={closeAll}
        styles={styles}
        isMobileCourseUnlocked={isMobileCourseUnlocked}
        setAccessModalOpen={setAccessModalOpen}
      />

      {/* Access Modal */}
      {accessModalOpen && (
        <MobileAccessModal
          onClose={() => setAccessModalOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 992px) {
          .nav-links {
            display: none !important;
          }
        }
        @media (min-width: 993px) {
          button[aria-label="Toggle menu"] {
            display: none !important;
          }
        }
        
        /* Smooth transitions */
        .dropdown-menu,
        .mega-menu {
          animation: fadeIn 0.15s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Hover effects */
        .dropdown-trigger:hover,
        .nav-link:hover {
          background: var(--brand-blue-light) !important;
          color: var(--primary-color) !important;
        }
      `}</style>
    </>
  );
};

export default NavBar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from '../context/AuthContext';
import { MobileAccessModal, isMobileUnlocked, lockMobileCourse } from './MobileAccessGate';
import { UtnAccessModal, isUtnUnlocked, lockUtn } from './UtnAccessGate';

const NavBar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null); // 'utn', 'moviles', 'academic'
    const [accessModalOpen, setAccessModalOpen] = useState(false);
    const [isMobileCourseUnlocked, setIsMobileCourseUnlocked] = useState(isMobileUnlocked());
    const [utnModalOpen, setUtnModalOpen] = useState(false);
    const [isUtnCourseUnlocked, setIsUtnCourseUnlocked] = useState(isUtnUnlocked());
    const [openUtnSection, setOpenUtnSection] = useState(null); // Accordion in mobile view

    useEffect(() => {
        const updateMobile = () => setIsMobileCourseUnlocked(isMobileUnlocked());
        const updateUtn = () => setIsUtnCourseUnlocked(isUtnUnlocked());
        window.addEventListener('mobile_course_unlock_changed', updateMobile);
        window.addEventListener('utn_access_unlock_changed', updateUtn);
        return () => {
            window.removeEventListener('mobile_course_unlock_changed', updateMobile);
            window.removeEventListener('utn_access_unlock_changed', updateUtn);
        };
    }, []);

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background-color 0.3s ease',
        maxWidth: '100vw',
        boxSizing: 'border-box'
    };

    const linkStyle = {
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        padding: '0.6rem 0.75rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        minHeight: '44px',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    };

    const activeStyle = {
        color: 'var(--primary-color)',
        background: 'rgba(0, 242, 255, 0.1)',
        border: '1px solid rgba(0, 242, 255, 0.2)'
    };

    const toggleSubmenu = (name) => {
        setOpenSubmenu(openSubmenu === name ? null : name);
    };

    const closeAll = () => {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={closeAll}>
                    <img
                        src={`${import.meta.env.BASE_URL || '/'}logo_simutec.png`.replace('//', '/')}
                        alt="Logo SimuTec"
                        style={{ width: '35px', height: '35px', borderRadius: '4px', objectFit: 'contain', background: 'transparent', border: '1px solid var(--primary-color)' }}
                    />
                    <span className="brand-text">simutec.com.ar</span>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hamburger-menu"
                    aria-label="Toggle menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }} onClick={closeAll}>
                    Inicio
                </Link>

                {/* UTN ELECTRÓNICA (PROTEGIDO CON PALABRA CLAVE UTNSANMIGUEL) */}
                <div className={`dropdown dropdown-mega ${openSubmenu === 'utn' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={{
                            ...linkStyle,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: isUtnCourseUnlocked ? 'rgba(0, 242, 255, 0.12)' : 'rgba(239, 68, 68, 0.08)',
                            color: isUtnCourseUnlocked ? 'var(--primary-color)' : '#ef4444',
                            border: `1px solid ${isUtnCourseUnlocked ? 'rgba(0, 242, 255, 0.35)' : 'rgba(239, 68, 68, 0.25)'}`,
                            fontWeight: '700'
                        }}
                        onClick={() => {
                            if (!isUtnCourseUnlocked) {
                                setUtnModalOpen(true);
                            } else {
                                toggleSubmenu('utn');
                            }
                        }}
                    >
                        <span>⚡ UTN Electrónica</span>
                        <span style={{ fontSize: '11px' }}>{isUtnCourseUnlocked ? '🔓' : '🔒'}</span>
                        <span className="arrow">▼</span>
                    </div>

                    {!isUtnCourseUnlocked ? (
                        <div className="dropdown-menu" style={{ minWidth: '280px', padding: '1.25rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🔒</div>
                            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem', marginBottom: '0.3rem' }}>
                                UTN Electrónica
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                                Contenido técnico y de taller protegido por palabra clave institucional.
                            </p>
                            <button
                                onClick={() => {
                                    closeAll();
                                    setUtnModalOpen(true);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #0284c7, #00f2ff)',
                                    color: '#020617',
                                    border: 'none',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 15px rgba(0, 242, 255, 0.3)'
                                }}
                            >
                                🔑 Desbloquear Acceso
                            </button>
                        </div>
                    ) : (
                        <div className="dropdown-menu utn-mega-menu">
                            {/* Mega-menu Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.6rem 0.75rem',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 800, color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                                        ⚡ UTN San Miguel · Campus Técnico
                                    </span>
                                    <span style={{
                                        fontSize: '10px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: '#10b981',
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        fontWeight: '700'
                                    }}>
                                        Desbloqueado ✓
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        lockUtn();
                                        closeAll();
                                    }}
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                    title="Bloquear acceso a UTN Electrónica"
                                >
                                    🔒 Bloquear
                                </button>
                            </div>

                            {/* Mega-menu Grid */}
                            <div className="utn-mega-grid">
                                {/* COLUMNA 1: Electricidad y Electrónica */}
                                <div className="utn-mega-col">
                                    <div className="utn-col-title">⚡ Electricidad & Electrónica</div>
                                    
                                    <Link
                                        to="/electricidad-1ro"
                                        style={{
                                            ...linkStyle,
                                            color: '#00f2ff',
                                            fontWeight: '800',
                                            background: 'rgba(0, 242, 255, 0.08)',
                                            border: '1px solid rgba(0, 242, 255, 0.3)',
                                            borderRadius: '8px',
                                            marginBottom: '0.5rem'
                                        }}
                                        onClick={closeAll}
                                    >
                                        ⚡ Curso Electricidad 1° (12 Semanas)
                                    </Link>

                                    <div className="utn-sub-header">Fundamentos</div>
                                    <Link to="/ley-ohm" style={linkStyle} onClick={closeAll}>Ley de Ohm</Link>
                                    <Link to="/kirchhoff" style={linkStyle} onClick={closeAll}>Leyes de Kirchhoff</Link>
                                    <Link to="/potencia" style={linkStyle} onClick={closeAll}>Potencia Eléctrica</Link>
                                    <Link to="/electricidad-basica" style={linkStyle} onClick={closeAll}>Electricidad Básica</Link>
                                    <Link to="/circuitos-domiciliarios" style={linkStyle} onClick={closeAll}>Instal. Domiciliarias</Link>

                                    <div className="utn-sub-header">Electrónica Analógica</div>
                                    <Link to="/simbologia-electronica" style={linkStyle} onClick={closeAll}>Simbología Eléctrica/Electrónica</Link>
                                    <Link to="/codigos-resistencias" style={linkStyle} onClick={closeAll}>Códigos de Resistencias</Link>
                                    <Link to="/resistencias-serie-paralelo" style={linkStyle} onClick={closeAll}>Serie / Paralelo</Link>
                                    <Link to="/teorema-thevenin" style={linkStyle} onClick={closeAll}>T. de Thévenin</Link>
                                    <Link to="/teorema-norton" style={linkStyle} onClick={closeAll}>T. de Norton</Link>
                                    <Link to="/componentes-electronica" style={linkStyle} onClick={closeAll}>Componentes y Lógica</Link>

                                    <div className="utn-sub-header">Electrónica Digital</div>
                                    <Link to="/electronica-digital/numeracion" style={linkStyle} onClick={closeAll}>1. Sistemas de Numeración</Link>
                                    <Link to="/electronica-digital/codigos-algebra" style={linkStyle} onClick={closeAll}>2. Códigos y Álgebra Boole</Link>
                                    <Link to="/electronica-digital/compuertas" style={linkStyle} onClick={closeAll}>3. Compuertas Lógicas</Link>
                                    <Link to="/electronica-digital/formas-canonicas" style={linkStyle} onClick={closeAll}>4. Formas Canónicas</Link>
                                    <Link to="/electronica-digital/karnaugh" style={linkStyle} onClick={closeAll}>5. Mapas de Karnaugh</Link>
                                    <Link to="/electronica-digital/bloques-funcionales" style={linkStyle} onClick={closeAll}>6. MUX, DEMUX</Link>
                                    <Link to="/electronica-digital/bloques-aritmeticos" style={linkStyle} onClick={closeAll}>7. Sumadores</Link>
                                    <Link to="/electronica-digital/secuenciales" style={linkStyle} onClick={closeAll}>8. Secuenciales</Link>
                                    <Link to="/electronica-digital/proyecto-integrador" style={linkStyle} onClick={closeAll}>9. Proyecto Integrador</Link>

                                    <div className="utn-sub-header">Práctica y Laboratorio</div>
                                    <Link to="/osciloscopio" style={linkStyle} onClick={closeAll}>Osciloscopio</Link>
                                    <Link to="/multimetro" style={linkStyle} onClick={closeAll}>Multímetros</Link>
                                    <Link to="/soldadura" style={linkStyle} onClick={closeAll}>🔥 Soldadura y Desoldado</Link>
                                    <Link to="/circuitos-impresos" style={linkStyle} onClick={closeAll}>🔌 PCB</Link>
                                    <Link to="/simulador-circuitos" style={linkStyle} onClick={closeAll}>🧪 Simulador de Circuitos</Link>
                                    <Link to="/energias-renovables" style={linkStyle} onClick={closeAll}>Energías Renovables</Link>
                                </div>

                                {/* COLUMNA 2: Robótica + Taller */}
                                <div className="utn-mega-col">
                                    <div className="utn-col-title">🤖 Robótica & Programación</div>
                                    <div className="utn-sub-header">Arduino & C++</div>
                                    <Link to="/arduino-intro" style={linkStyle} onClick={closeAll}>Introducción</Link>
                                    <Link to="/cpp-basico" style={linkStyle} onClick={closeAll}>C/C++ Básico</Link>
                                    <Link to="/pwm" style={linkStyle} onClick={closeAll}>Señales PWM</Link>
                                    <Link to="/sensores" style={linkStyle} onClick={closeAll}>Sensores</Link>
                                    <Link to="/comunicacion-serial" style={linkStyle} onClick={closeAll}>Configuración Serial</Link>

                                    <div className="utn-sub-header">ESP32 & IoT</div>
                                    <Link to="/arduino/esp32-sim" style={linkStyle} onClick={closeAll}>🤖 Simulador ESP32</Link>
                                    <Link to="/arduino/iot-dashboards" style={linkStyle} onClick={closeAll}>📊 Dashboards IoT</Link>
                                    <Link to="/arduino/web-designer" style={linkStyle} onClick={closeAll}>🌐 Web Designer</Link>

                                    <div className="utn-sub-header">Proyectos Prácticos</div>
                                    <Link to="/taller-robotica" style={linkStyle} onClick={closeAll}>Taller de Robótica</Link>
                                    <Link to="/robot-evita-obstaculos" style={linkStyle} onClick={closeAll}>Robot Evasor</Link>
                                    <Link to="/scratch" style={linkStyle} onClick={closeAll}>Programación Scratch 😺</Link>

                                    <div className="utn-col-title" style={{ marginTop: '1.25rem' }}>🛠️ Taller y Mecánica</div>
                                    <div className="utn-sub-header">Metrología</div>
                                    <Link to="/calibre" style={linkStyle} onClick={closeAll}>Calibre Pie de Rey</Link>
                                    <Link to="/micrometro" style={linkStyle} onClick={closeAll}>Micrómetro</Link>
                                    <Link to="/metro-carpintero" style={linkStyle} onClick={closeAll}>Metro de Carpintero</Link>

                                    <div className="utn-sub-header">Taller y Oficios</div>
                                    <Link to="/seguridad-epp" style={linkStyle} onClick={closeAll}>Seguridad y EPP</Link>
                                    <Link to="/herramientas-electricidad" style={linkStyle} onClick={closeAll}>Herramientas Electricidad</Link>
                                    <Link to="/herramientas-electronica" style={linkStyle} onClick={closeAll}>Herramientas Electrónica</Link>
                                    <Link to="/herramientas-carpinteria" style={linkStyle} onClick={closeAll}>Carpintería</Link>
                                    <Link to="/metal-mecanica" style={linkStyle} onClick={closeAll}>Metal-Mecánica</Link>

                                    <div className="utn-sub-header">Proyectos</div>
                                    <Link to="/proyectos-reciclables" style={linkStyle} onClick={closeAll}>Ecobots Reciclables</Link>
                                    <Link to="/proyectos-integradores" style={linkStyle} onClick={closeAll}>Integradores 6° Año</Link>
                                </div>

                                {/* COLUMNA 3: Diseño, Ciencias e Institución */}
                                <div className="utn-mega-col">
                                    <div className="utn-col-title">📐 Diseño & Dibujo Técnico</div>
                                    <div className="utn-sub-header">Fundamentos</div>
                                    <Link to="/dibujo-tecnico/normas-iram" style={linkStyle} onClick={closeAll}>Normas IRAM</Link>
                                    <Link to="/dibujo-tecnico/proyecciones" style={linkStyle} onClick={closeAll}>Proyecciones Ortogonales</Link>
                                    <Link to="/dibujo-tecnico/axonometrica" style={linkStyle} onClick={closeAll}>Axonometrías (ISO)</Link>
                                    <Link to="/dibujo-2do/normalizacion" style={linkStyle} onClick={closeAll}>Normalización Avanzada</Link>

                                    <div className="utn-sub-header">Geometría & 3D</div>
                                    <Link to="/dibujo-tecnico/construcciones-geometricas" style={linkStyle} onClick={closeAll}>Construcciones Geom.</Link>
                                    <Link to="/dibujo-2do/poligonos" style={linkStyle} onClick={closeAll}>Polígonos Regulares</Link>
                                    <Link to="/dibujo-2do/tangencias" style={linkStyle} onClick={closeAll}>Tangencias</Link>
                                    <Link to="/dibujo-2do/transformaciones" style={linkStyle} onClick={closeAll}>Transformaciones</Link>
                                    <Link to="/dibujo-2do/curvas-conicas" style={linkStyle} onClick={closeAll}>Curvas Cónicas</Link>
                                    <Link to="/dibujo-2do/curvas-tecnicas" style={linkStyle} onClick={closeAll}>Curvas Técnicas</Link>
                                    <Link to="/ar-arquitectura" style={linkStyle} onClick={closeAll}>🧊 Arquitectura 3D</Link>
                                    <a
                                        href="https://notebooklm.google.com/notebook/8d04d621-ac7b-43b2-8d62-3a0b5f88c961/artifact/1eed6dc1-0b38-4295-8d4d-0b87bead32d9?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_2&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_2_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={linkStyle}
                                        onClick={closeAll}
                                        title="Tutorial NotebookLM"
                                    >
                                        📘 Tutorial NotebookLM
                                    </a>

                                    <div className="utn-col-title" style={{ marginTop: '1.25rem' }}>🖥️ Ciencias & Computación</div>
                                    <div className="utn-sub-header">Matemática y Física</div>
                                    <Link to="/conversion-unidades" style={linkStyle} onClick={closeAll}>Conversión Unidades</Link>
                                    <Link to="/pitagoras" style={linkStyle} onClick={closeAll}>Teorema Pitágoras</Link>
                                    <Link to="/trigonometria" style={linkStyle} onClick={closeAll}>Trigonometría</Link>
                                    <Link to="/cinematica" style={linkStyle} onClick={closeAll}>Cinemática (MRU/MRUV)</Link>

                                    <div className="utn-sub-header">Informática & Sistemas</div>
                                    <Link to="/generaciones-computadoras" style={linkStyle} onClick={closeAll}>🎮 Generaciones de Computadoras</Link>
                                    <Link to="/arquitectura-von-neumann" style={linkStyle} onClick={closeAll}>⚙️ Arquitectura Von Neumann</Link>
                                    <Link to="/arquitectura-harvard" style={linkStyle} onClick={closeAll}>🔬 Arquitectura Harvard</Link>
                                    <Link to="/cpu-simulator" style={linkStyle} onClick={closeAll}>🧠 La CPU: Motor de Ejecucion</Link>
                                    <Link to="/memoria" style={linkStyle} onClick={closeAll}>💾 Jerarquia de Memoria</Link>
                                    <Link to="/arranque" style={linkStyle} onClick={closeAll}>🔌 Hardware y Boot</Link>
                                    <Link to="/ar-ensamblaje" style={linkStyle} onClick={closeAll}>📷 Ensamblaje PC (RA)</Link>
                                    <Link to="/sociedad-software" style={linkStyle} onClick={closeAll}>🌐 Sociedad y Software</Link>
                                    <Link to="/cultura-digital" style={linkStyle} onClick={closeAll}>📱 Cultura Digital</Link>
                                    <Link to="/representacion-datos" style={linkStyle} onClick={closeAll}>🔢 Representacion de Datos</Link>
                                    <Link to="/logica-digital" style={linkStyle} onClick={closeAll}>🔲 Logica Digital</Link>
                                    <Link to="/sistema-operativo" style={linkStyle} onClick={closeAll}>🖥️ Sistema Operativo</Link>
                                    <Link to="/seguridad-informatica" style={linkStyle} onClick={closeAll}>🔒 Seguridad Informatica</Link>

                                    <div className="utn-col-title" style={{ marginTop: '1.25rem' }}>🏫 Institución</div>
                                    <a
                                        href="https://drive.google.com/drive/folders/1B2vp3KrPw-nD7JQKJL1gETrOt_ZWNmqp?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={linkStyle}
                                        onClick={closeAll}
                                        title="Carpeta de Google Drive UTN San Miguel"
                                    >
                                        📁 Carpeta Drive UTN
                                    </a>
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/1OjScpndyRb-eljHQCWzH7S9P9JgMg8BofPhRYcBXGl4/edit?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={linkStyle}
                                        onClick={closeAll}
                                        title="Planilla institucional"
                                    >
                                        📊 Planilla institucional Técnica 1
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 6. APLICACIONES MÓVILES (PROTEGIDO CON PALABRA CLAVE) */}
                <div className={`dropdown ${openSubmenu === 'moviles' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={{
                            ...linkStyle,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: isMobileCourseUnlocked ? 'rgba(2, 132, 199, 0.12)' : 'rgba(239, 68, 68, 0.08)',
                            color: isMobileCourseUnlocked ? '#0284c7' : '#ef4444',
                            border: `1px solid ${isMobileCourseUnlocked ? 'rgba(2, 132, 199, 0.3)' : 'rgba(239, 68, 68, 0.25)'}`,
                            fontWeight: '700'
                        }}
                        onClick={() => toggleSubmenu('moviles')}
                    >
                        <span>📱 App Móviles</span>
                        <span style={{ fontSize: '11px' }}>{isMobileCourseUnlocked ? '🔓' : '🔒'}</span>
                        <span className="arrow">▼</span>
                    </div>
                    <div className="dropdown-menu" style={{ maxHeight: '70vh', overflowY: 'auto', minWidth: '260px' }}>
                        <div style={{ padding: '0.5rem 1rem', fontWeight: 'bold', color: 'var(--primary-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>React Native & Expo</span>
                            <span style={{ fontSize: '10px', background: isMobileCourseUnlocked ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: isMobileCourseUnlocked ? '#10b981' : '#ef4444', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                {isMobileCourseUnlocked ? 'Desbloqueado' : 'Requiere Clave'}
                            </span>
                        </div>

                        <Link
                            to="/aplicaciones-moviles"
                            style={linkStyle}
                            onClick={(e) => {
                                if (!isMobileCourseUnlocked) {
                                    e.preventDefault();
                                    setAccessModalOpen(true);
                                }
                                closeAll();
                            }}
                        >
                            📘 Programa & Unidades {isMobileCourseUnlocked ? '✓' : '🔒'}
                        </Link>

                        <Link
                            to="/simulador-react-native"
                            style={linkStyle}
                            onClick={(e) => {
                                if (!isMobileCourseUnlocked) {
                                    e.preventDefault();
                                    setAccessModalOpen(true);
                                }
                                closeAll();
                            }}
                        >
                            ⚛️ Simulador Interactivo {isMobileCourseUnlocked ? '✓' : '🔒'}
                        </Link>

                        {!isMobileCourseUnlocked ? (
                            <div style={{ padding: '0.5rem 0.75rem' }}>
                                <button
                                    onClick={() => {
                                        closeAll();
                                        setAccessModalOpen(true);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                                        color: '#fff',
                                        border: 'none',
                                        fontWeight: '800',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        boxShadow: '0 4px 12px rgba(2,132,199,0.3)'
                                    }}
                                >
                                    🔑 Ingresar Palabra Clave
                                </button>
                            </div>
                        ) : (
                            <div style={{ padding: '0.4rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <button
                                    onClick={() => {
                                        lockMobileCourse();
                                        closeAll();
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        fontWeight: '600',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🔒 Bloquear Acceso
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submenu Gestión Académica - Solo si está autenticado */}
                {isAuthenticated && (
                    <div className={`dropdown ${openSubmenu === 'academic' ? 'active' : ''}`}>
                        <div
                            className="dropdown-trigger"
                            style={linkStyle}
                            onClick={() => toggleSubmenu('academic')}
                        >
                            Gestión Académica <span className="arrow">▼</span>
                        </div>
                        <div className="dropdown-menu" style={{ maxHeight: '70vh', overflowY: 'auto', minWidth: '250px' }}>
                            <Link to="/gestion-academica" style={linkStyle} onClick={closeAll}>Panel Principal</Link>

                            {/* Solo mostrar Gestión Académica si está logueado */}
                            {['admin', 'director', 'secretario', 'jefe_preceptores'].includes(user?.role) && (
                                <Link to="/estudiantes" style={linkStyle} onClick={closeAll}>Estudiantes</Link>
                            )}

                            <Link to="/calificaciones" style={linkStyle} onClick={closeAll}>Calificaciones</Link>
                            <Link to="/asistencia" style={linkStyle} onClick={closeAll}>Asistencia</Link>
                            <Link to="/aula-virtual" style={linkStyle} onClick={closeAll}>Aula Virtual</Link>
                            <Link to="/comunicados" style={linkStyle} onClick={closeAll}>Comunicaciones</Link>

                            {['admin', 'director', 'secretario', 'jefe_preceptores', 'preceptor', 'profesor'].includes(user?.role) && (
                                <Link to="/libro-temas" style={linkStyle} onClick={closeAll}>Libro de Temas</Link>
                            )}

                            {['admin', 'director', 'secretario'].includes(user?.role) && (
                                <>
                                    <Link to="/asignacion-docente" style={linkStyle} onClick={closeAll}>Asignación Docente</Link>
                                    <Link to="/oferta-academica" style={linkStyle} onClick={closeAll}>Cursos y Materias (ABM)</Link>
                                    <Link to="/plan-estudios" style={linkStyle} onClick={closeAll}>Plan de Estudios (Curricula)</Link>
                                </>
                            )}

                            {['admin', 'director'].includes(user?.role) && (
                                <Link to="/usuarios" style={{ ...linkStyle, borderTop: '1px solid rgba(255,255,255,0.1)' }} onClick={closeAll}>Usuarios / Docentes</Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Login / Logout */}
                {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
                        <Link to="/perfil" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={closeAll}>
                            {user?.foto ? (
                                <img src={user.foto} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-color)' }} />
                            ) : (
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary-color)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {user?.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }} className="hidden-mobile">
                                {user?.email?.split('@')[0]}
                            </span>
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                closeAll();
                            }}
                            className="nav-btn-logout"
                        >
                            Salir
                        </button>
                    </div>
                ) : (
                    <div style={{ padding: '0 1rem' }}>
                        <Link
                            to="/login"
                            className="nav-btn-login"
                            onClick={closeAll}
                        >
                            INGRESAR
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                .theme-toggle-btn {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    borderRadius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    color: var(--text-main);
                }

                .hamburger-menu {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    cursor: pointer;
                    padding: 0.5rem;
                    background: none;
                    border: none;
                }

                .hamburger-menu .bar {
                    width: 25px;
                    height: 3px;
                    background: var(--text-main);
                    border-radius: 2px;
                    transition: all 0.3s ease;
                }

                .nav-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                    align-items: center;
                    justify-content: flex-end;
                    flex: 1 1 auto;
                    min-width: 0;
                }

                .dropdown {
                    position: relative;
                }

                .dropdown-trigger .arrow {
                    font-size: 0.7rem;
                    margin-left: 5px;
                    transition: transform 0.3s ease;
                }

                .dropdown-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--nav-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    min-width: 200px;
                    max-width: calc(100vw - 2rem);
                    padding: 0.5rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                }

                .dropdown-mega {
                    position: relative;
                }

                .utn-mega-menu {
                    max-height: 82vh;
                    overflow-y: auto;
                    background: var(--nav-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 242, 255, 0.3);
                    border-radius: 16px;
                    padding: 1rem;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 255, 0.15);
                }

                .utn-mega-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                }

                .utn-mega-col {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .utn-col-title {
                    font-size: 0.88rem;
                    font-weight: 800;
                    color: var(--primary-color);
                    padding: 0.4rem 0.6rem;
                    border-bottom: 1.5px solid rgba(0, 242, 255, 0.3);
                    margin-bottom: 0.35rem;
                    letter-spacing: 0.3px;
                }

                .utn-sub-header {
                    font-size: 0.74rem;
                    font-weight: 700;
                    color: var(--text-dim);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 0.45rem 0.6rem 0.2rem;
                    margin-top: 0.35rem;
                    border-left: 2px solid rgba(0, 242, 255, 0.4);
                }

                @media (min-width: 1100px) {
                    .dropdown-menu { left: 0; right: auto; }
                }

                @media (min-width: 992px) {
                    .dropdown:hover .dropdown-menu,
                    .dropdown.active .dropdown-menu {
                        display: block;
                    }
                    .dropdown:hover .arrow,
                    .dropdown.active .arrow {
                        transform: rotate(180deg);
                    }
                    .dropdown-mega:hover .utn-mega-menu,
                    .dropdown-mega.active .utn-mega-menu {
                        display: block;
                    }
                    .utn-mega-menu {
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-40%);
                        width: 960px;
                        max-width: 92vw;
                    }
                }

                /* Tablet / desktop angosto: el menú puede no ser hover-friendly,
                   confiamos en el click */
                @media (min-width: 992px) and (max-width: 1099px) {
                    .nav-links { font-size: 0.92rem; }
                }

                @media (max-width: 991px) {
                    .brand-text {
                        display: none;
                    }
                    .hamburger-menu {
                        display: flex;
                    }
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        flex-wrap: nowrap;
                        width: 100%;
                        margin-top: 1rem;
                        background: var(--nav-bg);
                        border-radius: 12px;
                        padding: 1rem;
                        border: 1px solid var(--glass-border);
                        position: absolute;
                        top: 60px;
                        left: 0;
                        right: 0;
                        max-height: calc(100vh - 80px);
                        overflow-y: auto;
                    }
                    .nav-links.open {
                        display: flex;
                    }
                    .dropdown-menu {
                        position: static;
                        display: none;
                        width: 100%;
                        max-width: 100%;
                        background: rgba(0,0,0,0.1);
                        box-shadow: none;
                        border: none;
                        padding-left: 1rem;
                    }
                    .utn-mega-grid {
                        grid-template-columns: 1fr;
                    }
                    .utn-mega-menu {
                        width: 100% !important;
                        transform: none !important;
                        position: static !important;
                        max-height: none !important;
                        box-shadow: none !important;
                        padding: 0.5rem 0.25rem !important;
                    }
                    .dropdown.active .dropdown-menu {
                        display: block;
                    }
                    .dropdown.active .arrow {
                        transform: rotate(180deg);
                    }
                }
            `}</style>

            <MobileAccessModal
                isOpen={accessModalOpen}
                onClose={() => setAccessModalOpen(false)}
                onUnlocked={() => setIsMobileCourseUnlocked(true)}
            />

            <UtnAccessModal
                isOpen={utnModalOpen}
                onClose={() => setUtnModalOpen(false)}
                onUnlocked={() => setIsUtnCourseUnlocked(true)}
            />
        </nav>
    );
};

export default NavBar;

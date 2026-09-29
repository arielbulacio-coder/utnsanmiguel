import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../carousel.css';
import { useAuth } from '../context/AuthContext';

// Import Assets
import carrousel1 from '../assets/carousel_1.png';
import carrousel2 from '../assets/carousel_2.png';
import carrousel3 from '../assets/carousel_3.png';
import carrousel4 from '../assets/carousel_4.png';
import carrousel5 from '../assets/carousel_5.png';

// Import Tool Icons
import imgMicrometer from '../assets/micrometer_icon.png';
import imgCaliper from '../assets/caliper_icon.png';
import imgMultimeter from '../assets/multimeter_icon.png';
import imgOscilloscope from '../assets/oscilloscope_icon.png';

/* ─── Estilos de sección reutilizables ─── */
const sectionWrap = { maxWidth: '1200px', margin: '0 auto 3rem auto' };
const grid        = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' };
const cardBase    = { margin: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' };

/* Cabecera de pilar (color de acento unificado en azul institucional) */
const PilarHeader = ({ emoji, title }) => (
    <div className="pilar-header">
        <span>{emoji}</span>
        <span>{title}</span>
    </div>
);

/* Tarjeta de módulo simple */
const ModCard = ({ title, children }) => (
    <div className="glass-card" style={cardBase}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
        {children}
    </div>
);

/* Tarjeta featured (ancho completo) */
const FeaturedCard = ({ badge, emoji, title, subtitle }) => (
    <div className="glass-card" style={{
        ...cardBase,
        padding: '1.6rem',
        border: '1.5px solid var(--primary-color)',
        position: 'relative',
        background: 'var(--brand-blue-light)'
    }}>
        {badge && (
            <span style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'var(--primary-color)', color: '#fff',
                fontSize: '0.65rem', padding: '3px 10px', borderRadius: '20px',
                fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase'
            }}>{badge}</span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '2.2rem' }}>{emoji}</span>
            <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>{title}</h3>
                {subtitle && <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
            </div>
        </div>
    </div>
);

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="app-container" style={{ textAlign: 'center', paddingTop: '1.5rem' }}>

            {/* ── CAROUSEL ── */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto 2.5rem auto',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(15,23,42,0.10)',
                border: '1px solid var(--border-color)'
            }}>
                <Carousel fade interval={4500} pause="hover">
                    {[
                        { src: carrousel1, alt: 'Ingeniería y Electrónica',  title: 'Simuladores Electrónicos',     desc: 'Análisis de circuitos en tiempo real' },
                        { src: carrousel2, alt: 'Energías Renovables',       title: 'Sistemas Sustentables',        desc: 'Simulación de paneles solares y energías limpias' },
                        { src: carrousel3, alt: 'Robótica y Arduino',        title: 'Programación y Control',       desc: 'Entorno de simulación para proyectos robóticos' },
                        { src: carrousel4, alt: 'Taller y Herramientas',     title: 'Laboratorio Virtual',          desc: 'Uso de instrumentos de medición y herramientas técnicas' },
                        { src: carrousel5, alt: 'Educación Moderna',         title: 'Aprendizaje Interactivo',      desc: 'Material didáctico adaptado a la industria moderna' },
                    ].map(({ src, alt, title, desc }) => (
                        <Carousel.Item key={title}>
                            <img className="d-block w-100" src={src} alt={alt} style={{ height: '480px', objectFit: 'cover' }} />
                            <Carousel.Caption style={{ background: 'rgba(15,23,42,0.65)', borderRadius: '8px', padding: '0.75rem 1.25rem' }}>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* ── HERO CARD ── */}
            <div className="glass-card" style={{ maxWidth: '780px', margin: '0 auto 2.5rem auto', padding: '2.5rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <img
                        src="/logo_simutec.png"
                        alt="Logo simutec.com.ar"
                        style={{ width: '80px', height: 'auto', margin: '0 auto 1rem auto', display: 'block', objectFit: 'contain', borderRadius: '10px' }}
                    />
                    <h1 style={{ fontSize: '2.4rem', marginBottom: '0.25rem' }}>simutec.com.ar</h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
                        Plataforma de Simulación y Educación Tecnológica · EST UTN San Miguel
                    </p>
                </div>

                {/* CTA Curso Electricidad */}
                <Link to="/electricidad-1ro" style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: 'var(--primary-color)',
                        borderRadius: '12px',
                        padding: '1rem 1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        cursor: 'pointer',
                        color: '#fff',
                        textAlign: 'left',
                        boxShadow: '0 4px 14px rgba(26,86,219,0.30)',
                        transition: 'box-shadow 0.2s ease, transform 0.15s ease'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,86,219,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,86,219,0.30)'; }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                            <span style={{ fontSize: '2rem' }}>⚡</span>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '1rem', color: '#fff' }}>
                                    NUEVO: Curso Electricidad 1° Año (12 Semanas · 24 Clases)
                                </div>
                                <div style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.2rem' }}>
                                    EST UTN San Miguel · Ecobots, Empalmes, Soldadura y TP Integrador
                                </div>
                            </div>
                        </div>
                        <span style={{
                            background: '#fff',
                            color: 'var(--primary-color)',
                            fontWeight: '700',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap'
                        }}>Ingresar ➔</span>
                    </div>
                </Link>
            </div>

            {/* ── TÍTULO SECCIÓN ── */}
            <h2 style={{ marginBottom: '2rem', fontSize: '1.6rem' }}>Módulos Educativos</h2>

            {/* ═══════════════════════════════════════════════
                PILAR 1 — ELECTRICIDAD Y ELECTRÓNICA
            ═══════════════════════════════════════════════ */}
            <div style={sectionWrap}>
                <PilarHeader emoji="⚡" title="Electricidad y Electrónica" />
                <div style={grid}>
                    {/* Featured */}
                    <Link to="/electricidad-1ro" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <FeaturedCard badge="Curso Completo" emoji="⚡" title="Electricidad 1° Año — Taller General" subtitle="12 semanas · 24 clases · EST UTN San Miguel" />
                    </Link>

                    <Link to="/ley-ohm"                      style={{ textDecoration: 'none' }}><ModCard title="Ley de Ohm"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>Ω</div></ModCard></Link>
                    <Link to="/kirchhoff"                    style={{ textDecoration: 'none' }}><ModCard title="Leyes de Kirchhoff"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>∑</div></ModCard></Link>
                    <Link to="/potencia"                     style={{ textDecoration: 'none' }}><ModCard title="Potencia Eléctrica"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>⚡</div></ModCard></Link>
                    <Link to="/circuitos-domiciliarios"      style={{ textDecoration: 'none' }}><ModCard title="Instal. Domiciliarias"><div style={{ marginTop: '0.75rem', fontSize: '1.8rem' }}>💡</div></ModCard></Link>
                    <Link to="/simbologia-electronica"       style={{ textDecoration: 'none' }}><ModCard title="Simbología"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🔌</div></ModCard></Link>
                    <Link to="/codigos-resistencias"         style={{ textDecoration: 'none' }}>
                        <ModCard title="Resistencias">
                            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                {['#dc2626','#7c3aed','#ca8a04'].map(c => (
                                    <div key={c} style={{ width: '18px', height: '9px', backgroundColor: c, borderRadius: '2px' }} />
                                ))}
                            </div>
                        </ModCard>
                    </Link>
                    <Link to="/teorema-thevenin"             style={{ textDecoration: 'none' }}><ModCard title="T. de Thévenin"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>⚙️</div></ModCard></Link>
                    <Link to="/componentes-electronica"      style={{ textDecoration: 'none' }}><ModCard title="Componentes y Lógica"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🔌</div></ModCard></Link>
                    <Link to="/electronica-digital/numeracion" style={{ textDecoration: 'none' }}><ModCard title="Electrónica Digital"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Compuertas, Boole, Karnaugh</p><div style={{ marginTop: '0.5rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🔲</div></ModCard></Link>
                    <Link to="/osciloscopio"                 style={{ textDecoration: 'none' }}><ModCard title="Osciloscopio"><img src={imgOscilloscope} alt="Osciloscopio" style={{ width: '46px', height: '46px', objectFit: 'contain', marginTop: '0.75rem' }} /></ModCard></Link>
                    <Link to="/multimetro"                   style={{ textDecoration: 'none' }}><ModCard title="Multímetros"><img src={imgMultimeter} alt="Multímetro" style={{ width: '46px', height: '46px', objectFit: 'contain', marginTop: '0.75rem' }} /></ModCard></Link>
                    <Link to="/energias-renovables"          style={{ textDecoration: 'none' }}><ModCard title="Energías Renovables"><div style={{ marginTop: '0.75rem', fontSize: '1.8rem' }}>☀️</div></ModCard></Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PILAR 2 — ROBÓTICA Y PROGRAMACIÓN
            ═══════════════════════════════════════════════ */}
            <div style={sectionWrap}>
                <PilarHeader emoji="🤖" title="Robótica y Programación" />
                <div style={grid}>
                    {/* Featured */}
                    <Link to="/taller-robotica" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <FeaturedCard badge="Destacado" emoji="🦾" title="Curso Taller de Robótica" subtitle="Evita Obstáculos · Sumo · Fútbol Robot" />
                    </Link>
                    <Link to="/aplicaciones-moviles" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <FeaturedCard badge="Nuevo" emoji="📱" title="Curso de React Native" subtitle="Desarrollo de Aplicaciones Móviles con Expo" />
                    </Link>

                    <Link to="/arduino-intro"          style={{ textDecoration: 'none' }}><ModCard title="Arduino & C++"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Intro, PWM, Sensores</p><div style={{ marginTop: '0.5rem', fontSize: '1.8rem' }}>📟</div></ModCard></Link>
                    <Link to="/arduino/esp32-sim"      style={{ textDecoration: 'none' }}><ModCard title="Simulador ESP32"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Interpretador C++ y GPIO</p><div style={{ marginTop: '0.5rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🌐</div></ModCard></Link>
                    <Link to="/arduino/iot-dashboards" style={{ textDecoration: 'none' }}><ModCard title="Dashboards IoT"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Monitoreo en Tiempo Real</p><div style={{ marginTop: '0.5rem', fontSize: '1.8rem' }}>📊</div></ModCard></Link>
                    <Link to="/scratch"                style={{ textDecoration: 'none' }}><ModCard title="Programación Scratch"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Bloques Lógicos</p><div style={{ marginTop: '0.5rem', fontSize: '1.8rem' }}>😺</div></ModCard></Link>
                    <Link to="/simulador-react-native" style={{ textDecoration: 'none' }}><ModCard title="Simulador RN"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Prueba Código en Tiempo Real</p><div style={{ marginTop: '0.5rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>⚛️</div></ModCard></Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PILAR 3 — TALLER Y MECÁNICA
            ═══════════════════════════════════════════════ */}
            <div style={sectionWrap}>
                <PilarHeader emoji="🛠️" title="Taller y Mecánica" />
                <div style={grid}>
                    <Link to="/micrometro"            style={{ textDecoration: 'none' }}><ModCard title="Micrómetro"><img src={imgMicrometer} alt="Micrómetro" style={{ width: '46px', height: '46px', objectFit: 'contain', marginTop: '0.75rem' }} /></ModCard></Link>
                    <Link to="/calibre"               style={{ textDecoration: 'none' }}><ModCard title="Calibre"><img src={imgCaliper} alt="Calibre" style={{ width: '46px', height: '46px', objectFit: 'contain', marginTop: '0.75rem' }} /></ModCard></Link>
                    <Link to="/seguridad-epp"         style={{ textDecoration: 'none' }}><ModCard title="Seguridad y EPP"><div style={{ marginTop: '0.75rem', fontSize: '1.8rem' }}>🛡️</div></ModCard></Link>
                    <Link to="/herramientas-carpinteria" style={{ textDecoration: 'none' }}><ModCard title="Carpintería"><img src={`${import.meta.env.BASE_URL}assets/saw_v2.png`} alt="Carpintería" style={{ width: '46px', height: '46px', objectFit: 'contain', marginTop: '0.75rem' }} /></ModCard></Link>
                    <Link to="/metal-mecanica"        style={{ textDecoration: 'none' }}><ModCard title="Metal-Mecánica"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🔩</div></ModCard></Link>
                    <Link to="/proyectos-integradores" style={{ textDecoration: 'none' }}><ModCard title="Proyectos Integradores 6° Año"><p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>Arduino + IoT + Solar</p><div style={{ marginTop: '0.5rem', fontSize: '1.8rem' }}>⚙️</div></ModCard></Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PILAR 4 — DISEÑO Y DIBUJO TÉCNICO
            ═══════════════════════════════════════════════ */}
            <div style={sectionWrap}>
                <PilarHeader emoji="📐" title="Diseño y Dibujo Técnico" />
                <div style={grid}>
                    <Link to="/dibujo-tecnico/proyecciones"           style={{ textDecoration: 'none' }}><ModCard title="Proyecciones Ortogonales"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🧊</div></ModCard></Link>
                    <Link to="/dibujo-tecnico/axonometrica"           style={{ textDecoration: 'none' }}><ModCard title="Axonometrías (ISO)"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>📐</div></ModCard></Link>
                    <Link to="/dibujo-2do/normalizacion"              style={{ textDecoration: 'none' }}><ModCard title="Normalización Avanzada"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>📏</div></ModCard></Link>
                    <Link to="/dibujo-tecnico/construcciones-geometricas" style={{ textDecoration: 'none' }}><ModCard title="Construcciones y Polígonos"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>⬡</div></ModCard></Link>
                    <Link to="/dibujo-2do/transformaciones"           style={{ textDecoration: 'none' }}><ModCard title="Geometría Descriptiva"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🔄</div></ModCard></Link>
                    <Link to="/ar-arquitectura"                       style={{ textDecoration: 'none' }}><ModCard title="Arquitectura 3D y AR"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🏛️</div></ModCard></Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PILAR 5 — CIENCIAS Y COMPUTACIÓN
            ═══════════════════════════════════════════════ */}
            <div style={{ ...sectionWrap, marginBottom: '5rem' }}>
                <PilarHeader emoji="🖥️" title="Ciencias y Computación" />
                <div style={grid}>
                    <Link to="/conversion-unidades"       style={{ textDecoration: 'none' }}><ModCard title="Conversor de Unidades"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>📏</div></ModCard></Link>
                    <Link to="/cinematica"                style={{ textDecoration: 'none' }}><ModCard title="Cinemática (MRU/MRUV)"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🏎️</div></ModCard></Link>
                    <Link to="/generaciones-computadoras" style={{ textDecoration: 'none' }}><ModCard title="Generaciones de Computadoras"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🎮</div></ModCard></Link>
                    <Link to="/arquitectura-von-neumann"  style={{ textDecoration: 'none' }}><ModCard title="Arquitectura Von Neumann"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>⚙️</div></ModCard></Link>
                    <Link to="/memoria"                   style={{ textDecoration: 'none' }}><ModCard title="Jerarquía de Memoria"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>💾</div></ModCard></Link>
                    <Link to="/sistema-operativo"         style={{ textDecoration: 'none' }}><ModCard title="Sistemas y Seguridad"><div style={{ marginTop: '0.75rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>🖥️</div></ModCard></Link>
                </div>
            </div>

        </div>
    );
};

export default Home;

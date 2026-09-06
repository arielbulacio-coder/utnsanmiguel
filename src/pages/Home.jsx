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
import imgSoldering from '../assets/soldering_station_icon.png';

const Home = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="app-container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
            {/* Bootstrap Carousel - School Images */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto 3rem auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 242, 255, 0.3)',
                border: '2px solid var(--primary-color)'
            }}>
                <Carousel fade interval={4000} pause="hover">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carrousel1}
                            alt="Ingeniería y Electrónica"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{ background: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '1rem' }}>
                            <h3>Simuladores Electrónicos</h3>
                            <p>Análisis de circuitos en tiempo real</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carrousel2}
                            alt="Energías Renovables"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{ background: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '1rem' }}>
                            <h3>Sistemas Sustentables</h3>
                            <p>Simulación de paneles solares y energías limpias</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carrousel3}
                            alt="Robótica y Arduino"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{ background: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '1rem' }}>
                            <h3>Programación y Control</h3>
                            <p>Entorno de simulación para proyectos robóticos</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carrousel4}
                            alt="Taller y Herramientas"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{ background: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '1rem' }}>
                            <h3>Laboratorio Virtual</h3>
                            <p>Uso de instrumentos de medición y herramientas técnicas</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carrousel5}
                            alt="Educación Moderna"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{ background: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '1rem' }}>
                            <h3>Aprendizaje Iteractivo</h3>
                            <p>Material didáctico adaptado a la industria moderna</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', padding: '3rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <img
                        src="/logo_simutec.png"
                        alt="Logo simutec.com.ar"
                        style={{ width: '200px', height: 'auto', margin: '0 auto 1rem auto', objectFit: 'contain', filter: 'drop-shadow(0 0 15px var(--primary-color))', borderRadius: '12px' }}
                    />
                    <h1 style={{ fontSize: '3rem', background: 'linear-gradient(to right, #00f2ff, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' }}>simutec.com.ar</h1>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '0.5rem', opacity: 0.8 }}>Plataforma de Simulación y Educación Tecnológica</h2>
                </div>
                <p>Soporte didáctico interactivo para la formación técnica y científica.</p>

                <div style={{ marginTop: '1.8rem' }}>
                    <Link to="/electricidad-1ro" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.2) 0%, rgba(14,165,233,0.3) 100%)', border: '2px solid var(--primary-color)', borderRadius: '16px', padding: '1.2rem 1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', boxShadow: '0 0 25px rgba(0,242,255,0.3)', cursor: 'pointer', color: '#ffffff', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '2.4rem' }}>⚡</span>
                                <div>
                                    <div style={{ fontWeight: '900', fontSize: '1.25rem', color: '#00f2ff' }}>NUEVO: Curso Electricidad 1° Año (12 Semanas · 24 Clases)</div>
                                    <div style={{ fontSize: '0.9rem', color: '#e2e8f0', marginTop: '0.2rem' }}>EST UTN San Miguel · Prof. Ariel Bulacio · Ecobots, Empalmes, Soldadura y TP Integrador</div>
                                </div>
                            </div>
                            <span style={{ background: 'var(--primary-color)', color: '#000', fontWeight: '800', padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.95rem', whiteSpace: 'nowrap', boxShadow: '0 0 10px rgba(0,242,255,0.5)' }}>Ingresar al Curso ➔</span>
                        </div>
                    </Link>
                </div>
            </div>

            <h2 style={{ marginBottom: '2rem' }}>Módulos Educativos</h2>

            {/* PILAR 1: ELECTRICIDAD Y ELECTRÓNICA */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto' }}>
                <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem', borderBottom: '2px solid rgba(0, 242, 255, 0.3)', paddingBottom: '0.5rem' }}>⚡ Electricidad y Electrónica</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <Link to="/electricidad-1ro" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <div className="glass-card" style={{ margin: 0, padding: '1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(0, 242, 255, 0.45)', boxShadow: '0 0 25px rgba(0, 242, 255, 0.2)', position: 'relative', background: 'linear-gradient(135deg, rgba(0,242,255,0.08) 0%, rgba(15,23,42,0.85) 100%)' }}>
                            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#00f2ff', color: '#000', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '900', letterSpacing: '0.5px' }}>CURSO COMPLETO</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <span style={{ fontSize: '2.5rem' }}>⚡</span>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#fff' }}>Electricidad 1° Año — Taller General</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/ley-ohm" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Ley de Ohm</h3><div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>Ω</div></div></Link>
                    <Link to="/kirchhoff" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Leyes de Kirchhoff</h3><div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>∑</div></div></Link>
                    <Link to="/potencia" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Potencia Eléctrica</h3><div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚡</div></div></Link>
                    <Link to="/circuitos-domiciliarios" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Instal. Domiciliarias</h3><div style={{ marginTop: '1rem', color: '#eab308', fontSize: '2rem' }}>💡</div></div></Link>
                    
                    <Link to="/simbologia-electronica" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Simbología</h3><div style={{ marginTop: '1rem', color: '#00f2ff', fontSize: '2rem' }}>🔌</div></div></Link>
                    <Link to="/codigos-resistencias" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Resistencias</h3><div style={{ marginTop: '1rem', display: 'flex', gap: '5px', justifyContent:'center' }}><div style={{ width: '20px', height: '10px', backgroundColor: 'red' }}></div><div style={{ width: '20px', height: '10px', backgroundColor: 'purple' }}></div><div style={{ width: '20px', height: '10px', backgroundColor: 'yellow' }}></div></div></div></Link>
                    <Link to="/teorema-thevenin" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>T. de Thévenin</h3><div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚙️</div></div></Link>
                    <Link to="/componentes-electronica" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Componentes y Lógica</h3><div style={{ marginTop: '1rem', color: '#4caf50', fontSize: '2rem' }}>🔌</div></div></Link>
                    <Link to="/electronica-digital/numeracion" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Electrónica Digital</h3><p>Compuertas, Boole, Karnaugh</p><div style={{ marginTop: '1rem', color: '#7c3aed', fontSize: '2rem' }}>🔲</div></div></Link>

                    <Link to="/osciloscopio" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Osciloscopio</h3><img src={imgOscilloscope} alt="Osciloscopio" style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '1rem' }} /></div></Link>
                    <Link to="/multimetro" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Multímetros</h3><img src={imgMultimeter} alt="Multímetro" style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '1rem' }} /></div></Link>
                    <Link to="/energias-renovables" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Energías Renovables</h3><div style={{ marginTop: '1rem', color: '#ffc107', fontSize: '2rem' }}>☀️</div></div></Link>
                </div>
            </div>

            {/* PILAR 2: ROBÓTICA Y PROGRAMACIÓN */}
            <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                <h3 style={{ textAlign: 'left', color: '#00ccff', marginBottom: '1rem', paddingLeft: '1rem', borderBottom: '2px solid rgba(0, 204, 255, 0.3)', paddingBottom: '0.5rem' }}>🤖 Robótica y Programación</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <Link to="/taller-robotica" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <div className="glass-card" style={{ margin: 0, padding: '1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(0, 204, 255, 0.45)', boxShadow: '0 0 25px rgba(0, 204, 255, 0.2)', position: 'relative', background: 'linear-gradient(135deg, rgba(0,204,255,0.08) 0%, rgba(15,23,42,0.85) 100%)' }}>
                            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#00ccff', color: '#000', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '900' }}>DESTACADO</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <span style={{ fontSize: '2.5rem' }}>🦾</span>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#fff' }}>Curso Taller de Robótica</h3>
                                    <p style={{ margin: '0.3rem 0 0 0', color: 'var(--text-dim)', fontSize: '0.95rem' }}>Evita Obstáculos, Sumo, Fútbol Robot</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/arduino-intro" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Arduino & C++</h3><p>Intro, PWM, Sensores</p><div style={{ marginTop: '1rem', color: '#00979C', fontSize: '2rem' }}>📟</div></div></Link>
                    <Link to="/arduino/esp32-sim" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Simulador ESP32</h3><p>Interpretador C++ y GPIO</p><div style={{ marginTop: '1rem', color: '#10b981', fontSize: '2rem' }}>🌐</div></div></Link>
                    <Link to="/arduino/iot-dashboards" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboards IoT</h3><p>Monitoreo en Tiempo Real</p><div style={{ marginTop: '1rem', color: '#f59e0b', fontSize: '2rem' }}>📊</div></div></Link>
                    <Link to="/scratch" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Programación Scratch</h3><p>Bloques Lógicos</p><div style={{ marginTop: '1rem', color: '#ffcc00', fontSize: '2rem' }}>😺</div></div></Link>
                    <Link to="/aplicaciones-moviles" style={{ textDecoration: 'none', gridColumn: '1 / -1' }}>
                        <div className="glass-card" style={{ margin: 0, padding: '1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(2, 132, 199, 0.45)', boxShadow: '0 0 25px rgba(2, 132, 199, 0.2)', position: 'relative', background: 'linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(15,23,42,0.85) 100%)' }}>
                            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#0284c7', color: '#fff', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '900' }}>NUEVO</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <span style={{ fontSize: '2.5rem' }}>📱</span>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#fff' }}>Curso de React Native</h3>
                                    <p style={{ margin: '0.3rem 0 0 0', color: 'var(--text-dim)', fontSize: '0.95rem' }}>Desarrollo de Aplicaciones Móviles</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/simulador-react-native" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Simulador RN</h3><p>Prueba Código en Tiempo Real</p><div style={{ marginTop: '1rem', color: '#0ea5e9', fontSize: '2rem' }}>⚛️</div></div></Link>
                </div>
            </div>

            {/* PILAR 3: TALLER Y MECÁNICA */}
            <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                <h3 style={{ textAlign: 'left', color: '#f59e0b', marginBottom: '1rem', paddingLeft: '1rem', borderBottom: '2px solid rgba(245, 158, 11, 0.3)', paddingBottom: '0.5rem' }}>🛠️ Taller y Mecánica</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <Link to="/micrometro" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Micrómetro</h3><img src={imgMicrometer} alt="Micrómetro" style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '1rem' }} /></div></Link>
                    <Link to="/calibre" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Calibre</h3><img src={imgCaliper} alt="Calibre" style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '1rem' }} /></div></Link>
                    <Link to="/seguridad-epp" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Seguridad y EPP</h3><div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '2rem' }}>🛡️</div></div></Link>
                    <Link to="/herramientas-carpinteria" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Carpintería</h3><img src={`${import.meta.env.BASE_URL}assets/saw_v2.png`} alt="Carpintería" style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '1rem' }} /></div></Link>
                    <Link to="/metal-mecanica" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Metal-Mecánica</h3><div style={{ marginTop: '1rem', color: '#3b82f6', fontSize: '2rem' }}>🔩</div></div></Link>
                    <Link to="/proyectos-integradores" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Proyectos Integradores 6° Año</h3><p>Arduino + IoT + Solar</p><div style={{ marginTop: '1rem', fontSize: '2rem' }}>⚙️</div></div></Link>
                </div>
            </div>

            {/* PILAR 4: DISEÑO Y DIBUJO TÉCNICO */}
            <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                <h3 style={{ textAlign: 'left', color: '#22c55e', marginBottom: '1rem', paddingLeft: '1rem', borderBottom: '2px solid rgba(34, 197, 94, 0.3)', paddingBottom: '0.5rem' }}>📐 Diseño y Dibujo Técnico</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <Link to="/dibujo-tecnico/proyecciones" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Proyecciones Ortogonales</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>🧊</div></div></Link>
                    <Link to="/dibujo-tecnico/axonometrica" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Axonometrías (ISO)</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>📐</div></div></Link>
                    <Link to="/dibujo-2do/normalizacion" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Normalización Avanzada</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>📏</div></div></Link>
                    <Link to="/dibujo-tecnico/construcciones-geometricas" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Construcciones y Polígonos</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>⬡</div></div></Link>
                    <Link to="/dibujo-2do/transformaciones" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Geometría Descriptiva</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>🔄</div></div></Link>
                    <Link to="/ar-arquitectura" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Arquitectura 3D y AR</h3><div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2rem' }}>🏛️</div></div></Link>
                </div>
            </div>

            {/* PILAR 5: CIENCIAS Y COMPUTACIÓN */}
            <div style={{ maxWidth: '1200px', margin: '3rem auto 5rem auto' }}>
                <h3 style={{ textAlign: 'left', color: '#a55eea', marginBottom: '1rem', paddingLeft: '1rem', borderBottom: '2px solid rgba(165, 94, 234, 0.3)', paddingBottom: '0.5rem' }}>🖥️ Ciencias y Computación</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <Link to="/conversion-unidades" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Conversor de Unidades</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>📏</div></div></Link>
                    <Link to="/cinematica" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Cinemática (MRU/MRUV)</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>🏎️</div></div></Link>
                    <Link to="/generaciones-computadoras" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Generaciones de Computadoras</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>🎮</div></div></Link>
                    <Link to="/arquitectura-von-neumann" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Arquitectura Von Neumann</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>⚙️</div></div></Link>
                    <Link to="/memoria" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Jerarquía de Memoria</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>💾</div></div></Link>
                    <Link to="/sistema-operativo" style={{ textDecoration: 'none' }}><div className="glass-card"><h3 style={{ margin: 0, fontSize: '1.5rem' }}>Sistemas y Seguridad</h3><div style={{ marginTop: '1rem', color: '#a55eea', fontSize: '2rem' }}>🖥️</div></div></Link>
                </div>
            </div>

        </div>
    );
};

export default Home;

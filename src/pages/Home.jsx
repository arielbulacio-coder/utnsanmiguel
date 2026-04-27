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
// imgRule and imgSaw will be used as static assets
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
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
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
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
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
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
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
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
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
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
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
                        style={{
                            width: '200px',
                            height: 'auto',
                            margin: '0 auto 1rem auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 15px var(--primary-color))',
                            borderRadius: '12px'
                        }}
                    />
                    <h1 style={{
                        fontSize: '3rem',
                        background: 'linear-gradient(to right, #00f2ff, #fff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '900'
                    }}>simutec.com.ar</h1>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '0.5rem', opacity: 0.8 }}>Plataforma de Simulación y Educación Tecnológica</h2>
                </div>

                <p>
                    Soporte didáctico interactivo para la formación técnica y científica.
                </p>
            </div>


            <h2 style={{ marginBottom: '2rem' }}>Módulos Educativos</h2>

                    {/* ⚡ ELECTRICIDAD */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>⚡ Electricidad</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/ley-ohm" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Ley de Ohm</h3>
                                    <p>Calculadora y Teoría Fundamental</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>Ω</div>
                                </div>
                            </Link>
                            <Link to="/kirchhoff" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Leyes de Kirchhoff</h3>
                                    <p>Análisis de Mallas y Nodos</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>∑</div>
                                </div>
                            </Link>
                            <Link to="/potencia" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Potencia Eléctrica</h3>
                                    <p>Ley de Watt y Disipación</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚡</div>
                                </div>
                            </Link>
                            <Link to="/electricidad-basica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Electricidad Básica</h3>
                                    <p>Teoría General y Magnitudes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>💡</div>
                                </div>
                            </Link>
                            <Link to="/circuitos-domiciliarios" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Instal. Eléctricas</h3>
                                    <p>Simulador Interactivo de Conexiones</p>
                                    <div style={{ marginTop: '1rem', color: '#eab308', fontSize: '3rem' }}>⚡</div>
                                </div>
                            </Link>
                            <Link to="/herramientas-electricidad" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Herramientas</h3>
                                    <p>Herramientas de Electricidad</p>
                                    <div style={{ marginTop: '1rem', color: '#eab308', fontSize: '3rem' }}>🛠️</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 🔌 ELECTRÓNICA */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--secondary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>🔌 Electrónica</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/codigos-resistencias" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Códigos de Color</h3>
                                    <p>Identificación de Resistencias</p>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '5px' }}>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'red' }}></div>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'purple' }}></div>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'yellow' }}></div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/resistencias-serie-paralelo" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Serie / Paralelo</h3>
                                    <p>Resistencias Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>📏</div>
                                </div>
                            </Link>
                            <Link to="/teorema-thevenin" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>T. de Thévenin</h3>
                                    <p>Circuitos Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚙️</div>
                                </div>
                            </Link>
                            <Link to="/teorema-norton" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>T. de Norton</h3>
                                    <p>Fuentes Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>🔌</div>
                                </div>
                            </Link>
                            <Link to="/componentes-electronica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Componentes y Lógica</h3>
                                    <p>Simulador Interactivo de Componentes</p>
                                    <div style={{ marginTop: '1rem', color: '#4caf50', fontSize: '2rem' }}>🔌</div>
                                </div>
                            </Link>
                            <Link to="/energias-renovables" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Energías Renovables</h3>
                                    <p>Paneles y Baterías Solares</p>
                                    <div style={{ marginTop: '1rem', color: '#ffc107', fontSize: '2rem' }}>☀️</div>
                                </div>
                            </Link>
                            <Link to="/osciloscopio" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Osciloscopio</h3>
                                    <p>Simulador Dinámico</p>
                                    <img src={imgOscilloscope} alt="Osciloscopio" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/multimetro" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Multímetros</h3>
                                    <p>Tester Digital y Analógico</p>
                                    <img src={imgMultimeter} alt="Multímetro" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/herramientas-electronica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Herramientas</h3>
                                    <p>Soldador y Accesorios</p>
                                    <img src={imgSoldering} alt="Electrónica" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* ✏️ DIBUJO TÉCNICO UNIFICADO */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: '#22c55e', marginBottom: '1rem', paddingLeft: '1rem' }}>✏️ Dibujo Técnico</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/dibujo-tecnico/proyecciones" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(0, 242, 255, 0.4)', boxShadow: '0 0 15px rgba(0, 242, 255, 0.15)', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff0000', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', zIndex: 10 }}>NUEVO</div>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Proyecciones</h3>
                                    <p>Método Monge e ISO E/A</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2.5rem' }}>🧊</div>
                                    <div style={{ marginTop: '0.75rem', padding: '0.2rem 0.8rem', background: 'rgba(0, 242, 255, 0.2)', border: '1px solid var(--primary-color)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '700' }}>
                                        Simulador 3D Interactivo
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dibujo-tecnico/axonometrica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(167, 139, 250, 0.4)', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--secondary-color)', color: '#000', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', zIndex: 10 }}>MEJORADO</div>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Axonometrías</h3>
                                    <p>Isométrica, Caballera y Dimétrica</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2.5rem' }}>📐</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/normalizacion" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Normalización</h3>
                                    <p>Formatos, líneas y escalas</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>📏</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/poligonos" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Polígonos</h3>
                                    <p>Construcciones Regulares</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>⬡</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/tangencias" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Tangencias</h3>
                                    <p>Circunferencias y Arcos</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>⊙</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/transformaciones" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Transformaciones</h3>
                                    <p>Traslación, Giro y Simetría</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>🔄</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/curvas-conicas" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Curvas Cónicas</h3>
                                    <p>Elipse, Parábola e Hipérbola</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>◠</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-2do/curvas-tecnicas" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Curvas Técnicas</h3>
                                    <p>Ovoides y Espirales</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>🌀</div>
                                </div>
                            </Link>
                            <Link to="/dibujo-tecnico/normas-iram" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Normas IRAM</h3>
                                    <p>Criterios de Estandarización</p>
                                    <div style={{ marginTop: '1rem', color: '#22c55e', fontSize: '2.5rem' }}>📋</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 📐 MATEMÁTICA Y FÍSICA */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--text-main)', marginBottom: '1rem', paddingLeft: '1rem' }}>📐 Ciencias Básicas</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/conversion-unidades" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Conversor de Unidades</h3>
                                    <p>Imperial a Métrico y Viceversa</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>📏</div>
                                </div>
                            </Link>
                            <Link to="/pitagoras" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Pitágoras</h3>
                                    <p>Cálculo de Triángulos y Fuerzas</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>📐</div>
                                </div>
                            </Link>
                            <Link to="/trigonometria" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Trigonometría</h3>
                                    <p>Seno, Coseno y Tangente</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>📐</div>
                                </div>
                            </Link>
                            <Link to="/cinematica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Cinemática</h3>
                                    <p>Movimiento MRU y MRUV</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>🏎️</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 🛠️ TALLER */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>🛠️ Taller y Mediciones</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/seguridad-epp" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Seguridad y EPP</h3>
                                    <p>Elementos de Protección Personal</p>
                                    <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '3rem' }}>🛡️</div>
                                </div>
                            </Link>
                            <Link to="/micrometro" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Micrómetro</h3>
                                    <p>Simulador de Medición de Precisión</p>
                                    <img src={imgMicrometer} alt="Micrómetro" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/calibre" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Calibre</h3>
                                    <p>Uso del Nonio y Pie de Rey</p>
                                    <img src={imgCaliper} alt="Calibre" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/metro-carpintero" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Metro</h3>
                                    <p>Herramienta Plegable de Madera</p>
                                    <img src={`${import.meta.env.BASE_URL}assets/ruler_v2.png`} alt="Metro Carpintero" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/herramientas-carpinteria" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Carpintería</h3>
                                    <p>Maderas y Herramientas</p>
                                    <img src={`${import.meta.env.BASE_URL}assets/saw_v2.png`} alt="Carpintería" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
                                </div>
                            </Link>
                            <Link to="/metal-mecanica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Mecánica</h3>
                                    <p>Metal y Ajuste</p>
                                    <div style={{ marginTop: '1rem', color: '#3b82f6', fontSize: '3rem' }}>🔩</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* 🚀 ARDUINO Y PROGRAMACIÓN */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>🚀 Arduino y Programación</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/robot-evita-obstaculos" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Proyecto: Robot Evasor</h3>
                                    <p>Simulación Sensor y Motores</p>
                                    <div style={{ marginTop: '1rem', color: '#00ccff', fontSize: '3rem' }}>🤖</div>
                                </div>
                            </Link>
                            <Link to="/scratch" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Programación Scratch</h3>
                                    <p>Bloques Lógicos</p>
                                    <div style={{ marginTop: '1rem', color: '#ffcc00', fontSize: '3rem' }}>😺</div>
                                </div>
                            </Link>
                            <Link to="/sensores" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Sensores</h3>
                                    <p>Analógicos y Digitales</p>
                                    <div style={{ marginTop: '1rem', color: '#00ccff', fontSize: '3rem' }}>📡</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 🎓 PROYECTOS INTEGRADORES 6° AÑO */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: '#f59e0b', marginBottom: '1rem', paddingLeft: '1rem' }}>🎓 Proyectos Integradores - 6° Año</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/proyectos-integradores" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(245,158,11,0.4)', boxShadow: '0 0 20px rgba(245,158,11,0.15)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Arduino + IoT + Solar</h3>
                                    <p>6 Proyectos Interdisciplinarios con Simuladores</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🌦️</span><span>💧</span><span>🅿️</span><span>🔒</span><span>🌿</span><span>☀️</span>
                                    </div>
                                    <div style={{ marginTop: '0.75rem', padding: '0.3rem 0.9rem', background: 'rgba(245,158,11,0.2)', border: '1px solid #f59e0b', borderRadius: '20px', fontSize: '0.78rem', color: '#f59e0b', fontWeight: '700' }}>
                                        6 Simuladores Interactivos
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 🔲 ELECTRÓNICA DIGITAL */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: '#7c3aed', marginBottom: '1rem', paddingLeft: '1rem' }}>🔲 Electrónica Digital</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {[
                                { to: '/electronica-digital/numeracion', title: 'U1 — Numeración', desc: 'Binario, Octal, Hexadecimal', icon: '🔢', badge: 'Conversor interactivo' },
                                { to: '/electronica-digital/codigos-algebra', title: 'U2 — Códigos y Boole', desc: 'BCD, Gray, De Morgan', icon: '🧮', badge: null },
                                { to: '/electronica-digital/compuertas', title: 'U3 — Compuertas', desc: 'AND, OR, NOT, NAND, NOR, XOR', icon: '⚡', badge: 'Simulador de compuertas' },
                                { to: '/electronica-digital/formas-canonicas', title: 'U4 — Formas Canónicas', desc: 'SOP, POS, Mintérminos', icon: 'Σ', badge: null },
                                { to: '/electronica-digital/karnaugh', title: 'U5 — Karnaugh', desc: 'Mapas de 2, 3 y 4 variables', icon: '🗺️', badge: 'K-Map interactivo' },
                                { to: '/electronica-digital/bloques-funcionales', title: 'U6 — MUX / DEMUX', desc: 'Codificadores y Decodificadores', icon: '🔀', badge: null },
                                { to: '/electronica-digital/bloques-aritmeticos', title: 'U7 — Aritméticos', desc: 'Sumadores, Restadores, Comparadores', icon: '➕', badge: 'Simulador de suma binaria' },
                                { to: '/electronica-digital/secuenciales', title: 'U8 — Secuenciales', desc: 'Latch SR, Flip-Flop D, TTL/CMOS', icon: '🔁', badge: null },
                                { to: '/electronica-digital/proyecto-integrador', title: 'U9 — Proyecto Final', desc: 'Diseño completo + Display 7 seg', icon: '🎯', badge: 'Mesa de diseño' },
                            ].map(item => (
                                <Link key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
                                    <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(124,58,237,0.3)', boxShadow: '0 0 15px rgba(124,58,237,0.1)' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{item.title}</h3>
                                        <p>{item.desc}</p>
                                        {item.badge && (
                                            <div style={{ marginTop: '0.5rem', padding: '0.25rem 0.8rem', background: 'rgba(124,58,237,0.2)', border: '1px solid #7c3aed', borderRadius: '20px', fontSize: '0.75rem', color: '#7c3aed', fontWeight: '700' }}>
                                                {item.badge}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 🖥️ INFORMÁTICA — FUNDAMENTOS DE COMPUTACIÓN */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: '#a55eea', marginBottom: '1rem', paddingLeft: '1rem' }}>🖥️ Fundamentos de Computacion</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/generaciones-computadoras" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(165,94,234,0.4)', boxShadow: '0 0 20px rgba(165,94,234,0.15)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Generaciones</h3>
                                    <p>Historia de la Computacion</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>💡</span><span>🔬</span><span>🔧</span><span>🧠</span><span>⚛️</span>
                                    </div>
                                    <div style={{ marginTop: '0.75rem', padding: '0.3rem 0.9rem', background: 'rgba(165,94,234,0.2)', border: '1px solid #a55eea', borderRadius: '20px', fontSize: '0.78rem', color: '#a55eea', fontWeight: '700' }}>
                                        🎮 Juego Interactivo
                                    </div>
                                </div>
                            </Link>

                            <Link to="/arquitectura-von-neumann" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(0, 242, 255, 0.4)', boxShadow: '0 0 20px rgba(0, 242, 255, 0.15)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Arquitectura</h3>
                                    <p>Von Neumann / Harvard / CPU</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🧠</span><span>🚌</span><span>💾</span><span>🔗</span>
                                    </div>
                                    <div style={{ marginTop: '0.75rem', padding: '0.3rem 0.9rem', background: 'rgba(0, 242, 255, 0.2)', border: '1px solid #00f2ff', borderRadius: '20px', fontSize: '0.78rem', color: '#00f2ff', fontWeight: '700' }}>
                                        ⚙️ Simulador Tecnico
                                    </div>
                                </div>
                            </Link>

                            <Link to="/memoria" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(168,85,247,0.4)', boxShadow: '0 0 20px rgba(168,85,247,0.15)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Memoria</h3>
                                    <p>Jerarquia, RAM, Cache, Virtual</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>💾</span><span>⚡</span><span>📊</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/arranque" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Hardware y Boot</h3>
                                    <p>BIOS, POST, Arranque del PC</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🔌</span><span>⚡</span><span>🖥️</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/sociedad-software" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Sociedad y SW</h3>
                                    <p>Informacion, Software, Licencias</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🌐</span><span>📋</span><span>🔓</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/representacion-datos" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Repr. de Datos</h3>
                                    <p>Binario, ASCII, Conversiones</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🔢</span><span>0️⃣</span><span>1️⃣</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/logica-digital" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Logica Digital</h3>
                                    <p>Compuertas, Algebra de Boole</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🔲</span><span>⚡</span><span>🔀</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/sistema-operativo" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Sistema Operativo</h3>
                                    <p>Kernel, Procesos, Memoria</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🖥️</span><span>⚙️</span><span>📂</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/seguridad-informatica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Seguridad</h3>
                                    <p>Ciberseguridad y Etica</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🔒</span><span>🛡️</span><span>⚖️</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/ar-arquitectura" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(59,130,246,0.4)', boxShadow: '0 0 20px rgba(59,130,246,0.15)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Simuladores 3D</h3>
                                    <p>Arquitectura y Ensamblaje RA</p>
                                    <div style={{ marginTop: '1rem', fontSize: '2.5rem', display: 'flex', gap: '0.3rem' }}>
                                        <span>🧊</span><span>📷</span><span>🔧</span>
                                    </div>
                                    <div style={{ marginTop: '0.75rem', padding: '0.3rem 0.9rem', background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', borderRadius: '20px', fontSize: '0.78rem', color: '#3b82f6', fontWeight: '700' }}>
                                        🧊 3D + Realidad Aumentada
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
        </div>
    );
};

export default Home;


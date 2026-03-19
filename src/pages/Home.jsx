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

            {isAuthenticated && (
                <>
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
                </>
            )}
        </div>
    );
};

export default Home;


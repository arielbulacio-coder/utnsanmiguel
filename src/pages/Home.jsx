import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../carousel.css';
import { useAuth } from '../context/AuthContext';

// Import Assets Removed for External Links
// import imgFacade from '../assets/utn_building_facade.png';
// import imgLab from '../assets/electronics_lab.png';
// import imgCampus from '../assets/new_campus_rendering.png';
// import imgEducation from '../assets/technical_education_workshop.png';
// import imgTools from '../assets/workshop_tools.png';

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
                            src="https://www.inspt.utn.edu.ar/wp-content/uploads/2023/12/fachada-utn-inspt.jpg"
                            alt="EEST UTN San Miguel - Edificio Principal"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>EEST UTN San Miguel</h3>
                            <p>Edificio Principal - Especialidad Electrónica</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://noticias.frba.utn.edu.ar/wp-content/uploads/2016/06/Laboratorio-de-Electronica-1-1024x680.jpg"
                            alt="Instalaciones EEST UTN"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>Laboratorios Especializados</h3>
                            <p>Equipamiento de última generación</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.frba.utn.edu.ar/wp-content/uploads/2019/02/campus-utn-ba.jpg"
                            alt="Nueva Escuela Técnica UTN"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>Crecimiento Institucional</h3>
                            <p>Nueva escuela técnica dependiente de la UTN</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.frba.utn.edu.ar/wp-content/uploads/2018/10/Taller-de-Electronica.jpg"
                            alt="Actividades Educativas"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>Formación Integral</h3>
                            <p>Educación técnica de excelencia</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://pbs.twimg.com/media/Ff15u5fXkAAQz1_.jpg"
                            alt="Laboratorios y Talleres"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>Instalaciones Modernas</h3>
                            <p>Espacios de aprendizaje</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://sanmiguelest.inspt.utn.edu.ar/wp-content/uploads/2025/05/DSC_0167-1-1-300x184.jpg"
                            alt="Comunidad Educativa"
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <h3>Comunidad Educativa</h3>
                            <p>Más de 50 años formando profesionales</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', padding: '3rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPObWUEKrBqrvd1OYTRY_LwudGF6HC7Ok1A&s"
                        alt="Logo EEST UTN"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            margin: '0 auto 1rem auto',
                            objectFit: 'contain',
                            background: '#fff',
                            boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)'
                        }}
                    />
                    <h1>EEST UTN San Miguel</h1>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>Especialidad Electrónica</h2>
                </div>

                <p>
                    Plataforma de soporte didáctico para estudiantes y docentes.
                </p>

                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                    <p>📍 Rafael 50, Bella Vista, Buenos Aires, Argentina</p>
                </div>
            </div>

            {isAuthenticated && (
                <>
                    <h2 style={{ marginBottom: '2rem' }}>Módulos Educativos</h2>

                    {/* Leyes Fundamentales */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>⚡ Leyes Fundamentales</h3>
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

                            <Link to="/teorema-thevenin" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Teorema de Thévenin</h3>
                                    <p>Circuitos Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚙️</div>
                                </div>
                            </Link>

                            <Link to="/teorema-norton" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Teorema de Norton</h3>
                                    <p>Fuentes de Corriente Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>🔌</div>
                                </div>
                            </Link>

                            <Link to="/potencia" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Potencia Eléctrica</h3>
                                    <p>Ley de Watt y Disipación</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚡</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Resistencias */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--secondary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>🔧 Resistencias</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/codigos-resistencias" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Códigos de Color</h3>
                                    <p>Identificación de Valores</p>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '5px' }}>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'red' }}></div>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'purple' }}></div>
                                        <div style={{ width: '20px', height: '10px', backgroundColor: 'yellow' }}></div>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/resistencias-serie-paralelo" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Serie y Paralelo</h3>
                                    <p>Resistencias Equivalentes</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>⚡</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Herramientas */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>📐 Herramientas de Medida</h3>
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
                                    <p>Teorema y Cálculos de Triángulos</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>📐</div>
                                </div>
                            </Link>

                            <Link to="/trigonometria" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Trigonometría</h3>
                                    <p>Funciones Seno, Coseno y Tangente</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '2rem' }}>📐</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Física */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--secondary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>🚀 Ciencias Físicas</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <Link to="/cinematica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Cinemática</h3>
                                    <p>Movimiento MRU y MRUV</p>
                                    <div style={{ marginTop: '1rem', color: 'var(--secondary-color)', fontSize: '2rem' }}>🏎️</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Taller */}
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--primary-color)', marginBottom: '1rem', paddingLeft: '1rem' }}>⚒️ Taller y Herramientas</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
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

                            <Link to="/seguridad-epp" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Seguridad</h3>
                                    <p>Elementos de Protección (EPP)</p>
                                    <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '3rem' }}>🛡️</div>
                                </div>
                            </Link>

                            <Link to="/herramientas-carpinteria" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Carpintería</h3>
                                    <p>Manuales de Madera</p>
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

                            <Link to="/herramientas-electricidad" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Electricidad</h3>
                                    <p>Instalaciones Eléctricas</p>
                                    <div style={{ marginTop: '1rem', color: '#eab308', fontSize: '3rem' }}>⚡</div>
                                </div>
                            </Link>

                            <Link to="/herramientas-electronica" style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Electrónica</h3>
                                    <p>Laboratorio y Circuitos</p>
                                    <img src={imgSoldering} alt="Electrónica" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }} />
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
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

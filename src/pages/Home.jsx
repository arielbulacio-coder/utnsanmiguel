import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="app-container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
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
        </div>
    );
};

export default Home;

import React from 'react';
import './DrawingStyles.css';

const ProjectionsPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Método Monge y Proyecciones</h1>
                <p>El lenguaje universal de los planos industriales: vistas ortogonales.</p>
            </header>

            <div className="projections-intro">
                <section className="drawing-card">
                    <h2>Proyecciones Ortogonales</h2>
                    <p>
                        Consiste en proyectar un objeto sobre planos perpendiculares entre sí, logrando una representación de sus dimensiones reales en cada vista.
                    </p>
                    <div className="iso-systems-grid">
                        <div className="system-card">
                            <h3>ISO E (Método Europeo)</h3>
                            <p>Utilizado en Argentina (IRAM). El objeto está entre el observador y el plano. El símbolo es el tronco de cono con el círculo a la derecha.</p>
                            <svg viewBox="0 0 100 60" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                                <circle cx="75" cy="30" r="15" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <circle cx="75" cy="30" r="8" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="20" x2="10" y2="40" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="40" y1="15" x2="40" y2="45" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="20" x2="40" y2="15" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="40" x2="40" y2="45" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="5" y1="30" x2="95" y2="30" stroke="var(--text-dim)" strokeDasharray="5,2" />
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Las Tres Vistas Principales</h2>
                    <ol>
                        <li><strong>Vista Anterior (Alzado):</strong> Es la vista de frente. Se elige la más representativa.</li>
                        <li><strong>Vista Superior (Planta):</strong> Ubicada debajo del alzado (Europeo).</li>
                        <li><strong>Vista Lateral Izquierda:</strong> Ubicada a la derecha del alzado (Europeo).</li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default ProjectionsPage;

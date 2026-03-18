import React from 'react';
import './DrawingStyles.css';

const ProjectionsPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Proyecciones Ortogonales (Método Monge)</h1>
                <p>Cómo "desarmar" un objeto 3D para comunicarlo en un plano 2D.</p>
            </header>

            <div className="drawing-grid">
                {/* LA CAJA DE CRISTAL */}
                <section className="drawing-card full-width visual-demo">
                    <div className="demo-content">
                        <div className="demo-canvas">
                            <svg viewBox="0 0 100 100" width="300" className="glass-box-svg">
                                <rect x="20" y="20" width="60" height="60" fill="rgba(0, 242, 255, 0.05)" stroke="var(--primary-color)" strokeWidth="0.3" strokeDasharray="1,1" />
                                <rect x="30" y="30" width="40" height="40" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <text x="35" y="55" fill="#fff" fontSize="4" fontWeight="bold">FRENTE</text>
                            </svg>
                        </div>
                        <div className="demo-text">
                            <h2>La "Caja de Cristal"</h2>
                            <p className="highlight-text">Imagina el objeto dentro de una caja de vidrio transparente.</p>
                            <p>Proyectar es mirar cada cara del objeto DESDE el infinito y dibujar su silueta sobre la pared de la caja.</p>
                        </div>
                    </div>
                </section>

                <section className="drawing-card full-width">
                    <h2>Disposición de las 3 Vistas (ISO E)</h2>
                    <div className="vistas-graph">
                        <div className="vistas-main-grid">
                            <div className="vista-graph-item center">ALZADO (FRENTE)</div>
                            <div className="vista-graph-item bottom">PLANTA (SUPERIOR)</div>
                            <div className="vista-graph-item right">LATERAL DERECHA</div>
                        </div>
                        <div className="vistas-explanation">
                            <p><strong>REGLA DE ORO:</strong> Las vistas deben estar ALINEADAS entre sí. No puedes dibujarlas en cualquier lugar de la hoja.</p>
                            <ul>
                                <li><strong>Ancho:</strong> Frente = Planta.</li>
                                <li><strong>Altura:</strong> Frente = Lateral.</li>
                                <li><strong>Profundidad:</strong> Planta = Ancho Lateral.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .vistas-graph { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
                .vistas-main-grid { display: grid; grid-template-areas: "centro der" "planta ."; gap: 10px; }
                .vista-graph-item { padding: 1.5rem; border: 2px solid var(--primary-color); background: rgba(0, 242, 255, 0.05); border-radius: 8px; font-weight: bold; text-align: center; }
                .vista-graph-item.center { grid-area: centro; border-color: #fff; }
                .vista-graph-item.bottom { grid-area: planta; }
                .vista-graph-item.right { grid-area: der; }
                @media (max-width: 800px) { .vistas-graph { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default ProjectionsPage;

import React from 'react';
import './DrawingStyles.css';

const AxonometricPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Axonometría: El Arte de la Perspectiva</h1>
                <p>Visualización 3D aplicada a la comunicación técnica.</p>
            </header>

            <div className="drawing-grid">
                {/* ISOMETRICA VISUAL */}
                <section className="drawing-card full-width visual-demo">
                    <div className="demo-content">
                        <div className="demo-text">
                            <h2>Perspectiva Isométrica (30° - 30°)</h2>
                            <p className="highlight-text">Es la reina de las representaciones técnicas por su equilibrio visual.</p>
                            <ul className="visual-features">
                                <li><strong>Ejes X y Y:</strong> Inclinados a 30° respecto a la horizontal.</li>
                                <li><strong>Medidas:</strong> Son reales en las tres direcciones (No hay reducción).</li>
                                <li><strong>Uso:</strong> Ideal para piezas mecánicas de detalle constante.</li>
                            </ul>
                        </div>
                        <div className="demo-canvas iso-bg">
                            <svg viewBox="0 0 100 80" width="300" className="floating-iso">
                                <path d="M50 10 L80 27 L80 57 L50 40 L20 57 L20 27 Z" fill="rgba(0,242,255,0.1)" stroke="var(--primary-color)" strokeWidth="1.5" />
                                <path d="M50 10 L50 40 L80 27 M50 40 L20 27" fill="none" stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="1,1" />
                                <line x1="50" y1="40" x2="50" y2="75" stroke="#fff" strokeWidth="0.5" strokeDasharray="3,2" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* CABALLERA VISUAL */}
                <section className="drawing-card full-width visual-demo secondary">
                    <div className="demo-content reverse">
                        <div className="demo-text">
                            <h2>Perspectiva Caballera (0° - 45°)</h2>
                            <p className="highlight-text">Técnica rápida para destacar la cara frontal de un objeto.</p>
                        </div>
                        <div className="demo-canvas">
                            <svg viewBox="0 0 100 80" width="300">
                                <rect x="20" y="30" width="40" height="40" fill="rgba(255,0,242,0.1)" stroke="var(--secondary-color)" strokeWidth="1.5" />
                                <path d="M60 30 L80 10 L80 50 L60 70 M60 30 L80 10 L40 10 L20 30" fill="none" stroke="var(--secondary-color)" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .visual-demo { background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(20,20,20,0.5) 100%); min-height: 400px; display: flex; align-items: center; }
                .demo-content { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; width: 100%; align-items: center; padding: 0 2rem; }
                .demo-content.reverse { grid-template-columns: 1fr 1fr; direction: rtl; }
                .demo-content.reverse .demo-text { direction: ltr; }
                .floating-iso { animation: floating 3s ease-in-out infinite; }
                @keyframes floating {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @media (max-width: 900px) { .demo-content { grid-template-columns: 1fr; text-align: center; } .demo-content.reverse { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default AxonometricPage;

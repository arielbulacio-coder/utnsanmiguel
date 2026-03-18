import React, { useState } from 'react';
import './DrawingStyles.css';

const GeometricalConstructionsPage = () => {
    const [step, setStep] = useState(0);
    const [type, setType] = useState('hexagon');

    const constructions = {
        hexagon: {
            title: "Hexágono Regular (Dada la circunferencia)",
            description: "Es la construcción más básica y esencial. Se basa en que el lado del hexágono es igual al radio de la circunferencia que lo inscribe.",
            steps: [
                {
                    text: "Trazar los ejes de simetría horizontal y vertical (Tipo F). Dibujar la circunferencia base con radio R.",
                    viz: (s) => (
                        <>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#666" strokeDasharray="5,2,1,2" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#666" strokeDasharray="5,2,1,2" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" />
                            <text x="92" y="52" fill="var(--text-dim)" fontSize="4">A</text>
                            <text x="5" y="52" fill="var(--text-dim)" fontSize="4">B</text>
                        </>
                    )
                },
                {
                    text: "Hacer centro en el punto A (intersección derecha) y con el mismo radio R, trazar un arco que corte la circunferencia arriba y abajo.",
                    viz: (s) => (
                        <>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" />
                            <circle cx="90" cy="50" r="1" fill="#fff" />
                            <path d="M70 15.4 A 40 40 0 0 0 70 84.6" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                            <circle cx="70" cy="15.4" r="1.5" fill="var(--primary-color)" />
                            <circle cx="70" cy="84.6" r="1.5" fill="var(--primary-color)" />
                        </>
                    )
                },
                {
                    text: "Repetir el proceso haciendo centro en el punto B (izquierda). Obtendremos los otros dos vértices restantes.",
                    viz: (s) => (
                        <>
                            <circle cx="10" cy="50" r="1" fill="#fff" />
                            <path d="M30 15.4 A 40 40 0 0 1 30 84.6" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                            <circle cx="30" cy="15.4" r="1.5" fill="var(--primary-color)" />
                            <circle cx="30" cy="84.6" r="1.5" fill="var(--primary-color)" />
                        </>
                    )
                },
                {
                    text: "Unir los 6 vértices obtenidos con trazo tipo A (grueso) para finalizar el hexágono.",
                    viz: (s) => (
                        <polygon points="90,50 70,15.4 30,15.4 10,50 30,84.6 70,84.6" fill="rgba(0,242,255,0.1)" stroke="var(--primary-color)" strokeWidth="1.5" />
                    )
                }
            ]
        },
        oval: {
            title: "Óvalo de 4 Centros (Isométrico)",
            description: "Técnica fundamental de 2do año para representar círculos en perspectiva isométrica usando solo compás.",
            steps: [
                {
                    text: "Dibujar el rombo isométrico (ejes a 30°) que contendrá al círculo.",
                    viz: (s) => (
                        <>
                            <path d="M50 10 L84.6 30 L50 50 L15.4 30 Z" fill="none" stroke="#666" strokeDasharray="2,2" />
                            <text x="48" y="8" fill="#fff" fontSize="4">M</text>
                            <text x="48" y="55" fill="#fff" fontSize="4">N</text>
                        </>
                    )
                },
                {
                    text: "Trazar las medianas desde los vértices de ángulo obtuso (M y N) hacia los puntos medios de los lados opuestos.",
                    viz: (s) => (
                        <>
                            <path d="M50 10 L50 50 M15.4 30 L84.6 30" fill="none" stroke="#444" strokeDasharray="1,1" />
                            <line x1="50" y1="10" x2="32.7" y2="40" stroke="var(--secondary-color)" strokeWidth="0.5" />
                            <line x1="50" y1="10" x2="67.3" y2="40" stroke="var(--secondary-color)" strokeWidth="0.5" />
                        </>
                    )
                },
                {
                    text: "Hallar los 4 centros: Los dos vértices obtusos y las dos intersecciones de las medianas trazadas.",
                    viz: (s) => (
                        <>
                            <circle cx="50" cy="10" r="1.5" fill="red" />
                            <circle cx="50" cy="50" r="1.5" fill="red" />
                            <circle cx="38.5" cy="30" r="1.5" fill="red" />
                            <circle cx="61.5" cy="30" r="1.5" fill="red" />
                        </>
                    )
                },
                {
                    text: "Trazar los 4 arcos de enlace para cerrar el óvalo. ¡La precisión depende de que los arcos se toquen exactamente!",
                    viz: (s) => (
                        <path d="M32.7 40 A 34 34 0 0 1 67.3 40 M 32.7 20 A 34 34 0 0 0 67.3 20" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
                    )
                }
            ]
        }
    };

    const currentConst = constructions[type];
    const maxSteps = currentConst.steps.length;

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Guía Gráfica de Construcciones</h1>
                <p>Simulador interactivo con demostración visual paso a paso.</p>
            </header>

            <div className="drawing-grid">
                <section className="drawing-card full-width">
                    <div className="construction-selector">
                        <button className={`sel-btn ${type === 'hexagon' ? 'active' : ''}`} onClick={() => { setType('hexagon'); setStep(0); }}>Hexágono Regular</button>
                        <button className={`sel-btn ${type === 'oval' ? 'active' : ''}`} onClick={() => { setType('oval'); setStep(0); }}>Óvalo (Isométrico)</button>
                    </div>

                    <div className="interactive-module">
                        <div className="module-info">
                            <span className="step-indicator">PASO {step + 1} DE {maxSteps}</span>
                            <h2>{currentConst.title}</h2>
                            <p className="const-desc">{currentConst.description}</p>

                            <div className="instruction-box">
                                <p>{currentConst.steps[step].text}</p>
                            </div>

                            <div className="module-controls">
                                <button className="ctrl-btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Anterior</button>
                                <button className="ctrl-btn main" onClick={() => setStep(Math.min(maxSteps - 1, step + 1))} disabled={step === maxSteps - 1}>Siguiente Paso</button>
                                <button className="ctrl-btn reset" onClick={() => setStep(0)}>Reiniciar</button>
                            </div>
                        </div>

                        <div className="module-canvas">
                            <div className="canvas-wrapper">
                                <svg viewBox="0 0 100 100" className="construction-svg">
                                    {/* Mostrar pasos acumulados */}
                                    {currentConst.steps.slice(0, step + 1).map((s, idx) => (
                                        <g key={idx}>
                                            {s.viz(idx)}
                                        </g>
                                    ))}
                                </svg>

                                <div className="canvas-overlay">
                                    <div className="tool-hint">
                                        <i className="tool-icon">📏</i>
                                        <span>Utiliza escuadra de 30° / 60°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .construction-selector { display: flex; gap: 1rem; margin-bottom: 2rem; }
                .interactive-module { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: rgba(0,0,0,0.4); padding: 3rem; border-radius: 20px; border: 1px solid var(--glass-border); }
                .step-indicator { font-family: monospace; color: var(--secondary-color); font-weight: bold; margin-bottom: 0.5rem; }
                .instruction-box { background: rgba(0,242,255,0.05); padding: 1.5rem; border-left: 4px solid var(--primary-color); border-radius: 0 12px 12px 0; margin: 2rem 0; font-size: 1.1rem; line-height: 1.6; }
                .module-controls { display: flex; gap: 1rem; }
                .ctrl-btn { padding: 12px 24px; border-radius: 10px; border: 1px solid var(--glass-border); background: var(--glass-bg); color: #fff; cursor: pointer; transition: all 0.3s; }
                .ctrl-btn.main { background: var(--primary-color); color: #000; font-weight: bold; }
                .canvas-wrapper { position: relative; background: #fff; padding: 1rem; border-radius: 10px; }
                .construction-svg { width: 100%; height: auto; }
                @media (max-width: 900px) { .interactive-module { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default GeometricalConstructionsPage;

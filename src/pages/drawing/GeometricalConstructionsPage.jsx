import React, { useState } from 'react';
import './DrawingStyles.css';

const GeometricalConstructionsPage = () => {
    const [step, setStep] = useState(0);
    const [type, setType] = useState('hexagon');

    const instructions = {
        hexagon: [
            "Trazar ejes y circunferencia base con radio R.",
            "Apoyar en el extremo A (derecha) con el mismo radio R y marcar arriba y abajo.",
            "Apoyar en el extremo B (izquierda) con el mismo radio R y marcar arriba y abajo.",
            "Unir los puntos y los extremos A-B para cerrar el hexágono."
        ],
        pentagon: [
            "Trazar circunferencia y dividir el radio horizontal OA en su punto medio M.",
            "Con centro en M y radio MC (C=extremo superior), trazar arco hasta el diámetro horizontal (punto N).",
            "La distancia CN es la medida exacta del lado del pentágono.",
            "Trasladar esa medida CN por toda la circunferencia para obtener los 5 vértices."
        ],
        tangency: [
            "Trazar dos circunferencias de radios R1 y R2 separadas una distancia D.",
            "Desde los centros, sumar los radios (R1+R2) y trazar arcos para hallar el punto de enlace.",
            "Unir centros con el punto de enlace para hallar los puntos de tangencia exactos.",
            "Trazar el arco de unión con radio R3 indicado."
        ]
    };

    const currentSteps = instructions[type];
    const nextStep = () => setStep((prev) => (prev < currentSteps.length - 1 ? prev + 1 : prev));
    const resetSteps = (newType) => {
        setType(newType);
        setStep(0);
    };

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Construcciones Geométricas</h1>
                <p>Nivel I (Polígonos) y Nivel II (Tangencias y Enlaces)</p>
            </header>

            <div className="drawing-grid">
                <section className="drawing-card full-width">
                    <div className="sim-selector">
                        <button className={`sel-btn ${type === 'hexagon' ? 'active' : ''}`} onClick={() => resetSteps('hexagon')}>Hexágono (1° Año)</button>
                        <button className={`sel-btn ${type === 'pentagon' ? 'active' : ''}`} onClick={() => resetSteps('pentagon')}>Pentágono (1° Año)</button>
                        <button className={`sel-btn ${type === 'tangency' ? 'active' : ''}`} onClick={() => resetSteps('tangency')}>Tangencias (2° Año)</button>
                    </div>

                    <div className="step-by-step-module">
                        <div className="step-text">
                            <div className="level-badge">{type === 'tangency' ? '2do AÑO - AVANZADO' : '1er AÑO - BÁSICO'}</div>
                            <h3>Paso {step + 1}:</h3>
                            <p>{currentSteps[step]}</p>
                            <div className="step-controls">
                                <button className="step-btn" onClick={() => setStep(0)}>Reiniciar</button>
                                <button className="step-btn next" onClick={nextStep}>Siguiente</button>
                            </div>
                        </div>
                        <div className="step-viz">
                            <svg viewBox="0 0 100 100" width="300" className="gc-svg">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="2,2" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="#444" strokeDasharray="5,2" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#444" strokeDasharray="5,2" />

                                {type === 'hexagon' && (
                                    <>
                                        {step >= 1 && <path d="M90 50 A 40 40 0 0 0 70 15.4 M 90 50 A 40 40 0 0 1 70 84.6" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" />}
                                        {step >= 2 && <path d="M10 50 A 40 40 0 0 0 30 15.4 M 10 50 A 40 40 0 0 1 30 84.6" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" />}
                                        {step >= 3 && <polygon points="90,50 70,15.4 30,15.4 10,50 30,84.6 70,84.6" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />}
                                    </>
                                )}

                                {type === 'pentagon' && (
                                    <>
                                        {step >= 1 && <circle cx="70" cy="50" r="2" fill="var(--secondary-color)" />}
                                        {step >= 2 && <line x1="50" y1="10" x2="30" y2="50" stroke="var(--secondary-color)" strokeWidth="0.5" strokeDasharray="2,1" />}
                                        {step >= 3 && <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0, 242, 255, 0.2)" />}
                                        {step >= 3 && <polygon points="50,10 11.2,38.2 26,83.8 74,83.8 88.8,38.2" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />}
                                    </>
                                )}

                                {type === 'tangency' && (
                                    <>
                                        <circle cx="30" cy="50" r="15" fill="none" stroke="#666" />
                                        <circle cx="75" cy="50" r="10" fill="none" stroke="#666" />
                                        {step >= 1 && <path d="M40 20 A 40 40 0 0 1 65 20" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />}
                                        {step >= 2 && <line x1="30" y1="50" x2="52.5" y2="20" stroke="var(--text-dim)" strokeWidth="0.5" strokeDasharray="1,1" />}
                                        {step >= 2 && <line x1="75" y1="50" x2="52.5" y2="20" stroke="var(--text-dim)" strokeWidth="0.5" strokeDasharray="1,1" />}
                                    </>
                                )}
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Trabajos Prácticos - Ciclo Básico</h2>
                    <ul className="exercise-list">
                        <li><strong>TP #4:</strong> Triángulo, Cuadrado y Hexágono inscritos en circunferencias de 80mm de diámetro.</li>
                        <li><strong>TP #5:</strong> Pentágono y Octógono regular. Uso del compás con precisión (error max: 0.5mm).</li>
                        <li><strong>TP #6:</strong> Estrellas geométricas: Trazado de diagonales interiores en polígonos.</li>
                    </ul>
                </section>

                <section className="drawing-card">
                    <h2>Trabajos Prácticos - Ciclo Superior</h2>
                    <ul className="exercise-list">
                        <li><strong>TP #7:</strong> Enlaces de líneas rectas con arcos de círculo (Tangencias simples).</li>
                        <li><strong>TP #8:</strong> Construcción de un Gancho Escocia (Aplicación de múltiples tangencias).</li>
                        <li><strong>TP #9:</strong> Espirales y Óvalos: El método de centros múltiples para curvas complejas.</li>
                    </ul>
                </section>
            </div>

            <style>{`
                .sim-selector { display: flex; gap: 10px; margin-bottom: 2rem; justify-content: center; }
                .sel-btn { padding: 10px 20px; border-radius: 30px; border: 1px solid var(--primary-color); background: transparent; color: var(--text-main); cursor: pointer; transition: all 0.3s; }
                .sel-btn.active { background: var(--primary-color); color: #000; font-weight: bold; }
                .gc-svg { filter: drop-shadow(0 0 10px rgba(0,242,255,0.2)); }
                .exercise-list li { margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid var(--primary-color); list-style: none; }
            `}</style>
        </div>
    );
};

export default GeometricalConstructionsPage;

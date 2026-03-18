import React, { useState, useEffect } from 'react';
import './ElectricityBasicsStyles.css';

const ElectricityBasicsPage = () => {
    const [voltage, setVoltage] = useState(0);
    const [material, setMaterial] = useState('conductor'); // conductor, insulator, semiconductor
    const [quizAnswers, setQuizAnswers] = useState({});

    const handleQuizChange = (qId, option) => {
        setQuizAnswers({ ...quizAnswers, [qId]: option });
    };

    const isCurrentFlowing = voltage > 0 && material === 'conductor';
    const isSemiFlowing = voltage > 2 && material === 'semiconductor';

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>Fundamentos de Electricidad</h1>
                <p>Desde la estructura del átomo hasta la corriente eléctrica.</p>
            </header>

            <div className="electricity-grid">
                {/* 1. EL ÁTOMO */}
                <section className="elec-card atom-section full-width">
                    <h2>1. El Origen: El Átomo</h2>
                    <div className="explain-split">
                        <div className="text-content">
                            <p>Toda la materia está compuesta por átomos. El átomo es como un sistema solar en miniatura:</p>
                            <ul>
                                <li><strong style={{ color: '#ff4444' }}>Protones (+):</strong> Partículas con carga positiva. Están fijos en el núcleo.</li>
                                <li><strong style={{ color: '#aaa' }}>Neutrones (0):</strong> Partículas sin carga, también en el núcleo.</li>
                                <li><strong style={{ color: '#00ccff' }}>Electrones (-):</strong> Partículas con carga negativa. Orbitan alrededor del núcleo. ¡Son los que pueden moverse!</li>
                            </ul>
                            <p className="highlight">La electricidad no es más que el **flujo de electrones** saltando de un átomo a otro.</p>
                        </div>
                        <div className="visual-content">
                            <div className="atom-visual">
                                {/* Nucleus */}
                                <div className="nucleus">
                                    <div className="proton" style={{ top: '-5px', left: '-5px' }}></div>
                                    <div className="neutron" style={{ top: '5px', left: '5px' }}></div>
                                    <div className="proton" style={{ top: '5px', left: '-5px' }}></div>
                                </div>
                                {/* Orbits */}
                                <div className="orbit orbit-1">
                                    <div className="electron e1"></div>
                                </div>
                                <div className="orbit orbit-2">
                                    <div className="electron e2"></div>
                                    <div className="electron e3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. MATERIALES */}
                <section className="elec-card materials-section">
                    <h2>2. Tipos de Materiales</h2>
                    <p>Según cómo de "sujetos" tengan a sus electrones en la última órbita (capa de valencia):</p>

                    <div className="material-selector">
                        <button className={`mat-btn ${material === 'conductor' ? 'active' : ''}`} onClick={() => setMaterial('conductor')}>Conductor</button>
                        <button className={`mat-btn ${material === 'insulator' ? 'active' : ''}`} onClick={() => setMaterial('insulator')}>Aislante</button>
                        <button className={`mat-btn ${material === 'semiconductor' ? 'active' : ''}`} onClick={() => setMaterial('semiconductor')}>Semiconductor</button>
                    </div>

                    <div className="material-info">
                        {material === 'conductor' && (
                            <div>
                                <h3 style={{ color: '#4caf50' }}>Conductores (Ej: Cobre, Oro, Agua Salada)</h3>
                                <p>Tienen electrones "libres" que se sueltan fácilmente. Permiten que la corriente eléctrica fluya sin apenas resistencia.</p>
                                <div className="mat-visual conductor-bg">
                                    <div className="free-electron">e-</div>
                                    <div className="free-electron">e-</div>
                                    <div className="free-electron">e-</div>
                                </div>
                            </div>
                        )}
                        {material === 'insulator' && (
                            <div>
                                <h3 style={{ color: '#f44336' }}>Aislantes (Ej: Plástico, Goma, Madera)</h3>
                                <p>Tienen sus electrones fuertemente agarrados al núcleo. No dejan pasar la corriente bajo condiciones normales.</p>
                                <div className="mat-visual insulator-bg">
                                    <div className="locked-electron">🔒 e-</div>
                                    <div className="locked-electron">🔒 e-</div>
                                </div>
                            </div>
                        )}
                        {material === 'semiconductor' && (
                            <div>
                                <h3 style={{ color: '#ff9800' }}>Semiconductores (Ej: Silicio, Germanio)</h3>
                                <p>No son ni buenos conductores ni buenos aislantes. Con un pequeño estímulo (voltaje, luz, calor) dejan pasar la corriente de forma controlada. (Base de la electrónica moderna).</p>
                                <div className="mat-visual semi-bg">
                                    <div className="semi-electron">e- ↕️</div>
                                    <div className="semi-electron">e- ↕️</div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. FLUJO DE CORRIENTE */}
                <section className="elec-card flow-section">
                    <h2>3. Circulación de Corriente</h2>
                    <p>Para que los electrones se muevan en un conductor, necesitamos una "presión" o fuerza que los empuje. A esto le llamamos <strong>Voltaje (V)</strong> o Diferencia de Potencial.</p>

                    <div className="voltage-controller">
                        <label>Voltaje aplicado: {voltage}V</label>
                        <input
                            type="range"
                            min="0" max="10"
                            value={voltage}
                            onChange={(e) => setVoltage(Number(e.target.value))}
                        />
                    </div>

                    <div className="wire-simulator">
                        <div className="battery">
                            <div className="terminal pos">+</div>
                            <div className="terminal neg">-</div>
                        </div>
                        <div className={`wire-tube ${material}`}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={` flowing-electron 
                                        ${isCurrentFlowing ? 'fast-flow' : ''} 
                                        ${isSemiFlowing ? 'slow-flow' : ''}
                                    `}
                                    style={{
                                        animationDuration: `${Math.max(0.5, 3 - (voltage * 0.2))}s`,
                                        opacity: (isCurrentFlowing || isSemiFlowing) ? 1 : 0.3,
                                        left: `${i * 10}%`
                                    }}
                                >e-</div>
                            ))}
                        </div>
                    </div>
                    <p className="status-text">
                        {voltage === 0 ? "Sin voltaje, los electrones se mueven al azar pero no hay corriente." :
                            material === 'insulator' ? "El voltaje empuja, pero el aislante bloquea los electrones. Corriente = 0." :
                                (material === 'semiconductor' && voltage <= 2) ? "Voltaje insuficiente para excitar el semiconductor." :
                                    "¡Hay corriente! Los electrones fluyen del negativo al positivo."}
                    </p>
                </section>

                {/* 4. ACTIVIDADES */}
                <section className="elec-card activities-section full-width">
                    <h2>4. Pon a prueba tu conocimiento</h2>
                    <div className="quiz-container">
                        <div className="quiz-question">
                            <h4>1. ¿Qué partícula atómica es la responsable de la corriente eléctrica porque puede moverse libremente?</h4>
                            <div className="options">
                                <label><input type="radio" name="q1" onChange={() => handleQuizChange('q1', 'proton')} /> Protón</label>
                                <label><input type="radio" name="q1" onChange={() => handleQuizChange('q1', 'electron')} /> Electrón</label>
                                <label><input type="radio" name="q1" onChange={() => handleQuizChange('q1', 'neutron')} /> Neutrón</label>
                            </div>
                            {quizAnswers['q1'] && (
                                <p className={quizAnswers['q1'] === 'electron' ? 'correct' : 'incorrect'}>
                                    {quizAnswers['q1'] === 'electron' ? '¡Correcto! Los electrones orbitan el núcleo y pueden soltarse.' : 'Incorrecto, están fijos en el núcleo.'}
                                </p>
                            )}
                        </div>

                        <div className="quiz-question">
                            <h4>2. Los cables de nuestra casa usan Cobre por dentro y Plástico por fuera. ¿Qué función cumple cada uno?</h4>
                            <div className="options">
                                <label><input type="radio" name="q2" onChange={() => handleQuizChange('q2', 'op1')} /> Cobre: Aislante / Plástico: Conductor</label>
                                <label><input type="radio" name="q2" onChange={() => handleQuizChange('q2', 'op2')} /> Cobre: Semiconductor / Plástico: Aislante</label>
                                <label><input type="radio" name="q2" onChange={() => handleQuizChange('q2', 'op3')} /> Cobre: Conductor / Plástico: Aislante</label>
                            </div>
                            {quizAnswers['q2'] && (
                                <p className={quizAnswers['q2'] === 'op3' ? 'correct' : 'incorrect'}>
                                    {quizAnswers['q2'] === 'op3' ? '¡Correcto! El cobre deja fluir la energía, el plástico nos protege de tocarla.' : 'Revisa las definiciones de conductor y aislante.'}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ElectricityBasicsPage;

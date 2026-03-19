import React, { useState } from 'react';
import './ElectricityBasicsStyles.css'; // Reusing styles for ease

const ElectronicComponentsPage = () => {
    const [activeComponent, setActiveComponent] = useState('diodo');
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);
    const [voltage, setVoltage] = useState(5);

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>Componentes Electrónicos y Compuertas Lógicas</h1>
                <p>Simulación interactiva de los componentes básicos de la electrónica y fundamentos digitales.</p>
            </header>

            <div className="electricity-grid">
                <section className="elec-card materials-section full-width">
                    <h2>Selecciona un Componente</h2>
                    <div className="material-selector" style={{ flexWrap: 'wrap' }}>
                        <button className={`mat-btn ${activeComponent === 'diodo' ? 'active' : ''}`} onClick={() => setActiveComponent('diodo')}>Diodo</button>
                        <button className={`mat-btn ${activeComponent === 'transistor' ? 'active' : ''}`} onClick={() => setActiveComponent('transistor')}>Transistor (BJT)</button>
                        <button className={`mat-btn ${activeComponent === 'capacitor' ? 'active' : ''}`} onClick={() => setActiveComponent('capacitor')}>Capacitor</button>
                        <button className={`mat-btn ${activeComponent === 'ic' ? 'active' : ''}`} onClick={() => setActiveComponent('ic')}>Circuito Integrado (555)</button>
                        <button className={`mat-btn ${activeComponent === 'logic' ? 'active' : ''}`} onClick={() => setActiveComponent('logic')}>Compuertas Lógicas</button>
                    </div>
                </section>

                {/* DIODO */}
                {activeComponent === 'diodo' && (
                    <section className="elec-card flow-section full-width">
                        <h2>El Diodo Semiconductor</h2>
                        <p>El diodo actúa como una "válvula antirretorno" para la electricidad. Solo permite que la corriente fluya en una dirección (del ánodo al cátodo).</p>

                        <div className="voltage-controller">
                            <label>Voltaje (Positivo = Polarización Directa, Negativo = Inversa): {voltage > 5 ? voltage - 5 : voltage - 5}V</label>
                            <input type="range" min="0" max="10" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
                        </div>

                        <div className="wire-simulator" style={{ height: '150px', background: '#222', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', width: '100%', height: '4px', background: voltage >= 5 ? '#ffeb3b' : '#555', transition: '0.3s' }}></div>

                            <div style={{ zIndex: 2, background: '#111', padding: '10px 20px', borderRadius: '8px', border: '2px solid #555', color: '#fff', fontSize: '2rem' }}>
                                A ⏭️| K
                            </div>

                            {voltage > 5 && (
                                <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <div key={i} className="flowing-electron fast-flow" style={{ left: `${i * 10}%`, animationDuration: '0.5s' }}>e-</div>
                                    ))}
                                </div>
                            )}
                            {voltage < 5 && (
                                <div style={{ position: 'absolute', color: '#f44336', top: '20px', fontWeight: 'bold' }}>BLOQUEADO (Polarización Inversa)</div>
                            )}
                        </div>
                    </section>
                )}

                {/* TRANSISTOR */}
                {activeComponent === 'transistor' && (
                    <section className="elec-card flow-section full-width">
                        <h2>Transistor Bipolar (NPN)</h2>
                        <p>Funciona como un interruptor controlado por corriente o como amplificador. Una pequeña corriente en la Base (B) deja pasar una gran corriente entre Colector (C) y Emisor (E).</p>
                        <div className="voltage-controller">
                            <button className="mat-btn" style={{ background: inputA ? '#4caf50' : '#444' }} onClick={() => setInputA(!inputA)}>
                                Corriente en BASE: {inputA ? 'APLICADA' : 'CERO'}
                            </button>
                        </div>

                        <div style={{ textAlign: 'center', padding: '2rem', background: '#222', borderRadius: '10px', marginTop: '1rem', color: inputA ? '#ffeb3b' : '#666' }}>
                            <div style={{ fontSize: '4rem' }}>{inputA ? '💡 MOTOR/FOCO ENCENDIDO' : '⚫ MOTOR/FOCO APAGADO'}</div>
                            <p style={{ color: '#aaa', marginTop: '1rem' }}>
                                {inputA ? 'La base está excitada, el canal C-E está abierto permitiendo el flujo principal.' : 'Sin corriente en la base, el transistor actúa como un circuito abierto (corte).'}
                            </p>
                        </div>
                    </section>
                )}

                {/* CAPACITOR */}
                {activeComponent === 'capacitor' && (
                    <section className="elec-card flow-section full-width">
                        <h2>El Capacitor (Condensador)</h2>
                        <p>Almacena energía en un campo eléctrico (como un tanque de agua temporal). Filtra señales y estabiliza voltajes.</p>
                        <div className="voltage-controller">
                            <button className="mat-btn" onMouseDown={() => setInputA(true)} onMouseUp={() => setInputA(false)} onMouseLeave={() => setInputA(false)}>
                                MANTENER PARA CARGAR
                            </button>
                        </div>

                        <div style={{ height: '100px', background: '#333', borderRadius: '10px', marginTop: '1rem', overflow: 'hidden', position: 'relative' }}>
                            <div style={{
                                height: '100%',
                                background: '#2196f3',
                                width: inputA ? '100%' : '0%',
                                transition: inputA ? 'width 2s linear' : 'width 3s ease-out'
                            }}></div>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontWeight: 'bold' }}>
                                {inputA ? 'CARGANDO...' : 'DESCARGANDO...'}
                            </div>
                        </div>
                    </section>
                )}

                {/* COMPUERTAS LOGICAS */}
                {activeComponent === 'logic' && (
                    <section className="elec-card activities-section full-width">
                        <h2>Compuertas Lógicas Básicas (Digital)</h2>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <button className="mat-btn" style={{ background: inputA ? '#4caf50' : '#444' }} onClick={() => setInputA(!inputA)}>A = {inputA ? '1' : '0'}</button>
                            <button className="mat-btn" style={{ background: inputB ? '#4caf50' : '#444' }} onClick={() => setInputB(!inputB)}>B = {inputB ? '1' : '0'}</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <h3>AND</h3>
                                <div style={{ fontSize: '3rem', color: (inputA && inputB) ? '#ffeb3b' : '#555' }}>💡</div>
                                <p>Salida = {inputA && inputB ? '1' : '0'}</p>
                                <small>Ambos 1</small>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <h3>OR</h3>
                                <div style={{ fontSize: '3rem', color: (inputA || inputB) ? '#ffeb3b' : '#555' }}>💡</div>
                                <p>Salida = {inputA || inputB ? '1' : '0'}</p>
                                <small>Alguno 1</small>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <h3>NOT (A)</h3>
                                <div style={{ fontSize: '3rem', color: (!inputA) ? '#ffeb3b' : '#555' }}>💡</div>
                                <p>Salida = {!inputA ? '1' : '0'}</p>
                                <small>Opuesto de A</small>
                            </div>
                        </div>
                    </section>
                )}

                {/* IC 555 */}
                {activeComponent === 'ic' && (
                    <section className="elec-card flow-section full-width">
                        <h2>El Temporizador NE555</h2>
                        <p>El circuito integrado más famoso del mundo. Puede parpadear LEDs, crear tonos de audio y servir como temporizador confiable.</p>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#222', borderRadius: '10px' }}>
                            <div style={{ width: '100px', height: '100px', background: '#111', color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', border: '1px solid #444', position: 'relative' }}>
                                <strong>NE555</strong>
                                <div style={{ position: 'absolute', left: '-5px', top: '10px', color: '#ffeb3b', fontSize: '0.6rem' }}>●</div>
                            </div>
                            <div className="flowing-electron fast-flow" style={{ fontSize: '2rem', animation: 'pulsate 0.5s infinite alternate' }}>💡</div>
                        </div>
                        <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>Configuración Astable (Oscilador continuo)</p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ElectronicComponentsPage;

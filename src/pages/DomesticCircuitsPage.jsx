import React, { useState } from 'react';
import './DomesticCircuitsStyles.css';

const DomesticCircuitsPage = () => {
    // Estados del Tablero
    const [mainPower, setMainPower] = useState(true);
    const [rcdOn, setRcdOn] = useState(true); // Disyuntor (Residual Current Device)
    const [mcbOn, setMcbOn] = useState(true); // Térmica (Miniature Circuit Breaker)

    // Estados del Circuito
    const [circuitType, setCircuitType] = useState('simple'); // 'simple', 'toma', 'combinacion', 'punto_toma', 'doble_punto'
    const [sw1, setSw1] = useState(false);
    const [sw2, setSw2] = useState(false); // Para llave combinada o doble punto

    // Calculadora de Cargas
    const [appliances, setAppliances] = useState([
        { id: 'light', name: 'Luces LED (General)', watts: 100, count: 0 },
        { id: 'tv', name: 'Televisor / PC', watts: 200, count: 0 },
        { id: 'fridge', name: 'Heladera', watts: 350, count: 0 },
        { id: 'washing', name: 'Lavarropas (con calor)', watts: 2000, count: 0 },
        { id: 'microwave', name: 'Microondas', watts: 1200, count: 0 },
        { id: 'ac', name: 'Aire Acond. (3000fg)', watts: 1500, count: 0 },
        { id: 'heater', name: 'Estufa Eléctrica', watts: 2000, count: 0 },
        { id: 'iron', name: 'Plancha', watts: 1000, count: 0 }
    ]);

    const updateApplianceCount = (id, delta) => {
        setAppliances(apps => apps.map(app =>
            app.id === id ? { ...app, count: Math.max(0, app.count + delta) } : app
        ));
    };

    const totalWatts = appliances.reduce((sum, app) => sum + (app.watts * app.count), 0);
    const totalAmps = totalWatts / 220;

    let recommendedBreaker = 10;
    let recommendedWire = 1.5;

    if (totalAmps > 63) {
        recommendedBreaker = 'Sobrecarga (Requiere separar circuitos)';
        recommendedWire = '-';
    } else if (totalAmps > 40) {
        recommendedBreaker = 63;
        recommendedWire = 16;
    } else if (totalAmps > 32) {
        recommendedBreaker = 40;
        recommendedWire = 10;
    } else if (totalAmps > 25) {
        recommendedBreaker = 32;
        recommendedWire = 6;
    } else if (totalAmps > 20) {
        recommendedBreaker = 25;
        recommendedWire = 4;
    } else if (totalAmps > 16) {
        recommendedBreaker = 20;
        recommendedWire = 4;
    } else if (totalAmps > 10) {
        recommendedBreaker = 16;
        recommendedWire = 2.5;
    } else {
        recommendedBreaker = 10;
        recommendedWire = 1.5;
    }

    const hasHeavyAppliances = appliances.some(a => a.id !== 'light' && a.count > 0);
    if (hasHeavyAppliances && typeof recommendedBreaker === 'number' && recommendedBreaker < 16) {
        recommendedBreaker = 16;
        recommendedWire = 2.5;
    }

    // Fallas
    const [shortCircuitMsg, setShortCircuitMsg] = useState('');

    // Lógica de energía
    const isPowered = mainPower && rcdOn && mcbOn;

    const triggerShortCircuit = () => {
        if (!isPowered) return;
        setShortCircuitMsg('¡CORTOCIRCUITO! (Fase toca Neutro)');
        setTimeout(() => {
            setMcbOn(false); // La térmica salta
            setShortCircuitMsg('La Llave Térmica actuó por sobreintensidad.');
            setTimeout(() => setShortCircuitMsg(''), 3000);
        }, 300);
    };

    const triggerLeakage = () => {
        if (!isPowered) return;
        setShortCircuitMsg('¡FUGA A TIERRA! (Corriente desviada)');
        setTimeout(() => {
            setRcdOn(false); // El disyuntor salta
            setShortCircuitMsg('El Disyuntor Diferencial actuó salvando una vida.');
            setTimeout(() => setShortCircuitMsg(''), 3000);
        }, 300);
    };

    const resetProtections = () => {
        setRcdOn(true);
        setMcbOn(true);
    };

    // Lógica de encendido
    let isLightOn = false;
    let isLight2On = false;
    let isOutletPowered = false;

    if (isPowered) {
        if (circuitType === 'simple' && sw1) isLightOn = true;
        if (circuitType === 'combinacion' && (sw1 === sw2)) isLightOn = true;
        if (circuitType === 'toma') isOutletPowered = true;
        if (circuitType === 'punto_toma') {
            if (sw1) isLightOn = true;
            isOutletPowered = true;
        }
        if (circuitType === 'doble_punto') {
            if (sw1) isLightOn = true;
            if (sw2) isLight2On = true;
        }
    }

    return (
        <div className="circuits-container">
            <header className="circuits-header">
                <h1>Simulador de Instalaciones Eléctricas Domiciliarias</h1>
                <p>Aprende cómo funciona el tablero principal, protecciones, cálculos y empalmes.</p>
            </header>

            <div className="circuits-grid">
                {/* PANEL DE CONTROL / TABLERO */}
                <section className="circuit-card tablero-section">
                    <h2>Tablero Seccional</h2>
                    <div className="tablero-box">
                        <div className="tension-indicator">
                            Tensión de Red (220V): <span className={mainPower ? 'status-on' : 'status-off'}>{mainPower ? 'PRESENTE' : 'CORTADA'}</span>
                        </div>

                        <div className="protecciones">
                            {/* Disyuntor */}
                            <div className="device-box rcd-box">
                                <div className="device-label">Disyuntor (Fuga)</div>
                                <div className="device-body">
                                    <button className={`toggle-btn ${rcdOn ? 'on' : 'off'}`} onClick={() => setRcdOn(!rcdOn)}>
                                        {rcdOn ? 'I (ON)' : 'O (OFF)'}
                                    </button>
                                    <button className="test-btn" onClick={() => { if (isPowered) setRcdOn(false) }}>T</button>
                                </div>
                                <small>30mA In: 40A</small>
                            </div>

                            {/* Térmica */}
                            <div className="device-box mcb-box">
                                <div className="device-label">Térmica (Corto)</div>
                                <div className="device-body">
                                    <button className={`toggle-btn thermal ${mcbOn ? 'on' : 'off'}`} onClick={() => setMcbOn(!mcbOn)}>
                                        {mcbOn ? 'I (ON)' : 'O (OFF)'}
                                    </button>
                                </div>
                                <small>Curva C - 16A</small>
                            </div>
                        </div>

                        {shortCircuitMsg && (
                            <div className="alert-message">
                                ⚠️ {shortCircuitMsg}
                            </div>
                        )}

                        <div className="fault-controls">
                            <button className="fault-btn corto" onClick={triggerShortCircuit}>Simular Cortocircuito</button>
                            <button className="fault-btn fuga" onClick={triggerLeakage}>Simular Fuga a Tierra</button>
                            <button className="fault-btn reset" onClick={resetProtections}>Restablecer Protecciones</button>
                        </div>
                    </div>
                </section>

                {/* VISUALIZADOR DE CIRCUITO */}
                <section className="circuit-card sim-section">
                    <div className="preset-selector">
                        <button className={`preset-btn ${circuitType === 'simple' ? 'active' : ''}`} onClick={() => setCircuitType('simple')}>1 Punto</button>
                        <button className={`preset-btn ${circuitType === 'toma' ? 'active' : ''}`} onClick={() => setCircuitType('toma')}>Tomacorriente</button>
                        <button className={`preset-btn ${circuitType === 'punto_toma' ? 'active' : ''}`} onClick={() => setCircuitType('punto_toma')}>Punto y Toma</button>
                        <button className={`preset-btn ${circuitType === 'doble_punto' ? 'active' : ''}`} onClick={() => setCircuitType('doble_punto')}>Doble Punto</button>
                        <button className={`preset-btn ${circuitType === 'combinacion' ? 'active' : ''}`} onClick={() => setCircuitType('combinacion')}>Combinación</button>
                    </div>

                    <div className="circuit-canvas">
                        {/* CABLES PRINCIPALES (BARRAS) */}
                        <div className="wire-bus phase-bus" title="Fase (Marrón/Rojo/Negro) - 220V">L (Fase)</div>
                        <div className="wire-bus neutral-bus" title="Neutro (Celeste) - 0V">N (Neutro)</div>
                        <div className="wire-bus earth-bus" title="Tierra (Verde/Amarillo)">PE (Tierra)</div>

                        <div className="interactive-area" style={{ position: 'relative', width: '100%', height: '350px' }}>
                            {/* CIRCUITO SIMPLE */}
                            {circuitType === 'simple' && (
                                <div className="circuit-diagram simple-circuit" style={{ height: '100%' }}>
                                    <svg width="100%" height="100%" className="wiring-svg">
                                        {/* BARRAS TRONCALES HORIZONTALES */}
                                        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--neutral-color)" />
                                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="var(--earth-color)" />

                                        {/* DERIVACIONES */}
                                        <line x1="30%" y1="15%" x2="30%" y2="55%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />

                                        <line x1="30%" y1="75%" x2="70%" y2="75%" stroke="var(--return-color)" className={isPowered && sw1 ? 'live-wire' : ''} />
                                        <line x1="70%" y1="75%" x2="70%" y2="55%" stroke="var(--return-color)" className={isPowered && sw1 ? 'live-wire' : ''} />

                                        <line x1="70%" y1="25%" x2="70%" y2="45%" stroke="var(--neutral-color)" />
                                    </svg>
                                    <div className="component-node switch-node" style={{ left: '30%', top: '65%', transform: 'translate(-50%, -50%)' }} onClick={() => setSw1(!sw1)}>
                                        <div className={`switch-icon ${sw1 ? 'on' : 'off'}`}></div>
                                        <span>Llave</span>
                                    </div>
                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '70%', top: '50%', transform: 'translate(-50%, -50%)' }}>💡</div>
                                </div>
                            )}

                            {/* CIRCUITO TOMACORRIENTE */}
                            {circuitType === 'toma' && (
                                <div className="circuit-diagram toma-circuit" style={{ height: '100%' }}>
                                    <svg width="100%" height="100%" className="wiring-svg">
                                        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--neutral-color)" />
                                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="var(--earth-color)" strokeDasharray="10,5" />

                                        <line x1="45%" y1="15%" x2="45%" y2="60%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="55%" y1="25%" x2="55%" y2="60%" stroke="var(--neutral-color)" />
                                        <line x1="50%" y1="35%" x2="50%" y2="60%" stroke="var(--earth-color)" strokeDasharray="10,5" />
                                    </svg>
                                    <div className="component-node outlet-node" style={{ left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}>
                                        <div className="outlet-face">
                                            <div className={`hole phase-hole ${isOutletPowered ? 'danger' : ''}`}></div>
                                            <div className="hole neutral-hole"></div>
                                            <div className="hole earth-hole"></div>
                                        </div>
                                        <span>Tomacorriente</span>
                                    </div>
                                    {isOutletPowered && (
                                        <div className="power-indicator" style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}>⚡ 220V</div>
                                    )}
                                </div>
                            )}

                            {/* CIRCUITO PUNTO Y TOMA */}
                            {circuitType === 'punto_toma' && (
                                <div className="circuit-diagram puntotoma-circuit" style={{ height: '100%' }}>
                                    <svg width="100%" height="100%" className="wiring-svg">
                                        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--neutral-color)" />
                                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="var(--earth-color)" strokeDasharray="10,5" />

                                        <line x1="40%" y1="15%" x2="40%" y2="55%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="40%" y1="75%" x2="40%" y2="85%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="40%" y1="85%" x2="50%" y2="85%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />

                                        <line x1="40%" y1="75%" x2="70%" y2="75%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />
                                        <line x1="70%" y1="75%" x2="70%" y2="55%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />

                                        <line x1="70%" y1="25%" x2="70%" y2="45%" stroke="var(--neutral-color)" />
                                        <line x1="60%" y1="25%" x2="60%" y2="85%" stroke="var(--neutral-color)" />

                                        <line x1="55%" y1="35%" x2="55%" y2="85%" stroke="var(--earth-color)" strokeDasharray="10,5" />
                                    </svg>
                                    <div className="component-node switch-node" style={{ left: '40%', top: '65%', transform: 'translate(-50%, -50%)' }} onClick={() => setSw1(!sw1)}>
                                        <div className={`switch-icon ${sw1 ? 'on' : 'off'}`}></div>
                                        <span style={{ fontSize: '0.6rem' }}>Llave</span>
                                    </div>
                                    <div className="component-node outlet-node" style={{ left: '55%', top: '85%', transform: 'translate(-50%, -50%)', scale: '0.8' }}>
                                        <div className="outlet-face">
                                            <div className={`hole phase-hole ${isOutletPowered ? 'danger' : ''}`}></div>
                                            <div className="hole neutral-hole"></div>
                                            <div className="hole earth-hole"></div>
                                        </div>
                                    </div>
                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '70%', top: '50%', transform: 'translate(-50%, -50%)' }}>💡</div>
                                </div>
                            )}

                            {/* CIRCUITO DOBLE PUNTO */}
                            {circuitType === 'doble_punto' && (
                                <div className="circuit-diagram doble-circuit" style={{ height: '100%' }}>
                                    <svg width="100%" height="100%" className="wiring-svg">
                                        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--neutral-color)" />
                                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="var(--earth-color)" />

                                        <line x1="50%" y1="15%" x2="50%" y2="55%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />

                                        <line x1="45%" y1="75%" x2="30%" y2="75%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />
                                        <line x1="30%" y1="75%" x2="30%" y2="55%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />

                                        <line x1="55%" y1="75%" x2="70%" y2="75%" stroke="#ccc" className={isLight2On ? 'live-wire' : ''} />
                                        <line x1="70%" y1="75%" x2="70%" y2="55%" stroke="#ccc" className={isLight2On ? 'live-wire' : ''} />

                                        <line x1="30%" y1="25%" x2="30%" y2="45%" stroke="var(--neutral-color)" />
                                        <line x1="70%" y1="25%" x2="70%" y2="45%" stroke="var(--neutral-color)" />
                                    </svg>
                                    <div className="component-node" style={{ left: '50%', top: '65%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '5px' }}>
                                        <div className={`switch-icon ${sw1 ? 'on' : 'off'}`} onClick={() => setSw1(!sw1)}></div>
                                        <div className={`switch-icon ${sw2 ? 'on' : 'off'}`} onClick={() => setSw2(!sw2)}></div>
                                    </div>
                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '30%', top: '50%', transform: 'translate(-50%, -50%)' }}>💡</div>
                                    <div className={`component-node bulb-node ${isLight2On ? 'glowing' : ''}`} style={{ left: '70%', top: '50%', transform: 'translate(-50%, -50%)' }}>💡</div>
                                </div>
                            )}

                            {/* CIRCUITO COMBINACION */}
                            {circuitType === 'combinacion' && (
                                <div className="circuit-diagram combinacion-circuit" style={{ height: '100%' }}>
                                    <svg width="100%" height="100%" className="wiring-svg">
                                        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--neutral-color)" />
                                        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="var(--earth-color)" />

                                        <line x1="20%" y1="15%" x2="20%" y2="55%" stroke="var(--phase-color)" className={isPowered ? 'live-wire' : ''} />

                                        <line x1="20%" y1="70%" x2="60%" y2="70%" stroke="gray" className={isPowered && !sw1 ? 'live-wire' : ''} />
                                        <line x1="20%" y1="80%" x2="60%" y2="80%" stroke="gray" className={isPowered && sw1 ? 'live-wire' : ''} />

                                        <line x1="60%" y1="75%" x2="80%" y2="75%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />
                                        <line x1="80%" y1="75%" x2="80%" y2="55%" stroke="var(--return-color)" className={isLightOn ? 'live-wire' : ''} />

                                        <line x1="80%" y1="25%" x2="80%" y2="45%" stroke="var(--neutral-color)" />
                                    </svg>
                                    <div className="component-node switch-node combo-switch" style={{ left: '20%', top: '65%', transform: 'translate(-50%, -50%)' }} onClick={() => setSw1(!sw1)}>
                                        <div className={`switch-icon ${sw1 ? 'pos1' : 'pos2'}`}></div>
                                        <span>Llave A</span>
                                    </div>
                                    <div className="component-node switch-node combo-switch" style={{ left: '60%', top: '65%', transform: 'translate(-50%, -50%)' }} onClick={() => setSw2(!sw2)}>
                                        <div className={`switch-icon ${sw2 ? 'pos1' : 'pos2'}`}></div>
                                        <span>Llave B</span>
                                    </div>
                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '80%', top: '50%', transform: 'translate(-50%, -50%)' }}>💡</div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>

                {/* CALCULADORA DE CARGA Y TÉRMICA */}
                <section className="circuit-card full-width calc-section">
                    <h2>Calculadora de Carga y Térmica (Ley de Ohm)</h2>
                    <p>Calcula el consumo total en base a los equipos que conectes al mismo circuito para determinar qué <strong>Llave Térmica</strong> necesitas instalar y qué grosor de cable debes tirar.</p>

                    <div className="calc-grid">
                        <div className="appliance-list">
                            <h3>Selecciona tus equipos concurrentes:</h3>
                            {appliances.map(app => (
                                <div key={app.id} className="appliance-item">
                                    <span>{app.name} <small style={{ color: '#ffeb3b' }}>({app.watts}W)</small></span>
                                    <div className="counter">
                                        <button onClick={() => updateApplianceCount(app.id, -1)}>-</button>
                                        <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{app.count}</span>
                                        <button onClick={() => updateApplianceCount(app.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="calc-results">
                            <div className="result-box power">
                                <h4>Potencia Total (P)</h4>
                                <div className="value">{totalWatts} <span>W (Watts)</span></div>
                            </div>
                            <div className="result-box current">
                                <h4>Corriente Calculada (I = P / 220V)</h4>
                                <div className="value">{totalAmps.toFixed(2)} <span>A (Amperes)</span></div>
                            </div>

                            <div className="recommendations">
                                <div className="rec-item">
                                    <h5>Térmica Comercial Sugerida</h5>
                                    <div className={`rec-value ${typeof recommendedBreaker === 'string' ? 'danger' : ''}`}>
                                        {typeof recommendedBreaker === 'number' ? `Curva C - ${recommendedBreaker}A` : recommendedBreaker}
                                    </div>
                                </div>
                                <div className="rec-item">
                                    <h5>Sección Mínima del Cable</h5>
                                    <div className="rec-value">
                                        {typeof recommendedWire === 'number' ? `${recommendedWire} mm²` : recommendedWire}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EMPALMES SECTION */}
                <section className="circuit-card full-width empalmes-section">
                    <h2>Técnicas de Empalmes Eléctricos (Uniones)</h2>
                    <p>Los empalmes garantizan la continuidad eléctrica y mecánica del circuito. Un mal empalme causa resistencia, calor y puede provocar incendios.</p>

                    <div className="empalmes-grid">
                        <div className="empalme-card">
                            <h4>Cola de Ratón (Trenzado)</h4>
                            <div className="empalme-graphic">
                                <img src="/img/empalmes/cola_raton.png" alt="Cola de Ratón" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                            </div>
                            <p><strong>Uso:</strong> Cajas de derivación (octogonales, rectangulares). Se somete a poca tracción mecánica y se encinta "hacia arriba" para no perforar la cinta.</p>
                            <p><strong>Cómo se hace:</strong> Se pelan las puntas (aprox 5 cm), se cruzan formando una X y se trenzan firmemente utilizando una pinza universal. Finalmente se corta la punta excedente dejando una terminación roma.</p>
                        </div>

                        <div className="empalme-card">
                            <h4>Derivación (Tipo T)</h4>
                            <div className="empalme-graphic">
                                <img src="/img/empalmes/derivacion.png" alt="Derivación en T" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                            </div>
                            <p><strong>Uso:</strong> Especial para sacar una línea secundaria desde un cable principal (línea pasante o troncal) sin tener que cortarlo.</p>
                            <p><strong>Cómo se hace:</strong> Se quita la aislación del cable principal en un sector intermedio. El cable derivado se pela en su extremo y se enrolla dando vueltas apretadas sobre el cobre descubierto del cable troncal.</p>
                        </div>

                        <div className="empalme-card">
                            <h4>Prolongación (Western Union)</h4>
                            <div className="empalme-graphic">
                                <img src="/img/empalmes/western.png" alt="Western Union" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                            </div>
                            <p><strong>Uso:</strong> Ideal para extender cables conductores que van a estar sujetos a esfuerzos mecánicos o estiramientos severos, ya que esta unión es sumamente fuerte.</p>
                            <p><strong>Cómo se hace:</strong> Se pelan unos 8 cm de cada punta, se cruzan en el medio y luego cada cable se enrolla apretadamente en espiral sobre el cobre recto del otro cable en direcciones opuestas.</p>
                        </div>
                    </div>
                </section>

                <section className="circuit-card full-width info-section">
                    <h2>Manual del Electricista</h2>
                    <div className="info-grid">
                        <div className="info-block">
                            <h3>Colores Normativos (Argentina IRAM)</h3>
                            <ul>
                                <li><span className="color-dot brown"></span> <strong>Fase (L):</strong> Marrón, Rojo o Negro. Lleva la corriente (220V).</li>
                                <li><span className="color-dot blue"></span> <strong>Neutro (N):</strong> Celeste. Retorna la corriente (0V referencial).</li>
                                <li><span className="color-dot green"></span> <strong>Tierra (PE):</strong> Verde-Amarillo. Protección contra descargas.</li>
                                <li><span className="color-dot white"></span> <strong>Retornos:</strong> Blanco o gris (distinto a fase/neutro/tierra).</li>
                            </ul>
                        </div>
                        <div className="info-block">
                            <h3>Secciones de Cables (Dimensionamiento)</h3>
                            <p>La norma AEA establece las secciones mínimas de cobre:</p>
                            <ul>
                                <li><strong>1.5 mm²:</strong> Retornos e Iluminación (Máx 11 A).</li>
                                <li><strong>2.5 mm²:</strong> Tomacorrientes (TUG) (Máx 16 A).</li>
                                <li><strong>4.0 mm² a 6.0 mm²:</strong> Línea Principal y aires acondicionados grandes.</li>
                            </ul>
                        </div>
                        <div className="info-block">
                            <h3>Protecciones y Tipos de Llave</h3>
                            <p><strong>Interruptor Unipolar vs Bipolar:</strong> Unipolar (el normal) corta solo la fase. Bipolar corta fase y neutro al mismo tiempo, brindando mayor seguridad. Nunca se debe interrumpir el neutro sin interrumpir la fase simultáneamente.</p>
                            <p><strong>Circuito Combinación (Escalera):</strong> Utiliza llaves de 3 bornes (conmutadores). Permite encender o apagar la misma lámpara desde dos lugares distintos.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DomesticCircuitsPage;

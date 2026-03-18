import React, { useState, useEffect } from 'react';
import './DomesticCircuitsStyles.css';

const DomesticCircuitsPage = () => {
    // Estados del Tablero
    const [mainPower, setMainPower] = useState(true);
    const [rcdOn, setRcdOn] = useState(true); // Disyuntor (Residual Current Device)
    const [mcbOn, setMcbOn] = useState(true); // Térmica (Miniature Circuit Breaker)

    // Estados del Circuito
    const [circuitType, setCircuitType] = useState('simple'); // 'simple', 'toma', 'combinacion'
    const [sw1, setSw1] = useState(false);
    const [sw2, setSw2] = useState(false); // Para llave combinada
    const [devicePlugged, setDevicePlugged] = useState(false);

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
    let isOutletPowered = false;

    if (isPowered) {
        if (circuitType === 'simple' && sw1) isLightOn = true;
        if (circuitType === 'combinacion' && (sw1 === sw2)) isLightOn = true;
        if (circuitType === 'toma') isOutletPowered = true;
    }

    return (
        <div className="circuits-container">
            <header className="circuits-header">
                <h1>Simulador de Instalaciones Eléctricas Domiciliarias</h1>
                <p>Aprende cómo funciona el tablero principal, protecciones y circuitos estándar.</p>
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
                        <button className={`preset-btn ${circuitType === 'simple' ? 'active' : ''}`} onClick={() => setCircuitType('simple')}>Punto y Lámpara</button>
                        <button className={`preset-btn ${circuitType === 'toma' ? 'active' : ''}`} onClick={() => setCircuitType('toma')}>Tomacorriente</button>
                        <button className={`preset-btn ${circuitType === 'combinacion' ? 'active' : ''}`} onClick={() => setCircuitType('combinacion')}>Llave Combinación (Escalera)</button>
                    </div>

                    <div className="circuit-canvas">
                        {/* CABLES PRINCIPALES (BARRAS) */}
                        <div className="wire-bus phase-bus" title="Fase (Marrón/Rojo/Negro) - 220V">L (Fase)</div>
                        <div className="wire-bus neutral-bus" title="Neutro (Celeste) - 0V">N (Neutro)</div>
                        <div className="wire-bus earth-bus" title="Tierra (Verde/Amarillo)">PE (Tierra)</div>

                        <div className="interactive-area">

                            {/* CIRCUITO SIMPLE */}
                            {circuitType === 'simple' && (
                                <div className="circuit-diagram simple-circuit">
                                    <svg width="100%" height="200" className="wiring-svg">
                                        {/* Fase a llave */}
                                        <line x1="20%" y1="0" x2="20%" y2="50%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="20%" y1="20%" x2="45%" y2="20%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />

                                        {/* Llave a Lámpara (Retorno) */}
                                        <line x1="55%" y1="20%" x2="80%" y2="20%" stroke="var(--return-color)" strokeWidth="4" className={isPowered && sw1 ? 'live-wire' : ''} />
                                        <line x1="80%" y1="20%" x2="80%" y2="40%" stroke="var(--return-color)" strokeWidth="4" className={isPowered && sw1 ? 'live-wire' : ''} />

                                        {/* Lámpara a Neutro */}
                                        <line x1="80%" y1="60%" x2="80%" y2="80%" stroke="var(--neutral-color)" strokeWidth="4" />
                                        <line x1="80%" y1="80%" x2="50%" y2="80%" stroke="var(--neutral-color)" strokeWidth="4" />
                                    </svg>

                                    <div className="component-node switch-node" style={{ left: '50%', top: '20%' }} onClick={() => setSw1(!sw1)}>
                                        <div className={`switch-icon ${sw1 ? 'on' : 'off'}`}></div>
                                        <span>Llave</span>
                                    </div>

                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '80%', top: '50%' }}>
                                        💡
                                    </div>
                                </div>
                            )}

                            {/* CIRCUITO TOMACORRIENTE */}
                            {circuitType === 'toma' && (
                                <div className="circuit-diagram toma-circuit">
                                    <svg width="100%" height="200" className="wiring-svg">
                                        {/* Conexion Fase */}
                                        <line x1="20%" y1="0" x2="20%" y2="45%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="20%" y1="45%" x2="45%" y2="45%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />

                                        {/* Conexion Neutro */}
                                        <line x1="80%" y1="80%" x2="80%" y2="55%" stroke="var(--neutral-color)" strokeWidth="4" />
                                        <line x1="80%" y1="55%" x2="55%" y2="55%" stroke="var(--neutral-color)" strokeWidth="4" />

                                        {/* Conexion Tierra */}
                                        <line x1="50%" y1="100%" x2="50%" y2="60%" stroke="var(--earth-color)" strokeWidth="4" strokeDasharray="10,5" />
                                    </svg>

                                    <div className="component-node outlet-node" style={{ left: '50%', top: '50%' }}>
                                        <div className="outlet-face">
                                            <div className={`hole phase-hole ${isOutletPowered ? 'danger' : ''}`}></div>
                                            <div className="hole neutral-hole"></div>
                                            <div className="hole earth-hole"></div>
                                        </div>
                                        <span>Tomacorriente</span>
                                    </div>

                                    {isOutletPowered && (
                                        <div className="power-indicator" style={{ left: '50%', top: '25%' }}>
                                            ⚡ 220V Disponibles
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* CIRCUITO COMBINACION */}
                            {circuitType === 'combinacion' && (
                                <div className="circuit-diagram combinacion-circuit">
                                    <svg width="100%" height="200" className="wiring-svg">
                                        {/* Fase a Llave 1 */}
                                        <line x1="10%" y1="0" x2="10%" y2="30%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />
                                        <line x1="10%" y1="30%" x2="25%" y2="30%" stroke="var(--phase-color)" strokeWidth="4" className={isPowered ? 'live-wire' : ''} />

                                        {/* Puentes (Comunes) */}
                                        <line x1="35%" y1="20%" x2="65%" y2="20%" stroke="gray" strokeWidth="4" className={isPowered && !sw1 ? 'live-wire' : ''} />
                                        <line x1="35%" y1="40%" x2="65%" y2="40%" stroke="gray" strokeWidth="4" className={isPowered && sw1 ? 'live-wire' : ''} />

                                        {/* Llave 2 a Lámpara (Retorno) */}
                                        <line x1="75%" y1="30%" x2="90%" y2="30%" stroke="var(--return-color)" strokeWidth="4" className={isLightOn ? 'live-wire' : ''} />
                                        <line x1="90%" y1="30%" x2="90%" y2="40%" stroke="var(--return-color)" strokeWidth="4" className={isLightOn ? 'live-wire' : ''} />

                                        {/* Lámpara a Neutro */}
                                        <line x1="90%" y1="60%" x2="90%" y2="80%" stroke="var(--neutral-color)" strokeWidth="4" />
                                        <line x1="90%" y1="80%" x2="50%" y2="80%" stroke="var(--neutral-color)" strokeWidth="4" />
                                    </svg>

                                    <div className="component-node switch-node combo-switch" style={{ left: '30%', top: '30%' }} onClick={() => setSw1(!sw1)}>
                                        <div className={`switch-icon ${sw1 ? 'pos1' : 'pos2'}`}></div>
                                        <span>Llave A</span>
                                    </div>

                                    <div className="component-node switch-node combo-switch" style={{ left: '70%', top: '30%' }} onClick={() => setSw2(!sw2)}>
                                        <div className={`switch-icon ${sw2 ? 'pos1' : 'pos2'}`}></div>
                                        <span>Llave B</span>
                                    </div>

                                    <div className={`component-node bulb-node ${isLightOn ? 'glowing' : ''}`} style={{ left: '90%', top: '50%' }}>
                                        💡
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>

                <section className="circuit-card full-width info-section">
                    <h2>Manual del Electricista</h2>
                    <div className="info-grid">
                        <div className="info-block">
                            <h3>Colores Normativos (Argentina)</h3>
                            <ul>
                                <li><span className="color-dot brown"></span> <strong>Fase (L):</strong> Marrón, Rojo o Negro. Lleva la corriente (220V).</li>
                                <li><span className="color-dot blue"></span> <strong>Neutro (N):</strong> Celeste. Retorna la corriente (0V referencial).</li>
                                <li><span className="color-dot green"></span> <strong>Tierra (PE):</strong> Verde-Amarillo. Protección contra descargas.</li>
                                <li><span className="color-dot white"></span> <strong>Retorno:</strong> Blanco u otro distinto a fase/neutro/tierra.</li>
                            </ul>
                        </div>
                        <div className="info-block">
                            <h3>Protecciones</h3>
                            <p><strong>Disyuntor Diferencial:</strong> Protege a las PERSONAS. Detecta fugas a tierra (ej: alguien toca un cable pelado). Corta si la fuga &gt; 30mA.</p>
                            <p><strong>Llave Térmica:</strong> Protege a los CABLES. Detecta cortocircuitos (pico enorme) o sobrecargas (muchos equipos enchufados).</p>
                        </div>
                        <div className="info-block">
                            <h3>Circuito Combinación (Escalera)</h3>
                            <p>Utiliza llaves de 3 bornes (un común y dos vías). Permite encender o apagar la misma lámpara desde dos lugares distintos (ej: inicio y fin de un pasillo).</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DomesticCircuitsPage;

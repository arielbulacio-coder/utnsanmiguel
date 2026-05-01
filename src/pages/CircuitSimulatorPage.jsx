import React, { useState, useEffect, useRef } from 'react';
import './ElectricityBasicsStyles.css';

// === Helpers ===
const Resistor = ({ x, y, value, current, label }) => (
    <g transform={`translate(${x}, ${y})`}>
        <rect x="-30" y="-8" width="60" height="16" fill="#deb887" stroke="#1a1a1a" strokeWidth="1.5" rx="3" />
        <line x1="-30" y1="0" x2="-50" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="30" y1="0" x2="50" y2="0" stroke="#fafafa" strokeWidth="2" />
        {[-15, -5, 5, 15].map((bx, i) => (
            <rect key={i} x={bx} y="-8" width="3" height="16" fill={['#000', '#964B00', '#ff0000', '#ffeb3b'][i]} />
        ))}
        <text x="0" y="-14" textAnchor="middle" fill="#fafafa" fontSize="11" fontWeight="bold">{value}</text>
        {current !== undefined && <text x="0" y="24" textAnchor="middle" fill="#4facfe" fontSize="10">{current.toFixed(2)} mA</text>}
        {label && <text x="0" y="-26" textAnchor="middle" fill="#aaa" fontSize="9">{label}</text>}
    </g>
);

const LED = ({ x, y, on, intensity = 1, color = '#ff3b30' }) => (
    <g transform={`translate(${x}, ${y})`}>
        {on && <circle cx="0" cy="0" r="22" fill={color} opacity={0.4 * intensity} />}
        {on && <circle cx="0" cy="0" r="14" fill={color} opacity={0.8 * intensity} />}
        <circle cx="0" cy="0" r="10" fill={on ? color : '#3a0a0a'} stroke="#1a1a1a" strokeWidth="2" />
        <line x1="-10" y1="0" x2="-25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="10" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        {/* anode (longer leg) and cathode marker */}
        <line x1="-25" y1="-3" x2="-25" y2="3" stroke="#aaa" strokeWidth="1" />
        <text x="-32" y="3" textAnchor="middle" fill="#aaa" fontSize="9">+</text>
    </g>
);

const Battery = ({ x, y, voltage }) => (
    <g transform={`translate(${x}, ${y})`}>
        <line x1="-25" y1="0" x2="-3" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="-3" y1="-12" x2="-3" y2="12" stroke="#fafafa" strokeWidth="3" />
        <line x1="3" y1="-6" x2="3" y2="6" stroke="#fafafa" strokeWidth="2" />
        <line x1="3" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <text x="-10" y="-18" textAnchor="middle" fill="#4caf50" fontSize="11" fontWeight="bold">+ {voltage}V</text>
        <text x="10" y="-18" textAnchor="middle" fill="#f44336" fontSize="11" fontWeight="bold">−</text>
    </g>
);

const Switch = ({ x, y, closed, onToggle }) => (
    <g transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }} onClick={onToggle}>
        <line x1="-25" y1="0" x2="-10" y2="0" stroke="#fafafa" strokeWidth="2" />
        <circle cx="-10" cy="0" r="3" fill="#fafafa" />
        <circle cx="10" cy="0" r="3" fill="#fafafa" />
        <line
            x1="-10" y1="0"
            x2={closed ? 10 : 6}
            y2={closed ? 0 : -10}
            stroke={closed ? '#4caf50' : '#aaa'}
            strokeWidth="2.5"
        />
        <line x1="10" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <text x="0" y="-18" textAnchor="middle" fill={closed ? '#4caf50' : '#aaa'} fontSize="10" fontWeight="bold">
            {closed ? 'CERRADO' : 'ABIERTO'}
        </text>
    </g>
);

const Capacitor = ({ x, y, value }) => (
    <g transform={`translate(${x}, ${y})`}>
        <line x1="-25" y1="0" x2="-3" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="-3" y1="-12" x2="-3" y2="12" stroke="#fafafa" strokeWidth="3" />
        <line x1="3" y1="-12" x2="3" y2="12" stroke="#fafafa" strokeWidth="3" />
        <line x1="3" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <text x="0" y="-18" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">{value}</text>
    </g>
);

const Buzzer = ({ x, y, on }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="0" r="14" fill="#37474f" stroke="#90a4ae" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="#1a1a1a" />
        <line x1="-14" y1="0" x2="-25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="14" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        {on && (
            <>
                <path d="M 14 -12 Q 22 -12 22 0 Q 22 12 14 12" stroke="#ffeb3b" strokeWidth="1.5" fill="none">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" repeatCount="indefinite" />
                </path>
                <path d="M 14 -8 Q 18 -8 18 0 Q 18 8 14 8" stroke="#ffeb3b" strokeWidth="1.5" fill="none" />
            </>
        )}
        <text x="0" y="-22" textAnchor="middle" fill="#ffeb3b" fontSize="10" fontWeight="bold">BUZZER</text>
    </g>
);

const Diode = ({ x, y, conducting }) => (
    <g transform={`translate(${x}, ${y})`}>
        <line x1="-25" y1="0" x2="-8" y2="0" stroke="#fafafa" strokeWidth="2" />
        <polygon points="-8,-8 -8,8 6,0" fill={conducting ? '#4caf50' : '#666'} stroke="#fafafa" strokeWidth="1" />
        <line x1="6" y1="-8" x2="6" y2="8" stroke="#fafafa" strokeWidth="2.5" />
        <line x1="6" y1="0" x2="25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <text x="-12" y="-14" textAnchor="middle" fill="#aaa" fontSize="9">A</text>
        <text x="14" y="-14" textAnchor="middle" fill="#aaa" fontSize="9">K</text>
    </g>
);

const Transistor = ({ x, y, conducting }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="0" r="14" fill="#37474f" stroke="#90a4ae" strokeWidth="1" />
        <line x1="-7" y1="-7" x2="-7" y2="7" stroke="#fafafa" strokeWidth="2" />
        <line x1="-7" y1="-3" x2="6" y2="-9" stroke={conducting ? '#4caf50' : '#fafafa'} strokeWidth="1.5" />
        <line x1="-7" y1="3" x2="6" y2="9" stroke={conducting ? '#4caf50' : '#fafafa'} strokeWidth="1.5" />
        <polygon points="2,7 6,9 4,5" fill={conducting ? '#4caf50' : '#fafafa'} />
        <line x1="-7" y1="0" x2="-25" y2="0" stroke="#fafafa" strokeWidth="2" />
        <line x1="6" y1="-9" x2="14" y2="-25" stroke="#fafafa" strokeWidth="2" />
        <line x1="6" y1="9" x2="14" y2="25" stroke="#fafafa" strokeWidth="2" />
        <text x="-30" y="3" fill="#aaa" fontSize="9">B</text>
        <text x="18" y="-22" fill="#aaa" fontSize="9">C</text>
        <text x="18" y="32" fill="#aaa" fontSize="9">E</text>
    </g>
);

const Wire = ({ d, energized, color = '#ffeb3b' }) => (
    <path
        d={d}
        stroke={energized ? color : '#888'}
        strokeWidth={energized ? 3 : 2}
        fill="none"
        style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
    />
);

// === Breadboard SVG (visual reference) ===
const Breadboard = () => {
    const cols = 30;
    const rows = 5;
    const startX = 20;
    const startY = 60;
    const stepX = 14;
    const stepY = 14;

    return (
        <g>
            {/* Body */}
            <rect x="0" y="0" width="450" height="200" fill="#fafafa" stroke="#999" strokeWidth="1" rx="8" />
            {/* Power rails top */}
            <line x1="10" y1="20" x2="440" y2="20" stroke="#f44336" strokeWidth="0.6" />
            <line x1="10" y1="38" x2="440" y2="38" stroke="#1976d2" strokeWidth="0.6" />
            <text x="6" y="22" fill="#f44336" fontSize="9" fontWeight="bold">+</text>
            <text x="6" y="40" fill="#1976d2" fontSize="9" fontWeight="bold">−</text>
            {/* Holes top rails */}
            {Array.from({ length: cols }).map((_, c) => (
                <g key={`top-${c}`}>
                    <circle cx={startX + c * stepX} cy={20} r={1.5} fill="#444" />
                    <circle cx={startX + c * stepX} cy={38} r={1.5} fill="#444" />
                </g>
            ))}
            {/* Center valley */}
            <line x1="10" y1="120" x2="440" y2="120" stroke="#ccc" strokeWidth="6" />
            {/* Holes top group */}
            {Array.from({ length: cols }).map((_, c) =>
                Array.from({ length: rows }).map((_, r) => (
                    <circle key={`A-${c}-${r}`} cx={startX + c * stepX} cy={startY + r * stepY} r={1.3} fill="#444" />
                ))
            )}
            {/* Holes bottom group */}
            {Array.from({ length: cols }).map((_, c) =>
                Array.from({ length: rows }).map((_, r) => (
                    <circle key={`B-${c}-${r}`} cx={startX + c * stepX} cy={140 + r * stepY} r={1.3} fill="#444" />
                ))
            )}
            {/* Power rails bottom */}
            <line x1="10" y1="180" x2="440" y2="180" stroke="#1976d2" strokeWidth="0.6" />
            <text x="6" y="183" fill="#1976d2" fontSize="9" fontWeight="bold">−</text>
            {/* Column numbers */}
            <text x="20" y="56" fill="#bbb" fontSize="7">1</text>
            <text x="160" y="56" fill="#bbb" fontSize="7">10</text>
            <text x="300" y="56" fill="#bbb" fontSize="7">20</text>
        </g>
    );
};

// === Circuit definitions ===
const CIRCUITS = {
    led_basic: {
        name: '💡 LED + Resistencia',
        description: 'Circuito básico: pila 9V → resistencia → LED → masa. La resistencia limita la corriente para no quemar el LED.',
        params: { Vbat: 9, R: 470 },
        compute: ({ Vbat, R, sw }) => {
            const Vled = 2.0;
            const I_mA = sw ? Math.max(0, ((Vbat - Vled) / R) * 1000) : 0;
            const intensity = Math.min(1, I_mA / 20);
            return { I_mA, intensity, ledOn: sw && I_mA > 1, Vled };
        },
        render: ({ Vbat, R, sw, computed, onToggle }) => (
            <svg viewBox="0 0 480 320" style={{ width: '100%', height: 'auto', maxHeight: '420px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 50 80 L 50 40 L 200 40" energized={sw && computed.ledOn} />
                <Wire d="M 280 40 L 380 40 L 380 80" energized={sw && computed.ledOn} />
                <Wire d="M 380 240 L 380 280 L 50 280 L 50 240" energized={sw && computed.ledOn} />
                <Wire d="M 50 80 L 50 240" energized={sw && computed.ledOn} />
                <Wire d="M 380 80 L 380 130" energized={sw && computed.ledOn} />
                <Wire d="M 380 170 L 380 240" energized={sw && computed.ledOn} />
                <Battery x="50" y="160" voltage={Vbat} />
                <Resistor x="240" y="40" value={`${R}Ω`} current={computed.I_mA} />
                <LED x="380" y="150" on={computed.ledOn} intensity={computed.intensity} />
                <Switch x="150" y="280" closed={sw} onToggle={onToggle} />
            </svg>
        )
    },
    voltage_divider: {
        name: '📊 Divisor de tensión',
        description: 'Dos resistencias en serie generan una tensión intermedia (Vout = Vin × R2 / (R1 + R2)).',
        params: { Vin: 12, R1: 1000, R2: 2200 },
        compute: ({ Vin, R1, R2 }) => {
            const Vout = Vin * R2 / (R1 + R2);
            const I = (Vin / (R1 + R2)) * 1000;
            return { Vout, I };
        },
        render: ({ Vin, R1, R2, computed }) => (
            <svg viewBox="0 0 480 280" style={{ width: '100%', maxHeight: '380px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 50 80 L 50 40 L 240 40" energized={true} />
                <Wire d="M 240 60 L 240 100" energized={true} />
                <Wire d="M 240 140 L 240 240" energized={true} />
                <Wire d="M 240 240 L 50 240 L 50 200" energized={true} />
                <Wire d="M 240 120 L 360 120" energized={true} />
                <Battery x="50" y="140" voltage={Vin} />
                <Resistor x="240" y="80" value={`R1: ${R1}Ω`} current={computed.I} />
                <Resistor x="240" y="160" value={`R2: ${R2}Ω`} current={computed.I} />
                <circle cx="380" cy="120" r="6" fill="#4facfe" />
                <text x="395" y="124" fill="#4facfe" fontWeight="bold" fontSize="14">Vout = {computed.Vout.toFixed(2)} V</text>
            </svg>
        )
    },
    rc_circuit: {
        name: '⏱️ Circuito RC (carga)',
        description: 'Carga de un capacitor a través de una resistencia. Constante de tiempo τ = R·C.',
        params: { Vbat: 9, R: 10000, C_uF: 100 },
        compute: ({ Vbat, R, C_uF, t }) => {
            const C = C_uF * 1e-6;
            const tau = R * C;
            const Vc = Vbat * (1 - Math.exp(-t / tau));
            return { Vc, tau };
        },
        render: ({ Vbat, R, C_uF, computed, sw, onToggle, t }) => (
            <svg viewBox="0 0 480 280" style={{ width: '100%', maxHeight: '380px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 50 80 L 50 40 L 200 40" energized={sw} />
                <Wire d="M 280 40 L 380 40 L 380 110" energized={sw} />
                <Wire d="M 380 150 L 380 240 L 50 240 L 50 200" energized={true} />
                <Battery x="50" y="140" voltage={Vbat} />
                <Resistor x="240" y="40" value={`${R / 1000}kΩ`} />
                <Capacitor x="380" y="130" value={`${C_uF}µF`} />
                <Switch x="150" y="240" closed={sw} onToggle={onToggle} />
                <text x="240" y="260" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="bold">
                    Vc = {computed.Vc.toFixed(2)} V (t = {t.toFixed(1)} s)
                </text>
                <text x="240" y="278" textAnchor="middle" fill="#aaa" fontSize="11">
                    τ = R · C = {computed.tau.toFixed(2)} s
                </text>
            </svg>
        )
    },
    transistor_switch: {
        name: '🔄 Transistor como interruptor',
        description: 'Un transistor NPN amplifica una pequeña corriente de base para encender una carga (LED).',
        params: { Vbat: 9, Rb: 10000, Rc: 470 },
        compute: ({ Vbat, Rc, sw }) => {
            // muy simplificado: si la base está activa, transistor satura y LED prende
            const Vled = 2.0;
            const Vce_sat = 0.2;
            const I_mA = sw ? ((Vbat - Vled - Vce_sat) / Rc) * 1000 : 0;
            return { I_mA, ledOn: sw && I_mA > 1, intensity: Math.min(1, I_mA / 20) };
        },
        render: ({ Vbat, Rb, Rc, computed, sw, onToggle }) => (
            <svg viewBox="0 0 520 320" style={{ width: '100%', maxHeight: '420px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 80 80 L 80 40 L 380 40" energized={true} />
                <Wire d="M 380 40 L 380 110" energized={true} />
                <Wire d="M 380 150 L 380 180" energized={computed.ledOn} />
                <Wire d="M 380 220 L 380 270 L 80 270 L 80 200" energized={true} />
                <Wire d="M 200 270 L 200 200" energized={sw} />
                <Wire d="M 200 200 L 285 200" energized={sw} />
                <Wire d="M 320 200 L 360 200" energized={sw} />
                <Battery x="80" y="140" voltage={Vbat} />
                <Resistor x="250" y="200" value={`Rb=${Rb / 1000}kΩ`} />
                <Transistor x="380" y="200" conducting={computed.ledOn} />
                <Resistor x="380" y="130" value={`Rc=${Rc}Ω`} current={computed.I_mA} />
                <LED x="380" y="200" on={computed.ledOn} intensity={computed.intensity} color="#4caf50" />
                <Switch x="160" y="270" closed={sw} onToggle={onToggle} />
                <text x="260" y="305" textAnchor="middle" fill="#aaa" fontSize="11">
                    Pulsador en la base → habilita el transistor → enciende LED
                </text>
            </svg>
        )
    },
    diode_rect: {
        name: '🔁 Diodo (rectificador)',
        description: 'El diodo permite el paso de corriente solo en un sentido (de ánodo a cátodo).',
        params: { Vin: 9 },
        compute: ({ Vin, sw }) => {
            // sw true = polarización directa, sw false = inversa
            const conducting = sw && Vin > 0.7;
            const I_mA = conducting ? 15 : 0;
            return { conducting, I_mA, ledOn: conducting, intensity: 1 };
        },
        render: ({ Vin, computed, sw, onToggle }) => (
            <svg viewBox="0 0 480 280" style={{ width: '100%', maxHeight: '380px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 50 80 L 50 40 L 200 40" energized={computed.conducting} />
                <Wire d="M 280 40 L 380 40 L 380 110" energized={computed.conducting} />
                <Wire d="M 380 150 L 380 240 L 50 240 L 50 200" energized={computed.conducting} />
                <Battery x="50" y="140" voltage={Vin} />
                <Diode x="240" y="40" conducting={computed.conducting} />
                <LED x="380" y="130" on={computed.ledOn} intensity={computed.intensity} color="#ff9800" />
                <text x="240" y="270" textAnchor="middle" fill={computed.conducting ? '#4caf50' : '#f44336'} fontSize="14" fontWeight="bold">
                    {computed.conducting ? 'POLARIZACIÓN DIRECTA — conduce' : 'POLARIZACIÓN INVERSA — bloqueado'}
                </text>
                <foreignObject x="160" y="200" width="160" height="40">
                    <button
                        onClick={onToggle}
                        style={{ width: '100%', padding: '6px', background: sw ? '#4caf50' : '#f44336', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {sw ? '↪ Invertir polaridad' : '↩ Volver a directa'}
                    </button>
                </foreignObject>
            </svg>
        )
    },
    parallel_leds: {
        name: '💡💡💡 LEDs en paralelo',
        description: 'Tres LEDs en paralelo, cada uno con su propia resistencia limitadora.',
        params: { Vbat: 9, R: 470 },
        compute: ({ Vbat, R, sw }) => {
            const Vled = 2.0;
            const I_each = sw ? ((Vbat - Vled) / R) * 1000 : 0;
            return { I_each, I_total: I_each * 3, ledOn: sw && I_each > 1, intensity: Math.min(1, I_each / 20) };
        },
        render: ({ Vbat, R, computed, sw, onToggle }) => (
            <svg viewBox="0 0 540 320" style={{ width: '100%', maxHeight: '420px', background: '#1a1a2e', borderRadius: '12px' }}>
                <Wire d="M 60 80 L 60 40 L 460 40" energized={computed.ledOn} />
                <Wire d="M 460 40 L 460 290 L 60 290 L 60 200" energized={computed.ledOn} />
                {[160, 280, 400].map((x, i) => (
                    <g key={i}>
                        <Wire d={`M ${x} 40 L ${x} 90`} energized={computed.ledOn} />
                        <Wire d={`M ${x} 130 L ${x} 170`} energized={computed.ledOn} />
                        <Wire d={`M ${x} 200 L ${x} 290`} energized={computed.ledOn} />
                        <Resistor x={x} y={110} value={`${R}Ω`} current={computed.I_each} />
                        <LED x={x} y={185} on={computed.ledOn} intensity={computed.intensity} color={['#ff3b30', '#4caf50', '#4facfe'][i]} />
                    </g>
                ))}
                <Battery x="60" y="140" voltage={Vbat} />
                <Switch x="240" y="290" closed={sw} onToggle={onToggle} />
                <text x="270" y="316" textAnchor="middle" fill="#aaa" fontSize="11">
                    I total = {computed.I_total.toFixed(1)} mA · I por rama = {computed.I_each.toFixed(1)} mA
                </text>
            </svg>
        )
    }
};

const CircuitSimulatorPage = () => {
    const [active, setActive] = useState('led_basic');
    const [params, setParams] = useState(CIRCUITS.led_basic.params);
    const [sw, setSw] = useState(true);
    const [running, setRunning] = useState(true);
    const [t, setT] = useState(0);
    const tRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        setParams(CIRCUITS[active].params);
        setSw(true);
        setT(0);
        tRef.current = 0;
    }, [active]);

    // animate time for RC circuit
    useEffect(() => {
        if (active !== 'rc_circuit' || !running || !sw) return;
        let last = performance.now();
        const tick = (now) => {
            const dt = (now - last) / 1000;
            last = now;
            tRef.current += dt;
            setT(tRef.current);
            if (tRef.current < 30) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, running, sw]);

    const circuit = CIRCUITS[active];
    const computed = circuit.compute({ ...params, sw, t });

    const updateParam = (key, value) => {
        setParams(p => ({ ...p, [key]: value }));
    };

    const resetTime = () => {
        tRef.current = 0;
        setT(0);
    };

    return (
        <div className="electricity-container" style={{ maxWidth: '1300px' }}>
            <header className="electricity-header">
                <h1>🔌 Simulador de Circuitos</h1>
                <p>Simulación funcional con protoboard, componentes estándar (R, LED, capacitor, diodo, switch) y especiales (transistor BJT, buzzer).</p>
            </header>

            {/* Circuit selector */}
            <section className="elec-card full-width" style={{ marginBottom: '1rem' }}>
                <h2>📋 Elegí un circuito</h2>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {Object.entries(CIRCUITS).map(([key, c]) => (
                        <button
                            key={key}
                            className={`mat-btn ${active === key ? 'active' : ''}`}
                            onClick={() => setActive(key)}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
                <p style={{ marginTop: '0.75rem', color: '#aaa', fontSize: '0.9rem' }}>{circuit.description}</p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: '1rem' }}>
                {/* Schematic + breadboard */}
                <section className="elec-card" style={{ padding: '1rem' }}>
                    <h3 style={{ marginTop: 0, color: '#4facfe' }}>⚡ Esquema interactivo</h3>
                    {circuit.render({ ...params, sw, computed, onToggle: () => setSw(s => !s), t })}

                    <h3 style={{ color: '#4caf50', marginTop: '1rem' }}>🧰 Protoboard equivalente</h3>
                    <div style={{ background: '#0d1117', padding: '0.5rem', borderRadius: '10px' }}>
                        <svg viewBox="0 0 460 210" style={{ width: '100%', height: 'auto' }}>
                            <Breadboard />
                            <text x="230" y="18" textAnchor="middle" fill="#666" fontSize="9">
                                Vista de protoboard estándar (rieles + buses internos)
                            </text>
                        </svg>
                    </div>
                </section>

                {/* Controls */}
                <section className="elec-card" style={{ padding: '1rem' }}>
                    <h3 style={{ marginTop: 0, color: '#4facfe' }}>🎚️ Parámetros</h3>
                    {Object.keys(circuit.params).map(key => {
                        const isV = key.toLowerCase().startsWith('v');
                        const isR = key.toLowerCase().startsWith('r');
                        const isC = key.toLowerCase().includes('c_');
                        const min = isV ? 1 : isR ? 100 : isC ? 10 : 1;
                        const max = isV ? 24 : isR ? 100000 : isC ? 1000 : 100;
                        const step = isV ? 0.5 : isR ? 50 : isC ? 10 : 1;
                        return (
                            <div key={key} style={{ marginBottom: '1rem' }}>
                                <label style={{ color: '#fafafa', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                    {key} = <span style={{ color: '#ffeb3b' }}>{params[key]}{isV ? ' V' : isR ? ' Ω' : isC ? ' µF' : ''}</span>
                                </label>
                                <input
                                    type="range"
                                    min={min} max={max} step={step}
                                    value={params[key]}
                                    onChange={(e) => updateParam(key, Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        );
                    })}

                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0' }} />

                    <h3 style={{ color: '#a855f7' }}>📊 Resultados</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {Object.entries(computed).map(([key, val]) => {
                            if (typeof val === 'boolean') {
                                return (
                                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                                        <span>{key}</span>
                                        <span style={{ color: val ? '#4caf50' : '#f44336' }}>{val ? 'TRUE ✓' : 'FALSE'}</span>
                                    </div>
                                );
                            }
                            if (typeof val === 'number') {
                                return (
                                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                                        <span>{key}</span>
                                        <span style={{ color: '#ffeb3b', fontFamily: 'monospace' }}>{val.toFixed(3)}</span>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {active === 'rc_circuit' && (
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <button className="mat-btn" onClick={resetTime}>↺ Reiniciar tiempo</button>
                            <button className="mat-btn" onClick={() => setRunning(r => !r)}>
                                {running ? '⏸ Pausar' : '▶ Reanudar'}
                            </button>
                        </div>
                    )}

                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0' }} />

                    <h3 style={{ color: '#4caf50', fontSize: '1rem' }}>📦 Componentes en uso</h3>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#aaa' }}>
                        {active === 'led_basic' && (<>
                            <li>Pila 9 V (estándar)</li>
                            <li>Resistencia ¼W (estándar)</li>
                            <li>LED 5 mm rojo (estándar)</li>
                            <li>Pulsador (estándar)</li>
                        </>)}
                        {active === 'voltage_divider' && (<>
                            <li>Fuente DC regulable (estándar)</li>
                            <li>2× resistencias ¼W (estándar)</li>
                            <li>Punto de medición (sonda)</li>
                        </>)}
                        {active === 'rc_circuit' && (<>
                            <li>Pila 9 V (estándar)</li>
                            <li>Resistencia ¼W (estándar)</li>
                            <li>Capacitor electrolítico (especial — polarizado)</li>
                            <li>Pulsador (estándar)</li>
                        </>)}
                        {active === 'transistor_switch' && (<>
                            <li>Pila 9 V (estándar)</li>
                            <li>Transistor NPN BC548 (especial)</li>
                            <li>2× resistencias (Rb base, Rc colector)</li>
                            <li>LED (estándar)</li>
                            <li>Pulsador (estándar)</li>
                        </>)}
                        {active === 'diode_rect' && (<>
                            <li>Pila 9 V (estándar)</li>
                            <li>Diodo 1N4007 (especial)</li>
                            <li>LED (estándar)</li>
                        </>)}
                        {active === 'parallel_leds' && (<>
                            <li>Pila 9 V (estándar)</li>
                            <li>3× resistencias (estándar)</li>
                            <li>3× LEDs (rojo, verde, azul — estándar)</li>
                            <li>Pulsador (estándar)</li>
                        </>)}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default CircuitSimulatorPage;

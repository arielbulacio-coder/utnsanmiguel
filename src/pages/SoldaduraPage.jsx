import React, { useState, useEffect, useRef } from 'react';
import './ElectricityBasicsStyles.css';

const CautinAnatomySVG = () => (
    <svg viewBox="0 0 480 160" style={{ width: '100%', maxWidth: '520px', height: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* cable */}
        <path d="M10 90 Q 30 70 50 90 Q 70 110 90 90" stroke="#222" strokeWidth="6" fill="none" />
        {/* mango */}
        <rect x="90" y="75" width="170" height="30" rx="8" fill="#0d47a1" stroke="#1976d2" strokeWidth="2" />
        <rect x="100" y="80" width="150" height="6" fill="rgba(255,255,255,0.15)" rx="3" />
        {/* metal cap */}
        <rect x="260" y="70" width="40" height="40" rx="4" fill="#777" stroke="#aaa" strokeWidth="1" />
        {/* heating element */}
        <rect x="300" y="80" width="80" height="20" rx="3" fill="#bf360c" stroke="#e64a19" strokeWidth="1" />
        <circle cx="320" cy="90" r="2" fill="#ffeb3b" />
        <circle cx="340" cy="90" r="2" fill="#ffeb3b" />
        <circle cx="360" cy="90" r="2" fill="#ffeb3b" />
        {/* tip */}
        <polygon points="380,80 460,88 460,92 380,100" fill="#c0c0c0" stroke="#fafafa" strokeWidth="1" />
        <polygon points="455,87 472,90 455,93" fill="#ff9800" />
        {/* glow */}
        <circle cx="465" cy="90" r="14" fill="#ff5722" opacity="0.25" />

        {/* labels */}
        <line x1="40" y1="60" x2="40" y2="85" stroke="#4facfe" strokeWidth="1" />
        <text x="2" y="55" fill="#4facfe" fontSize="11" fontWeight="bold">Cable 220 V</text>

        <line x1="170" y1="60" x2="170" y2="75" stroke="#4caf50" strokeWidth="1" />
        <text x="125" y="55" fill="#4caf50" fontSize="11" fontWeight="bold">Mango aislante</text>

        <line x1="280" y1="60" x2="280" y2="70" stroke="#ffeb3b" strokeWidth="1" />
        <text x="245" y="55" fill="#ffeb3b" fontSize="11" fontWeight="bold">Tubo metálico</text>

        <line x1="340" y1="120" x2="340" y2="100" stroke="#e64a19" strokeWidth="1" />
        <text x="300" y="135" fill="#e64a19" fontSize="11" fontWeight="bold">Resistencia (calor)</text>

        <line x1="430" y1="120" x2="430" y2="100" stroke="#ff9800" strokeWidth="1" />
        <text x="400" y="135" fill="#ff9800" fontSize="11" fontWeight="bold">Punta (tip)</text>
    </svg>
);

const JointCrossSectionSVG = ({ type }) => {
    // type: 'bueno' | 'frio' | 'puente' | 'quemado'
    const presets = {
        bueno: { fill: '#c0c0c0', shape: 'M40 80 L80 80 Q100 80 100 50 Q100 30 90 30 L 90 80 Q90 50 60 50 Q40 50 40 80 Z', label: '✅ Volcán brillante', color: '#4caf50', desc: 'Forma cónica, brillante, simétrica.' },
        frio: { fill: '#888', shape: 'M40 80 L80 80 L80 60 L 75 60 L 75 70 L 70 60 L 60 60 L 60 70 L 50 60 L 40 80 Z', label: '❄️ Soldadura fría', color: '#f44336', desc: 'Opaca, irregular, sin brillo.' },
        puente: { fill: '#aaa', shape: 'M20 80 L150 80 L150 60 Q140 50 130 60 Q120 50 110 60 Q100 50 90 60 Q80 50 70 60 Q60 50 50 60 Q40 50 30 60 L20 80 Z', label: '🌉 Puente entre pads', color: '#ff9800', desc: 'Exceso de estaño une dos pistas.' },
        quemado: { fill: '#5d2e00', shape: 'M30 80 L 90 80 Q 95 80 95 65 Q 92 40 80 35 L 70 40 L 60 35 L 50 40 L 35 60 Z', label: '🔥 Junta quemada', color: '#bf360c', desc: 'Pad despegado, flux carbonizado.' }
    };
    const p = presets[type];
    return (
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
            <svg viewBox="0 0 180 110" style={{ width: '100%', maxWidth: '220px' }}>
                {/* PCB substrate */}
                <rect x="0" y="92" width="180" height="14" fill="#1a4d2e" />
                {/* Pad cobre */}
                <rect x="20" y="86" width="140" height="6" fill="#cd7f32" />
                {/* Terminal */}
                <rect x="83" y="20" width="4" height="72" fill="#888" />
                {/* Junta */}
                <path d={p.shape} fill={p.fill} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" transform="translate(20 0)" />
            </svg>
            <div style={{ color: p.color, fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.25rem' }}>{p.label}</div>
            <div style={{ color: '#aaa', fontSize: '0.75rem' }}>{p.desc}</div>
        </div>
    );
};

const StepSequenceSVG = () => (
    <svg viewBox="0 0 600 130" style={{ width: '100%', height: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {[
            { x: 20, t: 'Calentar', e: '🔥' },
            { x: 130, t: 'Estañar punta', e: '✨' },
            { x: 240, t: 'Apoyar 1-2 s', e: '👇' },
            { x: 360, t: 'Aplicar estaño', e: '🪙' },
            { x: 480, t: 'Retirar', e: '✋' }
        ].map((s, i) => (
            <g key={i}>
                <circle cx={s.x + 50} cy={50} r={32} fill="#0d47a1" stroke="#4facfe" strokeWidth="2" />
                <text x={s.x + 50} y={62} textAnchor="middle" fontSize="28">{s.e}</text>
                <text x={s.x + 50} y={105} textAnchor="middle" fill="#e0e0e0" fontSize="12" fontWeight="bold">{i + 1}. {s.t}</text>
                {i < 4 && (
                    <path d={`M${s.x + 84} 50 L${s.x + 110} 50`} stroke="#ffeb3b" strokeWidth="2" markerEnd="url(#arrow)" />
                )}
            </g>
        ))}
        <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#ffeb3b" />
            </marker>
        </defs>
    </svg>
);

const DesoldarToolSVG = ({ tool }) => {
    if (tool === 'bomba') {
        return (
            <svg viewBox="0 0 220 110" style={{ width: '100%', maxWidth: '220px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '0.4rem' }}>
                {/* Cuerpo bomba */}
                <rect x="20" y="40" width="120" height="22" fill="#1976d2" stroke="#0d47a1" strokeWidth="1" rx="3" />
                <rect x="140" y="44" width="40" height="14" fill="#f44336" rx="3" />
                <text x="160" y="55" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">PUSH</text>
                {/* Punta */}
                <polygon points="20,45 5,51 20,57" fill="#ddd" stroke="#aaa" />
                {/* Resorte */}
                <path d="M40 51 L50 47 L60 55 L70 47 L80 55 L90 47 L100 55 L110 47 L120 55" stroke="#fff" strokeWidth="1" fill="none" />
                {/* Estaño succionado */}
                <circle cx="12" cy="51" r="3" fill="#c0c0c0" />
                <text x="110" y="85" textAnchor="middle" fill="#4facfe" fontSize="10" fontWeight="bold">Bomba de succión</text>
            </svg>
        );
    }
    if (tool === 'malla') {
        return (
            <svg viewBox="0 0 220 110" style={{ width: '100%', maxWidth: '220px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '0.4rem' }}>
                {/* Carrete */}
                <circle cx="40" cy="55" r="22" fill="#0d47a1" stroke="#4facfe" strokeWidth="2" />
                <circle cx="40" cy="55" r="8" fill="#000" />
                {/* Malla */}
                <path d="M62 55 L210 55" stroke="#cd7f32" strokeWidth="6" />
                <path d="M62 55 L210 55" stroke="#fff" strokeWidth="1" strokeDasharray="2 1" />
                {/* PCB pad */}
                <rect x="170" y="80" width="40" height="6" fill="#1a4d2e" />
                <rect x="180" y="74" width="20" height="6" fill="#cd7f32" />
                <text x="110" y="95" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">Malla de desoldar (wick)</text>
            </svg>
        );
    }
    if (tool === 'aire') {
        return (
            <svg viewBox="0 0 220 110" style={{ width: '100%', maxWidth: '220px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '0.4rem' }}>
                {/* Pistola */}
                <rect x="20" y="35" width="100" height="30" fill="#37474f" rx="4" />
                <rect x="120" y="42" width="40" height="16" fill="#90a4ae" rx="2" />
                <rect x="40" y="65" width="22" height="35" fill="#37474f" rx="3" />
                {/* Aire caliente */}
                <path d="M165 50 Q175 45 185 50" stroke="#ff5722" strokeWidth="2" fill="none" />
                <path d="M165 55 Q180 50 195 55" stroke="#ff9800" strokeWidth="2" fill="none" />
                <path d="M165 60 Q175 65 185 60" stroke="#ffc107" strokeWidth="2" fill="none" />
                <text x="190" y="40" fill="#ff5722" fontSize="14">♨</text>
                <text x="110" y="105" textAnchor="middle" fill="#ff9800" fontSize="10" fontWeight="bold">Pistola aire caliente</text>
            </svg>
        );
    }
    return null;
};

const SoldaduraPage = () => {
    const [section, setSection] = useState('teoria');

    // Simulador estado
    const [power, setPower] = useState(false);
    const [watts, setWatts] = useState(40);
    const [tipTemp, setTipTemp] = useState(25);
    const [tinned, setTinned] = useState(false);
    const [tipDirty, setTipDirty] = useState(false);
    const [contact, setContact] = useState(false);
    const [solderApplied, setSolderApplied] = useState(false);
    const [contactSeconds, setContactSeconds] = useState(0);
    const [jointState, setJointState] = useState('vacio'); // vacio | calentando | aplicando | retirando | bueno | frio | quemado | puente
    const [feedback, setFeedback] = useState('');
    const intervalRef = useRef(null);

    // Calentamiento del cautín
    useEffect(() => {
        const target = power ? (watts >= 40 ? 380 : 320) : 25;
        const step = power ? (watts >= 40 ? 8 : 6) : -10;
        const id = setInterval(() => {
            setTipTemp((prev) => {
                if (power && prev < target) return Math.min(prev + step, target);
                if (!power && prev > 25) return Math.max(prev - 4, 25);
                return prev;
            });
        }, 200);
        return () => clearInterval(id);
    }, [power, watts]);

    // Suciedad de la punta con uso prolongado
    useEffect(() => {
        if (tipTemp > 350 && power) {
            const id = setTimeout(() => setTipDirty(true), 8000);
            return () => clearTimeout(id);
        }
    }, [tipTemp, power]);

    // Cronómetro de contacto
    useEffect(() => {
        if (contact) {
            intervalRef.current = setInterval(() => {
                setContactSeconds((s) => s + 0.1);
            }, 100);
        } else {
            clearInterval(intervalRef.current);
            setContactSeconds(0);
        }
        return () => clearInterval(intervalRef.current);
    }, [contact]);

    // Lógica de la junta
    useEffect(() => {
        if (!contact) {
            if (jointState === 'aplicando' || jointState === 'calentando') {
                evaluarJunta();
            }
            return;
        }

        if (tipTemp < 280) {
            setJointState('frio');
            setFeedback('❌ El cautín no está suficientemente caliente. La unión quedará fría (opaca, granulada).');
            return;
        }

        if (tipDirty && !solderApplied) {
            setFeedback('⚠️ La punta está sucia (oxidada). Limpiá con esponja húmeda antes de soldar.');
        }

        if (contactSeconds < 1.5) {
            setJointState('calentando');
            setFeedback('🔥 Calentando pad + terminal del componente... Mantené 1-2 segundos antes de aplicar estaño.');
        } else if (contactSeconds >= 1.5 && contactSeconds < 4 && solderApplied) {
            setJointState('aplicando');
            setFeedback('✅ Buen momento: el estaño fluye hacia la zona caliente.');
        } else if (contactSeconds >= 6) {
            setJointState('quemado');
            setFeedback('🔥🔥 ¡Demasiado tiempo! Riesgo de dañar el componente o despegar la pista.');
        }
    }, [contactSeconds, contact, tipTemp, tipDirty, solderApplied, jointState]);

    const evaluarJunta = () => {
        if (tipTemp < 280) {
            setJointState('frio');
            setFeedback('❌ Soldadura fría: punta a baja temperatura. Repetí calentando primero.');
            return;
        }
        if (contactSeconds >= 1.5 && contactSeconds <= 4 && solderApplied && tinned) {
            setJointState('bueno');
            setFeedback('🏆 ¡Excelente! Forma de volcán, brillante y simétrica. Soldadura correcta.');
        } else if (!solderApplied) {
            setJointState('vacio');
            setFeedback('Aplicá estaño después de calentar el pad.');
        } else if (contactSeconds < 1.5 && solderApplied) {
            setJointState('frio');
            setFeedback('❌ Soldadura fría: el estaño no llegó a fluir bien. Calentá más antes de aplicar.');
        } else if (contactSeconds > 6) {
            setJointState('quemado');
            setFeedback('🔥 Quemada: posible daño al componente o pista despegada.');
        }
    };

    const limpiarPunta = () => {
        setTipDirty(false);
        setFeedback('🧽 Punta limpia con esponja húmeda.');
    };

    const estanarPunta = () => {
        if (tipTemp < 300) {
            setFeedback('⚠️ Calentá el cautín primero (mín. 300°C).');
            return;
        }
        setTinned(true);
        setFeedback('✨ Punta estañada: una capa fina de estaño protege y conduce mejor el calor.');
    };

    const reset = () => {
        setContact(false);
        setSolderApplied(false);
        setJointState('vacio');
        setContactSeconds(0);
        setFeedback('');
    };

    const jointColor = {
        vacio: '#666',
        calentando: '#ff9800',
        aplicando: '#ffeb3b',
        bueno: '#c0c0c0',
        frio: '#888',
        quemado: '#5d2e00',
        puente: '#aaa'
    };

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>🔥 Soldadura Electrónica</h1>
                <p>Soldador tipo lápiz de 30/40W: técnica, simulación interactiva y errores comunes.</p>
            </header>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <button className={`mat-btn ${section === 'teoria' ? 'active' : ''}`} onClick={() => setSection('teoria')}>📘 Teoría</button>
                <button className={`mat-btn ${section === 'tecnica' ? 'active' : ''}`} onClick={() => setSection('tecnica')}>🛠️ Técnica paso a paso</button>
                <button className={`mat-btn ${section === 'simulador' ? 'active' : ''}`} onClick={() => setSection('simulador')}>🎮 Simulador</button>
                <button className={`mat-btn ${section === 'errores' ? 'active' : ''}`} onClick={() => setSection('errores')}>⚠️ Errores</button>
                <button className={`mat-btn ${section === 'desoldar' ? 'active' : ''}`} onClick={() => setSection('desoldar')}>🔄 Desoldar</button>
            </div>

            <div className="electricity-grid">

                {section === 'teoria' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>El soldador tipo lápiz</h2>
                            <p>El <strong>soldador (cautín) tipo lápiz</strong> es la herramienta básica para soldar componentes electrónicos. Su nombre viene de su forma alargada y delgada, similar a un lápiz, que permite gran precisión.</p>

                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                <CautinAnatomySVG />
                            </div>
                            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>📐 Anatomía del cautín tipo lápiz: cable, mango aislante, tubo metálico, resistencia interna y punta.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#4facfe' }}>30 W</h3>
                                    <p>Ideal para electrónica fina: PCB, componentes SMD, cables delgados. Bajo riesgo de dañar el componente.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#ffeb3b' }}>40 W</h3>
                                    <p>Uso general: pads más grandes, tierra (GND) en placas con planos de cobre amplios, cables medianos. Más versátil.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#f44336' }}>{'>'} 60 W</h3>
                                    <p>Para chapa, conectores grandes o cables gruesos. <strong>NO</strong> usar en electrónica fina: quema componentes y despega pistas.</p>
                                </div>
                            </div>
                        </section>

                        <section className="elec-card full-width">
                            <h2>Partes del soldador</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>🔌 Cable de red:</strong> alimenta la resistencia interna desde 220 V.</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>🔥 Resistencia (elemento calefactor):</strong> transforma la corriente eléctrica en calor (efecto Joule).</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>📐 Mango aislante:</strong> protege la mano del calor (madera, plástico técnico o cerámica).</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>✏️ Punta (tip):</strong> generalmente de cobre con baño de hierro/níquel. Es la parte que transfiere calor al pad.</li>
                            </ul>
                        </section>

                        <section className="elec-card full-width">
                            <h2>Materiales necesarios</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🪙 Estaño (60/40 o 63/37)</strong>
                                    <p>Aleación Sn-Pb. La 60/40 es la más común; la 63/37 es eutéctica (cambio sólido-líquido instantáneo). Diámetro 0.8-1 mm para electrónica.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🧪 Flux (resina)</strong>
                                    <p>Limpia el óxido y mejora la adherencia. Suele venir incluido en el alma del estaño ("rosin core").</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🧽 Esponja húmeda</strong>
                                    <p>Para limpiar la punta entre soldaduras. Mantenerla siempre húmeda con agua destilada.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🥽 Gafas de seguridad</strong>
                                    <p>Las salpicaduras de estaño y flux pueden saltar a los ojos. Uso obligatorio.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🌬️ Ventilación</strong>
                                    <p>El humo del flux es irritante. Trabajar en lugar ventilado o con extractor.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🪃 Soporte (cradle)</strong>
                                    <p>Base con espiral metálica para apoyar el cautín caliente sin riesgo de quemaduras o incendios.</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {section === 'tecnica' && (
                    <section className="elec-card full-width">
                        <h2>Técnica correcta: paso a paso</h2>

                        <div style={{ margin: '1rem 0' }}>
                            <StepSequenceSVG />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                            <JointCrossSectionSVG type="bueno" />
                            <JointCrossSectionSVG type="frio" />
                        </div>

                        <ol style={{ paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>1. Calentar el cautín</strong> (~30-60 s). Una punta lista trabaja entre <strong>320 y 380 °C</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>2. Estañar la punta:</strong> aplicar una pequeña cantidad de estaño en la punta caliente. Esto crea una capa que conduce mejor el calor y evita oxidación.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>3. Limpiar la punta:</strong> pasarla por la esponja húmeda. Debe quedar brillante y plateada.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>4. Apoyar la punta sobre el pad y el terminal del componente al mismo tiempo</strong>. Calentar ambas superficies durante <strong>1-2 segundos</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>5. Aplicar el estaño del lado opuesto</strong> a la punta del cautín. El estaño debe fundirse por contacto con el pad caliente, no con la punta.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>6. Retirar el estaño primero, luego el cautín</strong>. Tiempo total: 3-4 segundos por unión.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>7. No mover el componente</strong> hasta que el estaño solidifique (1-2 s). Una buena junta tiene forma de <strong>volcán brillante</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>8. Cortar el sobrante</strong> del terminal con cortadora de electrónica, cerca de la junta.
                            </li>
                        </ol>

                        <div className="highlight" style={{ marginTop: '1rem' }}>
                            🏆 Regla de oro: <em>"calentar el pad, no el estaño"</em>. El estaño debe fluir por capilaridad sobre superficie caliente.
                        </div>
                    </section>
                )}

                {section === 'simulador' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>🎮 Simulador de soldadura</h2>
                            <p>Practicá la técnica controlando temperatura, tiempo y aplicación de estaño.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#4facfe' }}>⚙️ Cautín</h3>
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <label>Potencia: </label>
                                        <button className={`mat-btn ${watts === 30 ? 'active' : ''}`} onClick={() => setWatts(30)}>30 W</button>
                                        <button className={`mat-btn ${watts === 40 ? 'active' : ''}`} onClick={() => setWatts(40)}>40 W</button>
                                    </div>
                                    <button className="mat-btn" style={{ background: power ? '#f44336' : '#4caf50', width: '100%' }} onClick={() => setPower(!power)}>
                                        {power ? '⏻ Apagar' : '⏻ Encender'}
                                    </button>

                                    <div style={{ marginTop: '1rem', textAlign: 'center', padding: '1rem', background: '#000', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '2rem', color: tipTemp > 350 ? '#f44336' : tipTemp > 280 ? '#ff9800' : tipTemp > 100 ? '#ffeb3b' : '#666' }}>
                                            🌡️ {Math.round(tipTemp)} °C
                                        </div>
                                        <small style={{ color: tipTemp > 350 ? '#4caf50' : '#aaa' }}>
                                            {tipTemp < 100 ? 'Frío' : tipTemp < 280 ? 'Calentando...' : tipTemp < 350 ? 'Casi listo' : 'Listo para soldar ✅'}
                                        </small>
                                    </div>

                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <button className="mat-btn" onClick={limpiarPunta} disabled={!tipDirty}>🧽 Limpiar punta {tipDirty && '(sucia)'}</button>
                                        <button className="mat-btn" onClick={estanarPunta} disabled={tinned}>✨ Estañar punta {tinned && '✓'}</button>
                                    </div>

                                    {tipDirty && <div style={{ marginTop: '0.5rem', color: '#f44336', fontSize: '0.85rem' }}>⚠️ Punta oxidada: rendimiento reducido.</div>}
                                </div>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#ffeb3b' }}>🔧 Acciones de soldado</h3>
                                    <button
                                        className="mat-btn"
                                        style={{ width: '100%', marginBottom: '0.5rem', background: contact ? '#ff9800' : '#444' }}
                                        onMouseDown={() => setContact(true)}
                                        onMouseUp={() => setContact(false)}
                                        onMouseLeave={() => setContact(false)}
                                        onTouchStart={() => setContact(true)}
                                        onTouchEnd={() => setContact(false)}
                                        disabled={!power}
                                    >
                                        {contact ? `🔥 Apoyando... ${contactSeconds.toFixed(1)} s` : '👇 Mantener: Apoyar punta sobre pad'}
                                    </button>

                                    <button
                                        className="mat-btn"
                                        style={{ width: '100%', marginBottom: '0.5rem', background: solderApplied ? '#4caf50' : '#444' }}
                                        onClick={() => setSolderApplied(!solderApplied)}
                                        disabled={!contact}
                                    >
                                        🪙 {solderApplied ? 'Estaño aplicado ✓' : 'Aplicar estaño'}
                                    </button>

                                    <button className="mat-btn" style={{ width: '100%' }} onClick={reset}>↺ Reiniciar junta</button>
                                </div>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#a855f7' }}>🔬 Junta soldada</h3>
                                    <div style={{ height: '160px', background: '#1a1a1a', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                        {/* PCB pad */}
                                        <div style={{ position: 'absolute', bottom: '40px', width: '60%', height: '8px', background: '#1a4d2e', borderRadius: '2px' }}></div>
                                        {/* Terminal */}
                                        <div style={{ position: 'absolute', bottom: '40px', width: '4px', height: '60px', background: '#888' }}></div>
                                        {/* Soldadura */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '44px',
                                            width: jointState === 'bueno' ? '40px' : jointState === 'puente' ? '80px' : '20px',
                                            height: jointState === 'bueno' ? '24px' : jointState === 'frio' ? '14px' : jointState === 'quemado' ? '30px' : '0',
                                            background: jointColor[jointState],
                                            borderRadius: jointState === 'bueno' ? '50% 50% 20% 20% / 80% 80% 20% 20%' : '4px',
                                            boxShadow: jointState === 'bueno' ? '0 0 12px rgba(192,192,192,0.6)' : 'none',
                                            transition: 'all 0.3s'
                                        }}></div>
                                        {/* Cautín */}
                                        {contact && (
                                            <div style={{ position: 'absolute', top: '10px', fontSize: '2.5rem', transform: 'rotate(-30deg)' }}>🖋️</div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '4px', width: '100%', textAlign: 'center', color: '#666', fontSize: '0.75rem' }}>PCB</div>
                                    </div>
                                    <div style={{ marginTop: '0.5rem', textAlign: 'center', fontWeight: 'bold', color: jointColor[jointState] }}>
                                        Estado: {jointState.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {feedback && (
                                <div className="highlight" style={{ marginTop: '1rem', textAlign: 'left' }}>
                                    {feedback}
                                </div>
                            )}
                        </section>

                        <section className="elec-card full-width">
                            <h3>📋 Cómo usar el simulador</h3>
                            <ol>
                                <li>Encendé el cautín y esperá que llegue a {'>'} 350°C.</li>
                                <li>Estañá la punta (capa fina protectora).</li>
                                <li>Mantené presionado <em>"Apoyar punta sobre pad"</em> durante 1-2 s para calentar.</li>
                                <li>Sin soltar el botón anterior, hacé clic en <em>"Aplicar estaño"</em>.</li>
                                <li>Soltá ambos. Una junta correcta = forma de volcán brillante.</li>
                            </ol>
                        </section>
                    </>
                )}

                {section === 'errores' && (
                    <section className="elec-card full-width">
                        <h2>⚠️ Errores comunes y cómo evitarlos</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                            <JointCrossSectionSVG type="bueno" />
                            <JointCrossSectionSVG type="frio" />
                            <JointCrossSectionSVG type="puente" />
                            <JointCrossSectionSVG type="quemado" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.5rem' }}>
                                <img src={`${import.meta.env.BASE_URL || '/'}proj_soldadura_ok.png`.replace('//', '/')} alt="Soldadura correcta" style={{ width: '100%', maxWidth: '320px', borderRadius: '8px' }} />
                                <div style={{ color: '#4caf50', fontWeight: 'bold', marginTop: '0.5rem' }}>✅ Junta correcta</div>
                            </div>
                            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.5rem' }}>
                                <img src={`${import.meta.env.BASE_URL || '/'}proj_soldadura_error.png`.replace('//', '/')} alt="Soldadura defectuosa" style={{ width: '100%', maxWidth: '320px', borderRadius: '8px' }} />
                                <div style={{ color: '#f44336', fontWeight: 'bold', marginTop: '0.5rem' }}>❌ Junta defectuosa</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>❄️ Soldadura fría</h3>
                                <p><strong>Síntoma:</strong> superficie opaca, granulada, agrietada.</p>
                                <p><strong>Causa:</strong> punta poco caliente o tiempo insuficiente.</p>
                                <p><strong>Solución:</strong> recalentar la junta y agregar un poco de estaño/flux fresco.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🔥 Junta quemada</h3>
                                <p><strong>Síntoma:</strong> pad despegado, componente decolorado, flux carbonizado.</p>
                                <p><strong>Causa:</strong> demasiado tiempo de contacto o cautín de potencia excesiva.</p>
                                <p><strong>Solución:</strong> usar 30-40 W en electrónica fina, máx. 4 s por junta.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🌉 Puente entre pads</h3>
                                <p><strong>Síntoma:</strong> exceso de estaño que une dos pistas.</p>
                                <p><strong>Causa:</strong> demasiado estaño o pads muy cercanos.</p>
                                <p><strong>Solución:</strong> retirar con malla de desoldar (wick) o bomba de succión.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🟫 Punta oxidada</h3>
                                <p><strong>Síntoma:</strong> punta negruzca, no acepta estaño, baja transferencia de calor.</p>
                                <p><strong>Causa:</strong> uso prolongado sin estañar, esponja seca.</p>
                                <p><strong>Solución:</strong> limpiar con esponja húmeda + estañar inmediatamente. Si está muy dañada, lijar suavemente y re-estañar.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🧊 Movimiento durante enfriado</h3>
                                <p><strong>Síntoma:</strong> superficie agrietada o con "pelos".</p>
                                <p><strong>Causa:</strong> mover el componente antes de que el estaño solidifique.</p>
                                <p><strong>Solución:</strong> mantener firme 2 s después de retirar el cautín.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>💨 Quemar componentes sensibles</h3>
                                <p><strong>Síntoma:</strong> componentes (LED, IC) que no funcionan tras soldar.</p>
                                <p><strong>Causa:</strong> calor excesivo en patillas sensibles.</p>
                                <p><strong>Solución:</strong> usar zócalo (socket) para ICs y disipadores tipo cocodrilo en LEDs/diodos durante el soldado.</p>
                            </div>
                        </div>
                    </section>
                )}

                {section === 'desoldar' && (
                    <section className="elec-card full-width">
                        <h2>🔄 Desoldado: cómo retirar componentes</h2>
                        <p>Desoldar permite reparar placas, recuperar componentes o corregir errores de montaje.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                            <DesoldarToolSVG tool="bomba" />
                            <DesoldarToolSVG tool="malla" />
                            <DesoldarToolSVG tool="aire" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#4facfe' }}>🥢 Bomba de desoldar (chupador)</h3>
                                <p>Dispositivo de succión a resorte. Se carga el émbolo, se calienta la junta con el cautín y al disparar absorbe el estaño líquido.</p>
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    <li>Cargar el émbolo (clic).</li>
                                    <li>Calentar la junta con el cautín hasta licuar el estaño.</li>
                                    <li>Apoyar la boquilla justo al lado y disparar.</li>
                                    <li>Limpiar la boquilla y repetir si queda residuo.</li>
                                </ol>
                                <p><strong>Tip:</strong> agregar un poco de estaño fresco antes de succionar facilita el proceso (renueva el flux).</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#a855f7' }}>🧶 Malla de desoldar (solder wick)</h3>
                                <p>Malla de cobre trenzada impregnada con flux. Por capilaridad absorbe el estaño fundido.</p>
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    <li>Apoyar la malla sobre la junta.</li>
                                    <li>Apoyar el cautín caliente sobre la malla.</li>
                                    <li>El estaño sube a la malla por capilaridad.</li>
                                    <li>Cortar el tramo usado y descartar.</li>
                                </ol>
                                <p><strong>Tip:</strong> ideal para limpiar puentes y restos finos en pads SMD.</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#ffeb3b' }}>♨️ Pistola de aire caliente</h3>
                                <p>Para componentes SMD: calienta uniformemente toda la zona hasta que todas las patillas se sueltan.</p>
                                <p><strong>Cuidado:</strong> proteger componentes vecinos con cinta Kapton, ajustar temperatura (300-350 °C) y caudal moderado.</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#f44336' }}>🚫 Lo que NO hay que hacer</h3>
                                <ul>
                                    <li>Tirar del componente con fuerza estando frío → despega pistas.</li>
                                    <li>Insistir más de 5-6 s sobre la misma junta → quema el sustrato (FR4).</li>
                                    <li>Reutilizar bomba sucia sin limpiar → traba el émbolo.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default SoldaduraPage;

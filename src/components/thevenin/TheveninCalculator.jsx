import React, { useState, useEffect } from 'react';

const TheveninCalculator = () => {
    // Simple voltage divider scenario: Vs - R1 - R2 (find Vth and Rth at R2)
    const [vs, setVs] = useState(12); // Source voltage
    const [r1, setR1] = useState(1000); // R1 in ohms
    const [r2, setR2] = useState(2000); // R2 in ohms
    const [vth, setVth] = useState(0);
    const [rth, setRth] = useState(0);

    useEffect(() => {
        calculateThevenin();
    }, [vs, r1, r2]);

    const calculateThevenin = () => {
        const r1Val = parseFloat(r1) || 0;
        const r2Val = parseFloat(r2) || 0;
        const vsVal = parseFloat(vs) || 0;

        // Vth = voltage across R2 (voltage divider)
        const totalR = r1Val + r2Val;
        const vthCalc = totalR > 0 ? (vsVal * r2Val) / totalR : 0;

        // Rth = R1 || R2 (parallel combination when Vs is shorted)
        const rthCalc = (r1Val > 0 && r2Val > 0) ? (r1Val * r2Val) / (r1Val + r2Val) : 0;

        setVth(vthCalc);
        setRth(rthCalc);
    };

    const formatResistance = (val) => {
        if (val >= 1000000) return (val / 1000000).toFixed(2) + ' MΩ';
        if (val >= 1000) return (val / 1000).toFixed(2) + ' kΩ';
        return val.toFixed(2) + ' Ω';
    };

    return (
        <div className="glass-card section-container">
            <h2>Calculadora de Thévenin</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-dim)' }}>
                Circuito divisor de tensión simple: Calcula el equivalente de Thévenin visto desde los terminales de R2.
            </p>

            {/* Circuit Diagram */}
            <div style={{ margin: '2rem auto', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', maxWidth: '400px' }}>
                <svg width="100%" height="200" viewBox="0 0 300 200">
                    {/* Voltage Source */}
                    <circle cx="50" cy="100" r="20" fill="none" stroke="#ff0055" strokeWidth="2" />
                    <text x="40" y="105" fill="#ff0055" fontSize="12" fontWeight="bold">Vs</text>

                    {/* Wire from source */}
                    <line x1="70" y1="100" x2="100" y2="100" stroke="#fff" strokeWidth="2" />

                    {/* R1 */}
                    <rect x="100" y="90" width="60" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                    <text x="120" y="85" fill="#00f2ff" fontSize="12">R1</text>

                    {/* Wire to R2 */}
                    <line x1="160" y1="100" x2="200" y2="100" stroke="#fff" strokeWidth="2" />

                    {/* Node marker */}
                    <circle cx="200" cy="100" r="4" fill="#ffff00" />
                    <text x="205" y="95" fill="#ffff00" fontSize="12" fontWeight="bold">A</text>

                    {/* R2 vertical */}
                    <line x1="200" y1="100" x2="200" y2="130" stroke="#fff" strokeWidth="2" />
                    <rect x="190" y="130" width="20" height="40" fill="none" stroke="#00f2ff" strokeWidth="2" />
                    <text x="215" y="150" fill="#00f2ff" fontSize="12">R2</text>
                    <line x1="200" y1="170" x2="200" y2="180" stroke="#fff" strokeWidth="2" />

                    {/* Ground */}
                    <line x1="180" y1="180" x2="220" y2="180" stroke="#fff" strokeWidth="2" />
                    <line x1="185" y1="185" x2="215" y2="185" stroke="#fff" strokeWidth="2" />
                    <line x1="190" y1="190" x2="210" y2="190" stroke="#fff" strokeWidth="2" />
                    <text x="205" y="195" fill="#fff" fontSize="12" fontWeight="bold">B</text>

                    {/* Return wire */}
                    <line x1="50" y1="120" x2="50" y2="180" stroke="#fff" strokeWidth="2" />
                    <line x1="50" y1="180" x2="200" y2="180" stroke="#fff" strokeWidth="2" />
                </svg>
            </div>

            {/* Input Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Voltaje Fuente (Vs)</label>
                    <input
                        type="number"
                        value={vs}
                        onChange={(e) => setVs(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                        }}
                        step="0.1"
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Volts</span>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Resistencia R1</label>
                    <input
                        type="number"
                        value={r1}
                        onChange={(e) => setR1(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                        }}
                        step="1"
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Ohms (Ω)</span>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Resistencia R2</label>
                    <input
                        type="number"
                        value={r2}
                        onChange={(e) => setR2(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                        }}
                        step="1"
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Ohms (Ω)</span>
                </div>
            </div>

            {/* Results */}
            <div className="grid-responsive-2col">
                <div className="result-display">
                    <div className="result-label">Voltaje de Thévenin (V<sub>th</sub>)</div>
                    <div className="result-value">{vth.toFixed(2)} V</div>
                </div>

                <div className="result-display">
                    <div className="result-label">Resistencia de Thévenin (R<sub>th</sub>)</div>
                    <div className="result-value">{formatResistance(rth)}</div>
                </div>
            </div>

            {/* Explanation */}
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.9rem' }}>
                <strong>Cálculos:</strong>
                <div style={{ marginTop: '0.5rem' }}>
                    • V<sub>th</sub> = Vs × (R2 / (R1 + R2)) = {vs} × ({r2} / {parseFloat(r1) + parseFloat(r2)}) = {vth.toFixed(2)} V
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    • R<sub>th</sub> = R1 || R2 = (R1 × R2) / (R1 + R2) = {formatResistance(rth)}
                </div>
            </div>
        </div>
    );
};

export default TheveninCalculator;

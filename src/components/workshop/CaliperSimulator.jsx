import React, { useState } from 'react';

const CaliperSimulator = () => {
    const [value, setValue] = useState(0); // 0 to 100 mm

    const handleSliderChange = (e) => {
        setValue(parseFloat(e.target.value));
    };

    // Calculations for the reading (0.05 mm precision)
    const mmEnteros = Math.floor(value);
    const nonioIdx = Math.round((value % 1) / 0.05);
    const fraccion = (nonioIdx * 0.05).toFixed(2);

    // SVG scaling and positioning
    // 1mm = 10px in the SVG
    const mainScaleX = 50;
    const slidingX = mainScaleX + (value * 10);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Calibre (Pie de Rey)</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Desliza para mover la mordaza móvil y observa el nonio</p>

            <div style={{
                overflowX: 'auto',
                background: '#333',
                padding: '3rem 1rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <svg width="1200" height="300" viewBox="0 0 1200 300">
                    {/* Main Rule (Regla Fija) */}
                    <g id="main-rule">
                        <rect x="0" y="80" width="1150" height="80" fill="#bbb" stroke="#444" strokeWidth="1" />

                        {/* Permanent Jaw (Mordaza Fija) */}
                        <path d="M 0 80 L 0 250 L 50 250 L 50 160 Z" fill="#bbb" stroke="#444" />
                        <path d="M 0 80 L 0 20 L 30 20 L 50 80 Z" fill="#bbb" stroke="#444" />

                        {/* Graduations Main Rule */}
                        {[...Array(111)].map((_, i) => (
                            <g key={`main-${i}`}>
                                <line
                                    x1={mainScaleX + i * 10}
                                    y1="160"
                                    x2={mainScaleX + i * 10}
                                    y2={i % 10 === 0 ? "130" : (i % 5 === 0 ? "140" : "150")}
                                    stroke="#000"
                                    strokeWidth={i % 5 === 0 ? "1.5" : "0.8"}
                                />
                                {i % 10 === 0 && (
                                    <text x={mainScaleX + i * 10} y="120" fontSize="14" textAnchor="middle" fill="#000" fontWeight="bold">{i / 10}</text>
                                )}
                            </g>
                        ))}
                    </g>

                    {/* Sliding Part (Corredera) */}
                    <g transform={`translate(${slidingX - mainScaleX}, 0)`}>
                        <defs>
                            <linearGradient id="sliderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ccc', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#eee', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#ccc', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Body of the slider */}
                        <rect x="0" y="70" width="220" height="180" fill="url(#sliderGrad)" stroke="#444" strokeWidth="1" rx="5" fillOpacity="0.9" />

                        {/* Sliding Jaw (Mordaza Móvil) */}
                        <path d="M 0 160 L 0 250 L 50 250 L 50 250 Z" fill="#eee" stroke="#444" /> {/* Modified for visual alignment */}
                        <path d="M 0 160 L 0 250 L -50 250 L -50 250 Z" /> {/* Invisible placeholder */}

                        {/* Actual Jaws */}
                        <path d="M 0 160 L 0 250 L -40 250 L -10 160 Z" fill="#eee" stroke="#444" />
                        <path d="M 0 80 L 0 20 L -30 20 L -10 80 Z" fill="#eee" stroke="#444" />

                        {/* Nonio (Escala móvil) */}
                        <rect x="10" y="170" width="200" height="60" fill="#ddd" stroke="#666" rx="3" />
                        <line x1="10" y1="170" x2="210" y2="170" stroke="#000" strokeWidth="2" />

                        {/* Nonio Graduations (0.05mm x 20 divisions = 19mm total length usually in real calipers to create the vernier effect) */}
                        {/* In this simplified sim, we use 20 divisions covering 19mm or similar to show the alignment */}
                        {[...Array(21)].map((_, i) => {
                            // The 0 of nonio is at 0 of sliding part relative to the start of the Rule
                            const nonioX = 10 + (i * 9.5); // 20 divisions in 19mm
                            return (
                                <g key={`nonio-${i}`}>
                                    <line
                                        x1={nonioX}
                                        y1="170"
                                        x2={nonioX}
                                        y2={i % 2 === 0 ? "195" : "185"}
                                        stroke={i === nonioIdx ? "var(--primary-color)" : "#000"}
                                        strokeWidth={i === nonioIdx ? "2.5" : "1.2"}
                                    />
                                    {i % 2 === 0 && (
                                        <text x={nonioX} y="215" fontSize="12" textAnchor="middle" fill="#000" fontWeight={i === nonioIdx ? "bold" : "normal"}>{i / 2}</text>
                                    )}
                                </g>
                            );
                        })}

                        {/* Reference Arrow for 0 */}
                        <path d="M 10 170 L 5 160 L 15 160 Z" fill="var(--primary-color)" />
                    </g>
                </svg>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="input-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Desplazamiento Mordaza:</span>
                        <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>{value.toFixed(2)} mm</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.05"
                        value={value}
                        onChange={handleSliderChange}
                        style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
                    />
                </div>

                <div className="grid-responsive-2col" style={{ marginTop: '2rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', borderTop: '4px solid var(--secondary-color)' }}>
                        <div className="result-label">Regla Fija (mm)</div>
                        <div className="result-value" style={{ fontSize: '1.5rem' }}>{mmEnteros}</div>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', borderTop: '4px solid var(--primary-color)' }}>
                        <div className="result-label">Nonio (centésimas)</div>
                        <div className="result-value" style={{ fontSize: '1.5rem' }}>{fraccion}</div>
                    </div>
                </div>

                <div className="result-display" style={{ marginTop: '2rem' }}>
                    <div className="result-label">LECTURA TOTAL</div>
                    <div className="result-value" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>
                        {value.toFixed(2)}
                        <span style={{ fontSize: '0.4em', marginLeft: '0.5rem', color: 'var(--text-dim)' }}>mm</span>
                    </div>
                </div>

                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    * Precisión del simulador: 0.05 mm
                </p>
            </div>
        </div>
    );
};

export default CaliperSimulator;

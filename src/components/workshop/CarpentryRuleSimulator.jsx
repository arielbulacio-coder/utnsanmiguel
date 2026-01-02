import React, { useState } from 'react';

const CarpentryRuleSimulator = () => {
    const [value, setValue] = useState(0); // Initial value 0cm

    const handleSliderChange = (e) => {
        setValue(parseFloat(e.target.value));
    };

    // SVG scaling: 1cm = 20px
    const scale = 20;
    const ruleLeadIn = 10; // 10px of wood before the 0 mark
    const ruleWidth = 200 * scale + ruleLeadIn; // 200cm + lead-in
    const viewWidth = 800;
    const viewHeight = 200;

    // Center the reading point (the red marker is at 400px)
    // The 0 mark is at ruleLeadIn pixels from the rule start
    const scrollX = 400 - (value * scale) - ruleLeadIn;

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Metro Plegable</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Desliza para simular la medición sobre una pieza de madera</p>

            <div style={{
                overflow: 'hidden',
                background: 'var(--glass-bg)',
                padding: '2rem 0',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`} style={{ display: 'block', margin: '0 auto' }}>
                    {/* Measurement Marker (Reference Point at 400px) */}
                    <line x1="400" y1="0" x2="400" y2={viewHeight} stroke="#e63946" strokeWidth="3" strokeDasharray="5,5" />
                    <polygon points="390,0 410,0 400,15" fill="#e63946" />
                    <polygon points="390,200 410,200 400,185" fill="#e63946" />

                    <g transform={`translate(${scrollX}, 0)`}>
                        {/* The Wood Rule */}
                        <rect x="0" y="50" width={ruleWidth} height="100" fill="#f4a261" stroke="#bc6c25" strokeWidth="2" rx="4" />

                        {/* Grain effect (subtle lines) */}
                        {[...Array(100)].map((_, i) => (
                            <line
                                key={`grain-${i}`}
                                x1={ruleLeadIn + i * 40} y1="60"
                                x2={ruleLeadIn + (i * 40) + 30} y2="60"
                                stroke="#bc6c25"
                                strokeOpacity="0.3"
                                strokeWidth="1"
                                transform={`rotate(${i % 2 === 0 ? 0.5 : -0.5}, ${ruleLeadIn + i * 40}, 60)`}
                            />
                        ))}

                        {/* Marks */}
                        {[...Array(2001)].map((_, i) => {
                            const x = ruleLeadIn + i * (scale / 10); // each mm
                            const isCm = i % 10 === 0;
                            const isHalfCm = i % 5 === 0 && !isCm;
                            const isDecimeter = i % 100 === 0;

                            if (x < -scrollX || x > -scrollX + viewWidth + 100) return null;

                            return (
                                <g key={`mark-${i}`}>
                                    <line
                                        x1={x}
                                        y1="50"
                                        x2={x}
                                        y2={isDecimeter ? 90 : (isCm ? 80 : (isHalfCm ? 70 : 65))}
                                        stroke="#000"
                                        strokeWidth={isCm ? 1.5 : 0.8}
                                    />
                                    {isCm && (
                                        <text
                                            x={x}
                                            y="110"
                                            fontSize={isDecimeter ? "16" : "12"}
                                            fontWeight={isDecimeter ? "bold" : "normal"}
                                            textAnchor="middle"
                                            fill="#222"
                                        >
                                            {i / 10}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {/* Hinges (Simulated every 20cm) */}
                        {[...Array(11)].map((_, i) => (
                            <circle
                                key={`hinge-${i}`}
                                cx={ruleLeadIn + i * 20 * scale}
                                cy="100"
                                r="6"
                                fill="#8d99ae"
                                stroke="#2b2d42"
                            />
                        ))}
                    </g>
                </svg>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="input-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Ajuste de posición:</span>
                        <span style={{ color: '#bc6c25', fontWeight: 'bold', fontSize: '1.2rem' }}>{value.toFixed(1)} cm</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        step="0.1"
                        value={value}
                        onChange={handleSliderChange}
                        style={{ width: '100%', accentColor: '#bc6c25', cursor: 'pointer' }}
                    />
                </div>

                <div className="result-display" style={{ marginTop: '2rem', background: 'rgba(244, 162, 97, 0.1)', borderColor: '#f4a261' }}>
                    <div className="result-label" style={{ color: '#bc6c25' }}>MEDIDA</div>
                    <div className="result-value" style={{ fontSize: '3.5rem', color: '#222' }}>
                        {value.toFixed(1)}
                        <span style={{ fontSize: '0.4em', marginLeft: '0.5rem' }}>cm</span>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                        ({(value / 100).toFixed(2)} metros)
                    </div>
                </div>

                <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'left', borderLeft: '4px solid #bc6c25' }}>
                    <h4 style={{ margin: 0, color: '#bc6c25' }}>💡 Tip del Carpintero</h4>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                        Para máxima precisión, coloca el metro de canto (perpendicular a la superficie) para que las marcas de graduación toquen directamente la madera.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarpentryRuleSimulator;

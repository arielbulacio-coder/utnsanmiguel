import React, { useState } from 'react';

const MicrometerSimulator = () => {
    const [value, setValue] = useState(0); // 0 to 25 mm

    const handleSliderChange = (e) => {
        setValue(parseFloat(e.target.value));
    };

    // Calculations for the reading
    const mmEnteros = Math.floor(value);
    const medioMm = value % 1 >= 0.5 ? 0.5 : 0;
    const tamborPart = (value % 0.5).toFixed(2);
    const tamborCentimas = Math.round((value % 0.5) * 100);

    // SVG scaling and positioning
    // 1mm = 25px in the SVG for better visibility
    const scale = 25;
    const sleeveX = 100;
    const thimbleEdgeOffset = 20; // Thimble edge is -20px from its group X
    const thimbleX = sleeveX + (value * scale) + thimbleEdgeOffset;

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Micrómetro</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Desliza para ajustar la medida y observa las escalas</p>

            <div style={{
                overflowX: 'auto',
                background: '#222',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <svg width="900" height="250" viewBox="0 0 900 250">
                    {/* Frame (Parte de la "C") */}
                    <path d="M 0 40 L 0 210 L 80 210 L 80 180 Q 20 180 20 125 Q 20 70 80 70 L 80 40 Z" fill="#444" transform="translate(20, 0)" />

                    {/* Fixed Anvil (Yunque) - Face at sleeveX */}
                    <rect x={sleeveX - 30} y="110" width="30" height="30" fill="#bbb" stroke="#000" />

                    {/* Sleeve (Cuerpo fijo) */}
                    <rect x={sleeveX} y="100" width="600" height="50" fill="#999" stroke="#444" strokeWidth="2" />
                    <line x1={sleeveX} y1="125" x2={sleeveX + 600} y2="125" stroke="#000" strokeWidth="2" />

                    {/* Sleeve Graduation */}
                    {[...Array(26)].map((_, i) => (
                        <g key={`mm-${i}`}>
                            <line x1={sleeveX + i * scale} y1="125" x2={sleeveX + i * scale} y2="105" stroke="#000" strokeWidth="1.5" />
                            <text x={sleeveX + i * scale} y="95" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">{i}</text>
                            {i < 25 && (
                                <line x1={sleeveX + i * scale + (scale / 2)} y1="125" x2={sleeveX + i * scale + (scale / 2)} y2="140" stroke="#000" strokeWidth="1" />
                            )}
                        </g>
                    ))}

                    {/* Spindle (Vástago móvil) - Attached to thimble */}
                    <rect x={sleeveX} y="110" width={value * scale} height="30" fill="#eee" stroke="#000" />

                    {/* Thimble (Tambor móvil) */}
                    <g transform={`translate(${thimbleX}, 0)`}>
                        <defs>
                            <linearGradient id="thimbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#bbb', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#bbb', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Thimble Body */}
                        <rect x="0" y="50" width="150" height="150" fill="url(#thimbleGrad)" stroke="#444" strokeWidth="2" rx="5" />

                        {/* Beveled edge (borde biselado) - Edge is at -thimbleEdgeOffset */}
                        <path d={`M 0 50 L -${thimbleEdgeOffset} 70 L -${thimbleEdgeOffset} 180 L 0 200 Z`} fill="#aaa" stroke="#444" />

                        {/* Thimble Graduation - Dynamic based on rotation */}
                        <g transform={`translate(0, 125)`}>
                            {[...Array(51)].map((_, i) => {
                                const markVal = i;
                                const offset = ((tamborCentimas - markVal + 75) % 50) - 25;
                                const yPos = offset * 8; // Adjust density of marks

                                if (Math.abs(yPos) > 65) return null;

                                return (
                                    <g key={`t-${i}`}>
                                        <line x1={-thimbleEdgeOffset} y1={yPos} x2="15" y2={yPos} stroke="#000" strokeWidth={markVal % 5 === 0 ? 1.5 : 0.8} />
                                        {markVal % 5 === 0 && (
                                            <text x="20" y={yPos + 4} fontSize="11" fill="#000" fontWeight="bold">{markVal}</text>
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </g>
                </svg>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="input-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Ajuste de Medida:</span>
                        <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>{value.toFixed(2)} mm</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="25"
                        step="0.01"
                        value={value}
                        onChange={handleSliderChange}
                        style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
                    />
                </div>

                <div className="grid-responsive-2col" style={{ marginTop: '2rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem' }}>
                        <div className="result-label">Cuerpo (mm)</div>
                        <div className="result-value" style={{ fontSize: '1.5rem' }}>{mmEnteros}</div>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem' }}>
                        <div className="result-label">Medio mm</div>
                        <div className="result-value" style={{ fontSize: '1.5rem' }}>{medioMm.toFixed(1)}</div>
                    </div>
                </div>
                <div className="glass-card" style={{ marginTop: '1rem', padding: '1rem' }}>
                    <div className="result-label">Tambor (centésimas)</div>
                    <div className="result-value" style={{ fontSize: '1.5rem' }}>{tamborPart}</div>
                </div>

                <div className="result-display" style={{ marginTop: '2rem' }}>
                    <div className="result-label">Lectura Total</div>
                    <div className="result-value" style={{ fontSize: '2.5rem' }}>
                        {value.toFixed(2)}
                        <span style={{ fontSize: '0.4em', marginLeft: '0.5rem' }}>mm</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MicrometerSimulator;

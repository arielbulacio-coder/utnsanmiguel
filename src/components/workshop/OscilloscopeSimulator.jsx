import React, { useState, useEffect, useRef } from 'react';

const OscilloscopeSimulator = () => {
    // Basic Controls
    const [amplitude, setAmplitude] = useState(2); // Volts
    const [frequency, setFrequency] = useState(1); // Hz for sim (relative)
    const [offset, setOffset] = useState(0); // Y position
    const [waveType, setWaveType] = useState('sine'); // sine, square, triangle

    // Display Settings (Divisions)
    const [voltsDiv, setVoltsDiv] = useState(1);
    const [timeDiv, setTimeDiv] = useState(0.5);

    const [triggerEnabled, setTriggerEnabled] = useState(true);
    const [triggerLevel, setTriggerLevel] = useState(0);

    // Animation State
    const [time, setTime] = useState(0);
    const requestRef = useRef();

    const animate = (t) => {
        setTime(t / 1000); // converting to seconds
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    // SVG Constants
    const width = 600;
    const height = 400;
    const margin = 20;
    const gridDivsX = 10;
    const gridDivsY = 8;
    const pixelsPerDivX = (width - 2 * margin) / gridDivsX;
    const pixelsPerDivY = (height - 2 * margin) / gridDivsY;

    // Helper to calculate the wave value at any time 't'
    const getWaveValue = (t, type, amp, freq) => {
        const w = 2 * Math.PI * freq;
        if (type === 'sine') return amp * Math.sin(w * t);
        if (type === 'square') return amp * (Math.sin(w * t) >= 0 ? 1 : -1);
        if (type === 'triangle') return (2 * amp / Math.PI) * Math.asin(Math.sin(w * t));
        return 0;
    };

    // Wave Function Generators
    const generatePath = () => {
        let path = "";
        const points = 200;
        const widthReal = width - 2 * margin;
        const step = widthReal / points;

        const w = 2 * Math.PI * frequency;

        // TRIGGER LOGIC
        // We find a start time 't0' such that Wave(t0) is approximately triggerLevel
        let t0 = time;
        if (triggerEnabled && Math.abs(triggerLevel) <= amplitude) {
            // Frequency is 'frequency' Hz, Period is 1/frequency.
            // We search in the current period for the rising edge crossing.
            // For simplicity in this sim, we calculate the phase offset directly.
            if (waveType === 'sine') {
                t0 = Math.asin(triggerLevel / amplitude) / w;
            } else if (waveType === 'square') {
                t0 = 0; // Square wave starts at 0 rising
            } else if (waveType === 'triangle') {
                // Triangle: -1 to 1 in T/2, 1 to -1 in T/2
                // We want the rising part. 
                // asin(sin(w*t)) is the triangle shape
                t0 = Math.asin(triggerLevel / amplitude) / w;
            }
        }

        for (let i = 0; i <= points; i++) {
            const x = margin + i * step;
            // Map x to time relative to timeDiv
            const t_val = t0 + (i / points) * gridDivsX * timeDiv;

            const y_val = getWaveValue(t_val, waveType, amplitude, frequency);

            const py = (height / 2) - (y_val / voltsDiv * pixelsPerDivY) - (offset * pixelsPerDivY);

            if (i === 0) path += `M ${x} ${py}`;
            else path += ` L ${x} ${py}`;
        }
        return path;
    };

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Osciloscopio Digital</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Visualización de señales en tiempo real</p>

            <div className="grid-responsive-2col" style={{ alignItems: 'start' }}>
                {/* Screen Area */}
                <div style={{
                    background: '#0a1a0a',
                    borderRadius: '12px',
                    padding: '10px',
                    border: '8px solid #333',
                    boxShadow: 'inset 0 0 50px rgba(0, 255, 0, 0.1), 0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    <svg width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
                        {/* Background Grid */}
                        <defs>
                            <pattern id="grid" width={pixelsPerDivX} height={pixelsPerDivY} patternUnits="userSpaceOnUse">
                                <path d={`M ${pixelsPerDivX} 0 L 0 0 0 ${pixelsPerDivY}`} fill="none" stroke="#1a3a1a" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect x={margin} y={margin} width={width - 2 * margin} height={height - 2 * margin} fill="url(#grid)" />

                        {/* Axes */}
                        <line x1={margin} y1={height / 2} x2={width - margin} y2={height / 2} stroke="#2a4a2a" strokeWidth="2" />
                        <line x1={width / 2} y1={margin} x2={width / 2} y2={height - margin} stroke="#2a4a2a" strokeWidth="2" />

                        {/* Signal Path */}
                        <path
                            d={generatePath()}
                            fill="none"
                            stroke="#00ff00"
                            strokeWidth="3"
                            strokeLinecap="round"
                            style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.8))' }}
                        />

                        {/* Trigger Level Line */}
                        {triggerEnabled && (
                            <line
                                x1={margin}
                                y1={(height / 2) - (triggerLevel / voltsDiv * pixelsPerDivY) - (offset * pixelsPerDivY)}
                                x2={width - margin}
                                y2={(height / 2) - (triggerLevel / voltsDiv * pixelsPerDivY) - (offset * pixelsPerDivY)}
                                stroke="#ff0000"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                                style={{ opacity: 0.7 }}
                            />
                        )}

                        {/* On-screen Info */}
                        <text x={margin + 10} y={height - margin - 10} fill="#00ff00" fontSize="14" fontFamily="monospace">
                            CH1: {voltsDiv}V/div | Time: {timeDiv}s/div | Trig: {triggerEnabled ? `${triggerLevel}V` : 'OFF'}
                        </text>
                    </svg>
                </div>

                {/* Controls Area */}
                <div className="glass-card" style={{ margin: 0, padding: '1.5rem', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Panel de Control</h3>

                    {/* Trigger Control */}
                    <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ff0000' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <strong style={{ fontSize: '0.9rem' }}>Sincronismo (Trigger)</strong>
                            <button
                                onClick={() => setTriggerEnabled(!triggerEnabled)}
                                style={{
                                    padding: '2px 10px',
                                    background: triggerEnabled ? '#ff0000' : 'transparent',
                                    color: triggerEnabled ? '#fff' : '#ff0000',
                                    border: '1px solid #ff0000',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {triggerEnabled ? 'ESTABLE' : 'AUTO/FREE'}
                            </button>
                        </div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>Nivel de Disparo: {triggerLevel.toFixed(1)}V</label>
                        <input
                            type="range" min="-5" max="5" step="0.1"
                            disabled={!triggerEnabled}
                            value={triggerLevel}
                            onChange={(e) => setTriggerLevel(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: '#ff0000' }}
                        />
                    </div>

                    {/* Amplitude */}
                    <div className="input-group">
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Amplitud (Vpk):</span>
                            <span style={{ color: 'var(--primary-color)' }}>{amplitude} V</span>
                        </label>
                        <input type="range" min="0.1" max="5" step="0.1" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} style={{ width: '100%' }} />
                    </div>

                    {/* Frequency */}
                    <div className="input-group">
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Frecuencia:</span>
                            <span style={{ color: 'var(--primary-color)' }}>{frequency} Hz</span>
                        </label>
                        <input type="range" min="0.1" max="10" step="0.1" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} style={{ width: '100%' }} />
                    </div>

                    {/* Scale Controls */}
                    <div className="grid-responsive-2col" style={{ gap: '1rem', marginTop: '1rem' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Volts/Div</label>
                            <select value={voltsDiv} onChange={(e) => setVoltsDiv(parseFloat(e.target.value))} className="glass-card" style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}>
                                <option value="0.5">0.5V</option>
                                <option value="1">1.0V</option>
                                <option value="2">2.0V</option>
                                <option value="5">5.0V</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Time/Div</label>
                            <select value={timeDiv} onChange={(e) => setTimeDiv(parseFloat(e.target.value))} className="glass-card" style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}>
                                <option value="0.1">0.1s</option>
                                <option value="0.2">0.2s</option>
                                <option value="0.5">0.5s</option>
                                <option value="1">1.0s</option>
                            </select>
                        </div>
                    </div>

                    {/* Wave Type */}
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Tipo de Onda</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['sine', 'square', 'triangle'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setWaveType(type)}
                                    className="glass-card"
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        margin: 0,
                                        background: waveType === type ? 'var(--primary-color)' : 'transparent',
                                        color: waveType === type ? '#000' : 'var(--text-main)',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Offset */}
                    <div className="input-group" style={{ marginTop: '1.5rem' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Posición Vertical (Offset)</label>
                        <input type="range" min="-3" max="3" step="0.1" value={offset} onChange={(e) => setOffset(parseFloat(e.target.value))} style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OscilloscopeSimulator;

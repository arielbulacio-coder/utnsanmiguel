import React, { useState, useEffect } from 'react';

const AnalogMultimeter = () => {
    const [mode, setMode] = useState('OFF');
    const [targetValue, setTargetValue] = useState(0);
    const [currentAngle, setCurrentAngle] = useState(-50); // Needle at rest (left)

    // Scale ranges
    const scales = [
        { id: 'OFF', label: 'OFF', color: '#333', angle: -50 },
        { id: 'DCV10', label: '10V ⎓', type: 'DCV', max: 10, angle: -30 },
        { id: 'DCV50', label: '50V ⎓', type: 'DCV', max: 50, angle: -10 },
        { id: 'ACV250', label: '250V ~', type: 'ACV', max: 250, angle: 10 },
        { id: 'OHM', label: 'x10 Ω', type: 'OHM', max: 1000, angle: 30 }
    ];

    // Objects to measure
    const testSources = [
        { name: 'Batería 9V', type: 'DCV', value: 9.2 },
        { name: 'Pila 1.5V', type: 'DCV', value: 1.55 },
        { name: 'Enchufe', type: 'ACV', value: 220 },
        { name: 'Resistor 220Ω', type: 'OHM', value: 220 }
    ];

    const [selectedObject, setSelectedObject] = useState(null);

    useEffect(() => {
        let val = 0;
        let angle = -50; // Neutral left position

        if (mode !== 'OFF' && selectedObject) {
            const currentScale = scales.find(s => s.id === mode);

            // Check if types match
            if (currentScale.type === selectedObject.type) {
                // Calculate needle position
                // Full scale is roughly from -45 to +45 degrees
                // Needles on analog meters usually travel 90-100 degrees

                let ratio = selectedObject.value / currentScale.max;
                if (ratio > 1.1) ratio = 1.1; // Pegged needle (danger!)

                if (currentScale.type === 'OHM') {
                    // Ohm scale is reversed and non-linear on analog meters
                    // For sim, let's just make it look linear-ish but reversed
                    angle = 45 - (ratio * 90);
                } else {
                    angle = -45 + (ratio * 90);
                }
            }
        }

        setTargetValue(angle);
    }, [mode, selectedObject]);

    // Smooth needle animation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAngle(prev => {
                const diff = targetValue - prev;
                if (Math.abs(diff) < 0.1) return targetValue;
                return prev + diff * 0.15; // Damping
            });
        }, 20);
        return () => clearInterval(interval);
    }, [targetValue]);

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary-color)' }}>Tester Analógico</h3>
            <p style={{ fontSize: '0.9rem' }}>Los instrumentos analógicos requieren interpretar la posición de la aguja sobre múltiples escalas.</p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>

                {/* Meter Body */}
                <div style={{
                    width: '320px',
                    height: '380px',
                    background: '#2b2d42',
                    borderRadius: '15px',
                    padding: '15px',
                    border: '5px solid #1a1a1a',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Analog Face */}
                    <div style={{
                        width: '100%',
                        height: '180px',
                        background: '#f8f9fa',
                        borderRadius: '5px',
                        border: '3px solid #111',
                        position: 'relative',
                        overflow: 'hidden',
                        marginBottom: '20px'
                    }}>
                        <svg viewBox="0 0 200 120" width="100%" height="100%">
                            {/* Scale Arcs */}
                            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#222" strokeWidth="1" />
                            <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" stroke="#ef4444" strokeWidth="1" />

                            {/* Scale Ticks */}
                            {[...Array(11)].map((_, i) => {
                                const angle = -Math.PI + (i * Math.PI / 10);
                                const x1 = 100 + 75 * Math.cos(angle);
                                const y1 = 100 + 75 * Math.sin(angle);
                                const x2 = 100 + 85 * Math.cos(angle);
                                const y2 = 100 + 85 * Math.sin(angle);
                                return (
                                    <g key={i}>
                                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#222" strokeWidth="1" />
                                        <text
                                            x={100 + 95 * Math.cos(angle)}
                                            y={100 + 95 * Math.sin(angle)}
                                            fontSize="6"
                                            textAnchor="middle"
                                            fill="#222"
                                            transform={`rotate(${(i * 18) - 90}, ${100 + 95 * Math.cos(angle)}, ${100 + 95 * Math.sin(angle)})`}
                                        >
                                            {i * 10}
                                        </text>
                                    </g>
                                );
                            })}

                            <text x="100" y="40" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">DCV / ACV</text>
                            <text x="50" y="80" textAnchor="middle" fontSize="6" fill="#ef4444">OHMS (Scale Reversed)</text>

                            {/* Pointer (Needle) */}
                            <line
                                x1="100" y1="105"
                                x2={100 + 85 * Math.sin(currentAngle * Math.PI / 180)}
                                y2={105 - 85 * Math.cos(currentAngle * Math.PI / 180)}
                                stroke="#d00"
                                strokeWidth="1.5"
                                style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}
                            />

                            {/* Pivot point */}
                            <circle cx="100" cy="105" r="5" fill="#111" />
                        </svg>
                    </div>

                    {/* Analog Rotary Dial */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: '#333',
                        borderRadius: '50%',
                        position: 'relative',
                        border: '4px solid #000'
                    }}>
                        {scales.map((s, i) => {
                            const angle = (i * (360 / scales.length)) - 90;
                            const isActive = mode === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setMode(s.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(75px) rotate(${-angle}deg)`,
                                        background: isActive ? 'var(--primary-color)' : '#444',
                                        color: isActive ? '#000' : '#ccc',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '2px 5px',
                                        fontSize: '0.7rem',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {s.label}
                                </button>
                            );
                        })}
                        {/* Selector indicator */}
                        <div style={{
                            width: '40px',
                            height: '6px',
                            background: '#fff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transformOrigin: 'left center',
                            transform: `translate(0, -50%) rotate(${scales.findIndex(s => s.id === mode) * (360 / scales.length) - 90}deg)`,
                            borderRadius: '0 3px 3px 0'
                        }}></div>
                    </div>
                </div>

                {/* Object Selector */}
                <div style={{ textAlign: 'left', minWidth: '250px' }}>
                    <h4>Puntos de Prueba</h4>
                    <p style={{ fontSize: '0.8rem' }}>Selecciona un elemento para medir con las puntas:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {testSources.map(src => (
                            <button
                                key={src.name}
                                onClick={() => setSelectedObject(src)}
                                className="glass-card"
                                style={{
                                    margin: 0,
                                    padding: '0.8rem',
                                    textAlign: 'left',
                                    background: selectedObject?.name === src.name ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
                                    border: selectedObject?.name === src.name ? '1px solid var(--primary-color)' : '1px solid var(--glass-border)',
                                    cursor: 'pointer'
                                }}
                            >
                                {src.name}
                            </button>
                        ))}
                    </div>

                    {selectedObject && (
                        <div className="glass-card" style={{ marginTop: '1rem', borderLeft: '3px solid var(--primary-color)' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem' }}><strong>Estado:</strong> Puntas conectadas a {selectedObject.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalogMultimeter;

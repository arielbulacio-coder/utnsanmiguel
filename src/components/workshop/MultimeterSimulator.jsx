import React, { useState } from 'react';

const MultimeterSimulator = () => {
    const [mode, setMode] = useState('OFF');
    const [value, setValue] = useState(0);
    const [isMeasuring, setIsMeasuring] = useState(false);

    const modes = [
        { label: 'OFF', color: '#333', unit: '' },
        { label: '600 V~', color: '#eab308', unit: 'V AC', min: 215, max: 225 },
        { label: '20 V⎓', color: '#ef4444', unit: 'V DC', min: 12.0, max: 12.6 },
        { label: '2000 Ω', color: '#3b82f6', unit: 'Ω', min: 980, max: 1020 },
        { label: 'Cont 🔊', color: '#10b981', unit: '', min: 0, max: 0 }
    ];

    const handleDialClick = (selectedMode) => {
        setMode(selectedMode.label);
        if (selectedMode.label === 'OFF') {
            setValue(0);
            setIsMeasuring(false);
        } else {
            setIsMeasuring(true);
            // Simulate a slightly noisy reading
            const baseValue = selectedMode.min + Math.random() * (selectedMode.max - selectedMode.min);
            setValue(baseValue);
        }
    };

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Multímetro Digital</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Selecciona una función para realizar una medición simulada</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>

                {/* Multimeter Body */}
                <div style={{
                    width: '260px',
                    height: '450px',
                    background: '#facc15', // Yellow industrial body
                    borderRadius: '30px',
                    padding: '20px',
                    border: '10px solid #ca8a04',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    position: 'relative',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* LCD Screen */}
                    <div style={{
                        width: '100%',
                        height: '100px',
                        background: '#94a3b8',
                        borderRadius: '10px',
                        border: '5px solid #334155',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: mode === 'OFF' ? '#71717a' : '#0f172a',
                        fontFamily: '"Digital-7", monospace',
                        position: 'relative',
                        marginBottom: '30px',
                        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>
                            {mode === 'OFF' ? '' : (mode === 'Cont 🔊' ? '0.00' : value.toFixed(mode === '2000 Ω' ? 0 : 2))}
                        </div>
                        <div style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {modes.find(m => m.label === mode)?.unit}
                        </div>
                        {mode === 'Cont 🔊' && <div style={{ position: 'absolute', top: '5px', left: '10px' }}>🔊</div>}
                    </div>

                    {/* Rotary Selector */}
                    <div style={{
                        width: '160px',
                        height: '160px',
                        background: '#333',
                        borderRadius: '50%',
                        position: 'relative',
                        border: '4px solid #1a1a1a',
                        marginBottom: '40px'
                    }}>
                        {modes.map((m, i) => {
                            const angle = (i * (360 / modes.length)) - 90;
                            const isActive = mode === m.label;
                            return (
                                <button
                                    key={m.label}
                                    onClick={() => handleDialClick(m)}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(95px) rotate(${-angle}deg)`,
                                        background: isActive ? m.color : '#444',
                                        color: isActive ? '#fff' : '#ccc',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '5px 8px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        boxShadow: isActive ? `0 0 10px ${m.color}` : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {m.label}
                                </button>
                            );
                        })}

                        {/* Dial Pointer */}
                        <div style={{
                            width: '80px',
                            height: '10px',
                            background: '#fff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transformOrigin: 'left center',
                            transform: `translate(0, -50%) rotate(${modes.findIndex(m => m.label === mode) * (360 / modes.length) - 90}deg)`,
                            borderRadius: '0 5px 5px 0',
                            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}></div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: '#1a1a1a',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            border: '4px solid #444'
                        }}></div>
                    </div>

                    {/* Jack Ports */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '35px', height: '35px', background: '#111', borderRadius: '50%', border: '4px solid #555' }}></div>
                            <small style={{ fontWeight: 'bold', fontSize: '0.7rem' }}>COM</small>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '35px', height: '35px', background: '#111', borderRadius: '50%', border: '4px solid #ef4444' }}></div>
                            <small style={{ fontWeight: 'bold', fontSize: '0.7rem', color: '#ef4444' }}>V/Ω</small>
                        </div>
                    </div>
                </div>

                {/* Simulation Context Information */}
                <div style={{ maxWidth: '400px', textAlign: 'left' }}>
                    <div className="glass-card" style={{ margin: 0 }}>
                        <h3 style={{ color: 'var(--primary-color)' }}>Datos de Medición</h3>
                        <p style={{ fontSize: '0.9rem' }}>
                            Dependiendo del modo seleccionado, el simulador muestra un valor típico:
                        </p>
                        <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            <li><strong>600 V~:</strong> Medición en un tomacorriente (220V aprox).</li>
                            <li><strong>20 V⎓:</strong> Medición en una batería de auto (12.6V).</li>
                            <li><strong>2000 Ω:</strong> Medición de una resistencia de 1kΩ.</li>
                            <li><strong>Continuidad:</strong> Verifica si un cable no está cortado (Beep!).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultimeterSimulator;

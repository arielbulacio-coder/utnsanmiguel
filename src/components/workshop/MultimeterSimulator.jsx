import React, { useState } from 'react';
import AnalogMultimeter from './AnalogMultimeter';

const MultimeterSimulator = () => {
    const [view, setView] = useState('digital'); // 'digital' or 'analog'
    const [mode, setMode] = useState('OFF');
    const [value, setValue] = useState(0);
    const [selectedObject, setSelectedObject] = useState(null);

    const testSources = [
        { name: 'Batería 9V', type: 'DC', value: 9.18 },
        { name: 'Pila AAA', type: 'DC', value: 1.52 },
        { name: 'Enchufe Pared', type: 'AC', value: 221.5 },
        { name: 'Resistencia 1kΩ', type: 'OHM', value: 998 },
        { name: 'Cable Sano', type: 'CONT', value: 0.1 }
    ];

    const modes = [
        { label: 'OFF', color: '#333', unit: '', type: 'OFF' },
        { label: '600 V~', color: '#eab308', unit: 'V AC', type: 'AC' },
        { label: '20 V⎓', color: '#ef4444', unit: 'V DC', type: 'DC' },
        { label: '2000 Ω', color: '#3b82f6', unit: 'Ω', type: 'OHM' },
        { label: 'Cont 🔊', color: '#10b981', unit: '', type: 'CONT' }
    ];

    const handleDialClick = (selectedMode) => {
        setMode(selectedMode.label);
        updateMeasurement(selectedMode.label, selectedObject);
    };

    const handleObjectClick = (obj) => {
        setSelectedObject(obj);
        updateMeasurement(mode, obj);
    };

    const updateMeasurement = (currentModeLabel, obj) => {
        if (currentModeLabel === 'OFF' || !obj) {
            setValue(0);
            return;
        }

        const currentMode = modes.find(m => m.label === currentModeLabel);
        if (currentMode.type === obj.type) {
            // Success measurement
            setValue(obj.value + (Math.random() * 0.04 - 0.02)); // Add jitter
        } else {
            setValue(0); // Wrong mode, zero or overflow sim
        }
    };

    return (
        <div className="section-container">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setView('digital')}
                    className="glass-card"
                    style={{
                        margin: 0, padding: '0.8rem 2rem',
                        background: view === 'digital' ? 'var(--primary-color)' : 'transparent',
                        color: view === 'digital' ? '#000' : 'var(--text-main)',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Instrumento Digital
                </button>
                <button
                    onClick={() => setView('analog')}
                    className="glass-card"
                    style={{
                        margin: 0, padding: '0.8rem 2rem',
                        background: view === 'analog' ? 'var(--primary-color)' : 'transparent',
                        color: view === 'analog' ? '#000' : 'var(--text-main)',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Instrumento Analógico
                </button>
            </div>

            {view === 'digital' ? (
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Tester Digital Multifunción</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', alignItems: 'start', marginTop: '2rem' }}>

                        {/* Multimeter Body (Digital) */}
                        <div style={{
                            width: '260px', height: '450px',
                            background: '#facc15', borderRadius: '30px', padding: '20px', border: '10px solid #ca8a04',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            {/* LCD Screen */}
                            <div style={{
                                width: '100%', height: '100px', background: '#94a3b8', borderRadius: '10px', border: '5px solid #334155',
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                color: mode === 'OFF' ? '#71717a' : '#0f172a', fontFamily: 'monospace', position: 'relative', marginBottom: '30px'
                            }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>
                                    {mode === 'OFF' ? '' : value.toFixed(mode === '2000 Ω' ? 0 : 2)}
                                </div>
                                <div style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {modes.find(m => m.label === mode)?.unit}
                                </div>
                            </div>

                            {/* Rotary Selector */}
                            <div style={{ width: '160px', height: '160px', background: '#333', borderRadius: '50%', position: 'relative', border: '4px solid #1a1a1a' }}>
                                {modes.map((m, i) => {
                                    const angle = (i * (360 / modes.length)) - 90;
                                    const isActive = mode === m.label;
                                    return (
                                        <button key={m.label} onClick={() => handleDialClick(m)}
                                            style={{
                                                position: 'absolute', top: '50%', left: '50%',
                                                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(95px) rotate(${-angle}deg)`,
                                                background: isActive ? m.color : '#444', color: isActive ? '#fff' : '#ccc',
                                                border: 'none', borderRadius: '8px', padding: '5px 8px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer'
                                            }}
                                        >
                                            {m.label}
                                        </button>
                                    );
                                })}
                                <div style={{
                                    width: '80px', height: '10px', background: '#fff', position: 'absolute', top: '50%', left: '50%',
                                    transformOrigin: 'left center',
                                    transform: `translate(0, -50%) rotate(${modes.findIndex(m => m.label === mode) * (360 / modes.length) - 90}deg)`,
                                    borderRadius: '0 5px 5px 0', transition: 'transform 0.3s'
                                }}></div>
                            </div>
                        </div>

                        {/* Test Points (Utility) */}
                        <div style={{ textAlign: 'left', minWidth: '250px' }}>
                            <h4 style={{ color: 'var(--primary-color)' }}>Puntos de Prueba</h4>
                            <p style={{ fontSize: '0.8rem' }}>Conecta las puntas de prueba a un objeto:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                                {testSources.map(src => (
                                    <button
                                        key={src.name}
                                        onClick={() => handleObjectClick(src)}
                                        className="glass-card"
                                        style={{
                                            margin: 0, padding: '1rem', textAlign: 'left',
                                            border: selectedObject?.name === src.name ? '2px solid var(--primary-color)' : '1px solid var(--glass-border)',
                                            background: selectedObject?.name === src.name ? 'rgba(0, 242, 255, 0.05)' : 'transparent',
                                            cursor: 'pointer', transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ fontWeight: 'bold' }}>{src.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Simular medición de {src.type}</div>
                                    </button>
                                ))}
                            </div>

                            {selectedObject && (
                                <div className="glass-card" style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                                    <small style={{ color: '#ef4444', fontWeight: 'bold' }}>ESTADO DE PUNTAS:</small>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Conectadas a {selectedObject.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <AnalogMultimeter />
            )}
        </div>
    );
};

export default MultimeterSimulator;

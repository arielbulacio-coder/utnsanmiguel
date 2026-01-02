import React, { useState } from 'react';
import AnalogMultimeter from './AnalogMultimeter';

const MultimeterSimulator = () => {
    const [view, setView] = useState('digital'); // 'digital' or 'analog'
    const [mode, setMode] = useState('OFF');
    const [value, setValue] = useState(0);
    const [selectedObject, setSelectedObject] = useState(null);
    const [warning, setWarning] = useState('');

    const testSources = [
        { name: 'Batería 9V', type: 'DC', value: 9.18, img: 'https://images.unsplash.com/photo-1619641805634-e1b10e56a5d1?w=200&h=200&fit=crop' },
        { name: 'Pila AAA', type: 'DC', value: 1.52, img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop' },
        { name: 'Enchufe Pared', type: 'AC', value: 221.5, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
        { name: 'Resistor 1kΩ', type: 'OHM', value: 998, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop' },
        { name: 'Diodo (Directa)', type: 'DIODE', value: 0.65, img: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=200&h=200&fit=crop' },
        { name: 'Diodo (Inversa)', type: 'DIODE', value: 0, img: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=200&h=200&fit=crop' },
        { name: 'Cable Sano', type: 'CONT', value: 0.1, img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' }
    ];

    const modes = [
        { label: 'OFF', color: '#333', unit: '', type: 'OFF' },
        { label: '600 V~', color: '#eab308', unit: 'V AC', type: 'AC' },
        { label: '20 V⎓', color: '#ef4444', unit: 'V DC', type: 'DC' },
        { label: '2000 Ω', color: '#3b82f6', unit: 'Ω', type: 'OHM' },
        { label: '▶| Diodo', color: '#a855f7', unit: 'V', type: 'DIODE' },
        { label: 'Cont 🔊', color: '#10b981', unit: '', type: 'CONT' }
    ];

    const playBeep = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            setTimeout(() => oscillator.stop(), 150);
        } catch (e) {
            console.log("Audio not supported");
        }
    };

    const handleDialClick = (selectedMode) => {
        setMode(selectedMode.label);
        updateMeasurement(selectedMode.label, selectedObject);
    };

    const handleObjectClick = (obj) => {
        setSelectedObject(obj);
        updateMeasurement(mode, obj);
    };

    const updateMeasurement = (currentModeLabel, obj) => {
        setWarning('');
        if (currentModeLabel === 'OFF' || !obj) {
            setValue(0);
            return;
        }

        const currentMode = modes.find(m => m.label === currentModeLabel);

        // SAFETY CHECK: Burning scenario
        if ((currentMode.type === 'OHM' || currentMode.type === 'CONT' || currentMode.type === 'DIODE') &&
            (obj.type === 'AC' || obj.type === 'DC')) {
            setWarning('⚠️ ¡PELIGRO! Intentaste medir tensión en modo resistencia/diodo. Esto puede QUEMAR el tester.');
            setValue(0);
            return;
        }

        if (currentMode.type === obj.type) {
            // Success measurement
            if (currentMode.type === 'CONT' && obj.value < 10) {
                playBeep();
            }
            // Special for diode
            if (currentMode.type === 'DIODE' && obj.value === 0) {
                setValue(1); // Simulate OL or high
            } else {
                setValue(obj.value + (Math.random() * 0.04 - 0.02));
            }
        } else {
            setValue(0);
        }
    };

    return (
        <div className="section-container">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setView('digital')}
                    className="glass-card"
                    style={{
                        margin: 0, padding: '0.8rem 1.5rem',
                        background: view === 'digital' ? 'var(--primary-color)' : 'transparent',
                        color: view === 'digital' ? '#000' : 'var(--text-main)',
                        fontWeight: 'bold', cursor: 'pointer', flex: '1', minWidth: '150px'
                    }}
                >
                    Instrumento Digital
                </button>
                <button
                    onClick={() => setView('analog')}
                    className="glass-card"
                    style={{
                        margin: 0, padding: '0.8rem 1.5rem',
                        background: view === 'analog' ? 'var(--primary-color)' : 'transparent',
                        color: view === 'analog' ? '#000' : 'var(--text-main)',
                        fontWeight: 'bold', cursor: 'pointer', flex: '1', minWidth: '150px'
                    }}
                >
                    Instrumento Analógico
                </button>
            </div>

            {view === 'digital' ? (
                <div className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                    <h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Tester Digital Multifunción</h3>

                    {warning && (
                        <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '2px solid #ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>
                            {warning}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginTop: '2rem',
                        position: 'relative'
                    }}>

                        {/* Multimeter Body (Digital) */}
                        <div style={{
                            width: '240px', height: '420px',
                            background: '#facc15', borderRadius: '30px', padding: '15px', border: '8px solid #ca8a04',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2
                        }}>
                            {/* LCD Screen */}
                            <div style={{
                                width: '100%', height: '80px', background: '#94a3b8', borderRadius: '10px', border: '5px solid #334155',
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                color: mode === 'OFF' ? '#71717a' : '#0f172a', fontFamily: 'monospace', position: 'relative', marginBottom: '20px'
                            }}>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                                    {mode === 'OFF' ? '' : (mode === '▶| Diodo' && value > 0.9 ? '1.' : value.toFixed(mode === '2000 Ω' ? 0 : 3))}
                                </div>
                                <div style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                    {modes.find(m => m.label === mode)?.unit}
                                </div>
                            </div>

                            {/* Rotary Selector */}
                            <div style={{ width: '150px', height: '150px', background: '#333', borderRadius: '50%', position: 'relative', border: '4px solid #1a1a1a' }}>
                                {modes.map((m, i) => {
                                    const angle = (i * (360 / modes.length)) - 90;
                                    const isActive = mode === m.label;
                                    return (
                                        <button key={m.label} onClick={() => handleDialClick(m)}
                                            style={{
                                                position: 'absolute', top: '50%', left: '50%',
                                                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(85px) rotate(${-angle}deg)`,
                                                background: isActive ? m.color : '#444', color: isActive ? '#fff' : '#ccc',
                                                border: 'none', borderRadius: '8px', padding: '4px 6px', fontSize: '0.55rem', fontWeight: 'bold', cursor: 'pointer', zIndex: 10
                                            }}
                                        >
                                            {m.label}
                                        </button>
                                    );
                                })}
                                <div style={{
                                    width: '75px', height: '8px', background: '#fff', position: 'absolute', top: '50%', left: '50%',
                                    transformOrigin: 'left center',
                                    transform: `translate(0, -50%) rotate(${modes.findIndex(m => m.label === mode) * (360 / modes.length) - 90}deg)`,
                                    borderRadius: '0 5px 5px 0', transition: 'transform 0.3s'
                                }}></div>
                            </div>
                        </div>

                        {/* Visual Component Being Measured */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '220px', zIndex: 2 }}>
                            {selectedObject && (
                                <div className="glass-card" style={{ padding: '1rem', background: '#fff', border: '2px solid var(--primary-color)', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <img src={selectedObject.img} alt={selectedObject.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                            )}

                            <div style={{ textAlign: 'left', width: '100%' }}>
                                <h4 style={{ color: 'var(--primary-color)', margin: '0' }}>Placa de Ensayo</h4>
                                <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Conecta las puntas a un componente:</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                                    {testSources.map(src => (
                                        <button
                                            key={src.name}
                                            onClick={() => handleObjectClick(src)}
                                            className="glass-card"
                                            style={{
                                                margin: 0, padding: '0.5rem', textAlign: 'center', fontSize: '0.8rem',
                                                border: selectedObject?.name === src.name ? '2px solid var(--primary-color)' : '1px solid var(--glass-border)',
                                                background: selectedObject?.name === src.name ? 'rgba(0, 242, 255, 0.05)' : 'transparent',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {src.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <div style={{ minWidth: '350px' }}>
                        <AnalogMultimeter />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultimeterSimulator;

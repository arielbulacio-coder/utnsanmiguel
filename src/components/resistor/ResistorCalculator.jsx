import React, { useState, useEffect } from 'react';

const COLORS = [
    { name: 'Negro', value: 0, mult: 1, color: 'black', text: 'white' },
    { name: 'Marrón', value: 1, mult: 10, color: '#8B4513', text: 'white', tol: 1 },
    { name: 'Rojo', value: 2, mult: 100, color: 'red', text: 'white', tol: 2 },
    { name: 'Naranja', value: 3, mult: 1000, color: 'orange', text: 'white' },
    { name: 'Amarillo', value: 4, mult: 10000, color: 'yellow', text: 'white' },
    { name: 'Verde', value: 5, mult: 100000, color: 'green', text: 'white', tol: 0.5 },
    { name: 'Azul', value: 6, mult: 1000000, color: 'blue', text: 'white', tol: 0.25 },
    { name: 'Violeta', value: 7, mult: 10000000, color: 'violet', text: 'white', tol: 0.1 },
    { name: 'Gris', value: 8, mult: 100000000, color: 'grey', text: 'white', tol: 0.05 },
    { name: 'Blanco', value: 9, mult: 1000000000, color: 'white', text: '#333' },
];

const TOLERANCE_COLORS = [
    { name: 'Marrón', value: 1, color: '#8B4513' },
    { name: 'Rojo', value: 2, color: 'red' },
    { name: 'Dorado', value: 5, color: '#D4AF37' },
    { name: 'Plateado', value: 10, color: '#C0C0C0' },
];

const ResistorCalculator = () => {
    const [band1, setBand1] = useState(1); // Default Brown
    const [band2, setBand2] = useState(0); // Default Black
    const [multiplier, setMultiplier] = useState(2); // Default Red (x100) -> 1000 Ohm
    const [tolerance, setTolerance] = useState(2); // Default Gold (5%)

    const [result, setResult] = useState(0);

    useEffect(() => {
        const val = (COLORS[band1].value * 10 + COLORS[band2].value) * COLORS[multiplier].mult;
        setResult(val);
    }, [band1, band2, multiplier]);

    const formatResistor = (val) => {
        if (val >= 1000000) return (val / 1000000) + ' MΩ';
        if (val >= 1000) return (val / 1000) + ' kΩ';
        return val + ' Ω';
    };

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Calculadora de Colores (4 Bandas)</h2>

            {/* Visual Resistor */}
            <div style={{
                position: 'relative',
                width: '300px',
                height: '100px',
                background: '#f0e6d2',
                borderRadius: '50px',
                margin: '2rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.3)'
            }}>
                {/* Wire Left */}
                <div style={{ position: 'absolute', left: '-50px', width: '50px', height: '10px', background: '#aaa' }}></div>
                {/* Wire Right */}
                <div style={{ position: 'absolute', right: '-50px', width: '50px', height: '10px', background: '#aaa' }}></div>

                {/* Bands */}
                <div style={{ width: '20px', height: '100%', background: COLORS[band1].color, marginRight: '20px' }}></div>
                <div style={{ width: '20px', height: '100%', background: COLORS[band2].color, marginRight: '20px' }}></div>
                <div style={{ width: '20px', height: '100%', background: COLORS[multiplier].color, marginRight: '40px' }}></div>
                <div style={{ width: '20px', height: '100%', background: TOLERANCE_COLORS[tolerance].color }}></div>
            </div>

            <div className="result-display">
                <div className="result-value">
                    {formatResistor(result)} <span style={{ fontSize: '0.4em', color: 'var(--text-dim)' }}>±{TOLERANCE_COLORS[tolerance].value}%</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div className="input-group">
                    <label>1ª Banda</label>
                    <select value={band1} onChange={(e) => setBand1(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid var(--glass-border)' }}>
                        {COLORS.map((c, i) => <option key={i} value={i} style={{ background: '#1a1a1a', color: c.color === 'black' ? '#fff' : c.color }}>{c.name}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>2ª Banda</label>
                    <select value={band2} onChange={(e) => setBand2(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid var(--glass-border)' }}>
                        {COLORS.map((c, i) => <option key={i} value={i} style={{ background: '#1a1a1a', color: c.color === 'black' ? '#fff' : c.color }}>{c.name}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>Multiplicador</label>
                    <select value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid var(--glass-border)' }}>
                        {COLORS.map((c, i) => <option key={i} value={i} style={{ background: '#1a1a1a', color: c.color === 'black' ? '#fff' : c.color }}>{c.name}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>Tolerancia</label>
                    <select value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid var(--glass-border)' }}>
                        {TOLERANCE_COLORS.map((c, i) => <option key={i} value={i} style={{ background: '#1a1a1a', color: c.color }}>{c.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ResistorCalculator;

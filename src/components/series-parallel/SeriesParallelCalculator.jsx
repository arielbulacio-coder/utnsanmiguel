import React, { useState, useEffect } from 'react';

const SeriesParallelCalculator = () => {
    const [mode, setMode] = useState('series'); // 'series' or 'parallel'
    const [resistors, setResistors] = useState([100, 200, 300]); // Default values in Ohms
    const [result, setResult] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [resistors, mode]);

    const calculateTotal = () => {
        if (resistors.length === 0) {
            setResult(0);
            return;
        }

        if (mode === 'series') {
            // Series: R_total = R1 + R2 + ... + Rn
            const total = resistors.reduce((sum, r) => sum + parseFloat(r || 0), 0);
            setResult(total);
        } else {
            // Parallel: 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn
            const inverseSum = resistors.reduce((sum, r) => {
                const val = parseFloat(r || 0);
                return val > 0 ? sum + (1 / val) : sum;
            }, 0);
            const total = inverseSum > 0 ? 1 / inverseSum : 0;
            setResult(total);
        }
    };

    const addResistor = () => {
        setResistors([...resistors, 100]);
    };

    const removeResistor = (index) => {
        if (resistors.length > 1) {
            setResistors(resistors.filter((_, i) => i !== index));
        }
    };

    const updateResistor = (index, value) => {
        const newResistors = [...resistors];
        newResistors[index] = value;
        setResistors(newResistors);
    };

    const formatResistance = (val) => {
        if (val >= 1000000) return (val / 1000000).toFixed(2) + ' MΩ';
        if (val >= 1000) return (val / 1000).toFixed(2) + ' kΩ';
        return val.toFixed(2) + ' Ω';
    };

    return (
        <div className="glass-card section-container">
            <h2>Calculadora de Resistencias</h2>

            {/* Mode Selector */}
            <div className="mode-selector" style={{ marginBottom: '2rem' }}>
                <button
                    className={`mode-btn ${mode === 'series' ? 'active' : ''}`}
                    onClick={() => setMode('series')}
                >
                    Serie
                </button>
                <button
                    className={`mode-btn ${mode === 'parallel' ? 'active' : ''}`}
                    onClick={() => setMode('parallel')}
                >
                    Paralelo
                </button>
            </div>

            {/* Resistor Inputs */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Resistencias (Ω)</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {resistors.map((r, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ minWidth: '80px' }}>R{index + 1}:</label>
                            <input
                                type="number"
                                value={r}
                                onChange={(e) => updateResistor(index, e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                                min="0"
                                step="1"
                            />
                            <button
                                onClick={() => removeResistor(index)}
                                disabled={resistors.length === 1}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: resistors.length === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255, 0, 85, 0.2)',
                                    border: '1px solid rgba(255, 0, 85, 0.3)',
                                    borderRadius: '8px',
                                    color: resistors.length === 1 ? '#666' : '#ff0055',
                                    cursor: resistors.length === 1 ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addResistor}
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(0, 242, 255, 0.1)',
                        border: '1px solid var(--primary-color)',
                        borderRadius: '8px',
                        color: 'var(--primary-color)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: '100%'
                    }}
                >
                    + Agregar Resistencia
                </button>
            </div>

            {/* Result */}
            <div className="result-display">
                <div className="result-label">Resistencia Equivalente ({mode === 'series' ? 'Serie' : 'Paralelo'})</div>
                <div className="result-value">{formatResistance(result)}</div>
            </div>

            {/* Formula Display */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'center' }}>
                <strong>Fórmula:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                    {mode === 'series' ? (
                        <>R<sub>total</sub> = {resistors.map((_, i) => `R${i + 1}`).join(' + ')}</>
                    ) : (
                        <>1/R<sub>total</sub> = {resistors.map((_, i) => `1/R${i + 1}`).join(' + ')}</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeriesParallelCalculator;

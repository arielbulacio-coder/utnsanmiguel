import React, { useState, useEffect } from 'react';

const OhmSimulator = () => {
    const [mode, setMode] = useState('V'); // 'V', 'I', 'R'
    const [values, setValues] = useState({ v: '', i: '', r: '' });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const calculate = () => {
        const v = parseFloat(values.v);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);

        let res = 0;

        switch (mode) {
            case 'V': // V = I * R
                if (!isNaN(i) && !isNaN(r)) res = i * r;
                break;
            case 'I': // I = V / R
                if (!isNaN(v) && !isNaN(r)) {
                    if (r === 0) {
                        setResult('Error: R=0');
                        return;
                    }
                    res = v / r;
                }
                break;
            case 'R': // R = V / I
                if (!isNaN(v) && !isNaN(i)) {
                    if (i === 0) {
                        setResult('Error: I=0');
                        return;
                    }
                    res = v / i;
                }
                break;
        }

        // Format to 2 decimals if it's a number and not an integer
        setResult(Number.isInteger(res) ? res : res.toFixed(2));
    };

    useEffect(() => {
        calculate();
    }, [values, mode]);

    useEffect(() => {
        // Reset values on mode switch
        setValues({ v: '', i: '', r: '' });
        setResult(null);
    }, [mode]);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador de Ley de Ohm</h2>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === 'V' ? 'active' : ''}`}
                    onClick={() => setMode('V')}
                >
                    Calcular Voltaje (V)
                </button>
                <button
                    className={`mode-btn ${mode === 'I' ? 'active' : ''}`}
                    onClick={() => setMode('I')}
                >
                    Calcular Intensidad (I)
                </button>
                <button
                    className={`mode-btn ${mode === 'R' ? 'active' : ''}`}
                    onClick={() => setMode('R')}
                >
                    Calcular Resistencia (R)
                </button>
            </div>

            <div style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                Fórmula:
                {mode === 'V' && <span style={{ marginLeft: '1rem' }}>V = I × R</span>}
                {mode === 'I' && <span style={{ marginLeft: '1rem' }}>I = V / R</span>}
                {mode === 'R' && <span style={{ marginLeft: '1rem' }}>R = V / I</span>}
            </div>

            <div className="simulator-form">
                {mode !== 'V' && (
                    <div className="input-group">
                        <label>Voltaje (Volts)</label>
                        <input
                            type="number"
                            name="v"
                            value={values.v}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>
                )}

                {mode !== 'I' && (
                    <div className="input-group">
                        <label>Intensidad (Ampere)</label>
                        <input
                            type="number"
                            name="i"
                            value={values.i}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>
                )}

                {mode !== 'R' && (
                    <div className="input-group">
                        <label>Resistencia (Ohms Ω)</label>
                        <input
                            type="number"
                            name="r"
                            value={values.r}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>
                )}
            </div>

            <div className="result-display">
                <small style={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Resultado ({mode === 'V' ? 'Volts' : mode === 'I' ? 'Ampere' : 'Ohms Ω'})
                </small>
                <div className="result-value">
                    {result !== null ? result : '---'}
                    <span style={{ fontSize: '0.5em', color: 'var(--primary-color)', marginLeft: '0.5rem' }}>
                        {mode === 'V' ? 'V' : mode === 'I' ? 'A' : 'Ω'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OhmSimulator;

import React, { useState, useEffect } from 'react';

const PowerCalculator = () => {
    const [mode, setMode] = useState('VI'); // 'VI', 'IR', 'VR'
    const [values, setValues] = useState({ v: '', i: '', r: '' });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const calculate = () => {
        const v = parseFloat(values.v);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);

        let res;
        switch (mode) {
            case 'VI':
                if (!isNaN(v) && !isNaN(i)) res = v * i;
                break;
            case 'IR':
                if (!isNaN(i) && !isNaN(r)) res = Math.pow(i, 2) * r;
                break;
            case 'VR':
                if (!isNaN(v) && !isNaN(r)) {
                    if (r === 0) {
                        setResult('Error: R=0');
                        return;
                    }
                    res = Math.pow(v, 2) / r;
                }
                break;
            default:
                res = 0;
        }

        if (res !== undefined) {
            setResult(Number.isInteger(res) ? res : res.toFixed(4));
        } else {
            setResult(null);
        }
    };

    useEffect(() => {
        calculate();
    }, [values, mode]);

    useEffect(() => {
        setValues({ v: '', i: '', r: '' });
        setResult(null);
    }, [mode]);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Calculadora de Potencia</h2>

            <div className="mode-selector">
                <button className={`mode-btn ${mode === 'VI' ? 'active' : ''}`} onClick={() => setMode('VI')}>
                    Voltaje y Corriente (V, I)
                </button>
                <button className={`mode-btn ${mode === 'IR' ? 'active' : ''}`} onClick={() => setMode('IR')}>
                    Corriente y Resistencia (I, R)
                </button>
                <button className={`mode-btn ${mode === 'VR' ? 'active' : ''}`} onClick={() => setMode('VR')}>
                    Voltaje y Resistencia (V, R)
                </button>
            </div>

            <div className="simulator-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                {(mode === 'VI' || mode === 'VR') && (
                    <div className="input-group">
                        <label>Voltaje (V)</label>
                        <input type="number" name="v" value={values.v} onChange={handleInputChange} placeholder="Volts" />
                    </div>
                )}
                {(mode === 'VI' || mode === 'IR') && (
                    <div className="input-group">
                        <label>Intensidad (I)</label>
                        <input type="number" name="i" value={values.i} onChange={handleInputChange} placeholder="Amperes" />
                    </div>
                )}
                {(mode === 'IR' || mode === 'VR') && (
                    <div className="input-group">
                        <label>Resistencia (R)</label>
                        <input type="number" name="r" value={values.r} onChange={handleInputChange} placeholder="Ohms Ω" />
                    </div>
                )}
            </div>

            <div className="result-display" style={{ marginTop: '2rem' }}>
                <div className="result-label">Potencia (P)</div>
                <div className="result-value">
                    {result !== null ? result : '---'}
                    <span style={{ fontSize: '0.5em', color: 'var(--primary-color)', marginLeft: '0.5rem' }}>
                        W
                    </span>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px' }}>
                <strong>Fórmula:</strong><br />
                {mode === 'VI' && <code>P = V * I</code>}
                {mode === 'IR' && <code>P = I² * R</code>}
                {mode === 'VR' && <code>P = V² / R</code>}
            </div>
        </div>
    );
};

export default PowerCalculator;

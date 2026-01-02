import React, { useState, useEffect } from 'react';

const PythagorasCalculator = () => {
    const [mode, setMode] = useState('c'); // 'a', 'b', 'c' (the side to calculate)
    const [values, setValues] = useState({ a: '', b: '', c: '' });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const calculate = () => {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        const c = parseFloat(values.c);

        let res;
        try {
            if (mode === 'c') {
                if (!isNaN(a) && !isNaN(b)) {
                    res = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                }
            } else if (mode === 'a') {
                if (!isNaN(c) && !isNaN(b)) {
                    if (c <= b) throw new Error("La hipotenusa debe ser mayor que el cateto");
                    res = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
                }
            } else if (mode === 'b') {
                if (!isNaN(c) && !isNaN(a)) {
                    if (c <= a) throw new Error("La hipotenusa debe ser mayor que el cateto");
                    res = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                }
            }

            if (res !== undefined) {
                setResult(Number.isInteger(res) ? res : res.toFixed(4));
            } else {
                setResult(null);
            }
        } catch (error) {
            setResult(error.message);
        }
    };

    useEffect(() => {
        calculate();
    }, [values, mode]);

    useEffect(() => {
        setValues({ a: '', b: '', c: '' });
        setResult(null);
    }, [mode]);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Calculadora de Pitágoras</h2>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === 'c' ? 'active' : ''}`}
                    onClick={() => setMode('c')}
                >
                    Calcular Hipotenusa (c)
                </button>
                <button
                    className={`mode-btn ${mode === 'a' ? 'active' : ''}`}
                    onClick={() => setMode('a')}
                >
                    Calcular Cateto (a)
                </button>
                <button
                    className={`mode-btn ${mode === 'b' ? 'active' : ''}`}
                    onClick={() => setMode('b')}
                >
                    Calcular Cateto (b)
                </button>
            </div>

            <div className="simulator-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                {mode !== 'a' && (
                    <div className="input-group">
                        <label>Cateto (a)</label>
                        <input
                            type="number"
                            name="a"
                            value={values.a}
                            onChange={handleInputChange}
                            placeholder="Ingrese valor"
                        />
                    </div>
                )}
                {mode !== 'b' && (
                    <div className="input-group">
                        <label>Cateto (b)</label>
                        <input
                            type="number"
                            name="b"
                            value={values.b}
                            onChange={handleInputChange}
                            placeholder="Ingrese valor"
                        />
                    </div>
                )}
                {mode !== 'c' && (
                    <div className="input-group">
                        <label>Hipotenusa (c)</label>
                        <input
                            type="number"
                            name="c"
                            value={values.c}
                            onChange={handleInputChange}
                            placeholder="Ingrese valor"
                        />
                    </div>
                )}
            </div>

            <div className="result-display" style={{ marginTop: '2rem' }}>
                <div className="result-label">Resultado: {mode === 'c' ? 'Hipotenusa (c)' : `Cateto (${mode})`}</div>
                <div className="result-value" style={{ fontSize: (result && result.toString().length > 10) ? '1.5rem' : '2rem' }}>
                    {result !== null ? result : '---'}
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px' }}>
                <strong>Fórmula aplicada:</strong><br />
                {mode === 'c' && <code>c = √(a² + b²)</code>}
                {mode === 'a' && <code>a = √(c² - b²)</code>}
                {mode === 'b' && <code>b = √(c² - a²)</code>}
            </div>
        </div>
    );
};

export default PythagorasCalculator;

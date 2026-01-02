import React, { useState, useEffect } from 'react';

const TrigonometryCalculator = () => {
    const [mode, setMode] = useState('angle-side'); // 'angle-side', 'two-sides'
    const [data, setData] = useState({
        angle: '',
        sideA: '', // Opuesto
        sideB: '', // Adyacente
        hypotenuse: ''
    });
    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const calculate = () => {
        const { angle, sideA, sideB, hypotenuse } = data;
        const angleNum = parseFloat(angle);
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);
        const h = parseFloat(hypotenuse);

        let res = {};

        if (mode === 'angle-side') {
            if (!isNaN(angleNum) && angleNum > 0 && angleNum < 90) {
                const rad = toRad(angleNum);
                if (!isNaN(h)) {
                    res.a = (h * Math.sin(rad)).toFixed(4);
                    res.b = (h * Math.cos(rad)).toFixed(4);
                    res.otherAngle = (90 - angleNum).toFixed(2);
                } else if (!isNaN(a)) {
                    res.h = (a / Math.sin(rad)).toFixed(4);
                    res.b = (a / Math.tan(rad)).toFixed(4);
                    res.otherAngle = (90 - angleNum).toFixed(2);
                } else if (!isNaN(b)) {
                    res.h = (b / Math.cos(rad)).toFixed(4);
                    res.a = (b * Math.tan(rad)).toFixed(4);
                    res.otherAngle = (90 - angleNum).toFixed(2);
                }
            }
        } else {
            if (!isNaN(a) && !isNaN(b)) {
                res.h = Math.sqrt(a * a + b * b).toFixed(4);
                res.angle = toDeg(Math.atan(a / b)).toFixed(2);
                res.otherAngle = (90 - parseFloat(res.angle)).toFixed(2);
            } else if (!isNaN(a) && !isNaN(h) && h > a) {
                res.b = Math.sqrt(h * h - a * a).toFixed(4);
                res.angle = toDeg(Math.asin(a / h)).toFixed(2);
                res.otherAngle = (90 - parseFloat(res.angle)).toFixed(2);
            } else if (!isNaN(b) && !isNaN(h) && h > b) {
                res.a = Math.sqrt(h * h - b * b).toFixed(4);
                res.angle = toDeg(Math.acos(b / h)).toFixed(2);
                res.otherAngle = (90 - parseFloat(res.angle)).toFixed(2);
            }
        }

        setResults(Object.keys(res).length > 0 ? res : null);
    };

    useEffect(() => {
        calculate();
    }, [data, mode]);

    useEffect(() => {
        setData({ angle: '', sideA: '', sideB: '', hypotenuse: '' });
        setResults(null);
    }, [mode]);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Calculadora Trigonométrica</h2>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === 'angle-side' ? 'active' : ''}`}
                    onClick={() => setMode('angle-side')}
                >
                    Ángulo y un Lado
                </button>
                <button
                    className={`mode-btn ${mode === 'two-sides' ? 'active' : ''}`}
                    onClick={() => setMode('two-sides')}
                >
                    Dos Lados
                </button>
            </div>

            <div className="simulator-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
                {mode === 'angle-side' && (
                    <div className="input-group">
                        <label>Ángulo θ (Grados 0-90)</label>
                        <input type="number" name="angle" value={data.angle} onChange={handleInputChange} placeholder="30" />
                    </div>
                )}

                <div className="grid-responsive-2col" style={{ gap: '1rem', marginTop: '1rem' }}>
                    <div className="input-group">
                        <label>Cateto Opuesto (a)</label>
                        <input type="number" name="sideA" value={data.sideA} onChange={handleInputChange} placeholder="Valor" disabled={mode === 'angle-side' && (data.sideB || data.hypotenuse)} />
                    </div>
                    <div className="input-group">
                        <label>Cateto Adyacente (b)</label>
                        <input type="number" name="sideB" value={data.sideB} onChange={handleInputChange} placeholder="Valor" disabled={mode === 'angle-side' && (data.sideA || data.hypotenuse)} />
                    </div>
                </div>

                <div className="input-group" style={{ marginTop: '1rem' }}>
                    <label>Hipotenusa (h)</label>
                    <input type="number" name="hypotenuse" value={data.hypotenuse} onChange={handleInputChange} placeholder="Valor" disabled={mode === 'angle-side' && (data.sideA || data.sideB)} />
                </div>
            </div>

            {results && (
                <div className="result-display" style={{ marginTop: '2rem' }}>
                    <div className="grid-responsive-2col">
                        {results.a && (
                            <div>
                                <div className="result-label">Cateto Opuesto (a)</div>
                                <div className="result-value">{results.a}</div>
                            </div>
                        )}
                        {results.b && (
                            <div>
                                <div className="result-label">Cateto Adyacente (b)</div>
                                <div className="result-value">{results.b}</div>
                            </div>
                        )}
                        {results.h && (
                            <div>
                                <div className="result-label">Hipotenusa (h)</div>
                                <div className="result-value">{results.h}</div>
                            </div>
                        )}
                        {results.angle && (
                            <div>
                                <div className="result-label">Ángulo θ</div>
                                <div className="result-value">{results.angle}°</div>
                            </div>
                        )}
                        {results.otherAngle && (
                            <div>
                                <div className="result-label">Ángulo Complementario</div>
                                <div className="result-value">{results.otherAngle}°</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                * Ingrese el ángulo y UN solo lado, o DOS lados cualesquiera.
            </p>
        </div>
    );
};

export default TrigonometryCalculator;

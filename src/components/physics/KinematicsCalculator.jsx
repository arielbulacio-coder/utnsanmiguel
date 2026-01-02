import React, { useState, useEffect } from 'react';

const KinematicsCalculator = () => {
    const [type, setType] = useState('MRU'); // 'MRU' or 'MRUV'
    const [mode, setMode] = useState('v'); // 'v', 'd', 't' for MRU; 'a', 'vf', 'vi', 't' for MRUV
    const [values, setValues] = useState({
        v: '', d: '', t: '',
        vi: '', vf: '', a: ''
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const calculate = () => {
        const v = parseFloat(values.v);
        const d = parseFloat(values.d);
        const t = parseFloat(values.t);
        const vi = parseFloat(values.vi);
        const vf = parseFloat(values.vf);
        const a = parseFloat(values.a);

        let res;
        if (type === 'MRU') {
            if (mode === 'v' && !isNaN(d) && !isNaN(t) && t !== 0) res = d / t;
            else if (mode === 'd' && !isNaN(v) && !isNaN(t)) res = v * t;
            else if (mode === 't' && !isNaN(d) && !isNaN(v) && v !== 0) res = d / v;
        } else {
            if (mode === 'a' && !isNaN(vf) && !isNaN(vi) && !isNaN(t) && t !== 0) res = (vf - vi) / t;
            else if (mode === 'vf' && !isNaN(vi) && !isNaN(a) && !isNaN(t)) res = vi + a * t;
            else if (mode === 'vi' && !isNaN(vf) && !isNaN(a) && !isNaN(t)) res = vf - a * t;
            else if (mode === 't' && !isNaN(vf) && !isNaN(vi) && !isNaN(a) && a !== 0) res = (vf - vi) / a;
            else if (mode === 'd' && !isNaN(vi) && !isNaN(a) && !isNaN(t)) res = vi * t + 0.5 * a * Math.pow(t, 2);
        }

        setResult(res !== undefined && !isNaN(res) ? (Number.isInteger(res) ? res : res.toFixed(4)) : null);
    };

    useEffect(() => {
        calculate();
    }, [values, mode, type]);

    useEffect(() => {
        setValues({ v: '', d: '', t: '', vi: '', vf: '', a: '' });
        setResult(null);
        if (type === 'MRU') setMode('v');
        else setMode('a');
    }, [type]);

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Calculadora de Cinemática</h2>

            <div className="mode-selector">
                <button className={`mode-btn ${type === 'MRU' ? 'active' : ''}`} onClick={() => setType('MRU')}>MRU</button>
                <button className={`mode-btn ${type === 'MRUV' ? 'active' : ''}`} onClick={() => setType('MRUV')}>MRUV</button>
            </div>

            <div className="mode-selector" style={{ marginTop: '1rem', flexWrap: 'wrap' }}>
                {type === 'MRU' ? (
                    <>
                        <button className={`mode-btn ${mode === 'v' ? 'active' : ''}`} onClick={() => setMode('v')}>Calcular Velocidad</button>
                        <button className={`mode-btn ${mode === 'd' ? 'active' : ''}`} onClick={() => setMode('d')}>Calcular Distancia</button>
                        <button className={`mode-btn ${mode === 't' ? 'active' : ''}`} onClick={() => setMode('t')}>Calcular Tiempo</button>
                    </>
                ) : (
                    <>
                        <button className={`mode-btn ${mode === 'a' ? 'active' : ''}`} onClick={() => setMode('a')}>Aceleración</button>
                        <button className={`mode-btn ${mode === 'vf' ? 'active' : ''}`} onClick={() => setMode('vf')}>Vel. Final</button>
                        <button className={`mode-btn ${mode === 'vi' ? 'active' : ''}`} onClick={() => setMode('vi')}>Vel. Inicial</button>
                        <button className={`mode-btn ${mode === 'd' ? 'active' : ''}`} onClick={() => setMode('d')}>Distancia</button>
                        <button className={`mode-btn ${mode === 't' ? 'active' : ''}`} onClick={() => setMode('t')}>Tiempo</button>
                    </>
                )}
            </div>

            <div className="simulator-form" style={{ maxWidth: '400px', margin: '2rem auto' }}>
                {type === 'MRU' ? (
                    <>
                        {mode !== 'v' && <div className="input-group"><label>Velocidad (m/s)</label><input type="number" name="v" value={values.v} onChange={handleInputChange} placeholder="0.00" /></div>}
                        {mode !== 'd' && <div className="input-group"><label>Distancia (m)</label><input type="number" name="d" value={values.d} onChange={handleInputChange} placeholder="0.00" /></div>}
                        {mode !== 't' && <div className="input-group"><label>Tiempo (s)</label><input type="number" name="t" value={values.t} onChange={handleInputChange} placeholder="0.00" /></div>}
                    </>
                ) : (
                    <>
                        {mode !== 'vi' && <div className="input-group"><label>Vel. Inicial (m/s)</label><input type="number" name="vi" value={values.vi} onChange={handleInputChange} placeholder="0.00" /></div>}
                        {mode !== 'vf' && mode !== 'd' && <div className="input-group"><label>Vel. Final (m/s)</label><input type="number" name="vf" value={values.vf} onChange={handleInputChange} placeholder="0.00" /></div>}
                        {mode !== 'a' && <div className="input-group"><label>Aceleración (m/s²)</label><input type="number" name="a" value={values.a} onChange={handleInputChange} placeholder="0.00" /></div>}
                        {mode !== 't' && <div className="input-group"><label>Tiempo (s)</label><input type="number" name="t" value={values.t} onChange={handleInputChange} placeholder="0.00" /></div>}
                    </>
                )}
            </div>

            {result !== null && (
                <div className="result-display">
                    <div className="result-label">
                        Resultado: {
                            mode === 'v' ? 'Velocidad' :
                                mode === 'd' ? 'Distancia' :
                                    mode === 't' ? 'Tiempo' :
                                        mode === 'a' ? 'Aceleración' :
                                            mode === 'vf' ? 'Vel. Final' : 'Vel. Inicial'
                        }
                    </div>
                    <div className="result-value">
                        {result}
                        <span style={{ fontSize: '0.4em', marginLeft: '0.5rem', opacity: 0.8 }}>
                            {mode === 'v' || mode === 'vf' || mode === 'vi' ? 'm/s' : mode === 'd' ? 'm' : mode === 't' ? 's' : 'm/s²'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KinematicsCalculator;

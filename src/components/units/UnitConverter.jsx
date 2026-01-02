import React, { useState, useEffect } from 'react';

const UnitConverter = () => {
    const [conversionType, setConversionType] = useState('inch-cm');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);

    const handleConversion = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) {
            setResult(null);
            return;
        }

        let res;
        switch (conversionType) {
            case 'inch-cm':
                res = val * 2.54;
                break;
            case 'cm-inch':
                res = val / 2.54;
                break;
            case 'yard-meter':
                res = val * 0.9144;
                break;
            case 'meter-yard':
                res = val / 0.9144;
                break;
            default:
                res = 0;
        }
        setResult(res.toFixed(4));
    };

    useEffect(() => {
        handleConversion();
    }, [inputValue, conversionType]);

    const getUnitLabels = () => {
        switch (conversionType) {
            case 'inch-cm': return { from: 'Pulgadas (in)', to: 'Centímetros (cm)' };
            case 'cm-inch': return { from: 'Centímetros (cm)', to: 'Pulgadas (in)' };
            case 'yard-meter': return { from: 'Yardas (yd)', to: 'Metros (m)' };
            case 'meter-yard': return { from: 'Metros (m)', to: 'Yardas (yd)' };
            default: return { from: '', to: '' };
        }
    };

    const labels = getUnitLabels();

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Conversor de Unidades</h2>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${conversionType === 'inch-cm' ? 'active' : ''}`}
                    onClick={() => setConversionType('inch-cm')}
                >
                    In ➔ Cm
                </button>
                <button
                    className={`mode-btn ${conversionType === 'cm-inch' ? 'active' : ''}`}
                    onClick={() => setConversionType('cm-inch')}
                >
                    Cm ➔ In
                </button>
                <button
                    className={`mode-btn ${conversionType === 'yard-meter' ? 'active' : ''}`}
                    onClick={() => setConversionType('yard-meter')}
                >
                    Yd ➔ M
                </button>
                <button
                    className={`mode-btn ${conversionType === 'meter-yard' ? 'active' : ''}`}
                    onClick={() => setConversionType('meter-yard')}
                >
                    M ➔ Yd
                </button>
            </div>

            <div className="simulator-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div className="input-group">
                    <label>{labels.from}</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Ingrese ${labels.from.toLowerCase()}`}
                    />
                </div>
            </div>

            <div className="result-display" style={{ marginTop: '2rem' }}>
                <div className="result-label">Resultado en {labels.to}</div>
                <div className="result-value">
                    {result !== null ? result : '---'}
                    <span style={{ fontSize: '0.5em', color: 'var(--primary-color)', marginLeft: '0.5rem' }}>
                        {labels.to.split('(')[1].replace(')', '')}
                    </span>
                </div>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                {conversionType === 'inch-cm' && "Factor de conversión: 1 in = 2.54 cm"}
                {conversionType === 'cm-inch' && "Factor de conversión: 1 cm ≈ 0.3937 in"}
                {conversionType === 'yard-meter' && "Factor de conversión: 1 yd = 0.9144 m"}
                {conversionType === 'meter-yard' && "Factor de conversión: 1 m ≈ 1.0936 yd"}
            </p>
        </div>
    );
};

export default UnitConverter;

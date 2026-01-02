import React from 'react';

const OhmTheory = () => {
    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>La Ley de Ohm</h2>
            <p style={{ marginBottom: '2rem' }}>
                La Ley de Ohm es la relación fundamental entre magnitud básicas de un circuito eléctrico:
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', border: '1px solid var(--primary-color)', borderRadius: '12px' }}>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>V</h3>
                    <small>Voltaje (Voltios)</small>
                </div>
                <div style={{ padding: '1rem', border: '1px solid var(--secondary-color)', borderRadius: '12px' }}>
                    <h3 style={{ margin: 0, color: 'var(--secondary-color)' }}>I</h3>
                    <small>Intensidad (Amperes)</small>
                </div>
                <div style={{ padding: '1rem', border: '1px solid var(--text-main)', borderRadius: '12px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-main)' }}>R</h3>
                    <small>Resistencia (Ohms Ω)</small>
                </div>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div><span style={{ color: 'var(--primary-color)' }}>V</span> = <span style={{ color: 'var(--secondary-color)' }}>I</span> × <span>R</span></div>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-dim)' }}>
                    <span style={{ color: 'var(--secondary-color)' }}>I</span> = <span style={{ color: 'var(--primary-color)' }}>V</span> / <span>R</span>
                    <span style={{ margin: '0 2rem' }}>|</span>
                    <span>R</span> = <span style={{ color: 'var(--primary-color)' }}>V</span> / <span style={{ color: 'var(--secondary-color)' }}>I</span>
                </div>
            </div>

            <p>
                Establece que la intensidad de corriente que circula por un conductor es directamente proporcional
                al voltaje aplicado e inversamente proporcional a la resistencia del mismo.
            </p>
        </div>
    );
};

export default OhmTheory;

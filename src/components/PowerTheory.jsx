import React from 'react';

const PowerTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Potencia Eléctrica (P)</h2>
            <p>
                La potencia eléctrica es la proporción por unidad de tiempo con la cual la energía eléctrica es transferida por un circuito eléctrico. En términos simples, es la "velocidad" a la que se consume o produce energía.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid var(--secondary-color)' }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Unidad de Medida</h3>
                    <p>La unidad de potencia en el Sistema Internacional es el <strong>Vatio (Watt)</strong>, representado por la letra <strong>W</strong>.</p>
                    <p>1 Vatio equivale a 1 Julio por segundo (1 J/s).</p>
                </div>

                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>La Ley de Watt</h3>
                    <p>Relaciona la potencia con el voltaje y la corriente:</p>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        P = V × I
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Fórmulas Combinadas (con Ley de Ohm)</h3>
                <p>Dependiendo de los datos que tengamos (Voltaje, Corriente o Resistencia), podemos calcular la potencia de tres formas:</p>
                <div className="grid-responsive-2col" style={{ gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                        <strong>Con V e I:</strong><br />
                        P = V × I
                    </div>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--secondary-color)' }}>
                        <strong>Con I y R:</strong><br />
                        P = I² × R
                    </div>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                        <strong>Con V y R:</strong><br />
                        P = V² / R
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ejemplo Práctico</h3>
                <p>
                    Si una lámpara de <strong>12V</strong> consume una corriente de <strong>2A</strong>, ¿cuál es su potencia?
                </p>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic' }}>
                    P = 12V × 2A = <strong>24W</strong>
                </div>
            </div>
        </div>
    );
};

export default PowerTheory;

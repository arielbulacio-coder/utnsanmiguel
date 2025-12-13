import React from 'react';

const TheveninTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Teorema de Thévenin</h2>
            <p>
                El Teorema de Thévenin establece que cualquier circuito lineal de dos terminales puede ser reemplazado por un circuito equivalente que consiste en una fuente de voltaje (V<sub>th</sub>) en serie con una resistencia (R<sub>th</sub>).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Circuito Original */}
                <div>
                    <h3 style={{ color: 'var(--primary-color)' }}>Circuito Original</h3>
                    <p>
                        Cualquier red lineal con fuentes y resistencias.
                    </p>

                    {/* Diagrama Circuito Original */}
                    <div style={{ margin: '1.5rem auto', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                        <svg width="280" height="150" viewBox="0 0 280 150">
                            {/* Terminal A */}
                            <circle cx="40" cy="75" r="5" fill="#00f2ff" />
                            <text x="25" y="70" fill="#00f2ff" fontSize="14" fontWeight="bold">A</text>

                            {/* Complex circuit representation */}
                            <rect x="80" y="40" width="120" height="70" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
                            <text x="110" y="75" fill="#fff" fontSize="12">Red Lineal</text>
                            <text x="105" y="90" fill="#fff" fontSize="10">Fuentes + R</text>

                            {/* Terminal B */}
                            <circle cx="240" cy="75" r="5" fill="#00f2ff" />
                            <text x="245" y="80" fill="#00f2ff" fontSize="14" fontWeight="bold">B</text>

                            {/* Connections */}
                            <line x1="45" y1="75" x2="80" y2="75" stroke="#fff" strokeWidth="2" />
                            <line x1="200" y1="75" x2="235" y2="75" stroke="#fff" strokeWidth="2" />
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                        "Cualquier circuito complejo puede simplificarse."
                    </div>
                </div>

                {/* Circuito Equivalente */}
                <div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Circuito Equivalente de Thévenin</h3>
                    <p>
                        Simplificación a una fuente y una resistencia.
                    </p>

                    {/* Diagrama Equivalente */}
                    <div style={{ margin: '1.5rem auto', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                        <svg width="280" height="150" viewBox="0 0 280 150">
                            {/* Terminal A */}
                            <circle cx="40" cy="75" r="5" fill="#00f2ff" />
                            <text x="25" y="70" fill="#00f2ff" fontSize="14" fontWeight="bold">A</text>

                            {/* Voltage Source */}
                            <circle cx="100" cy="75" r="20" fill="none" stroke="#ff0055" strokeWidth="2" />
                            <text x="85" y="80" fill="#ff0055" fontSize="12" fontWeight="bold">V_th</text>

                            {/* Resistor */}
                            <rect x="150" y="65" width="60" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="165" y="60" fill="#00f2ff" fontSize="12">R_th</text>

                            {/* Terminal B */}
                            <circle cx="240" cy="75" r="5" fill="#00f2ff" />
                            <text x="245" y="80" fill="#00f2ff" fontSize="14" fontWeight="bold">B</text>

                            {/* Connections */}
                            <line x1="45" y1="75" x2="80" y2="75" stroke="#fff" strokeWidth="2" />
                            <line x1="120" y1="75" x2="150" y2="75" stroke="#fff" strokeWidth="2" />
                            <line x1="210" y1="75" x2="235" y2="75" stroke="#fff" strokeWidth="2" />
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)' }}>
                        "Circuito equivalente más simple para análisis."
                    </div>
                </div>
            </div>

            {/* Formulas */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Cálculo del Equivalente</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h4>Voltaje de Thévenin (V<sub>th</sub>)</h4>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Voltaje en circuito abierto entre los terminales A y B.
                        </p>
                        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            V<sub>th</sub> = V<sub>AB(abierto)</sub>
                        </div>
                    </div>
                    <div>
                        <h4>Resistencia de Thévenin (R<sub>th</sub>)</h4>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Resistencia vista desde los terminales con fuentes independientes apagadas.
                        </p>
                        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            R<sub>th</sub> = R<sub>equivalente</sub>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheveninTheory;

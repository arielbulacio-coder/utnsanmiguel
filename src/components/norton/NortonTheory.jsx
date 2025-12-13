import React from 'react';

const NortonTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Teorema de Norton</h2>
            <p>
                El Teorema de Norton establece que cualquier circuito lineal de dos terminales puede ser reemplazado por un circuito equivalente que consiste en una fuente de corriente (I<sub>N</sub>) en paralelo con una resistencia (R<sub>N</sub>).
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
                    <h3 style={{ color: 'var(--secondary-color)' }}>Circuito Equivalente de Norton</h3>
                    <p>
                        Simplificación a una fuente de corriente y una resistencia en paralelo.
                    </p>

                    {/* Diagrama Equivalente */}
                    <div style={{ margin: '1.5rem auto', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                        <svg width="280" height="150" viewBox="0 0 280 150">
                            {/* Terminal A */}
                            <circle cx="40" cy="75" r="5" fill="#00f2ff" />
                            <text x="25" y="70" fill="#00f2ff" fontSize="14" fontWeight="bold">A</text>

                            {/* Current Source (left branch) */}
                            <line x1="45" y1="75" x2="80" y2="75" stroke="#fff" strokeWidth="2" />
                            <line x1="80" y1="75" x2="80" y2="50" stroke="#fff" strokeWidth="2" />
                            <circle cx="80" cy="30" r="15" fill="none" stroke="#ff0055" strokeWidth="2" />
                            <text x="70" y="35" fill="#ff0055" fontSize="12" fontWeight="bold">I_N</text>
                            {/* Arrow */}
                            <polygon points="80,15 75,25 85,25" fill="#ff0055" />
                            <line x1="80" y1="10" x2="80" y2="15" stroke="#fff" strokeWidth="2" />

                            {/* Resistor (right branch) */}
                            <line x1="80" y1="75" x2="80" y2="100" stroke="#fff" strokeWidth="2" />
                            <line x1="120" y1="75" x2="120" y2="50" stroke="#fff" strokeWidth="2" />
                            <rect x="110" y="50" width="20" height="50" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="135" y="75" fill="#00f2ff" fontSize="12">R_N</text>
                            <line x1="120" y1="100" x2="120" y2="75" stroke="#fff" strokeWidth="2" />

                            {/* Common connections */}
                            <line x1="80" y1="10" x2="120" y2="10" stroke="#fff" strokeWidth="2" />
                            <line x1="120" y1="10" x2="200" y2="10" stroke="#fff" strokeWidth="2" />
                            <line x1="200" y1="10" x2="200" y2="75" stroke="#fff" strokeWidth="2" />

                            <line x1="80" y1="100" x2="120" y2="100" stroke="#fff" strokeWidth="2" />
                            <line x1="120" y1="100" x2="200" y2="100" stroke="#fff" strokeWidth="2" />
                            <line x1="200" y1="100" x2="200" y2="75" stroke="#fff" strokeWidth="2" />

                            {/* Terminal B */}
                            <circle cx="200" cy="75" r="5" fill="#00f2ff" />
                            <text x="205" y="80" fill="#00f2ff" fontSize="14" fontWeight="bold">B</text>
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)' }}>
                        "Fuente de corriente en paralelo con resistencia."
                    </div>
                </div>
            </div>

            {/* Formulas and Relationship */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Cálculo del Equivalente</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h4>Corriente de Norton (I<sub>N</sub>)</h4>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Corriente de cortocircuito entre los terminales A y B.
                        </p>
                        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            I<sub>N</sub> = I<sub>cortocircuito</sub>
                        </div>
                    </div>
                    <div>
                        <h4>Resistencia de Norton (R<sub>N</sub>)</h4>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Igual a la resistencia de Thévenin.
                        </p>
                        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            R<sub>N</sub> = R<sub>th</sub>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <h4 style={{ color: 'var(--secondary-color)' }}>Relación con Thévenin</h4>
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        I<sub>N</sub> = V<sub>th</sub> / R<sub>th</sub>
                    </div>
                    <p style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>
                        Los teoremas de Norton y Thévenin son equivalentes y se pueden convertir entre sí.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NortonTheory;

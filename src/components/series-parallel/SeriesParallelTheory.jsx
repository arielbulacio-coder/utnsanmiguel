import React from 'react';

const SeriesParallelTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Resistencias en Serie y Paralelo</h2>
            <p>
                Cuando conectamos resistencias en diferentes configuraciones, podemos calcular la resistencia equivalente total del circuito.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Serie */}
                <div>
                    <h3 style={{ color: 'var(--primary-color)' }}>Resistencias en Serie</h3>
                    <p>
                        En una conexión en <strong>serie</strong>, las resistencias están conectadas una tras otra, formando un único camino para la corriente.
                    </p>

                    {/* Diagrama Serie */}
                    <div style={{ margin: '1.5rem auto', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                        <svg width="280" height="100" viewBox="0 0 280 100">
                            {/* Wire */}
                            <line x1="20" y1="50" x2="260" y2="50" stroke="#fff" strokeWidth="2" />

                            {/* Resistor 1 */}
                            <rect x="50" y="40" width="40" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="65" y="35" fill="#00f2ff" fontSize="12">R1</text>

                            {/* Resistor 2 */}
                            <rect x="120" y="40" width="40" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="135" y="35" fill="#00f2ff" fontSize="12">R2</text>

                            {/* Resistor 3 */}
                            <rect x="190" y="40" width="40" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="205" y="35" fill="#00f2ff" fontSize="12">R3</text>
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                        "La resistencia total es la suma de todas las resistencias."
                    </div>
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub>
                    </div>
                </div>

                {/* Paralelo */}
                <div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Resistencias en Paralelo</h3>
                    <p>
                        En una conexión en <strong>paralelo</strong>, las resistencias comparten los mismos puntos de conexión, creando múltiples caminos para la corriente.
                    </p>

                    {/* Diagrama Paralelo */}
                    <div style={{ margin: '1.5rem auto', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                        <svg width="280" height="120" viewBox="0 0 280 120">
                            {/* Left wire */}
                            <line x1="20" y1="60" x2="80" y2="60" stroke="#fff" strokeWidth="2" />
                            {/* Right wire */}
                            <line x1="200" y1="60" x2="260" y2="60" stroke="#fff" strokeWidth="2" />

                            {/* Branch 1 */}
                            <line x1="80" y1="60" x2="80" y2="30" stroke="#fff" strokeWidth="2" />
                            <rect x="100" y="20" width="80" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="130" y="15" fill="#00f2ff" fontSize="12">R1</text>
                            <line x1="180" y1="30" x2="200" y2="30" stroke="#fff" strokeWidth="2" />
                            <line x1="200" y1="30" x2="200" y2="60" stroke="#fff" strokeWidth="2" />

                            {/* Branch 2 */}
                            <line x1="80" y1="60" x2="100" y2="60" stroke="#fff" strokeWidth="2" />
                            <rect x="100" y="50" width="80" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="130" y="45" fill="#00f2ff" fontSize="12">R2</text>
                            <line x1="180" y1="60" x2="200" y2="60" stroke="#fff" strokeWidth="2" />

                            {/* Branch 3 */}
                            <line x1="80" y1="60" x2="80" y2="90" stroke="#fff" strokeWidth="2" />
                            <rect x="100" y="80" width="80" height="20" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="130" y="75" fill="#00f2ff" fontSize="12">R3</text>
                            <line x1="180" y1="90" x2="200" y2="90" stroke="#fff" strokeWidth="2" />
                            <line x1="200" y1="90" x2="200" y2="60" stroke="#fff" strokeWidth="2" />
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)' }}>
                        "El inverso de la resistencia total es la suma de los inversos de cada resistencia."
                    </div>
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub> + ... + 1/R<sub>n</sub>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeriesParallelTheory;

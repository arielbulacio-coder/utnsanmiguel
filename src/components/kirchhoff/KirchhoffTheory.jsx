import React from 'react';

const KirchhoffTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Leyes de Kirchhoff</h2>
            <p>
                Las leyes de Kirchhoff son dos igualdades que se basan en la conservación de la energía y la carga en los circuitos eléctricos.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div>
                    <h3 style={{ color: 'var(--primary-color)' }}>1ª Ley: Corrientes (KCL)</h3>
                    <p>
                        También llamada <strong>Ley de los Nodos</strong>.
                    </p>

                    {/* KCL Diagram */}
                    <div style={{ margin: '1rem auto' }}>
                        <svg width="200" height="150" viewBox="0 0 200 150">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#00f2ff" />
                                </marker>
                            </defs>
                            {/* Node */}
                            <circle cx="100" cy="75" r="8" fill="#fff" />
                            {/* Arrows In */}
                            <line x1="20" y1="20" x2="90" y2="70" stroke="#00f2ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="30" y="30" fill="#00f2ff" fontSize="12">I1</text>

                            <line x1="20" y1="130" x2="90" y2="80" stroke="#00f2ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="30" y="140" fill="#00f2ff" fontSize="12">I2</text>

                            {/* Arrow Out */}
                            <line x1="110" y1="75" x2="180" y2="75" stroke="#ff0055" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="140" y="65" fill="#ff0055" fontSize="12">I3</text>
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                        "La suma algebraica de las corrientes que entran a un nodo es igual a la suma de las corrientes que salen."
                    </div>
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold' }}>
                        ∑ I<sub>entra</sub> = ∑ I<sub>sale</sub>
                    </div>
                </div>

                <div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>2ª Ley: Voltajes (KVL)</h3>
                    <p>
                        También llamada <strong>Ley de las Mallas</strong>.
                    </p>

                    {/* KVL Diagram */}
                    <div style={{ margin: '1rem auto' }}>
                        <svg width="200" height="150" viewBox="0 0 200 150">
                            {/* Circuit Loop */}
                            <rect x="50" y="30" width="100" height="90" fill="none" stroke="#fff" strokeWidth="2" />
                            {/* Source */}
                            <circle cx="50" cy="75" r="10" fill="none" stroke="#ff0055" strokeWidth="2" />
                            <text x="35" y="80" fill="#ff0055" fontSize="14" fontWeight="bold">V</text>

                            {/* Resistor 1 */}
                            <rect x="90" y="25" width="20" height="10" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="95" y="20" fill="#00f2ff" fontSize="10">R1</text>

                            {/* Resistor 2 */}
                            <rect x="90" y="115" width="20" height="10" fill="none" stroke="#00f2ff" strokeWidth="2" />
                            <text x="95" y="140" fill="#00f2ff" fontSize="10">R2</text>

                            {/* Loop Arrow */}
                            <path d="M 80 60 Q 120 75 80 90" fill="none" stroke="#ffff00" strokeWidth="1" strokeDasharray="4" />
                            <polygon points="80,90 85,85 85,95" fill="#ffff00" />
                        </svg>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)' }}>
                        "En un lazo cerrado, la suma de las caídas de tensión es igual a la tensión total suministrada."
                    </div>
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold' }}>
                        ∑ V<sub>fuente</sub> = ∑ V<sub>caída</sub>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KirchhoffTheory;

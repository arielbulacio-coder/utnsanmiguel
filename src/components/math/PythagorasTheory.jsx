import React from 'react';

const PythagorasTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Teorema de Pitágoras</h2>
            <p>
                El Teorema de Pitágoras es una relación fundamental en geometría euclidiana entre los tres lados de un triángulo rectángulo.
                Establece que en todo triángulo rectángulo, el cuadrado de la hipotenusa (el lado de mayor longitud del triángulo rectángulo)
                es igual a la suma de los cuadrados de los catetos (los dos lados menores del triángulo, los que conforman el ángulo recto).
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <svg width="250" height="200" viewBox="0 0 250 200">
                        {/* Triángulo */}
                        <path d="M 50 150 L 200 150 L 50 50 Z" fill="var(--glass-bg)" stroke="var(--primary-color)" strokeWidth="3" />

                        {/* Ángulo recto */}
                        <path d="M 50 140 L 60 140 L 60 150" fill="none" stroke="var(--secondary-color)" strokeWidth="2" />

                        {/* Etiquetas */}
                        <text x="30" y="100" fill="var(--text-main)" fontSize="18" fontWeight="bold">a</text>
                        <text x="120" y="170" fill="var(--text-main)" fontSize="18" fontWeight="bold">b</text>
                        <text x="135" y="95" fill="var(--primary-color)" fontSize="18" fontWeight="bold">c</text>

                        {/* Indicadores de catetos e hipotenusa */}
                        <text x="50" y="190" fill="var(--text-dim)" fontSize="12" textAnchor="middle">Cateto opuesto</text>
                        <text x="125" y="190" fill="var(--text-dim)" fontSize="12" textAnchor="middle">Cateto adyacente</text>
                    </svg>
                </div>

                <div className="glass-card" style={{ margin: 0, border: '1px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)', textAlign: 'center', fontSize: '2rem', margin: '0 0 1rem 0' }}>
                        a² + b² = c²
                    </h3>
                    <p>Donde:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><strong>a</strong> y <strong>b</strong> son los catetos.</li>
                        <li><strong>c</strong> es la hipotenusa.</li>
                    </ul>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', marginTop: '1rem', fontSize: '0.9rem' }}>
                        <p style={{ margin: 0 }}><strong>Para despejar:</strong></p>
                        <ul style={{ margin: '0.5rem 0 0 0' }}>
                            <li>c = √(a² + b²)</li>
                            <li>a = √(c² - b²)</li>
                            <li>b = √(c² - a²)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ejemplo Práctico</h3>
                <p>
                    Si tenemos un triángulo con catetos de 3 cm y 4 cm:
                </p>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic', borderLeft: '4px solid var(--primary-color)' }}>
                    3² + 4² = c² <br />
                    9 + 16 = c² <br />
                    25 = c² <br />
                    c = √25 = <strong>5 cm</strong>
                </div>
            </div>
        </div>
    );
};

export default PythagorasTheory;

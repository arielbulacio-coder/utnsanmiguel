import React from 'react';

const TrigonometryTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Teoría de Trigonometría</h2>
            <p>
                La trigonometría es la rama de las matemáticas que estudia las relaciones entre los lados y los ángulos de los triángulos.
                En un triángulo rectángulo, estas relaciones se definen como razones trigonométricas.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <svg width="250" height="200" viewBox="0 0 250 200">
                        {/* Triángulo */}
                        <path d="M 50 150 L 200 150 L 200 50 Z" fill="var(--glass-bg)" stroke="var(--primary-color)" strokeWidth="3" />

                        {/* Ángulo recto */}
                        <path d="M 190 150 L 190 140 L 200 140" fill="none" stroke="var(--secondary-color)" strokeWidth="2" />

                        {/* Ángulo θ */}
                        <path d="M 70 150 A 20 20 0 0 0 65 140" fill="none" stroke="var(--primary-color)" strokeWidth="2" />

                        {/* Etiquetas */}
                        <text x="60" y="135" fill="var(--primary-color)" fontSize="18" fontWeight="bold">θ</text>
                        <text x="125" y="170" fill="var(--text-main)" fontSize="16">Cateto Adyacente (b)</text>
                        <text x="210" y="100" fill="var(--text-main)" fontSize="16" style={{ writingMode: 'vertical-rl' }}>Cateto Opuesto (a)</text>
                        <text x="110" y="90" fill="var(--secondary-color)" fontSize="16" fontWeight="bold" transform="rotate(-33, 110, 90)">Hipotenusa (h)</text>
                    </svg>
                </div>

                <div className="glass-card" style={{ margin: 0, border: '1px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Razones Principales</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'var(--glass-bg)', padding: '0.8rem', borderRadius: '8px' }}>
                            <strong>SOH:</strong> Sen(θ) = Opuesto / Hipotenusa
                        </div>
                        <div style={{ background: 'var(--glass-bg)', padding: '0.8rem', borderRadius: '8px' }}>
                            <strong>CAH:</strong> Cos(θ) = Adyacente / Hipotenusa
                        </div>
                        <div style={{ background: 'var(--glass-bg)', padding: '0.8rem', borderRadius: '8px' }}>
                            <strong>TOA:</strong> Tan(θ) = Opuesto / Adyacente
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ejemplo de Aplicación</h3>
                <p>
                    Si conocemos un ángulo θ = 30° y la hipotenusa h = 10 cm, para hallar el cateto opuesto (a):
                </p>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic', borderLeft: '4px solid var(--secondary-color)' }}>
                    Sen(30°) = a / 10 <br />
                    0.5 = a / 10 <br />
                    a = 0.5 × 10 = <strong>5 cm</strong>
                </div>
            </div>
        </div>
    );
};

export default TrigonometryTheory;

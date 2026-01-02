import React from 'react';

const KinematicsTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Cinemática</h2>
            <p>
                La cinemática es la rama de la física que describe el movimiento de los objetos sólidos sin considerar las causas que lo originan (las fuerzas). Se centra en el estudio de la trayectoria en función del tiempo.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>MRU</h3>
                    <p><strong>Movimiento Rectilíneo Uniforme</strong></p>
                    <p>La velocidad es constante y la trayectoria es una línea recta.</p>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                        <strong>v = d / t</strong>
                    </div>
                    <ul style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-dim)' }}>
                        <li>v: Velocidad (m/s)</li>
                        <li>d: Distancia (m)</li>
                        <li>t: Tiempo (s)</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--secondary-color)' }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>MRUV</h3>
                    <p><strong>Movimiento Rectilíneo Uniformemente Variado</strong></p>
                    <p>Existe una aceleración constante, por lo que la velocidad cambia uniformemente.</p>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                        <strong>a = (v<sub>f</sub> - v<sub>i</sub>) / t</strong>
                    </div>
                    <ul style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-dim)' }}>
                        <li>a: Aceleración (m/s²)</li>
                        <li>v<sub>f</sub>: Velocidad Final</li>
                        <li>v<sub>i</sub>: Velocidad Inicial</li>
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ejemplo MRU</h3>
                <p>
                    Un móvil recorre <strong>100 metros</strong> en <strong>5 segundos</strong> con velocidad constante.
                </p>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic', borderLeft: '4px solid var(--primary-color)' }}>
                    v = 100m / 5s = <strong>20 m/s</strong>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ecuaciones Horarias (MRUV)</h3>
                <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
                    <div>d = v<sub>i</sub> · t + ½ · a · t²</div>
                    <div>v<sub>f</sub> = v<sub>i</sub> + a · t</div>
                    <div>v<sub>f</sub>² = v<sub>i</sub>² + 2 · a · d</div>
                </div>
            </div>
        </div>
    );
};

export default KinematicsTheory;

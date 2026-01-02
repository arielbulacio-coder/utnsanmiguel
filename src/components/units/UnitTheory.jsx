import React from 'react';

const UnitTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Teoría de Conversión de Unidades</h2>
            <p>
                La conversión de unidades es la transformación del valor numérico de una magnitud física,
                expresado en una cierta unidad de medida, en otro valor numérico equivalente y expresado
                en otra unidad de medida de la misma naturaleza.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0 }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Longitud: Pulgadas a Centímetros</h3>
                    <p>
                        La pulgada (inch) es una unidad de longitud, principalmente utilizada en los sistemas
                        de unidades de medida británico y estadounidense.
                    </p>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                        <strong>1 pulgada (in) = 2.54 centímetros (cm)</strong>
                    </div>
                </div>

                <div className="glass-card" style={{ margin: 0 }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Longitud: Yardas a Metros</h3>
                    <p>
                        La yarda (yard) es la unidad de longitud básica en los sistemas de medida utilizado
                        en EE. UU. y el Reino Unido.
                    </p>
                    <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                        <strong>1 yarda (yd) = 0.9144 metros (m)</strong>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>¿Cómo realizar la conversión?</h3>
                <p>
                    Para pasar de una unidad a otra, utilizamos el <strong>factor de conversión</strong>:
                </p>
                <ul>
                    <li>Para pasar de <strong>Pulgadas a cm</strong>: Multiplicamos por 2.54</li>
                    <li>Para pasar de <strong>Centímetros a Pulgadas</strong>: Dividimos por 2.54</li>
                    <li>Para pasar de <strong>Yardas a Metros</strong>: Multiplicamos por 0.9144</li>
                    <li>Para pasar de <strong>Metros a Yardas</strong>: Dividimos por 0.9144</li>
                </ul>
            </div>
        </div>
    );
};

export default UnitTheory;

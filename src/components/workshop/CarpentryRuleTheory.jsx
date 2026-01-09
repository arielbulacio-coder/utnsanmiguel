import React from 'react';
import imgRule from '../../assets/ruler_v2.png';

const CarpentryRuleTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Metro de Carpintero (Plegable)</h2>
            <div className="grid-responsive-2col" style={{ alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'left' }}>
                    <p>
                        El <strong>metro plegable</strong> es la herramienta de medición clásica del carpintero.
                        Generalmente hecho de madera (boxwood) o fibra de vidrio, consta de segmentos articulados
                        que le permiten plegarse para el transporte y desplegarse para medir longitudes de hasta 2 metros.
                    </p>
                    <p>
                        A diferencia de la cinta métrica flexible, el metro plegable es rígido, lo que permite:
                    </p>
                    <ul style={{ lineHeight: '1.6' }}>
                        <li>Medir distancias verticales sin que la herramienta se doble.</li>
                        <li>Realizar mediciones en el aire (voladizos).</li>
                        <li>Servir como regla para trazar líneas rectas cortas.</li>
                    </ul>
                </div>
                <div className="glass-card" style={{ background: 'white', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={imgRule}
                        alt="Metro Plegable"
                        style={{ width: '100%', maxWidth: '300px', objectFit: 'contain' }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <h3>Cómo realizar una medición</h3>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #d4a373' }}>
                    <p>1. Despliega solo las secciones necesarias para la medida que vas a realizar.</p>
                    <p>2. Apoya el extremo inicial (0 cm) firmemente contra el tope o borde de la pieza.</p>
                    <p>3. Lee la medida en el punto de destino, asegurándote de mirar perpendicularmente a la escala para evitar errores de paralaje.</p>
                    <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-dim)' }}>
                        Nota: Mantén las articulaciones limpias y aceitadas para prolongar la vida útil de la herramienta.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarpentryRuleTheory;

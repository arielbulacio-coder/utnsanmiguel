import React from 'react';

const CaliperTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Calibre (Pie de Rey)</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Viernier_caliper.jpg"
                        alt="Calibre Pie de Rey"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
            <p>
                El calibre o pie de rey es un instrumento de medición, principalmente de diámetros exteriores, interiores y profundidades, utilizado en el ámbito industrial. Consta de una regla con una escuadra en un extremo, sobre la cual se desliza otra escuadra que indica la medida en una escala.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Tipos de Medición</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Exteriores:</strong> Usando las mordazas grandes inferiores.</li>
                        <li><strong>Interiores:</strong> Usando las orejetas pequeñas superiores.</li>
                        <li><strong>Profundidad:</strong> Usando la varilla que sale por el extremo final.</li>
                        <li><strong>Escalones:</strong> Usando la parte posterior del calibre.</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--secondary-color)' }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Lectura del Nonio</h3>
                    <p>La precisión más común es de 0,05 mm o 0,02 mm. Consta de:</p>
                    <ol style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Escala Fija:</strong> Indica los milímetros enteros (donde coincide el 0 del nonio).</li>
                        <li><strong>Escala Móvil (Nonio):</strong> Indica la fracción de milímetro buscando la línea que coincida exactamente con alguna línea de la escala fija.</li>
                    </ol>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Procedimiento de Lectura</h3>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                    <p>1. Observamos cuántos milímetros enteros hay en la regla fija antes del cero del nonio.</p>
                    <p>2. Buscamos la primera marca del nonio que coincida perfectamente con una marca de la regla fija.</p>
                    <p>3. Sumamos ambos valores.</p>
                    <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                        Ejemplo: Si el 0 del nonio pasó los 24 mm y la marca '7' del nonio coincide: <strong>24 + 0,70 = 24,70 mm</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CaliperTheory;

import React from 'react';

const CarpentryRuleTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Metro de Carpintero (Metro Plegable)</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Zollstock-1.jpg"
                        alt="Metro Plegable"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
            <p>
                El metro plegable es una herramienta clásica de carpintería diseñada para realizar mediciones de longitud con comodidad. A diferencia de la cinta métrica flexible, su rigidez permite medir distancias sin que la herramienta se doble, facilitando el trabajo en solitario.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid #d4a373' }}>
                    <h3 style={{ color: '#d4a373' }}>Características</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Material:</strong> Generalmente madera de haya, fibra de vidrio o aluminio.</li>
                        <li><strong>Articulaciones:</strong> Láminas unidas por remaches que permiten plegarlo y desplegarlo.</li>
                        <li><strong>Longitud:</strong> Lo más común es de 2 metros dividido en 10 partes de 20 cm.</li>
                        <li><strong>Precisión:</strong> Escala en milímetros y centímetros en ambas caras.</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid #bc6c25' }}>
                    <h3 style={{ color: '#bc6c25' }}>Ventajas en Carpintería</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Rigidez:</strong> Ideal para medir alturas o distancias horizontales sin apoyo intermedio.</li>
                        <li><strong>Trazado:</strong> Se puede usar como regla rígida para marcar líneas rectas sobre la madera.</li>
                        <li><strong>Medición Interior:</strong> Permite medir huecos (ventanas, marcos) con gran estabilidad.</li>
                    </ul>
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

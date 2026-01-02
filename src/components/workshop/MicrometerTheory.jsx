import React from 'react';

const MicrometerTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Micrómetro (Tornillo de Palmer)</h2>
            <p>
                El micrómetro es un instrumento de medición de alta precisión utilizado en talleres mecánicos para medir dimensiones con una exactitud de centésimas de milímetro (0,01 mm) o incluso milésimas (micras).
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Partes Principales</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Cuerpo o Yunque:</strong> Punto fijo de medida.</li>
                        <li><strong>Husillo:</strong> Parte móvil que presiona el objeto.</li>
                        <li><strong>Escala Graduada:</strong> Línea central con marcas superiores (1 mm) e inferiores (0,5 mm).</li>
                        <li><strong>Tambor:</strong> Escala circular dividida en 50 partes (0,01 mm cada una).</li>
                        <li><strong>Trinquete:</strong> Controla la presión de contacto.</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--secondary-color)' }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>¿Cómo leerlo?</h3>
                    <ol style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Lectura del cuerpo:</strong> Ver el último milímetro entero visible.</li>
                        <li><strong>Medios milímetros:</strong> Observar si se ve la marca inferior de 0,5 mm después del entero.</li>
                        <li><strong>Lectura del tambor:</strong> Buscar la línea del tambor que coincide con la línea horizontal del cuerpo.</li>
                        <li><strong>Suma total:</strong> Cuerpo + Tambor = Medida final.</li>
                    </ol>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Ejemplo de Lectura</h3>
                <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                    <p>Si en el cuerpo vemos la marca de <strong>7 mm</strong>, vemos también la marca de <strong>0,5 mm</strong> inferior, y en el tambor el número <strong>12</strong> coincide con la línea central:</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                        7,00 + 0,50 + 0,12 = 7,62 mm
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MicrometerTheory;

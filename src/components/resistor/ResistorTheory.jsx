import React from 'react';

const ResistorTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Código de Colores de Resistencias</h2>
            <p>
                Las resistencias utilizan un código de bandas de colores para indicar su valor óhmico y su tolerancia.
                La normas estándar (EIA) definen cómo leer estas bandas.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div>
                    <h3>Cómo leer el código</h3>
                    <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
                        <li><strong>1ª Banda:</strong> Primer dígito significativo.</li>
                        <li><strong>2ª Banda:</strong> Segundo dígito significativo.</li>
                        <li><strong>3ª Banda (Multiplicador):</strong> Por cuánto se multiplican los primeros dígitos.</li>
                        <li><strong>4ª Banda (Tolerancia):</strong> Precisión del componente (ej. dorado ±5%).</li>
                    </ul>
                </div>

                <div>
                    <h3>Tabla de Valores</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'black', border: '1px solid #555' }}></span> Negro (0)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'brown' }}></span> Marrón (1)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'red' }}></span> Rojo (2)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'orange' }}></span> Naranja (3)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'yellow' }}></span> Amarillo (4)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'green' }}></span> Verde (5)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'blue' }}></span> Azul (6)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'violet' }}></span> Violeta (7)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'grey' }}></span> Gris (8)</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'white', border: '1px solid #555' }}></span> Blanco (9)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResistorTheory;

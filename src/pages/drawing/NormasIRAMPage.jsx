import React from 'react';
import './DrawingStyles.css';

const NormasIRAMPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Normas IRAM - Dibujo Técnico</h1>
                <p>Base fundamental para la comunicación técnica en Argentina (Niveles I y II).</p>
            </header>

            <div className="drawing-grid">
                {/* 1er AÑO - NIVEL BÁSICO */}
                <section className="drawing-card level-basic">
                    <div className="level-badge">1er AÑO - NIVEL BÁSICO</div>
                    <h2>IRAM 4504: El Espacio de Trabajo</h2>
                    <p>Dominar el formato A4 y A3 es el primer paso del dibujante técnico.</p>
                    <div className="format-table">
                        <div className="format-row"><span>A4:</span> 210 x 297 mm</div>
                        <div className="format-row"><span>A3:</span> 297 x 420 mm</div>
                    </div>
                    <div className="info-box">
                        <strong>Márgenes para A4:</strong> 25mm izquierdo (perforación), resto 10mm. El Recuadro de datos (Rótulo) debe medir 175mm de ancho.
                    </div>
                    <h3>Ejercicio Nivel 1</h3>
                    <p>Trazar márgenes y rótulo en hoja A4. Practicar caligrafía IRAM 4503 (Letra h=7mm y h=5mm) completando los datos del rótulo.</p>
                </section>

                {/* TABLA DE LÍNEAS EXPANDIDA */}
                <section className="drawing-card">
                    <h2>IRAM 4502: El Alfabeto de Líneas</h2>
                    <p>Cada línea cuenta una historia distinta sobre el objeto.</p>
                    <table className="iram-table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Espesor (mm)</th>
                                <th>Aplicación Técnica</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>A</strong> (Continua gruesa)</td>
                                <td>0.5 - 0.8</td>
                                <td>Contornos y aristas visibles.</td>
                            </tr>
                            <tr>
                                <td><strong>B</strong> (Continua fina)</td>
                                <td>0.2 - 0.3</td>
                                <td>Cotas, auxiliares, rayados, hilos de rosca.</td>
                            </tr>
                            <tr>
                                <td><strong>E</strong> (Trazos)</td>
                                <td>0.3 - 0.4</td>
                                <td>Aristas y contornos ocultos.</td>
                            </tr>
                            <tr>
                                <td><strong>F</strong> (Trazo largo y punto)</td>
                                <td>0.2 - 0.3</td>
                                <td>Ejes de simetría, planos de corte.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* 2do AÑO - NIVEL AVANZADO */}
                <section className="drawing-card level-advanced">
                    <div className="level-badge">2do AÑO - AVANZADO</div>
                    <h2>IRAM 4505: El Arte de Escalar</h2>
                    <p>Representar objetos gigantes (edificios) o minúsculos (piezas de reloj) con precisión matemática.</p>
                    <div className="scale-formula">
                        <strong>Fórmula:</strong> Valor Dibujo = Valor Real × Escala
                    </div>
                    <ul className="advanced-list">
                        <li><strong>Reducción:</strong> 1:2.5, 1:20, 1:50, 1:100 (Uso civil e industrial).</li>
                        <li><strong>Ampliación:</strong> 5:1, 10:1 (Micro-mecanismos).</li>
                    </ul>
                    <h3>Desafío Avanzado</h3>
                    <p>Representar una pieza cuya medida real es de 2500mm en una hoja A4 (Escala 1:20 o 1:50). ¿Cuál escala permite mayor detalle sin salirse del papel?</p>
                </section>

                {/* ACOTACIÓN IRAM 4513 */}
                <section className="drawing-card">
                    <h2>IRAM 4513: Acotación (Dimensionado)</h2>
                    <p>Un dibujo sin medidas es solo un dibujo; con cotas, es un plano de fabricación.</p>
                    <div className="acotacion-rules">
                        <ul>
                            <li><strong>Líneas de cota:</strong> Separadas 7-10mm del contorno.</li>
                            <li><strong>Flechas:</strong> Proporción 3:1 (largo:ancho).</li>
                            <li><strong>Ubicación:</strong> Siempre arriba o a la izquierda de la línea, centrada.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <div className="mega-exercises-section">
                <h2>Caja de Herramientas: Ejercicios de Aplicación</h2>
                <div className="exercise-tabs">
                    <div className="exercise-item basic">
                        <h4>Fichas 1er Año (Básico)</h4>
                        <ul>
                            <li><strong>Lámina #1:</strong> Trazado de paralelas a 45° y 30°/60° usando escuadras (Nivel de pulso).</li>
                            <li><strong>Lámina #2:</strong> Caligrafía técnica (Abecedario completo y números A y B).</li>
                            <li><strong>Lámina #3:</strong> Dibujo de figuras planas simples usando solo línea Tipo A y Tipo B.</li>
                        </ul>
                    </div>
                    <div className="exercise-item advanced">
                        <h4>Proyectos 2do Año (Avanzado)</h4>
                        <ul>
                            <li><strong>Proyecto A:</strong> Plano de planta de un aula a escala 1:50 incluyendo mobiliario técnico.</li>
                            <li><strong>Proyecto B:</strong> Acotación en cadena vs. Acotación en paralelo de una pieza mecánica compleja.</li>
                            <li><strong>Proyecto C:</strong> Interpretación de planos: A partir de una perspectiva, deducir las medidas reales sabiendo que está en E 1:2.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                .level-badge {
                    background: var(--primary-color);
                    color: #000;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    display: inline-block;
                    margin-bottom: 1rem;
                }
                .level-basic { border-left: 5px solid #00f2ff; }
                .level-advanced { border-left: 5px solid #ff00f2; }
                .format-table { display: flex; flex-direction: column; gap: 5px; margin: 10px 0; font-family: monospace; }
                .scale-formula { background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0; border: 1px solid var(--primary-color); }
                .advanced-list { columns: 2; font-size: 0.9rem; }
                .mega-exercises-section { margin-top: 4rem; padding: 2rem; background: var(--glass-bg); border-radius: 20px; border: 1px solid var(--glass-border); }
                .exercise-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem; }
                .exercise-item { padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); }
                .exercise-item.basic h4 { color: #00f2ff; }
                .exercise-item.advanced h4 { color: #ff00f2; }
                @media (max-width: 768px) { .exercise-tabs { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default NormasIRAMPage;

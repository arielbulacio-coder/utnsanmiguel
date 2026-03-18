import React from 'react';
import './DrawingStyles.css';

const AxonometricPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Perspectivas: Isométrica y Caballera</h1>
                <p>Nivel I (Sólidos Primitivos) y Nivel II (Planos Inclinados y Círculos)</p>
            </header>

            <div className="drawing-grid">
                {/* ISOMETRICA NIVEL 1 */}
                <section className="drawing-card level-basic">
                    <div className="level-badge">1er AÑO - BÁSICO</div>
                    <h2>Isométrica de Bloques</h2>
                    <p>Uso de ejes a 30° para representar volúmenes simples. En 1er Año, nos enfocamos en bloques sólidos sin reducciones.</p>
                    <div className="cube-demo">
                        <svg viewBox="0 0 100 60" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                            <path d="M50 10 L80 27 L80 57 L50 40 L20 57 L20 27 Z" fill="none" stroke="var(--primary-color)" />
                            <path d="M50 10 L50 40 L80 27 M50 40 L20 27" fill="none" stroke="var(--primary-color)" />
                        </svg>
                        <div className="info-box"><strong>TP 10:</strong> Representar un conjunto de 3 prismas rectangulares de 30x20x60mm en posición vertical y horizontal.</div>
                    </div>
                </section>

                {/* ISOMETRICA NIVEL 2 */}
                <section className="drawing-card level-advanced">
                    <div className="level-badge">2do AÑO - AVANZADO</div>
                    <h2>Perspectiva de Arcos y Círculos</h2>
                    <p>Un círculo en perspectiva isométrica se convierte en una elipse. Utilizamos el **Método de los 4 centros** para trazar óvalos perfectos sobre las caras del cubo.</p>
                    <div className="circles-demo">
                        <svg viewBox="0 0 100 60" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                            <path d="M50 10 L80 27 L50 44 L20 27 Z" fill="none" stroke="#555" strokeDasharray="2,1" />
                            <ellipse cx="50" cy="27" rx="25" ry="12" fill="none" stroke="var(--secondary-color)" strokeWidth="1.5" />
                        </svg>
                        <div className="info-box"><strong>TP 11:</strong> Dibujar un cilindro de 60mm de diámetro y 100mm de altura centrado en la lámina.</div>
                    </div>
                </section>

                {/* CABALLERA NIVEL 2 */}
                <section className="drawing-card">
                    <h2>Perspectiva Caballera y Reducción</h2>
                    <p>Ideal para ver una cara de frente (Escala 1:1) y dar profundidad a 45°.</p>
                    <div className="cavalier-box">
                        <p><strong>Coeficiente de Reducción (K):</strong></p>
                        <ul>
                            <li><strong>K = 1:</strong> Altura y Profundidad iguales (Se ve deformado).</li>
                            <li><strong>K = 0.5 (IRAM):</strong> Profundidad al 50% (Proporción visual correcta).</li>
                        </ul>
                        <div className="info-box"><strong>Fórmula:</strong> Medida en eje Z = Medida Real × 0.5</div>
                    </div>
                </section>

                <section className="drawing-card full-width">
                    <h2>Ejercicios Integrales (Nivel 1 y 2)</h2>
                    <div className="exercise-tabs">
                        <div className="exercise-item basic">
                            <h4>Proyectos Ciclo Básico (1°)</h4>
                            <p>Trazar un dado con puntos (agujeros circulares aproximados) en perspectiva isométrica.</p>
                            <ul>
                                <li>Dominio de escuadras a 30°.</li>
                                <li>Paralelismo de aristas.</li>
                            </ul>
                        </div>
                        <div className="exercise-item advanced">
                            <h4>Proyectos Ciclo Superior (2°)</h4>
                            <p>Perspectiva de piezas mecánicas con planos inclinados y perforaciones cilíndricas.</p>
                            <ul>
                                <li>Trazado de óvalos por 4 centros.</li>
                                <li>Acotación en perspectiva según IRAM.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AxonometricPage;

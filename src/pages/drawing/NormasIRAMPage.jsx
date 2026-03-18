import React from 'react';
import './DrawingStyles.css';

const NormasIRAMPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Normas IRAM - Dibujo Técnico</h1>
                <p>Regulaciones fundamentales para la representación gráfica en Argentina.</p>
            </header>

            <div className="drawing-grid">
                <section className="drawing-card">
                    <h2>IRAM 4504: Formatos, Láminas y Rótulo</h2>
                    <p>Define los tamaños de papel y la disposición de los márgenes y el recuadro de datos.</p>
                    <ul>
                        <li><strong>A0:</strong> 841 x 1189 mm</li>
                        <li><strong>A1:</strong> 594 x 841 mm</li>
                        <li><strong>A2:</strong> 420 x 594 mm</li>
                        <li><strong>A3:</strong> 297 x 420 mm</li>
                        <li><strong>A4:</strong> 210 x 297 mm</li>
                    </ul>
                </section>

                <section className="drawing-card">
                    <h2>IRAM 4502: Tipos de Líneas</h2>
                    <table className="iram-table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Representación</th>
                                <th>Aplicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>A</strong> (Gruesa)</td>
                                <td>──────</td>
                                <td>Contornos y aristas visibles.</td>
                            </tr>
                            <tr>
                                <td><strong>B</strong> (Fina)</td>
                                <td>──────</td>
                                <td>Líneas de cota, auxiliares, rayados.</td>
                            </tr>
                            <tr>
                                <td><strong>E</strong> (Trazos)</td>
                                <td>- - - - -</td>
                                <td>Contornos y aristas ocultas.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="drawing-card">
                    <h2>IRAM 4503: Letras y Números</h2>
                    <p>Establece los tipos de escritura (vertical o inclinada a 75°) para asegurar la legibilidad.</p>
                    <div className="alphabet-preview">
                        ABCDEFGHIJKLMN... 1234567890
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>IRAM 4505: Escalas</h2>
                    <p>Relación entre la medida del dibujo y la realidad.</p>
                    <ul>
                        <li><strong>Natural:</strong> 1:1</li>
                        <li><strong>Ampliación:</strong> 2:1, 5:1</li>
                        <li><strong>Reducción:</strong> 1:2, 1:5, 1:10</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default NormasIRAMPage;

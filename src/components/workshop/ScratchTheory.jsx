import React from 'react';

const ScratchTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>Introducción a la Programación con Scratch</h2>
            <p>
                Scratch es un lenguaje de programación visual desarrollado por el MIT Media Lab.
                Permite crear historias interactivas, juegos y animaciones mediante el uso de bloques que se unen como un rompecabezas.
            </p>

            <div className="grid-responsive-2col">
                <div className="glass-card p-3">
                    <h3>🧩 ¿Qué son los Bloques?</h3>
                    <p>
                        En lugar de escribir código con texto, en Scratch usamos bloques de colores. Cada color representa una categoría diferente de instrucciones:
                    </p>
                    <ul style={{ textAlign: 'left', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ color: '#4C97FF' }}>🟦 <strong>Movimiento:</strong> Mover y girar objetos (Sprites).</li>
                        <li style={{ color: '#9966FF' }}>🟪 <strong>Apariencia:</strong> Cambiar disfraces y decir mensajes.</li>
                        <li style={{ color: '#D65CD6' }}>🌸 <strong>Sonido:</strong> Reproducir efectos de audio.</li>
                        <li style={{ color: '#FFAB19' }}>🟧 <strong>Eventos:</strong> Iniciar acciones (ej. "Al presionar bandera verde").</li>
                        <li style={{ color: '#FFBF00' }}>🟨 <strong>Control:</strong> Bucles (repetir) y condicionales (si... entonces).</li>
                    </ul>
                </div>

                <div className="glass-card p-3">
                    <h3>🔄 Estructuras Básicas</h3>
                    <p>
                        <strong>Secuencia:</strong> Los bloques se ejecutan uno tras otro, de arriba a abajo.
                    </p>
                    <p>
                        <strong>Bucles (Loops):</strong> El bloque "Por siempre" o "Repetir" permite que una acción se realice múltiples veces sin repetir el código.
                    </p>
                    <p>
                        <strong>Condicionales:</strong> El bloque "Si... entonces" permite tomar decisiones. Por ejemplo: <i>"Si toco el color rojo, entonces rebotar"</i>.
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <h3>🚀 Tu Primer Algoritmo</h3>
                <p>Un algoritmo es una serie de pasos para resolver un problema. En Scratch, un programa simple podría ser:</p>
                <div style={{ background: '#f0f0f0', color: '#333', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', textAlign: 'left', borderLeft: '5px solid #FFAB19' }}>
                    1. Al presionar 🏳️ (Bandera Verde)<br />
                    2. Por siempre 🔁<br />
                    &nbsp;&nbsp;3. Mover 10 pasos 🟦<br />
                    &nbsp;&nbsp;4. Si toca un borde, rebotar 🟦
                </div>
            </div>
        </div>
    );
};

export default ScratchTheory;

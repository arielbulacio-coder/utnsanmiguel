import React from 'react';

const OscilloscopeTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Osciloscopio</h2>
            <p>
                El osciloscopio es un instrumento de visualización electrónica que permite observar señales eléctricas variables en el tiempo. A diferencia del multímetro, que entrega un valor numérico, el osciloscopio muestra una gráfica (forma de onda) que representa el voltaje en el eje vertical (Y) frente al tiempo en el eje horizontal (X).
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Controles Verticales (Y)</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Volts/Div:</strong> Ajusta la escala de voltaje. Cada división del "grid" representa esta cantidad de Voltios.</li>
                        <li><strong>Posición (Offset):</strong> Desplaza la señal hacia arriba o abajo en la pantalla.</li>
                        <li><strong>Acoplamiento:</strong> Permite elegir entre ver toda la señal (DC) o solo la parte variable (AC).</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--secondary-color)' }}>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Controles Horizontales (X)</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Time/Div:</strong> Ajusta la base de tiempo. Define cuántos segundos (o milisegundos) representa cada cuadro horizontal.</li>
                        <li><strong>Trigger:</strong> Estabiliza la imagen de la onda sincronizando el inicio del barrido con un punto específico de la señal.</li>
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Mediciones Comunes</h3>
                <div className="grid-responsive-3col" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📏</div>
                        <strong>Vpp</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Voltaje Pico a Pico: de la cresta al valle.</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
                        <strong>Periodo (T)</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Tiempo que tarda la señal en completar un ciclo.</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
                        <strong>Frecuencia (f)</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Número de ciclos por segundo (f = 1/T).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OscilloscopeTheory;

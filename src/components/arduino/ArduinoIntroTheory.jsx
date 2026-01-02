import React from 'react';

const ArduinoIntroTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>¿Qué es Arduino?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                    <img
                        src="https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&h=400&fit=crop"
                        alt="Placa Arduino"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
            <p>
                <strong>Arduino</strong> es una plataforma de hardware y software de código abierto diseñada para facilitar la creación de proyectos electrónicos interactivos. Consiste en una placa con un microcontrolador programable y un entorno de desarrollo (IDE) que permite escribir, compilar y cargar programas.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid #00979D' }}>
                    <h3 style={{ color: '#00979D' }}>Componentes de la Placa</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Microcontrolador ATmega:</strong> El "cerebro" que ejecuta el código.</li>
                        <li><strong>Pines Digitales (0-13):</strong> Entrada/Salida digital (HIGH/LOW).</li>
                        <li><strong>Pines Analógicos (A0-A5):</strong> Lectura de voltajes de 0 a 5V.</li>
                        <li><strong>Pines PWM (~):</strong> Salidas con modulación de ancho de pulso.</li>
                        <li><strong>Puerto USB:</strong> Comunicación y programación.</li>
                        <li><strong>Alimentación:</strong> 5V regulados, entrada de 7-12V.</li>
                    </ul>
                </div>

                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid #E47128' }}>
                    <h3 style={{ color: '#E47128' }}>Modelos Populares</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        <li><strong>Arduino UNO:</strong> El más usado para aprender. ATmega328P.</li>
                        <li><strong>Arduino Nano:</strong> Versión compacta del UNO.</li>
                        <li><strong>Arduino Mega:</strong> Más pines y memoria para proyectos grandes.</li>
                        <li><strong>Arduino Leonardo:</strong> Puede emular teclado/mouse USB.</li>
                        <li><strong>ESP32/ESP8266:</strong> WiFi integrado (compatibles con IDE).</li>
                    </ul>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderTop: '4px solid #00979D', background: 'rgba(0, 151, 157, 0.05)' }}>
                <h3 style={{ color: '#00979D' }}>⚡ El Ciclo de Trabajo</h3>
                <div className="grid-responsive-3col" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                        <strong>1. Escribir</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Código en el IDE de Arduino (C/C++ simplificado)</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔨</div>
                        <strong>2. Compilar</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Verificar errores y generar código máquina</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                        <strong>3. Subir</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Cargar el programa a la placa via USB</p>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #fbbf24' }}>
                <h3 style={{ color: '#fbbf24' }}>📌 Estructura Básica de un Sketch</h3>
                <pre style={{
                    background: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '0.9rem',
                    fontFamily: 'Consolas, Monaco, monospace'
                }}>
                    {`// Comentario de una línea

/*
   Comentario
   de múltiples líneas
*/

void setup() {
    // Se ejecuta UNA sola vez al iniciar
    pinMode(13, OUTPUT);  // Configura pin 13 como salida
}

void loop() {
    // Se ejecuta EN BUCLE infinito
    digitalWrite(13, HIGH);  // Enciende LED
    delay(1000);             // Espera 1 segundo
    digitalWrite(13, LOW);   // Apaga LED
    delay(1000);             // Espera 1 segundo
}`}
                </pre>
            </div>
        </div>
    );
};

export default ArduinoIntroTheory;

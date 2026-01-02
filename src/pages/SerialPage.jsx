import React from 'react';
import SerialMonitorSimulator from '../components/arduino/SerialMonitorSimulator';

const SerialPage = () => {
    return (
        <div className="app-container">
            <h1>Comunicación Serial</h1>
            <p style={{ fontSize: '1.2rem', color: '#22c55e', marginBottom: '3rem' }}>
                📟 Debug y Comunicación con Arduino
            </p>

            <div className="glass-card section-container">
                <h2>¿Qué es la Comunicación Serial?</h2>
                <p>
                    La comunicación serial (UART) permite transmitir datos bit a bit entre Arduino y la computadora
                    a través del puerto USB. Es fundamental para:
                </p>

                <div className="grid-responsive-3col" style={{ marginTop: '1.5rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>🐛</div>
                        <strong>Debugging</strong>
                        <p style={{ fontSize: '0.85rem' }}>Ver valores de variables y detectar errores</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>📊</div>
                        <strong>Monitoreo</strong>
                        <p style={{ fontSize: '0.85rem' }}>Visualizar datos de sensores en tiempo real</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>🎮</div>
                        <strong>Control</strong>
                        <p style={{ fontSize: '0.85rem' }}>Enviar comandos desde la PC a Arduino</p>
                    </div>
                </div>

                <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #fbbf24' }}>
                    <h4 style={{ color: '#fbbf24' }}>⚡ Velocidad de Comunicación (Baud Rate)</h4>
                    <p style={{ fontSize: '0.9rem' }}>
                        El <strong>baud rate</strong> define la velocidad en bits por segundo. Tanto Arduino como el Monitor Serie
                        deben usar la misma velocidad. El valor más común es <code>9600</code>, pero se pueden usar velocidades
                        más altas como <code>115200</code> para transmitir más datos.
                    </p>
                </div>
            </div>

            <SerialMonitorSimulator />
        </div>
    );
};

export default SerialPage;

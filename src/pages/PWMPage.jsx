import React from 'react';
import PWMSimulator from '../components/arduino/PWMSimulator';

const PWMPage = () => {
    return (
        <div className="app-container">
            <h1>PWM - Modulación por Ancho de Pulso</h1>
            <p style={{ fontSize: '1.2rem', color: '#a855f7', marginBottom: '3rem' }}>
                🌊 Control de Potencia con Señales Digitales
            </p>

            <div className="glass-card section-container">
                <h2>¿Qué es PWM?</h2>
                <p>
                    <strong>PWM (Pulse Width Modulation)</strong> es una técnica que permite controlar la cantidad de energía entregada a un dispositivo
                    variando el tiempo que una señal permanece en estado HIGH vs LOW dentro de un ciclo.
                </p>

                <div className="grid-responsive-3col" style={{ marginTop: '2rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, borderTop: '3px solid #22c55e', textAlign: 'center' }}>
                        <h4 style={{ color: '#22c55e' }}>Duty Cycle 25%</h4>
                        <p style={{ fontSize: '0.85rem' }}>LED tenue, motor lento</p>
                        <div style={{ height: '20px', background: 'linear-gradient(90deg, #22c55e 25%, #333 25%)' }}></div>
                    </div>
                    <div className="glass-card" style={{ margin: 0, borderTop: '3px solid #fbbf24', textAlign: 'center' }}>
                        <h4 style={{ color: '#fbbf24' }}>Duty Cycle 50%</h4>
                        <p style={{ fontSize: '0.85rem' }}>Brillo/velocidad media</p>
                        <div style={{ height: '20px', background: 'linear-gradient(90deg, #fbbf24 50%, #333 50%)' }}></div>
                    </div>
                    <div className="glass-card" style={{ margin: 0, borderTop: '3px solid #ef4444', textAlign: 'center' }}>
                        <h4 style={{ color: '#ef4444' }}>Duty Cycle 75%</h4>
                        <p style={{ fontSize: '0.85rem' }}>LED brillante, motor rápido</p>
                        <div style={{ height: '20px', background: 'linear-gradient(90deg, #ef4444 75%, #333 75%)' }}></div>
                    </div>
                </div>

                <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #00979D' }}>
                    <h4 style={{ color: '#00979D' }}>📌 Pines PWM en Arduino UNO</h4>
                    <p>Solo los pines marcados con <strong>~</strong> soportan PWM: <code>3, 5, 6, 9, 10, 11</code></p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        Usa <code>analogWrite(pin, valor)</code> donde valor va de 0 (0%) a 255 (100%).
                    </p>
                </div>
            </div>

            <PWMSimulator />
        </div>
    );
};

export default PWMPage;

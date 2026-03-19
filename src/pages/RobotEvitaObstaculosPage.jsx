import React, { useState, useEffect } from 'react';
import './ElectricityBasicsStyles.css';

const RobotEvitaObstaculosPage = () => {
    const [distance, setDistance] = useState(50);
    const [leftMotor, setLeftMotor] = useState(0);
    const [rightMotor, setRightMotor] = useState(0);
    const [status, setStatus] = useState('Avanzando');

    useEffect(() => {
        // Lógica del robot evasor
        if (distance > 20) {
            // Camino libre
            setLeftMotor(255);
            setRightMotor(255);
            setStatus('Avanzando (Camino Libre)');
        } else if (distance > 10) {
            // Obstáculo cerca, girando a la derecha
            setLeftMotor(255);
            setRightMotor(-255);
            setStatus('Obstáculo cerca. Girando a la derecha...');
        } else {
            // Muy cerca, retrocediendo
            setLeftMotor(-255);
            setRightMotor(-255);
            setStatus('¡Cuidado! Retrocediendo...');
        }
    }, [distance]);

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>Proyecto: Robot Evita Obstáculos</h1>
                <p>Construye y comprende la lógica de un robot autónomo con placa Arduino y Sensor Ultrasónico.</p>
            </header>

            <div className="electricity-grid">
                <section className="elec-card materials-section full-width">
                    <h2>Lista de Materiales</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Arduino UNO</h3>
                            <p>El cerebro del robot. Lee los sensores y controla los motores.</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Chasis 2WD</h3>
                            <p>Base acrílica con 2 ruedas motrices y una rueda loca.</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Sensor HC-SR04</h3>
                            <p>Sensor ultrasónico. Mide la distancia rebotando sonido.</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Driver L298N</h3>
                            <p>Módulo de potencia para controlar la velocidad y dirección de los motores.</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Baterías</h3>
                            <p>Fuente de energía (Ej: 2 Litio 18650) a 7.4V.</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0 }}>
                            <h3>Cables Jumpers</h3>
                            <p>Para interconectar todos los componentes.</p>
                        </div>
                    </div>
                </section>

                <section className="elec-card flow-section full-width">
                    <h2>Simulación de Funcionamiento</h2>
                    <p>Mueve el obstáculo (barra) para ver cómo reaccionan los motores del robot basado en el código condicional de Arduino.</p>

                    <div style={{ marginBottom: '2rem' }}>
                        <label>Distancia del Obstáculo: {distance} cm</label>
                        <input type="range" min="0" max="100" value={distance} onChange={(e) => setDistance(Number(e.target.value))} style={{ width: '100%' }} />
                    </div>

                    <div style={{ padding: '2rem', background: '#111', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                        <div style={{ color: distance < 20 ? '#f44336' : '#4caf50', fontSize: '1.5rem', fontWeight: 'bold', minHeight: '30px' }}>
                            Estado: {status}
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Motor Izquierdo */}
                            <div style={{ textAlign: 'center' }}>
                                <h3>Motor Izquierdo (M1)</h3>
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '50%', background: '#333', border: '5px dashed #777',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem auto',
                                    animation: leftMotor !== 0 ? `spin ${leftMotor > 0 ? '1s' : '1s reverse'} linear infinite` : 'none',
                                    opacity: leftMotor === 0 ? 0.5 : 1
                                }}>
                                    <div style={{ fontSize: '2rem' }}>⚙️</div>
                                </div>
                                <p style={{ color: leftMotor > 0 ? '#4caf50' : leftMotor < 0 ? '#f44336' : '#ccc' }}>
                                    {leftMotor > 0 ? 'Adelante' : leftMotor < 0 ? 'Atrás' : 'Freno'}
                                    <br />(PWM: {Math.abs(leftMotor)})
                                </p>
                            </div>

                            {/* CEREBRO */}
                            <div style={{ width: '150px', padding: '10px', background: '#005f73', border: '2px solid #0a9396', borderRadius: '5px', textAlign: 'center' }}>
                                <strong>ARDUINO C++</strong>
                                <pre style={{ textAlign: 'left', fontSize: '0.7rem', marginTop: '10px', background: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '3px' }}>
                                    {`if (dist > 20) {
  Adelante();
} else if (dist > 10) {
  Derecha();
} else {
  Atras();
}`}
                                </pre>
                            </div>

                            {/* Motor Derecho */}
                            <div style={{ textAlign: 'center' }}>
                                <h3>Motor Derecho (M2)</h3>
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '50%', background: '#333', border: '5px dashed #777',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem auto',
                                    animation: rightMotor !== 0 ? `spin ${rightMotor > 0 ? '1s' : '1s reverse'} linear infinite` : 'none',
                                    opacity: rightMotor === 0 ? 0.5 : 1
                                }}>
                                    <div style={{ fontSize: '2rem' }}>⚙️</div>
                                </div>
                                <p style={{ color: rightMotor > 0 ? '#4caf50' : rightMotor < 0 ? '#f44336' : '#ccc' }}>
                                    {rightMotor > 0 ? 'Adelante' : rightMotor < 0 ? 'Atrás' : 'Freno'}
                                    <br />(PWM: {Math.abs(rightMotor)})
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <style>{`
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    );
};

export default RobotEvitaObstaculosPage;

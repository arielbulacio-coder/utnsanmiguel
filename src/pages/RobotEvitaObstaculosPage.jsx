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
                    <h2>Diagrama de Conexiones (Circuito)</h2>
                    <p>El robot utiliza un Driver L298N para manejar dos motores DC y un sensor ultrasónico HC-SR04 para medir distancias.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                        <div style={{ background: '#222', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
                            <svg width="250" height="200" viewBox="0 0 250 200">
                                {/* Arduino Box */}
                                <rect x="80" y="30" width="90" height="120" fill="#005f73" stroke="#fff" strokeWidth="2" rx="5" />
                                <text x="125" y="95" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold">ARDUINO UNO</text>

                                {/* Sensor */}
                                <rect x="190" y="40" width="40" height="20" fill="#111" stroke="#4caf50" rx="3" />
                                <text x="210" y="75" fill="#4caf50" fontSize="8" textAnchor="middle">Sensor Ultrasónico</text>
                                <line x1="170" y1="50" x2="190" y2="50" stroke="#4caf50" strokeWidth="1" strokeDasharray="2" />

                                {/* Driver */}
                                <rect x="20" y="40" width="40" height="40" fill="#111" stroke="#f44336" rx="3" />
                                <text x="40" y="95" fill="#f44336" fontSize="8" textAnchor="middle">Driver L298N</text>
                                <line x1="60" y1="60" x2="80" y2="60" stroke="#f44336" strokeWidth="1" />

                                {/* Motors */}
                                <circle cx="40" cy="140" r="15" fill="#333" stroke="#aaa" />
                                <circle cx="40" cy="175" r="15" fill="#333" stroke="#aaa" />
                                <line x1="40" y1="80" x2="40" y2="125" stroke="#ccc" strokeWidth="1" />
                                <text x="10" y="145" fill="#aaa" fontSize="7">M1</text>
                                <text x="10" y="180" fill="#aaa" fontSize="7">M2</text>
                            </svg>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px' }}>Esquema de Conexión Simplificado</p>
                        </div>
                        <div className="glass-card" style={{ margin: 0, textAlign: 'left' }}>
                            <h3 style={{ color: 'var(--primary-color)' }}>Conexiones Principales:</h3>
                            <ul style={{ fontSize: '0.9rem' }}>
                                <li><strong>Trigger (Sensor):</strong> Pin Digital 12 (Envía el pulso).</li>
                                <li><strong>Echo (Sensor):</strong> Pin Digital 11 (Recibe el rebote).</li>
                                <li><strong>ENA / ENB (Driver):</strong> Pines PWM 10 y 5 (Velocidad).</li>
                                <li><strong>IN1 - IN4 (Driver):</strong> Pines 9, 8, 7, 6 (Dirección).</li>
                                <li><strong>Alimentación:</strong> Baterías al Driver (+12V) y GND común entre Driver y Arduino.</li>
                            </ul>
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
  Adelante(); // M1=255, M2=255
} else if (dist > 10) {
  Derecha();  // M1=255, M2=-255
} else {
  Atras();    // M1=-255, M2=-255
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

import React from 'react';

const SensorsTheory = () => {
    const sensors = [
        {
            name: 'LDR (Fotoresistor)',
            type: 'Luz',
            icon: '☀️',
            color: '#fbbf24',
            description: 'Cambia su resistencia según la intensidad de luz. Útil para detectar día/noche.',
            connection: 'Divisor de voltaje con resistencia fija a A0',
            code: `int ldr = analogRead(A0);
// Valores altos = más luz
if (ldr > 500) {
  Serial.println("Día");
}`
        },
        {
            name: 'LM35 (Temperatura)',
            type: 'Temperatura',
            icon: '🌡️',
            color: '#ef4444',
            description: 'Sensor analógico que entrega 10mV por cada °C. Rango de 0 a 100°C.',
            connection: 'VCC, GND, OUT a pin A0',
            code: `int lectura = analogRead(A0);
float voltaje = lectura * (5.0 / 1023.0);
float tempC = voltaje * 100;
Serial.println(tempC);`
        },
        {
            name: 'DHT11/DHT22',
            type: 'Temp + Humedad',
            icon: '💧',
            color: '#3b82f6',
            description: 'Sensor digital que mide temperatura y humedad relativa. Requiere librería.',
            connection: 'VCC, GND, DATA a pin digital',
            code: `#include <DHT.h>
DHT dht(2, DHT11);
dht.begin();
float h = dht.readHumidity();
float t = dht.readTemperature();`
        },
        {
            name: 'HC-SR04 (Ultrasonido)',
            type: 'Distancia',
            icon: '📏',
            color: '#22c55e',
            description: 'Mide distancias de 2cm a 4m usando ondas ultrasónicas.',
            connection: 'VCC, GND, TRIG y ECHO a pines digitales',
            code: `digitalWrite(TRIG, HIGH);
delayMicroseconds(10);
digitalWrite(TRIG, LOW);
long dur = pulseIn(ECHO, HIGH);
float dist = dur * 0.034 / 2;`
        },
        {
            name: 'PIR (Movimiento)',
            type: 'Presencia',
            icon: '🚶',
            color: '#a855f7',
            description: 'Detecta movimiento de cuerpos calientes (personas, animales).',
            connection: 'VCC, GND, OUT a pin digital',
            code: `if (digitalRead(PIR_PIN) == HIGH) {
  Serial.println("Movimiento!");
  digitalWrite(ALARMA, HIGH);
}`
        },
        {
            name: 'Potenciómetro',
            type: 'Posición',
            icon: '🎚️',
            color: '#14b8a6',
            description: 'Resistencia variable manual. Útil para controlar parámetros.',
            connection: 'Extremos a VCC/GND, cursor a A0',
            code: `int valor = analogRead(A0);
// 0 a 1023 según posición
int pwm = map(valor, 0, 1023, 0, 255);
analogWrite(LED, pwm);`
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Sensores Comunes para Arduino</h2>
            <p>
                Los sensores permiten que Arduino "perciba" el mundo físico. Convierten magnitudes como luz, temperatura o distancia en señales eléctricas que el microcontrolador puede procesar.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem', gap: '1.5rem' }}>
                {sensors.map((sensor, index) => (
                    <div
                        key={index}
                        className="glass-card"
                        style={{
                            margin: 0,
                            borderTop: `4px solid ${sensor.color}`,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '2.5rem' }}>{sensor.icon}</span>
                            <div>
                                <h3 style={{ color: sensor.color, margin: 0 }}>{sensor.name}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    background: `${sensor.color}22`,
                                    color: sensor.color,
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                }}>
                                    {sensor.type}
                                </span>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{sensor.description}</p>

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                        }}>
                            <strong style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>📌 Conexión:</strong>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>{sensor.connection}</p>
                        </div>

                        <pre style={{
                            background: '#1e1e1e',
                            color: '#9cdcfe',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontFamily: 'Consolas, Monaco, monospace',
                            overflow: 'auto',
                            flexGrow: 1
                        }}>
                            {sensor.code}
                        </pre>
                    </div>
                ))}
            </div>

            {/* Analog vs Digital */}
            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #00979D' }}>
                <h3 style={{ color: '#00979D' }}>📊 Sensores Analógicos vs Digitales</h3>
                <div className="grid-responsive-2col" style={{ marginTop: '1rem' }}>
                    <div>
                        <h4 style={{ color: '#fbbf24' }}>Analógicos (A0-A5)</h4>
                        <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                            <li>Entregan un rango continuo de valores</li>
                            <li>Arduino los convierte a 0-1023 (10 bits)</li>
                            <li>Ejemplo: LDR, LM35, potenciómetro</li>
                            <li>Lectura: <code>analogRead(pin)</code></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#3b82f6' }}>Digitales (D0-D13)</h4>
                        <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                            <li>Solo dos estados: HIGH o LOW</li>
                            <li>Algunos usan protocolos (I2C, SPI, 1-Wire)</li>
                            <li>Ejemplo: PIR, botones, DHT11</li>
                            <li>Lectura: <code>digitalRead(pin)</code></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(234, 179, 8, 0.05)', border: '2px solid #fbbf24' }}>
                <h4 style={{ color: '#fbbf24' }}>💡 Consejos para trabajar con sensores</h4>
                <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                    <li><strong>Alimentación:</strong> Verifica el voltaje de operación (3.3V vs 5V).</li>
                    <li><strong>Ruido:</strong> Usa capacitores de desacople (100nF) cerca del sensor.</li>
                    <li><strong>Promediado:</strong> Toma múltiples lecturas y promedia para mayor estabilidad.</li>
                    <li><strong>Calibración:</strong> Ajusta el código según las condiciones reales de uso.</li>
                    <li><strong>Librerías:</strong> Muchos sensores tienen librerías oficiales que simplifican su uso.</li>
                </ul>
            </div>
        </div>
    );
};

export default SensorsTheory;

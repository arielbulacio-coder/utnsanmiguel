import React, { useState, useEffect } from 'react';

const PWMSimulator = () => {
    const [pwmValue, setPwmValue] = useState(127);
    const [frequency, setFrequency] = useState(490);
    const [showWave, setShowWave] = useState(true);

    const dutyCycle = ((pwmValue / 255) * 100).toFixed(1);
    const voltage = ((pwmValue / 255) * 5).toFixed(2);

    // Generate PWM wave path
    const generateWavePath = () => {
        const width = 400;
        const height = 100;
        const periods = 4;
        const periodWidth = width / periods;
        const highWidth = (pwmValue / 255) * periodWidth;

        let path = `M 0 ${height}`;

        for (let i = 0; i < periods; i++) {
            const x = i * periodWidth;
            path += ` L ${x} ${height} L ${x} 10 L ${x + highWidth} 10 L ${x + highWidth} ${height}`;
        }
        path += ` L ${width} ${height}`;

        return path;
    };

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>🌊 Simulador PWM (Modulación por Ancho de Pulso)</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                PWM permite simular una señal analógica usando pulsos digitales. Modificando el <strong>ciclo de trabajo (duty cycle)</strong>,
                controlamos la cantidad de energía entregada a un dispositivo como un LED o motor.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Controls */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    {/* PWM Slider */}
                    <div className="glass-card" style={{ margin: 0, marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                            Valor PWM: <span style={{ color: '#a855f7' }}>{pwmValue}</span> (0-255)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={pwmValue}
                            onChange={(e) => setPwmValue(parseInt(e.target.value))}
                            style={{ width: '100%', marginTop: '0.5rem' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                            {[0, 64, 127, 191, 255].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setPwmValue(val)}
                                    className="glass-card"
                                    style={{
                                        margin: 0,
                                        padding: '0.3rem 0.8rem',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        background: pwmValue === val ? 'var(--primary-color)' : 'transparent',
                                        color: pwmValue === val ? '#000' : 'var(--text-main)',
                                        border: '1px solid var(--glass-border)'
                                    }}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="grid-responsive-2col" style={{ gap: '1rem' }}>
                        <div className="glass-card" style={{ margin: 0, textAlign: 'center', borderTop: '3px solid #22c55e' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{dutyCycle}%</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Duty Cycle</div>
                        </div>
                        <div className="glass-card" style={{ margin: 0, textAlign: 'center', borderTop: '3px solid #3b82f6' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{voltage}V</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Voltaje Promedio</div>
                        </div>
                    </div>

                    {/* LED Visualization */}
                    <div className="glass-card" style={{ margin: 0, marginTop: '1rem', textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Brillo del LED</div>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            margin: '0 auto',
                            background: `radial-gradient(circle, rgba(239, 68, 68, ${pwmValue / 255}) 0%, rgba(239, 68, 68, ${pwmValue / 510}) 50%, transparent 70%)`,
                            boxShadow: `0 0 ${pwmValue / 5}px ${pwmValue / 10}px rgba(239, 68, 68, ${pwmValue / 255})`,
                            border: '3px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: `rgb(${Math.floor(60 + (pwmValue / 255) * 195)}, ${Math.floor(pwmValue / 255 * 68)}, ${Math.floor(pwmValue / 255 * 68)})`,
                                boxShadow: 'inset 0 -5px 10px rgba(0,0,0,0.3)'
                            }}></div>
                        </div>
                    </div>
                </div>

                {/* Waveform */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div className="glass-card" style={{ margin: 0, background: '#0a0a0a', padding: '1.5rem' }}>
                        <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Forma de Onda PWM
                        </div>
                        <svg viewBox="0 0 400 120" style={{ width: '100%', height: '150px' }}>
                            {/* Grid */}
                            {[...Array(9)].map((_, i) => (
                                <line key={`h${i}`} x1="0" y1={i * 15} x2="400" y2={i * 15} stroke="#333" strokeWidth="0.5" />
                            ))}
                            {[...Array(17)].map((_, i) => (
                                <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="120" stroke="#333" strokeWidth="0.5" />
                            ))}

                            {/* PWM Wave */}
                            <path
                                d={generateWavePath()}
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="2"
                            />

                            {/* Average voltage line */}
                            <line
                                x1="0"
                                y1={110 - (pwmValue / 255) * 100}
                                x2="400"
                                y2={110 - (pwmValue / 255) * 100}
                                stroke="#ef4444"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                            />

                            {/* Labels */}
                            <text x="5" y="20" fill="#666" fontSize="10">5V</text>
                            <text x="5" y="110" fill="#666" fontSize="10">0V</text>
                            <text x="350" y={105 - (pwmValue / 255) * 100} fill="#ef4444" fontSize="10">Vavg</text>
                        </svg>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                            <span style={{ color: '#22c55e' }}>■ Señal PWM</span>
                            <span style={{ color: '#ef4444' }}>--- Voltaje Promedio</span>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="glass-card" style={{ margin: 0, marginTop: '1rem' }}>
                        <div style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '0.5rem' }}>Código Arduino:</div>
                        <pre style={{
                            background: '#1e1e1e',
                            color: '#9cdcfe',
                            padding: '1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontFamily: 'Consolas, Monaco, monospace',
                            margin: 0,
                            overflow: 'auto'
                        }}>
                            {`// Pin 9 soporta PWM (marcado con ~)
int ledPin = 9;
int valor = ${pwmValue};

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, ${pwmValue});
  // LED brilla al ${dutyCycle}%
}`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="glass-card" style={{ marginTop: '2rem', borderTop: '4px solid #a855f7' }}>
                <h4 style={{ color: '#a855f7' }}>⚙️ Aplicaciones del PWM</h4>
                <div className="grid-responsive-3col" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>💡</div>
                        <strong>Dimmer LED</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Control de brillo de LEDs</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>⚙️</div>
                        <strong>Control de Motores</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Regular velocidad DC</p>
                    </div>
                    <div className="glass-card" style={{ margin: 0, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem' }}>🎵</div>
                        <strong>Generación de Tonos</strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Sonidos con buzzer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWMSimulator;

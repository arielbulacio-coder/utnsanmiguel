import React, { useState, useEffect } from 'react';

const ArduinoPinSimulator = () => {
    const [pins, setPins] = useState({
        2: { mode: 'OUTPUT', state: false },
        3: { mode: 'OUTPUT', state: false },
        4: { mode: 'OUTPUT', state: false },
        5: { mode: 'OUTPUT', state: false },
        6: { mode: 'OUTPUT', state: false },
        7: { mode: 'OUTPUT', state: false },
        8: { mode: 'OUTPUT', state: false },
        9: { mode: 'OUTPUT', state: false },
        10: { mode: 'OUTPUT', state: false },
        11: { mode: 'OUTPUT', state: false },
        12: { mode: 'OUTPUT', state: false },
        13: { mode: 'OUTPUT', state: false }
    });

    const [code, setCode] = useState(`// Blink LED en pin 13
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}`);

    const [isRunning, setIsRunning] = useState(false);
    const [currentLine, setCurrentLine] = useState(-1);
    const [consoleOutput, setConsoleOutput] = useState(['Arduino Simulator Ready...']);

    // Simple interpreter for basic Arduino commands
    useEffect(() => {
        let intervalId;
        let loopIndex = 0;
        let delayTimeout;

        const executeLoop = () => {
            if (!isRunning) return;

            const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('//'));
            const loopStart = lines.findIndex(l => l.includes('void loop()'));
            const loopLines = lines.slice(loopStart + 1).filter(l => !l.includes('{') && !l.includes('}'));

            if (loopLines.length === 0) return;

            const line = loopLines[loopIndex % loopLines.length];
            setCurrentLine(loopIndex % loopLines.length);

            // Parse digitalWrite
            const digitalWriteMatch = line.match(/digitalWrite\s*\(\s*(\d+)\s*,\s*(HIGH|LOW)\s*\)/);
            if (digitalWriteMatch) {
                const pin = parseInt(digitalWriteMatch[1]);
                const state = digitalWriteMatch[2] === 'HIGH';
                setPins(prev => ({
                    ...prev,
                    [pin]: { ...prev[pin], state }
                }));
                setConsoleOutput(prev => [...prev.slice(-10), `digitalWrite(${pin}, ${digitalWriteMatch[2]})`]);
            }

            // Parse delay
            const delayMatch = line.match(/delay\s*\(\s*(\d+)\s*\)/);
            const delayTime = delayMatch ? parseInt(delayMatch[1]) / 10 : 100; // Scale down for simulation

            loopIndex++;
            delayTimeout = setTimeout(executeLoop, Math.min(delayTime, 500));
        };

        if (isRunning) {
            // Execute setup first
            const setupMatch = code.match(/pinMode\s*\(\s*(\d+)\s*,\s*(OUTPUT|INPUT)\s*\)/g);
            if (setupMatch) {
                setupMatch.forEach(match => {
                    const m = match.match(/pinMode\s*\(\s*(\d+)\s*,\s*(OUTPUT|INPUT)\s*\)/);
                    if (m) {
                        const pin = parseInt(m[1]);
                        setPins(prev => ({
                            ...prev,
                            [pin]: { mode: m[2], state: false }
                        }));
                    }
                });
            }
            setConsoleOutput(prev => [...prev, '--- Programa iniciado ---']);
            setTimeout(executeLoop, 500);
        }

        return () => {
            clearTimeout(delayTimeout);
            clearInterval(intervalId);
        };
    }, [isRunning, code]);

    const togglePin = (pin) => {
        if (!isRunning) {
            setPins(prev => ({
                ...prev,
                [pin]: { ...prev[pin], state: !prev[pin].state }
            }));
        }
    };

    const ledColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6'];

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#00979D', marginBottom: '1rem' }}>🔌 Simulador de GPIO Digital</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Escribe código Arduino y observa cómo responden los LEDs virtuales. Simula las funciones <code>pinMode()</code>, <code>digitalWrite()</code> y <code>delay()</code>.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Code Editor */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <label style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Código Arduino:</label>
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                background: isRunning ? '#ef4444' : '#22c55e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isRunning ? '⏹ Detener' : '▶ Ejecutar'}
                        </button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={isRunning}
                        style={{
                            width: '100%',
                            height: '250px',
                            background: '#1e1e1e',
                            color: '#9cdcfe',
                            fontFamily: 'Consolas, Monaco, monospace',
                            fontSize: '0.85rem',
                            padding: '1rem',
                            border: '2px solid #00979D',
                            borderRadius: '8px',
                            resize: 'vertical'
                        }}
                    />

                    {/* Console Output */}
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color: '#fbbf24' }}>Serial Monitor:</label>
                        <div style={{
                            background: '#0a0a0a',
                            color: '#22c55e',
                            fontFamily: 'Consolas, Monaco, monospace',
                            fontSize: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            height: '100px',
                            overflowY: 'auto',
                            marginTop: '0.5rem'
                        }}>
                            {consoleOutput.map((line, i) => (
                                <div key={i}>&gt; {line}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Arduino Board Visual */}
                <div style={{ flex: '1', minWidth: '280px' }}>
                    <div style={{
                        background: '#00979D',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        position: 'relative'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            fontSize: '1.2rem'
                        }}>
                            ARDUINO UNO
                        </div>

                        {/* USB Port */}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '15px',
                            background: '#777',
                            borderRadius: '3px'
                        }}></div>

                        {/* Digital Pins with LEDs */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)',
                            gap: '8px',
                            marginTop: '1rem'
                        }}>
                            {Object.entries(pins).map(([pin, { state }], index) => (
                                <div
                                    key={pin}
                                    onClick={() => togglePin(parseInt(pin))}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: isRunning ? 'default' : 'pointer'
                                    }}
                                >
                                    {/* LED */}
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: state
                                            ? ledColors[index % ledColors.length]
                                            : '#333',
                                        boxShadow: state
                                            ? `0 0 15px ${ledColors[index % ledColors.length]}, 0 0 30px ${ledColors[index % ledColors.length]}`
                                            : 'inset 0 2px 5px rgba(0,0,0,0.5)',
                                        transition: 'all 0.1s ease',
                                        marginBottom: '4px'
                                    }}></div>
                                    {/* Pin Label */}
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}>
                                        D{pin}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Power LED */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 10px #22c55e'
                            }}></div>
                            <span style={{ color: '#fff', fontSize: '0.7rem' }}>PWR</span>
                        </div>
                    </div>

                    {/* Pin State Legend */}
                    <div className="glass-card" style={{ marginTop: '1rem', padding: '1rem' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>Estado de Pines:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {Object.entries(pins).map(([pin, { state, mode }]) => (
                                <span
                                    key={pin}
                                    style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        background: state ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                                        color: state ? '#22c55e' : '#ef4444',
                                        border: `1px solid ${state ? '#22c55e' : '#ef4444'}`
                                    }}
                                >
                                    D{pin}: {state ? 'HIGH' : 'LOW'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Example Codes */}
            <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>📝 Ejemplos de Código:</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[
                        { name: 'Blink', code: `void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}` },
                        { name: 'Secuencia', code: `void setup() {\n  pinMode(2, OUTPUT);\n  pinMode(3, OUTPUT);\n  pinMode(4, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(2, HIGH);\n  delay(200);\n  digitalWrite(2, LOW);\n  digitalWrite(3, HIGH);\n  delay(200);\n  digitalWrite(3, LOW);\n  digitalWrite(4, HIGH);\n  delay(200);\n  digitalWrite(4, LOW);\n}` },
                        { name: 'Todos ON', code: `void setup() {\n  pinMode(2, OUTPUT);\n  pinMode(3, OUTPUT);\n  pinMode(4, OUTPUT);\n  pinMode(5, OUTPUT);\n  pinMode(6, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(2, HIGH);\n  digitalWrite(3, HIGH);\n  digitalWrite(4, HIGH);\n  digitalWrite(5, HIGH);\n  digitalWrite(6, HIGH);\n  delay(1000);\n  digitalWrite(2, LOW);\n  digitalWrite(3, LOW);\n  digitalWrite(4, LOW);\n  digitalWrite(5, LOW);\n  digitalWrite(6, LOW);\n  delay(1000);\n}` }
                    ].map(example => (
                        <button
                            key={example.name}
                            onClick={() => { setCode(example.code); setIsRunning(false); }}
                            className="glass-card"
                            style={{
                                margin: 0,
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                border: '1px solid var(--primary-color)',
                                background: 'transparent'
                            }}
                        >
                            {example.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArduinoPinSimulator;

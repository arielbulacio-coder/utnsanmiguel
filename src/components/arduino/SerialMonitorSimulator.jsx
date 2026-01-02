import React, { useState } from 'react';

const SerialMonitorSimulator = () => {
    const [baudRate, setBaudRate] = useState(9600);
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState([
        { type: 'system', text: 'Serial Monitor iniciado a 9600 baudios' },
        { type: 'rx', text: 'Hola desde Arduino!' },
        { type: 'rx', text: 'Temperatura: 23.5 °C' },
        { type: 'rx', text: 'Humedad: 65%' }
    ]);
    const [isConnected, setIsConnected] = useState(true);

    const sendData = () => {
        if (inputValue.trim()) {
            setOutput(prev => [
                ...prev,
                { type: 'tx', text: inputValue },
                { type: 'rx', text: `Echo: ${inputValue}` }
            ]);
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendData();
        }
    };

    const simulateData = () => {
        const messages = [
            'Sensor leido: ' + Math.floor(Math.random() * 1024),
            'Temperatura: ' + (20 + Math.random() * 10).toFixed(1) + ' °C',
            'Distancia: ' + Math.floor(Math.random() * 200) + ' cm',
            'Luz: ' + Math.floor(Math.random() * 100) + '%',
            'Boton presionado!',
            'Loop #' + Math.floor(Math.random() * 1000)
        ];
        setOutput(prev => [
            ...prev,
            { type: 'rx', text: messages[Math.floor(Math.random() * messages.length)] }
        ]);
    };

    const clearOutput = () => {
        setOutput([{ type: 'system', text: 'Monitor limpiado' }]);
    };

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>📟 Simulador de Monitor Serie</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                El Monitor Serie permite la comunicación bidireccional entre Arduino y la computadora vía USB.
                Es esencial para <strong>debugging</strong> y visualización de datos en tiempo real.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Serial Monitor */}
                <div style={{ flex: '1', minWidth: '350px' }}>
                    {/* Toolbar */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <select
                            value={baudRate}
                            onChange={(e) => setBaudRate(parseInt(e.target.value))}
                            style={{
                                background: '#1e1e1e',
                                color: '#fff',
                                border: '1px solid #333',
                                padding: '0.5rem',
                                borderRadius: '4px'
                            }}
                        >
                            {[300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200].map(rate => (
                                <option key={rate} value={rate}>{rate} baud</option>
                            ))}
                        </select>

                        <button
                            onClick={() => setIsConnected(!isConnected)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: isConnected ? '#ef4444' : '#22c55e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {isConnected ? 'Desconectar' : 'Conectar'}
                        </button>

                        <button
                            onClick={simulateData}
                            disabled={!isConnected}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#3b82f6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isConnected ? 'pointer' : 'not-allowed',
                                opacity: isConnected ? 1 : 0.5
                            }}
                        >
                            Simular Datos
                        </button>

                        <button
                            onClick={clearOutput}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#666',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Limpiar
                        </button>
                    </div>

                    {/* Output Area */}
                    <div style={{
                        background: '#0a0a0a',
                        border: `2px solid ${isConnected ? '#22c55e' : '#ef4444'}`,
                        borderRadius: '8px',
                        height: '300px',
                        overflowY: 'auto',
                        fontFamily: 'Consolas, Monaco, monospace',
                        fontSize: '0.85rem',
                        padding: '1rem'
                    }}>
                        {output.map((line, index) => (
                            <div
                                key={index}
                                style={{
                                    color: line.type === 'tx' ? '#3b82f6' :
                                        line.type === 'system' ? '#666' : '#22c55e',
                                    marginBottom: '2px'
                                }}
                            >
                                {line.type === 'tx' ? '>>> ' : line.type === 'system' ? '// ' : ''}{line.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={!isConnected}
                            placeholder="Enviar mensaje a Arduino..."
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: '#1e1e1e',
                                border: '1px solid #333',
                                borderRadius: '4px',
                                color: '#fff',
                                fontFamily: 'Consolas, Monaco, monospace'
                            }}
                        />
                        <button
                            onClick={sendData}
                            disabled={!isConnected}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#22c55e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isConnected ? 'pointer' : 'not-allowed',
                                opacity: isConnected ? 1 : 0.5
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                </div>

                {/* Code Examples */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div className="glass-card" style={{ margin: 0, marginBottom: '1rem' }}>
                        <h4 style={{ color: '#fbbf24', margin: '0 0 0.5rem 0' }}>📝 Código Básico Serial</h4>
                        <pre style={{
                            background: '#1e1e1e',
                            color: '#9cdcfe',
                            padding: '1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontFamily: 'Consolas, Monaco, monospace',
                            overflow: 'auto',
                            margin: 0
                        }}>
                            {`void setup() {
  Serial.begin(${baudRate}); // Velocidad
  Serial.println("Arduino listo!");
}

void loop() {
  int sensor = analogRead(A0);
  Serial.print("Valor: ");
  Serial.println(sensor);
  delay(1000);
}`}
                        </pre>
                    </div>

                    <div className="glass-card" style={{ margin: 0 }}>
                        <h4 style={{ color: '#3b82f6', margin: '0 0 0.5rem 0' }}>📥 Recibir Datos</h4>
                        <pre style={{
                            background: '#1e1e1e',
                            color: '#9cdcfe',
                            padding: '1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontFamily: 'Consolas, Monaco, monospace',
                            overflow: 'auto',
                            margin: 0
                        }}>
                            {`void loop() {
  if (Serial.available() > 0) {
    String msg = Serial.readString();
    Serial.print("Recibido: ");
    Serial.println(msg);
    
    if (msg == "ON") {
      digitalWrite(13, HIGH);
    } else if (msg == "OFF") {
      digitalWrite(13, LOW);
    }
  }
}`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Serial Functions Reference */}
            <div className="glass-card" style={{ marginTop: '2rem', borderTop: '4px solid #22c55e' }}>
                <h4 style={{ color: '#22c55e' }}>📚 Funciones Serial</h4>
                <div className="grid-responsive-2col" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div>
                        <h5 style={{ color: '#3b82f6' }}>Enviar (TX)</h5>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>Serial.print()</code> - Envía sin salto de línea</li>
                            <li><code>Serial.println()</code> - Envía con salto de línea</li>
                            <li><code>Serial.write()</code> - Envía bytes crudos</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: '#ef4444' }}>Recibir (RX)</h5>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>Serial.available()</code> - Bytes disponibles</li>
                            <li><code>Serial.read()</code> - Lee un byte</li>
                            <li><code>Serial.readString()</code> - Lee como String</li>
                            <li><code>Serial.parseInt()</code> - Lee como entero</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SerialMonitorSimulator;

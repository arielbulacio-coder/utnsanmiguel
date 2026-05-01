import React, { useState, useEffect, useRef } from 'react';
import './ProyectosIntegradoresStyles.css';

const IoTDashboardsPage = () => {
    const [selectedDevice, setSelectedDevice] = useState('esp32');
    const [running, setRunning] = useState(false);
    const [connectionType, setConnectionType] = useState('simulation'); // 'simulation' o 'live'
    const [wsAddress, setWsAddress] = useState('ws://192.168.4.1:81');
    const [wsStatus, setWsStatus] = useState('DISCONNECTED');
    
    // Configuración de Dashboard Personalizable
    const [config, setConfig] = useState({
        showTemp: true,
        showHum: true,
        showLight: true,
        showChart: true,
        showRelay: true,
        themeColor: '#00f2ff'
    });

    const [data, setData] = useState({
        temp: 24.5,
        hum: 45,
        light: 800,
        relay: false,
        uptime: 0
    });

    const [history, setHistory] = useState([]);
    const ws = useRef(null);

    // Lógica para conexión LIVE vía WebSockets
    useEffect(() => {
        if (connectionType === 'live' && running) {
            try {
                setWsStatus('CONNECTING...');
                ws.current = new WebSocket(wsAddress);

                ws.current.onopen = () => {
                    setWsStatus('CONNECTED ✅');
                };

                ws.current.onmessage = (event) => {
                    try {
                        const json = JSON.parse(event.data);
                        setData(prev => {
                            const newData = {
                                ...prev,
                                temp: json.temp ?? prev.temp,
                                hum: json.hum ?? prev.hum,
                                light: json.light ?? prev.light,
                                relay: json.relay ?? prev.relay,
                                uptime: json.uptime ?? (prev.uptime + 1)
                            };
                            setHistory(h => [...h.slice(-19), newData.temp]);
                            return newData;
                        });
                    } catch (e) {
                        console.error('Error parsing IoT data:', e);
                    }
                };

                ws.current.onclose = () => {
                    setWsStatus('DISCONNECTED ❌');
                    setRunning(false);
                };

                ws.current.onerror = () => {
                    setWsStatus('ERROR ⚠️');
                    setRunning(false);
                };

            } catch (e) {
                setWsStatus('FAILED ⚠️');
                setRunning(false);
            }
        } else {
            if (ws.current) {
                ws.current.close();
            }
        }

        return () => {
            if (ws.current) ws.current.close();
        };
    }, [connectionType, running, wsAddress]);

    // Simulación de recepción de datos IoT en tiempo real (Modo Simulación)
    useEffect(() => {
        let interval;
        if (running && connectionType === 'simulation') {
            interval = setInterval(() => {
                setData(prev => {
                    const newTemp = prev.temp + (Math.random() - 0.5) * 0.4;
                    const newHum = Math.min(100, Math.max(0, prev.hum + (Math.random() - 0.5) * 1));
                    const newLight = Math.min(1024, Math.max(0, prev.light + (Math.random() - 0.5) * 50));
                    
                    const newData = {
                        ...prev,
                        temp: parseFloat(newTemp.toFixed(1)),
                        hum: Math.round(newHum),
                        light: Math.round(newLight),
                        uptime: prev.uptime + 2
                    };

                    setHistory(h => [...h.slice(-19), newData.temp]);
                    return newData;
                });
            }, 1000);
        } else if (!running) {
            setHistory([]);
            setData(d => ({ ...d, uptime: 0 }));
        }
        return () => clearInterval(interval);
    }, [running, connectionType]);

    const toggleRelay = () => {
        if (!running) return;
        
        const newState = !data.relay;
        
        if (connectionType === 'live' && ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ relay: newState }));
        }
        
        setData(prev => ({ ...prev, relay: newState }));
    };

    const devices = [
        { id: 'esp32', name: 'ESP32 DevKit', icon: '🤖' },
        { id: 'wemos', name: 'Wemos D1 R2', icon: '📡' },
        { id: 'nano', name: 'Arduino Nano 33 IoT', icon: '🔌' },
        { id: 'esp8266', name: 'NodeMCU (ESP8266)', icon: '🌐' },
    ];

    const toggleConfig = (key) => {
        setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="app-container proyectos-integradores-page">
            <header className="pi-hero" style={{ marginBottom: '2rem' }}>
                <div className="pi-hero-badge">IOT LIVE ENGINE</div>
                <h1 className="pi-hero-title">Dashboard IoT Real</h1>
                <p className="pi-hero-desc">
                    Conecta tus dispositivos físicos (Arduino, ESP32, Wemos) en tiempo real mediante WebSockets. 
                    Visualiza datos reales de tus sensores y controla actuadores desde esta interfaz profesional.
                </p>
                <div className="pi-hero-tags">
                    <span className="pi-tag">WebSocket Live</span>
                    <span className="pi-tag">JSON Protocol</span>
                    <span className="pi-tag">Wemos D1</span>
                    <span className="pi-tag">Real Sensors</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem' }}>
                {/* Sidebar - Settings & Customization */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="pi-section" style={{ border: `1px solid ${connectionType === 'live' ? '#22c55e' : 'transparent'}` }}>
                        <h3 className="pi-section-title" style={{ color: config.themeColor }}>Modo de Operación</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button 
                                className={`sim-btn ${connectionType === 'simulation' ? 'active' : ''}`}
                                onClick={() => { setConnectionType('simulation'); setRunning(false); }}
                                style={{ flex: 1 }}
                            >
                                Simulación
                            </button>
                            <button 
                                className={`sim-btn ${connectionType === 'live' ? 'active' : ''}`}
                                onClick={() => { setConnectionType('live'); setRunning(false); }}
                                style={{ flex: 1, borderColor: '#22c55e', color: connectionType === 'live' ? '#fff' : '#22c55e', background: connectionType === 'live' ? '#22c55e33' : 'transparent' }}
                            >
                                LIVE IoT
                            </button>
                        </div>

                        {connectionType === 'live' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>WebSocket URL (ESP32/Wemos IP):</label>
                                <input 
                                    type="text" 
                                    value={wsAddress}
                                    onChange={(e) => setWsAddress(e.target.value)}
                                    placeholder="ws://192.168.x.x:81"
                                    style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}
                                />
                                <div style={{ fontSize: '0.7rem', color: running ? '#22c55e' : '#aaa', marginTop: '0.2rem' }}>
                                    Status: <strong>{wsStatus}</strong>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pi-section">
                        <h3 className="pi-section-title" style={{ color: config.themeColor }}>Placa / Controlador</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {devices.map(dev => (
                                <div 
                                    key={dev.id}
                                    onClick={() => setSelectedDevice(dev.id)}
                                    style={{
                                        padding: '1rem',
                                        background: selectedDevice === dev.id ? `rgba(${parseInt(config.themeColor.slice(1,3),16)}, ${parseInt(config.themeColor.slice(3,5),16)}, ${parseInt(config.themeColor.slice(5,7),16)}, 0.15)` : 'rgba(0,0,0,0.2)',
                                        border: `1px solid ${selectedDevice === dev.id ? config.themeColor : 'transparent'}`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{dev.icon}</span>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{dev.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pi-section">
                        <h3 className="pi-section-title" style={{ color: '#fbbf24' }}>Personalizar Dashboard</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={config.showTemp} onChange={() => toggleConfig('showTemp')} /> Temperatura
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={config.showHum} onChange={() => toggleConfig('showHum')} /> Humedad
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={config.showLight} onChange={() => toggleConfig('showLight')} /> Sensor Luz
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={config.showChart} onChange={() => toggleConfig('showChart')} /> Gráfico Histórico
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={config.showRelay} onChange={() => toggleConfig('showRelay')} /> Control Relé
                            </label>
                        </div>
                    </div>

                    <div className="pi-section">
                        <h3 className="pi-section-title" style={{ color: '#ef4444' }}>Acción</h3>
                        <button 
                            className={`sim-btn ${running ? 'active' : ''}`}
                            onClick={() => setRunning(!running)}
                            style={{ width: '100%', padding: '1rem', height: 'auto' }}
                        >
                            {running ? (connectionType === 'live' ? 'DESCONECTAR' : 'DETENER') : (connectionType === 'live' ? 'CONECTAR A HARDWARE' : 'INICIAR SIMULACIÓN')}
                        </button>
                    </div>
                </aside>

                {/* Main Dashboard UI */}
                <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="pi-section" style={{ background: '#0a0d14', border: `2px solid ${running && connectionType === 'live' ? '#22c55e' : config.themeColor}44` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <h3 className="pi-section-title" style={{ margin: 0, color: config.themeColor }}>
                                    {devices.find(d => d.id === selectedDevice)?.name} - Dashboard
                                </h3>
                                {connectionType === 'live' && (
                                    <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', background: running ? '#22c55e' : '#666', color: '#fff', fontWeight: 'bold' }}>
                                        LIVE HARDWARE
                                    </span>
                                )}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>
                                {connectionType === 'live' ? wsAddress : 'Simulation Mode'} | Uptime: {data.uptime}s
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            {config.showTemp && (
                                <div className="solar-reading" style={{ background: `${config.themeColor}11`, border: `1px solid ${config.themeColor}33` }}>
                                    <span className="solar-value" style={{ color: config.themeColor }}>{running ? data.temp : '--'}</span>
                                    <span className="solar-unit">Temperatura °C</span>
                                </div>
                            )}
                            {config.showHum && (
                                <div className="solar-reading" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                    <span className="solar-value" style={{ color: '#3b82f6' }}>{running ? data.hum : '--'}</span>
                                    <span className="solar-unit">Humedad %</span>
                                </div>
                            )}
                            {config.showLight && (
                                <div className="solar-reading" style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                                    <span className="solar-value" style={{ color: '#fbbf24' }}>{running ? data.light : '--'}</span>
                                    <span className="solar-unit">Luz (Lux)</span>
                                </div>
                            )}
                        </div>

                        {/* Chart and Control Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: config.showChart && config.showRelay ? '2fr 1fr' : '1fr', gap: '1.5rem' }}>
                            {config.showChart && (
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', textTransform: 'uppercase' }}>Ondas en vivo ({connectionType === 'live' ? 'HARDWARE' : 'SIM'})</h4>
                                    <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                                        {history.length > 0 ? history.map((val, i) => (
                                            <div 
                                                key={i} 
                                                style={{ 
                                                    flex: 1, 
                                                    height: `${(val / 40) * 100}%`, 
                                                    background: connectionType === 'live' ? '#22c55e' : config.themeColor, 
                                                    borderRadius: '2px 2px 0 0',
                                                    opacity: 0.4 + (i / history.length) * 0.6
                                                }} 
                                            />
                                        )) : (
                                            <div style={{ width: '100%', height: '1px', background: '#333' }} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {config.showRelay && (
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                    <h4 style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Control Remoto</h4>
                                    <button 
                                        onClick={toggleRelay}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            background: !running ? '#333' : (data.relay ? '#ef4444' : '#22c55e'),
                                            boxShadow: running && data.relay ? `0 0 20px ${data.relay ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}` : 'none',
                                            color: '#fff',
                                            fontSize: '1.5rem',
                                            cursor: running ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {data.relay ? 'ON' : 'OFF'}
                                    </button>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: data.relay ? '#ef4444' : '#22c55e' }}>
                                        {data.relay ? 'RELÉ ACTIVADO' : 'RELÉ DESACTIVADO'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hardware Connection Code Example */}
                    <div className="pi-section">
                        <h3 className="pi-section-title" style={{ color: '#fbbf24' }}>Código para conectar tu Hardware</h3>
                        <div className="code-block">
                            <div className="code-header">
                                <span>iot_live_bridge.ino (ESP32/Wemos)</span>
                                <button className="copy-btn">Copiar</button>
                            </div>
                            <pre style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <code>{`#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

WebSocketsServer webSocket = WebSocketsServer(81);

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if(type == WStype_TEXT) {
    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    if(doc.containsKey("relay")) {
      digitalWrite(2, doc["relay"] ? HIGH : LOW);
    }
  }
}

void setup() {
  WiFi.begin("SSID", "PASS");
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
}

void loop() {
  webSocket.loop();
  
  // Enviar datos cada 1 segundo
  static unsigned long lastTime = 0;
  if(millis() - lastTime > 1000) {
    lastTime = millis();
    StaticJsonDocument<200> doc;
    doc["temp"] = analogRead(34) * (3.3 / 4095.0) * 100;
    doc["hum"] = random(40, 60);
    String output;
    serializeJson(doc, output);
    webSocket.broadcastTXT(output);
  }
}`}</code>
                            </pre>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default IoTDashboardsPage;

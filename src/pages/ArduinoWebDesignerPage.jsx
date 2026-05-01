import React, { useState, useEffect, useRef } from 'react';
import './ProyectosIntegradoresStyles.css';

const ArduinoWebDesignerPage = () => {
    const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; background: #0f172a; color: white; padding: 20px; }
    .card { background: #1e293b; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); max-width: 400px; margin: auto; border: 1px solid #334155; }
    h1 { color: #38bdf8; font-size: 24px; }
    .btn { padding: 15px 40px; font-size: 18px; cursor: pointer; border-radius: 12px; border: none; font-weight: bold; transition: 0.3s; width: 100%; margin: 10px 0; }
    .on { background: #ef4444; color: white; }
    .on:hover { background: #dc2626; transform: scale(1.02); }
    .off { background: #22c55e; color: white; }
    .off:hover { background: #16a34a; transform: scale(1.02); }
    #status { font-size: 18px; margin: 20px; color: #94a3b8; font-weight: bold; }
    .sensor { font-size: 32px; color: #fbbf24; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Smart Home Control</h1>
    <div id="status">SISTEMA: EN LÍNEA</div>
    <div class="sensor">24.5 °C</div>
    <button class="btn off" onclick="control('H')">ENCENDER LUZ</button>
    <button class="btn on" onclick="control('L')">APAGAR LUZ</button>
  </div>

  <script>
    function control(state) {
      // Simulación de interacción
      document.getElementById('status').innerText = 'ENVIANDO COMANDO...';
      fetch('/' + state).then(() => {
        document.getElementById('status').innerText = 'COMANDO EJECUTADO';
      }).catch(() => {
        // En simulación local el fetch fallará, pero lo manejamos
        document.getElementById('status').innerText = 'ORDEN: ' + (state == 'H' ? 'ON' : 'OFF');
      });
    }
  </script>
</body>
</html>`);

    const [activeTab, setActiveTab] = useState('html');
    const [previewKey, setPreviewKey] = useState(0);
    const [exportFormat, setExportFormat] = useState('println'); // 'println', 'progmem', 'websocket'

    const generateArduinoCode = () => {
        if (exportFormat === 'websocket') {
            return `// Implementación vía WebSockets (Recomendada para Tiempo Real)
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

WebSocketsServer webSocket = WebSocketsServer(81);

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if(type == WStype_TEXT) {
    String msg = (char*)payload;
    if(msg == "H") digitalWrite(2, HIGH);
    if(msg == "L") digitalWrite(2, LOW);
  }
}

void setup() {
  pinMode(2, OUTPUT);
  WiFi.begin("SSID", "PASS");
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
}

void loop() {
  webSocket.loop();
}`;
        }

        if (exportFormat === 'progmem') {
            const hexHtml = htmlCode.split('').map(c => '0x' + c.charCodeAt(0).toString(16)).join(', ');
            return `// Implementación usando PROGMEM (Ahorra memoria RAM)
const char index_html[] PROGMEM = {${hexHtml}, 0x00};

void handleRoot() {
  server.send_P(200, "text/html", index_html);
}`;
        }

        // Default println
        const escapedHtml = htmlCode.split('\n').map(line => `client.println("${line.replace(/"/g, '\\"')}");`).join('\n    ');
        
        return `#include <WiFi.h>
WiFiServer server(80);

void setup() {
  WiFi.begin("WIFI_NAME", "PASSWORD");
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    // Manejo de peticiones HTTP...
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("");
    ${escapedHtml}
    client.stop();
  }
}`;
    };

    const updatePreview = () => {
        setPreviewKey(prev => prev + 1);
    };

    return (
        <div className="app-container proyectos-integradores-page">
            <header className="pi-hero" style={{ marginBottom: '2rem' }}>
                <div className="pi-hero-badge">ARDUINO WEB ENGINE v2.0</div>
                <h1 className="pi-hero-title">Diseñador Web Embebido</h1>
                <p className="pi-hero-desc">
                    Crea interfaces profesionales para tus proyectos IoT. Diseña en HTML/CSS, simula el comportamiento 
                    y exporta el código óptimo para tu hardware.
                </p>
                <div className="pi-hero-tags">
                    <span className="pi-tag">HTML5 / CSS3</span>
                    <span className="pi-tag">ESP32 / ESP8266</span>
                    <span className="pi-tag">Wemos Support</span>
                    <span className="pi-tag">PROGMEM Export</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2rem' }}>
                {/* Editor & Toolset Section */}
                <section className="pi-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                className={`sim-btn ${activeTab === 'html' ? 'active' : ''}`}
                                onClick={() => setActiveTab('html')}
                            >
                                🎨 Editor Visual
                            </button>
                            <button 
                                className={`sim-btn ${activeTab === 'arduino' ? 'active' : ''}`}
                                onClick={() => setActiveTab('arduino')}
                            >
                                💻 Código Arduino
                            </button>
                        </div>
                        
                        {activeTab === 'arduino' && (
                            <select 
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value)}
                                style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem' }}
                            >
                                <option value="println">Formato Simple (println)</option>
                                <option value="progmem">Optimizado (PROGMEM)</option>
                                <option value="websocket">Tiempo Real (Websocket)</option>
                            </select>
                        )}
                    </div>

                    {activeTab === 'html' ? (
                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={htmlCode}
                                onChange={(e) => setHtmlCode(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '550px',
                                    background: '#0f172a',
                                    color: '#94a3b8',
                                    fontFamily: '"Fira Code", "Courier New", monospace',
                                    fontSize: '0.85rem',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    border: '1px solid #1e293b',
                                    lineHeight: '1.5'
                                }}
                            />
                            <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                                <button className="sim-btn" onClick={() => setHtmlCode('')}>Borrar</button>
                                <button className="sim-btn active" onClick={updatePreview}>🔄 Renderizar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="code-block" style={{ margin: 0 }}>
                            <div className="code-header" style={{ background: '#1e293b' }}>
                                <span>arduino_web_server.ino</span>
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(generateArduinoCode())}>Copiar Código</button>
                            </div>
                            <pre style={{ height: '515px', overflowY: 'auto', background: '#0a0d14' }}>
                                <code style={{ color: '#38bdf8' }}>{generateArduinoCode()}</code>
                            </pre>
                        </div>
                    )}
                </section>

                {/* Simulation & Preview Section */}
                <section className="pi-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="pi-section-title" style={{ color: '#38bdf8', margin: 0 }}>Simulador de Navegador</h3>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
                        </div>
                    </div>
                    
                    {/* Browser Frame */}
                    <div style={{ 
                        width: '100%', 
                        height: '520px', 
                        background: '#f8fafc', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                        position: 'relative'
                    }}>
                        {/* Browser Address Bar */}
                        <div style={{ background: '#e2e8f0', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '18px', color: '#64748b' }}>↻</div>
                            <div style={{ flex: 1, background: '#fff', padding: '4px 15px', borderRadius: '20px', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                                <span>http://192.168.4.1/index.html</span>
                                <span>🔒</span>
                            </div>
                        </div>
                        
                        <iframe
                            key={previewKey}
                            title="preview"
                            srcDoc={htmlCode}
                            style={{ width: '100%', height: 'calc(100% - 40px)', border: 'none' }}
                        />
                    </div>

                    <div className="theory-formula" style={{ background: '#0f172a', color: '#94a3b8', fontSize: '0.75rem' }}>
                        📡 Simulación activa: Los eventos 'onclick' invocan peticiones simuladas al microcontrolador.
                    </div>
                </section>
            </div>

            {/* Documentation / Organization System */}
            <section style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="pi-section">
                    <h3 className="pi-section-title" style={{ color: '#ef4444' }}>⚠️ Optimización de Memoria</h3>
                    <p className="theory-item-text" style={{ fontSize: '0.85rem' }}>
                        El uso de <strong>client.println()</strong> es fácil pero ineficiente. Para interfaces con muchos estilos (CSS) o scripts, 
                        selecciona el modo <strong>PROGMEM</strong>. Esto almacenará el HTML en la memoria Flash del controlador, 
                        dejando la RAM libre para el procesamiento de sensores.
                    </p>
                </div>
                <div className="pi-section">
                    <h3 className="pi-section-title" style={{ color: '#22c55e' }}>🚀 Modo WebSockets</h3>
                    <p className="theory-item-text" style={{ fontSize: '0.85rem' }}>
                        Si tu dashboard requiere responder en tiempo real (menos de 100ms), no uses HTTP. 
                        Los WebSockets mantienen un "canal abierto" que permite que los botones reaccionen instantáneamente. 
                        Este modo requiere que importes la librería <strong>WebSocketsServer</strong> en tu Sketch.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ArduinoWebDesignerPage;

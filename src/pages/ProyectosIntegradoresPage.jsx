import React, { useState, useEffect, useRef } from 'react';
import './ProyectosIntegradoresStyles.css';

// ─── Interactive SVG Simulators ───────────────────────────────────────────

const WeatherStationSim = () => {
  const [temp, setTemp] = useState(22);
  const [humidity, setHumidity] = useState(55);
  const [pressure, setPressure] = useState(1013);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTemp(t => Math.round((t + (Math.random() - 0.48) * 2) * 10) / 10);
      setHumidity(h => Math.min(100, Math.max(10, Math.round(h + (Math.random() - 0.5) * 5))));
      setPressure(p => Math.round((p + (Math.random() - 0.5) * 3) * 10) / 10);
    }, 1500);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Estacion Meteorologica</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard">
        <div className="sim-gauge">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke={temp > 30 ? '#ef4444' : temp < 10 ? '#3b82f6' : '#10b981'} strokeWidth="8"
              strokeDasharray={`${(temp / 50) * 339} 339`} strokeLinecap="round" transform="rotate(-90 60 60)" />
            <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{temp}</text>
            <text x="60" y="75" textAnchor="middle" fill="#888" fontSize="11">°C</text>
          </svg>
          <span className="gauge-label">Temperatura</span>
        </div>
        <div className="sim-gauge">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#06b6d4" strokeWidth="8"
              strokeDasharray={`${(humidity / 100) * 339} 339`} strokeLinecap="round" transform="rotate(-90 60 60)" />
            <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{humidity}</text>
            <text x="60" y="75" textAnchor="middle" fill="#888" fontSize="11">% HR</text>
          </svg>
          <span className="gauge-label">Humedad</span>
        </div>
        <div className="sim-gauge">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#a855f7" strokeWidth="8"
              strokeDasharray={`${((pressure - 950) / 100) * 339} 339`} strokeLinecap="round" transform="rotate(-90 60 60)" />
            <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{pressure}</text>
            <text x="60" y="75" textAnchor="middle" fill="#888" fontSize="11">hPa</text>
          </svg>
          <span className="gauge-label">Presion</span>
        </div>
      </div>
      <div className="sim-serial">
        <div className="serial-header">Monitor Serie (9600 baud)</div>
        <div className="serial-output">
          {running ? (
            <>
              <span style={{ color: '#10b981' }}>Temp: {temp}°C | Hum: {humidity}% | Pres: {pressure} hPa</span>
              <span style={{ color: '#666' }}>Enviando datos via WiFi...</span>
            </>
          ) : <span style={{ color: '#666' }}>Sistema detenido. Presione Iniciar.</span>}
        </div>
      </div>
    </div>
  );
};

const SmartIrrigationSim = () => {
  const [soilMoisture, setSoilMoisture] = useState(65);
  const [pumpOn, setPumpOn] = useState(false);
  const [running, setRunning] = useState(false);
  const [threshold, setThreshold] = useState(30);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSoilMoisture(prev => {
        const next = pumpOn ? Math.min(100, prev + Math.random() * 8) : Math.max(0, prev - Math.random() * 4);
        return Math.round(next);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, pumpOn]);

  useEffect(() => {
    if (running) {
      setPumpOn(soilMoisture < threshold);
    }
  }, [soilMoisture, threshold, running]);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Riego Inteligente</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="moisture-display">
            <div className="moisture-bar-bg">
              <div className="moisture-bar-fill" style={{ height: `${soilMoisture}%`, background: soilMoisture < threshold ? '#ef4444' : '#10b981' }} />
            </div>
            <span className="moisture-value">{soilMoisture}%</span>
            <span className="gauge-label">Humedad del Suelo</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className={`pump-indicator ${pumpOn ? 'active' : ''}`}>
              <svg viewBox="0 0 60 60" width="80" height="80">
                <circle cx="30" cy="30" r="25" fill={pumpOn ? '#10b981' : '#1e293b'} stroke={pumpOn ? '#34d399' : '#333'} strokeWidth="3" />
                <text x="30" y="28" textAnchor="middle" fill="#fff" fontSize="20">{pumpOn ? '💧' : '⏹'}</text>
                <text x="30" y="45" textAnchor="middle" fill={pumpOn ? '#fff' : '#666'} fontSize="8" fontWeight="700">BOMBA</text>
              </svg>
            </div>
            <div style={{ marginTop: '0.5rem', color: pumpOn ? '#10b981' : '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
              {pumpOn ? 'REGANDO' : 'DETENIDA'}
            </div>
          </div>
        </div>
        <div className="threshold-control">
          <label>Umbral de riego: <strong>{threshold}%</strong></label>
          <input type="range" min="10" max="70" value={threshold} onChange={e => setThreshold(+e.target.value)} />
        </div>
      </div>
      <div className="sim-serial">
        <div className="serial-header">Monitor Serie</div>
        <div className="serial-output">
          {running ? (
            <>
              <span style={{ color: '#06b6d4' }}>Humedad suelo: {soilMoisture}% | Umbral: {threshold}%</span>
              <span style={{ color: pumpOn ? '#10b981' : '#f59e0b' }}>Bomba: {pumpOn ? 'ENCENDIDA - Regando...' : 'APAGADA - Esperando...'}</span>
            </>
          ) : <span style={{ color: '#666' }}>Sistema detenido.</span>}
        </div>
      </div>
    </div>
  );
};

const SmartParkingSim = () => {
  const [spaces] = useState([
    { id: 1, occupied: false },
    { id: 2, occupied: true },
    { id: 3, occupied: false },
    { id: 4, occupied: true },
    { id: 5, occupied: false },
    { id: 6, occupied: true },
  ]);
  const [parkingState, setParkingState] = useState(spaces);
  const [running, setRunning] = useState(false);
  const [barrierOpen, setBarrierOpen] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setParkingState(prev => prev.map(s => ({
        ...s,
        occupied: Math.random() > 0.6 ? !s.occupied : s.occupied
      })));
    }, 3000);
    return () => clearInterval(id);
  }, [running]);

  const freeSpaces = parkingState.filter(s => !s.occupied).length;

  useEffect(() => {
    if (running) setBarrierOpen(freeSpaces > 0);
  }, [freeSpaces, running]);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Estacionamiento Inteligente</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div className="parking-grid">
          {parkingState.map(s => (
            <div key={s.id} className={`parking-spot ${s.occupied ? 'occupied' : 'free'}`}>
              <span className="spot-icon">{s.occupied ? '🚗' : '✅'}</span>
              <span className="spot-label">P{s.id}</span>
              <span className="spot-distance">{s.occupied ? `${Math.round(Math.random() * 10 + 5)} cm` : '> 50 cm'}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="parking-info-box">
            <span className="big-number" style={{ color: '#10b981' }}>{freeSpaces}</span>
            <span>Libres</span>
          </div>
          <div className="parking-info-box">
            <span className="big-number" style={{ color: '#ef4444' }}>{6 - freeSpaces}</span>
            <span>Ocupados</span>
          </div>
          <div className="parking-info-box">
            <span className="big-number" style={{ color: barrierOpen ? '#10b981' : '#ef4444' }}>{barrierOpen ? '🔓' : '🔒'}</span>
            <span>Barrera {barrierOpen ? 'ABIERTA' : 'CERRADA'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySystemSim = () => {
  const [armed, setArmed] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const motion = Math.random() > 0.7;
      const door = Math.random() > 0.85;
      setMotionDetected(motion);
      setDoorOpen(door);
      if (armed && (motion || door)) {
        setAlarmOn(true);
        setLog(prev => [`[${new Date().toLocaleTimeString()}] ALERTA: ${motion ? 'Movimiento' : ''}${motion && door ? ' + ' : ''}${door ? 'Puerta abierta' : ''}`, ...prev].slice(0, 8));
      }
    }, 2000);
    return () => clearInterval(id);
  }, [running, armed]);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Sistema de Seguridad</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className={`security-btn ${armed ? 'armed' : ''}`} onClick={() => { setArmed(!armed); setAlarmOn(false); }}>
            {armed ? '🔴 ARMADO' : '🟢 DESARMADO'}
          </button>
          {alarmOn && <button className="security-btn alarm" onClick={() => setAlarmOn(false)}>🔕 Silenciar Alarma</button>}
        </div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className={`sensor-indicator ${motionDetected && armed ? 'alert' : ''}`}>
            <span style={{ fontSize: '2rem' }}>{motionDetected ? '🏃' : '😴'}</span>
            <span>PIR: {motionDetected ? 'MOVIMIENTO' : 'Sin movimiento'}</span>
          </div>
          <div className={`sensor-indicator ${doorOpen && armed ? 'alert' : ''}`}>
            <span style={{ fontSize: '2rem' }}>{doorOpen ? '🚪' : '🔒'}</span>
            <span>Puerta: {doorOpen ? 'ABIERTA' : 'Cerrada'}</span>
          </div>
          <div className={`sensor-indicator ${alarmOn ? 'alarm-flash' : ''}`}>
            <span style={{ fontSize: '2rem' }}>{alarmOn ? '🔔' : '🔕'}</span>
            <span>Alarma: {alarmOn ? 'SONANDO' : 'Silenciada'}</span>
          </div>
        </div>
        {log.length > 0 && (
          <div className="sim-serial">
            <div className="serial-header">Registro de Eventos</div>
            <div className="serial-output">
              {log.map((entry, i) => <span key={i} style={{ color: '#ef4444' }}>{entry}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const GreenhouseSim = () => {
  const [temp, setTemp] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [ventOpen, setVentOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [running, setRunning] = useState(false);
  const [maxTemp, setMaxTemp] = useState(32);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTemp(prev => {
        const delta = ventOpen ? -Math.random() * 3 : Math.random() * 2;
        return Math.round((prev + delta) * 10) / 10;
      });
      setHumidity(prev => {
        const delta = ventOpen ? -Math.random() * 3 : Math.random() * 2;
        return Math.min(100, Math.max(10, Math.round(prev + delta)));
      });
    }, 1500);
    return () => clearInterval(id);
  }, [running, ventOpen]);

  useEffect(() => {
    if (running) {
      setVentOpen(temp > maxTemp);
      setLightOn(humidity < 40);
    }
  }, [temp, humidity, maxTemp, running]);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Invernadero Automatizado</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard">
        <div className="greenhouse-visual">
          <svg viewBox="0 0 300 200" width="300" height="200">
            {/* Greenhouse structure */}
            <rect x="30" y="80" width="240" height="110" rx="5" fill="#1a3a1a" stroke="#2d6a2d" strokeWidth="2" />
            <polygon points="150,20 30,80 270,80" fill="#1a4a1a" stroke="#2d6a2d" strokeWidth="2" />
            {/* Glass panels */}
            <rect x="40" y="90" width="50" height="40" rx="3" fill="rgba(100,200,255,0.15)" stroke="#4ade80" strokeWidth="1" />
            <rect x="100" y="90" width="50" height="40" rx="3" fill="rgba(100,200,255,0.15)" stroke="#4ade80" strokeWidth="1" />
            {/* Vent */}
            <rect x="200" y={ventOpen ? 60 : 90} width="50" height="30" rx="3" fill={ventOpen ? 'rgba(59,130,246,0.3)' : 'rgba(100,200,255,0.15)'} stroke={ventOpen ? '#3b82f6' : '#4ade80'} strokeWidth="2" style={{ transition: 'all 0.5s ease' }} />
            <text x="225" y={ventOpen ? 80 : 110} textAnchor="middle" fill="#fff" fontSize="8">VENT</text>
            {/* Plants */}
            <text x="60" y="170" fontSize="25">🌱</text>
            <text x="120" y="165" fontSize="30">🌿</text>
            <text x="180" y="170" fontSize="25">🌱</text>
            <text x="230" y="168" fontSize="28">🌿</text>
            {/* Light */}
            {lightOn && <circle cx="150" cy="50" r="15" fill="rgba(250,204,21,0.4)" stroke="#fbbf24" strokeWidth="1" />}
            {lightOn && <text x="150" y="55" textAnchor="middle" fontSize="14">💡</text>}
            {/* Temp display */}
            <text x="65" y="145" fill={temp > maxTemp ? '#ef4444' : '#10b981'} fontSize="13" fontWeight="900">{temp}°C</text>
            <text x="125" y="145" fill="#06b6d4" fontSize="13" fontWeight="900">{humidity}%</text>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="greenhouse-status">
            <span>Ventilacion: <strong style={{ color: ventOpen ? '#3b82f6' : '#666' }}>{ventOpen ? 'ABIERTA' : 'CERRADA'}</strong></span>
            <span>Luz artificial: <strong style={{ color: lightOn ? '#fbbf24' : '#666' }}>{lightOn ? 'ENCENDIDA' : 'APAGADA'}</strong></span>
          </div>
          <div className="threshold-control">
            <label>Temp. maxima: <strong>{maxTemp}°C</strong></label>
            <input type="range" min="20" max="40" value={maxTemp} onChange={e => setMaxTemp(+e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SolarMonitorSim = () => {
  const [voltage, setVoltage] = useState(12.5);
  const [current, setCurrent] = useState(2.1);
  const [running, setRunning] = useState(false);
  const [sunIntensity, setSunIntensity] = useState(80);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const factor = sunIntensity / 100;
      const v = Math.round((11 + factor * 8 + (Math.random() - 0.5) * 0.5) * 100) / 100;
      const c = Math.round((factor * 4.5 + (Math.random() - 0.5) * 0.3) * 100) / 100;
      setVoltage(v);
      setCurrent(Math.max(0, c));
      setHistory(prev => [...prev.slice(-19), { v, c, w: Math.round(v * c * 100) / 100 }]);
    }, 1500);
    return () => clearInterval(id);
  }, [running, sunIntensity]);

  const power = Math.round(voltage * current * 100) / 100;
  const efficiency = Math.round((power / 100) * 100);

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h4>Simulador: Monitoreo Solar</h4>
        <button className={`sim-btn ${running ? 'active' : ''}`} onClick={() => setRunning(!running)}>
          {running ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="sim-dashboard" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div className="threshold-control">
          <label>Intensidad solar: <strong>{sunIntensity}%</strong> ☀️</label>
          <input type="range" min="0" max="100" value={sunIntensity} onChange={e => setSunIntensity(+e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="solar-reading">
            <span className="solar-value" style={{ color: '#fbbf24' }}>{voltage}</span>
            <span className="solar-unit">Voltios</span>
          </div>
          <div className="solar-reading">
            <span className="solar-value" style={{ color: '#06b6d4' }}>{current}</span>
            <span className="solar-unit">Amperios</span>
          </div>
          <div className="solar-reading">
            <span className="solar-value" style={{ color: '#10b981' }}>{power}</span>
            <span className="solar-unit">Watts</span>
          </div>
        </div>
        {history.length > 3 && (
          <div className="solar-chart">
            <svg viewBox="0 0 400 100" width="100%" height="100">
              {history.map((h, i) => (
                <rect key={i} x={i * 20} y={100 - h.w * 2} width="16" height={h.w * 2} rx="3" fill={`rgba(16, 185, 129, ${0.4 + (i / history.length) * 0.6})`} />
              ))}
            </svg>
            <span className="chart-label">Potencia generada (W) - Ultimas {history.length} muestras</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Code Snippets ────────────────────────────────────────────────────────

const CodeBlock = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{title}</span>
        <button onClick={handleCopy} className="copy-btn">{copied ? 'Copiado!' : 'Copiar'}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
};

// ─── Project Data ─────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'weather',
    num: 1,
    title: 'Estacion Meteorologica IoT',
    icon: '🌦️',
    color: '#3b82f6',
    description: 'Sistema de monitoreo ambiental en tiempo real con sensores de temperatura, humedad y presion atmosferica. Los datos se transmiten via WiFi a un servidor web para consulta remota.',
    objectives: [
      'Implementar lectura de sensores analogicos y digitales',
      'Configurar comunicacion WiFi con ESP8266/ESP32',
      'Desarrollar dashboard web para visualizacion de datos',
      'Aplicar conceptos de IoT (Internet de las Cosas)',
    ],
    components: [
      'Arduino UNO / ESP32',
      'Sensor DHT22 (temperatura y humedad)',
      'Sensor BMP280 (presion atmosferica)',
      'Modulo WiFi ESP8266 (si se usa Arduino UNO)',
      'Display LCD 16x2 I2C',
      'Protoboard y cables',
      'Resistencia 10K (pull-up DHT22)',
    ],
    circuitDescription: 'El DHT22 se conecta al pin digital D2 con una resistencia pull-up de 10K. El BMP280 se comunica por I2C (SDA en A4, SCL en A5). El display LCD tambien usa I2C. La alimentacion se provee a 5V desde el Arduino.',
    code: `#include <DHT.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  dht.begin();
  bmp.begin(0x76);
  lcd.init();
  lcd.backlight();
  lcd.print("Estacion Meteo");
  delay(2000);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  float pres = bmp.readPressure() / 100.0;

  // Mostrar en LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:" + String(temp,1) + "C H:" + String(hum,0) + "%");
  lcd.setCursor(0, 1);
  lcd.print("P:" + String(pres,1) + " hPa");

  // Enviar por Serial
  Serial.print("Temp:");
  Serial.print(temp);
  Serial.print(" Hum:");
  Serial.print(hum);
  Serial.print(" Pres:");
  Serial.println(pres);

  delay(2000);
}`,
    Simulator: WeatherStationSim,
  },
  {
    id: 'irrigation',
    num: 2,
    title: 'Sistema de Riego Inteligente',
    icon: '💧',
    color: '#10b981',
    description: 'Sistema automatizado de riego para huerta o jardin que mide la humedad del suelo y activa una bomba de agua cuando el nivel baja de un umbral configurable. Incluye control IoT remoto.',
    objectives: [
      'Leer sensores de humedad capacitivos',
      'Controlar actuadores (bomba de agua) con rele',
      'Implementar logica de control con umbrales',
      'Desarrollar interfaz de monitoreo remoto',
    ],
    components: [
      'Arduino UNO',
      'Sensor de humedad del suelo (capacitivo)',
      'Modulo Rele 5V',
      'Bomba de agua sumergible 5V',
      'Manguera silicona',
      'Fuente de alimentacion 5V 2A',
      'LED indicador + Resistencia 220 ohm',
    ],
    circuitDescription: 'El sensor de humedad se conecta al pin analogico A0. El modulo rele se controla desde el pin digital D7. La bomba se alimenta a traves del rele con fuente externa de 5V. Un LED en D13 indica el estado del sistema.',
    code: `#define SENSOR_PIN A0
#define RELE_PIN 7
#define LED_PIN 13

int umbralSeco = 400;  // Valor analogico = suelo seco

void setup() {
  Serial.begin(9600);
  pinMode(RELE_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(RELE_PIN, HIGH); // Rele OFF (activo bajo)
  Serial.println("Sistema de Riego Inteligente");
  Serial.println("===========================");
}

void loop() {
  int humedadRaw = analogRead(SENSOR_PIN);
  int humedadPct = map(humedadRaw, 1023, 300, 0, 100);
  humedadPct = constrain(humedadPct, 0, 100);

  Serial.print("Humedad suelo: ");
  Serial.print(humedadPct);
  Serial.print("% (raw: ");
  Serial.print(humedadRaw);
  Serial.print(") -> ");

  if (humedadRaw > umbralSeco) {
    // Suelo seco - activar riego
    digitalWrite(RELE_PIN, LOW); // Rele ON
    digitalWrite(LED_PIN, HIGH);
    Serial.println("REGANDO");
  } else {
    // Suelo humedo - detener riego
    digitalWrite(RELE_PIN, HIGH); // Rele OFF
    digitalWrite(LED_PIN, LOW);
    Serial.println("OK - Humedad suficiente");
  }

  delay(5000); // Leer cada 5 segundos
}`,
    Simulator: SmartIrrigationSim,
  },
  {
    id: 'parking',
    num: 3,
    title: 'Estacionamiento Inteligente',
    icon: '🅿️',
    color: '#8b5cf6',
    description: 'Sistema de gestion de estacionamiento que detecta vehiculos con sensores ultrasonicos, indica la disponibilidad de plazas con LEDs y controla una barrera de acceso automatica con servomotor.',
    objectives: [
      'Programar sensores ultrasonicos HC-SR04',
      'Controlar servomotores para barrera',
      'Implementar logica de semaforizacion con LEDs',
      'Disenar sistema de conteo de vehiculos',
    ],
    components: [
      'Arduino MEGA',
      'Sensores ultrasonicos HC-SR04 (x6)',
      'Servomotor SG90 (barrera)',
      'LEDs verdes (x6) y rojos (x6)',
      'Display 7 segmentos',
      'Buzzer piezoelectrico',
      'Resistencias 220 ohm (x12)',
    ],
    circuitDescription: 'Cada sensor HC-SR04 usa dos pines (trigger + echo). El servo de la barrera se conecta al pin D9. Los LEDs se conectan con resistencias de 220 ohm en pines digitales. El display 7 segmentos muestra los espacios libres.',
    code: `#include <Servo.h>

#define NUM_ESPACIOS 6
#define SERVO_PIN 9
#define BUZZER_PIN 10
#define DISTANCIA_OCUPADO 30 // cm

Servo barrera;

int trigPins[] = {22, 24, 26, 28, 30, 32};
int echoPins[] = {23, 25, 27, 29, 31, 33};
int ledVerdes[] = {2, 3, 4, 5, 6, 7};
int ledRojos[] = {34, 36, 38, 40, 42, 44};
bool ocupado[NUM_ESPACIOS];

void setup() {
  Serial.begin(9600);
  barrera.attach(SERVO_PIN);
  barrera.write(0); // Barrera cerrada
  pinMode(BUZZER_PIN, OUTPUT);

  for (int i = 0; i < NUM_ESPACIOS; i++) {
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
    pinMode(ledVerdes[i], OUTPUT);
    pinMode(ledRojos[i], OUTPUT);
  }
  Serial.println("Estacionamiento Inteligente");
}

long medirDistancia(int trig, int echo) {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  return pulseIn(echo, HIGH) * 0.034 / 2;
}

void loop() {
  int libres = 0;

  for (int i = 0; i < NUM_ESPACIOS; i++) {
    long dist = medirDistancia(trigPins[i], echoPins[i]);
    ocupado[i] = (dist < DISTANCIA_OCUPADO);

    digitalWrite(ledVerdes[i], !ocupado[i]);
    digitalWrite(ledRojos[i], ocupado[i]);

    if (!ocupado[i]) libres++;

    Serial.print("P");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.print(dist);
    Serial.print("cm ");
    Serial.print(ocupado[i] ? "[OCUPADO]" : "[LIBRE]");
    Serial.print("  ");
  }

  Serial.print("-> Libres: ");
  Serial.println(libres);

  // Control de barrera
  if (libres > 0) {
    barrera.write(90); // Abrir barrera
  } else {
    barrera.write(0);  // Cerrar barrera
    tone(BUZZER_PIN, 1000, 200); // Beep
  }

  delay(2000);
}`,
    Simulator: SmartParkingSim,
  },
  {
    id: 'security',
    num: 4,
    title: 'Sistema de Seguridad',
    icon: '🔒',
    color: '#ef4444',
    description: 'Sistema de seguridad con sensor de movimiento PIR, sensor magnetico de puerta, alarma sonora y notificacion remota. Permite armar/desarmar con teclado numerico y codigo secreto.',
    objectives: [
      'Integrar multiples tipos de sensores (PIR, magnetico)',
      'Implementar maquina de estados para modos del sistema',
      'Programar teclado matricial para ingreso de codigo',
      'Disenar sistema de alarma con buzzer y LED',
    ],
    components: [
      'Arduino UNO',
      'Sensor PIR HC-SR501',
      'Sensor magnetico de puerta (reed switch)',
      'Teclado matricial 4x4',
      'Buzzer activo 5V',
      'LED rojo + LED verde',
      'Modulo WiFi ESP8266 (notificaciones)',
      'Resistencias 220 ohm (x2)',
    ],
    circuitDescription: 'El sensor PIR se conecta al pin D2 (interrupcion). El reed switch va al pin D3 con pull-up interno. El teclado matricial usa pines D4-D11. El buzzer en D12, LED rojo en D13 y LED verde en A0.',
    code: `#define PIR_PIN 2
#define PUERTA_PIN 3
#define BUZZER_PIN 12
#define LED_ROJO 13
#define LED_VERDE A0

bool sistemaArmado = false;
bool alarmaActiva = false;
String codigoSecreto = "1234";
String codigoIngresado = "";

void setup() {
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  pinMode(PUERTA_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);

  digitalWrite(LED_VERDE, HIGH);
  Serial.println("Sistema de Seguridad v1.0");
  Serial.println("Comandos: A=Armar, D=Desarmar");
}

void loop() {
  // Leer comandos del Serial Monitor
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'A' || c == 'a') {
      sistemaArmado = true;
      alarmaActiva = false;
      Serial.println("[SISTEMA ARMADO]");
      digitalWrite(LED_ROJO, HIGH);
      digitalWrite(LED_VERDE, LOW);
      tone(BUZZER_PIN, 2000, 100);
    } else if (c == 'D' || c == 'd') {
      sistemaArmado = false;
      alarmaActiva = false;
      noTone(BUZZER_PIN);
      Serial.println("[SISTEMA DESARMADO]");
      digitalWrite(LED_ROJO, LOW);
      digitalWrite(LED_VERDE, HIGH);
    }
  }

  if (sistemaArmado) {
    bool movimiento = digitalRead(PIR_PIN);
    bool puertaAbierta = !digitalRead(PUERTA_PIN);

    if (movimiento) {
      Serial.println("!! MOVIMIENTO DETECTADO !!");
      alarmaActiva = true;
    }
    if (puertaAbierta) {
      Serial.println("!! PUERTA ABIERTA !!");
      alarmaActiva = true;
    }

    if (alarmaActiva) {
      // Sirena alternante
      tone(BUZZER_PIN, 1500, 200);
      digitalWrite(LED_ROJO, !digitalRead(LED_ROJO));
      delay(200);
      tone(BUZZER_PIN, 800, 200);
      delay(200);
    }
  }

  delay(100);
}`,
    Simulator: SecuritySystemSim,
  },
  {
    id: 'greenhouse',
    num: 5,
    title: 'Invernadero Automatizado',
    icon: '🌿',
    color: '#22c55e',
    description: 'Control climatico automatizado para invernadero escolar. Regula temperatura con ventilacion, humedad con riego y luz con lampara grow LED. Incluye monitoreo de condiciones optimas para cultivo.',
    objectives: [
      'Controlar multiples actuadores (ventilador, bomba, luz)',
      'Implementar control PID basico de temperatura',
      'Disenar sistema de respuesta automatica multi-variable',
      'Integrar sensores analogicos y digitales',
    ],
    components: [
      'Arduino MEGA',
      'Sensor DHT22 (temperatura + humedad)',
      'Sensor de humedad de suelo',
      'Servomotor (ventana/compuerta)',
      'Modulo Rele 4 canales',
      'Ventilador 12V',
      'Bomba de agua 5V',
      'Tira LED grow (rojo/azul)',
      'Fuente 12V',
    ],
    circuitDescription: 'El DHT22 va al pin D2. El sensor de suelo al pin A0. El servo de la ventana en D9. Los reles controlan ventilador (D4), bomba (D5) y luz (D6). Alimentacion externa de 12V para el ventilador.',
    code: `#include <DHT.h>
#include <Servo.h>

#define DHT_PIN 2
#define SUELO_PIN A0
#define SERVO_PIN 9
#define RELE_VENT 4
#define RELE_BOMBA 5
#define RELE_LUZ 6

DHT dht(DHT_PIN, DHT22);
Servo ventana;

// Umbrales configurables
float tempMax = 32.0;
float tempMin = 18.0;
int humedadSueloMin = 35;
int horasLuz = 14; // horas de luz por dia

void setup() {
  Serial.begin(9600);
  dht.begin();
  ventana.attach(SERVO_PIN);
  ventana.write(0);

  pinMode(RELE_VENT, OUTPUT);
  pinMode(RELE_BOMBA, OUTPUT);
  pinMode(RELE_LUZ, OUTPUT);

  // Reles apagados (activo bajo)
  digitalWrite(RELE_VENT, HIGH);
  digitalWrite(RELE_BOMBA, HIGH);
  digitalWrite(RELE_LUZ, HIGH);

  Serial.println("Invernadero Automatizado v1.0");
  Serial.println("=============================");
}

void loop() {
  float temp = dht.readTemperature();
  float humAire = dht.readHumidity();
  int humSuelo = map(analogRead(SUELO_PIN), 1023, 300, 0, 100);
  humSuelo = constrain(humSuelo, 0, 100);

  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print("C | Hum Aire: ");
  Serial.print(humAire);
  Serial.print("% | Hum Suelo: ");
  Serial.print(humSuelo);
  Serial.println("%");

  // Control de temperatura
  if (temp > tempMax) {
    ventana.write(90);            // Abrir ventana
    digitalWrite(RELE_VENT, LOW); // Encender ventilador
    Serial.println("-> Ventilacion ACTIVADA");
  } else if (temp < tempMin) {
    ventana.write(0);              // Cerrar ventana
    digitalWrite(RELE_VENT, HIGH); // Apagar ventilador
    Serial.println("-> Ventilacion DESACTIVADA");
  }

  // Control de riego
  if (humSuelo < humedadSueloMin) {
    digitalWrite(RELE_BOMBA, LOW); // Encender bomba
    Serial.println("-> Riego ACTIVADO");
  } else {
    digitalWrite(RELE_BOMBA, HIGH);
  }

  // Control de iluminacion
  // En produccion: usar RTC para horario
  // Simplificado: luz encendida siempre
  digitalWrite(RELE_LUZ, LOW);

  delay(5000);
}`,
    Simulator: GreenhouseSim,
  },
  {
    id: 'solar',
    num: 6,
    title: 'Monitoreo de Energia Solar',
    icon: '☀️',
    color: '#f59e0b',
    description: 'Sistema de monitoreo para panel solar fotovoltaico. Mide tension, corriente y potencia generada en tiempo real. Calcula eficiencia y registra datos historicos para analisis de rendimiento.',
    objectives: [
      'Medir tension y corriente con sensores analogicos',
      'Calcular potencia y energia acumulada',
      'Implementar registro de datos (datalogger)',
      'Analizar eficiencia del panel solar',
    ],
    components: [
      'Arduino UNO',
      'Panel solar 6V 2W',
      'Sensor de corriente ACS712 (5A)',
      'Divisor de tension (resistencias 10K + 5K)',
      'Modulo MicroSD para registro',
      'Display OLED 0.96" I2C',
      'Bateria recargable 3.7V + modulo TP4056',
      'Protoboard y cables',
    ],
    circuitDescription: 'El panel solar pasa por el sensor ACS712 conectado a A0 para medir corriente. La tension se mide en A1 a traves de un divisor resistivo (10K + 5K) para no superar 5V en el ADC. El display OLED usa I2C (A4/A5).',
    code: `#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define VOLTAGE_PIN A1
#define CURRENT_PIN A0
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Calibracion
float factorVoltaje = 3.0;    // Divisor resistivo 10K/5K
float offsetCorriente = 2.5;  // ACS712 offset
float sensibilidad = 0.185;   // ACS712 5A = 185mV/A

float energiaTotal = 0;       // Wh acumulados
unsigned long ultimoTiempo = 0;

void setup() {
  Serial.begin(9600);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Monitor Solar");
  display.println("v1.0");
  display.display();
  delay(2000);
  ultimoTiempo = millis();
  Serial.println("Monitor de Energia Solar");
  Serial.println("Voltaje,Corriente,Potencia,Energia");
}

void loop() {
  // Leer sensores (promedio de 10 lecturas)
  float sumaV = 0, sumaI = 0;
  for (int i = 0; i < 10; i++) {
    sumaV += analogRead(VOLTAGE_PIN);
    sumaI += analogRead(CURRENT_PIN);
    delay(10);
  }

  float voltaje = (sumaV / 10.0) * 5.0 / 1023.0 * factorVoltaje;
  float corrienteRaw = (sumaI / 10.0) * 5.0 / 1023.0;
  float corriente = (corrienteRaw - offsetCorriente) / sensibilidad;
  if (corriente < 0.05) corriente = 0;

  float potencia = voltaje * corriente;

  // Calcular energia (Wh)
  unsigned long ahora = millis();
  float horas = (ahora - ultimoTiempo) / 3600000.0;
  energiaTotal += potencia * horas;
  ultimoTiempo = ahora;

  // Mostrar en OLED
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== MONITOR SOLAR ===");
  display.print("V: ");
  display.print(voltaje, 2);
  display.println(" V");
  display.print("I: ");
  display.print(corriente, 2);
  display.println(" A");
  display.print("P: ");
  display.print(potencia, 2);
  display.println(" W");
  display.print("E: ");
  display.print(energiaTotal, 3);
  display.println(" Wh");
  display.display();

  // Enviar por Serial (CSV)
  Serial.print(voltaje, 2);
  Serial.print(",");
  Serial.print(corriente, 2);
  Serial.print(",");
  Serial.print(potencia, 2);
  Serial.print(",");
  Serial.println(energiaTotal, 3);

  delay(2000);
}`,
    Simulator: SolarMonitorSim,
  },
];

// ─── Main Page Component ──────────────────────────────────────────────────

const ProyectosIntegradoresPage = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showCode, setShowCode] = useState({});

  const toggleProject = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  const toggleCode = (id) => {
    setShowCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="app-container proyectos-integradores-page">
      {/* Hero Section */}
      <div className="pi-hero">
        <div className="pi-hero-badge">6° AÑO - PROYECTO INTEGRADOR</div>
        <h1 className="pi-hero-title">
          Proyectos Integradores
        </h1>
        <h2 className="pi-hero-subtitle">Arduino + Sensores + Energia Solar + IoT</h2>
        <p className="pi-hero-desc">
          Seis proyectos interdisciplinarios que integran electronica, programacion, energias renovables
          e Internet de las Cosas. Cada proyecto incluye simulador interactivo, codigo Arduino completo
          y lista de componentes.
        </p>
        <div className="pi-hero-tags">
          <span className="pi-tag">Arduino</span>
          <span className="pi-tag">Sensores</span>
          <span className="pi-tag">IoT</span>
          <span className="pi-tag">Energia Solar</span>
          <span className="pi-tag">WiFi</span>
          <span className="pi-tag">C/C++</span>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="pi-grid">
        {PROJECTS.map(project => (
          <div key={project.id} className="pi-card-wrapper">
            {/* Card Preview */}
            <div
              className={`pi-card ${activeProject === project.id ? 'expanded' : ''}`}
              style={{ '--project-color': project.color }}
              onClick={() => toggleProject(project.id)}
            >
              <div className="pi-card-num" style={{ background: project.color }}>{project.num}</div>
              <div className="pi-card-icon">{project.icon}</div>
              <h3 className="pi-card-title">{project.title}</h3>
              <p className="pi-card-desc">{project.description}</p>
              <div className="pi-card-expand">
                {activeProject === project.id ? 'Cerrar' : 'Ver proyecto completo'} {activeProject === project.id ? '▲' : '▼'}
              </div>
            </div>

            {/* Expanded Content */}
            {activeProject === project.id && (
              <div className="pi-expanded">
                {/* Objectives */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Objetivos del Proyecto</h3>
                  <ul className="pi-objectives">
                    {project.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {/* Simulator */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Simulador Interactivo</h3>
                  <project.Simulator />
                </div>

                {/* Components */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Componentes Necesarios</h3>
                  <div className="pi-components-grid">
                    {project.components.map((comp, i) => (
                      <div key={i} className="pi-component">
                        <span className="pi-component-dot" style={{ background: project.color }} />
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Circuit */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Esquema de Conexion</h3>
                  <div className="pi-circuit-desc">
                    {project.circuitDescription}
                  </div>
                </div>

                {/* Code */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Codigo Arduino</h3>
                  <button className="sim-btn" onClick={(e) => { e.stopPropagation(); toggleCode(project.id); }}>
                    {showCode[project.id] ? 'Ocultar Codigo' : 'Mostrar Codigo Completo'}
                  </button>
                  {showCode[project.id] && (
                    <CodeBlock title={`${project.title}.ino`} code={project.code} />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary / Resources Section */}
      <div className="pi-resources">
        <h2 className="pi-resources-title">Recursos y Herramientas</h2>
        <div className="pi-resources-grid">
          <div className="pi-resource-card">
            <span className="pi-resource-icon">📚</span>
            <h4>Documentacion</h4>
            <p>Cada proyecto incluye codigo comentado, esquemas de conexion y listado de componentes completo.</p>
          </div>
          <div className="pi-resource-card">
            <span className="pi-resource-icon">🔧</span>
            <h4>IDE Arduino</h4>
            <p>Descarga el IDE Arduino desde arduino.cc para compilar y subir los programas a la placa.</p>
          </div>
          <div className="pi-resource-card">
            <span className="pi-resource-icon">📡</span>
            <h4>Librerias</h4>
            <p>Instala las librerias necesarias desde el Gestor de Librerias del IDE Arduino (DHT, Adafruit, Servo, etc).</p>
          </div>
          <div className="pi-resource-card">
            <span className="pi-resource-icon">🎓</span>
            <h4>Evaluacion</h4>
            <p>Los proyectos se evaluan mediante presentacion oral, informe tecnico y demostracion del prototipo funcionando.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectosIntegradoresPage;

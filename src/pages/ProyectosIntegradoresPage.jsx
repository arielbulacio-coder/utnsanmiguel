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
        <div className="serial-header">Monitor Serie (9600 baud) - Procesando Protocolos</div>
        <div className="serial-output">
          {running ? (
            <>
              <span style={{ color: '#10b981' }}>[OK] Lectura Sensores: DHT22 (D2) + BMP280 (I2C)</span>
              <span style={{ color: '#00d2ff' }}>Temp: {temp}°C | Hum: {humidity}% | Pres: {pressure} hPa</span>
              <span style={{ color: '#666' }}>[MQTT] Conectando a broker.cloudiot.unlp...</span>
              <span style={{ color: '#fbbf24' }}>[WIFI] Paquete de datos enviado via ESP8266</span>
            </>
          ) : <span style={{ color: '#666' }}>Sistema detenido. Verifique alimentacion y conexion USB.</span>}
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
      <div className="sim-serial">
        <div className="serial-header">Monitor Serie (9600 baud) - Gestion Vehicular</div>
        <div className="serial-output">
          {running ? (
            <>
              <span style={{ color: '#8b5cf6' }}>[SCAN] Escaneando {6} plazas ultrasonicas...</span>
              <span style={{ color: freeSpaces > 0 ? '#10b981' : '#ef4444' }}>
                Disponibilidad: {freeSpaces} LIBRES | {6 - freeSpaces} OCUPADOS
              </span>
              <span style={{ color: '#666' }}>[SERVO] Angulo Barrera: {barrierOpen ? '90° (OPEN)' : '0° (CLOSED)'}</span>
              {!barrierOpen && <span style={{ color: '#f59e0b' }}>[BUZZER] Alertando: Estacionamiento LLENO</span>}
            </>
          ) : <span style={{ color: '#666' }}>Sistema fuera de linea. Esperando vehiculos.</span>}
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
      <div className="sim-serial">
        <div className="serial-header">Monitor Serie - Control Bioclimatico v2.4</div>
        <div className="serial-output">
          {running ? (
            <>
              <span style={{ color: '#10b981' }}>[SENSOR] T: {temp}°C | H_Aire: {humidity}%</span>
              <span style={{ color: '#3b82f6' }}>[ACTUADOR] Ventana: {ventOpen ? 'ABIERTA (Cooling)' : 'CERRADA'}</span>
              <span style={{ color: '#fbbf24' }}>[LIGHT] Espectro PAR: {lightOn ? 'FULL SPECTRUM ON' : 'OFF'}</span>
              <span style={{ color: '#ef4444' }}>[CPU] Cargo Carga: {ventOpen ? 'Alta (Ventilador 12V ON)' : 'Baja'}</span>
            </>
          ) : <span style={{ color: '#666' }}>Invernadero en modo manual. Inicie el controlador.</span>}
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

// ─── SVG Circuit Diagrams ─────────────────────────────────────────────────

const SvgPin = ({ x, y, label, color = '#10b981' }) => (
  <g>
    <circle cx={x} cy={y} r="4" fill={color} />
    <text x={x} y={y - 8} textAnchor="middle" fill="#aaa" fontSize="7" fontWeight="700">{label}</text>
  </g>
);

const SvgWire = ({ x1, y1, x2, y2, color = '#555' }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
);

const SvgComponent = ({ x, y, w, h, label, sublabel, fill = '#1a2744', stroke = '#3b82f6' }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <text x={x + w / 2} y={y + h / 2 - (sublabel ? 4 : 0)} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800">{label}</text>
    {sublabel && <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fill="#888" fontSize="6">{sublabel}</text>}
  </g>
);

const WeatherCircuitSVG = () => (
  <svg viewBox="0 0 520 300" className="circuit-svg">
    {/* Arduino */}
    <rect x="200" y="80" width="120" height="160" rx="8" fill="#1a2332" stroke="#3b82f6" strokeWidth="2" />
    <text x="260" y="105" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="900">ARDUINO UNO</text>
    <text x="260" y="120" textAnchor="middle" fill="#555" fontSize="7">ATmega328P</text>
    {/* USB */}
    <rect x="245" y="70" width="30" height="15" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
    <text x="260" y="81" textAnchor="middle" fill="#888" fontSize="6">USB</text>
    {/* Arduino pins left */}
    <SvgPin x={200} y={140} label="D2" color="#10b981" />
    <SvgPin x={200} y={165} label="A4" color="#f59e0b" />
    <SvgPin x={200} y={185} label="A5" color="#f59e0b" />
    {/* Arduino pins right */}
    <SvgPin x={320} y={140} label="5V" color="#ef4444" />
    <SvgPin x={320} y={165} label="GND" color="#666" />
    <SvgPin x={320} y={185} label="3.3V" color="#f97316" />
    {/* DHT22 */}
    <SvgComponent x={30} y={105} w={100} h={55} label="DHT22" sublabel="Temp + Humedad" fill="#0f2a1a" stroke="#10b981" />
    <SvgWire x1={130} y1={132} x2={200} y2={140} color="#10b981" />
    {/* Pull-up resistor */}
    <rect x="155" y="115" width="25" height="10" rx="3" fill="#333" stroke="#f59e0b" strokeWidth="1" />
    <text x="168" y="122" textAnchor="middle" fill="#f59e0b" fontSize="6">10K</text>
    <SvgWire x1={168} y1={115} x2={168} y2={105} color="#ef4444" />
    <text x="168" y="102" textAnchor="middle" fill="#ef4444" fontSize="6">5V</text>
    {/* BMP280 */}
    <SvgComponent x={30} y={175} w={100} h={55} label="BMP280" sublabel="Presion Atm." fill="#1a1a2e" stroke="#a855f7" />
    <SvgWire x1={130} y1={195} x2={200} y2={165} color="#f59e0b" />
    <text x="165" y="177" fill="#f59e0b" fontSize="6">SDA</text>
    <SvgWire x1={130} y1={210} x2={200} y2={185} color="#f59e0b" />
    <text x="165" y="200" fill="#f59e0b" fontSize="6">SCL</text>
    {/* LCD I2C */}
    <SvgComponent x={390} y={105} w={100} h={55} label="LCD 16x2" sublabel="I2C 0x27" fill="#1a2332" stroke="#06b6d4" />
    <SvgWire x1={320} y1={140} x2={390} y2={125} color="#ef4444" />
    <SvgWire x1={320} y1={165} x2={390} y2={145} color="#666" />
    {/* I2C bus label */}
    <rect x="155" y="243" width="210" height="22" rx="5" fill="rgba(249,115,22,0.1)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
    <text x="260" y="258" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">Bus I2C (SDA + SCL)</text>
    {/* ESP8266 WiFi */}
    <SvgComponent x={390} y={185} w={100} h={45} label="ESP8266" sublabel="WiFi IoT" fill="#1a2332" stroke="#8b5cf6" />
    <SvgWire x1={320} y1={185} x2={390} y2={200} color="#f97316" />
    {/* WiFi waves */}
    <path d="M 505 200 Q 515 190 525 200" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
    <path d="M 500 195 Q 515 180 530 195" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
    {/* Legend */}
    <rect x="15" y="260" width="130" height="30" rx="5" fill="rgba(0,0,0,0.3)" />
    <circle cx="30" cy="275" r="4" fill="#ef4444" /><text x="38" y="278" fill="#aaa" fontSize="7">5V / 3.3V</text>
    <circle cx="90" cy="275" r="4" fill="#666" /><text x="98" y="278" fill="#aaa" fontSize="7">GND</text>
  </svg>
);

const IrrigationCircuitSVG = () => (
  <svg viewBox="0 0 520 280" className="circuit-svg">
    {/* Arduino */}
    <rect x="200" y="60" width="120" height="160" rx="8" fill="#1a2332" stroke="#10b981" strokeWidth="2" />
    <text x="260" y="85" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="900">ARDUINO UNO</text>
    <SvgPin x={200} y={120} label="A0" color="#f59e0b" />
    <SvgPin x={200} y={150} label="D7" color="#10b981" />
    <SvgPin x={200} y={180} label="D13" color="#ef4444" />
    <SvgPin x={320} y={120} label="5V" color="#ef4444" />
    <SvgPin x={320} y={150} label="GND" color="#666" />
    {/* Soil Sensor */}
    <SvgComponent x={30} y={90} w={110} h={55} label="Sensor Humedad" sublabel="Capacitivo (A0)" fill="#1a2a1a" stroke="#10b981" />
    <SvgWire x1={140} y1={117} x2={200} y2={120} color="#f59e0b" />
    {/* Relay */}
    <SvgComponent x={30} y={165} w={110} h={50} label="Modulo Rele" sublabel="5V - 1 Canal" fill="#2a1a1a" stroke="#ef4444" />
    <SvgWire x1={140} y1={190} x2={200} y2={150} color="#10b981" />
    {/* Pump */}
    <SvgComponent x={30} y={235} w={110} h={40} label="Bomba 5V" sublabel="Sumergible" fill="#1a1a2e" stroke="#06b6d4" />
    <SvgWire x1={85} y1={235} x2={85} y2={215} color="#ef4444" />
    <text x="95" y="228" fill="#ef4444" fontSize="6">NO/COM</text>
    {/* LED */}
    <SvgComponent x={380} y={155} w={70} h={35} label="LED" sublabel="D13" fill="#2a2a1a" stroke="#f59e0b" />
    <SvgWire x1={320} y1={180} x2={380} y2={172} color="#f59e0b" />
    {/* Resistor for LED */}
    <rect x="355" y="163" width="20" height="8" rx="2" fill="#333" stroke="#f59e0b" strokeWidth="1" />
    <text x="365" y="169" textAnchor="middle" fill="#f59e0b" fontSize="5">220</text>
    {/* Power supply */}
    <SvgComponent x={380} y={90} w={100} h={45} label="Fuente 5V" sublabel="2A Externa" fill="#1a2332" stroke="#ef4444" />
    <SvgWire x1={320} y1={120} x2={380} y2={110} color="#ef4444" />
    {/* Flow diagram */}
    <rect x="180" y="240" width="300" height="30" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" strokeDasharray="4" />
    <text x="330" y="259" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="700">Sensor lee humedad → Arduino decide → Rele activa bomba</text>
  </svg>
);

const ParkingCircuitSVG = () => (
  <svg viewBox="0 0 540 300" className="circuit-svg">
    {/* Arduino MEGA */}
    <rect x="200" y="50" width="140" height="180" rx="8" fill="#1a2332" stroke="#8b5cf6" strokeWidth="2" />
    <text x="270" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="900">ARDUINO MEGA</text>
    <text x="270" y="90" textAnchor="middle" fill="#555" fontSize="7">ATmega2560</text>
    {/* Ultrasonic sensors */}
    {[0, 1, 2].map(i => (
      <g key={i}>
        <rect x={20} y={55 + i * 55} width={90} height={40} rx="5" fill="#1a2332" stroke="#06b6d4" strokeWidth="1.5" />
        <text x={65} y={73 + i * 55} textAnchor="middle" fill="#06b6d4" fontSize="8" fontWeight="700">HC-SR04</text>
        <text x={65} y={85 + i * 55} textAnchor="middle" fill="#666" fontSize="6">Plaza P{i + 1}</text>
        <SvgWire x1={110} y1={70 + i * 55} x2={200} y2={110 + i * 25} color="#06b6d4" />
        {/* Sonar waves */}
        <path d={`M 15 ${70 + i * 55} Q 5 ${65 + i * 55} 15 ${60 + i * 55}`} fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
      </g>
    ))}
    {/* More sensors label */}
    <text x="65" y="225" textAnchor="middle" fill="#666" fontSize="8">+ 3 sensores mas...</text>
    {/* Servo barrier */}
    <SvgComponent x={400} y={60} w={100} h={50} label="Servo SG90" sublabel="Barrera D9" fill="#2a2a1a" stroke="#f59e0b" />
    <SvgWire x1={340} y1={110} x2={400} y2={85} color="#f59e0b" />
    {/* LEDs */}
    <rect x="400" y="130" width="100" height="45" rx="5" fill="#0a1a0a" stroke="#10b981" strokeWidth="1.5" />
    <text x="450" y="148" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="700">LEDs x12</text>
    <text x="450" y="162" textAnchor="middle" fill="#666" fontSize="6">6 Verde + 6 Rojo</text>
    <SvgWire x1={340} y1={140} x2={400} y2={152} color="#10b981" />
    {/* Buzzer */}
    <SvgComponent x={400} y={195} w={100} h={40} label="Buzzer" sublabel="Piezo D10" fill="#2a1a1a" stroke="#ef4444" />
    <SvgWire x1={340} y1={170} x2={400} y2={215} color="#ef4444" />
    {/* Display */}
    <SvgComponent x={160} y={250} w={220} h={35} label="Display 7 Segmentos — Espacios Libres" fill="#1a1a2e" stroke="#a855f7" />
  </svg>
);

const SecurityCircuitSVG = () => (
  <svg viewBox="0 0 520 300" className="circuit-svg">
    {/* Arduino */}
    <rect x="200" y="60" width="120" height="180" rx="8" fill="#1a2332" stroke="#ef4444" strokeWidth="2" />
    <text x="260" y="85" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="900">ARDUINO UNO</text>
    <SvgPin x={200} y={120} label="D2" color="#f59e0b" />
    <SvgPin x={200} y={150} label="D3" color="#06b6d4" />
    <SvgPin x={200} y={180} label="D12" color="#ef4444" />
    <SvgPin x={200} y={210} label="D13" color="#ef4444" />
    <SvgPin x={320} y={120} label="A0" color="#10b981" />
    <SvgPin x={320} y={150} label="5V" color="#ef4444" />
    <SvgPin x={320} y={180} label="GND" color="#666" />
    {/* PIR Sensor */}
    <SvgComponent x={30} y={95} w={110} h={50} label="PIR HC-SR501" sublabel="Sensor Movimiento" fill="#2a2a1a" stroke="#f59e0b" />
    <SvgWire x1={140} y1={120} x2={200} y2={120} color="#f59e0b" />
    {/* Detection cone */}
    <path d="M 30 110 L 5 90 L 5 130 Z" fill="rgba(249,115,22,0.15)" stroke="#f59e0b" strokeWidth="1" />
    {/* Reed Switch */}
    <SvgComponent x={30} y={160} w={110} h={45} label="Reed Switch" sublabel="Sensor Magnetico" fill="#1a2a2a" stroke="#06b6d4" />
    <SvgWire x1={140} y1={182} x2={200} y2={150} color="#06b6d4" />
    <text x="168" y="162" fill="#888" fontSize="6">PULLUP</text>
    {/* Buzzer */}
    <SvgComponent x={30} y={225} w={110} h={40} label="Buzzer Activo" sublabel="5V - Alarma" fill="#2a1a1a" stroke="#ef4444" />
    <SvgWire x1={140} y1={245} x2={195} y2={210} color="#ef4444" />
    <SvgWire x1={140} y1={245} x2={200} y2={180} color="#ef4444" />
    {/* LEDs */}
    <g>
      <circle cx="380" cy="115" r="12" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="380" y="119" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="900">R</text>
      <text x="380" y="100" textAnchor="middle" fill="#888" fontSize="6">LED D13</text>
    </g>
    <SvgWire x1={320} y1={120} x2={368} y2={115} color="#10b981" />
    <g>
      <circle cx="380" cy="155" r="12" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1.5" />
      <text x="380" y="159" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="900">V</text>
      <text x="380" y="140" textAnchor="middle" fill="#888" fontSize="6">LED A0</text>
    </g>
    {/* ESP8266 */}
    <SvgComponent x={370} y={190} w={110} h={45} label="ESP8266" sublabel="Notif. WiFi" fill="#1a1a2e" stroke="#8b5cf6" />
    <SvgWire x1={320} y1={180} x2={370} y2={212} color="#8b5cf6" />
    {/* Keypad */}
    <SvgComponent x={370} y={250} w={110} h={40} label="Teclado 4x4" sublabel="D4-D11" fill="#1a2332" stroke="#f59e0b" />
    {/* State machine label */}
    <rect x="150" y="265" width="180" height="25" rx="5" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
    <text x="240" y="281" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="700">Maquina de Estados: DESARMADO → ARMADO → ALARMA</text>
  </svg>
);

const GreenhouseCircuitSVG = () => (
  <svg viewBox="0 0 540 310" className="circuit-svg">
    {/* Arduino MEGA */}
    <rect x="200" y="40" width="140" height="200" rx="8" fill="#1a2332" stroke="#22c55e" strokeWidth="2" />
    <text x="270" y="65" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="900">ARDUINO MEGA</text>
    <SvgPin x={200} y={100} label="D2" color="#10b981" />
    <SvgPin x={200} y={130} label="A0" color="#f59e0b" />
    <SvgPin x={200} y={160} label="D9" color="#06b6d4" />
    <SvgPin x={200} y={190} label="D4" color="#ef4444" />
    <SvgPin x={340} y={100} label="D5" color="#3b82f6" />
    <SvgPin x={340} y={130} label="D6" color="#a855f7" />
    <SvgPin x={340} y={160} label="5V" color="#ef4444" />
    <SvgPin x={340} y={190} label="GND" color="#666" />
    {/* DHT22 */}
    <SvgComponent x={30} y={75} w={105} h={50} label="DHT22" sublabel="Temp + Humedad" fill="#0f2a1a" stroke="#10b981" />
    <SvgWire x1={135} y1={100} x2={200} y2={100} color="#10b981" />
    {/* Soil sensor */}
    <SvgComponent x={30} y={140} w={105} h={45} label="Sensor Suelo" sublabel="Capacitivo A0" fill="#1a2a1a" stroke="#f59e0b" />
    <SvgWire x1={135} y1={162} x2={200} y2={130} color="#f59e0b" />
    {/* Servo */}
    <SvgComponent x={30} y={200} w={105} h={40} label="Servo Ventana" sublabel="SG90 - D9" fill="#1a2332" stroke="#06b6d4" />
    <SvgWire x1={135} y1={220} x2={200} y2={160} color="#06b6d4" />
    {/* Relay module */}
    <rect x="390" y="55" width="120" height="120" rx="8" fill="#1a1a1a" stroke="#ef4444" strokeWidth="1.5" />
    <text x="450" y="75" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">RELE 4 CH</text>
    {/* Relay channels */}
    <rect x="400" y="82" width="100" height="22" rx="4" fill="#2a1a1a" stroke="#ef4444" strokeWidth="1" />
    <text x="450" y="96" textAnchor="middle" fill="#ef4444" fontSize="7">CH1: Ventilador</text>
    <rect x="400" y="108" width="100" height="22" rx="4" fill="#1a1a2a" stroke="#3b82f6" strokeWidth="1" />
    <text x="450" y="122" textAnchor="middle" fill="#3b82f6" fontSize="7">CH2: Bomba Agua</text>
    <rect x="400" y="134" width="100" height="22" rx="4" fill="#2a1a2a" stroke="#a855f7" strokeWidth="1" />
    <text x="450" y="148" textAnchor="middle" fill="#a855f7" fontSize="7">CH3: LED Grow</text>
    <SvgWire x1={340} y1={100} x2={400} y2={108} color="#ef4444" />
    <SvgWire x1={340} y1={100} x2={400} y2={119} color="#3b82f6" />
    <SvgWire x1={340} y1={130} x2={400} y2={145} color="#a855f7" />
    {/* Actuators */}
    <SvgComponent x={400} y={195} w={110} h={35} label="Ventilador 12V" fill="#1a2332" stroke="#ef4444" />
    <SvgComponent x={400} y={240} w={110} h={35} label="Bomba Agua 5V" fill="#1a2332" stroke="#3b82f6" />
    <SvgComponent x={400} y={280} w={110} h={25} label="Tira LED Grow" fill="#2a1a2a" stroke="#a855f7" />
    <SvgWire x1={450} y1={175} x2={450} y2={195} color="#ef4444" />
    <SvgWire x1={455} y1={175} x2={455} y2={240} color="#3b82f6" />
    <SvgWire x1={460} y1={175} x2={460} y2={280} color="#a855f7" />
    {/* Power */}
    <SvgComponent x={200} y={260} w={130} h={30} label="Fuente 12V / 5V" fill="#1a2332" stroke="#f59e0b" />
  </svg>
);

const SolarCircuitSVG = () => (
  <svg viewBox="0 0 540 300" className="circuit-svg">
    {/* Arduino */}
    <rect x="210" y="60" width="120" height="170" rx="8" fill="#1a2332" stroke="#f59e0b" strokeWidth="2" />
    <text x="270" y="85" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="900">ARDUINO UNO</text>
    <SvgPin x={210} y={120} label="A0" color="#06b6d4" />
    <SvgPin x={210} y={150} label="A1" color="#f59e0b" />
    <SvgPin x={210} y={180} label="A4" color="#10b981" />
    <SvgPin x={210} y={200} label="A5" color="#10b981" />
    <SvgPin x={330} y={120} label="5V" color="#ef4444" />
    <SvgPin x={330} y={150} label="GND" color="#666" />
    <SvgPin x={330} y={180} label="D10" color="#8b5cf6" />
    {/* Solar panel */}
    <rect x="20" y="55" width="120" height="80" rx="6" fill="#0a1a2e" stroke="#f59e0b" strokeWidth="2" />
    <text x="80" y="80" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="900">PANEL SOLAR</text>
    <text x="80" y="95" textAnchor="middle" fill="#888" fontSize="7">6V - 2W</text>
    {/* Sun rays */}
    {[0, 30, 60, 90, 120, 150].map(a => (
      <line key={a} x1={80 + Math.cos(a * Math.PI / 180) * 48} y1={30 + Math.sin(a * Math.PI / 180) * 20}
        x2={80 + Math.cos(a * Math.PI / 180) * 55} y2={30 + Math.sin(a * Math.PI / 180) * 23}
        stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
    ))}
    <circle cx="80" cy="30" r="10" fill="rgba(251,191,36,0.3)" stroke="#f59e0b" strokeWidth="1" />
    <text x="80" y="34" textAnchor="middle" fill="#f59e0b" fontSize="10">☀</text>
    {/* ACS712 current sensor */}
    <SvgComponent x={20} y={155} w={120} h={50} label="ACS712 (5A)" sublabel="Sensor Corriente" fill="#1a2a2a" stroke="#06b6d4" />
    <SvgWire x1={80} y1={135} x2={80} y2={155} color="#f59e0b" />
    <SvgWire x1={140} y1={180} x2={210} y2={120} color="#06b6d4" />
    {/* Voltage divider */}
    <g>
      <rect x="20" y="225" width="120" height="50" rx="6" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="80" y="245" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">Divisor Tension</text>
      <text x="80" y="258" textAnchor="middle" fill="#888" fontSize="6">R1=10K / R2=5K</text>
      {/* Resistors */}
      <rect x="40" y="263" width="20" height="6" rx="2" fill="#333" stroke="#f59e0b" strokeWidth="0.8" />
      <text x="50" y="268" textAnchor="middle" fill="#f59e0b" fontSize="4">10K</text>
      <rect x="80" y="263" width="20" height="6" rx="2" fill="#333" stroke="#f59e0b" strokeWidth="0.8" />
      <text x="90" y="268" textAnchor="middle" fill="#f59e0b" fontSize="4">5K</text>
    </g>
    <SvgWire x1={140} y1={250} x2={210} y2={150} color="#f59e0b" />
    {/* OLED */}
    <SvgComponent x={390} y={65} w={110} h={55} label="OLED 0.96'" sublabel="I2C - 128x64" fill="#0a0a0a" stroke="#10b981" />
    <SvgWire x1={330} y1={120} x2={390} y2={85} color="#ef4444" />
    <text x="363" y="82" fill="#10b981" fontSize="6">I2C</text>
    {/* MicroSD */}
    <SvgComponent x={390} y={140} w={110} h={45} label="MicroSD" sublabel="Datalogger SPI" fill="#1a2332" stroke="#8b5cf6" />
    <SvgWire x1={330} y1={180} x2={390} y2={162} color="#8b5cf6" />
    {/* Battery + TP4056 */}
    <SvgComponent x={390} y={210} w={110} h={50} label="Bateria 3.7V" sublabel="LiPo + TP4056" fill="#2a2a1a" stroke="#f59e0b" />
    <SvgWire x1={140} y1={195} x2={140} y2={245} color="#ef4444" />
    <SvgWire x1={140} y1={245} x2={390} y2={235} color="#ef4444" />
    <text x="265" y="248" textAnchor="middle" fill="#888" fontSize="6">Carga solar → Bateria</text>
    {/* Formula */}
    <rect x="180" y="275" width="200" height="20" rx="5" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
    <text x="280" y="289" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">P = V x I | E = P x t (Wh)</text>
  </svg>
);

// ─── Block Diagrams ───────────────────────────────────────────────────────

const BlockDiagram = ({ blocks, connections, width = 520, height = 120 }) => (
  <svg viewBox={`0 0 ${width} ${height}`} className="block-diagram-svg">
    {connections.map((c, i) => (
      <g key={i}>
        <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={c.color || '#555'} strokeWidth="2" markerEnd="url(#arrowhead)" />
      </g>
    ))}
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#888" />
      </marker>
    </defs>
    {blocks.map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill={b.fill || '#1a2332'} stroke={b.stroke || '#3b82f6'} strokeWidth="1.5" />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 4} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">{b.label}</text>
        {b.sub && <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 9} textAnchor="middle" fill="#888" fontSize="7">{b.sub}</text>}
      </g>
    ))}
  </svg>
);

// ─── Theory Content Renderer ──────────────────────────────────────────────

const TheorySection = ({ items }) => (
  <div className="theory-items">
    {items.map((item, i) => (
      <div key={i} className="theory-item">
        <div className="theory-item-icon">{item.icon}</div>
        <div className="theory-item-content">
          <h5 className="theory-item-title">{item.title}</h5>
          <p className="theory-item-text">{item.text}</p>
          {item.formula && <div className="theory-formula">{item.formula}</div>}
        </div>
      </div>
    ))}
  </div>
);

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
    image: 'proj_weather_main.png',
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
    CircuitSVG: WeatherCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 10, y: 30, w: 85, h: 50, label: 'DHT22', sub: 'Temp+Hum', fill: '#0f2a1a', stroke: '#10b981' },
        { x: 110, y: 30, w: 85, h: 50, label: 'BMP280', sub: 'Presion', fill: '#1a1a2e', stroke: '#a855f7' },
        { x: 215, y: 25, w: 100, h: 60, label: 'ARDUINO', sub: 'Procesa', fill: '#1a2332', stroke: '#3b82f6' },
        { x: 335, y: 10, w: 80, h: 40, label: 'LCD', sub: 'Muestra', fill: '#1a2332', stroke: '#06b6d4' },
        { x: 335, y: 60, w: 80, h: 40, label: 'ESP8266', sub: 'WiFi', fill: '#1a1a2e', stroke: '#8b5cf6' },
        { x: 435, y: 60, w: 75, h: 40, label: 'Servidor', sub: 'Dashboard', fill: '#1a2332', stroke: '#10b981' },
      ],
      connections: [
        { x1: 95, y1: 55, x2: 215, y2: 55, color: '#10b981' },
        { x1: 195, y1: 55, x2: 215, y2: 55, color: '#a855f7' },
        { x1: 315, y1: 40, x2: 335, y2: 30, color: '#06b6d4' },
        { x1: 315, y1: 65, x2: 335, y2: 80, color: '#8b5cf6' },
        { x1: 415, y1: 80, x2: 435, y2: 80, color: '#10b981' },
      ],
    },
    theory: [
      { icon: '🌡️', title: 'Sensor DHT22 — Termo-higrometro Digital', text: 'El DHT22 es un sensor serie de alta precision que utiliza un protocolo de comunicacion propietaria mediante un solo cable (Single-Wire). Integra un sensor de humedad capacitivo y un termistor NTC calibrado. A diferencia del DHT11, su resolucion es de 0.1 y su rango es mucho mas amplio, permitiendo medir hasta -40°C. La linea de DATOS requiere una resistencia "Pull-Up" para evitar ruidos electromagneticos.', formula: 'Humedad Absoluta (g/m³) = (6.112 x e^((17.67 x T)/(T+243.5)) x HR x 2.1674) / (273.15 + T)' },
      { icon: '🔵', title: 'BMP280 — Presion y Altitud', text: 'Este sensor MEMS (Micro-Electro-Mechanical Systems) de Bosch es capaz de medir cambios en la presion atmosferica equivalentes a 1 metro de altitud. Utiliza el bus I2C para transmitir datos. La presion barometrica es una variable critica para predecir el clima: caidas rapidas de presion suelen indicar la llegada de frentes de tormenta. Es fundamental configurar los registros de sobre-muestreo (oversampling) para reducir el ruido en las lecturas.', formula: 'Altitud = 44330.0 * (1.0 - pow(P / 1013.25, 0.1903))' },
      { icon: '📡', title: 'Bus I2C y Arbol de Dispositivos', text: 'El Standard I2C permite ahorrar pines del microcontrolador al conectar hasta 127 dispositivos en solo dos hilos (SDA y SCL). Cada periferico tiene una direccion hexadecimal unica (ej: 0x27 para el LCD, 0x76 para el sensor). Es un bus multi-maestro síncrono donde el Arduino genera el reloj (pulso de sincronia). Las bibliotecas como Wire.h abstraen la complejidad de los protocolos de inicio, parada y reconocimiento (ACK/NACK).' },
      { icon: '📶', title: 'Arquitectura IoT y Cloud Computing', text: 'En la arquitectura IoT, el Arduino/ESP8266 actua como "Edge Device". Los datos no solo se muestran localmente, sino que se encapsulan en paquetes TCP/IP y se envian via comandos AT (o bibliotecas WiFi) a plataformas en la nube (ThingSpeak, Adafruit IO, Azure). Esto permite el analisis de grandes volumenes de datos (Big Data) y el monitoreo historico desde aplicaciones moviles desde cualquier parte del mundo.' },
    ],
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
    CircuitSVG: IrrigationCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 10, y: 30, w: 95, h: 50, label: 'Sensor Suelo', sub: 'Capacitivo', fill: '#1a2a1a', stroke: '#10b981' },
        { x: 125, y: 30, w: 100, h: 50, label: 'ARDUINO', sub: 'Compara umbral', fill: '#1a2332', stroke: '#10b981' },
        { x: 245, y: 30, w: 80, h: 50, label: 'Rele 5V', sub: 'Conmuta', fill: '#2a1a1a', stroke: '#ef4444' },
        { x: 345, y: 30, w: 85, h: 50, label: 'Bomba', sub: 'Riega', fill: '#1a1a2e', stroke: '#06b6d4' },
        { x: 345, y: 90, w: 85, h: 30, label: 'LED Estado', fill: '#2a2a1a', stroke: '#f59e0b' },
      ],
      connections: [
        { x1: 105, y1: 55, x2: 125, y2: 55, color: '#10b981' },
        { x1: 225, y1: 55, x2: 245, y2: 55, color: '#ef4444' },
        { x1: 325, y1: 55, x2: 345, y2: 55, color: '#06b6d4' },
        { x1: 225, y1: 70, x2: 345, y2: 100, color: '#f59e0b' },
      ],
    },
    theory: [
      { icon: '🌱', title: 'Sensores de Humedad Capacitivos vs Resistivos', text: 'Los sensores resistivos sufren de electrolisis y oxidacion rapida en contacto con la tierra humeda. Los sensores capacitivos (v2.0) estan aislados por una capa de resina epoxi y no tocan el agua directamente. Utilizan un oscilador integrado 555 o similar para medir cambios en la capacitancia del suelo, que varia segun el contenido de agua. El resultado es una tension analogica mas estable y duradera para aplicaciones de largo plazo.' },
      { icon: '⚡', title: 'Conmutacion de Cargas con Rele Optoacoplado', text: 'Para aislar el ruido electrico de la bomba (motor DC) del microcontrolador, se utilizan modulos de rele con optoacoplamiento. Un LED interno pulsa frente a un fototransistor, permitiendo la transferencia de senales sin contacto fisico. Esto evita que la "fuerza contra-electromotriz" generada por el motor al apagarse reinicie o queme el Arduino UNO.', formula: 'Induccion Motor: V = -L * (di/dt)' },
      { icon: '📊', title: 'Procesamiento de Senales Analogicas (ADC)', text: 'El ADC del Arduino convierte tensiones de 0 a 5V en una escala de 0 a 1023 niveles. En el programa, usamos la escala inversa porque el sensor suele entregar valores bajos cuando hay mucha agua. La calibracion es vital: se miden los valores en "aire" (0%) y sumergido en "vaso de agua" (100%) para establecer los limites reales de la funcion map().', formula: 'humedad% = map(raw, VALOR_AIRE, VALOR_AGUA, 0, 100)' },
      { icon: '💧', title: 'Control por Umbral y Retroalimentacion', text: 'Este es un sistema de control de "lazo cerrado" (Closed Loop) basico. El sensor retroalimenta al controlador para que este actue sobre la bomba. Para evitar arranques y paradas innecesarias si la lectura oscila (ruido), se recomienda un retardo de software o una banda de histeresis (encender al 30%, apagar al 60%). Esto garantiza una hidratacion optima de las raices sin saturar el sustrato.' },
    ],
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
    CircuitSVG: ParkingCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 5, y: 25, w: 85, h: 50, label: 'HC-SR04', sub: 'x6 sensores', fill: '#1a2332', stroke: '#06b6d4' },
        { x: 110, y: 25, w: 100, h: 50, label: 'ARDUINO', sub: 'MEGA', fill: '#1a2332', stroke: '#8b5cf6' },
        { x: 230, y: 10, w: 75, h: 35, label: 'LEDs', sub: '12 (R+V)', fill: '#0a1a0a', stroke: '#10b981' },
        { x: 230, y: 55, w: 75, h: 35, label: 'Servo', sub: 'Barrera', fill: '#2a2a1a', stroke: '#f59e0b' },
        { x: 325, y: 10, w: 75, h: 35, label: 'Display', sub: 'Libres', fill: '#1a1a2e', stroke: '#a855f7' },
        { x: 325, y: 55, w: 75, h: 35, label: 'Buzzer', sub: 'Lleno', fill: '#2a1a1a', stroke: '#ef4444' },
      ],
      connections: [
        { x1: 90, y1: 50, x2: 110, y2: 50, color: '#06b6d4' },
        { x1: 210, y1: 35, x2: 230, y2: 27, color: '#10b981' },
        { x1: 210, y1: 60, x2: 230, y2: 72, color: '#f59e0b' },
        { x1: 305, y1: 27, x2: 325, y2: 27, color: '#a855f7' },
        { x1: 305, y1: 72, x2: 325, y2: 72, color: '#ef4444' },
      ],
    },
    theory: [
      { icon: '📏', title: 'Propagacion de Ondas Ultrasonicas (HC-SR04)', text: 'El sensor HC-SR04 basa su funcionamiento en el rebote de ondas sonoras de alta frecuencia (40kHz), inaudibles para el humano. Al emitir el pulso "Trigger", el sensor espera el "Echo". Sabiendo que el sonido viaja a 340m/s aproximadamente (dependiendo de la temperatura ambiente), podemos calcular la distancia basandonos en el tiempo de ida y vuelta. En un estacionamiento, es vital filtrar "falsos positivos" causados por rebotes en superficies angulares.', formula: 'Distancia (cm) = (Microsegundos / 58) | Compensacion Temp: v = 331.3 + 0.606 * T' },
      { icon: '⚙️', title: 'Control por Ancho de Pulso (PWM) en Servos', text: 'Un servomotor no es un motor comun; posee un circuito de control interno y un potenciometro de retroalimentacion. Se controla mediante una senal PWM donde la "duracion del pulso" (y no el ciclo de trabajo promedio) indica la posicion deseada. La libreria Servo de Arduino genera estos pulsos de forma precisa en segundo plano, permitiendo que la barrera se mueva suavemente entre 0° y 90° evitando impactos mecanicos.' },
      { icon: '💡', title: 'Multiplexacion y Ley de Ohm en Indicadores', text: 'Controlar 12 LEDs requiere una gestion eficiente de la corriente total. Segun la Ley de Ohm, la resistencia limitadora asegura que cada LED consuma exactamente lo necesario (~20mA). Si encendemos muchos LEDs simultaneamente, la suma de las corrientes no debe superar el limite del microcontrolador (~200mA total en el puerto). Por ello, se agrupan y se calculan las resistencias con precision para maximizar la vida util del hardware.', formula: 'Resistencia (Ω) = (V_fuente - V_led) / I_target' },
      { icon: '🔊', title: 'Interfaces de Usuario Acusticas (Buzzer)', text: 'El buzzer actua como una interfaz no visual ("Feedback auditivo"). Mediante la funcion tone(), generamos frecuencias que el cerebro asocia con estados: un tono corto y agudo para "Acceso Permitido", y un tono largo o intermitente para "Estacionamiento Lleno". Los buzzers pasivos permiten crear melodias complejas variando el ancho de pulso, mientras que los activos solo requieren tension para sonar a una frecuencia fija.' },
    ],
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
    CircuitSVG: SecurityCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 5, y: 15, w: 80, h: 40, label: 'PIR', sub: 'Movimiento', fill: '#2a2a1a', stroke: '#f59e0b' },
        { x: 5, y: 65, w: 80, h: 40, label: 'Reed SW', sub: 'Puerta', fill: '#1a2a2a', stroke: '#06b6d4' },
        { x: 110, y: 30, w: 100, h: 55, label: 'ARDUINO', sub: 'Maq. Estados', fill: '#1a2332', stroke: '#ef4444' },
        { x: 235, y: 10, w: 70, h: 35, label: 'Buzzer', sub: 'Alarma', fill: '#2a1a1a', stroke: '#ef4444' },
        { x: 235, y: 55, w: 70, h: 35, label: 'LEDs', sub: 'R + V', fill: '#1a2332', stroke: '#10b981' },
        { x: 330, y: 10, w: 80, h: 35, label: 'ESP8266', sub: 'Notifica', fill: '#1a1a2e', stroke: '#8b5cf6' },
        { x: 330, y: 55, w: 80, h: 35, label: 'Teclado', sub: '4x4', fill: '#1a2332', stroke: '#f59e0b' },
      ],
      connections: [
        { x1: 85, y1: 35, x2: 110, y2: 45, color: '#f59e0b' },
        { x1: 85, y1: 85, x2: 110, y2: 70, color: '#06b6d4' },
        { x1: 210, y1: 40, x2: 235, y2: 27, color: '#ef4444' },
        { x1: 210, y1: 65, x2: 235, y2: 72, color: '#10b981' },
        { x1: 305, y1: 27, x2: 330, y2: 27, color: '#8b5cf6' },
        { x1: 330, y1: 72, x2: 210, y2: 72, color: '#f59e0b' },
      ],
    },
    theory: [
      { icon: '👁️', title: 'Sensores Infrarrojos Pasivos (PIR)', text: 'El sensor PIR no emite energia, sino que "observa" los niveles de calor (radiacion infrarroja) de los objetos en su campo de vision. La lente de Fresnel divide el area en sectores. Cuando un cuerpo caliente se mueve de un sector a otro, el sensor detecta el diferencial y activa la salida. Es la base de los sistemas de intrusion modernos por su bajisimo consumo y efectividad en ambientes oscuros.' },
      { icon: '🧲', title: 'Sensores de Contacto Magnetico (Reed)', text: 'Utilizan dos laminas metalicas dentro de una ampolla de vidrio al vacio. El magnetismo de un iman cercano atrae las laminas, cerrando el circuito. En seguridad, se conectan como "Normalmente Cerrados" (en serie) para que, si un intruso corta el cable, el sistema detecte la apertura del circuito inmediatamente (Tamper Protection). Es una tecnologia simple pero extremadamente confiable para puertas y ventanas.' },
      { icon: '🔄', title: 'Arquitectura de Maquina de Estados (FSM)', text: 'Una FSM organiza el software en estados logicos finitos. Esto evita comportamientos impredecibles: por ejemplo, que la alarma suene si el sistema no esta armado. Cada estado tiene condiciones de entrada y salida claras. En este proyecto, el estado "ALARMA" se mantiene bloqueado hasta que se ingrese un codigo valido, incluso si los sensores dejan de detectar movimiento.', formula: 'Estado_Siguiente = f(Estado_Actual, Input_Sensores)' },
      { icon: '🔐', title: 'Matrices de Teclado y Escaneo de Columnas', text: 'Para no usar 16 pines, el teclado matricial usa una tecnica de "escaneo por barrido". El Arduino pone una fila en LOW y lee todas las columnas; si detecta un LOW en una columna, identifica la interseccion. Este proceso ocurre miles de veces por segundo. El software debe gestionar el "Debounce" para evitar que una sola pulsacion fisica se interprete como multiples entradas debido al rebote mecanico de los contactos.' },
    ],
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
    CircuitSVG: GreenhouseCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 5, y: 10, w: 80, h: 35, label: 'DHT22', sub: 'Temp+Hum', fill: '#0f2a1a', stroke: '#10b981' },
        { x: 5, y: 55, w: 80, h: 35, label: 'Sensor Suelo', sub: 'Humedad', fill: '#1a2a1a', stroke: '#f59e0b' },
        { x: 110, y: 25, w: 100, h: 60, label: 'ARDUINO', sub: 'MEGA', fill: '#1a2332', stroke: '#22c55e' },
        { x: 235, y: 5, w: 85, h: 30, label: 'Servo', sub: 'Ventana', fill: '#1a2332', stroke: '#06b6d4' },
        { x: 235, y: 40, w: 85, h: 30, label: 'Ventilador', sub: '12V', fill: '#2a1a1a', stroke: '#ef4444' },
        { x: 235, y: 75, w: 85, h: 30, label: 'Bomba', sub: 'Riego', fill: '#1a1a2e', stroke: '#3b82f6' },
        { x: 345, y: 40, w: 80, h: 30, label: 'LED Grow', sub: 'Luz', fill: '#2a1a2a', stroke: '#a855f7' },
        { x: 345, y: 75, w: 80, h: 30, label: 'Rele 4CH', sub: 'Conmuta', fill: '#1a1a1a', stroke: '#ef4444' },
      ],
      connections: [
        { x1: 85, y1: 27, x2: 110, y2: 40, color: '#10b981' },
        { x1: 85, y1: 72, x2: 110, y2: 65, color: '#f59e0b' },
        { x1: 210, y1: 35, x2: 235, y2: 20, color: '#06b6d4' },
        { x1: 210, y1: 50, x2: 235, y2: 55, color: '#ef4444' },
        { x1: 210, y1: 65, x2: 235, y2: 90, color: '#3b82f6' },
        { x1: 320, y1: 55, x2: 345, y2: 55, color: '#a855f7' },
      ],
    },
    theory: [
      { icon: '🌡️', title: 'El Ecosistema Controlado (Bioclimatica)', text: 'La automatizacion de invernaderos busca optimizar el VPD (Diferencial de Presion de Vapor), una relacion entre temperatura y humedad que determina que tan bien transpira la planta y absorbe nutrientes. Al abrir la ventana con el servo, no solo enfriamos, sino que renovamos el CO2 necesario para la fotosintesis. Un sistema inteligente ajusta estas variantes de forma integral para maximizar el crecimiento en menos tiempo.' },
      { icon: '💨', title: 'Dinámica de Fluidos y Ventilacion Forzada', text: 'En dias calurosos, la conveccion natural no es suficiente. El ventilador de 12V (controlado por rele) genera un flujo laminar que reduce la temperatura de las hojas. Es vital posicionar los ventiladores para evitar "puntos calientes". El software decide si abrir la ventana (pasivo) o encender el ventilador (activo) basandose en la eficiencia energetica y la diferencia termica interior/exterior.' },
      { icon: '🔴', title: 'Espectro de Luz Fotosinteticamente Activa (PAR)', text: 'Las plantas no ven la luz como nosotros. Ellas absorben principalmente los fotones en los rangos de 400nm a 700nm. Los LEDs Grow especiales emiten picos de azul (crecimiento vegetativo) y rojo (floracion). La automatizacion permite simular el fotoperiodo natural, garantizando que las plantas reciban su "racion" de luz diaria incluso en dias nublados o inviernos cortos.', formula: 'DLI (Daily Light Integral) = PAR x Segundos de luz / 1,000,000' },
      { icon: '🔌', title: 'Gestion de Actuadores en Sistemas Complejos', text: 'Cuando manejamos bombas de agua, luces y ventiladores simultaneamente, el cableado y la seguridad electrica son criticos. El uso de modulos de reles permite separar la etapa de control (5V DC) de la etapa de potencia (12V DC o 220V AC). Es mandatorio el uso de diodos de proteccion y fusibles para evitar que una falla en un actuador propague un cortocircuito hacia el cerebro del sistema (Arduino MEGA).' },
    ],
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
    CircuitSVG: SolarCircuitSVG,
    blockDiagram: {
      blocks: [
        { x: 5, y: 25, w: 85, h: 50, label: 'Panel Solar', sub: '6V 2W', fill: '#0a1a2e', stroke: '#f59e0b' },
        { x: 110, y: 10, w: 80, h: 35, label: 'ACS712', sub: 'Corriente', fill: '#1a2a2a', stroke: '#06b6d4' },
        { x: 110, y: 55, w: 80, h: 35, label: 'Div. Tension', sub: 'Voltaje', fill: '#1a1a1a', stroke: '#f59e0b' },
        { x: 215, y: 25, w: 100, h: 50, label: 'ARDUINO', sub: 'Calcula P=VxI', fill: '#1a2332', stroke: '#f59e0b' },
        { x: 340, y: 10, w: 80, h: 35, label: 'OLED', sub: 'Display', fill: '#0a0a0a', stroke: '#10b981' },
        { x: 340, y: 55, w: 80, h: 35, label: 'MicroSD', sub: 'Datalog', fill: '#1a2332', stroke: '#8b5cf6' },
        { x: 440, y: 30, w: 70, h: 40, label: 'Bateria', sub: 'TP4056', fill: '#2a2a1a', stroke: '#f59e0b' },
      ],
      connections: [
        { x1: 90, y1: 40, x2: 110, y2: 27, color: '#06b6d4' },
        { x1: 90, y1: 55, x2: 110, y2: 72, color: '#f59e0b' },
        { x1: 190, y1: 27, x2: 215, y2: 40, color: '#06b6d4' },
        { x1: 190, y1: 72, x2: 215, y2: 55, color: '#f59e0b' },
        { x1: 315, y1: 40, x2: 340, y2: 27, color: '#10b981' },
        { x1: 315, y1: 60, x2: 340, y2: 72, color: '#8b5cf6' },
        { x1: 420, y1: 50, x2: 440, y2: 50, color: '#f59e0b' },
      ],
    },
    theory: [
      { icon: '☀️', title: 'Fisica de Células Fotovoltaicas (PN Junction)', text: 'Un panel solar funciona gracias a la union de dos capas de silicio dopado (tipo P y tipo N). Cuando los fotones golpean la union PN, liberan electrones creando un flujo de corriente DC. La eficiencia de conversion depende de la irradiancia (W/m²) y del espectro de luz. Es fundamental entender la curva I-V (Corriente vs Tension) para encontrar el Punto de Maxima Potencia (MPP), donde el panel rinde su maximo teorico.', formula: 'P_max = V_oc x I_sc x FF (Factor de Forma ~0.7)' },
      { icon: '⚡', title: 'Efecto Hall e Induccion de Corriente (ACS712)', text: 'El ACS712 utiliza un sensor de efecto Hall integrado. Al pasar la corriente por una pista interna, genera un campo magnetico que el sensor traduce en una tension analogica proporcional. Como la salida esta aislada galvanicamente, es seguro para el Arduino. Sin embargo, al ser extremadamente sensible, es afectado por campos magnetico externos (motores cercanos), por lo que requiere un blindaje o filtrado por software mediante promedios moviles.', formula: 'I (A) = (V_sensor - V_offset) / Sensibilidad (V/A)' },
      { icon: '🔋', title: 'Divisores Resistivos y Proteccion de Entradas', text: 'El CAD (Conversor Analógico Digital) del Arduino es el componente mas fragil. El divisor resistivo no solo reduce la tension para que sea medible, sino que actua como una primera linea de defensa. Al elegir resistencias de alto valor (10K/5K), limitamos la corriente que entra al pin del microcontrolador. En sistemas reales, se agregan zener o diodos de proteccion para evitar transitorios que superen los 5V durante picos de generacion solar.', formula: 'V_out = V_in x [R2 / (R1 + R2)]' },
      { icon: '📈', title: 'Datalogging e Inteligencia Energetica', text: 'El monitoreo no termina en ver los Watts actuales. El verdadero valor esta en el registro historico: guardar los datos en una MicroSD en formato CSV permite calcular el ROI (Retorno de Inversion) del sistema solar y detectar degradacion en los paneles. Integrando un algoritmo de integracion temporal, transformamos la potencia instantanea en Energia (Watt-hora), permitiendo dimensionar correctamente el banco de baterias necesario para una autonomia real.', formula: 'Energia (kWh) = (Σ P_inst x Δt) / 1000' },
    ],
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
                {/* Project Image */}
                {project.image && (
                  <div className="pi-section" style={{ textAlign: 'center' }}>
                    <img
                      src={`${import.meta.env.BASE_URL || '/'}${project.image}`.replace('//', '/')}
                      alt={`Ilustracion conceptual del proyecto: ${project.title}`}
                      style={{ width: '100%', maxWidth: '600px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}
                    />
                  </div>
                )}

                {/* Objectives */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Objetivos del Proyecto</h3>
                  <ul className="pi-objectives">
                    {project.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {/* Theory */}
                {project.theory && (
                  <div className="pi-section">
                    <h3 className="pi-section-title" style={{ color: project.color }}>Teoria y Fundamentos</h3>
                    <TheorySection items={project.theory} />
                  </div>
                )}

                {/* Block Diagram */}
                {project.blockDiagram && (
                  <div className="pi-section">
                    <h3 className="pi-section-title" style={{ color: project.color }}>Diagrama de Bloques</h3>
                    <div className="pi-diagram-container">
                      <BlockDiagram {...project.blockDiagram} />
                    </div>
                  </div>
                )}

                {/* Simulator */}
                <div className="pi-section">
                  <h3 className="pi-section-title" style={{ color: project.color }}>Simulador Interactivo</h3>
                  <project.Simulator />
                </div>

                {/* Circuit SVG */}
                {project.CircuitSVG && (
                  <div className="pi-section">
                    <h3 className="pi-section-title" style={{ color: project.color }}>Esquema de Circuito</h3>
                    <div className="pi-diagram-container">
                      <project.CircuitSVG />
                    </div>
                    <div className="pi-circuit-desc" style={{ marginTop: '1rem' }}>
                      {project.circuitDescription}
                    </div>
                  </div>
                )}

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

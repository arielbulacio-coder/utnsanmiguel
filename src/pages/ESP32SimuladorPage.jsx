import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ElectricityBasicsStyles.css';

// ESP32 GPIO pins (subset of common DevKit V1)
const ESP32_PINS = [
    { num: 2, name: 'GPIO2', features: ['LED_BUILTIN', 'PWM', 'ADC2_2'], side: 'right' },
    { num: 4, name: 'GPIO4', features: ['PWM', 'ADC2_0', 'TOUCH0'], side: 'right' },
    { num: 5, name: 'GPIO5', features: ['PWM', 'VSPI_CS'], side: 'right' },
    { num: 12, name: 'GPIO12', features: ['PWM', 'ADC2_5', 'TOUCH5'], side: 'right' },
    { num: 13, name: 'GPIO13', features: ['PWM', 'ADC2_4', 'TOUCH4'], side: 'right' },
    { num: 14, name: 'GPIO14', features: ['PWM', 'ADC2_6', 'TOUCH6'], side: 'right' },
    { num: 15, name: 'GPIO15', features: ['PWM', 'ADC2_3', 'TOUCH3'], side: 'left' },
    { num: 16, name: 'GPIO16', features: ['UART2_RX'], side: 'left' },
    { num: 17, name: 'GPIO17', features: ['UART2_TX'], side: 'left' },
    { num: 18, name: 'GPIO18', features: ['VSPI_SCK'], side: 'left' },
    { num: 19, name: 'GPIO19', features: ['VSPI_MISO'], side: 'left' },
    { num: 21, name: 'GPIO21', features: ['I2C_SDA'], side: 'left' },
    { num: 22, name: 'GPIO22', features: ['I2C_SCL'], side: 'left' },
    { num: 23, name: 'GPIO23', features: ['VSPI_MOSI'], side: 'left' },
    { num: 25, name: 'GPIO25', features: ['DAC1', 'ADC2_8'], side: 'right' },
    { num: 26, name: 'GPIO26', features: ['DAC2', 'ADC2_9'], side: 'right' },
    { num: 27, name: 'GPIO27', features: ['PWM', 'ADC2_7', 'TOUCH7'], side: 'right' },
    { num: 32, name: 'GPIO32', features: ['ADC1_4', 'TOUCH9'], side: 'right' },
    { num: 33, name: 'GPIO33', features: ['ADC1_5', 'TOUCH8'], side: 'right' },
    { num: 34, name: 'GPIO34', features: ['ADC1_6', 'INPUT_ONLY'], side: 'right' },
    { num: 35, name: 'GPIO35', features: ['ADC1_7', 'INPUT_ONLY'], side: 'right' },
];

const EXAMPLES = {
    blink: {
        name: '💡 Blink LED',
        code: `void setup() {\n  pinMode(2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(2, HIGH);\n  delay(500);\n  digitalWrite(2, LOW);\n  delay(500);\n}`
    },
    // PROYECTOS INTEGRADORES
    weather: {
        name: '🌦️ Estación Meteorológica',
        code: `// Estacion Meteorologica IoT
#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Serial.println("Estacion Iniciada");
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  Serial.print("Temp: "); Serial.print(t);
  Serial.print("C | Hum: "); Serial.print(h);
  Serial.println("%");
  delay(2000);
}`
    },
    irrigation: {
        name: '💧 Riego Inteligente',
        code: `// Sistema de Riego con Rele
#define SENSOR_PIN 34
#define RELE_PIN 4

void setup() {
  pinMode(SENSOR_PIN, INPUT);
  pinMode(RELE_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  int humedad = analogRead(SENSOR_PIN);
  Serial.print("Humedad: "); Serial.println(humedad);
  if(humedad < 1500) { // Suelo seco
    digitalWrite(RELE_PIN, HIGH);
    Serial.println("BOMBA ON");
  } else {
    digitalWrite(RELE_PIN, LOW);
    Serial.println("BOMBA OFF");
  }
  delay(1000);
}`
    },
    parking: {
        name: '🅿️ Estacionamiento Smart',
        code: `// Estacionamiento con Ultrasonido
#define TRIG 5
#define ECHO 18
#define SERVO_PIN 13

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(115200);
}

void loop() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long duracion = pulseIn(ECHO, HIGH);
  int distancia = duracion * 0.034 / 2;
  
  Serial.print("Plaza 1: "); Serial.print(distancia); Serial.println("cm");
  if(distancia < 20) Serial.println("OCUPADO");
  else Serial.println("LIBRE");
  delay(500);
}`
    },
    security: {
        name: '🔒 Alarma Seguridad',
        code: `// Sistema de Seguridad PIR
#define PIR_PIN 27
#define BUZZER_PIN 26

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  if(digitalRead(PIR_PIN) == HIGH) {
    Serial.println("!! INTRUSO DETECTADO !!");
    for(int i=0; i<3; i++) {
        digitalWrite(BUZZER_PIN, HIGH); delay(100);
        digitalWrite(BUZZER_PIN, LOW); delay(100);
    }
  }
  delay(100);
}`
    },
    greenhouse: {
        name: '🌿 Invernadero Automat.',
        code: `// Control Invernadero (Temp/Vent)
#define VENT_PIN 14
#define DHTPIN 2

void setup() {
  pinMode(VENT_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  float t = 28.5; // Lectura simulada dht
  Serial.print("Temp: "); Serial.println(t);
  if(t > 30.0) {
    digitalWrite(VENT_PIN, HIGH);
    Serial.println("Ventilador ACTIVADO");
  } else {
    digitalWrite(VENT_PIN, LOW);
  }
  delay(1000);
}`
    },
    solar: {
        name: '☀️ Monitoreo Solar',
        code: `// Monitor Panel Solar (V/I)
#define V_PIN 32
#define I_PIN 33

void setup() {
  Serial.begin(115200);
}

void loop() {
  float v = analogRead(V_PIN) * (3.3/4095.0) * 2;
  float i = analogRead(I_PIN) * (3.3/4095.0);
  float p = v * i;
  
  Serial.print("Panel: ");
  Serial.print(v); Serial.print("V | ");
  Serial.print(i); Serial.print("A | ");
  Serial.print(p); Serial.println("W");
  delay(1500);
}`
    }
};

const ESP32SimuladorPage = () => {
    const [code, setCode] = useState(EXAMPLES.blink.code);
    const [activeExample, setActiveExample] = useState('blink');
    const [running, setRunning] = useState(false);
    const [serial, setSerial] = useState([]);
    const [pinStates, setPinStates] = useState({});
    const [pwmStates, setPwmStates] = useState({});
    const [pinModes, setPinModes] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [adcValues, setAdcValues] = useState({ 32: 0, 33: 0, 34: 2048, 35: 0 });
    const [buttonStates, setButtonStates] = useState({});
    const [port, setPort] = useState(null);
    const [isSerialConnected, setIsSerialConnected] = useState(false);

    const runningRef = useRef(false);
    const stopFlagRef = useRef(false);
    const loopHandleRef = useRef(null);

    const log = useCallback((line) => {
        setSerial(prev => {
            const next = [...prev, { time: Date.now(), text: line }];
            return next.slice(-200);
        });
    }, []);

    // Función para conectar a puerto serie real
    const connectSerial = async () => {
        if (!("serial" in navigator)) {
            alert("Tu navegador no soporta Web Serial API. Usa Chrome o Edge.");
            return;
        }
        try {
            const selectedPort = await navigator.serial.requestPort();
            await selectedPort.open({ baudRate: 115200 });
            setPort(selectedPort);
            setIsSerialConnected(true);
            log("[Hardware] Conectado físicamente vía USB ✅");
            
            // Lector continuo del monitor serie real
            const reader = selectedPort.readable.getReader();
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const text = new TextDecoder().decode(value);
                log(`[RX] ${text}`);
            }
        } catch (err) {
            console.error(err);
            log("[Error] Falló la conexión serie: " + err.message);
        }
    };

    const disconnectSerial = async () => {
        if (port) {
            await port.close();
            setPort(null);
            setIsSerialConnected(false);
            log("[Hardware] Desconectado ❌");
        }
    };

    // Sandbox: provee API tipo Arduino
    const buildSandbox = useCallback(() => {
        const HIGH = 1, LOW = 0, OUTPUT = 'OUTPUT', INPUT = 'INPUT', INPUT_PULLUP = 'INPUT_PULLUP';

        const pinMode = (pin, mode) => {
            setPinModes(p => ({ ...p, [pin]: mode }));
        };
        const digitalWrite = (pin, value) => {
            const v = value === HIGH || value === 1 || value === true ? 1 : 0;
            setPinStates(p => ({ ...p, [pin]: v }));
            setPwmStates(p => { const c = { ...p }; delete c[pin]; return c; });
        };
        const digitalRead = (pin) => {
            return buttonStatesRef.current[pin] ? 1 : 0;
        };
        const analogWrite = (pin, duty) => {
            const d = Math.max(0, Math.min(255, duty));
            setPwmStates(p => ({ ...p, [pin]: d }));
            setPinStates(p => ({ ...p, [pin]: d > 0 ? 1 : 0 }));
        };
        const analogRead = (pin) => {
            return adcValuesRef.current[pin] ?? 0;
        };
        const map = (x, in_min, in_max, out_min, out_max) => {
            return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
        };
        const pulseIn = (pin, state) => {
            return Math.random() * 2000 + 100; // Simulación aleatoria
        };
        const Serial = {
            begin: (baud) => log(`[Serial] ${baud} bps`),
            println: (...args) => log(args.map(a => String(a)).join(' ')),
            print: (...args) => log(args.map(a => String(a)).join(' ')),
        };
        const delay = (ms) => new Promise(resolve => {
            const id = setTimeout(() => {
                if (stopFlagRef.current) resolve('stop');
                else resolve();
            }, ms);
            timeoutsRef.current.push(id);
        });
        const millis = () => Date.now() - startTimeRef.current;
        const tone = (pin, freq, duration) => log(`[Buzzer] Freq: ${freq}Hz`);
        const noTone = (pin) => {};

        return { HIGH, LOW, OUTPUT, INPUT, INPUT_PULLUP, pinMode, digitalWrite, digitalRead, analogWrite, analogRead, map, pulseIn, Serial, delay, millis, tone, noTone };
    }, [log]);

    const buttonStatesRef = useRef(buttonStates);
    const adcValuesRef = useRef(adcValues);
    const timeoutsRef = useRef([]);
    const startTimeRef = useRef(0);
    useEffect(() => { buttonStatesRef.current = buttonStates; }, [buttonStates]);
    useEffect(() => { adcValuesRef.current = adcValues; }, [adcValues]);

    const transformCode = (src) => {
        let s = src;
        s = s.replace(/\b(int|float|double|long|bool|boolean|byte|char|String|unsigned|short|void)\b\s+/g, '');
        s = s.replace(/\bsetup\s*\(\s*\)/g, 'async function setup()');
        s = s.replace(/\bloop\s*\(\s*\)/g, 'async function loop()');
        s = s.replace(/(^|[^.\w])delay\s*\(/g, '$1await delay(');
        return s;
    };

    const runCode = async () => {
        if (runningRef.current) return;
        setErrorMsg('');
        setSerial([]);
        setPinStates({});
        setPwmStates({});
        setPinModes({});
        runningRef.current = true;
        stopFlagRef.current = false;
        timeoutsRef.current = [];
        startTimeRef.current = Date.now();
        setRunning(true);

        try {
            const transformed = transformCode(code);
            const sandbox = buildSandbox();
            const factory = new Function(...Object.keys(sandbox),
                `${transformed}\nreturn { setup: typeof setup === 'function' ? setup : null, loop: typeof loop === 'function' ? loop : null };`
            );
            const { setup, loop } = factory(...Object.values(sandbox));
            if (typeof setup === 'function') await setup();
            const runLoop = async () => {
                while (!stopFlagRef.current && typeof loop === 'function') {
                    await loop();
                }
            };
            loopHandleRef.current = runLoop();
            await loopHandleRef.current;
        } catch (e) {
            setErrorMsg(e.message);
            log(`[ERROR] ${e.message}`);
        } finally {
            runningRef.current = false;
            setRunning(false);
        }
    };

    const stopCode = () => {
        stopFlagRef.current = true;
        runningRef.current = false;
        setRunning(false);
        timeoutsRef.current.forEach(t => clearTimeout(t));
        timeoutsRef.current = [];
        log('[SIM] Detenido');
    };

    const renderPin = (pin) => {
        const state = pinStates[pin.num] ?? 0;
        const pwm = pwmStates[pin.num];
        const mode = pinModes[pin.num];
        const isOutput = mode === 'OUTPUT';
        const isInput = mode === 'INPUT' || mode === 'INPUT_PULLUP';
        const isAnalog = pin.features.some(f => f.startsWith('ADC'));

        return (
            <div key={pin.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', marginBottom: '4px' }}>
                <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: pwm !== undefined ? `rgba(255,235,59,${pwm / 255})` : state ? '#ffeb3b' : '#333',
                    boxShadow: state ? '0 0 10px #ffeb3b' : 'none'
                }} />
                <span style={{ color: '#68cef8', fontWeight: 'bold', fontSize: '0.7rem', width: '45px' }}>{pin.name}</span>
                {isAnalog && <input type="range" min="0" max="4095" value={adcValues[pin.num] ?? 0} onChange={(e) => setAdcValues(v => ({...v, [pin.num]: Number(e.target.value)}))} style={{ width: '40px' }} />}
                {isInput && <button onClick={() => setButtonStates(v => ({...v, [pin.num]: !v[pin.num]}))} style={{ fontSize: '0.6rem', padding: '2px 4px', background: buttonStates[pin.num] ? '#10b981' : '#333', border: 'none', color: '#fff', borderRadius: '3px' }}>{buttonStates[pin.num] ? 'H' : 'L'}</button>}
            </div>
        );
    };

    return (
        <div className="app-container" style={{ padding: '20px' }}>
            <header className="pi-hero" style={{ marginBottom: '2rem' }}>
                <div className="pi-hero-badge">PROYECTO INTEGRADOR IDE</div>
                <h1 className="pi-hero-title">IDE Híbrido: Simulación & Hardware</h1>
                <p className="pi-hero-desc">
                    Programa los 6 proyectos integradores. Simúlalos localmente o conéctalos a tu placa real vía USB.
                </p>
                <div className="pi-hero-tags">
                    <span className="pi-tag">6to Año</span>
                    <span className="pi-tag">IoT Bridge</span>
                    <span className="pi-tag">Web Serial API</span>
                    <span className="pi-tag">Real-Time Flash</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                <section className="pi-section">
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {Object.entries(EXAMPLES).map(([key, ex]) => (
                            <button 
                                key={key} 
                                className={`sim-btn ${activeExample === key ? 'active' : ''}`}
                                onClick={() => { setCode(ex.code); setActiveExample(key); stopCode(); }}
                                style={{ fontSize: '0.75rem', padding: '8px 12px' }}
                            >
                                {ex.name}
                            </button>
                        ))}
                    </div>

                    <div className="code-block" style={{ margin: 0 }}>
                        <div className="code-header">
                            <span>{EXAMPLES[activeExample]?.name}</span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {!isSerialConnected ? (
                                    <button className="copy-btn" onClick={connectSerial}>🔌 Conectar Placa</button>
                                ) : (
                                    <button className="copy-btn" style={{ background: '#ef4444' }} onClick={disconnectSerial}>🔌 Desconectar</button>
                                )}
                                <button className="copy-btn active" onClick={running ? stopCode : runCode}>
                                    {running ? '⏹ Detener' : '▶ Ejecutar Simulación'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{
                                width: '100%', height: '450px', background: '#0a0d14', color: '#38bdf8',
                                fontFamily: 'monospace', padding: '1.5rem', border: 'none', resize: 'none'
                            }}
                        />
                    </div>
                </section>

                <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="pi-section" style={{ background: '#0a0d14', border: '2px solid #38bdf844' }}>
                        <h3 className="pi-section-title" style={{ color: '#38bdf8', fontSize: '1rem' }}>Placa Virtual (Live States)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>{ESP32_PINS.filter(p => p.side === 'left').map(renderPin)}</div>
                            <div>{ESP32_PINS.filter(p => p.side === 'right').map(renderPin)}</div>
                        </div>
                    </div>

                    <div className="pi-section" style={{ background: '#000', border: '1px solid #333' }}>
                        <h3 className="pi-section-title" style={{ color: '#22c55e', fontSize: '0.8rem' }}>Monitor Serial {isSerialConnected && '(VÍA USB)'}</h3>
                        <div style={{ height: '220px', overflowY: 'auto', color: '#22c55e', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                            {serial.map((s, i) => <div key={i}>{'> '}{s.text}</div>)}
                            {serial.length === 0 && <span style={{ color: '#444' }}>Esperando datos...</span>}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ESP32SimuladorPage;

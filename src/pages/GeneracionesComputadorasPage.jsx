import React, { useState, useEffect, useRef } from 'react';
import './GeneracionesComputadorasStyles.css';

// ─── DATA ───────────────────────────────────────────────────────────────────
const GENERACIONES = [
  {
    id: 1,
    nombre: '1ª Generación',
    periodo: '1940 – 1956',
    tecnologia: 'Válvulas de Vacío',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.4)',
    emoji: '💡',
    icon: 'ENIAC',
    descripcion:
      'Las primeras computadoras utilizaban tubos de vacío (válvulas termoiónicas) como interruptores electrónicos. Eran enormes, consumían cantidades masivas de energía y generaban mucho calor.',
    datos: [
      { label: 'Tamaño', valor: '~167 m²', icon: '📐' },
      { label: 'Peso', valor: '~27 toneladas', icon: '⚖️' },
      { label: 'Consumo', valor: '150 kW', icon: '⚡' },
      { label: 'Velocidad', valor: '5.000 op/seg', icon: '🚀' },
      { label: 'Memoria', valor: 'Tarjetas perforadas', icon: '💾' },
      { label: 'Precio', valor: 'Millones USD', icon: '💰' },
    ],
    ejemplos: ['ENIAC (1945)', 'EDVAC (1949)', 'UNIVAC I (1951)', 'IBM 701 (1952)'],
    curiosidad: '¡La ENIAC necesitaba 18.000 válvulas de vacío! Cuando una fallaba, toda la computadora se detenía.',
    simulacion: 'valvulas',
    quiz: [
      {
        pregunta: '¿Qué componente electrónico caracterizó a la 1ª generación?',
        opciones: ['Transistor', 'Válvula de Vacío', 'Circuito Integrado', 'Microprocesador'],
        correcta: 1,
      },
      {
        pregunta: '¿Cuánta área ocupaba la ENIAC aproximadamente?',
        opciones: ['10 m²', '50 m²', '167 m²', '1000 m²'],
        correcta: 2,
      },
    ],
  },
  {
    id: 2,
    nombre: '2ª Generación',
    periodo: '1956 – 1964',
    tecnologia: 'Transistores',
    color: '#f7b731',
    glow: 'rgba(247,183,49,0.4)',
    emoji: '🔬',
    icon: 'IBM 1401',
    descripcion:
      'El transistor reemplazó a las válvulas de vacío. Inventado en los Bell Labs en 1947, el transistor era más pequeño, más rápido, más confiable y consumía mucha menos energía.',
    datos: [
      { label: 'Tamaño', valor: 'Habitación', icon: '📐' },
      { label: 'Peso', valor: '~ 1 tonelada', icon: '⚖️' },
      { label: 'Consumo', valor: '~ 5 kW', icon: '⚡' },
      { label: 'Velocidad', valor: '1 M op/seg', icon: '🚀' },
      { label: 'Memoria', valor: 'Núcleos magnéticos', icon: '💾' },
      { label: 'Precio', valor: '~ $200.000 USD', icon: '💰' },
    ],
    ejemplos: ['IBM 1401 (1959)', 'IBM 7090 (1959)', 'CDC 1604 (1960)', 'PDP-1 (1960)'],
    curiosidad:
      'Los transistores son 1.000 veces más pequeños que las válvulas de vacío y consumen 100 veces menos energía.',
    simulacion: 'transistor',
    quiz: [
      {
        pregunta: '¿Dónde fue inventado el transistor?',
        opciones: ['IBM Labs', 'Bell Labs', 'MIT', 'Intel'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué ventaja principal tenían los transistores sobre las válvulas?',
        opciones: [
          'Mayor tamaño',
          'Mayor consumo',
          'Menor confiabilidad',
          'Menor tamaño y consumo',
        ],
        correcta: 3,
      },
    ],
  },
  {
    id: 3,
    nombre: '3ª Generación',
    periodo: '1964 – 1971',
    tecnologia: 'Circuitos Integrados',
    color: '#26de81',
    glow: 'rgba(38,222,129,0.4)',
    emoji: '🔧',
    icon: 'IBM 360',
    descripcion:
      'Los circuitos integrados (chips) agrupan múltiples transistores en una sola placa de silicio. Jack Kilby (Texas Instruments) y Robert Noyce (Fairchild) los inventaron independientemente en 1958-1959.',
    datos: [
      { label: 'Tamaño', valor: 'Escritorio grande', icon: '📐' },
      { label: 'Peso', valor: '~ 100 kg', icon: '⚖️' },
      { label: 'Consumo', valor: '~ 500 W', icon: '⚡' },
      { label: 'Velocidad', valor: '1 M - 10 M op/seg', icon: '🚀' },
      { label: 'Memoria', valor: 'RAM magnética', icon: '💾' },
      { label: 'Precio', valor: '~ $30.000 USD', icon: '💰' },
    ],
    ejemplos: ['IBM System/360 (1964)', 'PDP-8 (1965)', 'CDC 6600 (1964)', 'Burroughs B5500'],
    curiosidad:
      'Un solo chip integrado podía reemplazar docenas de transistores discretos. ¡La IBM System/360 es considerada la primera familia de computadoras compatibles entre sí!',
    simulacion: 'chip',
    quiz: [
      {
        pregunta: '¿Qué son los circuitos integrados?',
        opciones: [
          'Cables conectados',
          'Múltiples transistores en silicio',
          'Válvulas miniaturizadas',
          'Memorias magnéticas',
        ],
        correcta: 1,
      },
      {
        pregunta: '¿Quiénes inventaron el circuito integrado?',
        opciones: [
          'Gates y Jobs',
          'Turing y Von Neumann',
          'Kilby y Noyce',
          'Shockley y Bardeen',
        ],
        correcta: 2,
      },
    ],
  },
  {
    id: 4,
    nombre: '4ª Generación',
    periodo: '1971 – Presente',
    tecnologia: 'Microprocesadores',
    color: '#45aaf2',
    glow: 'rgba(69,170,242,0.4)',
    emoji: '💻',
    icon: 'Intel 4004',
    descripcion:
      'El microprocesador integra todos los componentes de una CPU en un único chip. Intel lanzó el 4004 en 1971, el primer microprocesador comercial con 2.300 transistores. Hoy los procesadores tienen millones de millones de transistores.',
    datos: [
      { label: 'Tamaño', valor: 'Escritorio / Bolsillo', icon: '📐' },
      { label: 'Peso', valor: 'Gramos', icon: '⚖️' },
      { label: 'Consumo', valor: '5 W – 300 W', icon: '⚡' },
      { label: 'Velocidad', valor: 'GHz (miles de M op/seg)', icon: '🚀' },
      { label: 'Memoria', valor: 'RAM/SSD/HDD (GB-TB)', icon: '💾' },
      { label: 'Precio', valor: '< $1.000 USD', icon: '💰' },
    ],
    ejemplos: [
      'Intel 4004 (1971)',
      'Apple Macintosh (1984)',
      'IBM PC (1981)',
      'Pentium / Core i9 (actualidad)',
    ],
    curiosidad:
      'La Ley de Moore (Gordon Moore, Intel) predijo que el número de transistores en un chip se duplicaría cada 2 años. ¡Se cumplió durante 50 años!',
    simulacion: 'cpu',
    quiz: [
      {
        pregunta: '¿Cuál fue el primer microprocesador comercial?',
        opciones: ['Intel 8086', 'Intel 4004', 'Motorola 68000', 'AMD Athlon'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué dice la Ley de Moore?',
        opciones: [
          'Los procesadores siempre serán caros',
          'El consumo crece cada año',
          'Los transistores se duplican cada 2 años',
          'La RAM decrece con el tiempo',
        ],
        correcta: 2,
      },
    ],
  },
  {
    id: 5,
    nombre: '5ª Generación',
    periodo: '1980 – Presente',
    tecnologia: 'Inteligencia Artificial',
    color: '#a55eea',
    glow: 'rgba(165,94,234,0.4)',
    emoji: '🧠',
    icon: 'IA & Redes Neuronales',
    descripcion:
      'La quinta generación se define por el enfoque en inteligencia artificial, procesamiento paralelo masivo y lenguajes de programación declarativos. Incluye sistemas expertos, redes neuronales y el desarrollo de la computación cognitiva.',
    datos: [
      { label: 'Procesamiento', valor: 'Masivamente paralelo', icon: '⚙️' },
      { label: 'Paradigma', valor: 'IA + Machine Learning', icon: '🧠' },
      { label: 'Velocidad', valor: 'Petaflops', icon: '🚀' },
      { label: 'Memoria', valor: 'Terabytes - Petabytes', icon: '💾' },
      { label: 'Interfaz', valor: 'Voz / Lenguaje Natural', icon: '🗣️' },
      { label: 'Conectividad', valor: 'Internet / Nube', icon: '☁️' },
    ],
    ejemplos: ['Deep Blue (1997)', 'Watson (IBM)', 'ChatGPT / GPT-4', 'AlphaGo (DeepMind)'],
    curiosidad:
      '¡En 1997, la computadora Deep Blue de IBM venció al campeón mundial de ajedrez Garry Kasparov en una serie histórica!',
    simulacion: 'neural',
    quiz: [
      {
        pregunta: '¿Qué caracteriza a la 5ª generación de computadoras?',
        opciones: [
          'Uso de válvulas',
          'Solo almacenamiento',
          'Inteligencia Artificial y procesamiento paralelo',
          'Sin conectividad',
        ],
        correcta: 2,
      },
      {
        pregunta: '¿Qué es un Petaflop?',
        opciones: [
          'Un tipo de RAM',
          '10^15 operaciones de punto flotante por segundo',
          'Un lenguaje de programación',
          'Un protocolo de red',
        ],
        correcta: 1,
      },
    ],
  },
  {
    id: 6,
    nombre: 'Futuro',
    periodo: '2020 – ∞',
    tecnologia: 'Cuántica & Biológica',
    color: '#00f2ff',
    glow: 'rgba(0,242,255,0.5)',
    emoji: '⚛️',
    icon: 'Q-Bit',
    descripcion:
      'La computación cuántica usa qubits que pueden estar en superposición (0 y 1 simultáneamente), permitiendo resolver problemas imposibles para computadoras clásicas. La computación biológica usa ADN y proteínas como sustrato computacional.',
    datos: [
      { label: 'Unidad básica', valor: 'Qubit (superposición)', icon: '⚛️' },
      { label: 'Temperatura', valor: '0.015 Kelvin (-273°C)', icon: '🌡️' },
      { label: 'Ventaja', valor: 'Paralelismo cuántico', icon: '🔀' },
      { label: 'Aplicaciones', valor: 'Criptografía / Drug Discovery', icon: '🔬' },
      { label: 'Bio-computing', valor: 'ADN como memoria', icon: '🧬' },
      { label: 'Estado', valor: 'Investigación activa', icon: '🔭' },
    ],
    ejemplos: [
      'IBM Quantum (127 qubits)',
      'Google Sycamore (53 qubits)',
      'D-Wave Advantage',
      'Investigación en ADN Computing',
    ],
    curiosidad:
      '¡Una computadora cuántica podría resolver en minutos problemas que una computadora clásica tardaría más tiempo que la edad del universo!',
    simulacion: 'quantum',
    quiz: [
      {
        pregunta: '¿Qué es un qubit?',
        opciones: [
          'Un pixel cuántico',
          'Un bit que solo puede ser 0 o 1',
          'Una unidad que puede estar en superposición de 0 y 1',
          'Un tipo de transistor',
        ],
        correcta: 2,
      },
      {
        pregunta: '¿A qué temperatura operan los procesadores cuánticos superconductores?',
        opciones: ['0°C', '-50°C', '-200°C', 'Cerca del cero absoluto (-273°C)'],
        correcta: 3,
      },
    ],
  },
];

// ─── SIMULACIONES ────────────────────────────────────────────────────────────
const SimulacionValvulas = () => {
  const [encendidas, setEncendidas] = useState([true, false, true, false, true, false]);
  const [ciclos, setCiclos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEncendidas((prev) => prev.map(() => Math.random() > 0.3));
      setCiclos((c) => c + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sim-container">
      <h4 className="sim-title">🔌 Simulador de Válvulas de Vacío</h4>
      <p className="sim-desc">
        Cada válvula actúa como interruptor electrónico (encendida = 1, apagada = 0)
      </p>
      <div className="valvulas-grid">
        {encendidas.map((on, i) => (
          <div
            key={i}
            className={`valvula ${on ? 'valvula-on' : 'valvula-off'}`}
            onClick={() => setEncendidas((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
          >
            <div className="valvula-tubo">
              <div className="valvula-filamento" style={{ opacity: on ? 1 : 0.1 }} />
              <div className="valvula-glow" style={{ opacity: on ? 1 : 0 }} />
            </div>
            <div className="valvula-base">V{i + 1}</div>
            <div className={`valvula-bit ${on ? 'bit-1' : 'bit-0'}`}>{on ? '1' : '0'}</div>
          </div>
        ))}
      </div>
      <p className="sim-info">
        Valor binario: <strong>{encendidas.map((v) => (v ? '1' : '0')).join('')}</strong>
        &nbsp;| Ciclos: <strong>{ciclos}</strong> | Haz clic en una válvula para cambiarla
      </p>
    </div>
  );
};

const SimulacionTransistor = () => {
  const [voltajeBase, setVoltajeBase] = useState(0.3);
  const conduciendo = voltajeBase >= 0.7;

  return (
    <div className="sim-container">
      <h4 className="sim-title">🔬 Simulador de Transistor NPN</h4>
      <p className="sim-desc">
        Controla el voltaje de base para abrir o cerrar el transistor
      </p>
      <div className="transistor-diagram">
        <div className="trans-terminal">
          <div className="trans-label">Colector (+)</div>
          <div className="trans-wire" style={{ background: conduciendo ? '#f7b731' : '#555' }} />
        </div>
        <div className="trans-body">
          <div className="trans-chip" style={{ boxShadow: conduciendo ? '0 0 20px #f7b731' : 'none' }}>
            <span>NPN</span>
          </div>
        </div>
        <div className="trans-terminal">
          <div className="trans-wire" style={{ background: conduciendo ? '#f7b731' : '#555' }} />
          <div className="trans-label">Emisor (−)</div>
        </div>
      </div>
      <div className="trans-base-ctrl">
        <label>
          🔌 Voltaje de Base: <strong>{voltajeBase.toFixed(1)} V</strong>
        </label>
        <input
          type="range"
          min="0"
          max="1.2"
          step="0.1"
          value={voltajeBase}
          onChange={(e) => setVoltajeBase(parseFloat(e.target.value))}
          style={{ accentColor: '#f7b731' }}
        />
      </div>
      <div
        className="trans-status"
        style={{
          background: conduciendo ? 'rgba(247,183,49,0.2)' : 'rgba(255,0,0,0.1)',
          borderColor: conduciendo ? '#f7b731' : '#f44336',
          color: conduciendo ? '#f7b731' : '#f44336',
        }}
      >
        {conduciendo ? '✅ TRANSISTOR: CONDUCIENDO (Interruptor CERRADO = BIT 1)' : '⛔ TRANSISTOR: CORTE (Interruptor ABIERTO = BIT 0)'}
        <br />
        <small>Umbral de conducción: 0.7V (Silicio)</small>
      </div>
    </div>
  );
};

const SimulacionChip = () => {
  const [zoom, setZoom] = useState(1);
  const [componente, setComponente] = useState('transistor');

  const info = {
    transistor: { count: 2300, desc: 'Intel 4004 (1971)', color: '#26de81' },
    integrated: { count: 30000, desc: 'Intel 8086 (1978)', color: '#45aaf2' },
    modern: { count: 15000000000, desc: 'Apple M1 (2020)', color: '#a55eea' },
  };

  return (
    <div className="sim-container">
      <h4 className="sim-title">🔧 Simulador de Circuito Integrado</h4>
      <p className="sim-desc">Explora la evolución de la densidad de transistores en un chip</p>
      <div className="chip-selector">
        {Object.entries(info).map(([key, val]) => (
          <button
            key={key}
            className={`chip-btn ${componente === key ? 'active' : ''}`}
            style={{ '--chip-color': val.color }}
            onClick={() => setComponente(key)}
          >
            {val.desc}
          </button>
        ))}
      </div>
      <div className="chip-visual">
        <div className="chip-body" style={{ boxShadow: `0 0 30px ${info[componente].color}` }}>
          <div
            className="chip-grid"
            style={{
              gridTemplateColumns: `repeat(${componente === 'transistor' ? 6 : componente === 'integrated' ? 12 : 20}, 1fr)`,
            }}
          >
            {Array.from({
              length: componente === 'transistor' ? 36 : componente === 'integrated' ? 144 : 400,
            }).map((_, i) => (
              <div
                key={i}
                className="chip-cell"
                style={{ background: info[componente].color, animationDelay: `${(i * 0.02) % 2}s` }}
              />
            ))}
          </div>
        </div>
        <div className="chip-info-box" style={{ borderColor: info[componente].color, color: info[componente].color }}>
          <div className="chip-transistor-count">
            {info[componente].count.toLocaleString('es-AR')}
          </div>
          <div className="chip-transistor-label">transistores</div>
          <div className="chip-transistor-desc">{info[componente].desc}</div>
        </div>
      </div>
    </div>
  );
};

const SimulacionCPU = () => {
  const [instruccion, setInstruccion] = useState(null);
  const [fase, setFase] = useState(0); // 0=fetch, 1=decode, 2=execute, 3=writeback
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const instrucciones = [
    { op: 'ADD R1, R2', desc: 'Suma registros' },
    { op: 'MOV R0, #5', desc: 'Carga valor' },
    { op: 'CMP R1, R3', desc: 'Compara' },
    { op: 'JMP 0x0A', desc: 'Salta a dirección' },
  ];

  const fases = ['📥 FETCH', '🔍 DECODE', '⚙️ EXECUTE', '📤 WRITE-BACK'];
  const faseColors = ['#45aaf2', '#f7b731', '#26de81', '#a55eea'];

  const start = () => {
    if (running) return;
    setRunning(true);
    const inst = instrucciones[Math.floor(Math.random() * instrucciones.length)];
    setInstruccion(inst);
    setFase(0);
    let f = 0;
    intervalRef.current = setInterval(() => {
      f++;
      if (f < 4) {
        setFase(f);
      } else {
        clearInterval(intervalRef.current);
        setRunning(false);
        setFase(0);
        setInstruccion(null);
      }
    }, 700);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="sim-container">
      <h4 className="sim-title">💻 Ciclo de Instrucción del Microprocesador</h4>
      <p className="sim-desc">Observa el ciclo Fetch → Decode → Execute → Write-Back</p>
      <div className="cpu-diagram">
        {fases.map((f, i) => (
          <div
            key={i}
            className={`cpu-stage ${fase >= i && instruccion ? 'cpu-active' : ''}`}
            style={{
              '--stage-color': faseColors[i],
              borderColor: fase === i && instruccion ? faseColors[i] : 'rgba(255,255,255,0.15)',
              boxShadow: fase === i && instruccion ? `0 0 20px ${faseColors[i]}` : 'none',
            }}
          >
            <div className="cpu-stage-name">{f}</div>
            {fase === i && instruccion && (
              <div className="cpu-stage-data" style={{ color: faseColors[i] }}>
                {i === 0 && instruccion.op}
                {i === 1 && instruccion.desc}
                {i === 2 && '🔄 Procesando...'}
                {i === 3 && '✅ Resultado guardado'}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="sim-btn"
        onClick={start}
        disabled={running}
        style={{ background: running ? '#333' : '#45aaf2', color: running ? '#888' : '#000' }}
      >
        {running ? '⚙️ Ejecutando...' : '▶ Ejecutar instrucción'}
      </button>
    </div>
  );
};

const SimulacionNeural = () => {
  const [input1, setInput1] = useState(0.8);
  const [input2, setInput2] = useState(0.6);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(0.7);

  const sigma = (x) => 1 / (1 + Math.exp(-x));
  const z = input1 * w1 + input2 * w2;
  const output = sigma(z);

  return (
    <div className="sim-container">
      <h4 className="sim-title">🧠 Simulador de Neurona Artificial</h4>
      <p className="sim-desc">
        Ajusta las entradas y pesos para ver la activación de la neurona (función sigmoide)
      </p>
      <div className="neural-diagram">
        <div className="neural-inputs">
          <div className="neural-node input-node">
            <div className="neural-val">{input1.toFixed(1)}</div>
            <div className="neural-lbl">x₁</div>
            <input type="range" min="0" max="1" step="0.1" value={input1} onChange={(e) => setInput1(parseFloat(e.target.value))} style={{ accentColor: '#a55eea' }} />
          </div>
          <div className="neural-node input-node">
            <div className="neural-val">{input2.toFixed(1)}</div>
            <div className="neural-lbl">x₂</div>
            <input type="range" min="0" max="1" step="0.1" value={input2} onChange={(e) => setInput2(parseFloat(e.target.value))} style={{ accentColor: '#a55eea' }} />
          </div>
        </div>
        <div className="neural-weights">
          <div className="weight-ctrl">
            <span>w₁ = {w1.toFixed(1)}</span>
            <input type="range" min="0" max="1" step="0.1" value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} style={{ accentColor: '#f7b731' }} />
          </div>
          <div className="weight-ctrl">
            <span>w₂ = {w2.toFixed(1)}</span>
            <input type="range" min="0" max="1" step="0.1" value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} style={{ accentColor: '#f7b731' }} />
          </div>
        </div>
        <div className="neural-center">
          <div
            className="neural-node center-node"
            style={{
              background: `radial-gradient(circle, #a55eea ${output * 80}%, #2d1b4e)`,
              boxShadow: `0 0 ${output * 40}px #a55eea`,
            }}
          >
            <div className="neural-val">σ({z.toFixed(2)})</div>
            <div className="neural-lbl">Neurona</div>
          </div>
        </div>
        <div className="neural-output">
          <div
            className="neural-node output-node"
            style={{
              background: output > 0.5 ? 'rgba(38,222,129,0.2)' : 'rgba(244,67,54,0.2)',
              borderColor: output > 0.5 ? '#26de81' : '#f44336',
              color: output > 0.5 ? '#26de81' : '#f44336',
            }}
          >
            <div className="neural-val">{output.toFixed(3)}</div>
            <div className="neural-lbl">Salida</div>
            <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>
              {output > 0.5 ? '🟢 ACTIVA' : '🔴 NO ACTIVA'}
            </div>
          </div>
        </div>
      </div>
      <p className="sim-info">
        Fórmula: σ(x₁·w₁ + x₂·w₂) = σ({z.toFixed(2)}) = <strong>{output.toFixed(3)}</strong>
      </p>
    </div>
  );
};

const SimulacionQuantum = () => {
  const [measuring, setMeasuring] = useState(false);
  const [result, setResult] = useState(null);
  const [superposed, setSuperposed] = useState(true);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!measuring) {
      const anim = setInterval(() => setAngle((a) => (a + 2) % 360), 30);
      return () => clearInterval(anim);
    }
  }, [measuring]);

  const medir = () => {
    setMeasuring(true);
    setSuperposed(false);
    setTimeout(() => {
      const r = Math.random() > 0.5 ? '|1⟩' : '|0⟩';
      setResult(r);
    }, 1200);
  };

  const reset = () => {
    setMeasuring(false);
    setResult(null);
    setSuperposed(true);
  };

  return (
    <div className="sim-container">
      <h4 className="sim-title">⚛️ Simulador de Qubit Cuántico</h4>
      <p className="sim-desc">
        Un qubit existe en superposición hasta que lo medimos. ¡Al medir, colapsa a 0 o 1!
      </p>
      <div className="bloch-sphere-container">
        <svg width="220" height="220" viewBox="-110 -110 220 220">
          {/* Esfera de Bloch simplificada */}
          <ellipse cx="0" cy="0" rx="90" ry="90" fill="none" stroke="rgba(0,242,255,0.2)" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="90" ry="30" fill="none" stroke="rgba(0,242,255,0.15)" strokeWidth="1" />
          <line x1="0" y1="-90" x2="0" y2="90" stroke="rgba(0,242,255,0.2)" strokeWidth="1" />
          <line x1="-90" y1="0" x2="90" y2="0" stroke="rgba(0,242,255,0.2)" strokeWidth="1" />
          {/* |0⟩ y |1⟩ */}
          <text x="0" y="-98" textAnchor="middle" fill="#00f2ff" fontSize="12" fontWeight="bold">|0⟩</text>
          <text x="0" y="108" textAnchor="middle" fill="#00f2ff" fontSize="12" fontWeight="bold">|1⟩</text>
          {/* Vector de estado */}
          {superposed ? (
            <>
              <line
                x1="0" y1="0"
                x2={Math.sin((angle * Math.PI) / 180) * 80}
                y2={-Math.cos((angle * Math.PI) / 180) * 60}
                stroke="#00f2ff" strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx={Math.sin((angle * Math.PI) / 180) * 80}
                cy={-Math.cos((angle * Math.PI) / 180) * 60}
                r="8" fill="#00f2ff"
                style={{ filter: 'drop-shadow(0 0 8px #00f2ff)' }}
              />
              <text x="0" y="10" textAnchor="middle" fill="rgba(0,242,255,0.7)" fontSize="10">Superposición</text>
            </>
          ) : result ? (
            <>
              <line x1="0" y1="0" x2="0" y2={result === '|0⟩' ? -80 : 80} stroke="#f7b731" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy={result === '|0⟩' ? -80 : 80} r="10" fill="#f7b731" style={{ filter: 'drop-shadow(0 0 10px #f7b731)' }} />
            </>
          ) : (
            <text x="0" y="5" textAnchor="middle" fill="#f44336" fontSize="12">Midiendo...</text>
          )}
        </svg>
      </div>
      <div className="quantum-state">
        {superposed ? (
          <div className="quantum-formula">
            ψ = α|0⟩ + β|1⟩ &nbsp;
            <span style={{ color: '#00f2ff' }}>(Superposición cuántica)</span>
          </div>
        ) : result ? (
          <div className="quantum-formula" style={{ color: '#f7b731' }}>
            Resultado medido: <strong style={{ fontSize: '1.5rem' }}>{result}</strong>
            <br />
            <small>La función de onda colapsó al medir</small>
          </div>
        ) : (
          <div className="quantum-formula" style={{ color: '#f44336' }}>Colapsando ψ...</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="sim-btn" onClick={medir} disabled={measuring} style={{ background: measuring ? '#333' : '#00f2ff', color: '#000' }}>
          🔬 Medir Qubit
        </button>
        <button className="sim-btn" onClick={reset} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
          🔄 Resetear
        </button>
      </div>
    </div>
  );
};

const simulaciones = {
  valvulas: SimulacionValvulas,
  transistor: SimulacionTransistor,
  chip: SimulacionChip,
  cpu: SimulacionCPU,
  neural: SimulacionNeural,
  quantum: SimulacionQuantum,
};

// ─── QUIZ ────────────────────────────────────────────────────────────────────
const QuizPanel = ({ gen, color }) => {
  const [respuestas, setRespuestas] = useState({});
  const [mostrar, setMostrar] = useState(false);
  const [score, setScore] = useState(null);

  const verificar = () => {
    let correctas = 0;
    gen.quiz.forEach((q, i) => {
      if (respuestas[i] === q.correcta) correctas++;
    });
    setScore(correctas);
    setMostrar(true);
  };

  const reset = () => { setRespuestas({}); setMostrar(false); setScore(null); };

  return (
    <div className="quiz-panel" style={{ borderColor: color }}>
      <h4 className="quiz-title" style={{ color }}>📝 Quiz — {gen.nombre}</h4>
      {gen.quiz.map((q, qi) => (
        <div key={qi} className="quiz-question-item">
          <p className="quiz-q">{qi + 1}. {q.pregunta}</p>
          <div className="quiz-options">
            {q.opciones.map((op, oi) => {
              const seleccionada = respuestas[qi] === oi;
              let cls = 'quiz-opt';
              if (mostrar) {
                if (oi === q.correcta) cls += ' opt-correct';
                else if (seleccionada) cls += ' opt-wrong';
              } else if (seleccionada) cls += ' opt-selected';
              return (
                <button
                  key={oi}
                  className={cls}
                  style={seleccionada && !mostrar ? { borderColor: color, color } : {}}
                  onClick={() => !mostrar && setRespuestas((r) => ({ ...r, [qi]: oi }))}
                >
                  {op}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="quiz-actions">
        {!mostrar ? (
          <button
            className="sim-btn"
            onClick={verificar}
            disabled={Object.keys(respuestas).length < gen.quiz.length}
            style={{ background: color, color: '#000' }}
          >
            ✅ Verificar
          </button>
        ) : (
          <div className="quiz-result">
            <div
              className="quiz-score"
              style={{ color: score === gen.quiz.length ? '#26de81' : score > 0 ? '#f7b731' : '#f44336' }}
            >
              {score === gen.quiz.length ? '🏆' : score > 0 ? '⭐' : '❌'} {score}/{gen.quiz.length} correctas
              {score === gen.quiz.length && ' — ¡Perfecto!'}
            </div>
            <button className="sim-btn" onClick={reset} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              🔄 Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const GeneracionesComputadorasPage = () => {
  const [genActiva, setGenActiva] = useState(0);
  const [tab, setTab] = useState('info'); // 'info' | 'sim' | 'quiz'
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [progreso, setProgreso] = useState(new Set());

  const gen = GENERACIONES[genActiva];
  const SimComponent = simulaciones[gen.simulacion];

  const marcarProgreso = (id) => {
    setProgreso((p) => new Set([...p, id]));
  };

  return (
    <div className="gen-page">
      {/* HEADER */}
      <header className="gen-header">
        <div className="gen-header-content">
          <h1 className="gen-title">
            <span className="gen-title-icon">🖥️</span>
            Generaciones de Computadoras
          </h1>
          <p className="gen-subtitle">
            Desde las válvulas de vacío hasta la computación cuántica — Un viaje interactivo por la historia de la informática
          </p>
          <div className="gen-progress-bar">
            <div className="gen-progress-val" style={{ width: `${(progreso.size / GENERACIONES.length) * 100}%` }} />
          </div>
          <p className="gen-progress-text">{progreso.size}/{GENERACIONES.length} generaciones exploradas</p>
        </div>
      </header>

      <div className="gen-layout">
        {/* TIMELINE SIDEBAR */}
        <aside className="gen-timeline">
          <h3 className="timeline-title">📅 Línea del Tiempo</h3>
          {GENERACIONES.map((g, i) => (
            <button
              key={g.id}
              className={`timeline-item ${i === genActiva ? 'timeline-active' : ''} ${progreso.has(g.id) ? 'timeline-done' : ''}`}
              style={{
                '--tl-color': g.color,
                borderLeftColor: i === genActiva ? g.color : 'transparent',
              }}
              onClick={() => { setGenActiva(i); setTab('info'); marcarProgreso(g.id); }}
            >
              <div className="tl-emoji">{g.emoji}</div>
              <div className="tl-info">
                <div className="tl-nombre" style={{ color: i === genActiva ? g.color : 'inherit' }}>{g.nombre}</div>
                <div className="tl-periodo">{g.periodo}</div>
                <div className="tl-tech">{g.tecnologia}</div>
              </div>
              {progreso.has(g.id) && <div className="tl-check">✓</div>}
            </button>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className="gen-main">
          {/* GEN HEADER */}
          <div className="gen-card-header" style={{ '--gen-color': gen.color, '--gen-glow': gen.glow }}>
            <div className="gen-badge">
              <span className="gen-emoji-big">{gen.emoji}</span>
            </div>
            <div>
              <h2 className="gen-nombre" style={{ color: gen.color }}>{gen.nombre}</h2>
              <p className="gen-tech">{gen.tecnologia} — {gen.periodo}</p>
            </div>
          </div>

          {/* TABS */}
          <div className="gen-tabs">
            {[
              { key: 'info', label: '📖 Información' },
              { key: 'sim', label: '🎮 Simulación' },
              { key: 'quiz', label: '📝 Quiz' },
            ].map((t) => (
              <button
                key={t.key}
                className={`gen-tab ${tab === t.key ? 'tab-active' : ''}`}
                style={{ '--tab-color': gen.color }}
                onClick={() => { setTab(t.key); if (t.key !== 'info') marcarProgreso(gen.id); }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          {tab === 'info' && (
            <div className="gen-info-content">
              <p className="gen-descripcion">{gen.descripcion}</p>

              {/* DATOS */}
              <div className="gen-datos-grid">
                {gen.datos.map((d, i) => (
                  <div key={i} className="dato-card" style={{ borderColor: gen.color }}>
                    <div className="dato-icon">{d.icon}</div>
                    <div className="dato-label">{d.label}</div>
                    <div className="dato-valor" style={{ color: gen.color }}>{d.valor}</div>
                  </div>
                ))}
              </div>

              {/* EJEMPLOS */}
              <div className="gen-section">
                <h3>🖥️ Ejemplos representativos</h3>
                <div className="ejemplos-list">
                  {gen.ejemplos.map((ej, i) => (
                    <div key={i} className="ejemplo-chip" style={{ borderColor: gen.color, color: gen.color }}>
                      {ej}
                    </div>
                  ))}
                </div>
              </div>

              {/* CURIOSIDAD */}
              <div className="curiosidad-box" style={{ borderColor: gen.color, background: `${gen.glow}` }}>
                <div className="curiosidad-icon">💡</div>
                <div>
                  <strong>¿Sabías que?</strong>
                  <p>{gen.curiosidad}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'sim' && (
            <div className="gen-sim-content">
              <SimComponent />
            </div>
          )}

          {tab === 'quiz' && (
            <div className="gen-quiz-content">
              <QuizPanel gen={gen} color={gen.color} />
            </div>
          )}

          {/* NAVIGATION */}
          <div className="gen-nav">
            <button
              className="gen-nav-btn"
              onClick={() => { setGenActiva((i) => Math.max(0, i - 1)); setTab('info'); }}
              disabled={genActiva === 0}
            >
              ← Anterior
            </button>
            <span className="gen-nav-indicator" style={{ color: gen.color }}>
              {genActiva + 1} / {GENERACIONES.length}
            </span>
            <button
              className="gen-nav-btn"
              onClick={() => { setGenActiva((i) => Math.min(GENERACIONES.length - 1, i + 1)); setTab('info'); marcarProgreso(gen.id); }}
              disabled={genActiva === GENERACIONES.length - 1}
              style={{ background: gen.color, color: '#000' }}
            >
              Siguiente →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeneracionesComputadorasPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Paleta ─────────────────────────────────── */
const C = {
  cpu:'#00f2ff', mem:'#a855f7', io:'#22c55e',
  busA:'#ff5722', busD:'#f59e0b', busC:'#3b82f6',
  bg:'#0d0d10', border:'rgba(255,255,255,0.10)',
};

/* ── 20 Preguntas ───────────────────────────── */
const QUESTIONS = [
  { q:'¿Quién propuso la arquitectura que usa una sola memoria para datos e instrucciones?', opts:['Alan Turing','John von Neumann','Blaise Pascal','Ada Lovelace'], a:1, exp:'Von Neumann la describió en 1945.' },
  { q:'¿Qué realiza la ALU?', opts:['Almacena archivos','Cálculos matemáticos y lógicos','Controla periféricos','Enfría la CPU'], a:1, exp:'La ALU es el motor de cálculo de la CPU.' },
  { q:'¿Qué componente coordina el flujo dentro de la CPU?', opts:['RAM','Unidad de Control','Disco Rígido','Bus de Datos'], a:1, exp:'La UC actúa como director de orquesta del sistema.' },
  { q:'El "cuello de botella de Von Neumann" se debe a…', opts:['Calor de la CPU','Bus compartido entre instrucciones y datos','Falta de RAM','Monitor lento'], a:1, exp:'CPU y Memoria comparten el mismo bus, limitando la velocidad.' },
  { q:'¿Qué bus apunta la posición de memoria a leer?', opts:['Bus de Datos','Bus de Control','Bus de Direcciones','Bus USB'], a:2, exp:'Bus de Direcciones: indica la ubicación en RAM.' },
  { q:'¿Qué registro guarda la dirección de la próxima instrucción?', opts:['Acumulador','Program Counter (PC)','Instruction Register','Stack Pointer'], a:1, exp:'PC apunta siempre a la instrucción siguiente.' },
  { q:'¿Qué contiene el Instruction Register (IR)?', opts:['La dirección PC','La instrucción actual','El resultado de la ALU','La dirección de E/S'], a:1, exp:'IR guarda el código de operación mientras la UC lo decodifica.' },
  { q:'Primera fase del ciclo de instrucción:', opts:['Decode','Execute','Fetch','Store'], a:2, exp:'Fetch: traer la instrucción desde RAM a la CPU.' },
  { q:'¿Qué bus lleva la señal "Lectura/Escritura"?', opts:['Bus de Datos','Bus de Direcciones','Bus de Control','Bus Serial'], a:2, exp:'Bus de Control: sincroniza todo el sistema.' },
  { q:'¿Dónde residen programas antes de ejecutarse?', opts:['Monitor','RAM (Memoria Principal)','Solo el PC','La ALU'], a:1, exp:'Datos e instrucciones se cargan en RAM para ser procesados.' },
  { q:'¿Qué arquitectura separa la memoria de datos e instrucciones?', opts:['Von Neumann','Harvard','x86','RISC'], a:1, exp:'Harvard usa buses independientes, evitando el cuello de botella.' },
  { q:'¿Qué parte de la CPU activa la operación correcta en la ALU?', opts:['Reloj','Unidad de Control','Registro de Estado','Caché'], a:1, exp:'La UC decodifica y envía señales a la ALU.' },
  { q:'¿Qué sucede en la fase "Write-back" / Store?', opts:['Se apaga la PC','Se borra la RAM','El resultado se guarda en memoria o registros','Se pide nueva dirección'], a:2, exp:'Es el paso final donde el resultado queda registrado.' },
  { q:'¿El bus de datos es bidireccional?', opts:['No, solo va a la CPU','Sí, permite lectura y escritura','Solo en PCs viejas','Depende del SO'], a:1, exp:'Debe permitir que la información entre y salga de la CPU.' },
  { q:'¿Qué registro guarda el resultado temporal de la ALU?', opts:['Program Counter','Acumulador','RAM','BIOS'], a:1, exp:'El acumulador guarda el resultado inmediato de la operación.' },
  { q:'La RAM en este modelo es…', opts:['Permanente','Volátil','Solo lectura','Mecánica'], a:1, exp:'Volátil: los datos se pierden sin suministro eléctrico.' },
  { q:'¿Aumentar solo la velocidad de CPU resuelve el cuello de botella?', opts:['Sí, siempre','No, se necesita mayor ancho de banda en el bus','Sí, con un i7','Depende de la GPU'], a:1, exp:'De nada sirve una CPU veloz si el bus es lento y estrecho.' },
  { q:'¿Qué bus determina la cantidad máxima de memoria direccionable?', opts:['Bus de Direcciones','Bus de Datos','Bus de Control','Bus USB'], a:0, exp:'El ancho del bus de direcciones (32/64 bits) define el límite.' },
  { q:'¿Cómo se comunica el sistema con teclado y pantalla?', opts:['UC directamente','Unidad de Entrada/Salida','Caché L1','Buses internos'], a:1, exp:'Los periféricos se conectan a la Unidad de E/S.' },
  { q:'Unidad mínima de información que viaja por los buses:', opts:['Byte','Paquete','Bit','Kilobyte'], a:2, exp:'Un bit (0 ó 1) es la unidad fundamental de la transferencia digital.' },
];

const PHASES = ['IDLE','FETCH','DECODE','EXECUTE','STORE'];
const PHASE_INFO = {
  IDLE:    { label:'⏸ Listo',    bus:null,   log:'💡 Sistema listo. Presioná "▶ Iniciar Ciclo".' },
  FETCH:   { label:'📡 FETCH',   bus:'addr', log:'📡 FETCH: PC envía la dirección por el BUS DE DIRECCIONES.' },
  DECODE:  { label:'🧠 DECODE',  bus:'data', log:'📥 DECODE: La instrucción llega a CPU por el BUS DE DATOS.' },
  EXECUTE: { label:'⚡ EXECUTE', bus:'ctrl', log:'⚡ EXECUTE: La ALU opera. BUS DE CONTROL activo.' },
  STORE:   { label:'💾 STORE',   bus:'data', log:'💾 STORE: El resultado se escribe. BUS DE DATOS activo.' },
};
const MEM = ['LOAD 42','ADD 15','SUB 07','STR 57','MUL 03','CMP 10','JMP 0A','HLT 00'];

export default function ArquitecturaVonNeumannPage() {

  const [phaseIdx, setPhaseIdx] = useState(0);
  const [log,      setLog]      = useState(PHASE_INFO.IDLE.log);
  const [cycles,   setCycles]   = useState(0);
  const [pc,       setPc]       = useState(0);

  const [started, setStarted] = useState(false);
  const [qIdx,    setQIdx]    = useState(0);
  const [score,   setScore]   = useState(0);
  const [chosen,  setChosen]  = useState(null);
  const [done,    setDone]    = useState(false);

  const phase = PHASES[phaseIdx];
  const pInfo = PHASE_INFO[phase];
  const activeB = pInfo.bus;

  const advance = () => {
    const next = (phaseIdx + 1) % PHASES.length;
    const nextPhase = PHASES[next];
    setPhaseIdx(next);
    setLog(PHASE_INFO[nextPhase].log);
    if (nextPhase === 'IDLE') { setCycles(c => c+1); setPc(p => (p+1)%8); }
  };

  const pickAnswer = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s+1);
  };

  const nextQuestion = () => {
    if (qIdx + 1 < QUESTIONS.length) { setQIdx(q => q+1); setChosen(null); }
    else setDone(true);
  };

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); setStarted(false); };

  const busColor = (key) => activeB === key
    ? (key==='addr' ? C.busA : key==='data' ? C.busD : C.busC)
    : 'rgba(255,255,255,0.06)';

  const BASE = import.meta.env.BASE_URL || '/';

  return (
    <>
      <style>{`
        .vn-page { padding: 1rem; max-width: 1100px; margin: 0 auto; font-family: system-ui, sans-serif; color: var(--text-main, #eee); }
        .vn-page * { box-sizing: border-box; }
        .vn-h1 { text-align:center; font-size:clamp(1.5rem,4vw,2.2rem); font-weight:900; margin:0 0 0.25rem;
          background:linear-gradient(120deg,#00f2ff,#7000ff);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .vn-sub { text-align:center; opacity:0.6; font-size:0.9rem; margin-bottom:1.5rem; }

        /* ─ Simulador ─ */
        .vn-sim-box { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.25rem; margin-bottom:1.5rem; }
        .vn-grid { display:grid; grid-template-columns:1fr 60px 1fr; gap:0.75rem; align-items:start; }
        .vn-buses { display:flex; flex-direction:column; justify-content:center; gap:1.8rem; padding:1.5rem 0; height:100%; }
        .vn-bus-track { height:8px; border-radius:4px; position:relative; transition:background 0.4s,box-shadow 0.4s; }
        .vn-bus-label { position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-size:0.5rem; font-weight:800; white-space:nowrap; opacity:0.8; }
        .vn-comp { border-radius:14px; padding:0.9rem; display:flex; flex-direction:column; gap:0.5rem; border:1.5px solid; min-height:200px; }
        .vn-reg { display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; padding:0.3rem 0.5rem; background:rgba(255,255,255,0.04); border-radius:6px; gap:0.5rem; }
        .vn-mem-row { display:flex; justify-content:space-between; font-size:0.7rem; padding:3px 6px; border-radius:4px; }
        .vn-chip { flex:1; text-align:center; padding:0.2rem; border-radius:6px; font-size:0.7rem; }
        .vn-io { grid-column:1 / 4; display:flex; justify-content:space-around; align-items:center;
          background:rgba(34,197,94,0.03); border:1.5px solid #22c55e; border-radius:12px; padding:0.6rem; margin-top:0.25rem; }
        .vn-io-sep { width:2px; height:36px; background:rgba(34,197,94,0.4); }
        .vn-io-block { text-align:center; }
        .vn-io-block small { display:block; font-size:0.6rem; color:#22c55e; font-weight:800; }
        .vn-ctrl { display:flex; flex-direction:column; gap:0.6rem; margin-top:1rem; }
        .vn-ctrl-row { display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap; }
        .vn-log { flex:1; background:#000; border-radius:10px; padding:0.6rem 1rem; font-family:monospace; font-size:0.78rem;
          border-left:4px solid #00f2ff; min-height:40px; color:#a0f2ff; }
        .vn-badge { padding:0.25rem 0.8rem; border-radius:20px; font-size:0.72rem; font-weight:800; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); white-space:nowrap; }
        .vn-bus-pills { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .vn-pill { padding:3px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; color:#000; transition:opacity 0.3s; }
        .btn-vn-p { cursor:pointer; padding:0.6rem 1.2rem; border-radius:12px; font-weight:800; font-size:0.88rem; border:none; background:#00f2ff; color:#000; transition:transform .15s; }
        .btn-vn-p:hover { transform:scale(1.04); filter:brightness(1.1); }

        /* ─ Sección educativa ─ */
        .vn-edu-section { margin:2rem 0; }
        .vn-edu-section h2 { text-align:center; font-size:clamp(1.2rem,3vw,1.6rem); font-weight:900; margin:0 0 1.5rem;
          background:linear-gradient(120deg,#00f2ff,#7000ff);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .vn-edu-card { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; align-items:center;
          background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.5rem; margin-bottom:1.25rem; }
        .vn-edu-card-alt { direction:rtl; }
        .vn-edu-card-alt > * { direction:ltr; }
        .vn-edu-img-wrap { border-radius:14px; overflow:hidden; }
        .vn-edu-img { width:100%; height:auto; display:block; border-radius:14px; border:1px solid rgba(255,255,255,.08); }
        .vn-edu-text h3 { margin:0 0 0.75rem; font-size:1.05rem; }
        .vn-edu-text p { font-size:0.88rem; line-height:1.6; opacity:0.9; margin:0 0 0.6rem; }
        .vn-edu-text ul { font-size:0.85rem; line-height:1.7; opacity:0.85; margin:0; padding-left:1.2rem; }
        .vn-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin:0.75rem 0; }

        /* ─ Quiz ─ */
        .vn-quiz-box { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.25rem; }
        .vn-progress { height:5px; background:rgba(255,255,255,.08); border-radius:3px; margin-bottom:1.25rem; }
        .vn-progress-fill { height:100%; border-radius:3px; background:#00f2ff; transition:width .3s; }
        .vn-q-text { font-size:1rem; font-weight:700; margin-bottom:1.25rem; line-height:1.5; }
        .vn-options { display:flex; flex-direction:column; gap:0.6rem; }
        .vn-opt { width:100%; display:flex; align-items:flex-start; gap:0.75rem; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.1); border-radius:12px;
          padding:0.85rem 1rem; color:#fff; cursor:pointer; text-align:left; font-size:0.9rem; line-height:1.4; transition:all 0.2s; }
        .vn-opt:hover:not(:disabled) { background:rgba(255,255,255,.09); border-color:#00f2ff; }
        .vn-opt.correct { background:rgba(34,197,94,.18) !important; border-color:#22c55e !important; }
        .vn-opt.wrong   { background:rgba(239,68,68,.18)  !important; border-color:#ef4444 !important; }
        .vn-opt-letter  { flex-shrink:0; opacity:0.45; font-weight:900; font-size:0.85rem; }
        .vn-feedback { margin-top:1rem; padding:1rem; border-radius:12px; background:rgba(255,255,255,0.04); font-size:0.85rem; line-height:1.5; }
        .vn-cycle-steps { display:flex; flex-direction:column; gap:0.5rem; margin:0.75rem 0; }
        .vn-cycle-step { display:flex; gap:0.75rem; align-items:flex-start; padding:0.6rem; background:rgba(255,255,255,0.03); border-radius:10px; border-left:3px solid; }
        .vn-cycle-step span:first-child { font-weight:800; white-space:nowrap; font-size:0.82rem; }
        .vn-cycle-step span:last-child { font-size:0.82rem; opacity:0.85; }

        /* ─ MOBILE ─ */
        @media (max-width:650px) {
          .vn-page    { padding:0.75rem; }
          .vn-sim-box { padding:0.9rem; }
          .vn-grid    { grid-template-columns:1fr; gap:0.75rem; }
          .vn-buses   { flex-direction:row; height:50px; padding:0; gap:0.75rem; justify-content:stretch; align-items:center; }
          .vn-bus-track { flex:1; height:8px; }
          .vn-bus-label { top:-14px; }
          .vn-io      { grid-column:1; }
          .vn-comp    { min-height:auto; }
          .vn-ctrl-row { flex-direction:column; align-items:flex-start; }
          .vn-log     { width:100%; }
          .vn-edu-card { grid-template-columns:1fr; }
          .vn-edu-card-alt { direction:ltr; }
          .vn-compare-grid { grid-template-columns:1fr; }
          .vn-quiz-box { padding:0.9rem; }
          .vn-q-text  { font-size:0.95rem; }
          .vn-opt     { font-size:0.85rem; padding:0.75rem; }
        }
      `}</style>

      <div className="vn-page">
        <Link to="/" style={{ display:'inline-block', padding:'0.4rem 1rem', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:8, color:'#fff', textDecoration:'none', fontSize:'0.85rem', marginBottom:'1rem' }}>
          ← Volver
        </Link>

        <h1 className="vn-h1">Modelo de Von Neumann</h1>
        <p className="vn-sub">Simulador interactivo del ciclo de instrucción</p>

        {/* ══ SIMULADOR ══════════════════════════ */}
        <div className="vn-sim-box">
          <div className="vn-grid">
            {/* CPU */}
            <div className="vn-comp" style={{ borderColor:C.cpu, background:'rgba(0,242,255,0.03)' }}>
              <h3 style={{ color:C.cpu, margin:0, fontSize:'0.95rem', fontWeight:800 }}>🖥 CPU</h3>
              <div className="vn-reg"><span>PC</span><code>0x{pc.toString(16).padStart(2,'0').toUpperCase()}</code></div>
              <div className="vn-reg"><span>IR (Instrucción)</span><code>{phase!=='IDLE'&&phase!=='FETCH' ? MEM[pc] : '???'}</code></div>
              <div className="vn-reg"><span>ACC</span><code>{phase==='STORE' ? 57 : '0'}</code></div>
              <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.5rem' }}>
                <span className="vn-chip" style={{ background:'rgba(0,242,255,.1)', border:`1px solid ${C.cpu}40`, color:C.cpu }}>ALU</span>
                <span className="vn-chip" style={{ background:'rgba(0,242,255,.1)', border:`1px solid ${C.cpu}40`, color:C.cpu }}>UC</span>
              </div>
            </div>

            {/* BUSES */}
            <div className="vn-buses">
              <div className="vn-bus-track" style={{ background:busColor('addr'), boxShadow:activeB==='addr'?`0 0 10px ${C.busA}`:'none' }}>
                <span className="vn-bus-label" style={{ color:activeB==='addr'?C.busA:'rgba(255,255,255,.5)' }}>Dir.</span>
              </div>
              <div className="vn-bus-track" style={{ background:busColor('data'), boxShadow:activeB==='data'?`0 0 10px ${C.busD}`:'none' }}>
                <span className="vn-bus-label" style={{ color:activeB==='data'?C.busD:'rgba(255,255,255,.5)' }}>Datos</span>
              </div>
              <div className="vn-bus-track" style={{ background:busColor('ctrl'), boxShadow:activeB==='ctrl'?`0 0 10px ${C.busC}`:'none' }}>
                <span className="vn-bus-label" style={{ color:activeB==='ctrl'?C.busC:'rgba(255,255,255,.5)' }}>Ctrl.</span>
              </div>
            </div>

            {/* RAM */}
            <div className="vn-comp" style={{ borderColor:C.mem, background:'rgba(168,85,247,0.03)' }}>
              <h3 style={{ color:C.mem, margin:0, fontSize:'0.95rem', fontWeight:800 }}>💾 RAM</h3>
              {MEM.map((v,i)=>(
                <div key={i} className="vn-mem-row" style={{ background:i===pc?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.03)', borderRadius:4 }}>
                  <code>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code>
                  <code>{v}</code>
                </div>
              ))}
            </div>

            {/* E/S */}
            <div className="vn-io">
              <div className="vn-io-block"><small>ENTRADA</small><span style={{ fontSize:'1.4rem' }}>⌨️🖱️</span></div>
              <div className="vn-io-sep"/>
              <div className="vn-io-block"><small>SALIDA</small><span style={{ fontSize:'1.4rem' }}>🖥️🔊</span></div>
            </div>
          </div>

          {/* CONTROLES */}
          <div className="vn-ctrl">
            <div className="vn-ctrl-row">
              <button className="btn-vn-p" onClick={advance}>
                {phase==='IDLE' ? '▶ Iniciar Ciclo' : '⏭ Siguiente Paso'}
              </button>
              <span className="vn-badge">{pInfo.label}</span>
              <span className="vn-badge" style={{ marginLeft:'auto' }}>Ciclos: {cycles}</span>
            </div>
            <div className="vn-log">{log}</div>
            <div className="vn-bus-pills">
              {[{k:'addr',l:'Direcciones',c:C.busA},{k:'data',l:'Datos',c:C.busD},{k:'ctrl',l:'Control',c:C.busC}].map(b=>(
                <span key={b.k} className="vn-pill" style={{ background:b.c, opacity:activeB===b.k?1:0.3 }}>{b.l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SECCIÓN EDUCATIVA CON IMÁGENES ════ */}
        <div className="vn-edu-section">
          <h2>📚 Guía Visual de Conceptos</h2>

          {/* CARD 1 – Arquitectura General */}
          <div className="vn-edu-card">
            <div className="vn-edu-img-wrap">
              <img src={`${BASE}assets/vn_diagram.png`} alt="Diagrama de arquitectura Von Neumann" className="vn-edu-img" />
            </div>
            <div className="vn-edu-text">
              <h3 style={{ color:C.cpu }}>🖥 La Arquitectura Funcional</h3>
              <p>El modelo de Von Neumann define la estructura interna de casi todas las computadoras modernas. Tres bloques fundamentales, conectados por buses:</p>
              <ul>
                <li><strong style={{color:C.cpu}}>CPU</strong>: Contiene la <em>ALU</em> (cálculos) y la <em>Unidad de Control</em> (coordinación).</li>
                <li><strong style={{color:C.mem}}>Memoria RAM</strong>: Espacio temporal para instrucciones y datos en ejecución.</li>
                <li><strong style={{color:C.io}}>Unidad de E/S</strong>: Comunicación con teclado, mouse, pantalla e impresora.</li>
              </ul>
              <p style={{ opacity:0.65, fontSize:'0.83rem', marginTop:'0.75rem', padding:'0.6rem', background:'rgba(255,255,255,0.03)', borderRadius:8, borderLeft:`3px solid ${C.cpu}` }}>
                💡 La clave: <strong>instrucciones y datos comparten la misma memoria</strong>, lo que simplificó el diseño de las primeras computadoras.
              </p>
            </div>
          </div>

          {/* CARD 2 – Ciclo de instrucción */}
          <div className="vn-edu-card vn-edu-card-alt">
            <div className="vn-edu-text">
              <h3 style={{ color:'#a855f7' }}>🔄 El Ciclo de Instrucción</h3>
              <p>Cada instrucción pasa por 4 etapas que se repiten miles de millones de veces por segundo:</p>
              <div className="vn-cycle-steps">
                {[
                  { fase:'📡 FETCH',   color:C.busA, desc:'La CPU lee la próxima instrucción desde RAM usando el Bus de Direcciones.' },
                  { fase:'🧠 DECODE',  color:'#a855f7', desc:'La Unidad de Control interpreta qué operación debe realizarse.' },
                  { fase:'⚡ EXECUTE', color:C.cpu,  desc:'La ALU realiza el cálculo u operación indicada por la UC.' },
                  { fase:'💾 STORE',   color:C.io,   desc:'El resultado se guarda en un registro o en la memoria RAM.' },
                ].map(f=>(
                  <div key={f.fase} className="vn-cycle-step" style={{ borderLeftColor:f.color }}>
                    <span style={{ color:f.color }}>{f.fase}</span>
                    <span>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="vn-edu-img-wrap">
              <img src={`${BASE}assets/vn_cycle.png`} alt="Ciclo de instrucción de la CPU" className="vn-edu-img" />
            </div>
          </div>

          {/* CARD 3 – Cuello de botella */}
          <div className="vn-edu-card">
            <div className="vn-edu-img-wrap">
              <img src={`${BASE}assets/vn_bottleneck.png`} alt="Cuello de botella de Von Neumann" className="vn-edu-img" />
            </div>
            <div className="vn-edu-text">
              <h3 style={{ color:'#ef4444' }}>⚠️ El Cuello de Botella</h3>
              <p>Es la principal <strong>limitación del modelo</strong>. La CPU moderna es <em>miles de veces más rápida</em> que la transferencia de datos desde RAM.</p>
              <p>Como instrucciones y datos comparten el <strong>mismo bus</strong>, se genera un congestionamiento: la CPU <em>espera</em> mientras los datos viajan lentamente.</p>
              <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'0.75rem', marginTop:'0.5rem' }}>
                <p style={{ margin:0, fontSize:'0.82rem' }}>🔬 <strong>Soluciones modernas:</strong> caché L1/L2/L3, buses de mayor ancho, memoria DDR5 y arquitecturas Harvard modificada en chips ARM.</p>
              </div>
            </div>
          </div>

          {/* CARD 4 – Von Neumann vs Harvard */}
          <div className="vn-edu-card vn-edu-card-alt">
            <div className="vn-edu-text">
              <h3 style={{ color:C.mem }}>🔀 Von Neumann vs. Harvard</h3>
              <p>La arquitectura Harvard resolvió el cuello de botella separando físicamente la memoria:</p>
              <div className="vn-compare-grid">
                <div style={{ background:'rgba(0,242,255,0.05)', border:`1px solid ${C.cpu}40`, borderRadius:10, padding:'0.75rem' }}>
                  <p style={{ color:C.cpu, fontWeight:800, margin:'0 0 0.4rem', fontSize:'0.88rem' }}>Von Neumann</p>
                  <ul style={{ margin:0, paddingLeft:'1.1rem', fontSize:'0.8rem', opacity:0.85 }}>
                    <li>Una sola memoria compartida</li>
                    <li>Un bus para todo</li>
                    <li>Diseño simple</li>
                    <li>Presenta cuello de botella</li>
                  </ul>
                </div>
                <div style={{ background:'rgba(168,85,247,0.05)', border:`1px solid ${C.mem}40`, borderRadius:10, padding:'0.75rem' }}>
                  <p style={{ color:C.mem, fontWeight:800, margin:'0 0 0.4rem', fontSize:'0.88rem' }}>Harvard</p>
                  <ul style={{ margin:0, paddingLeft:'1.1rem', fontSize:'0.8rem', opacity:0.85 }}>
                    <li>Memorias separadas</li>
                    <li>Buses independientes</li>
                    <li>Mayor velocidad</li>
                    <li>Más costosa de implementar</li>
                  </ul>
                </div>
              </div>
              <p style={{ opacity:0.65, fontSize:'0.82rem', marginTop:'0.5rem' }}>📱 Arduino usa Harvard. Las PCs tradicionales, Von Neumann.</p>
            </div>
            <div className="vn-edu-img-wrap">
              <img src={`${BASE}assets/vn_vs_harvard.png`} alt="Comparación Von Neumann vs Harvard" className="vn-edu-img" />
            </div>
          </div>
        </div>

        {/* ══ QUIZ ═══════════════════════════════ */}
        <div className="vn-quiz-box">
          {!started ? (
            <div style={{ textAlign:'center', padding:'1rem 0' }}>
              <h2 style={{ fontSize:'1.5rem', margin:'0 0 0.5rem' }}>🎓 Desafío Von Neumann</h2>
              <p style={{ opacity:0.7, marginBottom:'1.5rem', fontSize:'0.9rem' }}>20 preguntas para evaluar tus conocimientos de arquitectura de computadoras.</p>
              <button className="btn-vn-p" onClick={()=>setStarted(true)}>Comenzar Test</button>
            </div>
          ) : done ? (
            <div style={{ textAlign:'center', padding:'1rem 0' }}>
              <div style={{ fontSize:'3rem', margin:'0 0 0.5rem' }}>{score>=18?'🏆':score>=12?'🥈':'🥉'}</div>
              <h2 style={{ margin:'0 0 0.5rem' }}>Resultado: {score} / {QUESTIONS.length}</h2>
              <p style={{ opacity:0.7, marginBottom:'1.5rem', fontSize:'0.9rem' }}>{score>=15?'¡Excelente dominio teórico!':'Repasá los conceptos y volvé a intentarlo.'}</p>
              <button className="btn-vn-p" onClick={reset}>Reintentar</button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                <span style={{ fontWeight:800, color:C.cpu, fontSize:'0.85rem' }}>Pregunta {qIdx+1} / {QUESTIONS.length}</span>
                <span style={{ fontWeight:700, fontSize:'0.85rem' }}>✅ {score}</span>
              </div>
              <div className="vn-progress">
                <div className="vn-progress-fill" style={{ width:`${(qIdx/QUESTIONS.length)*100}%` }}/>
              </div>
              <p className="vn-q-text">{QUESTIONS[qIdx].q}</p>
              <div className="vn-options">
                {QUESTIONS[qIdx].opts.map((opt,i)=>{
                  const isCorrect = i===QUESTIONS[qIdx].a;
                  let cls = 'vn-opt';
                  if (chosen!==null) { if (isCorrect) cls+=' correct'; else if (chosen===i) cls+=' wrong'; }
                  return (
                    <button key={i} className={cls} disabled={chosen!==null} onClick={()=>pickAnswer(i)}>
                      <span className="vn-opt-letter">{String.fromCharCode(65+i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {chosen!==null && (
                <div className="vn-feedback" style={{ borderLeft:`4px solid ${chosen===QUESTIONS[qIdx].a?'#22c55e':'#ef4444'}` }}>
                  <strong>{chosen===QUESTIONS[qIdx].a?'✅ Correcto.':'❌ Incorrecto.'}</strong> {QUESTIONS[qIdx].exp}
                  <br/>
                  <button className="btn-vn-p" style={{ marginTop:'0.75rem', width:'100%' }} onClick={nextQuestion}>
                    {qIdx+1<QUESTIONS.length?'Siguiente →':'Ver Resultado'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

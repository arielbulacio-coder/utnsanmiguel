import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Colores ─────────────────────────────── */
const C = {
  cpu: '#00f2ff',
  mem: '#a855f7',
  io:  '#22c55e',
  busD: '#f59e0b',
  busA: '#ff5722',
  busC: '#3b82f6',
  bg:   '#0d0d10',
  card: 'rgba(255,255,255,0.04)',
  border:'rgba(255,255,255,0.10)',
};

/* ── 20 Preguntas ───────────────────────────────────────────────── */
const QUESTIONS = [
  { q:'¿Quién propuso la arquitectura que usa una sola memoria para datos e instrucciones?', opts:['Alan Turing','John von Neumann','Blaise Pascal','Ada Lovelace'], a:1, exp:'Von Neumann la describió en 1945 y revolucionó el diseño de computadoras.' },
  { q:'¿Qué realiza la ALU?', opts:['Almacena archivos','Cálculos mate­mático-lógi­cos','Controla periféricos','Enfría la CPU'], a:1, exp:'Arithmetic Logic Unit: el motor de cálculo de la CPU.' },
  { q:'¿Qué componente coordina el flujo dentro de la CPU?', opts:['RAM','Unidad de Control','Disco Rígido','Bus de Datos'], a:1, exp:'La UC actúa como director de orquesta del sistema.' },
  { q:'El "cuello de botella de Von Neumann" se debe a…', opts:['Calor de la CPU','Bus compartido entre instrucciones y datos','Falta de RAM','Monitor lento'], a:1, exp:'CPU y Memoria comparten el mismo bus, limitando la velocidad total.' },
  { q:'¿Qué bus sale de la CPU y apunta la posición de memoria a leer?', opts:['Bus de Datos','Bus de Control','Bus de Direcciones','Bus USB'], a:2, exp:'Bus de Direcciones: unidireccional, indica la ubicación en RAM.' },
  { q:'¿Qué registro guarda la dirección de la PRÓXIMA instrucción?', opts:['Acumulador','Program Counter (PC)','Instruction Register','Stack Pointer'], a:1, exp:'PC siempre apunta a la instrucción siguiente en la lista.' },
  { q:'¿Qué contiene el Instruction Register (IR)?', opts:['La dirección de la PC','La instrucción actual en ejecución','El resultado de la ALU','La dirección de E/S'], a:1, exp:'IR guarda el código de op­ración mientras la UC lo decodifica.' },
  { q:'Primera fase del ciclo de instrucción:', opts:['Decode','Execute','Fetch','Store'], a:2, exp:'Fetch: traer la instrucción desde RAM a la CPU.' },
  { q:'¿Qué bus lleva la señal "Lectura/Escritura"?', opts:['Bus de Datos','Bus de Direcciones','Bus de Control','Bus Serial'], a:2, exp:'Bus de Control: sincroniza todo el sistema.' },
  { q:'¿Dónde residen programas antes de ejecutarse?', opts:['Monitor','RAM (Memoria Principal)','Solo el PC','La ALU'], a:1, exp:'Instrucciones y datos se cargan en RAM para ser procesados.' },
  { q:'¿Qué arquitectura separa físicamente memoria de datos e instrucciones?', opts:['Von Neumann','Harvard','x86','RISC'], a:1, exp:'Harvard usa buses independientes, evitando el cuello de botella.' },
  { q:'¿Qué parte de la CPU envía señales de habilitación a la ALU?', opts:['Reloj','Unidad de Control','Registro de Estado','Caché'], a:1, exp:'La UC decodifica y activa la operación correcta en la ALU.' },
  { q:'¿Qué sucede en la fase "Write-back"?', opts:['Se apaga la PC','Se borra la RAM','El resultado se guarda en memoria o registros','Se pide nueva dirección'], a:2, exp:'El resultado del cálculo se hace persistente en el destino.' },
  { q:'¿El bus de datos es bidireccional?', opts:['No, solo va a la CPU','Sí, permite lectura y escritura','Solo en PCs antiguas','Depende del SO'], a:1, exp:'Debe permitir que la información entre y salga de la CPU.' },
  { q:'¿Qué registro guarda temporalmente el resultado de la ALU?', opts:['Program Counter','Acumulador','RAM','BIOS'], a:1, exp:'Acumulador: registro de alta velocidad para resultados inmediatos.' },
  { q:'La RAM en este modelo es…', opts:['Permanente','Volátil','Solo lectura','Mecánica'], a:1, exp:'Volátil: los datos se pierden sin suministro eléctrico.' },
  { q:'¿Aumentar solo la velocidad de CPU resuelve el cuello de botella?', opts:['Sí, siempre','No, se necesita mayor ancho de banda en el bus','Sí, con i7','Depende de la GPU'], a:1, exp:'CPU ultra rápida es inútil si el bus es estrecho y lento.' },
  { q:'¿Qué bus determina la cantidad máxima de memoria direccionable?', opts:['Bus de Direcciones','Bus de Datos','Bus de Control','Bus USB'], a:0, exp:'El ANCHO del bus de direcciones (32/64 bits) define el límite.' },
  { q:'¿Cómo se comunica el sistema con teclado y pantalla?', opts:['UC directamente','Unidad de Entrada/Salida','Caché L1','Buses internos'], a:1, exp:'Los periféricos se conectan a la Unidad de E/S.' },
  { q:'Unidad mínima de información que viaja por los buses:', opts:['Byte','Paquete','Bit','Kilobyte'], a:2, exp:'Un bit (0 ó 1) es la piedra fundamental de toda transferencia digital.' },
];

/* ── Fases del ciclo ─────────────────────── */
const PHASES = ['IDLE','FETCH','DECODE','EXECUTE','STORE'];
const PHASE_INFO = {
  IDLE:    { label:'⏸ Listo',    bus: null,   log:'💡 Sistema listo. Presioná "▶ Iniciar Ciclo".' },
  FETCH:   { label:'📡 FETCH',   bus:'addr',  log:'📡 FETCH: PC envía la dirección por el BUS DE DIRECCIONES.' },
  DECODE:  { label:'🧠 DECODE',  bus:'data',  log:'📥 DECODE: La instrucción llega a la CPU por el BUS DE DATOS.' },
  EXECUTE: { label:'⚡ EXECUTE', bus:'ctrl',  log:'⚡ EXECUTE: La ALU realiza el cálculo. BUS DE CONTROL activo.' },
  STORE:   { label:'💾 STORE',   bus:'data',  log:'💾 STORE: El resultado se guarda. BUS DE DATOS activo.' },
};

/* ════════════════════════════════════════════ */
/*               COMPONENTE PRINCIPAL           */
/* ════════════════════════════════════════════ */
export default function ArquitecturaVonNeumannPage() {
  /* Simulador */
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [log, setLog]           = useState(PHASE_INFO.IDLE.log);
  const [cycles, setCycles]     = useState(0);
  const [pc, setPc]             = useState(0x00);

  /* Quiz */
  const [started,  setStarted]  = useState(false);
  const [qIdx,     setQIdx]     = useState(0);
  const [score,    setScore]    = useState(0);
  const [chosen,   setChosen]   = useState(null);
  const [done,     setDone]     = useState(false);

  const phase   = PHASES[phaseIdx];
  const pInfo   = PHASE_INFO[phase];
  const activeB = pInfo.bus;

  const advancePhase = () => {
    const next = (phaseIdx + 1) % PHASES.length;
    const nextPhase = PHASES[next];
    setPhaseIdx(next);
    setLog(PHASE_INFO[nextPhase].log);
    if (nextPhase === 'IDLE') { setCycles(c => c+1); setPc(p => p+1); }
  };

  const pickAnswer = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s+1);
  };

  const advance = () => {
    if (qIdx + 1 < QUESTIONS.length) { setQIdx(q => q+1); setChosen(null); }
    else setDone(true);
  };

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); setStarted(false); };

  /* ── Bus coloreado dinámicamente ─── */
  const busColor = (key) => {
    if (activeB !== key) return 'rgba(255,255,255,0.06)';
    return key === 'addr' ? C.busA : key === 'data' ? C.busD : C.busC;
  };
  const busGlow  = (key) => activeB === key ? `0 0 10px ${busColor(key)}` : 'none';

  /* ── Estilos inline (todo compacto) ─── */
  const S = {
    page:   { padding:'1rem', maxWidth:1100, margin:'0 auto', fontFamily:'system-ui,sans-serif', color:'var(--text-main,#eee)' },
    back:   { display:'inline-block', padding:'0.4rem 1rem', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, color:'#fff', textDecoration:'none', fontSize:'0.85rem', marginBottom:'1rem' },
    h1:     { textAlign:'center', fontSize:'clamp(1.5rem,4vw,2.4rem)', fontWeight:900, margin:'0 0 0.25rem', background:'linear-gradient(120deg,#00f2ff,#7000ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' },
    sub:    { textAlign:'center', opacity:0.6, fontSize:'0.9rem', marginBottom:'1.5rem' },
    simBox: { background:C.bg, border:`1px solid ${C.border}`, borderRadius:20, padding:'1.5rem', marginBottom:'1.5rem' },

    /* ── Grid del simulador ── */
    grid:   { display:'grid', gridTemplateColumns:'1fr 50px 1fr', gap:'1rem', alignItems:'stretch' },

    /* Columna central (buses) */
    buses:  { display:'flex', flexDirection:'column', justifyContent:'center', gap:'1.2rem', padding:'0.5rem 0' },
    busTrk: (key) => ({ height:8, borderRadius:4, background:busColor(key), boxShadow:busGlow(key), transition:'background 0.4s,box-shadow 0.4s', position:'relative' }),

    /* Cajas de componentes */
    compBox:(borderColor, bg)=>({ background:`rgba(${bg},0.04)`, border:`1.5px solid ${borderColor}`, borderRadius:16, padding:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem' }),
    h3:     (color) => ({ margin:0, fontSize:'1rem', fontWeight:800, color }),
    reg:    { display:'flex', justifyContent:'space-between', fontSize:'0.78rem', padding:'0.3rem 0.5rem', background:'rgba(255,255,255,0.04)', borderRadius:6 },
    memRow: (hi) => ({ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', padding:'3px 6px', borderRadius:4, background: hi ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)' }),

    ioRow:  { gridColumn:'1 / 4', display:'flex', justifyContent:'space-around', alignItems:'center', background:`rgba(34,197,94,0.04)`, border:`1.5px solid ${C.io}`, borderRadius:14, padding:'0.75rem' },

    /* Controles */
    ctrl:   { display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'1rem' },
    ctrlRow:{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' },
    btn:    (primary) => ({ cursor:'pointer', padding:'0.65rem 1.4rem', borderRadius:12, fontWeight:800, fontSize:'0.9rem', border:'none', background: primary ? C.cpu : 'rgba(255,255,255,0.1)', color: primary ? '#000' : '#fff', transition:'transform 0.15s,filter 0.15s' }),
    log:    { flex:1, background:'#000', borderRadius:10, padding:'0.75rem 1rem', fontFamily:'monospace', fontSize:'0.8rem', borderLeft:`4px solid ${C.cpu}`, minHeight:42, color:'#a0f2ff' },
    badge:  { padding:'0.3rem 0.8rem', borderRadius:20, fontSize:'0.75rem', fontWeight:800, background:'rgba(255,255,255,0.07)', border:`1px solid ${C.border}` },
  };

  const mem = ['LOAD 42','ADD 15','SUB 07','STR 57','MUL 03','CMP 10','JMP 0A','HLT 00'];

  /* ══════════════ RENDER ══════════════ */
  return (
    <div style={S.page}>
      <Link to="/" style={S.back}>← Volver</Link>

      <h1 style={S.h1}>Modelo de Von Neumann</h1>
      <p  style={S.sub}>Simulador interactivo del ciclo de instrucción</p>

      {/* ── SIMULADOR ─────────────────────── */}
      <div style={S.simBox}>

        {/* GRID: CPU | BUSES | RAM */}
        <div style={S.grid}>

          {/* CPU */}
          <div style={S.compBox(C.cpu,'0,242,255')}>
            <h3 style={S.h3(C.cpu)}>🖥 CPU</h3>
            <div style={S.reg}><span>PC (Program Counter)</span><code>0x{pc.toString(16).padStart(2,'0').toUpperCase()}</code></div>
            <div style={S.reg}><span>IR (Instrucción)</span><code>{phase!=='IDLE'&&phase!=='FETCH' ? mem[pc%8] : '???'}</code></div>
            <div style={S.reg}><span>ACC (Acumulador)</span><code>{phase==='STORE' ? Math.floor(Math.random()*99+10) : '0'}</code></div>
            <div style={{ display:'flex', gap:'0.5rem', fontSize:'0.72rem', marginTop:'auto' }}>
              <span style={{ flex:1, textAlign:'center', padding:'0.25rem', borderRadius:8, background:`rgba(0,242,255,0.1)`, border:`1px solid ${C.cpu}40` }}>ALU</span>
              <span style={{ flex:1, textAlign:'center', padding:'0.25rem', borderRadius:8, background:`rgba(0,242,255,0.1)`, border:`1px solid ${C.cpu}40` }}>UC</span>
            </div>
          </div>

          {/* BUSES */}
          <div style={S.buses}>
            <div style={{ textAlign:'center', fontSize:'0.5rem', opacity:0.5, letterSpacing:1 }}>BUSES</div>
            <div style={S.busTrk('addr')}>
              <span style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontSize:'0.5rem', opacity:0.8, whiteSpace:'nowrap' }}>Direc.</span>
            </div>
            <div style={S.busTrk('data')}>
              <span style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontSize:'0.5rem', opacity:0.8, whiteSpace:'nowrap' }}>Datos</span>
            </div>
            <div style={S.busTrk('ctrl')}>
              <span style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontSize:'0.5rem', opacity:0.8, whiteSpace:'nowrap' }}>Control</span>
            </div>
          </div>

          {/* RAM */}
          <div style={S.compBox(C.mem,'168,85,247')}>
            <h3 style={S.h3(C.mem)}>💾 RAM</h3>
            {mem.map((v,i) => (
              <div key={i} style={S.memRow(i === pc%8)}>
                <code>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code>
                <code>{v}</code>
              </div>
            ))}
          </div>

          {/* E/S */}
          <div style={S.ioRow}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.65rem', color:C.io, fontWeight:800 }}>ENTRADA</div>
              <div style={{ fontSize:'1.5rem' }}>⌨️🖱️</div>
            </div>
            <div style={{ width:2, height:40, background:`${C.io}60` }}/>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.65rem', color:C.io, fontWeight:800 }}>SALIDA</div>
              <div style={{ fontSize:'1.5rem' }}>🖥️🔊</div>
            </div>
          </div>
        </div>

        {/* CONTROLES */}
        <div style={S.ctrl}>
          <div style={S.ctrlRow}>
            <button style={S.btn(true)} onClick={advancePhase}>
              {phase === 'IDLE' ? '▶ Iniciar Ciclo' : '⏭ Siguiente Paso'}
            </button>
            <span style={S.badge}>{pInfo.label}</span>
            <span style={{ ...S.badge, marginLeft:'auto' }}>Ciclos: {cycles}</span>
          </div>
          <div style={S.log}>{log}</div>
          <div style={{ display:'flex', gap:'0.5rem', fontSize:'0.72rem' }}>
            {[{k:'addr',l:'Direcciones',c:C.busA},{k:'data',l:'Datos',c:C.busD},{k:'ctrl',l:'Control',c:C.busC}].map(b=>(
              <span key={b.k} style={{ padding:'3px 10px', borderRadius:20, background:b.c, color:'#000', fontWeight:700, opacity: activeB===b.k?1:0.35, transition:'opacity 0.3s' }}>{b.l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUIZ ──────────────────────────── */}
      <div style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:20, padding:'1.5rem' }}>
        {!started ? (
          <div style={{ textAlign:'center', padding:'1rem' }}>
            <h2 style={{ fontSize:'1.6rem', marginBottom:'0.5rem' }}>🎓 Test de Autoevaluación</h2>
            <p style={{ opacity:0.7, marginBottom:'1.5rem' }}>20 preguntas para evaluar tus conocimientos de arquitectura.</p>
            <button style={S.btn(true)} onClick={()=>setStarted(true)}>Comenzar Test</button>
          </div>
        ) : done ? (
          <div style={{ textAlign:'center', padding:'1rem' }}>
            <div style={{ fontSize:'3rem' }}>{score>=18?'🏆':score>=12?'🥈':'🥉'}</div>
            <h2>Resultado: {score} / {QUESTIONS.length}</h2>
            <p style={{ opacity:0.7 }}>{score>=15?'¡Excelente dominio teórico!':'Repasá los conceptos y volvé a intentarlo.'}</p>
            <button style={{ ...S.btn(true), marginTop:'1rem' }} onClick={reset}>Reintentar</button>
          </div>
        ) : (
          <div>
            {/* Barra de progreso */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
              <span style={{ fontWeight:800, color:C.cpu }}>Pregunta {qIdx+1} / {QUESTIONS.length}</span>
              <span style={{ fontWeight:700 }}>✅ {score}</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,0.08)', borderRadius:3, marginBottom:'1.5rem' }}>
              <div style={{ width:`${((qIdx)/QUESTIONS.length)*100}%`, height:'100%', background:C.cpu, borderRadius:3, transition:'width 0.3s' }}/>
            </div>

            <p style={{ fontSize:'1.05rem', fontWeight:700, marginBottom:'1rem' }}>{QUESTIONS[qIdx].q}</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'0.75rem' }}>
              {QUESTIONS[qIdx].opts.map((o,i) => {
                const isCorrect = i === QUESTIONS[qIdx].a;
                const isPicked  = chosen === i;
                let bg = 'rgba(255,255,255,0.04)';
                let border = C.border;
                if (chosen !== null) {
                  if (isCorrect)       { bg = 'rgba(34,197,94,0.18)';  border = '#22c55e'; }
                  else if (isPicked)   { bg = 'rgba(239,68,68,0.18)';  border = '#ef4444'; }
                }
                return (
                  <button key={i} disabled={chosen!==null} onClick={()=>pickAnswer(i)}
                    style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:14, padding:'0.85rem 1rem', color:'#fff', cursor:chosen===null?'pointer':'default', textAlign:'left', fontSize:'0.92rem', transition:'all 0.2s' }}>
                    <span style={{ opacity:0.5, fontWeight:900, marginRight:8 }}>{String.fromCharCode(65+i)}.</span>{o}
                  </button>
                );
              })}
            </div>

            {chosen !== null && (
              <div style={{ marginTop:'1rem', padding:'1rem', borderRadius:14, background:'rgba(255,255,255,0.04)', borderLeft:`4px solid ${chosen===QUESTIONS[qIdx].a?'#22c55e':'#ef4444'}`, fontSize:'0.87rem' }}>
                <p style={{ margin:0 }}><strong>{chosen===QUESTIONS[qIdx].a?'✅ Correcto.':'❌ Incorrecto.'}</strong> {QUESTIONS[qIdx].exp}</p>
                <button style={{ ...S.btn(true), marginTop:'1rem', width:'100%' }} onClick={advance}>
                  {qIdx+1<QUESTIONS.length?'Siguiente →':'Ver Resultado'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .vn-grid-responsive { grid-template-columns: 1fr !important; }
          .vn-io-responsive    { grid-column: 1 !important; }
        }
      `}</style>
    </div>
  );
}

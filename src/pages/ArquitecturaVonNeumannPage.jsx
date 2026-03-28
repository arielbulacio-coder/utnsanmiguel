import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  cpu:'#00f2ff', mem:'#a855f7', io:'#22c55e',
  busA:'#ff5722', busD:'#f59e0b', busC:'#3b82f6',
  bg:'#0d0d10', border:'rgba(255,255,255,0.10)',
  harv:'#f97316',
};

/* ── Preguntas Von Neumann ─────────────────── */
const Q_VN = [
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

/* ── Preguntas Harvard ─────────────────────── */
const Q_HV = [
  { q:'¿En qué se diferencia principalmente la arquitectura Harvard del modelo de Von Neumann?', opts:['En el tipo de procesador','En tener memorias separadas para datos e instrucciones','En usar más transistores','En no tener buses'], a:1, exp:'Harvard separa físicamente la memoria de programa y datos, con buses independientes.' },
  { q:'¿Cuál de estos dispositivos usa típicamente arquitectura Harvard?', opts:['Una PC de escritorio','Un laptop con Windows','Un microcontrolador Arduino','Un servidor web'], a:2, exp:'El ATmega328 de Arduino usa arquitectura Harvard pura.' },
  { q:'¿Qué ventaja principal ofrece la arquitectura Harvard sobre Von Neumann?', opts:['Menor costo','Puede acceder a instrucciones y datos simultáneamente','Usa menos energía','Tiene más RAM'], a:1, exp:'Al tener buses separados, puede leer instrucciones y datos al mismo tiempo, sin cuello de botella.' },
  { q:'¿Qué tipo de memoria usa Harvard para guardar el programa en microcontroladores?', opts:['RAM volátil','Memoria Flash (ROM)','Disco rígido','Memoria caché'], a:1, exp:'Los programas se graban en Flash/ROM, mientras los datos van en la RAM interna.' },
  { q:'¿Qué es la "Arquitectura Harvard Modificada"?', opts:['Una variante donde la CPU tiene dos corazones','Una versión que unifica los buses de direcciones','Una variante que permite acceder a instrucciones como datos en ciertos contextos','Una arquitectura sin unidad de control'], a:2, exp:'La mayoría de PCs modernas la usan: caché L1 dividido en instrucciones y datos, pero memoria principal unificada.' },
  { q:'¿Qué procesador popular en smartphones usa una variante de arquitectura Harvard?', opts:['Intel x86','ARM Cortex','AMD Ryzen','PowerPC'], a:1, exp:'Los procesadores ARM Cortex-A (usados en Android/iOS) usan Harvard Modificada con cachés L1 separados.' },
  { q:'En un microcontrolador Harvard, la memoria de programa es típicamente…', opts:['Volátil y borrable','No volátil (Flash/EEPROM)','Solo en RAM','Parte de la CPU'], a:1, exp:'La memoria Flash persiste el programa incluso sin energía, a diferencia de la RAM.' },
  { q:'¿Cómo conecta Harvard la CPU con sus dos memorias separadas?', opts:['Un único bus compartido','Dos buses independientes (uno por memoria)','Conexión inalámbrica','Solo por interrupciones'], a:1, exp:'Bus de instrucciones separado del bus de datos: esto elimina el cuello de botella.' },
  { q:'¿Qué significa que la memoria de programa en Harvard sea "de solo lectura" durante ejecución?', opts:['Que no puede ejecutar nada','Que el programa no puede modificarse a sí mismo en ejecución','Que no hay datos','Que la CPU no puede leerla'], a:1, exp:'El programa compilado vive en Flash y la CPU lo lee, pero no puede sobrescribirlo en tiempo de ejecución.' },
  { q:'¿Qué aplicación industrial usa comúnmente arquitectura Harvard pura?', opts:['Servidores de base de datos','Sistemas de control embebido (PLCs, DSP)','Computadoras de escritorio','Videoconsolas modernas'], a:1, exp:'PLCs industriales y DSPs para control de motores y procesamiento de señales usan Harvard por su velocidad predecible.' },
  { q:'¿Por qué Harvard es preferida en sistemas de tiempo real (RTOS)?', opts:['Porque es más barata','Porque el tiempo de acceso a instrucciones es constante y predecible','Porque usa menos energía','Por su compatibilidad con Windows'], a:1, exp:'El acceso simultáneo a instrucciones y datos garantiza tiempos de respuesta deterministas, crítico en RTOS.' },
  { q:'¿Qué familia de microcontroladores de Microchip usa arquitectura Harvard?', opts:['ARM','MIPS','PIC','RISC-V'], a:2, exp:'Los PIC (Peripheral Interface Controller) son un ejemplo clásico de Harvard: bus de instrucciones de 14/16 bits separado del bus de datos de 8 bits.' },
  { q:'En la arquitectura Harvard Modificada de un procesador moderno, ¿qué tiene separado?', opts:['Los registros de la ALU','Las cachés L1 de instrucciones y datos','El disco rígido y la RAM','La pantalla y el teclado'], a:1, exp:'El caché L1 dividido permite acceso simultáneo a instrucciones y datos, unificándose a partir de L2.' },
  { q:'¿Cuál es la desventaja principal de Harvard pura frente a Von Neumann?', opts:['Es más lenta','No puede ejecutar programas','La memoria de instrucciones no puede usarse para datos aunque esté libre','No tiene buses'], a:2, exp:'En Harvard pura, si el programa es pequeño y sobra memoria, ese espacio no puede usarse para datos: es inflexible.' },
  { q:'¿Qué tipo de procesamiento se beneficia MÁS de la arquitectura Harvard?', opts:['Edición de documentos de texto','Procesamiento de señales de audio/video en tiempo real','Navegación web','Gestión de bases de datos'], a:1, exp:'El DSP (Digital Signal Processor) Harvard puede procesar muestras de audio/video continuamente sin parar la CPU.' },
  { q:'¿Por qué Arduino puede ejecutar código sin sistema operativo?', opts:['Porque usa Windows embebido','Porque la arquitectura Harvard separa el programa del SO','Porque el programa vive en Flash y se ejecuta directamente','Porque no tiene RAM'], a:2, exp:'El programa grabado en Flash se ejecuta directamente al encender: no necesita cargarse en RAM ni OS.' },
  { q:'Un DSP de procesamiento de audio usa Harvard porque…', opts:['Es más barato','El bus de instrucciones no compite con el de muestras de audio, dando máxima velocidad','Usa menos energía','Tiene más memoria'], a:1, exp:'El DSP puede leer la siguiente instrucción mientras transfiere muestras de audio: total paralelismo.' },
  { q:'¿En qué nivel de caché de una CPU moderna se implementa Harvard Modificada?', opts:['L3','L2','L1','Ninguna'], a:2, exp:'Caché L1 está dividido: L1-I (instrucciones) y L1-D (datos). A partir de L2, la caché es unificada (Von Neumann).' },
  { q:'¿Qué sucede si un programa en Harvard intenta escribir en su propia memoria de instrucciones?', opts:['Ejecuta el dato como instrucción','Genera un error o excepción de hardware','Se borra la RAM','Se apaga el sistema'], a:1, exp:'Los microcontroladores Harvard lanzan una excepción o simplemente no permiten la operación, ya que el bus de programa es de solo lectura en ejecución.' },
  { q:'¿Cuál de estos describe mejor la tendencia actual de los procesadores modernos?', opts:['Harvard pura por su simplicidad','Von Neumann porque es más barata','Harvard Modificada: cachés L1 separados, memoria principal unificada','Ninguna de las dos se usa hoy'], a:2, exp:'Prácticamente todos los procesadores modernos (Intel, AMD, ARM) usan Harvard Modificada internamente para aprovechar lo mejor de ambos mundos.' },
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

/* ── Mini Quiz Component ─────────────────── */
function Quiz({ questions, accentColor, title, icon }) {
  const [started,  setStarted]  = useState(false);
  const [qIdx,     setQIdx]     = useState(0);
  const [score,    setScore]    = useState(0);
  const [chosen,   setChosen]   = useState(null);
  const [done,     setDone]     = useState(false);

  const pick = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === questions[qIdx].a) setScore(s => s+1);
  };

  const next = () => {
    if (qIdx + 1 < questions.length) { setQIdx(q => q+1); setChosen(null); }
    else setDone(true);
  };

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); setStarted(false); };

  return (
    <div className="vn-quiz-box" style={{ borderTop:`3px solid ${accentColor}` }}>
      {!started ? (
        <div style={{ textAlign:'center', padding:'1rem 0' }}>
          <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>{icon}</div>
          <h2 style={{ fontSize:'1.4rem', margin:'0 0 0.5rem', color:accentColor }}>{title}</h2>
          <p style={{ opacity:0.7, marginBottom:'1.5rem', fontSize:'0.9rem' }}>20 preguntas para evaluar tus conocimientos.</p>
          <button className="btn-vn-quiz" style={{ background:accentColor, color: accentColor === '#f97316' ? '#000' : '#000' }} onClick={()=>setStarted(true)}>
            Comenzar Test
          </button>
        </div>
      ) : done ? (
        <div style={{ textAlign:'center', padding:'1rem 0' }}>
          <div style={{ fontSize:'3rem', margin:'0 0 0.5rem' }}>{score>=18?'🏆':score>=12?'🥈':'🥉'}</div>
          <h2 style={{ margin:'0 0 0.5rem' }}>Resultado: {score} / {questions.length}</h2>
          <p style={{ opacity:0.7, marginBottom:'1.5rem', fontSize:'0.9rem' }}>{score>=15?'¡Excelente!':'Seguí repasando los conceptos.'}</p>
          <button className="btn-vn-quiz" style={{ background:accentColor, color:'#000' }} onClick={reset}>Reintentar</button>
        </div>
      ) : (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <span style={{ fontWeight:800, color:accentColor, fontSize:'0.85rem' }}>Pregunta {qIdx+1} / {questions.length}</span>
            <span style={{ fontWeight:700, fontSize:'0.85rem' }}>✅ {score}</span>
          </div>
          <div className="vn-progress">
            <div className="vn-progress-fill" style={{ width:`${(qIdx/questions.length)*100}%`, background:accentColor }}/>
          </div>
          <p className="vn-q-text">{questions[qIdx].q}</p>
          <div className="vn-options">
            {questions[qIdx].opts.map((opt,i) => {
              const isCorrect = i === questions[qIdx].a;
              let cls = 'vn-opt';
              if (chosen !== null) { if (isCorrect) cls+=' correct'; else if (chosen===i) cls+=' wrong'; }
              return (
                <button key={i} className={cls} disabled={chosen!==null} onClick={()=>pick(i)}>
                  <span className="vn-opt-letter">{String.fromCharCode(65+i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <div className="vn-feedback" style={{ borderLeft:`4px solid ${chosen===questions[qIdx].a?'#22c55e':'#ef4444'}` }}>
              <strong>{chosen===questions[qIdx].a?'✅ Correcto.':'❌ Incorrecto.'}</strong> {questions[qIdx].exp}
              <br/>
              <button className="btn-vn-quiz" style={{ background:accentColor, color:'#000', marginTop:'0.75rem', width:'100%' }} onClick={next}>
                {qIdx+1 < questions.length ? 'Siguiente →' : 'Ver Resultado'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════ */
export default function ArquitecturaVonNeumannPage() {

  const [phaseIdx, setPhaseIdx] = useState(0);
  const [log,      setLog]      = useState(PHASE_INFO.IDLE.log);
  const [cycles,   setCycles]   = useState(0);
  const [pc,       setPc]       = useState(0);

  const phase  = PHASES[phaseIdx];
  const pInfo  = PHASE_INFO[phase];
  const activeB = pInfo.bus;

  const advancePhase = () => {
    const next = (phaseIdx + 1) % PHASES.length;
    const nextPhase = PHASES[next];
    setPhaseIdx(next);
    setLog(PHASE_INFO[nextPhase].log);
    if (nextPhase === 'IDLE') { setCycles(c => c+1); setPc(p => (p+1)%8); }
  };

  const busColor = (key) => activeB === key
    ? (key==='addr' ? C.busA : key==='data' ? C.busD : C.busC)
    : 'rgba(255,255,255,0.06)';

  const BASE = import.meta.env.BASE_URL || '/';

  /* ── Ejemplos de aplicación ─ */
  const examples = [
    {
      arch:'Von Neumann', color:C.cpu, icon:'🖥',
      img:`${BASE}assets/vn_pc.png`, imgAlt:'PC de escritorio con arquitectura Von Neumann',
      devices:['PCs de escritorio y laptops','Servidores web y de bases de datos','Mainframes empresariales','Consolas (PlayStation, Xbox)'],
      why:'La flexibilidad del bus compartido permite reasignar fácilmente la memoria entre datos e instrucciones según las necesidades del sistema operativo y las aplicaciones.',
      note:'💡 Tu PC corre miles de procesos distintos porque el SO gestiona la RAM de forma dinámica: algo imposible en Harvard pura.'
    },
    {
      arch:'Harvard', color:C.harv, icon:'🔬',
      img:`${BASE}assets/vn_arduino.png`, imgAlt:'Arduino con arquitectura Harvard',
      devices:['Arduino (ATmega328)','PIC de Microchip','DSP de audio y video','PLCs industriales'],
      why:'El bus de instrucciones separado permite leer el siguiente opcode mientras se transfieren datos del sensor, logrando velocidad constante y predecible: clave en control industrial.',
      note:'🔬 Un Arduino Mega tiene 256 KB de Flash para el programa y solo 8 KB de RAM para datos, porque sus buses son físicamente distintos.'
    },
    {
      arch:'Harvard Modificada', color:C.mem, icon:'📱',
      img:`${BASE}assets/vn_smartphone.png`, imgAlt:'Smartphone con procesador ARM Harvard Modificada',
      devices:['Smartphones Android/iOS (ARM Cortex)','Procesadores Intel Core y AMD Ryzen','Raspberry Pi','Apple Silicon (M1/M2/M3)'],
      why:'Los cachés L1 están divididos en instrucciones (L1-I) y datos (L1-D), eliminando el cuello de botella en el nivel más crítico. A partir de L2, la caché es unificada como Von Neumann.',
      note:'📱 El chip A17 Pro del iPhone 15 usa Harvard Modificada: caché L1I y L1D de 192 KB independientes, L2 compartido de 16 MB.'
    },
    {
      arch:'Harvard Pura (DSP)', color:'#22c55e', icon:'🎵',
      img:`${BASE}assets/vn_dsp.png`, imgAlt:'DSP para procesamiento de señales con arquitectura Harvard',
      devices:['DSP para audio (Cirrus Logic, TI)','Procesadores de imagen en cámaras','Radares y equipos de telecomunicaciones','Módems y procesadores de señal FPGA'],
      why:'En el procesamiento de señales, cada nanosegundo importa. La arquitectura Harvard garantiza que la CPU nunca espera: siempre tiene la instrucción lista mientras mueve muestras de audio o video.',
      note:'🎵 Un mezclador digital profesional procesa 96 canales en tiempo real gracias al paralelismo del bus Harvard DSP.'
    },
  ];

  return (
    <>
      <style>{`
        .vn-page { padding:1rem; max-width:1100px; margin:0 auto; font-family:system-ui,sans-serif; color:var(--text-main,#eee); }
        .vn-page * { box-sizing:border-box; }

        .vn-h1 { text-align:center; font-size:clamp(1.5rem,4vw,2.2rem); font-weight:900; margin:0 0 0.25rem;
          background:linear-gradient(120deg,#00f2ff,#7000ff); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .vn-sub { text-align:center; opacity:0.6; font-size:0.9rem; margin-bottom:1.5rem; }
        .vn-section-title { text-align:center; font-size:clamp(1.2rem,3vw,1.6rem); font-weight:900; margin:2rem 0 1.5rem;
          background:linear-gradient(120deg,#00f2ff,#7000ff); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }

        /* Simulador */
        .vn-sim-box { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.25rem; margin-bottom:1.5rem; }
        .vn-grid { display:grid; grid-template-columns:1fr 60px 1fr; gap:0.75rem; align-items:start; }
        .vn-buses { display:flex; flex-direction:column; justify-content:center; gap:1.8rem; padding:1.5rem 0; height:100%; }
        .vn-bus-track { height:8px; border-radius:4px; position:relative; transition:background 0.4s,box-shadow 0.4s; }
        .vn-bus-label { position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-size:0.5rem; font-weight:800; white-space:nowrap; opacity:0.8; }
        .vn-comp { border-radius:14px; padding:0.9rem; display:flex; flex-direction:column; gap:0.5rem; border:1.5px solid; min-height:200px; }
        .vn-reg { display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; padding:0.3rem 0.5rem; background:rgba(255,255,255,0.04); border-radius:6px; gap:0.5rem; }
        .vn-mem-row { display:flex; justify-content:space-between; font-size:0.7rem; padding:3px 6px; border-radius:4px; }
        .vn-chip { flex:1; text-align:center; padding:0.2rem; border-radius:6px; font-size:0.7rem; }
        .vn-io { grid-column:1/4; display:flex; justify-content:space-around; align-items:center;
          background:rgba(34,197,94,0.03); border:1.5px solid #22c55e; border-radius:12px; padding:0.6rem; margin-top:0.25rem; }
        .vn-io-sep { width:2px; height:36px; background:rgba(34,197,94,0.4); }
        .vn-io-block { text-align:center; }
        .vn-io-block small { display:block; font-size:0.6rem; color:#22c55e; font-weight:800; }
        .vn-ctrl { display:flex; flex-direction:column; gap:0.6rem; margin-top:1rem; }
        .vn-ctrl-row { display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap; }
        .vn-log { flex:1; background:#000; border-radius:10px; padding:0.6rem 1rem; font-family:monospace; font-size:0.78rem; border-left:4px solid #00f2ff; min-height:40px; color:#a0f2ff; }
        .vn-badge { padding:0.25rem 0.8rem; border-radius:20px; font-size:0.72rem; font-weight:800; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); white-space:nowrap; }
        .vn-bus-pills { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .vn-pill { padding:3px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; color:#000; transition:opacity 0.3s; }

        /* Botones */
        .btn-vn-p    { cursor:pointer; padding:0.6rem 1.2rem; border-radius:12px; font-weight:800; font-size:0.88rem; border:none; background:#00f2ff; color:#000; transition:transform .15s; }
        .btn-vn-p:hover { transform:scale(1.04); filter:brightness(1.1); }
        .btn-vn-quiz { cursor:pointer; padding:0.6rem 1.4rem; border-radius:12px; font-weight:800; font-size:0.9rem; border:none; transition:transform .15s; }
        .btn-vn-quiz:hover { transform:scale(1.04); filter:brightness(1.1); }

        /* Sección Educativa */
        .vn-edu-card { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; align-items:center;
          background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.5rem; margin-bottom:1.25rem; }
        .vn-edu-card-alt { direction:rtl; }
        .vn-edu-card-alt > * { direction:ltr; }
        .vn-edu-img-wrap { border-radius:14px; overflow:hidden; }
        .vn-edu-img { width:100%; height:auto; display:block; border-radius:14px; border:1px solid rgba(255,255,255,.08); }
        .vn-edu-text h3 { margin:0 0 0.75rem; font-size:1.05rem; }
        .vn-edu-text p { font-size:0.88rem; line-height:1.6; opacity:0.9; margin:0 0 0.6rem; }
        .vn-edu-text ul { font-size:0.85rem; line-height:1.7; opacity:0.85; margin:0; padding-left:1.2rem; }
        .vn-cycle-steps { display:flex; flex-direction:column; gap:0.5rem; margin:0.75rem 0; }
        .vn-cycle-step { display:flex; gap:0.75rem; align-items:flex-start; padding:0.6rem; background:rgba(255,255,255,0.03); border-radius:10px; border-left:3px solid; }
        .vn-cycle-step span:first-child { font-weight:800; white-space:nowrap; font-size:0.82rem; }
        .vn-cycle-step span:last-child { font-size:0.82rem; opacity:0.85; }
        .vn-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin:0.75rem 0; }

        /* Ejemplos de Aplicación */
        .vn-examples-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.25rem; margin-bottom:2rem; }
        .vn-example-card { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; }
        .vn-example-img { width:100%; height:180px; object-fit:cover; border-bottom:1px solid rgba(255,255,255,.08); }
        .vn-example-body { padding:1.25rem; display:flex; flex-direction:column; gap:0.6rem; flex:1; }
        .vn-example-arch { font-size:0.75rem; font-weight:800; padding:0.25rem 0.75rem; border-radius:20px; display:inline-block; color:#000; border:none; }
        .vn-example-devices { font-size:0.82rem; opacity:0.85; margin:0; padding-left:1.1rem; line-height:1.7; }
        .vn-example-note { font-size:0.8rem; opacity:0.65; padding:0.6rem; border-radius:8px; background:rgba(255,255,255,0.03); border-left:3px solid; margin-top:auto; }

        /* Quiz */
        .vn-quiz-box { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.25rem; margin-bottom:1.25rem; }
        .vn-progress { height:5px; background:rgba(255,255,255,.08); border-radius:3px; margin-bottom:1.25rem; }
        .vn-progress-fill { height:100%; border-radius:3px; transition:width .3s; }
        .vn-q-text { font-size:1rem; font-weight:700; margin-bottom:1.25rem; line-height:1.5; }
        .vn-options { display:flex; flex-direction:column; gap:0.6rem; }
        .vn-opt { width:100%; display:flex; align-items:flex-start; gap:0.75rem; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.1); border-radius:12px;
          padding:0.85rem 1rem; color:#fff; cursor:pointer; text-align:left; font-size:0.9rem; line-height:1.4; transition:all 0.2s; }
        .vn-opt:hover:not(:disabled) { background:rgba(255,255,255,.09); border-color:#00f2ff; }
        .vn-opt.correct { background:rgba(34,197,94,.18) !important; border-color:#22c55e !important; }
        .vn-opt.wrong   { background:rgba(239,68,68,.18)  !important; border-color:#ef4444 !important; }
        .vn-opt-letter  { flex-shrink:0; opacity:0.45; font-weight:900; font-size:0.85rem; }
        .vn-feedback { margin-top:1rem; padding:1rem; border-radius:12px; background:rgba(255,255,255,0.04); font-size:0.85rem; line-height:1.5; }

        /* Quiz tabs */
        .vn-quiz-tabs { display:flex; gap:0.75rem; margin-bottom:1.25rem; flex-wrap:wrap; }
        .vn-quiz-tab { flex:1; min-width:140px; padding:0.75rem; border-radius:14px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.03); cursor:pointer; text-align:center; font-weight:700; font-size:0.9rem; color:#fff; transition:all 0.2s; }
        .vn-quiz-tab:hover { border-color:rgba(255,255,255,.3); background:rgba(255,255,255,.07); }
        .vn-quiz-tab.active-vn  { border-color:#00f2ff; background:rgba(0,242,255,0.08); color:#00f2ff; }
        .vn-quiz-tab.active-hv  { border-color:#f97316; background:rgba(249,115,22,0.08); color:#f97316; }

        /* Mobile */
        @media (max-width:650px) {
          .vn-page    { padding:0.75rem; }
          .vn-sim-box { padding:0.9rem; }
          .vn-grid    { grid-template-columns:1fr; gap:0.75rem; }
          .vn-buses   { flex-direction:row; height:50px; padding:0; gap:0.75rem; align-items:center; }
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
          .vn-examples-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="vn-page">
        <Link to="/" style={{ display:'inline-block', padding:'0.4rem 1rem', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:8, color:'#fff', textDecoration:'none', fontSize:'0.85rem', marginBottom:'1rem' }}>
          ← Volver
        </Link>

        <h1 className="vn-h1">Arquitecturas de Computadoras</h1>
        <p className="vn-sub">Von Neumann · Harvard · Harvard Modificada — Simulador, teoría y desafíos</p>

        {/* ══ SIMULADOR ══ */}
        <h2 className="vn-section-title">⚙️ Simulador Von Neumann</h2>
        <div className="vn-sim-box">
          <div className="vn-grid">
            <div className="vn-comp" style={{ borderColor:C.cpu, background:'rgba(0,242,255,0.03)' }}>
              <h3 style={{ color:C.cpu, margin:0, fontSize:'0.95rem', fontWeight:800 }}>🖥 CPU</h3>
              <div className="vn-reg"><span>PC</span><code>0x{pc.toString(16).padStart(2,'0').toUpperCase()}</code></div>
              <div className="vn-reg"><span>IR</span><code>{phase!=='IDLE'&&phase!=='FETCH' ? MEM[pc] : '???'}</code></div>
              <div className="vn-reg"><span>ACC</span><code>{phase==='STORE' ? 57 : '0'}</code></div>
              <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.5rem' }}>
                <span className="vn-chip" style={{ background:'rgba(0,242,255,.1)', border:`1px solid ${C.cpu}40`, color:C.cpu }}>ALU</span>
                <span className="vn-chip" style={{ background:'rgba(0,242,255,.1)', border:`1px solid ${C.cpu}40`, color:C.cpu }}>UC</span>
              </div>
            </div>
            <div className="vn-buses">
              {[{k:'addr',c:C.busA,l:'Dir.'},{k:'data',c:C.busD,l:'Datos'},{k:'ctrl',c:C.busC,l:'Ctrl.'}].map(b=>(
                <div key={b.k} className="vn-bus-track" style={{ background:busColor(b.k), boxShadow:activeB===b.k?`0 0 10px ${b.c}`:'none' }}>
                  <span className="vn-bus-label" style={{ color:activeB===b.k?b.c:'rgba(255,255,255,.5)' }}>{b.l}</span>
                </div>
              ))}
            </div>
            <div className="vn-comp" style={{ borderColor:C.mem, background:'rgba(168,85,247,0.03)' }}>
              <h3 style={{ color:C.mem, margin:0, fontSize:'0.95rem', fontWeight:800 }}>💾 RAM</h3>
              {MEM.map((v,i)=>(
                <div key={i} className="vn-mem-row" style={{ background:i===pc?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.03)', borderRadius:4 }}>
                  <code>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code><code>{v}</code>
                </div>
              ))}
            </div>
            <div className="vn-io">
              <div className="vn-io-block"><small>ENTRADA</small><span style={{ fontSize:'1.4rem' }}>⌨️🖱️</span></div>
              <div className="vn-io-sep"/>
              <div className="vn-io-block"><small>SALIDA</small><span style={{ fontSize:'1.4rem' }}>🖥️🔊</span></div>
            </div>
          </div>
          <div className="vn-ctrl">
            <div className="vn-ctrl-row">
              <button className="btn-vn-p" onClick={advancePhase}>{phase==='IDLE'?'▶ Iniciar Ciclo':'⏭ Siguiente Paso'}</button>
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

        {/* ══ GUÍA VISUAL ══ */}
        <h2 className="vn-section-title">📚 Guía Visual de Conceptos</h2>

        <div className="vn-edu-card">
          <div className="vn-edu-img-wrap">
            <img src={`${BASE}assets/vn_diagram.png`} alt="Diagrama Von Neumann" className="vn-edu-img"/>
          </div>
          <div className="vn-edu-text">
            <h3 style={{ color:C.cpu }}>🖥 La Arquitectura Funcional</h3>
            <p>Tres bloques conectados por buses compartidos:</p>
            <ul>
              <li><strong style={{color:C.cpu}}>CPU</strong>: ALU (cálculos) + Unidad de Control (coordinación).</li>
              <li><strong style={{color:C.mem}}>Memoria RAM</strong>: instrucciones y datos comparten el mismo espacio.</li>
              <li><strong style={{color:C.io}}>E/S</strong>: comunicación con teclado, mouse y pantalla.</li>
            </ul>
            <p style={{opacity:0.65, fontSize:'0.83rem', padding:'0.6rem', background:'rgba(255,255,255,0.03)', borderRadius:8, borderLeft:`3px solid ${C.cpu}`, marginTop:'0.75rem'}}>
              💡 Instrucciones y datos comparten la misma memoria y el mismo bus.
            </p>
          </div>
        </div>

        <div className="vn-edu-card vn-edu-card-alt">
          <div className="vn-edu-text">
            <h3 style={{ color:'#a855f7' }}>🔄 Ciclo de Instrucción</h3>
            <div className="vn-cycle-steps">
              {[
                {fase:'📡 FETCH',   color:C.busA, desc:'CPU lee la instrucción desde RAM por el Bus de Direcciones.'},
                {fase:'🧠 DECODE',  color:'#a855f7', desc:'La Unidad de Control interpreta la operación.'},
                {fase:'⚡ EXECUTE', color:C.cpu,  desc:'La ALU realiza el cálculo.'},
                {fase:'💾 STORE',   color:C.io,   desc:'El resultado se guarda en un registro o en RAM.'},
              ].map(f=>(
                <div key={f.fase} className="vn-cycle-step" style={{ borderLeftColor:f.color }}>
                  <span style={{ color:f.color }}>{f.fase}</span><span>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vn-edu-img-wrap">
            <img src={`${BASE}assets/vn_cycle.png`} alt="Ciclo de instrucción" className="vn-edu-img"/>
          </div>
        </div>

        <div className="vn-edu-card">
          <div className="vn-edu-img-wrap">
            <img src={`${BASE}assets/vn_bottleneck.png`} alt="Cuello de botella" className="vn-edu-img"/>
          </div>
          <div className="vn-edu-text">
            <h3 style={{ color:'#ef4444' }}>⚠️ El Cuello de Botella</h3>
            <p>La CPU es <em>miles de veces más rápida</em> que la RAM. Al compartir el bus, la CPU debe esperar constantemente.</p>
            <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'0.75rem' }}>
              <p style={{ margin:0, fontSize:'0.82rem' }}>🔬 <strong>Soluciones:</strong> caché L1/L2/L3, buses DDR5, arquitecturas híbridas (Harvard Modificada en ARM).</p>
            </div>
          </div>
        </div>

        <div className="vn-edu-card vn-edu-card-alt">
          <div className="vn-edu-text">
            <h3 style={{ color:C.mem }}>🔀 Von Neumann vs. Harvard</h3>
            <p>Harvard resolvió el cuello de botella separando físicamente la memoria:</p>
            <div className="vn-compare-grid">
              <div style={{ background:'rgba(0,242,255,0.05)', border:`1px solid ${C.cpu}40`, borderRadius:10, padding:'0.75rem' }}>
                <p style={{ color:C.cpu, fontWeight:800, margin:'0 0 0.4rem', fontSize:'0.88rem' }}>Von Neumann</p>
                <ul style={{ margin:0, paddingLeft:'1.1rem', fontSize:'0.8rem', opacity:0.85 }}>
                  <li>Memoria unificada</li><li>Un bus compartido</li><li>Diseño simple</li><li>Cuello de botella</li>
                </ul>
              </div>
              <div style={{ background:'rgba(249,115,22,0.05)', border:`1px solid ${C.harv}40`, borderRadius:10, padding:'0.75rem' }}>
                <p style={{ color:C.harv, fontWeight:800, margin:'0 0 0.4rem', fontSize:'0.88rem' }}>Harvard</p>
                <ul style={{ margin:0, paddingLeft:'1.1rem', fontSize:'0.8rem', opacity:0.85 }}>
                  <li>Memorias separadas</li><li>Buses independientes</li><li>Mayor velocidad</li><li>Más costosa</li>
                </ul>
              </div>
            </div>
            <p style={{ opacity:0.65, fontSize:'0.82rem', marginTop:'0.5rem' }}>📱 Arduino usa Harvard. Tu PC usa Von Neumann (Harvard Modificada internamente).</p>
          </div>
          <div className="vn-edu-img-wrap">
            <img src={`${BASE}assets/vn_vs_harvard.png`} alt="Von Neumann vs Harvard" className="vn-edu-img"/>
          </div>
        </div>

        {/* ══ EJEMPLOS DE APLICACIÓN ══ */}
        <h2 className="vn-section-title">🌍 ¿Dónde se aplica cada arquitectura?</h2>
        <div className="vn-examples-grid">
          {examples.map((ex,i)=>(
            <div key={i} className="vn-example-card" style={{ borderTop:`3px solid ${ex.color}` }}>
              <img src={ex.img} alt={ex.imgAlt} className="vn-example-img"/>
              <div className="vn-example-body">
                <div>
                  <span className="vn-example-arch" style={{ background:ex.color }}>
                    {ex.icon} {ex.arch}
                  </span>
                </div>
                <ul className="vn-example-devices">
                  {ex.devices.map((d,j)=><li key={j}>{d}</li>)}
                </ul>
                <p style={{ fontSize:'0.82rem', opacity:0.8, margin:'0.25rem 0' }}>{ex.why}</p>
                <div className="vn-example-note" style={{ borderLeftColor:ex.color }}>{ex.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ DESAFÍOS ══ */}
        <h2 className="vn-section-title">🎓 Desafíos de Autoevaluación</h2>
        <Quiz questions={Q_VN} accentColor={C.cpu}  title="Desafío Von Neumann" icon="🖥" />
        <Quiz questions={Q_HV} accentColor={C.harv} title="Desafío Harvard"     icon="🔬" />

      </div>
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  cpu:'#00f2ff', mem:'#a855f7', io:'#22c55e',
  harv:'#f97316', harvDark:'rgba(249,115,22,0.08)',
  bg:'#0d0d10', border:'rgba(255,255,255,0.10)',
};

const QUESTIONS = [
  { q:'¿En qué se diferencia principalmente la arquitectura Harvard del modelo de Von Neumann?', opts:['En el tipo de procesador','En tener memorias separadas para datos e instrucciones','En usar más transistores','En no tener buses'], a:1, exp:'Harvard separa físicamente la memoria de programa y la memoria de datos, con buses independientes.' },
  { q:'¿Cuál de estos dispositivos usa típicamente arquitectura Harvard?', opts:['Una PC de escritorio','Un laptop con Windows','Un microcontrolador Arduino','Un servidor web'], a:2, exp:'El ATmega328 de Arduino usa arquitectura Harvard pura con Flash separada de RAM.' },
  { q:'¿Qué ventaja principal ofrece Harvard sobre Von Neumann?', opts:['Menor costo','Puede acceder a instrucciones y datos simultáneamente','Usa menos energía','Tiene más RAM'], a:1, exp:'Al tener buses separados, puede leer instrucciones y datos al mismo tiempo, sin cuello de botella.' },
  { q:'¿Qué tipo de memoria usa Harvard para guardar el programa en microcontroladores?', opts:['RAM volátil','Memoria Flash (ROM)','Disco rígido','Memoria caché'], a:1, exp:'Los programas se graban en Flash/ROM persistente, mientras los datos van en la RAM interna.' },
  { q:'¿Qué es la "Arquitectura Harvard Modificada"?', opts:['Una variante con dos núcleos','Una versión que unifica los buses de direcciones','Una variante que permite acceder a instrucciones como datos en ciertos contextos','Una arquitectura sin unidad de control'], a:2, exp:'Harvard Modificada usa cachés L1 divididos (instrucciones y datos) pero memoria principal unificada.' },
  { q:'¿Qué procesador popular en smartphones usa una variante de arquitectura Harvard?', opts:['Intel x86','ARM Cortex','AMD Ryzen','PowerPC'], a:1, exp:'Los procesadores ARM Cortex-A usan Harvard Modificada con cachés L1 separados.' },
  { q:'En un microcontrolador Harvard, la memoria de programa es típicamente…', opts:['Volátil y borrable','No volátil (Flash/EEPROM)','Solo en RAM','Parte del bus de datos'], a:1, exp:'Flash persiste el programa sin energía, a diferencia de la RAM.' },
  { q:'¿Cómo conecta Harvard la CPU con sus dos memorias separadas?', opts:['Un único bus compartido','Dos buses independientes (uno por memoria)','Conexión inalámbrica','Solo por interrupciones'], a:1, exp:'Bus de instrucciones separado del bus de datos: esto elimina el cuello de botella.' },
  { q:'¿Qué significa que la memoria de programa en Harvard sea de "solo lectura" durante ejecución?', opts:['Que no puede ejecutar nada','Que el programa no puede modificarse a sí mismo en ejecución','Que no hay datos','Que la CPU no puede leerla'], a:1, exp:'El programa en Flash es leído por la CPU, pero no puede sobrescribirse en tiempo de ejecución.' },
  { q:'¿Qué aplicación industrial usa comúnmente arquitectura Harvard pura?', opts:['Servidores de base de datos','Sistemas de control embebido (PLCs, DSP)','Computadoras de escritorio','Videoconsolas modernas'], a:1, exp:'PLCs y DSPs para control de motores y procesamiento de señales usan Harvard por su velocidad predecible.' },
  { q:'¿Por qué Harvard es preferida en sistemas de tiempo real (RTOS)?', opts:['Porque es más barata','Porque el tiempo de acceso a instrucciones es constante y predecible','Porque usa menos energía','Por su compatibilidad con Windows'], a:1, exp:'El acceso simultáneo garantiza tiempos de respuesta deterministas, crítico en RTOS.' },
  { q:'¿Qué familia de microcontroladores de Microchip usa arquitectura Harvard?', opts:['ARM','MIPS','PIC','RISC-V'], a:2, exp:'Los PIC tienen bus de instrucciones de 14/16 bits separado del bus de datos de 8 bits.' },
  { q:'En la arquitectura Harvard Modificada de un procesador moderno, ¿qué tiene separado?', opts:['Los registros de la ALU','Los cachés L1 de instrucciones y datos','El disco rígido y la RAM','La pantalla y el teclado'], a:1, exp:'Caché L1 dividido: L1-I (instrucciones) y L1-D (datos). A partir de L2, es unificado.' },
  { q:'¿Cuál es la desventaja principal de Harvard pura frente a Von Neumann?', opts:['Es más lenta','No puede ejecutar programas','La memoria de instrucciones no puede usarse para datos aunque esté libre','No tiene buses'], a:2, exp:'En Harvard pura, si el programa es pequeño y sobra memoria de instrucciones, ese espacio no puede usarse para datos.' },
  { q:'¿Qué tipo de procesamiento se beneficia MÁS de la arquitectura Harvard?', opts:['Edición de documentos de texto','Procesamiento de señales de audio/video en tiempo real','Navegación web','Gestión de bases de datos'], a:1, exp:'El DSP Harvard puede procesar muestras de audio/video continuamente sin detener la CPU.' },
  { q:'¿Por qué Arduino puede ejecutar código sin sistema operativo?', opts:['Porque usa Windows embebido','Porque la arquitectura Harvard separa el programa del SO','Porque el programa vive en Flash y se ejecuta directamente','Porque no tiene RAM'], a:2, exp:'El programa en Flash se ejecuta directamente al encender: no necesita cargarse en RAM ni OS.' },
  { q:'Un DSP de audio usa Harvard porque…', opts:['Es más barato','El bus de instrucciones no compite con el de muestras de audio dando máxima velocidad','Usa menos energía','Tiene más memoria'], a:1, exp:'El DSP puede leer la siguiente instrucción mientras transfiere muestras de audio: paralelismo total.' },
  { q:'¿En qué nivel de caché de una CPU moderna se implementa Harvard Modificada?', opts:['L3','L2','L1','Ninguna'], a:2, exp:'Caché L1 está dividido: L1-I (instrucciones) y L1-D (datos). A partir de L2, la caché es unificada.' },
  { q:'¿Qué sucede si un programa en Harvard intenta escribir en su propia memoria de instrucciones?', opts:['Ejecuta el dato como instrucción','Genera un error o excepción de hardware','Se borra la RAM','Se apaga el sistema'], a:1, exp:'Los microcontroladores Harvard lanzan una excepción, ya que el bus de programa es de solo lectura en ejecución.' },
  { q:'¿Cuál describe mejor los procesadores modernos (Intel, AMD, ARM)?', opts:['Harvard pura por su simplicidad','Von Neumann porque es más barata','Harvard Modificada: cachés L1 separados, memoria principal unificada','Ninguna de las dos se usa hoy'], a:2, exp:'Todos los procesadores modernos usan Harvard Modificada internamente para aprovechar lo mejor de ambos mundos.' },
];

const examples = [
  { title:'Arduino (ATmega328)', color:C.harv, img:'vn_arduino.png', imgAlt:'Arduino con arquitectura Harvard',
    desc:'El Arduino UNO tiene 32 KB de Flash para el programa y 2 KB de RAM para datos, con buses separados. El programa se graba en Flash y se ejecuta directamente, sin sistema operativo.',
    note:'🔬 Dato: el ATmega328 puede leer la siguiente instrucción de Flash mientras accede a datos en RAM simultáneamente. Esto es la esencia de Harvard.' },
  { title:'PIC de Microchip', color:'#22c55e', img:'vn_diagram.png', imgAlt:'PIC Microchip Harvard',
    desc:'Los PIC son un ejemplo clásico de Harvard pura: bus de instrucciones de 14 bits (PIC16) separado del bus de datos de 8 bits. Se usan en electrodomésticos, alarmas y control industrial.',
    note:'🏭 Los PIC son tan populares en la industria que Microchip Technology los ha producido por más de 30 años.' },
  { title:'Smartphones (ARM Cortex)', color:C.mem, img:'vn_smartphone.png', imgAlt:'Smartphone ARM Harvard Modificada',
    desc:'Los procesadores ARM Cortex-A en Android e iOS usan Harvard Modificada: cachés L1 divididos (L1-I para instrucciones y L1-D para datos), con memoria principal unificada como Von Neumann.',
    note:'📱 El chip A17 Pro del iPhone 15 tiene cachés L1-I y L1-D de 192 KB cada uno, ambos independientes.' },
  { title:'DSP para Audio/Video', color:'#eab308', img:'vn_dsp.png', imgAlt:'DSP con Harvard pura',
    desc:'Los procesadores de señal (DSP) de Texas Instruments y Cirrus Logic usan Harvard pura para garantizar que los cálculos de audio/video nunca sean interrumpidos por la carga de instrucciones.',
    note:'🎵 Un mezclador digital profesional procesa hasta 96 canales simultáneos gracias al paralelismo de Harvard.' },
];

export default function ArquitecturaHarvardPage() {
  const [qIdx,   setQIdx]   = useState(0);
  const [score,  setScore]  = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done,   setDone]   = useState(false);
  const [started,setStarted]= useState(false);

  const pick = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s+1);
  };
  const next = () => {
    if (qIdx + 1 < QUESTIONS.length) { setQIdx(q => q+1); setChosen(null); }
    else setDone(true);
  };
  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); setStarted(false); };

  const BASE = import.meta.env.BASE_URL || '/';

  return (
    <>
      <style>{`
        .hv-page { padding:1rem; max-width:1100px; margin:0 auto; font-family:system-ui,sans-serif; color:var(--text-main,#eee); }
        .hv-page * { box-sizing:border-box; }
        .hv-h1 { text-align:center; font-size:clamp(1.5rem,4vw,2.4rem); font-weight:900; margin:0 0 0.25rem;
          background:linear-gradient(120deg,#f97316,#ef4444); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .hv-sub { text-align:center; opacity:0.6; font-size:0.9rem; margin-bottom:1.5rem; }
        .hv-section-title { text-align:center; font-size:clamp(1.2rem,3vw,1.5rem); font-weight:900; margin:2rem 0 1.25rem;
          background:linear-gradient(120deg,#f97316,#ef4444); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }

        /* Diagrama Harvard */
        .hv-diagram { display:grid; grid-template-columns:1fr 60px 1fr; gap:1rem; align-items:center;
          background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:1.5rem; margin-bottom:1.5rem; }
        .hv-comp { border-radius:14px; padding:1rem; border:1.5px solid; display:flex; flex-direction:column; gap:0.5rem; }
        .hv-mem-block { border-radius:10px; padding:0.6rem 0.75rem; font-size:0.8rem; display:flex; justify-content:space-between; }
        .hv-buses { display:flex; flex-direction:column; justify-content:center; gap:1.5rem; height:100%; }
        .hv-bus { height:8px; border-radius:4px; position:relative; }
        .hv-bus-lbl { position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-size:0.5rem; font-weight:800; white-space:nowrap; }
        .hv-io { grid-column:1/4; display:flex; justify-content:space-around; align-items:center;
          border:1.5px solid #22c55e; background:rgba(34,197,94,0.03); border-radius:12px; padding:0.6rem; margin-top:0.25rem; }
        .hv-io-sep { width:2px; height:32px; background:rgba(34,197,94,0.4); }
        .hv-io-block { text-align:center; }
        .hv-io-block small { display:block; font-size:0.6rem; color:#22c55e; font-weight:800; }

        /* Diferencias */
        .hv-compare { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; }
        .hv-compare-box { background:#0d0d10; border:1.5px solid; border-radius:16px; padding:1.25rem; }
        .hv-compare-box h3 { margin:0 0 0.75rem; font-size:1rem; font-weight:800; }
        .hv-compare-box ul { font-size:0.85rem; line-height:1.8; opacity:0.85; margin:0; padding-left:1.2rem; }

        /* Ciclo Harvard */
        .hv-cycle { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem; }
        .hv-cycle-card { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:14px; padding:1.25rem; }
        .hv-cycle-card h4 { font-size:0.9rem; margin:0 0 0.5rem; }
        .hv-cycle-card p { font-size:0.82rem; opacity:0.8; margin:0; line-height:1.6; }

        /* Ejemplos */
        .hv-examples { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:1.25rem; margin-bottom:2rem; }
        .hv-example { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
        .hv-example-img { width:100%; height:160px; object-fit:cover; border-bottom:1px solid rgba(255,255,255,.07); }
        .hv-example-body { padding:1rem; display:flex; flex-direction:column; gap:0.5rem; flex:1; }
        .hv-example-note { font-size:0.78rem; opacity:0.65; padding:0.5rem; border-radius:8px; background:rgba(255,255,255,0.03); border-left:3px solid; margin-top:auto; }

        /* Quiz */
        .hv-quiz { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-top:3px solid #f97316; border-radius:20px; padding:1.25rem; }
        .hv-progress { height:5px; background:rgba(255,255,255,.08); border-radius:3px; margin-bottom:1.25rem; }
        .hv-progress-fill { height:100%; border-radius:3px; background:#f97316; transition:width .3s; }
        .hv-q-text { font-size:1rem; font-weight:700; margin-bottom:1.25rem; line-height:1.5; }
        .hv-options { display:flex; flex-direction:column; gap:0.6rem; }
        .hv-opt { width:100%; display:flex; align-items:flex-start; gap:0.75rem; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,.1); border-radius:12px;
          padding:0.85rem 1rem; color:#fff; cursor:pointer; text-align:left; font-size:0.9rem; line-height:1.4; transition:all 0.2s; }
        .hv-opt:hover:not(:disabled) { background:rgba(249,115,22,0.08); border-color:#f97316; }
        .hv-opt.correct { background:rgba(34,197,94,.18) !important; border-color:#22c55e !important; }
        .hv-opt.wrong   { background:rgba(239,68,68,.18)  !important; border-color:#ef4444 !important; }
        .hv-opt-letter  { flex-shrink:0; opacity:0.45; font-weight:900; font-size:0.85rem; }
        .hv-feedback { margin-top:1rem; padding:1rem; border-radius:12px; background:rgba(255,255,255,0.04); font-size:0.85rem; line-height:1.5; }
        .btn-hv { cursor:pointer; padding:0.6rem 1.4rem; border-radius:12px; font-weight:800; font-size:0.9rem; border:none; background:#f97316; color:#000; transition:transform .15s; }
        .btn-hv:hover { transform:scale(1.04); filter:brightness(1.1); }

        /* Info cards */
        .hv-info-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.25rem; margin-bottom:1.5rem; }
        .hv-info-card { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:16px; padding:1.25rem; border-left:4px solid; }
        .hv-img-row { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; }
        .hv-img-card { background:#0d0d10; border:1px solid rgba(255,255,255,.1); border-radius:16px; overflow:hidden; }
        .hv-img-card img { width:100%; height:200px; object-fit:cover; }
        .hv-img-caption { padding:0.75rem 1rem; font-size:0.82rem; opacity:0.8; }

        /* Mobile */
        @media(max-width:650px){
          .hv-page { padding:0.75rem; }
          .hv-diagram { grid-template-columns:1fr; }
          .hv-buses { flex-direction:row; height:45px; gap:0.75rem; align-items:center; }
          .hv-bus { flex:1; height:8px; }
          .hv-bus-lbl { top:-14px; }
          .hv-io { grid-column:1; }
          .hv-compare { grid-template-columns:1fr; }
          .hv-cycle { grid-template-columns:1fr; }
          .hv-img-row { grid-template-columns:1fr; }
          .hv-q-text { font-size:0.95rem; }
          .hv-opt { font-size:0.85rem; padding:0.75rem; }
          .hv-examples { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="hv-page">
        <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
          <Link to="/" style={{ padding:'0.4rem 1rem', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:8, color:'#fff', textDecoration:'none', fontSize:'0.85rem' }}>
            ← Volver
          </Link>
          <Link to="/arquitectura-von-neumann" style={{ padding:'0.4rem 1rem', background:'rgba(0,242,255,0.08)', border:'1px solid rgba(0,242,255,0.3)', borderRadius:8, color:'#00f2ff', textDecoration:'none', fontSize:'0.85rem' }}>
            ⚙️ Ver Von Neumann →
          </Link>
        </div>

        <h1 className="hv-h1">Arquitectura Harvard</h1>
        <p className="hv-sub">Memorias separadas · Buses independientes · Velocidad determinista</p>

        {/* ══ DIAGRAMA HARVARD ══ */}
        <h2 className="hv-section-title">🔬 Diagrama de Arquitectura Harvard</h2>
        <div className="hv-diagram">
          {/* CPU */}
          <div className="hv-comp" style={{ borderColor:C.cpu, background:'rgba(0,242,255,0.03)' }}>
            <h3 style={{ color:C.cpu, margin:0, fontSize:'0.95rem', fontWeight:800 }}>🖥 CPU</h3>
            {[['PC (Program Counter)','0x00'],['IR (Instrucción)','LOAD'],['ACC (Acumulador)','42']].map(([k,v])=>(
              <div key={k} className="hv-mem-block" style={{ background:'rgba(255,255,255,0.04)', borderRadius:6 }}>
                <span style={{ fontSize:'0.72rem', opacity:0.8 }}>{k}</span><code style={{ fontSize:'0.72rem' }}>{v}</code>
              </div>
            ))}
            <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.4rem' }}>
              {['ALU','UC'].map(l=>(
                <span key={l} style={{ flex:1, textAlign:'center', padding:'0.2rem', borderRadius:6, background:'rgba(0,242,255,.1)', border:`1px solid ${C.cpu}40`, color:C.cpu, fontSize:'0.7rem' }}>{l}</span>
              ))}
            </div>
          </div>

          {/* BUSES */}
          <div className="hv-buses">
            <div className="hv-bus" style={{ background:C.harv, boxShadow:`0 0 8px ${C.harv}` }}>
              <span className="hv-bus-lbl" style={{ color:C.harv }}>Bus Instruc.</span>
            </div>
            <div className="hv-bus" style={{ background:C.cpu, boxShadow:`0 0 8px ${C.cpu}` }}>
              <span className="hv-bus-lbl" style={{ color:C.cpu }}>Bus Datos</span>
            </div>
          </div>

          {/* MEMORIAS SEPARADAS */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <div className="hv-comp" style={{ borderColor:C.harv, background:'rgba(249,115,22,0.04)' }}>
              <h3 style={{ color:C.harv, margin:0, fontSize:'0.88rem', fontWeight:800 }}>📋 Memoria de Programa (Flash)</h3>
              {['LOAD 42','ADD 15','SUB 07','STR 57'].map((v,i)=>(
                <div key={i} className="hv-mem-block" style={{ background: i===0?'rgba(249,115,22,0.15)':'rgba(255,255,255,0.03)', borderRadius:4 }}>
                  <code style={{ fontSize:'0.7rem' }}>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code>
                  <code style={{ fontSize:'0.7rem' }}>{v}</code>
                </div>
              ))}
            </div>
            <div className="hv-comp" style={{ borderColor:C.cpu, background:'rgba(0,242,255,0.03)' }}>
              <h3 style={{ color:C.cpu, margin:0, fontSize:'0.88rem', fontWeight:800 }}>💾 Memoria de Datos (RAM)</h3>
              {['42','15','57','72'].map((v,i)=>(
                <div key={i} className="hv-mem-block" style={{ background:'rgba(255,255,255,0.03)', borderRadius:4 }}>
                  <code style={{ fontSize:'0.7rem' }}>D0x{i.toString(16).padStart(2,'0').toUpperCase()}</code>
                  <code style={{ fontSize:'0.7rem' }}>{v}</code>
                </div>
              ))}
            </div>
          </div>

          {/* E/S */}
          <div className="hv-io">
            <div className="hv-io-block"><small>ENTRADA</small><span style={{ fontSize:'1.3rem' }}>⌨️🖱️</span></div>
            <div className="hv-io-sep"/>
            <div className="hv-io-block"><small>SALIDA</small><span style={{ fontSize:'1.3rem' }}>🖥️🔊</span></div>
          </div>
        </div>

        {/* Explicación clave */}
        <div style={{ background:'rgba(249,115,22,0.06)', border:`1px solid ${C.harv}50`, borderRadius:16, padding:'1.25rem', marginBottom:'1.5rem' }}>
          <p style={{ margin:0, fontSize:'0.9rem', lineHeight:1.7 }}>
            🔑 <strong style={{ color:C.harv }}>La clave:</strong> La CPU puede leer la próxima instrucción del bus de programa <em>al mismo tiempo</em> que lee o escribe datos en el bus de datos.
            En Von Neumann, estas dos operaciones deben turnarse en el mismo bus. <strong>Esto elimina el cuello de botella.</strong>
          </p>
        </div>

        {/* ══ COMPARACIÓN ══ */}
        <h2 className="hv-section-title">⚖️ Harvard vs. Von Neumann</h2>
        <div className="hv-compare">
          <div className="hv-compare-box" style={{ borderColor:C.cpu }}>
            <h3 style={{ color:C.cpu }}>⚙️ Von Neumann</h3>
            <ul>
              <li>Una sola memoria para instrucciones y datos</li>
              <li>Un único bus compartido</li>
              <li>Cuello de botella (CPU espera al bus)</li>
              <li>Flexible: la memoria se asigna dinámicamente</li>
              <li>Usada en PCs, laptops, servidores</li>
            </ul>
          </div>
          <div className="hv-compare-box" style={{ borderColor:C.harv }}>
            <h3 style={{ color:C.harv }}>🔬 Harvard</h3>
            <ul>
              <li>Memorias físicamente separadas</li>
              <li>Buses independientes para cada memoria</li>
              <li>Sin cuello de botella (acceso simultáneo)</li>
              <li>Rígida: el espacio de instrucciones no sirve para datos</li>
              <li>Usada en Arduino, PIC, DSP, PLCs</li>
            </ul>
          </div>
        </div>

        {/* Harvard Modificada */}
        <div className="hv-compare-box" style={{ borderColor:C.mem, marginBottom:'1.5rem', display:'block' }}>
          <h3 style={{ color:C.mem }}>📱 Harvard Modificada (Procesadores Modernos)</h3>
          <p style={{ fontSize:'0.88rem', lineHeight:1.7, opacity:0.9, margin:'0 0 0.5rem' }}>
            La gran mayoría de los procesadores actuales (Intel Core, AMD Ryzen, ARM Cortex) usan <strong>Harvard Modificada</strong>: caché L1 dividido en instrucciones (L1-I) y datos (L1-D), mientras que la memoria principal sigue siendo unificada como Von Neumann.
          </p>
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            {[['Caché L1-I',C.harv,'Instrucciones exclusivo'],['Caché L1-D',C.cpu,'Datos exclusivo'],['L2 / L3',C.mem,'Unificado (Von Neumann)'],['RAM Principal','#666','Unificada']].map(([l,c,d])=>(
              <div key={l} style={{ flex:1, minWidth:120, background:`rgba(255,255,255,0.03)`, border:`1px solid ${c}40`, borderRadius:10, padding:'0.6rem 0.75rem' }}>
                <div style={{ color:c, fontWeight:800, fontSize:'0.8rem' }}>{l}</div>
                <div style={{ fontSize:'0.75rem', opacity:0.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ IMÁGENES ══ */}
        <h2 className="hv-section-title">🖼 Referencias Visuales</h2>
        <div className="hv-img-row">
          <div className="hv-img-card">
            <img src={`${BASE}assets/vn_arduino.png`} alt="Arduino Harvard"/>
            <div className="hv-img-caption">Arduino UNO — Harvard pura con Flash para programa y RAM para datos</div>
          </div>
          <div className="hv-img-card">
            <img src={`${BASE}assets/vn_smartphone.png`} alt="Smartphone ARM Harvard Modificada"/>
            <div className="hv-img-caption">Smartphone ARM — Harvard Modificada con cachés L1 divididos</div>
          </div>
          <div className="hv-img-card">
            <img src={`${BASE}assets/vn_dsp.png`} alt="DSP Harvard pura"/>
            <div className="hv-img-caption">DSP / FPGA — Harvard pura para procesamiento de señales en tiempo real</div>
          </div>
          <div className="hv-img-card">
            <img src={`${BASE}assets/vn_vs_harvard.png`} alt="Comparación visual"/>
            <div className="hv-img-caption">Diagrama comparativo: Von Neumann vs Harvard</div>
          </div>
        </div>

        {/* ══ EJEMPLOS ══ */}
        <h2 className="hv-section-title">🌍 Aplicaciones Reales de Harvard</h2>
        <div className="hv-examples">
          {examples.map((ex,i)=>(
            <div key={i} className="hv-example" style={{ borderTop:`3px solid ${ex.color}` }}>
              <img src={`${BASE}assets/${ex.img}`} alt={ex.imgAlt} className="hv-example-img"/>
              <div className="hv-example-body">
                <span style={{ fontWeight:800, color:ex.color, fontSize:'0.95rem' }}>{ex.title}</span>
                <p style={{ fontSize:'0.83rem', opacity:0.85, margin:0, lineHeight:1.6 }}>{ex.desc}</p>
                <div className="hv-example-note" style={{ borderLeftColor:ex.color }}>{ex.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ QUIZ ══ */}
        <h2 className="hv-section-title">🎓 Desafío Harvard — 20 Preguntas</h2>
        <div className="hv-quiz">
          {!started ? (
            <div style={{ textAlign:'center', padding:'1rem' }}>
              <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🔬</div>
              <h2 style={{ color:C.harv, margin:'0 0 0.5rem', fontSize:'1.4rem' }}>Desafío Harvard</h2>
              <p style={{ opacity:0.7, marginBottom:'1.5rem', fontSize:'0.9rem' }}>20 preguntas para evaluar tus conocimientos sobre la arquitectura Harvard.</p>
              <button className="btn-hv" onClick={()=>setStarted(true)}>Comenzar Test</button>
            </div>
          ) : done ? (
            <div style={{ textAlign:'center', padding:'1rem' }}>
              <div style={{ fontSize:'3rem', margin:'0 0 0.5rem' }}>{score>=18?'🏆':score>=12?'🥈':'🥉'}</div>
              <h2 style={{ margin:'0 0 0.5rem' }}>Resultado: {score} / {QUESTIONS.length}</h2>
              <p style={{ opacity:0.7, marginBottom:'1.5rem' }}>{score>=15?'¡Excelente dominio de Harvard!':'Seguí repasando los conceptos.'}</p>
              <button className="btn-hv" onClick={reset}>Reintentar</button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.75rem' }}>
                <span style={{ fontWeight:800, color:C.harv, fontSize:'0.85rem' }}>Pregunta {qIdx+1} / {QUESTIONS.length}</span>
                <span style={{ fontWeight:700, fontSize:'0.85rem' }}>✅ {score}</span>
              </div>
              <div className="hv-progress"><div className="hv-progress-fill" style={{ width:`${(qIdx/QUESTIONS.length)*100}%` }}/></div>
              <p className="hv-q-text">{QUESTIONS[qIdx].q}</p>
              <div className="hv-options">
                {QUESTIONS[qIdx].opts.map((opt,i)=>{
                  let cls='hv-opt';
                  if(chosen!==null){ if(i===QUESTIONS[qIdx].a) cls+=' correct'; else if(chosen===i) cls+=' wrong'; }
                  return (
                    <button key={i} className={cls} disabled={chosen!==null} onClick={()=>pick(i)}>
                      <span className="hv-opt-letter">{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {chosen!==null && (
                <div className="hv-feedback" style={{ borderLeft:`4px solid ${chosen===QUESTIONS[qIdx].a?'#22c55e':'#ef4444'}` }}>
                  <strong>{chosen===QUESTIONS[qIdx].a?'✅ Correcto.':'❌ Incorrecto.'}</strong> {QUESTIONS[qIdx].exp}
                  <br/>
                  <button className="btn-hv" style={{ marginTop:'0.75rem', width:'100%' }} onClick={next}>
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

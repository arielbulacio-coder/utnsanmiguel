import React, { useState } from 'react';
import './ElectronicaDigital.css';

/* 7-segment decoder logic */
const SEGMENTS_MAP = {
  0: [1,1,1,1,1,1,0], // a,b,c,d,e,f,g
  1: [0,1,1,0,0,0,0],
  2: [1,1,0,1,1,0,1],
  3: [1,1,1,1,0,0,1],
  4: [0,1,1,0,0,1,1],
  5: [1,0,1,1,0,1,1],
  6: [1,0,1,1,1,1,1],
  7: [1,1,1,0,0,0,0],
  8: [1,1,1,1,1,1,1],
  9: [1,1,1,1,0,1,1],
};

const SevenSegDisplay = ({ value, size = 100 }) => {
  const segs = SEGMENTS_MAP[value] || [0,0,0,0,0,0,0];
  const on = '#22c55e';
  const off = 'rgba(255,255,255,0.06)';
  const w = size, h = size * 1.6;
  const t = size * 0.12; // thickness
  const p = size * 0.08; // padding
  const sw = size * 0.6; // segment width
  const sh = size * 0.55; // segment height

  const hSeg = (x, y, isOn) => (
    <rect x={x} y={y} width={sw} height={t} rx={t/3} fill={isOn ? on : off}
      style={{ filter: isOn ? `drop-shadow(0 0 6px ${on})` : 'none' }} />
  );
  const vSeg = (x, y, isOn) => (
    <rect x={x} y={y} width={t} height={sh} rx={t/3} fill={isOn ? on : off}
      style={{ filter: isOn ? `drop-shadow(0 0 6px ${on})` : 'none' }} />
  );

  const ox = p + t + 2, oy = p;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <rect x="0" y="0" width={w} height={h} rx="8" fill="rgba(0,0,0,0.4)" />
      {hSeg(ox, oy, segs[0])}                         {/* a - top */}
      {vSeg(ox + sw, oy + t/2, segs[1])}              {/* b - top right */}
      {vSeg(ox + sw, oy + sh + t, segs[2])}           {/* c - bot right */}
      {hSeg(ox, oy + 2 * sh + t, segs[3])}            {/* d - bottom */}
      {vSeg(ox - t, oy + sh + t, segs[4])}            {/* e - bot left */}
      {vSeg(ox - t, oy + t/2, segs[5])}               {/* f - top left */}
      {hSeg(ox, oy + sh + t/2, segs[6])}              {/* g - middle */}
    </svg>
  );
};

/* K-map simplification for workbench (reuse basic approach) */
const simplifyWorkbench = (numVars, outputs) => {
  const ones = outputs.map((v, i) => v ? i : -1).filter(i => i >= 0);
  if (ones.length === 0) return '0';
  if (ones.length === outputs.length) return '1';
  const vars = ['A', 'B', 'C', 'D'].slice(0, numVars);
  return ones.map(idx => {
    return vars.map((v, vi) => ((idx >> (numVars - 1 - vi)) & 1) ? v : v + "'").join('·');
  }).join(' + ');
};

const ProyectoDigitalPage = () => {
  /* 7-segment simulator */
  const [bcdBits, setBcdBits] = useState([0, 1, 0, 0]); // 4 = MSB first
  const bcdVal = bcdBits.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const toggleBcd = (i) => setBcdBits(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  /* Design workbench */
  const [wbVars, setWbVars] = useState(3);
  const [wbOutputs, setWbOutputs] = useState(Array(8).fill(0));
  const [wbStep, setWbStep] = useState(1);

  const wbToggle = (i) => setWbOutputs(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  const changeVars = (v) => {
    setWbVars(v);
    setWbOutputs(Array(Math.pow(2, v)).fill(0));
    setWbStep(1);
  };

  const wbVarNames = ['A', 'B', 'C', 'D'].slice(0, wbVars);
  const wbMinterms = wbOutputs.map((v, i) => v ? i : -1).filter(i => i >= 0);
  const wbExpr = simplifyWorkbench(wbVars, wbOutputs);

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 33–36</span>
        <h1>Unidad 9 — Proyecto Integrador</h1>
        <p>Diseño, simulación y montaje de un sistema digital completo.</p>
      </div>

      {/* Methodology */}
      <div className="ed-section">
        <h2>Metodología de Diseño Digital</h2>
        <ol className="ed-steps">
          <li><strong>Especificación</strong> — Definir entradas, salidas y comportamiento deseado.</li>
          <li><strong>Tabla de Verdad</strong> — Listar todas las combinaciones de entrada y la salida esperada.</li>
          <li><strong>Formas Canónicas</strong> — Extraer la expresión SOP o POS desde la tabla.</li>
          <li><strong>Simplificación</strong> — Usar Mapa de Karnaugh para reducir la expresión.</li>
          <li><strong>Circuito</strong> — Implementar con compuertas lógicas (o universales NAND/NOR).</li>
          <li><strong>Verificación</strong> — Simular y verificar contra la tabla de verdad original.</li>
        </ol>
      </div>

      {/* Project 1: Alarm */}
      <div className="ed-section">
        <h2>Proyecto 1 — Sistema de Alarma</h2>
        <p>Diseñar un circuito de alarma con 3 sensores:</p>
        <ul>
          <li><strong>D</strong> — sensor de puerta</li>
          <li><strong>V</strong> — sensor de ventana</li>
          <li><strong>M</strong> — sensor de movimiento</li>
        </ul>
        <p>La alarma se activa cuando: <strong>la puerta está abierta Y (la ventana está abierta O hay movimiento)</strong>.</p>

        <h3>Resolución</h3>
        <div className="ed-grid-2">
          <div>
            <p><strong>Expresión:</strong> F = D · (V + M)</p>
            <table className="ed-truth-table" style={{ maxWidth: 350 }}>
              <thead><tr><th>D</th><th>V</th><th>M</th><th>F</th></tr></thead>
              <tbody>
                {Array.from({ length: 8 }, (_, i) => {
                  const d = (i>>2)&1, v = (i>>1)&1, m = i&1;
                  const f = d & (v | m);
                  return (
                    <tr key={i} style={f ? { background: 'rgba(34,197,94,0.08)' } : {}}>
                      <td className={d?'td-high':'td-low'}>{d}</td>
                      <td className={v?'td-high':'td-low'}>{v}</td>
                      <td className={m?'td-high':'td-low'}>{m}</td>
                      <td className={f?'td-high':'td-low'} style={{ fontWeight: 700 }}>{f}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <p><strong>K-Map (D vs VM):</strong></p>
            <p>Mintérminos: m5, m6, m7 → F = D·V + D·M = D·(V+M)</p>
            <p>La expresión ya está simplificada al máximo.</p>
            <p><strong>Compuertas necesarias:</strong></p>
            <ul>
              <li>1 × OR (V + M)</li>
              <li>1 × AND (D · resultado)</li>
            </ul>
            <p>Total: 2 compuertas, o 1 sola NAND: usar De Morgan.</p>
          </div>
        </div>
      </div>

      {/* Project 2: 7-segment */}
      <div className="ed-section">
        <h2>Proyecto 2 — Decodificador BCD a 7 Segmentos</h2>
        <p>Diseñar la lógica para cada segmento (a–g) de un display de 7 segmentos a partir de entrada BCD de 4 bits.</p>

        <h3>Simulador — Display 7 Segmentos</h3>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>Entrada BCD</div>
              <div className="ed-bits" style={{ marginBottom: 8 }}>
                {bcdBits.map((b, i) => (
                  <div key={i} className={`ed-bit ${b ? 'ed-bit-1' : 'ed-bit-0'}`}
                    onClick={() => toggleBcd(i)}
                    style={{ cursor: 'pointer' }}>{b}</div>
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>
                Decimal: <strong style={{ color: bcdVal > 9 ? '#ef4444' : '#a78bfa' }}>{bcdVal}</strong>
                {bcdVal > 9 && <span style={{ color: '#ef4444' }}> (inválido BCD)</span>}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>Segmentos activos:</div>
                {['a','b','c','d','e','f','g'].map((seg, i) => {
                  const active = bcdVal <= 9 && SEGMENTS_MAP[bcdVal]?.[i];
                  return (
                    <span key={seg} className="ed-chip" style={active ? { background: 'rgba(34,197,94,0.2)', borderColor: '#22c55e', color: '#22c55e' } : {}}>
                      {seg}: {active ? '1' : '0'}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <SevenSegDisplay value={bcdVal <= 9 ? bcdVal : null} size={80} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            {[0,1,2,3,4,5,6,7,8,9].map(n => (
              <button key={n} className="ed-btn ed-btn-sm ed-btn-outline"
                onClick={() => setBcdBits(n.toString(2).padStart(4, '0').split('').map(Number))}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Design Workbench */}
      <div className="ed-section">
        <h2>Mesa de Diseño — Tu Proyecto</h2>
        <p>Seguí los pasos para diseñar tu propio circuito digital desde cero.</p>
        <div className="ed-sim">
          {/* Step 1: Variables */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="ed-sim-title">Paso 1 — Definir variables</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[2, 3, 4].map(v => (
                <button key={v} className={`ed-btn ed-btn-sm ${wbVars === v ? '' : 'ed-btn-outline'}`}
                  onClick={() => changeVars(v)}>{v} variables</button>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: 4 }}>Variables: {wbVarNames.join(', ')} ({Math.pow(2, wbVars)} combinaciones)</p>
          </div>

          {/* Step 2: Truth table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="ed-sim-title">Paso 2 — Completar tabla de verdad</div>
            <p style={{ fontSize: '0.85rem', color: '#888' }}>Clic en la columna F para definir la salida de cada fila.</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="ed-truth-table" style={{ maxWidth: 400, margin: '0 auto' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    {wbVarNames.map(v => <th key={v}>{v}</th>)}
                    <th>F</th>
                  </tr>
                </thead>
                <tbody>
                  {wbOutputs.map((o, i) => (
                    <tr key={i} style={o ? { background: 'rgba(34,197,94,0.08)' } : {}}>
                      <td style={{ color: '#888' }}>{i}</td>
                      {wbVarNames.map((_, vi) => {
                        const bit = (i >> (wbVars - 1 - vi)) & 1;
                        return <td key={vi} className={bit ? 'td-high' : 'td-low'}>{bit}</td>;
                      })}
                      <td className={o ? 'td-high' : 'td-low'}
                        style={{ cursor: 'pointer', fontWeight: 700 }}
                        onClick={() => wbToggle(i)}>{o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 3: Canonical form */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="ed-sim-title">Paso 3 — Forma canónica SOP</div>
            <div className="ed-result">
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Mintérminos</div>
              {wbMinterms.length > 0 ? `F = Σm(${wbMinterms.join(',')})` : 'F = 0 (no hay salidas en 1)'}
            </div>
          </div>

          {/* Step 4: Simplified expression */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="ed-sim-title">Paso 4 — Expresión</div>
            <div className="ed-result">
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Expresión SOP</div>
              F = {wbExpr}
            </div>
          </div>

          {/* Step 5: Gates needed */}
          <div>
            <div className="ed-sim-title">Paso 5 — Compuertas necesarias</div>
            {wbMinterms.length > 0 ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {wbMinterms.length > 1 && <span className="ed-chip">OR × 1</span>}
                <span className="ed-chip">AND × {wbMinterms.length}</span>
                <span className="ed-chip">NOT (según complementos)</span>
              </div>
            ) : (
              <p style={{ color: '#888' }}>Definí al menos una salida en 1.</p>
            )}
          </div>
        </div>
      </div>

      {/* Evaluation criteria */}
      <div className="ed-section">
        <h2>Criterios de Evaluación del Proyecto</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table">
            <thead><tr><th>Criterio</th><th>Ponderación</th><th>Descripción</th></tr></thead>
            <tbody>
              {[
                ['Especificación', '15%', 'Definición clara del problema y variables'],
                ['Tabla de verdad', '15%', 'Tabla completa y correcta'],
                ['Simplificación', '20%', 'Uso correcto de K-map, expresión mínima'],
                ['Circuito', '20%', 'Implementación con compuertas, diagrama limpio'],
                ['Simulación', '15%', 'Verificación funcional del diseño'],
                ['Presentación', '15%', 'Defensa oral, claridad, trabajo en equipo'],
              ].map(([c, p, d], i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c}</td>
                  <td style={{ color: '#a78bfa' }}>{p}</td>
                  <td style={{ textAlign: 'left' }}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources */}
      <div className="ed-section">
        <h2>Recursos y Próximos Pasos</h2>
        <div className="ed-grid-2">
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Software de simulación</div>
            <ul style={{ paddingLeft: '1.2rem', marginTop: 4 }}>
              <li>Logisim Evolution</li>
              <li>Digital (simulator)</li>
              <li>Proteus / Multisim</li>
            </ul>
          </div>
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>ICs recomendados</div>
            <ul style={{ paddingLeft: '1.2rem', marginTop: 4 }}>
              <li>74HC00 — NAND</li>
              <li>74HC08 — AND</li>
              <li>74HC32 — OR</li>
              <li>74HC86 — XOR</li>
              <li>74HC138 — Decoder 3:8</li>
              <li>74HC151 — MUX 8:1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDigitalPage;

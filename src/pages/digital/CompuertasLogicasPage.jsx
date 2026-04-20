import React, { useState } from 'react';
import './ElectronicaDigital.css';

const GATES = {
  AND:  { fn: (a, b) => a & b, expr: 'A · B',   sym: 'AND' },
  OR:   { fn: (a, b) => a | b, expr: 'A + B',   sym: 'OR' },
  NOT:  { fn: (a)    => a ? 0 : 1, expr: "A'", sym: 'NOT', unary: true },
  NAND: { fn: (a, b) => (a & b) ? 0 : 1, expr: "(A · B)'", sym: 'NAND' },
  NOR:  { fn: (a, b) => (a | b) ? 0 : 1, expr: "(A + B)'", sym: 'NOR' },
  XOR:  { fn: (a, b) => a ^ b, expr: 'A ⊕ B',  sym: 'XOR' },
};

const GateSVG = ({ type, a, b, out, size = 120 }) => {
  const cA = a ? '#22c55e' : '#ef4444';
  const cB = b ? '#22c55e' : '#ef4444';
  const cO = out ? '#22c55e' : '#ef4444';
  const s = size;
  const w = s, h = s * 0.75;

  const bodyColor = '#a78bfa';

  if (type === 'NOT') {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
        <line x1="5" y1={h / 2} x2="30" y2={h / 2} stroke={cA} strokeWidth="2.5" />
        <polygon points={`30,${h * 0.2} 85,${h / 2} 30,${h * 0.8}`} fill="none" stroke={bodyColor} strokeWidth="2" />
        <circle cx="90" cy={h / 2} r="5" fill="none" stroke={bodyColor} strokeWidth="2" />
        <line x1="95" y1={h / 2} x2={w - 5} y2={h / 2} stroke={cO} strokeWidth="2.5" />
        <text x="55" y={h / 2 + 4} fill={bodyColor} fontSize="11" textAnchor="middle" fontWeight="700">1</text>
      </svg>
    );
  }

  const bubble = type === 'NAND' || type === 'NOR';
  const isOr = type === 'OR' || type === 'NOR' || type === 'XOR';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      {/* input lines */}
      <line x1="5" y1={h * 0.33} x2="35" y2={h * 0.33} stroke={cA} strokeWidth="2.5" />
      <line x1="5" y1={h * 0.67} x2="35" y2={h * 0.67} stroke={cB} strokeWidth="2.5" />

      {/* gate body */}
      {isOr ? (
        <path d={`M35,${h * 0.15} Q50,${h / 2} 35,${h * 0.85} Q75,${h * 0.85} 90,${h / 2} Q75,${h * 0.15} 35,${h * 0.15} Z`}
          fill="none" stroke={bodyColor} strokeWidth="2" />
      ) : (
        <>
          <rect x="35" y={h * 0.15} width="40" height={h * 0.7} rx="2" fill="none" stroke={bodyColor} strokeWidth="2" />
          <path d={`M75,${h * 0.15} Q95,${h / 2} 75,${h * 0.85}`} fill="none" stroke={bodyColor} strokeWidth="2" />
        </>
      )}

      {type === 'XOR' && (
        <path d={`M30,${h * 0.15} Q45,${h / 2} 30,${h * 0.85}`} fill="none" stroke={bodyColor} strokeWidth="2" />
      )}

      {/* bubble */}
      {bubble && <circle cx="93" cy={h / 2} r="4" fill="none" stroke={bodyColor} strokeWidth="2" />}

      {/* output line */}
      <line x1={bubble ? 97 : 92} y1={h / 2} x2={w - 5} y2={h / 2} stroke={cO} strokeWidth="2.5" />

      {/* labels */}
      <text x="12" y={h * 0.33 - 6} fill="#888" fontSize="9">A={a}</text>
      <text x="12" y={h * 0.67 + 14} fill="#888" fontSize="9">B={b}</text>
      <text x={w - 18} y={h / 2 - 6} fill="#888" fontSize="9">={out}</text>
    </svg>
  );
};

const truthTable = (gateName) => {
  const g = GATES[gateName];
  if (g.unary) {
    return [0, 1].map(a => ({ a, out: g.fn(a) }));
  }
  return [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => ({ a, b, out: g.fn(a, b) }));
};

/* simple 3-var expression parser */
const evalExpr = (expr, vals) => {
  let e = expr.toUpperCase().replace(/\s+/g, '');
  e = e.replace(/A/g, vals.A.toString());
  e = e.replace(/B/g, vals.B.toString());
  e = e.replace(/C/g, vals.C.toString());
  // NOT: x'
  for (let i = 0; i < 5; i++) e = e.replace(/([01])'/g, (_, v) => v === '1' ? '0' : '1');
  // AND: x·y or xy (adjacent digits)
  for (let i = 0; i < 5; i++) e = e.replace(/([01])·([01])/g, (_, a, b) => String(Number(a) & Number(b)));
  for (let i = 0; i < 5; i++) e = e.replace(/([01])([01])/g, (_, a, b) => String(Number(a) & Number(b)));
  // OR: x+y
  for (let i = 0; i < 5; i++) e = e.replace(/([01])\+([01])/g, (_, a, b) => String(Number(a) | Number(b)));
  // XOR: x⊕y
  for (let i = 0; i < 5; i++) e = e.replace(/([01])⊕([01])/g, (_, a, b) => String(Number(a) ^ Number(b)));
  return e === '1' ? 1 : 0;
};

const CompuertasLogicasPage = () => {
  const [selGate, setSelGate] = useState('AND');
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);
  const [funcExpr, setFuncExpr] = useState("A·B + C'");

  const gate = GATES[selGate];
  const output = gate.unary ? gate.fn(inA) : gate.fn(inA, inB);
  const tt = truthTable(selGate);

  /* Function builder truth table */
  const funcRows = [];
  for (let i = 0; i < 8; i++) {
    const A = (i >> 2) & 1, B = (i >> 1) & 1, C = i & 1;
    let out;
    try { out = evalExpr(funcExpr, { A, B, C }); } catch { out = '?'; }
    funcRows.push({ A, B, C, out });
  }

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 9–12</span>
        <h1>Unidad 3 — Compuertas Lógicas</h1>
        <p>AND, OR, NOT, NAND, NOR, XOR — símbolos, tablas de verdad e implementación de funciones lógicas.</p>
      </div>

      {/* Referencia de compuertas */}
      <div className="ed-section">
        <h2>Referencia de Compuertas</h2>
        <div className="ed-grid-3">
          {Object.entries(GATES).map(([name, g]) => (
            <div key={name} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>{name}</div>
              <GateSVG type={name} a={1} b={1} out={g.unary ? g.fn(1) : g.fn(1, 1)} size={110} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 4 }}>F = {g.expr}</div>
              {/* mini truth table */}
              <table className="ed-truth-table" style={{ margin: '0.5rem auto', fontSize: '0.75rem' }}>
                <thead>
                  <tr>{!g.unary && <th>A</th>}{!g.unary && <th>B</th>}{g.unary && <th>A</th>}<th>F</th></tr>
                </thead>
                <tbody>
                  {truthTable(name).map((r, i) => (
                    <tr key={i}>
                      <td className={r.a ? 'td-high' : 'td-low'}>{r.a}</td>
                      {!g.unary && <td className={r.b ? 'td-high' : 'td-low'}>{r.b}</td>}
                      <td className={r.out ? 'td-high' : 'td-low'}>{r.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Simulador interactivo */}
      <div className="ed-section">
        <h2>Simulador — Compuerta Interactiva</h2>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {Object.keys(GATES).map(name => (
              <button
                key={name}
                className={`ed-btn ed-btn-sm ${selGate === name ? '' : 'ed-btn-outline'}`}
                onClick={() => setSelGate(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>A</div>
                <div className={`ed-bit ${inA ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => setInA(inA ? 0 : 1)}
                  style={{ width: 54, height: 54, fontSize: '1.4rem' }}>{inA}</div>
              </div>
              {!gate.unary && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>B</div>
                  <div className={`ed-bit ${inB ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => setInB(inB ? 0 : 1)}
                    style={{ width: 54, height: 54, fontSize: '1.4rem' }}>{inB}</div>
                </div>
              )}
            </div>

            {/* Gate SVG */}
            <div>
              <GateSVG type={selGate} a={inA} b={inB} out={output} size={140} />
            </div>

            {/* Output */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>Salida</div>
              <div className={`ed-bit ${output ? 'ed-bit-1' : 'ed-bit-0'}`}
                style={{ width: 64, height: 64, fontSize: '1.8rem' }}>{output}</div>
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 8 }}>{gate.expr} = {output}</div>
            </div>
          </div>

          {/* Truth table with highlight */}
          <h3 style={{ marginTop: '1.5rem' }}>Tabla de verdad — {selGate}</h3>
          <table className="ed-truth-table" style={{ maxWidth: 300, margin: '0 auto' }}>
            <thead>
              <tr>{!gate.unary && <th>A</th>}{!gate.unary && <th>B</th>}{gate.unary && <th>A</th>}<th>F</th></tr>
            </thead>
            <tbody>
              {tt.map((r, i) => {
                const isActive = gate.unary ? r.a === inA : (r.a === inA && r.b === inB);
                return (
                  <tr key={i} style={isActive ? { background: 'rgba(124,58,237,0.2)' } : {}}>
                    <td className={r.a ? 'td-high' : 'td-low'}>{r.a}</td>
                    {!gate.unary && <td className={r.b ? 'td-high' : 'td-low'}>{r.b}</td>}
                    <td className={r.out ? 'td-high' : 'td-low'} style={{ fontWeight: isActive ? 900 : 400 }}>{r.out}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Constructor de funciones */}
      <div className="ed-section">
        <h2>Simulador — Construir una Función</h2>
        <p>Escribí una expresión con variables A, B, C. Usá: <code style={{ color: '#a78bfa' }}>·</code> (AND), <code style={{ color: '#a78bfa' }}>+</code> (OR), <code style={{ color: '#a78bfa' }}>'</code> (NOT), <code style={{ color: '#a78bfa' }}>⊕</code> (XOR).</p>
        <div className="ed-sim">
          <div className="ed-input-row">
            <label>F =</label>
            <input value={funcExpr} onChange={e => setFuncExpr(e.target.value)} style={{ width: 250 }} placeholder="ej: A·B + C'" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {["A·B+C'", "A'·B+A·B'", "(A+B)·C", "A⊕B", "A'·B'·C'"].map(ex => (
              <button key={ex} className="ed-btn ed-btn-sm ed-btn-outline" onClick={() => setFuncExpr(ex)}>{ex}</button>
            ))}
          </div>
          <table className="ed-truth-table" style={{ maxWidth: 350, margin: '0 auto' }}>
            <thead><tr><th>A</th><th>B</th><th>C</th><th>F</th></tr></thead>
            <tbody>
              {funcRows.map((r, i) => (
                <tr key={i}>
                  <td className={r.A ? 'td-high' : 'td-low'}>{r.A}</td>
                  <td className={r.B ? 'td-high' : 'td-low'}>{r.B}</td>
                  <td className={r.C ? 'td-high' : 'td-low'}>{r.C}</td>
                  <td className={r.out === 1 ? 'td-high' : 'td-low'} style={{ fontWeight: 700 }}>{r.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen */}
      <div className="ed-section">
        <h2>Compuertas Universales</h2>
        <p>Las compuertas <strong>NAND</strong> y <strong>NOR</strong> son <em>universales</em>: cualquier función lógica puede implementarse usando solamente una de ellas.</p>
        <div className="ed-grid-2">
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>NOT con NAND</div>
            A' = (A · A)' = A NAND A
          </div>
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>AND con NAND</div>
            A·B = ((A·B)')' = NAND(NAND(A,B))
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompuertasLogicasPage;

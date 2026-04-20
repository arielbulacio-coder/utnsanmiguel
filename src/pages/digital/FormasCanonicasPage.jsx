import React, { useState } from 'react';
import './ElectronicaDigital.css';

const VARS = ['A', 'B', 'C'];

const FormasCanonicasPage = () => {
  const [outputs, setOutputs] = useState([0, 0, 0, 1, 0, 1, 1, 1]); // 8 rows for 3 vars

  const toggle = (i) => setOutputs(prev => { const n = [...prev]; n[i] = n[i] ? 0 : 1; return n; });

  /* SOP: minterms where output = 1 */
  const minterms = outputs.map((o, i) => o === 1 ? i : -1).filter(i => i >= 0);
  const maxterms = outputs.map((o, i) => o === 0 ? i : -1).filter(i => i >= 0);

  const mintermExpr = (idx) => {
    const bits = [(idx >> 2) & 1, (idx >> 1) & 1, idx & 1];
    return bits.map((b, i) => b ? VARS[i] : VARS[i] + "'").join('·');
  };

  const maxtermExpr = (idx) => {
    const bits = [(idx >> 2) & 1, (idx >> 1) & 1, idx & 1];
    return '(' + bits.map((b, i) => b ? VARS[i] + "'" : VARS[i]).join('+') + ')';
  };

  const sopStr = minterms.length === 0 ? '0' : minterms.map(m => mintermExpr(m)).join(' + ');
  const posStr = maxterms.length === 0 ? '1' : maxterms.map(m => maxtermExpr(m)).join(' · ');
  const sigmaStr = minterms.length === 0 ? 'F = 0' : `F = Σm(${minterms.join(',')})`;
  const piStr = maxterms.length === 0 ? 'F = 1' : `F = ΠM(${maxterms.join(',')})`;

  /* Presets */
  const presets = [
    { name: 'AND (A·B·C)', vals: [0,0,0,0,0,0,0,1] },
    { name: 'OR (A+B+C)', vals: [0,1,1,1,1,1,1,1] },
    { name: 'XOR (A⊕B⊕C)', vals: [0,1,1,0,1,0,0,1] },
    { name: 'Mayoría', vals: [0,0,0,1,0,1,1,1] },
  ];

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 13–16</span>
        <h1>Unidad 4 — Formas Canónicas</h1>
        <p>Mintérminos (SOP) y Maxtérminos (POS). Extracción de ecuaciones desde tablas de verdad.</p>
      </div>

      {/* Teoría */}
      <div className="ed-section">
        <h2>Mintérminos y Maxtérminos</h2>
        <div className="ed-grid-2">
          <div>
            <h3>SOP — Suma de Productos (Σ)</h3>
            <p>Se toman las filas donde la salida es <strong>1</strong>. Para cada fila se forma un <em>mintérmino</em> (producto) donde la variable aparece <strong>sin complementar</strong> si vale 1 y <strong>complementada</strong> si vale 0. Luego se suman (OR) todos los mintérminos.</p>
          </div>
          <div>
            <h3>POS — Producto de Sumas (Π)</h3>
            <p>Se toman las filas donde la salida es <strong>0</strong>. Para cada fila se forma un <em>maxtérmino</em> (suma) donde la variable aparece <strong>complementada</strong> si vale 1 y <strong>sin complementar</strong> si vale 0. Luego se multiplican (AND) todos los maxtérminos.</p>
          </div>
        </div>
      </div>

      {/* Ejemplo paso a paso */}
      <div className="ed-section">
        <h2>Ejemplo: Función Mayoría</h2>
        <p>F = 1 cuando al menos 2 de 3 entradas son 1. Mintérminos: m3, m5, m6, m7.</p>
        <div className="ed-grid-2">
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>SOP</div>
            F = Σm(3,5,6,7) = A'·B·C + A·B'·C + A·B·C' + A·B·C
          </div>
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>POS</div>
            F = ΠM(0,1,2,4) = (A+B+C)·(A+B+C')·(A+B'+C)·(A'+B+C)
          </div>
        </div>
      </div>

      {/* Simulador */}
      <div className="ed-section">
        <h2>Simulador — Tabla de Verdad → Formas Canónicas</h2>
        <p>Hacé clic en la columna <strong>F</strong> para cambiar la salida de cada fila.</p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {presets.map(p => (
            <button key={p.name} className="ed-btn ed-btn-sm ed-btn-outline" onClick={() => setOutputs([...p.vals])}>{p.name}</button>
          ))}
          <button className="ed-btn ed-btn-sm" onClick={() => setOutputs([0,0,0,0,0,0,0,0])}>Reset</button>
        </div>

        <div className="ed-sim">
          <div style={{ overflowX: 'auto' }}>
            <table className="ed-truth-table" style={{ maxWidth: 500, margin: '0 auto' }}>
              <thead>
                <tr><th>#</th><th>A</th><th>B</th><th>C</th><th style={{ cursor: 'pointer' }}>F (clic)</th><th>Mintérmino</th><th>Maxtérmino</th></tr>
              </thead>
              <tbody>
                {outputs.map((o, i) => {
                  const A = (i >> 2) & 1, B = (i >> 1) & 1, C = i & 1;
                  return (
                    <tr key={i} style={o ? { background: 'rgba(34,197,94,0.08)' } : {}}>
                      <td style={{ color: '#888' }}>m{i}</td>
                      <td className={A ? 'td-high' : 'td-low'}>{A}</td>
                      <td className={B ? 'td-high' : 'td-low'}>{B}</td>
                      <td className={C ? 'td-high' : 'td-low'}>{C}</td>
                      <td
                        className={o ? 'td-high' : 'td-low'}
                        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem' }}
                        onClick={() => toggle(i)}
                      >
                        {o}
                      </td>
                      <td style={{ fontSize: '0.8rem', color: o ? '#22c55e' : '#555' }}>{o ? mintermExpr(i) : '—'}</td>
                      <td style={{ fontSize: '0.8rem', color: !o ? '#ef4444' : '#555' }}>{!o ? maxtermExpr(i) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div className="ed-result" style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Notación SOP</div>
              <div>{sigmaStr}</div>
              <div style={{ fontSize: '0.9rem', marginTop: 4 }}>F = {sopStr}</div>
            </div>
            <div className="ed-result">
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Notación POS</div>
              <div>{piStr}</div>
              <div style={{ fontSize: '0.9rem', marginTop: 4 }}>F = {posStr}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equivalencia */}
      <div className="ed-section">
        <h2>Relación entre SOP y POS</h2>
        <p>Los índices de mintérminos y maxtérminos son <strong>complementarios</strong>. Si una función tiene minterms {'{0,3,5}'} con 3 variables, los maxterms son {'{1,2,4,6,7}'}.</p>
        <div className="ed-result" style={{ textAlign: 'center' }}>
          Σm(i₁, i₂, …) = ΠM(todos los demás índices)
        </div>
      </div>
    </div>
  );
};

export default FormasCanonicasPage;

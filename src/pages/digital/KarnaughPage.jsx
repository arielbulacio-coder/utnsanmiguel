import React, { useState } from 'react';
import './ElectronicaDigital.css';

const GRAY2 = ['0', '1'];
const GRAY4 = ['00', '01', '11', '10'];

/* ── 2-var K-Map ── */
const KMap2 = () => {
  const [cells, setCells] = useState([0, 0, 0, 0]); // A\B: 00,01,10,11
  const toggle = i => setCells(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  const simplify2 = () => {
    const [c0, c1, c2, c3] = cells; // AB: 00,01,10,11
    if (c0 && c1 && c2 && c3) return '1';
    if (!c0 && !c1 && !c2 && !c3) return '0';
    const terms = [];
    // rows
    if (c0 && c1) terms.push("A'");
    if (c2 && c3) terms.push('A');
    // cols
    if (c0 && c2) terms.push("B'");
    if (c1 && c3) terms.push('B');
    // singles
    if (terms.length === 0) {
      if (c0) terms.push("A'·B'");
      if (c1) terms.push("A'·B");
      if (c2) terms.push("A·B'");
      if (c3) terms.push("A·B");
    }
    return terms.join(' + ') || '0';
  };

  return (
    <div className="ed-sim">
      <div className="ed-sim-title">Mapa de Karnaugh — 2 Variables</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 56px 56px', gap: 2 }}>
          <div className="ed-kmap-header">A\B</div>
          <div className="ed-kmap-header">0</div>
          <div className="ed-kmap-header">1</div>
          <div className="ed-kmap-header">0</div>
          <div className={`ed-kmap-cell ${cells[0] ? 'active' : ''}`} onClick={() => toggle(0)}>{cells[0]}</div>
          <div className={`ed-kmap-cell ${cells[1] ? 'active' : ''}`} onClick={() => toggle(1)}>{cells[1]}</div>
          <div className="ed-kmap-header">1</div>
          <div className={`ed-kmap-cell ${cells[2] ? 'active' : ''}`} onClick={() => toggle(2)}>{cells[2]}</div>
          <div className={`ed-kmap-cell ${cells[3] ? 'active' : ''}`} onClick={() => toggle(3)}>{cells[3]}</div>
        </div>
      </div>
      <div className="ed-result" style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: '#888' }}>Expresión simplificada</div>
        F = {simplify2()}
      </div>
    </div>
  );
};

/* ── 3-var K-Map ── */
const KMap3 = () => {
  // rows: A (0,1), cols: BC in Gray (00,01,11,10)
  const [cells, setCells] = useState(Array(8).fill(0));
  const toggle = i => setCells(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  // index: A*4 + grayCol
  const idx = (a, colG) => a * 4 + colG;

  const simplify3 = () => {
    const ones = cells.map((v, i) => v ? i : -1).filter(i => i >= 0);
    if (ones.length === 0) return '0';
    if (ones.length === 8) return '1';

    const terms = [];
    const covered = new Set();
    const grayOrder = [0, 1, 3, 2]; // col order in kmap

    // Check groups of 4 (full row, full col pair, wrap)
    // Full row A=0
    if ([0,1,2,3].every(c => cells[c])) { terms.push("A'"); [0,1,2,3].forEach(c => covered.add(c)); }
    // Full row A=1
    if ([4,5,6,7].every(c => cells[c])) { terms.push('A'); [4,5,6,7].forEach(c => covered.add(c)); }
    // Pairs of cols
    for (let ci = 0; ci < 4; ci++) {
      const cj = (ci + 1) % 4;
      const g1 = grayOrder[ci], g2 = grayOrder[cj];
      if (cells[g1] && cells[g2] && cells[4 + g1] && cells[4 + g2]) {
        // 4 cells spanning both A rows
        const bc1 = GRAY4[ci], bc2 = GRAY4[cj];
        // find common bits
        let t = '';
        if (bc1[0] === bc2[0]) t += bc1[0] === '1' ? 'B' : "B'";
        if (bc1[1] === bc2[1]) t += (t ? '·' : '') + (bc1[1] === '1' ? 'C' : "C'");
        if (t && !terms.includes(t)) { terms.push(t); [g1, g2, 4 + g1, 4 + g2].forEach(c => covered.add(c)); }
      }
    }

    // Groups of 2
    for (let a = 0; a < 2; a++) {
      for (let ci = 0; ci < 4; ci++) {
        const cj = (ci + 1) % 4;
        const i1 = a * 4 + grayOrder[ci], i2 = a * 4 + grayOrder[cj];
        if (cells[i1] && cells[i2] && !covered.has(i1) && !covered.has(i2)) {
          const bc1 = GRAY4[ci], bc2 = GRAY4[cj];
          let t = a ? 'A' : "A'";
          if (bc1[0] === bc2[0]) t += '·' + (bc1[0] === '1' ? 'B' : "B'");
          if (bc1[1] === bc2[1]) t += '·' + (bc1[1] === '1' ? 'C' : "C'");
          terms.push(t);
          covered.add(i1); covered.add(i2);
        }
      }
      // vertical pairs
      for (let c = 0; c < 4; c++) {
        const i1 = grayOrder[c], i2 = 4 + grayOrder[c];
        if (cells[i1] && cells[i2] && !covered.has(i1) && !covered.has(i2)) {
          const bc = GRAY4[c];
          let t = (bc[0] === '1' ? 'B' : "B'") + '·' + (bc[1] === '1' ? 'C' : "C'");
          terms.push(t);
          covered.add(i1); covered.add(i2);
        }
      }
    }

    // Singles
    ones.filter(i => !covered.has(i)).forEach(i => {
      const a = Math.floor(i / 4), c = i % 4;
      const gIdx = grayOrder.indexOf(c);
      const bc = GRAY4[gIdx >= 0 ? gIdx : 0];
      terms.push((a ? 'A' : "A'") + '·' + (bc[0] === '1' ? 'B' : "B'") + '·' + (bc[1] === '1' ? 'C' : "C'"));
    });

    return terms.join(' + ') || '0';
  };

  return (
    <div className="ed-sim">
      <div className="ed-sim-title">Mapa de Karnaugh — 3 Variables</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 56px)', gap: 2 }}>
          <div className="ed-kmap-header">A\BC</div>
          {GRAY4.map(g => <div key={g} className="ed-kmap-header">{g}</div>)}
          {[0, 1].map(a => (
            <React.Fragment key={a}>
              <div className="ed-kmap-header">{a}</div>
              {[0, 1, 3, 2].map(c => {
                const i = a * 4 + c;
                return (
                  <div key={c} className={`ed-kmap-cell ${cells[i] ? 'active' : ''}`} onClick={() => toggle(i)}>
                    {cells[i]}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="ed-result" style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: '#888' }}>Expresión simplificada</div>
        F = {simplify3()}
      </div>
    </div>
  );
};

/* ── 4-var K-Map ── */
const KMap4 = () => {
  const [cells, setCells] = useState(Array(16).fill(0));
  const toggle = i => setCells(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  const grayOrder = [0, 1, 3, 2];
  const cellIdx = (r, c) => grayOrder[r] * 4 + grayOrder[c];

  const simplify4 = () => {
    const ones = cells.map((v, i) => v ? i : -1).filter(i => i >= 0);
    if (ones.length === 0) return '0';
    if (ones.length === 16) return '1';

    // Simple heuristic: list minterms as SOP
    const terms = ones.map(i => {
      const a = (i >> 3) & 1, b = (i >> 2) & 1, c = (i >> 1) & 1, d = i & 1;
      return (a ? 'A' : "A'") + (b ? 'B' : "B'") + (c ? 'C' : "C'") + (d ? 'D' : "D'");
    });

    // Try basic groups
    const covered = new Set();
    const simplified = [];

    // Check all 16: constant 1
    if (ones.length === 16) return '1';

    // Check groups of 8 (one variable eliminated)
    const varCombos = [
      { mask: 0b1000, name: 'A', comp: "A'" },
      { mask: 0b0100, name: 'B', comp: "B'" },
      { mask: 0b0010, name: 'C', comp: "C'" },
      { mask: 0b0001, name: 'D', comp: "D'" },
    ];

    for (const v of varCombos) {
      const with1 = Array.from({ length: 16 }, (_, i) => i).filter(i => (i & v.mask));
      const with0 = Array.from({ length: 16 }, (_, i) => i).filter(i => !(i & v.mask));
      if (with1.every(i => cells[i]) && with1.length === 8) {
        simplified.push(v.name);
        with1.forEach(i => covered.add(i));
      }
      if (with0.every(i => cells[i]) && with0.length === 8) {
        simplified.push(v.comp);
        with0.forEach(i => covered.add(i));
      }
    }

    // Groups of 4 (two variables fixed)
    for (let vi = 0; vi < 4; vi++) {
      for (let vj = vi + 1; vj < 4; vj++) {
        for (let b1 = 0; b1 < 2; b1++) {
          for (let b2 = 0; b2 < 2; b2++) {
            const group = Array.from({ length: 16 }, (_, i) => i).filter(i =>
              ((i >> (3 - vi)) & 1) === b1 && ((i >> (3 - vj)) & 1) === b2
            );
            if (group.length === 4 && group.every(i => cells[i]) && group.some(i => !covered.has(i))) {
              const t = (b1 ? varCombos[vi].name : varCombos[vi].comp) + '·' + (b2 ? varCombos[vj].name : varCombos[vj].comp);
              simplified.push(t);
              group.forEach(i => covered.add(i));
            }
          }
        }
      }
    }

    // Groups of 2
    for (let vi = 0; vi < 4; vi++) {
      for (let vj = vi + 1; vj < 4; vj++) {
        for (let vk = vj + 1; vk < 4; vk++) {
          for (let b1 = 0; b1 < 2; b1++) {
            for (let b2 = 0; b2 < 2; b2++) {
              for (let b3 = 0; b3 < 2; b3++) {
                const group = Array.from({ length: 16 }, (_, i) => i).filter(i =>
                  ((i >> (3 - vi)) & 1) === b1 && ((i >> (3 - vj)) & 1) === b2 && ((i >> (3 - vk)) & 1) === b3
                );
                if (group.length === 2 && group.every(i => cells[i]) && group.some(i => !covered.has(i))) {
                  const t = (b1 ? varCombos[vi].name : varCombos[vi].comp) + '·' +
                    (b2 ? varCombos[vj].name : varCombos[vj].comp) + '·' +
                    (b3 ? varCombos[vk].name : varCombos[vk].comp);
                  simplified.push(t);
                  group.forEach(i => covered.add(i));
                }
              }
            }
          }
        }
      }
    }

    // Remaining singles
    ones.filter(i => !covered.has(i)).forEach(i => {
      simplified.push(terms[ones.indexOf(i)]);
      covered.add(i);
    });

    return simplified.join(' + ') || '0';
  };

  return (
    <div className="ed-sim">
      <div className="ed-sim-title">Mapa de Karnaugh — 4 Variables</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 56px)', gap: 2 }}>
          <div className="ed-kmap-header">AB\CD</div>
          {GRAY4.map(g => <div key={g} className="ed-kmap-header">{g}</div>)}
          {GRAY4.map((rg, ri) => (
            <React.Fragment key={ri}>
              <div className="ed-kmap-header">{rg}</div>
              {GRAY4.map((cg, ci) => {
                const i = grayOrder[ri] * 4 + grayOrder[ci];
                return (
                  <div key={ci} className={`ed-kmap-cell ${cells[i] ? 'active' : ''}`} onClick={() => toggle(i)}>
                    {cells[i]}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
        <button className="ed-btn ed-btn-sm" onClick={() => setCells(Array(16).fill(0))}>Reset</button>
        <button className="ed-btn ed-btn-sm ed-btn-outline" onClick={() => setCells(cells.map(c => c ? 0 : 1))}>Invertir</button>
      </div>
      <div className="ed-result" style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: '#888' }}>Expresión simplificada (SOP)</div>
        F = {simplify4()}
      </div>
    </div>
  );
};

/* ── Main Page ── */
const KarnaughPage = () => {
  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 17–20</span>
        <h1>Unidad 5 — Mapas de Karnaugh</h1>
        <p>Simplificación de funciones booleanas con mapas de 2, 3 y 4 variables.</p>
      </div>

      {/* Teoría */}
      <div className="ed-section">
        <h2>Principios del Mapa de Karnaugh</h2>
        <p>El mapa de Karnaugh es una herramienta gráfica para <strong>simplificar funciones booleanas</strong>. Organiza los mintérminos en una grilla donde celdas adyacentes difieren en <strong>un solo bit</strong> (código Gray).</p>
        <h3>Reglas de Agrupamiento</h3>
        <ol className="ed-steps">
          <li>Los grupos deben contener <strong>potencias de 2</strong> celdas: 1, 2, 4, 8 o 16.</li>
          <li>Los grupos deben ser <strong>rectangulares</strong> (filas, columnas o bloques).</li>
          <li>Solo se agrupan celdas con valor <strong>1</strong>.</li>
          <li>Los grupos pueden <strong>envolver bordes</strong> (la primera y última fila/columna son adyacentes).</li>
          <li>Cada grupo elimina las variables que cambian dentro del grupo.</li>
          <li>Buscar los grupos <strong>más grandes</strong> posibles primero.</li>
        </ol>
      </div>

      {/* Adjacencia visual */}
      <div className="ed-section">
        <h2>Adyacencia y Código Gray</h2>
        <p>Las columnas y filas se ordenan en <strong>código Gray</strong> (00, 01, 11, 10) para garantizar que celdas vecinas difieran en un solo bit.</p>
        <div className="ed-grid-2">
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Grupo horizontal</div>
            Elimina la variable que cambia<br />entre las celdas agrupadas
          </div>
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Wrap-around</div>
            Columna 00 es adyacente a 10<br />Fila 00 es adyacente a 10
          </div>
        </div>
      </div>

      {/* Simuladores */}
      <div className="ed-section">
        <h2>Simuladores Interactivos</h2>
        <p>Hacé clic en las celdas para activar/desactivar mintérminos. La expresión se simplifica automáticamente.</p>
        <KMap2 />
        <div style={{ height: '1.5rem' }} />
        <KMap3 />
        <div style={{ height: '1.5rem' }} />
        <KMap4 />
      </div>

      {/* Ejemplo resuelto */}
      <div className="ed-section">
        <h2>Ejemplo Resuelto</h2>
        <p>F(A,B,C,D) = Σm(0, 1, 2, 5, 8, 9, 10) → Simplificación:</p>
        <ol className="ed-steps">
          <li>Ubicar los 1s en el mapa de 4 variables.</li>
          <li>Grupo de 4: m0, m1, m8, m9 → B'·D' (A y C cambian)... Corrección: celdas 0000, 0001, 1000, 1001 → <strong>B'·C'</strong></li>
          <li>Grupo de 2: m2, m10 → B'·C·D' (solo A cambia) → <strong>C·D'·B'</strong></li>
          <li>Celda sola: m5 = 0101 → <strong>A'·B·C'·D</strong></li>
          <li>Resultado: F = B'·C' + B'·C·D' + A'·B·C'·D</li>
        </ol>
      </div>
    </div>
  );
};

export default KarnaughPage;

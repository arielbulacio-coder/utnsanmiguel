import React, { useState } from 'react';
import './ElectronicaDigital.css';

/* helpers */
const dec2bin = (n, w = 4) => n.toString(2).padStart(w, '0');
const bin2gray = (bin) => {
  let g = bin[0];
  for (let i = 1; i < bin.length; i++) g += String(Number(bin[i - 1]) ^ Number(bin[i]));
  return g;
};
const gray2bin = (gray) => {
  let b = gray[0];
  for (let i = 1; i < gray.length; i++) b += String(Number(b[i - 1]) ^ Number(gray[i]));
  return b;
};
const dec2bcd = (n) => {
  if (n < 0 || n > 9999) return 'Fuera de rango';
  return n.toString().split('').map(d => dec2bin(parseInt(d), 4)).join(' ');
};

const CodigosAlgebraPage = () => {
  /* BCD & Gray converter */
  const [decInput, setDecInput] = useState(42);
  /* De Morgan */
  const [dmA, setDmA] = useState(0);
  const [dmB, setDmB] = useState(0);
  /* Boolean simplifier */
  const [boolExpr, setBoolExpr] = useState("A·B + A'·B");

  const binStr = dec2bin(Math.min(Math.max(0, decInput), 255), 8);
  const grayStr = bin2gray(binStr);

  const NOT = v => v ? 0 : 1;
  const AND = (a, b) => a & b;
  const OR = (a, b) => a | b;

  /* De Morgan proof table */
  const dmRows = [
    [0, 0], [0, 1], [1, 0], [1, 1]
  ].map(([a, b]) => ({
    a, b,
    notAB: NOT(AND(a, b)),
    notA_or_notB: OR(NOT(a), NOT(b)),
    notAorB: NOT(OR(a, b)),
    notA_and_notB: AND(NOT(a), NOT(b)),
  }));

  /* Gray code table 0-15 */
  const grayTable = Array.from({ length: 16 }, (_, i) => {
    const b = dec2bin(i, 4);
    const g = bin2gray(b);
    return { dec: i, bin: b, gray: g };
  });

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 5–8</span>
        <h1>Unidad 2 — Códigos y Álgebra de Boole</h1>
        <p>Código BCD, código Gray, leyes del Álgebra de Boole y Teorema de De Morgan.</p>
      </div>

      {/* Código BCD */}
      <div className="ed-section">
        <h2>Código BCD (8421)</h2>
        <p>Cada <strong>dígito decimal</strong> se representa con 4 bits binarios. Es natural para displays de 7 segmentos y aplicaciones donde se necesita visualizar cifras decimales.</p>
        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table" style={{ maxWidth: 400 }}>
            <thead><tr><th>Dec</th><th>BCD</th><th>Dec</th><th>BCD</th></tr></thead>
            <tbody>
              {[0,1,2,3,4].map(i => (
                <tr key={i}>
                  <td>{i}</td><td className="td-high">{dec2bin(i, 4)}</td>
                  <td>{i + 5}</td><td className="td-high">{dec2bin(i + 5, 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '0.5rem' }}>Combinaciones 1010–1111 <strong>no existen</strong> en BCD (son inválidas).</p>
      </div>

      {/* Código Gray */}
      <div className="ed-section">
        <h2>Código Gray</h2>
        <p>Código de <strong>cambio mínimo</strong>: entre valores consecutivos solo cambia <strong>1 bit</strong>. Evita errores de transición en sensores y conversores A/D.</p>
        <h3>Conversión Binario → Gray</h3>
        <p>El bit más significativo se copia. Los demás: G<sub>i</sub> = B<sub>i</sub> ⊕ B<sub>i+1</sub> (XOR de bits adyacentes).</p>

        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table" style={{ maxWidth: 500 }}>
            <thead><tr><th>Dec</th><th>Binario</th><th>Gray</th><th>Dec</th><th>Binario</th><th>Gray</th></tr></thead>
            <tbody>
              {Array.from({ length: 8 }, (_, i) => (
                <tr key={i}>
                  <td>{grayTable[i].dec}</td>
                  <td>{grayTable[i].bin}</td>
                  <td className="td-high">{grayTable[i].gray}</td>
                  <td>{grayTable[i + 8].dec}</td>
                  <td>{grayTable[i + 8].bin}</td>
                  <td className="td-high">{grayTable[i + 8].gray}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulador BCD & Gray */}
      <div className="ed-section">
        <h2>Simulador — Conversor BCD y Gray</h2>
        <div className="ed-sim">
          <div className="ed-input-row">
            <label>Decimal (0–255):</label>
            <input
              type="number" min="0" max="255"
              value={decInput}
              onChange={e => setDecInput(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
              style={{ width: 100 }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div className="ed-result">
              <div style={{ fontSize: '0.7rem', color: '#888' }}>Binario</div>
              <div>{binStr}</div>
            </div>
            <div className="ed-result">
              <div style={{ fontSize: '0.7rem', color: '#888' }}>BCD</div>
              <div>{dec2bcd(decInput)}</div>
            </div>
            <div className="ed-result">
              <div style={{ fontSize: '0.7rem', color: '#888' }}>Gray</div>
              <div>{grayStr}</div>
            </div>
          </div>
          <h3>Paso a paso: Binario → Gray</h3>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.9rem', lineHeight: 2 }}>
            <div>Binario: <span style={{ color: '#a78bfa', letterSpacing: 4 }}>{binStr}</span></div>
            <div>Gray:{'   '}<span style={{ color: '#22c55e', letterSpacing: 4 }}>{grayStr}</span></div>
            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 4 }}>
              G₀ = B₀ = {binStr[0]} | {binStr.split('').slice(0, -1).map((b, i) => `G${i + 1} = ${b}⊕${binStr[i + 1]} = ${grayStr[i + 1]}`).join(' | ')}
            </div>
          </div>
        </div>
      </div>

      {/* Álgebra de Boole */}
      <div className="ed-section">
        <h2>Álgebra de Boole — Propiedades</h2>
        <div className="ed-grid-2">
          {[
            { name: 'Identidad', eq: 'A + 0 = A · 1 = A' },
            { name: 'Complemento', eq: "A + A' = 1 · A · A' = 0" },
            { name: 'Conmutativa', eq: 'A + B = B + A' },
            { name: 'Asociativa', eq: '(A+B)+C = A+(B+C)' },
            { name: 'Distributiva', eq: 'A·(B+C) = A·B + A·C' },
            { name: 'Absorción', eq: 'A + A·B = A' },
            { name: 'Idempotencia', eq: 'A + A = A · A · A = A' },
            { name: 'Involución', eq: "(A')' = A" },
          ].map(p => (
            <div key={p.name} className="ed-result" style={{ padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>{p.name}</div>
              <div style={{ fontSize: '1rem' }}>{p.eq}</div>
            </div>
          ))}
        </div>
      </div>

      {/* De Morgan */}
      <div className="ed-section">
        <h2>Teorema de De Morgan</h2>
        <div className="ed-grid-2">
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Primera Ley</div>
            <div style={{ fontSize: '1.3rem' }}>(A · B)' = A' + B'</div>
          </div>
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Segunda Ley</div>
            <div style={{ fontSize: '1.3rem' }}>(A + B)' = A' · B'</div>
          </div>
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>Demostración por tabla de verdad</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table">
            <thead>
              <tr>
                <th>A</th><th>B</th>
                <th>(A·B)'</th><th>A'+B'</th><th>≡</th>
                <th>(A+B)'</th><th>A'·B'</th><th>≡</th>
              </tr>
            </thead>
            <tbody>
              {dmRows.map((r, i) => (
                <tr key={i}>
                  <td className={r.a ? 'td-high' : 'td-low'}>{r.a}</td>
                  <td className={r.b ? 'td-high' : 'td-low'}>{r.b}</td>
                  <td className={r.notAB ? 'td-high' : 'td-low'}>{r.notAB}</td>
                  <td className={r.notA_or_notB ? 'td-high' : 'td-low'}>{r.notA_or_notB}</td>
                  <td style={{ color: '#22c55e' }}>✓</td>
                  <td className={r.notAorB ? 'td-high' : 'td-low'}>{r.notAorB}</td>
                  <td className={r.notA_and_notB ? 'td-high' : 'td-low'}>{r.notA_and_notB}</td>
                  <td style={{ color: '#22c55e' }}>✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulador De Morgan */}
      <div className="ed-section">
        <h2>Simulador — Teorema de De Morgan</h2>
        <div className="ed-sim">
          <div className="ed-sim-title">Conmutá A y B para verificar la equivalencia</div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>A</div>
              <div className={`ed-bit ${dmA ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => setDmA(dmA ? 0 : 1)} style={{ width: 50, height: 50, fontSize: '1.3rem' }}>{dmA}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>B</div>
              <div className={`ed-bit ${dmB ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => setDmB(dmB ? 0 : 1)} style={{ width: 50, height: 50, fontSize: '1.3rem' }}>{dmB}</div>
            </div>
          </div>

          <div className="ed-grid-2">
            <div className="ed-result" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Primera Ley de De Morgan</div>
              <div style={{ margin: '0.5rem 0' }}>
                (A·B)' = <strong style={{ color: NOT(AND(dmA, dmB)) ? '#22c55e' : '#ef4444' }}>{NOT(AND(dmA, dmB))}</strong>
              </div>
              <div>
                A'+B' = <strong style={{ color: OR(NOT(dmA), NOT(dmB)) ? '#22c55e' : '#ef4444' }}>{OR(NOT(dmA), NOT(dmB))}</strong>
              </div>
              <div style={{ marginTop: 8, color: '#22c55e', fontWeight: 700 }}>
                {NOT(AND(dmA, dmB)) === OR(NOT(dmA), NOT(dmB)) ? '✓ Iguales' : ''}
              </div>
            </div>
            <div className="ed-result" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Segunda Ley de De Morgan</div>
              <div style={{ margin: '0.5rem 0' }}>
                (A+B)' = <strong style={{ color: NOT(OR(dmA, dmB)) ? '#22c55e' : '#ef4444' }}>{NOT(OR(dmA, dmB))}</strong>
              </div>
              <div>
                A'·B' = <strong style={{ color: AND(NOT(dmA), NOT(dmB)) ? '#22c55e' : '#ef4444' }}>{AND(NOT(dmA), NOT(dmB))}</strong>
              </div>
              <div style={{ marginTop: 8, color: '#22c55e', fontWeight: 700 }}>
                {NOT(OR(dmA, dmB)) === AND(NOT(dmA), NOT(dmB)) ? '✓ Iguales' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodigosAlgebraPage;

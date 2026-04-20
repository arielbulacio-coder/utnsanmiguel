import React, { useState } from 'react';
import './ElectronicaDigital.css';

const pad4 = (n) => Math.max(0, Math.min(15, n)).toString(2).padStart(4, '0');

const BloquesAritmeticosPage = () => {
  /* Adder */
  const [addA, setAddA] = useState([0, 1, 0, 1]); // 4 bits MSB first
  const [addB, setAddB] = useState([0, 0, 1, 1]);
  const toggleAdd = (arr, set, i) => { const n = [...arr]; n[i] = n[i] ? 0 : 1; set(n); };

  const decA = addA.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const decB = addB.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const sumDec = decA + decB;
  const sumBin = sumDec.toString(2).padStart(5, '0'); // 5 bits for carry

  // carry chain
  const carries = [0, 0, 0, 0, 0]; // C0..C4
  const sums = [0, 0, 0, 0];
  for (let i = 3; i >= 0; i--) {
    const a = addA[i], b = addB[i], cin = carries[i + 1];
    sums[i] = a ^ b ^ cin;
    carries[i] = (a & b) | (cin & (a ^ b));
  }

  /* Subtractor */
  const [subA, setSubA] = useState([1, 0, 0, 0]);
  const [subB, setSubB] = useState([0, 0, 1, 1]);

  const decSubA = subA.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const decSubB = subB.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const subResult = decSubA - decSubB;
  const bInv = subB.map(b => b ? 0 : 1); // one's complement
  const decBInv = bInv.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const twosComp = decBInv + 1;
  const addResult = decSubA + twosComp;

  /* Comparator */
  const [cmpA, setCmpA] = useState([1, 0, 1, 0]);
  const [cmpB, setCmpB] = useState([0, 1, 1, 0]);
  const decCmpA = cmpA.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);
  const decCmpB = cmpB.reduce((s, b, i) => s + b * Math.pow(2, 3 - i), 0);

  const BitRow = ({ label, bits, onToggle }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={{ width: 50, fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'right' }}>{label}</span>
      <div className="ed-bits">
        {bits.map((b, i) => (
          <div key={i} className={`ed-bit ${b ? 'ed-bit-1' : 'ed-bit-0'}`}
            onClick={() => onToggle && onToggle(i)} style={{ cursor: onToggle ? 'pointer' : 'default' }}>{b}</div>
        ))}
      </div>
      <span style={{ fontSize: '0.8rem', color: '#888' }}>= {bits.reduce((s, b, i) => s + b * Math.pow(2, bits.length - 1 - i), 0)}</span>
    </div>
  );

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 25–28</span>
        <h1>Unidad 7 — Bloques Aritméticos</h1>
        <p>Sumadores, restadores y comparadores lógicos.</p>
      </div>

      {/* Half & Full Adder theory */}
      <div className="ed-section">
        <h2>Semisumador (Half Adder)</h2>
        <div className="ed-grid-2">
          <div>
            <p>Suma 2 bits sin carry de entrada.</p>
            <p><strong>S</strong> = A ⊕ B &nbsp;&nbsp; <strong>Cout</strong> = A · B</p>
            <table className="ed-truth-table" style={{ maxWidth: 250 }}>
              <thead><tr><th>A</th><th>B</th><th>S</th><th>Cout</th></tr></thead>
              <tbody>
                {[[0,0],[0,1],[1,0],[1,1]].map(([a,b], i) => (
                  <tr key={i}>
                    <td className={a ? 'td-high' : 'td-low'}>{a}</td>
                    <td className={b ? 'td-high' : 'td-low'}>{b}</td>
                    <td className={(a^b) ? 'td-high' : 'td-low'}>{a ^ b}</td>
                    <td className={(a&b) ? 'td-high' : 'td-low'}>{a & b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Sumador Completo (Full Adder)</h3>
            <p>Suma 2 bits + carry de entrada (Cin).</p>
            <p><strong>S</strong> = A ⊕ B ⊕ Cin</p>
            <p><strong>Cout</strong> = A·B + Cin·(A ⊕ B)</p>
            <table className="ed-truth-table" style={{ maxWidth: 300 }}>
              <thead><tr><th>A</th><th>B</th><th>Cin</th><th>S</th><th>Cout</th></tr></thead>
              <tbody>
                {Array.from({length: 8}, (_, i) => {
                  const a = (i>>2)&1, b = (i>>1)&1, c = i&1;
                  return (
                    <tr key={i}>
                      <td className={a?'td-high':'td-low'}>{a}</td>
                      <td className={b?'td-high':'td-low'}>{b}</td>
                      <td className={c?'td-high':'td-low'}>{c}</td>
                      <td className={(a^b^c)?'td-high':'td-low'}>{a^b^c}</td>
                      <td className={((a&b)|(c&(a^b)))?'td-high':'td-low'}>{(a&b)|(c&(a^b))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ripple carry */}
      <div className="ed-section">
        <h2>Sumador Ripple Carry de 4 bits</h2>
        <p>Se encadenan 4 Full Adders. El carry de salida de cada etapa alimenta al carry de entrada de la siguiente. El retardo total es proporcional al número de bits.</p>
        <svg viewBox="0 0 500 100" style={{ width: '100%', maxWidth: 500 }}>
          {[0,1,2,3].map(i => (
            <g key={i} transform={`translate(${380 - i * 110}, 10)`}>
              <rect x="0" y="10" width="90" height="60" rx="6" fill="rgba(124,58,237,0.15)" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="45" y="45" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">FA{i}</text>
              <text x="20" y="25" fill="#888" fontSize="8">A{i}</text>
              <text x="65" y="25" fill="#888" fontSize="8">B{i}</text>
              <text x="45" y="85" fill="#888" fontSize="8">S{i}</text>
              {i < 3 && <line x1="90" y1="40" x2="110" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" />}
              <text x="95" y="35" fill="#f59e0b" fontSize="7">C{i+1}</text>
            </g>
          ))}
          <text x="10" y="50" fill="#f59e0b" fontSize="9">C4 (overflow)</text>
        </svg>
      </div>

      {/* Adder simulator */}
      <div className="ed-section">
        <h2>Simulador — Sumador de 4 Bits</h2>
        <div className="ed-sim">
          <div className="ed-sim-title">Hacé clic en los bits para cambiar los valores</div>
          <BitRow label="A =" bits={addA} onToggle={(i) => toggleAdd(addA, setAddA, i)} />
          <BitRow label="+ B =" bits={addB} onToggle={(i) => toggleAdd(addB, setAddB, i)} />
          <div style={{ borderTop: '2px solid var(--glass-border)', margin: '8px 0 8px 58px', width: 152 }} />

          {/* Carries */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 50, fontSize: '0.75rem', color: '#f59e0b', textAlign: 'right' }}>Carry</span>
            <div className="ed-bits">
              {carries.map((c, i) => (
                <div key={i} style={{ width: 36, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: c ? '#f59e0b' : '#555', fontWeight: c ? 700 : 400 }}>{c}</div>
              ))}
            </div>
          </div>

          <BitRow label="S =" bits={[carries[0], ...sums]} />

          <div className="ed-result" style={{ marginTop: '1rem', textAlign: 'center' }}>
            {decA} + {decB} = <strong>{sumDec}</strong>
            {carries[0] ? <span style={{ color: '#f59e0b', marginLeft: 8 }}>(Overflow!)</span> : null}
          </div>
        </div>
      </div>

      {/* Subtractor */}
      <div className="ed-section">
        <h2>Simulador — Restador (Complemento a 2)</h2>
        <div className="ed-sim">
          <div className="ed-sim-title">A − B usando complemento a 2 de B</div>
          <BitRow label="A =" bits={subA} onToggle={(i) => toggleAdd(subA, setSubA, i)} />
          <BitRow label="− B =" bits={subB} onToggle={(i) => toggleAdd(subB, setSubB, i)} />
          <div style={{ borderTop: '1px dashed var(--glass-border)', margin: '12px 0', paddingTop: 8 }}>
            <p style={{ fontSize: '0.85rem', color: '#888' }}>Proceso:</p>
            <ol className="ed-steps">
              <li>Complemento a 1 de B: {bInv.join('')}</li>
              <li>Complemento a 2 (sumar 1): {twosComp.toString(2).padStart(4, '0')} = {twosComp}</li>
              <li>A + C2(B) = {decSubA} + {twosComp} = {addResult}</li>
            </ol>
          </div>
          <div className="ed-result" style={{ textAlign: 'center' }}>
            {decSubA} − {decSubB} = <strong style={{ color: subResult < 0 ? '#ef4444' : '#22c55e' }}>{subResult}</strong>
          </div>
        </div>
      </div>

      {/* Comparator */}
      <div className="ed-section">
        <h2>Simulador — Comparador de Magnitud</h2>
        <div className="ed-sim">
          <BitRow label="A =" bits={cmpA} onToggle={(i) => toggleAdd(cmpA, setCmpA, i)} />
          <BitRow label="B =" bits={cmpB} onToggle={(i) => toggleAdd(cmpB, setCmpB, i)} />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'A > B', val: decCmpA > decCmpB },
              { label: 'A = B', val: decCmpA === decCmpB },
              { label: 'A < B', val: decCmpA < decCmpB },
            ].map(r => (
              <div key={r.label} style={{
                padding: '0.75rem 1.5rem', borderRadius: 10, textAlign: 'center',
                background: r.val ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                border: `2px solid ${r.val ? '#22c55e' : 'var(--glass-border)'}`,
              }}>
                <div style={{ fontSize: '0.8rem', color: r.val ? '#22c55e' : '#555' }}>{r.label}</div>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', margin: '8px auto 0',
                  background: r.val ? '#22c55e' : '#333',
                  boxShadow: r.val ? '0 0 12px #22c55e' : 'none',
                }} />
              </div>
            ))}
          </div>
          <div className="ed-result" style={{ marginTop: '1rem', textAlign: 'center' }}>
            A = {decCmpA}, B = {decCmpB} → <strong>{decCmpA > decCmpB ? 'A > B' : decCmpA === decCmpB ? 'A = B' : 'A < B'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloquesAritmeticosPage;

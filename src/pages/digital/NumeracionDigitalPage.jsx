import React, { useState, useCallback } from 'react';
import './ElectronicaDigital.css';

/* ───────── helpers ───────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const toBase = (num, base) => {
  if (num === 0) return '0';
  let s = '';
  let n = num;
  while (n > 0) { s = '0123456789ABCDEF'[n % base] + s; n = Math.floor(n / base); }
  return s;
};

const fromBase = (str, base) => {
  let n = 0;
  for (let c of str.toUpperCase()) {
    const d = '0123456789ABCDEF'.indexOf(c);
    if (d < 0 || d >= base) return NaN;
    n = n * base + d;
  }
  return n;
};

const divisionSteps = (dec, base) => {
  if (dec === 0) return [{ quotient: 0, remainder: 0 }];
  const steps = [];
  let n = dec;
  while (n > 0) {
    steps.push({ dividend: n, quotient: Math.floor(n / base), remainder: n % base });
    n = Math.floor(n / base);
  }
  return steps;
};

const positionalSteps = (str, base) => {
  const digits = str.toUpperCase().split('');
  return digits.map((d, i) => {
    const val = '0123456789ABCDEF'.indexOf(d);
    const exp = digits.length - 1 - i;
    return { digit: d, value: val, exponent: exp, weight: Math.pow(base, exp), partial: val * Math.pow(base, exp) };
  });
};

/* ───────── Component ───────── */
const NumeracionDigitalPage = () => {
  /* Base converter */
  const [inputBase, setInputBase] = useState(10);
  const [inputValue, setInputValue] = useState('42');
  const [showSteps, setShowSteps] = useState(false);

  const decimalValue = fromBase(inputValue, inputBase);
  const isValid = !isNaN(decimalValue) && inputValue.length > 0;

  /* 8-bit visualizer */
  const [bits, setBits] = useState([0, 0, 1, 0, 1, 0, 1, 0]);
  const toggleBit = (i) => setBits(prev => { const n = [...prev]; n[i] = n[i] ? 0 : 1; return n; });
  const bitsDecimal = bits.reduce((acc, b, i) => acc + b * Math.pow(2, 7 - i), 0);
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <div className="ed-page">
      {/* Hero */}
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 1–4</span>
        <h1>Unidad 1 — Sistemas de Numeración</h1>
        <p>Analógico vs. digital, sistema binario, octal, hexadecimal y algoritmos de conversión entre bases.</p>
      </div>

      {/* Teoría: Analógico vs Digital */}
      <div className="ed-section">
        <h2>Señales Analógicas vs. Digitales</h2>
        <div className="ed-grid-2">
          <div>
            <h3>Señal Analógica</h3>
            <p>Varía de forma <strong>continua</strong> en el tiempo. Ejemplo: la temperatura, una onda de sonido. Puede tomar infinitos valores intermedios.</p>
            <svg viewBox="0 0 260 100" style={{ width: '100%', maxWidth: 260 }}>
              <path d="M10 50 Q40 10 70 50 T130 50 T190 50 T250 50" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="10" y1="90" x2="250" y2="90" stroke="#555" strokeWidth="1" />
              <text x="130" y="98" fill="#888" fontSize="10" textAnchor="middle">tiempo</text>
            </svg>
          </div>
          <div>
            <h3>Señal Digital</h3>
            <p>Solo toma valores <strong>discretos</strong> (0 y 1). Mayor inmunidad al ruido, fácil de procesar, almacenar y transmitir.</p>
            <svg viewBox="0 0 260 100" style={{ width: '100%', maxWidth: 260 }}>
              <path d="M10 70 H40 V20 H80 V70 H120 V20 H160 V70 H200 V20 H240 V70" fill="none" stroke="#22c55e" strokeWidth="2.5" />
              <line x1="10" y1="90" x2="250" y2="90" stroke="#555" strokeWidth="1" />
              <text x="130" y="98" fill="#888" fontSize="10" textAnchor="middle">tiempo</text>
            </svg>
          </div>
        </div>
        <p style={{ marginTop: '1rem' }}>Las computadoras trabajan con señales digitales. Toda la información se codifica en <strong>bits</strong> (0 y 1).</p>
      </div>

      {/* Teoría: Sistemas posicionales */}
      <div className="ed-section">
        <h2>Sistemas Posicionales</h2>
        <p>En un sistema posicional, el valor de cada dígito depende de su <strong>posición</strong>. Valor = Σ (dígito × base<sup>posición</sup>).</p>
        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table" style={{ maxWidth: 500 }}>
            <thead>
              <tr><th>Sistema</th><th>Base</th><th>Dígitos</th><th>Ejemplo</th></tr>
            </thead>
            <tbody>
              <tr><td>Decimal</td><td>10</td><td>0–9</td><td>255₁₀</td></tr>
              <tr><td>Binario</td><td>2</td><td>0, 1</td><td>11111111₂</td></tr>
              <tr><td>Octal</td><td>8</td><td>0–7</td><td>377₈</td></tr>
              <tr><td>Hexadecimal</td><td>16</td><td>0–9, A–F</td><td>FF₁₆</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulador: Conversor de Bases */}
      <div className="ed-section">
        <h2>Simulador — Conversor de Bases</h2>
        <div className="ed-sim">
          <div className="ed-sim-title">Ingresá un número en cualquier base</div>
          <div className="ed-input-row">
            <label>Base:</label>
            <select value={inputBase} onChange={e => { setInputBase(Number(e.target.value)); setInputValue(''); }}>
              <option value={2}>Binario (2)</option>
              <option value={8}>Octal (8)</option>
              <option value={10}>Decimal (10)</option>
              <option value={16}>Hexadecimal (16)</option>
            </select>
            <label>Valor:</label>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value.replace(/\s/g, ''))}
              placeholder={inputBase === 16 ? 'ej: 1A3F' : 'ej: 42'}
              style={{ width: 180 }}
            />
          </div>

          {!isValid && inputValue.length > 0 && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>Dígito inválido para base {inputBase}</p>
          )}

          {isValid && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                {[
                  { label: 'Decimal', val: decimalValue.toString(), base: 10 },
                  { label: 'Binario', val: toBase(decimalValue, 2), base: 2 },
                  { label: 'Octal', val: toBase(decimalValue, 8), base: 8 },
                  { label: 'Hexadecimal', val: toBase(decimalValue, 16), base: 16 },
                ].map(r => (
                  <div key={r.label} className="ed-result" style={r.base === inputBase ? { borderColor: '#22c55e' } : {}}>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>{r.label}</div>
                    <div style={{ fontSize: '1.3rem', wordBreak: 'break-all' }}>{r.val}<sub style={{ fontSize: '0.65rem' }}>{r.base}</sub></div>
                  </div>
                ))}
              </div>

              <button className="ed-btn ed-btn-outline" style={{ marginTop: '1rem' }} onClick={() => setShowSteps(!showSteps)}>
                {showSteps ? 'Ocultar' : 'Ver'} algoritmo paso a paso
              </button>

              {showSteps && (
                <div style={{ marginTop: '1rem' }}>
                  {inputBase !== 10 ? (
                    <>
                      <h3>Base {inputBase} → Decimal (pesos posicionales)</h3>
                      <ol className="ed-steps">
                        {positionalSteps(inputValue, inputBase).map((s, i) => (
                          <li key={i}>{s.digit} × {inputBase}<sup>{s.exponent}</sup> = {s.digit} × {s.weight} = <strong>{s.partial}</strong></li>
                        ))}
                        <li><strong>Total = {decimalValue}</strong></li>
                      </ol>
                    </>
                  ) : (
                    <>
                      <h3>Decimal → Binario (divisiones sucesivas)</h3>
                      <ol className="ed-steps">
                        {divisionSteps(decimalValue, 2).map((s, i) => (
                          <li key={i}>{s.dividend} ÷ 2 = {s.quotient}, resto = <strong>{s.remainder}</strong></li>
                        ))}
                        <li>Leyendo los restos de abajo hacia arriba: <strong>{toBase(decimalValue, 2)}₂</strong></li>
                      </ol>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Simulador: Visualizador de 8 bits */}
      <div className="ed-section">
        <h2>Simulador — Visualizador de 8 Bits</h2>
        <p>Hacé clic en cada bit para conmutar entre 0 y 1.</p>
        <div className="ed-sim">
          <div style={{ textAlign: 'center' }}>
            {/* Weights */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
              {weights.map((w, i) => (
                <div key={i} style={{ width: 36, textAlign: 'center', fontSize: '0.65rem', color: '#888' }}>{w}</div>
              ))}
            </div>
            {/* Bits */}
            <div className="ed-bits" style={{ justifyContent: 'center' }}>
              {bits.map((b, i) => (
                <div
                  key={i}
                  className={`ed-bit ${b ? 'ed-bit-1' : 'ed-bit-0'}`}
                  onClick={() => toggleBit(i)}
                >
                  {b}
                </div>
              ))}
            </div>
            {/* Positions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
              {bits.map((_, i) => (
                <div key={i} style={{ width: 36, textAlign: 'center', fontSize: '0.6rem', color: '#555' }}>b{7 - i}</div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div className="ed-result">
                <div style={{ fontSize: '0.7rem', color: '#888' }}>Decimal</div>
                <div style={{ fontSize: '1.5rem' }}>{bitsDecimal}</div>
              </div>
              <div className="ed-result">
                <div style={{ fontSize: '0.7rem', color: '#888' }}>Hexadecimal</div>
                <div style={{ fontSize: '1.5rem' }}>0x{toBase(bitsDecimal, 16).padStart(2, '0')}</div>
              </div>
              <div className="ed-result">
                <div style={{ fontSize: '0.7rem', color: '#888' }}>Octal</div>
                <div style={{ fontSize: '1.5rem' }}>{toBase(bitsDecimal, 8)}₈</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button className="ed-btn ed-btn-sm" onClick={() => setBits([0,0,0,0,0,0,0,0])}>Reset</button>{' '}
              <button className="ed-btn ed-btn-sm ed-btn-outline" onClick={() => setBits(bits.map(b => b ? 0 : 1))}>Invertir</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fórmulas resumen */}
      <div className="ed-section">
        <h2>Fórmulas Clave</h2>
        <div className="ed-grid-2">
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Valor posicional</div>
            N = Σ dᵢ × bⁱ
          </div>
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Rango con n bits</div>
            0 … 2ⁿ − 1
          </div>
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Binario → Hex</div>
            Agrupar de a 4 bits
          </div>
          <div className="ed-result">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Binario → Octal</div>
            Agrupar de a 3 bits
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumeracionDigitalPage;

import React, { useState } from 'react';
import './ElectronicaDigital.css';

const BloquesFuncionalesPage = () => {
  /* MUX simulator */
  const [muxSize, setMuxSize] = useState(4); // 2 or 4
  const [muxData, setMuxData] = useState([1, 0, 1, 0]);
  const [muxSel, setMuxSel] = useState([0, 0]); // S1, S0
  const selVal = muxSize === 2 ? muxSel[1] : muxSel[0] * 2 + muxSel[1];
  const muxOut = muxData[selVal] || 0;

  const toggleMuxD = (i) => setMuxData(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });
  const toggleMuxS = (i) => setMuxSel(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; });

  /* Decoder simulator */
  const [decIn, setDecIn] = useState([0, 0]); // A1, A0
  const [decEn, setDecEn] = useState(1);
  const decVal = decIn[0] * 2 + decIn[1];
  const decOutputs = [0, 1, 2, 3].map(i => decEn && i === decVal ? 1 : 0);

  /* Encoder simulator */
  const [encActive, setEncActive] = useState(3);
  const encOut = encActive.toString(2).padStart(3, '0');

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 21–24</span>
        <h1>Unidad 6 — Bloques Funcionales</h1>
        <p>Multiplexores, Demultiplexores, Codificadores y Decodificadores.</p>
      </div>

      {/* Teoría MUX */}
      <div className="ed-section">
        <h2>Multiplexor (MUX)</h2>
        <p>Un MUX es un <strong>selector de datos</strong>. Tiene 2ⁿ entradas de datos, n entradas de selección y 1 salida. La selección determina cuál entrada pasa a la salida.</p>
        <div className="ed-grid-2">
          <div>
            <h3>MUX 2:1</h3>
            <p>1 línea de selección (S), 2 entradas (D0, D1).</p>
            <p>F = S'·D0 + S·D1</p>
            <table className="ed-truth-table" style={{ maxWidth: 200 }}>
              <thead><tr><th>S</th><th>Salida</th></tr></thead>
              <tbody>
                <tr><td>0</td><td>D0</td></tr>
                <tr><td>1</td><td>D1</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>MUX 4:1</h3>
            <p>2 líneas de selección (S1, S0), 4 entradas.</p>
            <p>F = S1'·S0'·D0 + S1'·S0·D1 + S1·S0'·D2 + S1·S0·D3</p>
            <table className="ed-truth-table" style={{ maxWidth: 200 }}>
              <thead><tr><th>S1</th><th>S0</th><th>Salida</th></tr></thead>
              <tbody>
                {[0,1,2,3].map(i => (
                  <tr key={i}><td>{(i>>1)&1}</td><td>{i&1}</td><td>D{i}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simulador MUX */}
      <div className="ed-section">
        <h2>Simulador — Multiplexor</h2>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button className={`ed-btn ed-btn-sm ${muxSize === 2 ? '' : 'ed-btn-outline'}`} onClick={() => { setMuxSize(2); setMuxSel([0, 0]); }}>MUX 2:1</button>
            <button className={`ed-btn ed-btn-sm ${muxSize === 4 ? '' : 'ed-btn-outline'}`} onClick={() => { setMuxSize(4); setMuxSel([0, 0]); }}>MUX 4:1</button>
          </div>

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Data inputs */}
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>Entradas de datos</div>
              {Array.from({ length: muxSize }, (_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', width: 30 }}>D{i}</span>
                  <div className={`ed-bit ${muxData[i] ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => toggleMuxD(i)}
                    style={{ width: 40, height: 40 }}>{muxData[i]}</div>
                  {i === selVal && <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>← seleccionada</span>}
                </div>
              ))}
            </div>

            {/* MUX block */}
            <div style={{ textAlign: 'center' }}>
              <svg viewBox="0 0 120 140" width={120} height={140}>
                <rect x="20" y="10" width="80" height="110" rx="8" fill="rgba(124,58,237,0.15)" stroke="#a78bfa" strokeWidth="2" />
                <text x="60" y="65" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="700">MUX</text>
                <text x="60" y="82" textAnchor="middle" fill="#888" fontSize="10">{muxSize}:1</text>
                {/* output */}
                <line x1="100" y1="60" x2="118" y2="60" stroke={muxOut ? '#22c55e' : '#ef4444'} strokeWidth="3" />
                <circle cx="118" cy="60" r="4" fill={muxOut ? '#22c55e' : '#ef4444'} />
                {/* sel inputs */}
                {muxSize === 4 && <text x="45" y="130" fill="#888" fontSize="9">S1 S0</text>}
                {muxSize === 2 && <text x="53" y="130" fill="#888" fontSize="9">S</text>}
              </svg>
              <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 4 }}>Selección: {selVal}</div>
            </div>

            {/* Sel + output */}
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>Selección</div>
              {(muxSize === 4 ? [0, 1] : [1]).map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', width: 30 }}>S{muxSize === 4 ? (i === 0 ? '1' : '0') : ''}</span>
                  <div className={`ed-bit ${muxSel[i] ? 'ed-bit-1' : 'ed-bit-0'}`} onClick={() => toggleMuxS(i)}
                    style={{ width: 40, height: 40 }}>{muxSel[i]}</div>
                </div>
              ))}
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 16, marginBottom: 8 }}>Salida</div>
              <div className={`ed-bit ${muxOut ? 'ed-bit-1' : 'ed-bit-0'}`} style={{ width: 50, height: 50, fontSize: '1.3rem' }}>{muxOut}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Teoría Decoder */}
      <div className="ed-section">
        <h2>Decodificador (Decoder)</h2>
        <p>Un decodificador convierte un código binario de <strong>n bits</strong> en 2ⁿ líneas de salida, activando <strong>una sola</strong> a la vez. Es el inverso del codificador.</p>
        <p>Ejemplos comunes: 2:4 (74139), 3:8 (74138). Se usa para selección de memoria, generación de mintérminos, etc.</p>
      </div>

      {/* Simulador Decoder */}
      <div className="ed-section">
        <h2>Simulador — Decodificador 2:4</h2>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>Entradas</div>
              {['A1', 'A0'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', width: 30 }}>{label}</span>
                  <div className={`ed-bit ${decIn[i] ? 'ed-bit-1' : 'ed-bit-0'}`}
                    onClick={() => setDecIn(p => { const n = [...p]; n[i] = n[i] ? 0 : 1; return n; })}
                    style={{ width: 40, height: 40 }}>{decIn[i]}</div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', width: 30 }}>EN</span>
                <div className={`ed-bit ${decEn ? 'ed-bit-1' : 'ed-bit-0'}`}
                  onClick={() => setDecEn(decEn ? 0 : 1)}
                  style={{ width: 40, height: 40 }}>{decEn}</div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <svg viewBox="0 0 100 120" width={100} height={120}>
                <rect x="10" y="5" width="80" height="110" rx="8" fill="rgba(124,58,237,0.15)" stroke="#a78bfa" strokeWidth="2" />
                <text x="50" y="60" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">DEC</text>
                <text x="50" y="75" textAnchor="middle" fill="#888" fontSize="10">2:4</text>
              </svg>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8 }}>Salidas (LEDs)</div>
              {decOutputs.map((o, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', width: 30 }}>Y{i}</span>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: o ? '#22c55e' : '#333',
                    boxShadow: o ? '0 0 10px #22c55e' : 'none',
                    transition: 'all 0.3s'
                  }} />
                  {o ? <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>ACTIVA</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Codificador */}
      <div className="ed-section">
        <h2>Simulador — Codificador 8:3 con Prioridad</h2>
        <p>Hacé clic en una de las 8 entradas. La salida es el código binario de la entrada activa de mayor prioridad.</p>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <button key={i}
                className={`ed-btn ed-btn-sm ${encActive === i ? '' : 'ed-btn-outline'}`}
                onClick={() => setEncActive(i)}
              >
                D{i}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <div className="ed-result" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Entrada activa</div>
              <div style={{ fontSize: '1.5rem' }}>D{encActive}</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: '#a78bfa' }}>→</div>
            <div className="ed-result" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Salida binaria</div>
              <div className="ed-bits" style={{ justifyContent: 'center' }}>
                {encOut.split('').map((b, i) => (
                  <div key={i} className={`ed-bit ${b === '1' ? 'ed-bit-1' : 'ed-bit-0'}`}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expansión */}
      <div className="ed-section">
        <h2>Expansión de Bloques</h2>
        <p>Los bloques funcionales se pueden <strong>cascadear</strong> para manejar más entradas/salidas:</p>
        <ul>
          <li><strong>MUX 8:1</strong> = 2 × MUX 4:1 + 1 × MUX 2:1</li>
          <li><strong>Decoder 4:16</strong> = 2 × Decoder 3:8 + lógica de habilitación</li>
          <li><strong>Encoder 16:4</strong> = 2 × Encoder 8:3 + prioridad externa</li>
        </ul>
        <p>El pin <strong>Enable (EN)</strong> es clave para la expansión: permite habilitar/deshabilitar cada bloque según la selección superior.</p>
      </div>
    </div>
  );
};

export default BloquesFuncionalesPage;

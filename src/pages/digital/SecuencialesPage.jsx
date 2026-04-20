import React, { useState } from 'react';
import './ElectronicaDigital.css';

const SecuencialesPage = () => {
  /* SR Latch */
  const [srS, setSrS] = useState(0);
  const [srR, setSrR] = useState(0);
  const [srQ, setSrQ] = useState(0);
  const srInvalid = srS && srR;

  const applySR = (s, r) => {
    setSrS(s); setSrR(r);
    if (s && !r) setSrQ(1);
    else if (!s && r) setSrQ(0);
    // s=0,r=0 → hold; s=1,r=1 → invalid (keep current)
  };

  /* D Flip-Flop */
  const [dInput, setDInput] = useState(0);
  const [dQ, setDQ] = useState(0);
  const [dHistory, setDHistory] = useState([
    { clk: '↑', d: 0, q: 0 },
  ]);

  const clockPulse = () => {
    const newQ = dInput;
    setDQ(newQ);
    setDHistory(prev => [...prev.slice(-7), { clk: '↑', d: dInput, q: newQ }]);
  };

  /* TTL vs CMOS comparison */
  const specs = [
    { param: 'Tensión VCC', ttl: '5V (fija)', cmos: '3–18V' },
    { param: 'VIH (mín)', ttl: '2.0V', cmos: '70% VCC' },
    { param: 'VIL (máx)', ttl: '0.8V', cmos: '30% VCC' },
    { param: 'VOH (mín)', ttl: '2.4V', cmos: 'VCC − 0.1V' },
    { param: 'VOL (máx)', ttl: '0.4V', cmos: '0.1V' },
    { param: 'Consumo estático', ttl: '1–20 mA', cmos: '~0.01 μA' },
    { param: 'Velocidad (tp)', ttl: '~10 ns', cmos: '~50 ns (4000)' },
    { param: 'Fan-out', ttl: '10 (estándar)', cmos: '50+' },
    { param: 'Inmunidad al ruido', ttl: '0.4V', cmos: '30% VCC' },
    { param: 'Series comunes', ttl: '74xx, 74LSxx', cmos: '4000, 74HCxx' },
  ];

  return (
    <div className="ed-page">
      <div className="ed-hero">
        <span className="ed-unit-badge">Semanas 29–32</span>
        <h1>Unidad 8 — Circuitos Secuenciales</h1>
        <p>Latches, Flip-Flops, familias TTL/CMOS, Fan-in y Fan-out.</p>
      </div>

      {/* Combinational vs Sequential */}
      <div className="ed-section">
        <h2>Combinacionales vs. Secuenciales</h2>
        <div className="ed-grid-2">
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Combinacional</div>
            <p style={{ fontSize: '0.9rem' }}>La salida depende <strong>solo</strong> de las entradas actuales. Sin memoria.</p>
            <div style={{ fontSize: '1.5rem', marginTop: 4 }}>AND, OR, MUX, Decoder</div>
          </div>
          <div className="ed-result" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>Secuencial</div>
            <p style={{ fontSize: '0.9rem' }}>La salida depende de entradas <strong>y estado anterior</strong>. Tiene memoria (retroalimentación).</p>
            <div style={{ fontSize: '1.5rem', marginTop: 4 }}>Latch, Flip-Flop, Registro</div>
          </div>
        </div>
      </div>

      {/* SR Latch theory */}
      <div className="ed-section">
        <h2>Latch SR (Set-Reset)</h2>
        <p>El latch SR es el bloque secuencial más básico. Se construye con dos compuertas NOR (o NAND) realimentadas.</p>
        <table className="ed-truth-table" style={{ maxWidth: 350 }}>
          <thead><tr><th>S</th><th>R</th><th>Q(t+1)</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td className="td-low">0</td><td className="td-low">0</td><td>Q(t)</td><td>Retención</td></tr>
            <tr><td className="td-high">1</td><td className="td-low">0</td><td className="td-high">1</td><td>SET</td></tr>
            <tr><td className="td-low">0</td><td className="td-high">1</td><td className="td-low">0</td><td>RESET</td></tr>
            <tr><td className="td-high">1</td><td className="td-high">1</td><td style={{ color: '#ef4444' }}>✗</td><td style={{ color: '#ef4444' }}>Prohibido</td></tr>
          </tbody>
        </table>
      </div>

      {/* SR Latch simulator */}
      <div className="ed-section">
        <h2>Simulador — Latch SR</h2>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Inputs */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>S (Set)</div>
                <div className={`ed-bit ${srS ? 'ed-bit-1' : 'ed-bit-0'}`}
                  onClick={() => applySR(srS ? 0 : 1, srR)}
                  style={{ width: 54, height: 54, fontSize: '1.4rem', margin: '0 auto' }}>{srS}</div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>R (Reset)</div>
                <div className={`ed-bit ${srR ? 'ed-bit-1' : 'ed-bit-0'}`}
                  onClick={() => applySR(srS, srR ? 0 : 1)}
                  style={{ width: 54, height: 54, fontSize: '1.4rem', margin: '0 auto' }}>{srR}</div>
              </div>
            </div>

            {/* Latch SVG */}
            <svg viewBox="0 0 200 150" width={200} height={150}>
              {/* NOR gates */}
              <rect x="60" y="15" width="70" height="35" rx="6" fill="rgba(124,58,237,0.15)" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="95" y="37" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">NOR</text>
              <rect x="60" y="95" width="70" height="35" rx="6" fill="rgba(124,58,237,0.15)" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="95" y="117" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">NOR</text>
              {/* S input */}
              <line x1="10" y1="25" x2="60" y2="25" stroke={srS ? '#22c55e' : '#ef4444'} strokeWidth="2" />
              <text x="5" y="28" fill="#888" fontSize="9">S</text>
              {/* R input */}
              <line x1="10" y1="120" x2="60" y2="120" stroke={srR ? '#22c55e' : '#ef4444'} strokeWidth="2" />
              <text x="5" y="123" fill="#888" fontSize="9">R</text>
              {/* Q output */}
              <line x1="130" y1="32" x2="190" y2="32" stroke={srQ ? '#22c55e' : '#ef4444'} strokeWidth="2" />
              <text x="175" y="25" fill="#888" fontSize="9">Q</text>
              {/* Q' output */}
              <line x1="130" y1="112" x2="190" y2="112" stroke={!srQ && !srInvalid ? '#22c55e' : '#ef4444'} strokeWidth="2" />
              <text x="172" y="130" fill="#888" fontSize="9">Q'</text>
              {/* Cross feedback */}
              <path d="M140 32 L150 32 L150 75 L50 75 L50 105 L60 105" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" />
              <path d="M140 112 L150 112 L150 70 L50 70 L50 42 L60 42" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" />
            </svg>

            {/* Outputs */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>Q</div>
                <div style={{
                  width: 54, height: 54, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', fontWeight: 700, margin: '0 auto',
                  background: srInvalid ? 'rgba(239,68,68,0.3)' : srQ ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${srInvalid ? '#ef4444' : srQ ? '#22c55e' : '#555'}`,
                  boxShadow: srQ && !srInvalid ? '0 0 15px rgba(34,197,94,0.5)' : 'none',
                  color: srInvalid ? '#ef4444' : srQ ? '#22c55e' : '#888'
                }}>
                  {srInvalid ? '!' : srQ}
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>Q'</div>
                <div style={{
                  width: 54, height: 54, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', fontWeight: 700, margin: '0 auto',
                  background: srInvalid ? 'rgba(239,68,68,0.3)' : !srQ ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${srInvalid ? '#ef4444' : !srQ ? '#22c55e' : '#555'}`,
                  color: srInvalid ? '#ef4444' : !srQ ? '#22c55e' : '#888'
                }}>
                  {srInvalid ? '!' : srQ ? 0 : 1}
                </div>
              </div>
            </div>
          </div>

          {srInvalid && (
            <div style={{ textAlign: 'center', marginTop: '1rem', padding: '0.5rem', background: 'rgba(239,68,68,0.15)',
              border: '1px solid #ef4444', borderRadius: 8, color: '#ef4444', fontWeight: 700 }}>
              ESTADO PROHIBIDO — S=1 y R=1 simultáneamente
            </div>
          )}
        </div>
      </div>

      {/* D Flip-Flop */}
      <div className="ed-section">
        <h2>Simulador — Flip-Flop tipo D</h2>
        <p>En el flanco ascendente del reloj, Q toma el valor de D.</p>
        <div className="ed-sim">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>D (Data)</div>
              <div className={`ed-bit ${dInput ? 'ed-bit-1' : 'ed-bit-0'}`}
                onClick={() => setDInput(dInput ? 0 : 1)}
                style={{ width: 54, height: 54, fontSize: '1.4rem' }}>{dInput}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>CLK</div>
              <button className="ed-btn" onClick={clockPulse}
                style={{ width: 54, height: 54, fontSize: '1.2rem', borderRadius: '50%' }}>↑</button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>Q</div>
              <div className={`ed-bit ${dQ ? 'ed-bit-1' : 'ed-bit-0'}`}
                style={{ width: 54, height: 54, fontSize: '1.4rem' }}>{dQ}</div>
            </div>
          </div>

          <h3 style={{ marginTop: '1rem' }}>Historial de transiciones</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="ed-truth-table" style={{ maxWidth: 400, margin: '0 auto' }}>
              <thead><tr><th>#</th><th>CLK</th><th>D</th><th>Q</th></tr></thead>
              <tbody>
                {dHistory.map((h, i) => (
                  <tr key={i} style={i === dHistory.length - 1 ? { background: 'rgba(124,58,237,0.15)' } : {}}>
                    <td style={{ color: '#888' }}>{i + 1}</td>
                    <td style={{ color: '#f59e0b' }}>{h.clk}</td>
                    <td className={h.d ? 'td-high' : 'td-low'}>{h.d}</td>
                    <td className={h.q ? 'td-high' : 'td-low'}>{h.q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simple waveform */}
          <h3>Diagrama temporal</h3>
          <svg viewBox="0 0 400 90" style={{ width: '100%', maxWidth: 400 }}>
            {/* D waveform */}
            <text x="5" y="20" fill="#888" fontSize="10">D</text>
            <polyline fill="none" stroke="#a78bfa" strokeWidth="2"
              points={dHistory.map((h, i) => `${40 + i * 45},${h.d ? 12 : 28} ${40 + (i + 1) * 45},${h.d ? 12 : 28}`).join(' ')} />
            {/* CLK pulses */}
            <text x="5" y="50" fill="#888" fontSize="10">CLK</text>
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2"
              points={dHistory.map((h, i) => `${40 + i * 45},58 ${40 + i * 45 + 5},38 ${40 + i * 45 + 10},58 ${40 + (i + 1) * 45},58`).join(' ')} />
            {/* Q waveform */}
            <text x="5" y="80" fill="#888" fontSize="10">Q</text>
            <polyline fill="none" stroke="#22c55e" strokeWidth="2"
              points={dHistory.map((h, i) => `${40 + i * 45},${h.q ? 68 : 84} ${40 + (i + 1) * 45},${h.q ? 68 : 84}`).join(' ')} />
          </svg>
        </div>
      </div>

      {/* TTL vs CMOS */}
      <div className="ed-section">
        <h2>Familias Lógicas: TTL vs CMOS</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="ed-truth-table">
            <thead><tr><th>Parámetro</th><th>TTL</th><th>CMOS</th></tr></thead>
            <tbody>
              {specs.map((s, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>{s.param}</td>
                  <td>{s.ttl}</td>
                  <td>{s.cmos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fan-in / Fan-out */}
      <div className="ed-section">
        <h2>Fan-in y Fan-out</h2>
        <div className="ed-grid-2">
          <div>
            <h3>Fan-in</h3>
            <p>Número máximo de entradas que puede tener una compuerta sin degradar la señal. Más entradas → mayor retardo y menor margen de ruido.</p>
          </div>
          <div>
            <h3>Fan-out</h3>
            <p>Número máximo de entradas que puede alimentar la salida de una compuerta. TTL estándar: <strong>10</strong>. CMOS: <strong>50+</strong> (la limitación es por corriente en conmutación).</p>
          </div>
        </div>
        <div className="ed-result" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>Regla práctica</div>
          Fan-out = I<sub>OH(max)</sub> / I<sub>IH(max)</sub>
        </div>
      </div>
    </div>
  );
};

export default SecuencialesPage;

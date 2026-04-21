import React, { useState } from 'react';
import './DrawingStyles.css';

const CurvasTecnicasPage = () => {
  const [topic, setTopic] = useState('ovoide');
  const [step, setStep] = useState(0);

  /* Cycloid animation param */
  const [cycloidT, setCycloidT] = useState(50);

  /* Spiral turns */
  const [spiralType, setSpiralType] = useState('arquimedes');

  /* ---- Ovoide steps ---- */
  const ovoideSteps = [
    { label: 'Eje menor', desc: 'Trazar el eje menor AB (diámetro de la circunferencia mayor).' },
    { label: 'Circunferencia mayor', desc: 'Con centro O (punto medio de AB) y radio OA, trazar la semicircunferencia inferior.' },
    { label: 'Arcos laterales', desc: 'Con centros A y B, y radio AB, trazar arcos que se intersequen en el punto superior C.' },
    { label: 'Punto C', desc: 'C = intersección de los dos arcos. Trazar rectas CA y CB prolongadas.' },
    { label: 'Arco superior', desc: 'Con centro C y radio CD (donde D es la intersección de CA con la circunferencia), trazar el arco de enlace superior.' },
    { label: 'Ovoide completo', desc: 'Repasar el contorno completo: semicircunferencia inferior + arcos laterales + arco superior.' },
  ];

  /* ---- Cycloid steps ---- */
  const cycloidSteps = [
    { label: 'Línea base', desc: 'Trazar la recta directriz (base) y dividir el recorrido (2πR) en partes iguales.' },
    { label: 'Posiciones del centro', desc: 'Marcar las posiciones sucesivas del centro de la circunferencia a altura R sobre la base.' },
    { label: 'Circunferencias', desc: 'Desde cada posición del centro, trazar la circunferencia generatriz.' },
    { label: 'Puntos', desc: 'Desde cada posición, medir el arco recorrido y marcar el punto correspondiente sobre la circunferencia.' },
    { label: 'Curva', desc: 'Unir los puntos obtenidos con curva suave → cicloide normal.' },
  ];

  const activeSteps = topic === 'ovoide' ? ovoideSteps : cycloidSteps;
  const maxStep = activeSteps.length - 1;

  const handleTopicChange = (t) => { setTopic(t); setStep(0); };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 6 — Semanas 29–32</div>
        <h1>Curvas Técnicas</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          Ovoides, cicloides (normal, reducida y alargada) y espirales de aplicación técnica.
        </p>
      </div>

      {/* Selector principal */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Explorador de Curvas</h2>
        <div className="sim-selector">
          {[
            { key: 'ovoide', label: 'Ovoide' },
            { key: 'cicloide', label: 'Cicloides' },
            { key: 'espiral', label: 'Espirales' },
          ].map(t => (
            <button key={t.key} className={`sel-btn ${topic === t.key ? 'active' : ''}`} onClick={() => handleTopicChange(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* =================== OVOIDE =================== */}
      {topic === 'ovoide' && (
        <>
          <div className="drawing-card full-width">
            <h2 style={{ color: '#22c55e' }}>Ovoide — Definición</h2>
            <p>El <strong>ovoide</strong> es una curva cerrada simétrica respecto a un eje, formada por arcos de circunferencia enlazados. Se utiliza en diseño de piezas, arcos arquitectónicos y huevos de pascua geométricos.</p>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
              <svg viewBox="0 0 200 280" style={{ width: 180, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                {/* Simple ovoide preview */}
                <ellipse cx="100" cy="155" rx="70" ry="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                {/* Bottom semicircle */}
                <path d="M30,160 A70,70 0 0,0 170,160" fill="none" stroke="#22c55e" strokeWidth="2" />
                {/* Side arcs + top */}
                <path d="M30,160 Q30,40 100,30 Q170,40 170,160" fill="none" stroke="#a78bfa" strokeWidth="2" />
                <circle cx="100" cy="160" r="2" fill="#f59e0b" /><text x="106" y="163" fill="#f59e0b" fontSize="8">O</text>
                <text x="100" y="270" textAnchor="middle" fill="#888" fontSize="9">Vista completa</text>
              </svg>
            </div>
          </div>

          {/* Step-by-step ovoide */}
          <div className="drawing-card full-width">
            <h2 style={{ color: 'var(--primary-color)' }}>Construcción paso a paso</h2>
            <div className="step-by-step-module">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {ovoideSteps.map((s, i) => (
                  <button key={i} className={`sel-btn ${step === i ? 'active' : ''}`} onClick={() => setStep(i)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                    {i + 1}. {s.label}
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>Paso {step + 1}:</strong> {ovoideSteps[step].desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 300 350" style={{ width: '100%', maxWidth: 350, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                  {/* Step 1+: axis AB */}
                  {step >= 0 && (
                    <>
                      <circle cx="80" cy="200" r="3" fill="#22c55e" /><text x="70" y="218" fill="#22c55e" fontSize="8">A</text>
                      <circle cx="220" cy="200" r="3" fill="#22c55e" /><text x="224" y="218" fill="#22c55e" fontSize="8">B</text>
                      <line x1="80" y1="200" x2="220" y2="200" stroke="#888" strokeWidth="0.5" />
                      <circle cx="150" cy="200" r="2" fill="#a78bfa" /><text x="155" y="198" fill="#a78bfa" fontSize="7">O</text>
                    </>
                  )}
                  {/* Step 2+: lower semicircle */}
                  {step >= 1 && (
                    <path d="M80,200 A70,70 0 0,0 220,200" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                  )}
                  {/* Step 3+: lateral arcs */}
                  {step >= 2 && (
                    <>
                      <path d="M80,200 A140,140 0 0,1 150,65" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" />
                      <path d="M220,200 A140,140 0 0,0 150,65" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" />
                    </>
                  )}
                  {/* Step 4+: point C */}
                  {step >= 3 && (
                    <>
                      <circle cx="150" cy="65" r="3" fill="#f59e0b" /><text x="155" y="60" fill="#f59e0b" fontSize="8">C</text>
                      <line x1="150" y1="65" x2="80" y2="200" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" strokeDasharray="3,2" />
                      <line x1="150" y1="65" x2="220" y2="200" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" strokeDasharray="3,2" />
                    </>
                  )}
                  {/* Step 5+: top arc */}
                  {step >= 4 && (
                    <path d="M103,93 A60,60 0 0,1 197,93" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                  )}
                  {/* Step 6: complete outline */}
                  {step >= 5 && (
                    <>
                      {/* Redraw full outline thicker */}
                      <path d="M80,200 A70,70 0 0,0 220,200" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                      <path d="M80,200 A140,140 0 0,1 103,93" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
                      <path d="M220,200 A140,140 0 0,0 197,93" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
                      <path d="M103,93 A60,60 0 0,1 197,93" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    </>
                  )}
                </svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button className="sel-btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Anterior</button>
                <button className="sel-btn" onClick={() => setStep(Math.min(5, step + 1))} disabled={step === 5}>Siguiente →</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =================== CICLOIDES =================== */}
      {topic === 'cicloide' && (
        <>
          <div className="drawing-card full-width">
            <h2 style={{ color: '#f59e0b' }}>Cicloides — Definición</h2>
            <p>La <strong>cicloide</strong> es la curva descrita por un punto de una circunferencia que rueda sin deslizar sobre una recta.</p>
            <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '1rem' }}>
              {[
                { name: 'Normal', desc: 'El punto generador está sobre la circunferencia.', color: '#22c55e' },
                { name: 'Reducida (Acortada)', desc: 'El punto generador está dentro de la circunferencia.', color: '#f59e0b' },
                { name: 'Alargada (Prolongada)', desc: 'El punto generador está fuera de la circunferencia.', color: '#ef4444' },
              ].map(c => (
                <div key={c.name} style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, borderLeft: `3px solid ${c.color}` }}>
                  <div style={{ fontWeight: 700, color: c.color, fontSize: '0.9rem' }}>{c.name}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive cycloid */}
          <div className="drawing-card full-width">
            <h2 style={{ color: 'var(--primary-color)' }}>Simulador de Cicloide</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                Progreso: <input type="range" min="0" max="100" value={cycloidT} onChange={e => setCycloidT(Number(e.target.value))} /> {cycloidT}%
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 500 220" style={{ width: '100%', maxWidth: 550, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                {(() => {
                  const R = 30;
                  const baseY = 170;
                  const startX = 40;
                  const totalAngle = 2 * Math.PI;
                  const t = (cycloidT / 100) * totalAngle;
                  const circumference = 2 * Math.PI * R;
                  const cx = startX + (t / totalAngle) * circumference;
                  const cy = baseY - R;

                  // Normal cycloid path
                  const normalPts = [];
                  const reducedPts = [];
                  const elongatedPts = [];
                  const steps = 100;
                  const maxAngle = t;
                  for (let i = 0; i <= steps; i++) {
                    const a = (i / steps) * maxAngle;
                    const bx = startX + (a / totalAngle) * circumference;
                    // Normal
                    normalPts.push([bx + R * (a / totalAngle * totalAngle - Math.sin(a)) - (bx - startX), baseY - R + R * (Math.cos(a) - 1) + R]);
                    // Simpler: direct parametric
                  }
                  // Recalc with proper parametric
                  const normalPath = [], reducedPath = [], elongatedPath = [];
                  for (let i = 0; i <= steps; i++) {
                    const angle = (i / steps) * t;
                    const px = startX + R * angle - R * Math.sin(angle);
                    const py = baseY - R + R * Math.cos(angle);
                    normalPath.push([px, baseY - (baseY - py)]);
                    // Reduced: point at 0.5R
                    const rr = R * 0.5;
                    const rpx = startX + R * angle - rr * Math.sin(angle);
                    const rpy = baseY - R + rr * Math.cos(angle);
                    reducedPath.push([rpx, baseY - (baseY - rpy)]);
                    // Elongated: point at 1.5R
                    const er = R * 1.5;
                    const epx = startX + R * angle - er * Math.sin(angle);
                    const epy = baseY - R + er * Math.cos(angle);
                    elongatedPath.push([epx, baseY - (baseY - epy)]);
                  }
                  const toPath = pts => pts.length > 0 ? 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L') : '';

                  // Current point position
                  const curNx = startX + R * t - R * Math.sin(t);
                  const curNy = baseY - R + R * Math.cos(t);

                  return (
                    <>
                      {/* Base line */}
                      <line x1="20" y1={baseY} x2="480" y2={baseY} stroke="#888" strokeWidth="1" />
                      {/* Rolling circle */}
                      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <circle cx={cx} cy={cy} r="2" fill="#888" />
                      {/* Generating point on circle */}
                      <circle cx={curNx} cy={curNy} r="3.5" fill="#22c55e" />
                      <line x1={cx} y1={cy} x2={curNx} y2={curNy} stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
                      {/* Paths */}
                      <path d={toPath(normalPath)} fill="none" stroke="#22c55e" strokeWidth="2" />
                      <path d={toPath(reducedPath)} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                      <path d={toPath(elongatedPath)} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                      {/* Legend */}
                      <line x1="20" y1="15" x2="40" y2="15" stroke="#22c55e" strokeWidth="2" />
                      <text x="45" y="18" fill="#22c55e" fontSize="8">Normal</text>
                      <line x1="100" y1="15" x2="120" y2="15" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                      <text x="125" y="18" fill="#f59e0b" fontSize="8">Reducida</text>
                      <line x1="195" y1="15" x2="215" y2="15" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                      <text x="220" y="18" fill="#ef4444" fontSize="8">Alargada</text>
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Cycloid step-by-step */}
          <div className="drawing-card full-width">
            <h2 style={{ color: 'var(--primary-color)' }}>Trazado paso a paso — Cicloide normal</h2>
            <div className="step-by-step-module">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {cycloidSteps.map((s, i) => (
                  <button key={i} className={`sel-btn ${step === i ? 'active' : ''}`} onClick={() => setStep(i)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                    {i + 1}. {s.label}
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>Paso {step + 1}:</strong> {cycloidSteps[step].desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 450 200" style={{ width: '100%', maxWidth: 500, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                  {(() => {
                    const R = 25, baseY = 160, sx = 40;
                    const circ = 2 * Math.PI * R;
                    const n = 8;
                    return (
                      <>
                        {/* Step 1+: base line + divisions */}
                        {step >= 0 && (
                          <>
                            <line x1="20" y1={baseY} x2="430" y2={baseY} stroke="#888" strokeWidth="1" />
                            {Array.from({ length: n + 1 }, (_, i) => {
                              const x = sx + (i / n) * circ;
                              return (
                                <g key={i}>
                                  <line x1={x} y1={baseY - 3} x2={x} y2={baseY + 3} stroke="#888" strokeWidth="0.8" />
                                  <text x={x} y={baseY + 12} fill="#888" fontSize="6" textAnchor="middle">{i}</text>
                                </g>
                              );
                            })}
                          </>
                        )}
                        {/* Step 2+: center positions */}
                        {step >= 1 && (
                          <>
                            <line x1={sx} y1={baseY - R} x2={sx + circ} y2={baseY - R} stroke="rgba(167,139,250,0.3)" strokeWidth="0.5" strokeDasharray="3,2" />
                            {Array.from({ length: n + 1 }, (_, i) => {
                              const x = sx + (i / n) * circ;
                              return <circle key={i} cx={x} cy={baseY - R} r="2" fill="#a78bfa" />;
                            })}
                          </>
                        )}
                        {/* Step 3+: circles at positions */}
                        {step >= 2 && (
                          <>
                            {Array.from({ length: n + 1 }, (_, i) => {
                              const x = sx + (i / n) * circ;
                              return <circle key={i} cx={x} cy={baseY - R} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />;
                            })}
                          </>
                        )}
                        {/* Step 4+: points */}
                        {step >= 3 && (
                          <>
                            {Array.from({ length: n + 1 }, (_, i) => {
                              const angle = (i / n) * 2 * Math.PI;
                              const px = sx + R * angle - R * Math.sin(angle);
                              const py = baseY - R + R * Math.cos(angle);
                              return <circle key={i} cx={px} cy={py} r="2.5" fill="#22c55e" />;
                            })}
                          </>
                        )}
                        {/* Step 5: curve */}
                        {step >= 4 && (() => {
                          const pts = [];
                          for (let i = 0; i <= 80; i++) {
                            const angle = (i / 80) * 2 * Math.PI;
                            pts.push([sx + R * angle - R * Math.sin(angle), baseY - R + R * Math.cos(angle)]);
                          }
                          return <path d={'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L')} fill="none" stroke="#22c55e" strokeWidth="2" />;
                        })()}
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button className="sel-btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Anterior</button>
                <button className="sel-btn" onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4}>Siguiente →</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =================== ESPIRALES =================== */}
      {topic === 'espiral' && (
        <>
          <div className="drawing-card full-width">
            <h2 style={{ color: '#a78bfa' }}>Espirales</h2>
            <p>Una <strong>espiral</strong> es una curva plana que gira alrededor de un punto alejándose progresivamente de él.</p>
            <div className="sim-selector" style={{ marginTop: '1rem' }}>
              {[
                { key: 'arquimedes', label: 'Espiral de Arquímedes' },
                { key: 'logaritmica', label: 'Espiral Logarítmica' },
                { key: 'involuta', label: 'Involuta del Círculo' },
              ].map(t => (
                <button key={t.key} className={`sel-btn ${spiralType === t.key ? 'active' : ''}`} onClick={() => setSpiralType(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
              <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: 350, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                {(() => {
                  const ox = 150, oy = 150;
                  const pts = [];
                  const totalAngle = 4 * Math.PI;
                  const steps = 300;

                  if (spiralType === 'arquimedes') {
                    const k = 18;
                    for (let i = 0; i <= steps; i++) {
                      const angle = (i / steps) * totalAngle;
                      const r = k * angle / (2 * Math.PI);
                      pts.push([ox + r * Math.cos(angle), oy - r * Math.sin(angle)]);
                    }
                  } else if (spiralType === 'logaritmica') {
                    const a = 5, b = 0.18;
                    for (let i = 0; i <= steps; i++) {
                      const angle = (i / steps) * totalAngle;
                      const r = a * Math.exp(b * angle);
                      if (r < 140) pts.push([ox + r * Math.cos(angle), oy - r * Math.sin(angle)]);
                    }
                  } else {
                    // Involute of circle
                    const R = 15;
                    for (let i = 1; i <= steps; i++) {
                      const angle = (i / steps) * totalAngle;
                      const x = ox + R * (Math.cos(angle) + angle * Math.sin(angle));
                      const y = oy - R * (Math.sin(angle) - angle * Math.cos(angle));
                      if (x > 5 && x < 295 && y > 5 && y < 295) pts.push([x, y]);
                    }
                  }

                  const pathD = pts.length > 1 ? 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L') : '';
                  const colors = { arquimedes: '#22c55e', logaritmica: '#f59e0b', involuta: '#ef4444' };
                  const color = colors[spiralType];

                  return (
                    <>
                      {/* Crosshairs */}
                      <line x1={ox - 140} y1={oy} x2={ox + 140} y2={oy} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <line x1={ox} y1={oy - 140} x2={ox} y2={oy + 140} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <circle cx={ox} cy={oy} r="3" fill={color} />
                      <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" />
                      <text x={ox + 5} y={oy - 5} fill={color} fontSize="8">O</text>
                      {spiralType === 'involuta' && (
                        <circle cx={ox} cy={oy} r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      )}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, borderLeft: '3px solid #22c55e' }}>
                <h4 style={{ color: '#22c55e', fontSize: '0.9rem' }}>Espiral de Arquímedes</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>r = a + bθ. Las espiras están equidistantes. Se usa en resortes y discos.</p>
              </div>
              <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, borderLeft: '3px solid #f59e0b' }}>
                <h4 style={{ color: '#f59e0b', fontSize: '0.9rem' }}>Espiral Logarítmica</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>r = ae^(bθ). Las espiras se separan exponencialmente. Aparece en la naturaleza (nautilus).</p>
              </div>
              <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, borderLeft: '3px solid #ef4444' }}>
                <h4 style={{ color: '#ef4444', fontSize: '0.9rem' }}>Involuta del Círculo</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Curva trazada por el extremo de un hilo que se desenrolla de un círculo. Se usa en engranajes.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Theory cards */}
      <div className="drawing-grid">
        {[
          { title: 'Ovoide', color: '#22c55e', desc: 'Curva cerrada formada por arcos de circunferencia tangentes entre sí, simétrica respecto a un eje.', app: 'Arcos ojivales, diseño de piezas ovaladas, arquitectura.' },
          { title: 'Cicloide', color: '#f59e0b', desc: 'Curva descrita por un punto de una circunferencia que rueda sobre una recta.', app: 'Engranajes, péndulos, curva braquistócrona.' },
          { title: 'Espiral', color: '#a78bfa', desc: 'Curva que gira alrededor de un punto alejándose de él progresivamente.', app: 'Resortes, engranajes (involuta), diseño decorativo.' },
        ].map(t => (
          <div key={t.title} className="drawing-card" style={{ borderLeft: `4px solid ${t.color}` }}>
            <h3 style={{ color: t.color }}>{t.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{t.desc}</p>
            <div className="info-box"><strong>Aplicaciones:</strong> {t.app}</div>
          </div>
        ))}
      </div>

      {/* Ejercicios */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> Construir un ovoide dado el eje menor AB = 80 mm. Marcar centros, radios y puntos de tangencia.</li>
          <li><strong>Lámina 2:</strong> Construir un ovoide dado el eje mayor de 100 mm.</li>
          <li><strong>Lámina 3:</strong> Trazar una cicloide normal para una circunferencia generatriz de R = 25 mm (dividir en 12 partes).</li>
          <li><strong>Lámina 4:</strong> En la misma lámina, trazar la cicloide reducida (punto a R/2) y la alargada (punto a 1.5R). Comparar.</li>
          <li><strong>Lámina 5:</strong> Trazar una espiral de Arquímedes de 3 vueltas con paso = 15 mm.</li>
          <li><strong>Lámina 6:</strong> Trazar la involuta de un círculo de R = 20 mm (2 vueltas completas). Indicar su uso en engranajes.</li>
        </ul>
      </div>
    </div>
  );
};

export default CurvasTecnicasPage;

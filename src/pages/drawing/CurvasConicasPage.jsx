import React, { useState } from 'react';
import './DrawingStyles.css';

const CurvasConicasPage = () => {
  const [curve, setCurve] = useState('elipse');
  const [step, setStep] = useState(0);

  /* Ellipse interactive params */
  const [a, setA] = useState(120);
  const [b, setB] = useState(70);

  const c_val = Math.sqrt(Math.max(a * a - b * b, 0));

  /* Parabola focus distance */
  const [pFocus, setPFocus] = useState(60);

  /* ---- Ellipse step-by-step ---- */
  const ellipseSteps = [
    { label: 'Ejes', desc: 'Trazar los ejes mayor (2a) y menor (2b) perpendiculares por el centro O.' },
    { label: 'Focos', desc: 'Calcular c = √(a²−b²). Marcar F₁ y F₂ sobre el eje mayor a distancia c del centro.' },
    { label: 'Circunferencias auxiliares', desc: 'Trazar dos circunferencias concéntricas de radios a y b.' },
    { label: 'Radios', desc: 'Trazar radios desde O cortando ambas circunferencias.' },
    { label: 'Proyecciones', desc: 'Desde la circunferencia mayor, trazar vertical. Desde la menor, trazar horizontal. La intersección es un punto de la elipse.' },
    { label: 'Curva', desc: 'Unir todos los puntos obtenidos con curva suave.' },
  ];

  /* ---- Parabola step-by-step ---- */
  const parabolaSteps = [
    { label: 'Eje y directriz', desc: 'Trazar el eje de simetría y la directriz perpendicular a él.' },
    { label: 'Foco', desc: 'Marcar el foco F a distancia p de la directriz sobre el eje.' },
    { label: 'Vértice', desc: 'El vértice V está en el punto medio entre F y la directriz.' },
    { label: 'Puntos', desc: 'Trazar rectas paralelas al eje. Desde F, con compás radio = distancia de la paralela a la directriz, marcar intersecciones.' },
    { label: 'Curva', desc: 'Unir los puntos con curva suave pasando por V.' },
  ];

  const activeSteps = curve === 'elipse' ? ellipseSteps : parabolaSteps;
  const maxStep = activeSteps.length - 1;

  const handleCurveChange = (c) => { setCurve(c); setStep(0); };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 5 — Semanas 25–28</div>
        <h1>Curvas Cónicas</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          Generación, definición y trazado de la elipse, la parábola y la hipérbola.
        </p>
      </div>

      {/* Generación cónica */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Generación de las Cónicas</h2>
        <p>Las curvas cónicas se obtienen al cortar un cono recto con un plano en distintos ángulos:</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <svg viewBox="0 0 440 200" style={{ width: '100%', maxWidth: 500 }}>
            {/* Cone + Ellipse */}
            <g transform="translate(60,10)">
              <polygon points="50,0 0,180 100,180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <ellipse cx="50" cy="100" rx="42" ry="12" fill="none" stroke="#22c55e" strokeWidth="2" transform="rotate(-15,50,100)" />
              <text x="25" y="195" fill="#22c55e" fontSize="10" fontWeight="700">Elipse</text>
            </g>
            {/* Cone + Parabola */}
            <g transform="translate(190,10)">
              <polygon points="50,0 0,180 100,180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="15" y1="40" x2="55" y2="180" stroke="#f59e0b" strokeWidth="2" />
              <text x="15" y="195" fill="#f59e0b" fontSize="10" fontWeight="700">Parábola</text>
            </g>
            {/* Cone + Hyperbola */}
            <g transform="translate(320,10)">
              <polygon points="50,0 0,180 100,180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="30" y1="0" x2="30" y2="180" stroke="#ef4444" strokeWidth="2" />
              <text x="12" y="195" fill="#ef4444" fontSize="10" fontWeight="700">Hipérbola</text>
            </g>
          </svg>
        </div>
        <div className="info-box">
          <strong>Ley:</strong> Si el plano corta todas las generatrices → <span style={{color:'#22c55e'}}>elipse</span>.
          Si es paralelo a una generatriz → <span style={{color:'#f59e0b'}}>parábola</span>.
          Si es paralelo al eje → <span style={{color:'#ef4444'}}>hipérbola</span>.
        </div>
      </div>

      {/* Selector */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Simulador Interactivo</h2>
        <div className="sim-selector">
          {[
            { key: 'elipse', label: 'Elipse' },
            { key: 'parabola', label: 'Parábola' },
            { key: 'hiperbola', label: 'Hipérbola' },
          ].map(t => (
            <button key={t.key} className={`sel-btn ${curve === t.key ? 'active' : ''}`} onClick={() => handleCurveChange(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {curve === 'elipse' && (
            <>
              <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>a (semieje mayor): <input type="range" min="60" max="160" value={a} onChange={e => setA(Number(e.target.value))} /> {a}</label>
              <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>b (semieje menor): <input type="range" min="30" max="140" value={b} onChange={e => setB(Number(e.target.value))} /> {b}</label>
            </>
          )}
          {curve === 'parabola' && (
            <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Distancia focal p: <input type="range" min="20" max="100" value={pFocus} onChange={e => setPFocus(Number(e.target.value))} /> {pFocus}</label>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 300" style={{ width: '100%', maxWidth: 750, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
            {/* Grid */}
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}

            {curve === 'elipse' && (() => {
              const ox = 200, oy = 150;
              const aClamp = Math.max(a, b + 1);
              const cDist = Math.sqrt(aClamp * aClamp - b * b);
              return (
                <>
                  {/* Axes */}
                  <line x1={ox - aClamp - 10} y1={oy} x2={ox + aClamp + 10} y2={oy} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1={ox} y1={oy - b - 10} x2={ox} y2={oy + b + 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  {/* Ellipse */}
                  <ellipse cx={ox} cy={oy} rx={aClamp} ry={b} fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
                  {/* Center */}
                  <circle cx={ox} cy={oy} r="3" fill="#a78bfa" />
                  <text x={ox + 5} y={oy - 5} fill="#a78bfa" fontSize="9">O</text>
                  {/* Foci */}
                  <circle cx={ox - cDist} cy={oy} r="3" fill="#f59e0b" />
                  <text x={ox - cDist - 5} y={oy + 14} fill="#f59e0b" fontSize="8">F₁</text>
                  <circle cx={ox + cDist} cy={oy} r="3" fill="#f59e0b" />
                  <text x={ox + cDist - 5} y={oy + 14} fill="#f59e0b" fontSize="8">F₂</text>
                  {/* Labels */}
                  <text x={ox + aClamp / 2} y={oy - 5} fill="#22c55e" fontSize="8" textAnchor="middle">a = {aClamp}</text>
                  <text x={ox + 5} y={oy - b / 2} fill="#22c55e" fontSize="8">b = {b}</text>
                  <text x={ox + cDist / 2} y={oy + 14} fill="#f59e0b" fontSize="7" textAnchor="middle">c = {cDist.toFixed(1)}</text>
                  {/* Vertices */}
                  <circle cx={ox - aClamp} cy={oy} r="2.5" fill="#22c55e" />
                  <circle cx={ox + aClamp} cy={oy} r="2.5" fill="#22c55e" />
                  <circle cx={ox} cy={oy - b} r="2.5" fill="#22c55e" />
                  <circle cx={ox} cy={oy + b} r="2.5" fill="#22c55e" />
                  {/* Property */}
                  <text x="10" y="285" fill="#888" fontSize="8">Propiedad: PF₁ + PF₂ = 2a = {2 * aClamp} (constante para todo punto P de la elipse)</text>
                </>
              );
            })()}

            {curve === 'parabola' && (() => {
              const vx = 80, vy = 150;
              const p = pFocus;
              const fx = vx + p / 2, dx = vx - p / 2;
              const pts = [];
              for (let t = -140; t <= 140; t += 5) {
                const x = vx + (t * t) / (2 * p);
                const y = vy + t;
                if (x < 390 && y > 5 && y < 295) pts.push([x, y]);
              }
              const pathD = pts.length > 0 ? 'M' + pts.map(([x, y]) => `${x},${y}`).join(' L') : '';
              return (
                <>
                  {/* Axis */}
                  <line x1="30" y1={vy} x2="390" y2={vy} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  {/* Directrix */}
                  <line x1={dx} y1="10" x2={dx} y2="290" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,3" />
                  <text x={dx - 5} y="20" fill="#ef4444" fontSize="8" textAnchor="end">Directriz</text>
                  {/* Parabola */}
                  <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2" />
                  {/* Vertex */}
                  <circle cx={vx} cy={vy} r="3" fill="#22c55e" />
                  <text x={vx - 5} y={vy + 14} fill="#22c55e" fontSize="8">V</text>
                  {/* Focus */}
                  <circle cx={fx} cy={vy} r="3" fill="#a78bfa" />
                  <text x={fx + 5} y={vy - 5} fill="#a78bfa" fontSize="8">F</text>
                  {/* p distance */}
                  <line x1={dx} y1={vy + 25} x2={fx} y2={vy + 25} stroke="#888" strokeWidth="0.5" />
                  <text x={(dx + fx) / 2} y={vy + 35} fill="#888" fontSize="7" textAnchor="middle">p = {p}</text>
                  {/* Example point showing equal distances */}
                  {(() => {
                    const ty = 80;
                    const tx = vx + ((ty - vy) * (ty - vy)) / (2 * p);
                    if (tx < 380) return (
                      <>
                        <circle cx={tx} cy={ty} r="2.5" fill="#22c55e" />
                        <text x={tx + 5} y={ty - 3} fill="#22c55e" fontSize="7">P</text>
                        <line x1={tx} y1={ty} x2={fx} y2={vy} stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1={tx} y1={ty} x2={dx} y2={ty} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2" />
                      </>
                    );
                    return null;
                  })()}
                  <text x="10" y="285" fill="#888" fontSize="8">Propiedad: distancia al foco = distancia a la directriz (para todo punto P)</text>
                </>
              );
            })()}

            {curve === 'hiperbola' && (() => {
              const ox = 200, oy = 150;
              const ha = 70, hb = 50;
              const hc = Math.sqrt(ha * ha + hb * hb);
              // Right branch
              const ptsR = [], ptsL = [];
              for (let t = -1.8; t <= 1.8; t += 0.05) {
                const x = ha * Math.cosh(t);
                const y = hb * Math.sinh(t);
                if (ox + x < 395 && oy + y > 5 && oy + y < 295) ptsR.push([ox + x, oy + y]);
                if (ox - x > 5 && oy + y > 5 && oy + y < 295) ptsL.push([ox - x, oy + y]);
              }
              const pathR = ptsR.length > 0 ? 'M' + ptsR.map(p => p.join(',')).join(' L') : '';
              const pathL = ptsL.length > 0 ? 'M' + ptsL.map(p => p.join(',')).join(' L') : '';
              return (
                <>
                  {/* Axes */}
                  <line x1="10" y1={oy} x2="390" y2={oy} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1={ox} y1="10" x2={ox} y2="290" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  {/* Asymptotes */}
                  <line x1={ox - 190} y1={oy + 190 * hb / ha} x2={ox + 190} y2={oy - 190 * hb / ha} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5,3" />
                  <line x1={ox - 190} y1={oy - 190 * hb / ha} x2={ox + 190} y2={oy + 190 * hb / ha} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5,3" />
                  <text x="350" y={oy - 120} fill="#888" fontSize="7">asíntotas</text>
                  {/* Branches */}
                  <path d={pathR} fill="none" stroke="#ef4444" strokeWidth="2" />
                  <path d={pathL} fill="none" stroke="#ef4444" strokeWidth="2" />
                  {/* Center */}
                  <circle cx={ox} cy={oy} r="3" fill="#a78bfa" />
                  <text x={ox + 5} y={oy - 5} fill="#a78bfa" fontSize="9">O</text>
                  {/* Foci */}
                  <circle cx={ox - hc} cy={oy} r="3" fill="#f59e0b" />
                  <text x={ox - hc - 5} y={oy + 14} fill="#f59e0b" fontSize="8">F₁</text>
                  <circle cx={ox + hc} cy={oy} r="3" fill="#f59e0b" />
                  <text x={ox + hc - 5} y={oy + 14} fill="#f59e0b" fontSize="8">F₂</text>
                  {/* Vertices */}
                  <circle cx={ox - ha} cy={oy} r="2.5" fill="#ef4444" />
                  <circle cx={ox + ha} cy={oy} r="2.5" fill="#ef4444" />
                  {/* Labels */}
                  <text x={ox + ha / 2} y={oy - 5} fill="#ef4444" fontSize="8" textAnchor="middle">a = {ha}</text>
                  <text x="10" y="285" fill="#888" fontSize="8">Propiedad: |PF₁ − PF₂| = 2a = {2 * ha} (constante)</text>
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Step-by-step tutorials */}
      {(curve === 'elipse' || curve === 'parabola') && (
        <div className="drawing-card full-width">
          <h2 style={{ color: 'var(--primary-color)' }}>
            Trazado paso a paso — {curve === 'elipse' ? 'Elipse (método de circunferencias auxiliares)' : 'Parábola (a partir de foco y directriz)'}
          </h2>
          <div className="step-by-step-module" style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {activeSteps.map((s, i) => (
                <button key={i} className={`sel-btn ${step === i ? 'active' : ''}`} onClick={() => setStep(i)} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                  {i + 1}. {s.label}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '1.05rem', marginBottom: '1rem' }}>
              <strong>Paso {step + 1}:</strong> {activeSteps[step].desc}
            </p>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: 850, minHeight: 420, background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16 }}>
                {curve === 'elipse' && (() => {
                  const ox = 200, oy = 140, sa = 130, sb = 80;
                  const sc = Math.sqrt(sa * sa - sb * sb);
                  return (
                    <>
                      {/* Step 1+: axes */}
                      {step >= 0 && (
                        <>
                          <line x1={ox - sa - 15} y1={oy} x2={ox + sa + 15} y2={oy} stroke="#888" strokeWidth="0.5" />
                          <line x1={ox} y1={oy - sb - 15} x2={ox} y2={oy + sb + 15} stroke="#888" strokeWidth="0.5" />
                          <circle cx={ox} cy={oy} r="2" fill="#a78bfa" />
                          <text x={ox + 4} y={oy - 4} fill="#a78bfa" fontSize="7">O</text>
                          <circle cx={ox - sa} cy={oy} r="2" fill="#22c55e" /><text x={ox - sa - 3} y={oy + 12} fill="#22c55e" fontSize="7">A</text>
                          <circle cx={ox + sa} cy={oy} r="2" fill="#22c55e" /><text x={ox + sa - 3} y={oy + 12} fill="#22c55e" fontSize="7">A&apos;</text>
                          <circle cx={ox} cy={oy - sb} r="2" fill="#22c55e" /><text x={ox + 5} y={oy - sb + 3} fill="#22c55e" fontSize="7">B</text>
                          <circle cx={ox} cy={oy + sb} r="2" fill="#22c55e" /><text x={ox + 5} y={oy + sb + 3} fill="#22c55e" fontSize="7">B&apos;</text>
                        </>
                      )}
                      {/* Step 2+: foci */}
                      {step >= 1 && (
                        <>
                          <circle cx={ox - sc} cy={oy} r="3" fill="#f59e0b" />
                          <text x={ox - sc - 5} y={oy - 8} fill="#f59e0b" fontSize="7">F₁</text>
                          <circle cx={ox + sc} cy={oy} r="3" fill="#f59e0b" />
                          <text x={ox + sc - 5} y={oy - 8} fill="#f59e0b" fontSize="7">F₂</text>
                        </>
                      )}
                      {/* Step 3+: auxiliary circles */}
                      {step >= 2 && (
                        <>
                          <circle cx={ox} cy={oy} r={sa} fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="0.8" strokeDasharray="4,3" />
                          <circle cx={ox} cy={oy} r={sb} fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" strokeDasharray="4,3" />
                          <text x={ox + sa + 3} y={oy - 3} fill="rgba(167,139,250,0.5)" fontSize="7">r=a</text>
                          <text x={ox + sb + 3} y={oy - 3} fill="rgba(59,130,246,0.5)" fontSize="7">r=b</text>
                        </>
                      )}
                      {/* Step 4+: radii */}
                      {step >= 3 && (
                        <>
                          {[30, 60, 120, 150].map(deg => {
                            const rad = deg * Math.PI / 180;
                            return (
                              <g key={deg}>
                                <line x1={ox} y1={oy} x2={ox + sa * Math.cos(rad)} y2={oy - sa * Math.sin(rad)} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                                <circle cx={ox + sa * Math.cos(rad)} cy={oy - sa * Math.sin(rad)} r="2" fill="rgba(167,139,250,0.5)" />
                                <circle cx={ox + sb * Math.cos(rad)} cy={oy - sb * Math.sin(rad)} r="2" fill="rgba(59,130,246,0.5)" />
                              </g>
                            );
                          })}
                        </>
                      )}
                      {/* Step 5+: projections */}
                      {step >= 4 && (
                        <>
                          {[30, 60, 120, 150].map(deg => {
                            const rad = deg * Math.PI / 180;
                            const px = ox + sa * Math.cos(rad);
                            const py = oy - sb * Math.sin(rad);
                            return (
                              <g key={`p${deg}`}>
                                <line x1={ox + sa * Math.cos(rad)} y1={oy - sa * Math.sin(rad)} x2={px} y2={py} stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                                <line x1={ox + sb * Math.cos(rad)} y1={oy - sb * Math.sin(rad)} x2={px} y2={py} stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                                <circle cx={px} cy={py} r="2.5" fill="#22c55e" />
                              </g>
                            );
                          })}
                        </>
                      )}
                      {/* Step 6: full ellipse */}
                      {step >= 5 && (
                        <ellipse cx={ox} cy={oy} rx={sa} ry={sb} fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
                      )}
                    </>
                  );
                })()}

                {curve === 'parabola' && (() => {
                  const vx = 100, vy = 140, pp = 80;
                  const fx = vx + pp / 2;
                  const dx = vx - pp / 2;
                  return (
                    <>
                      {/* Step 1+: axis and directrix */}
                      {step >= 0 && (
                        <>
                          <line x1="30" y1={vy} x2="380" y2={vy} stroke="#888" strokeWidth="0.5" />
                          <line x1={dx} y1="20" x2={dx} y2="260" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,3" />
                          <text x={dx - 5} y="30" fill="#ef4444" fontSize="8" textAnchor="end">d</text>
                        </>
                      )}
                      {/* Step 2+: focus */}
                      {step >= 1 && (
                        <>
                          <circle cx={fx} cy={vy} r="3" fill="#a78bfa" />
                          <text x={fx + 5} y={vy - 5} fill="#a78bfa" fontSize="8">F</text>
                        </>
                      )}
                      {/* Step 3+: vertex */}
                      {step >= 2 && (
                        <>
                          <circle cx={vx} cy={vy} r="3" fill="#22c55e" />
                          <text x={vx - 5} y={vy + 14} fill="#22c55e" fontSize="8">V</text>
                        </>
                      )}
                      {/* Step 4+: construction points */}
                      {step >= 3 && (
                        <>
                          {[50, 80, 110].map(dy => {
                            const px = vx + (dy * dy) / (2 * pp);
                            return px < 370 ? (
                              <g key={dy}>
                                <circle cx={px} cy={vy - dy} r="2.5" fill="#22c55e" />
                                <circle cx={px} cy={vy + dy} r="2.5" fill="#22c55e" />
                                <line x1={px} y1={vy - dy} x2={dx} y2={vy - dy} stroke="rgba(239,68,68,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                                <line x1={px} y1={vy - dy} x2={fx} y2={vy} stroke="rgba(167,139,250,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                              </g>
                            ) : null;
                          })}
                        </>
                      )}
                      {/* Step 5: full parabola */}
                      {step >= 4 && (() => {
                        const pts = [];
                        for (let t = -120; t <= 120; t += 3) {
                          const x = vx + (t * t) / (2 * pp);
                          const y = vy + t;
                          if (x < 390 && y > 10 && y < 270) pts.push([x, y]);
                        }
                        const d = pts.length > 0 ? 'M' + pts.map(p => p.join(',')).join(' L') : '';
                        return <path d={d} fill="none" stroke="#f59e0b" strokeWidth="2" />;
                      })()}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button className="sel-btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Anterior</button>
              <button className="sel-btn" onClick={() => setStep(Math.min(maxStep, step + 1))} disabled={step === maxStep}>Siguiente →</button>
            </div>
          </div>
        </div>
      )}

      {/* Theory cards */}
      <div className="drawing-grid">
        {[
          { title: 'Elipse', color: '#22c55e', desc: 'Lugar geométrico de los puntos cuya suma de distancias a dos focos es constante (= 2a).', params: 'Semiejes a, b; Focos F₁, F₂; Excentricidad e = c/a < 1' },
          { title: 'Parábola', color: '#f59e0b', desc: 'Lugar geométrico de los puntos equidistantes de un foco y una recta (directriz).', params: 'Foco F; Directriz d; Vértice V; Parámetro p' },
          { title: 'Hipérbola', color: '#ef4444', desc: 'Lugar geométrico de los puntos cuya diferencia de distancias a dos focos es constante (= 2a).', params: 'Semiejes a, b; Focos F₁, F₂; Asíntotas; e = c/a > 1' },
        ].map(t => (
          <div key={t.title} className="drawing-card" style={{ borderLeft: `4px solid ${t.color}` }}>
            <h3 style={{ color: t.color }}>{t.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{t.desc}</p>
            <div className="info-box"><strong>Elementos:</strong> {t.params}</div>
          </div>
        ))}
      </div>

      {/* Tangentes a cónicas */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Tangentes a Cónicas</h2>
        <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
            <h3 style={{ color: '#22c55e', fontSize: '0.95rem' }}>Tangente a la elipse</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>La tangente en un punto P biseca el ángulo exterior formado por los radios focales PF₁ y PF₂.</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
            <h3 style={{ color: '#f59e0b', fontSize: '0.95rem' }}>Tangente a la parábola</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>La tangente en P forma ángulos iguales con el radio focal PF y la dirección del eje (propiedad reflectora).</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
            <h3 style={{ color: '#ef4444', fontSize: '0.95rem' }}>Tangente a la hipérbola</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>La tangente en P biseca el ángulo formado por los radios focales PF₁ y PF₂.</p>
          </div>
        </div>
      </div>

      {/* Ejercicios */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> Dada una elipse con a = 60 mm y b = 40 mm, trazarla por el método de las circunferencias auxiliares. Marcar focos y vértices.</li>
          <li><strong>Lámina 2:</strong> Trazar una elipse por el método de intersección de rectas (dados los ejes mayor y menor).</li>
          <li><strong>Lámina 3:</strong> Dada una parábola con foco a 30 mm de la directriz, trazarla por puntos. Construir la tangente en un punto P cualquiera.</li>
          <li><strong>Lámina 4:</strong> Trazar una parábola por el método del rectángulo envolvente.</li>
          <li><strong>Lámina 5:</strong> Dada una hipérbola con a = 40 mm y b = 30 mm, trazarla por puntos. Dibujar las asíntotas.</li>
          <li><strong>Lámina 6:</strong> Composición: Diseñar un arco ojival combinando arcos de elipse. Marcar centros, focos y ejes.</li>
        </ul>
      </div>
    </div>
  );
};

export default CurvasConicasPage;

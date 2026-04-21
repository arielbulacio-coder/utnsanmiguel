import React, { useState } from 'react';
import './DrawingStyles.css';

const TransformacionesPlanoPage = () => {
  const [transf, setTransf] = useState('traslacion');

  /* Interactive: translation offset */
  const [tx, setTx] = useState(80);
  const [ty, setTy] = useState(40);
  /* Rotation angle */
  const [angle, setAngle] = useState(45);
  /* Homothety ratio */
  const [ratio, setRatio] = useState(1.5);

  const origTriangle = [[60,140],[100,60],[140,140]];

  const translate = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
  const rotate = (pts, cx, cy, deg) => {
    const rad = deg * Math.PI / 180;
    return pts.map(([x, y]) => {
      const nx = cx + (x - cx) * Math.cos(rad) - (y - cy) * Math.sin(rad);
      const ny = cy + (x - cx) * Math.sin(rad) + (y - cy) * Math.cos(rad);
      return [nx, ny];
    });
  };
  const reflect = (pts, axis, val) => {
    if (axis === 'x') return pts.map(([x, y]) => [x, 2 * val - y]);
    return pts.map(([x, y]) => [2 * val - x, y]);
  };
  const homothety = (pts, cx, cy, k) => pts.map(([x, y]) => [cx + k * (x - cx), cy + k * (y - cy)]);

  const polyStr = (pts) => pts.map(p => p.join(',')).join(' ');
  const centroid = (pts) => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
  const [cx, cy] = centroid(origTriangle);

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 4 — Semanas 21–24</div>
        <h1>Transformaciones en el Plano</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          Traslación, giro, simetría (axial y central) y homotecia de figuras planas.
        </p>
      </div>

      {/* Selector */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Simulador Interactivo</h2>
        <div className="sim-selector">
          {[
            { key: 'traslacion', label: 'Traslación' },
            { key: 'giro', label: 'Giro (Rotación)' },
            { key: 'simetria-axial', label: 'Simetría Axial' },
            { key: 'simetria-central', label: 'Simetría Central' },
            { key: 'homotecia', label: 'Homotecia' },
          ].map(t => (
            <button key={t.key} className={`sel-btn ${transf === t.key ? 'active' : ''}`} onClick={() => setTransf(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {transf === 'traslacion' && (
            <>
              <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>dx: <input type="range" min="-100" max="150" value={tx} onChange={e => setTx(Number(e.target.value))} /> {tx}</label>
              <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>dy: <input type="range" min="-100" max="100" value={ty} onChange={e => setTy(Number(e.target.value))} /> {ty}</label>
            </>
          )}
          {transf === 'giro' && (
            <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Ángulo: <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} /> {angle}°</label>
          )}
          {transf === 'homotecia' && (
            <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Razón k: <input type="range" min="0.3" max="2.5" step="0.1" value={ratio} onChange={e => setRatio(Number(e.target.value))} /> {ratio}</label>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: 450, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
            {/* Grid */}
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="280" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 15 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}

            {/* Original */}
            <polygon points={polyStr(origTriangle)} fill="rgba(124,58,237,0.2)" stroke="#a78bfa" strokeWidth="1.5" />
            <text x={cx - 15} y={cy + 4} fill="#a78bfa" fontSize="8">Original</text>

            {/* Transformed */}
            {transf === 'traslacion' && (() => {
              const tr = translate(origTriangle, tx, ty);
              return (
                <>
                  <polygon points={polyStr(tr)} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1.5" />
                  {/* Vector arrow */}
                  <line x1={cx} y1={cy} x2={cx + tx} y2={cy + ty} stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow)" />
                  <defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f59e0b" /></marker></defs>
                  <text x={cx + tx / 2} y={cy + ty / 2 - 6} fill="#f59e0b" fontSize="7">Vector ({tx},{ty})</text>
                </>
              );
            })()}

            {transf === 'giro' && (() => {
              const tr = rotate(origTriangle, cx, cy, angle);
              return (
                <>
                  <polygon points={polyStr(tr)} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="3" fill="#f59e0b" />
                  <text x={cx + 5} y={cy - 5} fill="#f59e0b" fontSize="7">Centro</text>
                  <path d={`M${cx + 25},${cy} A25,25 0 ${angle > 180 ? 1 : 0},1 ${cx + 25 * Math.cos(angle * Math.PI / 180)},${cy + 25 * Math.sin(angle * Math.PI / 180)}`}
                    fill="none" stroke="#f59e0b" strokeWidth="0.8" />
                </>
              );
            })()}

            {transf === 'simetria-axial' && (() => {
              const tr = reflect(origTriangle, 'y', 200);
              return (
                <>
                  <line x1="200" y1="0" x2="200" y2="280" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,3" />
                  <text x="205" y="15" fill="#f59e0b" fontSize="8">Eje de simetría</text>
                  <polygon points={polyStr(tr)} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1.5" />
                  {origTriangle.map((p, i) => (
                    <line key={i} x1={p[0]} y1={p[1]} x2={tr[i][0]} y2={tr[i][1]} stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />
                  ))}
                </>
              );
            })()}

            {transf === 'simetria-central' && (() => {
              const center = [200, 140];
              const tr = origTriangle.map(([x, y]) => [2 * center[0] - x, 2 * center[1] - y]);
              return (
                <>
                  <circle cx={center[0]} cy={center[1]} r="4" fill="#f59e0b" />
                  <text x={center[0] + 8} y={center[1] - 4} fill="#f59e0b" fontSize="8">Centro O</text>
                  <polygon points={polyStr(tr)} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1.5" />
                  {origTriangle.map((p, i) => (
                    <line key={i} x1={p[0]} y1={p[1]} x2={tr[i][0]} y2={tr[i][1]} stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />
                  ))}
                </>
              );
            })()}

            {transf === 'homotecia' && (() => {
              const center = [30, 200];
              const tr = homothety(origTriangle, center[0], center[1], ratio);
              return (
                <>
                  <circle cx={center[0]} cy={center[1]} r="4" fill="#f59e0b" />
                  <text x={center[0] + 6} y={center[1] + 4} fill="#f59e0b" fontSize="8">O (k={ratio})</text>
                  <polygon points={polyStr(tr)} fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1.5" />
                  {origTriangle.map((p, i) => (
                    <line key={i} x1={center[0]} y1={center[1]} x2={tr[i][0]} y2={tr[i][1]} stroke="#888" strokeWidth="0.3" strokeDasharray="2,2" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Theory cards */}
      <div className="drawing-grid">
        {[
          { title: 'Traslación', color: '#22c55e', desc: 'Desplaza cada punto de la figura según un vector (dx, dy). La forma y tamaño no cambian.', params: 'Vector de traslación' },
          { title: 'Giro (Rotación)', color: '#a78bfa', desc: 'Rota la figura alrededor de un centro fijo un ángulo dado. Sentido positivo = antihorario.', params: 'Centro y ángulo' },
          { title: 'Simetría Axial', color: '#f59e0b', desc: 'Refleja la figura respecto a un eje (recta). Es como un espejo.', params: 'Eje de simetría' },
          { title: 'Simetría Central', color: '#ef4444', desc: 'Cada punto se refleja a través de un centro O. Equivale a un giro de 180°.', params: 'Centro de simetría' },
          { title: 'Homotecia', color: '#3b82f6', desc: 'Amplía o reduce la figura desde un centro fijo con razón k. Si k > 1 amplía, si k < 1 reduce.', params: 'Centro y razón k' },
        ].map(t => (
          <div key={t.title} className="drawing-card" style={{ borderLeft: `4px solid ${t.color}` }}>
            <h3 style={{ color: t.color }}>{t.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{t.desc}</p>
            <div className="info-box"><strong>Parámetros:</strong> {t.params}</div>
          </div>
        ))}
      </div>

      {/* Ejercicios */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> Dado un triángulo de vértices A(20,80), B(60,20), C(80,80), trasladarlo según vector (70, 30). Dibujar original y trasladado.</li>
          <li><strong>Lámina 2:</strong> Rotar un cuadrado de lado 40 mm un ángulo de 45° respecto a su vértice inferior izquierdo.</li>
          <li><strong>Lámina 3:</strong> Dada una letra "F" de 30 mm de alto, realizar su simetría axial respecto a un eje vertical.</li>
          <li><strong>Lámina 4:</strong> Aplicar simetría central a un pentágono regular respecto a un punto O exterior.</li>
          <li><strong>Lámina 5:</strong> Aplicar homotecia de razón k=2 y k=0.5 a un hexágono, ambas desde el mismo centro. Comparar.</li>
          <li><strong>Lámina 6:</strong> Composición: trasladar un triángulo, luego rotarlo 90° y finalmente aplicar simetría axial.</li>
        </ul>
      </div>
    </div>
  );
};

export default TransformacionesPlanoPage;

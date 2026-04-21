import React, { useState } from 'react';
import './DrawingStyles.css';

const polygonData = {
  triangulo: {
    title: 'Triángulo Equilátero',
    sides: 3,
    steps: [
      { text: 'Trazar la circunferencia de radio R con centro O. Marcar el diámetro vertical.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="150" y1="50" x2="150" y2="250" stroke="#666" strokeWidth="0.5" strokeDasharray="5,3" />
        <circle cx="150" cy="150" r="2" fill="#888" /><text x="155" y="148" fill="#888" fontSize="8">O</text>
        <circle cx="150" cy="50" r="3" fill="var(--primary-color)" /><text x="156" y="48" fill="var(--primary-color)" fontSize="8">A</text></>
      )},
      { text: 'Desde el punto inferior del diámetro, hacer centro con radio R. Marcar las intersecciones B y C con la circunferencia.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="150" cy="250" r="100" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
        <circle cx="150" cy="50" r="3" fill="var(--primary-color)" />
        <circle cx="63.4" cy="200" r="3" fill="#22c55e" /><text x="48" y="198" fill="#22c55e" fontSize="8">B</text>
        <circle cx="236.6" cy="200" r="3" fill="#22c55e" /><text x="242" y="198" fill="#22c55e" fontSize="8">C</text></>
      )},
      { text: 'Unir los vértices A, B y C. El triángulo equilátero queda inscripto en la circunferencia.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <polygon points="150,50 63.4,200 236.6,200" fill="rgba(124,58,237,0.1)" stroke="var(--primary-color)" strokeWidth="2" />
        <circle cx="150" cy="50" r="3" fill="var(--primary-color)" />
        <circle cx="63.4" cy="200" r="3" fill="var(--primary-color)" />
        <circle cx="236.6" cy="200" r="3" fill="var(--primary-color)" />
        <text x="150" y="42" textAnchor="middle" fill="var(--primary-color)" fontSize="8">A</text>
        <text x="48" y="208" fill="var(--primary-color)" fontSize="8">B</text>
        <text x="242" y="208" fill="var(--primary-color)" fontSize="8">C</text></>
      )},
    ]
  },
  cuadrado: {
    title: 'Cuadrado',
    sides: 4,
    steps: [
      { text: 'Trazar la circunferencia y los dos diámetros perpendiculares (horizontal y vertical).', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="50" y1="150" x2="250" y2="150" stroke="#666" strokeWidth="0.5" strokeDasharray="5,3" />
        <line x1="150" y1="50" x2="150" y2="250" stroke="#666" strokeWidth="0.5" strokeDasharray="5,3" />
        <circle cx="150" cy="50" r="3" fill="#22c55e" /><circle cx="250" cy="150" r="3" fill="#22c55e" />
        <circle cx="150" cy="250" r="3" fill="#22c55e" /><circle cx="50" cy="150" r="3" fill="#22c55e" /></>
      )},
      { text: 'Los 4 puntos de intersección de los diámetros con la circunferencia son los vértices del cuadrado.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <polygon points="150,50 250,150 150,250 50,150" fill="rgba(124,58,237,0.1)" stroke="var(--primary-color)" strokeWidth="2" />
        <circle cx="150" cy="50" r="3" fill="var(--primary-color)" />
        <circle cx="250" cy="150" r="3" fill="var(--primary-color)" />
        <circle cx="150" cy="250" r="3" fill="var(--primary-color)" />
        <circle cx="50" cy="150" r="3" fill="var(--primary-color)" /></>
      )},
    ]
  },
  pentagono: {
    title: 'Pentágono Regular',
    sides: 5,
    steps: [
      { text: 'Trazar la circunferencia con centro O y los diámetros perpendiculares. Marcar el punto medio M del radio OB (derecho).', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="50" y1="150" x2="250" y2="150" stroke="#666" strokeWidth="0.5" strokeDasharray="5,3" />
        <line x1="150" y1="50" x2="150" y2="250" stroke="#666" strokeWidth="0.5" strokeDasharray="5,3" />
        <circle cx="200" cy="150" r="3" fill="#f59e0b" /><text x="203" y="145" fill="#f59e0b" fontSize="8">M</text>
        <circle cx="150" cy="50" r="3" fill="#22c55e" /><text x="155" y="46" fill="#22c55e" fontSize="8">A</text></>
      )},
      { text: 'Con centro en M y radio MA, trazar un arco que corte al diámetro horizontal en el punto P.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="200" cy="150" r="3" fill="#f59e0b" />
        <circle cx="150" cy="50" r="3" fill="#22c55e" />
        {/* MA distance ~ 111.8, arc from M with that radius hitting horizontal axis */}
        <path d="M 90 150 A 112 112 0 0 1 150 50" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="0.5" strokeDasharray="3,2" />
        <circle cx="88" cy="150" r="3" fill="#ef4444" /><text x="78" y="148" fill="#ef4444" fontSize="8">P</text></>
      )},
      { text: 'La distancia AP es el lado del pentágono. Con compás abierto a esa medida, marcar 5 puntos consecutivos sobre la circunferencia y unirlos.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        {/* Pentagon vertices at angles -90, -90+72, -90+144, -90+216, -90+288 */}
        <polygon points="150,50 245,119 213.5,231 86.5,231 55,119" fill="rgba(124,58,237,0.1)" stroke="var(--primary-color)" strokeWidth="2" />
        {['A','B','C','D','E'].map((l, i) => {
          const a = -90 + i * 72;
          const x = 150 + 100 * Math.cos(a * Math.PI / 180);
          const y = 150 + 100 * Math.sin(a * Math.PI / 180);
          return <circle key={l} cx={x} cy={y} r="3" fill="var(--primary-color)" />;
        })}</>
      )},
    ]
  },
  hexagono: {
    title: 'Hexágono Regular',
    sides: 6,
    steps: [
      { text: 'Trazar la circunferencia de radio R con centro O. El lado del hexágono regular es igual al radio.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="150" y1="150" x2="250" y2="150" stroke="#a78bfa" strokeWidth="1" />
        <text x="200" y="143" fill="#a78bfa" fontSize="8" textAnchor="middle">R = lado</text>
        <circle cx="150" cy="150" r="2" fill="#888" /><text x="140" y="148" fill="#888" fontSize="8">O</text></>
      )},
      { text: 'Desde cualquier punto de la circunferencia, con apertura de compás igual a R, marcar puntos consecutivos sobre la circunferencia.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {[0,60,120,180,240,300].map((a, i) => {
          const x = 150 + 100 * Math.cos(a * Math.PI / 180);
          const y = 150 - 100 * Math.sin(a * Math.PI / 180);
          return <circle key={i} cx={x} cy={y} r="3" fill="#22c55e" />;
        })}
        {/* Arco de construcción */}
        <path d="M 237 93 A 100 100 0 0 1 250 150" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="0.5" strokeDasharray="3,2" /></>
      )},
      { text: 'Se obtienen 6 puntos equidistantes. Unirlos para formar el hexágono regular.', viz: (
        <><circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <polygon points="250,150 200,63.4 100,63.4 50,150 100,236.6 200,236.6" fill="rgba(124,58,237,0.1)" stroke="var(--primary-color)" strokeWidth="2" />
        {[0,60,120,180,240,300].map((a, i) => {
          const x = 150 + 100 * Math.cos(a * Math.PI / 180);
          const y = 150 - 100 * Math.sin(a * Math.PI / 180);
          return <circle key={i} cx={x} cy={y} r="3" fill="var(--primary-color)" />;
        })}</>
      )},
    ]
  },
};

const PoligonosPage = () => {
  const [selected, setSelected] = useState('triangulo');
  const [step, setStep] = useState(0);

  const poly = polygonData[selected];
  const maxStep = poly.steps.length - 1;

  const changePolygon = (key) => { setSelected(key); setStep(0); };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 2 — Semanas 7–14</div>
        <h1>Construcción de Polígonos</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          Método general y particular para construir polígonos regulares inscriptos en una circunferencia.
        </p>
      </div>

      {/* Teoría: Método general */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Método General de Polígonos Regulares</h2>
        <p>Un <strong>polígono regular</strong> tiene todos sus lados y ángulos iguales. Se inscribe en una circunferencia, y el ángulo central entre vértices consecutivos es <strong>360° / n</strong> (donde n = número de lados).</p>
        <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {[
            { n: 3, name: 'Triángulo', angle: '120°' },
            { n: 4, name: 'Cuadrado', angle: '90°' },
            { n: 5, name: 'Pentágono', angle: '72°' },
            { n: 6, name: 'Hexágono', angle: '60°' },
            { n: 8, name: 'Octógono', angle: '45°' },
          ].map(p => (
            <div key={p.n} style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid var(--glass-border)' }}>
              <svg viewBox="0 0 80 80" width={60} height={60}>
                <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <polygon
                  points={Array.from({ length: p.n }, (_, i) => {
                    const a = -90 + i * (360 / p.n);
                    return `${40 + 30 * Math.cos(a * Math.PI / 180)},${40 + 30 * Math.sin(a * Math.PI / 180)}`;
                  }).join(' ')}
                  fill="rgba(124,58,237,0.15)" stroke="var(--primary-color)" strokeWidth="1.5"
                />
              </svg>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>{p.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>{p.angle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorial paso a paso */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Tutorial Paso a Paso</h2>

        <div className="sim-selector">
          {Object.entries(polygonData).map(([key, val]) => (
            <button key={key} className={`sel-btn ${selected === key ? 'active' : ''}`} onClick={() => changePolygon(key)}>
              {val.title}
            </button>
          ))}
        </div>

        <div className="step-by-step-module" style={{ flexDirection: 'column' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: 800, minHeight: 400, background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16 }}>
              {poly.steps[step].viz}
            </svg>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.15rem' }}>
              Paso {step + 1} de {maxStep + 1}
            </p>
            <p style={{ color: 'var(--text-dim)', maxWidth: 600, margin: '0.5rem auto', fontSize: '1.05rem' }}>
              {poly.steps[step].text}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button className="sel-btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Anterior</button>
              <button className="sel-btn active" onClick={() => setStep(Math.min(maxStep, step + 1))} disabled={step === maxStep}>Siguiente →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Condiciones de construcción */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Condiciones de Construcción</h2>
        <p>Un polígono regular se puede construir de tres formas:</p>
        <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, textAlign: 'center', borderLeft: '3px solid var(--primary-color)' }}>
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>Dada la circunferencia</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Se conoce el radio R de la circunferencia circunscripta. Se inscriben los vértices sobre ella.</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, textAlign: 'center', borderLeft: '3px solid #f59e0b' }}>
            <h3 style={{ color: '#f59e0b', fontSize: '1rem' }}>Dado el lado</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Se conoce la longitud del lado L. Se calcula el radio R y luego se inscribe.</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, textAlign: 'center', borderLeft: '3px solid #22c55e' }}>
            <h3 style={{ color: '#22c55e', fontSize: '1rem' }}>Dada dist. entre caras</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Se conoce la apotema (distancia del centro a un lado). Útil para hexágonos en mecánica.</p>
          </div>
        </div>
      </div>

      {/* Ejercicios */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> Construir un triángulo equilátero inscripto en una circunferencia de R = 50 mm. Acotar.</li>
          <li><strong>Lámina 2:</strong> Construir un cuadrado inscripto en una circunferencia de R = 40 mm y otro dado el lado L = 60 mm.</li>
          <li><strong>Lámina 3:</strong> Construir un pentágono regular inscripto en una circunferencia de R = 45 mm. Rotular los vértices.</li>
          <li><strong>Lámina 4:</strong> Construir un hexágono regular dada la circunferencia (R = 40 mm) y otro dada la distancia entre caras (50 mm).</li>
          <li><strong>Lámina 5:</strong> En formato A3, construir un triángulo, un pentágono y un hexágono inscriptos en circunferencias de igual radio. Comparar lados.</li>
          <li><strong>Lámina 6:</strong> Construir un octógono regular inscripto en una circunferencia de R = 50 mm (usar bisectrices de ángulos del cuadrado).</li>
        </ul>
      </div>
    </div>
  );
};

export default PoligonosPage;

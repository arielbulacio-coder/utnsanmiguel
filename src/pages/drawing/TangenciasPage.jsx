import React, { useState } from 'react';
import './DrawingStyles.css';

const TangenciasPage = () => {
  const [demo, setDemo] = useState('recta-circ');

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 3 — Semanas 15–20</div>
        <h1>Circunferencia y Tangencias</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          Líneas de la circunferencia, tangentes, secantes y resolución de problemas de tangencias complejas.
        </p>
      </div>

      {/* Líneas de la circunferencia */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Líneas Asociadas a la Circunferencia</h2>
        <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { name: 'Secante', desc: 'Corta a la circunferencia en dos puntos.', svg: (
              <svg viewBox="0 0 120 120" width={100} height={100}>
                <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="10" y1="90" x2="110" y2="30" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="30" cy="75" r="2.5" fill="#ef4444" /><circle cx="90" cy="45" r="2.5" fill="#ef4444" />
              </svg>
            )},
            { name: 'Tangente', desc: 'Toca a la circunferencia en un solo punto (punto de tangencia).', svg: (
              <svg viewBox="0 0 120 120" width={100} height={100}>
                <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="10" y1="100" x2="110" y2="100" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="60" cy="100" r="2.5" fill="#22c55e" />
                <line x1="60" y1="60" x2="60" y2="100" stroke="#888" strokeWidth="0.5" strokeDasharray="3,2" />
                <text x="64" y="82" fill="#888" fontSize="7">R ⊥ T</text>
              </svg>
            )},
            { name: 'Concéntricas', desc: 'Circunferencias con el mismo centro y distinto radio.', svg: (
              <svg viewBox="0 0 120 120" width={100} height={100}>
                <circle cx="60" cy="60" r="45" fill="none" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="60" cy="60" r="30" fill="none" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="60" cy="60" r="15" fill="none" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="60" cy="60" r="2" fill="#a78bfa" />
              </svg>
            )},
          ].map(item => (
            <div key={item.name} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
              {item.svg}
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>{item.name}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="info-box" style={{ marginTop: '1rem' }}>
          <strong>Propiedad fundamental:</strong> La tangente es siempre <strong>perpendicular</strong> al radio en el punto de tangencia.
        </div>
      </div>

      {/* Casos de tangencia */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Casos de Tangencia — Tutorial</h2>

        <div className="sim-selector">
          {[
            { key: 'recta-circ', label: 'Recta tang. desde punto ext.' },
            { key: 'circ-2rectas', label: 'Circ. tang. a dos rectas' },
            { key: 'tang-ext', label: 'Tangentes exteriores' },
            { key: 'tang-int', label: 'Tangentes interiores' },
          ].map(t => (
            <button key={t.key} className={`sel-btn ${demo === t.key ? 'active' : ''}`} onClick={() => setDemo(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 300" style={{ width: '100%', maxWidth: 750, background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 10 }}>
            {demo === 'recta-circ' && (
              <>
                <text x="200" y="20" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">Recta tangente desde un punto exterior P</text>
                <circle cx="160" cy="160" r="70" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="160" cy="160" r="2" fill="#888" /><text x="165" y="157" fill="#888" fontSize="9">O</text>
                {/* Punto exterior */}
                <circle cx="320" cy="160" r="3" fill="#f59e0b" /><text x="328" y="163" fill="#f59e0b" fontSize="9">P</text>
                {/* Semicircunferencia sobre OP */}
                <circle cx="240" cy="160" r="80" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" strokeDasharray="3,2" />
                {/* Puntos de tangencia */}
                <circle cx="205" cy="96" r="3" fill="#22c55e" /><text x="210" y="92" fill="#22c55e" fontSize="8">T1</text>
                <circle cx="205" cy="224" r="3" fill="#22c55e" /><text x="210" y="234" fill="#22c55e" fontSize="8">T2</text>
                {/* Tangentes */}
                <line x1="320" y1="160" x2="205" y2="96" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="320" y1="160" x2="205" y2="224" stroke="#22c55e" strokeWidth="1.5" />
                {/* Radio a T perpendicular */}
                <line x1="160" y1="160" x2="205" y2="96" stroke="#888" strokeWidth="0.5" strokeDasharray="3,2" />
                {/* Steps */}
                <text x="20" y="270" fill="#888" fontSize="7">1. Hallar punto medio M de OP</text>
                <text x="20" y="282" fill="#888" fontSize="7">2. Trazar semicircunferencia con centro M y radio MO</text>
                <text x="20" y="294" fill="#888" fontSize="7">3. T1 y T2 = intersecciones → unir P con T1 y T2</text>
              </>
            )}
            {demo === 'circ-2rectas' && (
              <>
                <text x="200" y="20" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">Circunferencia tangente a dos rectas (radio R dado)</text>
                <line x1="50" y1="250" x2="350" y2="250" stroke="#888" strokeWidth="1.5" />
                <line x1="50" y1="250" x2="300" y2="50" stroke="#888" strokeWidth="1.5" />
                <text x="350" y="265" fill="#888" fontSize="9">r₁</text>
                <text x="305" y="50" fill="#888" fontSize="9">r₂</text>
                {/* Bisectriz */}
                <line x1="50" y1="250" x2="330" y2="120" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5,3" />
                <text x="300" y="112" fill="#f59e0b" fontSize="8">bisectriz</text>
                {/* Paralelas a distancia R */}
                <line x1="50" y1="210" x2="350" y2="210" stroke="rgba(124,58,237,0.4)" strokeWidth="0.5" strokeDasharray="3,2" />
                {/* Centro */}
                <circle cx="190" cy="210" r="3" fill="#22c55e" /><text x="196" y="207" fill="#22c55e" fontSize="8">C</text>
                <circle cx="190" cy="210" r="40" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                {/* tangent points */}
                <circle cx="190" cy="250" r="2.5" fill="var(--primary-color)" />
                <text x="20" y="280" fill="#888" fontSize="7">1. Trazar paralelas a las rectas a distancia R</text>
                <text x="20" y="292" fill="#888" fontSize="7">2. C = intersección de las paralelas con la bisectriz</text>
              </>
            )}
            {demo === 'tang-ext' && (
              <>
                <text x="200" y="20" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">Tangentes exteriores a dos circunferencias</text>
                <circle cx="120" cy="160" r="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="300" cy="160" r="35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="120" cy="160" r="2" fill="#888" /><text x="112" y="157" fill="#888" fontSize="8">O₁</text>
                <circle cx="300" cy="160" r="2" fill="#888" /><text x="305" y="157" fill="#888" fontSize="8">O₂</text>
                {/* Tangent lines (approximate) */}
                <line x1="68" y1="108" x2="275" y2="128" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="68" y1="212" x2="275" y2="192" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="68" cy="108" r="2.5" fill="#22c55e" />
                <circle cx="275" cy="128" r="2.5" fill="#22c55e" />
                <circle cx="68" cy="212" r="2.5" fill="#22c55e" />
                <circle cx="275" cy="192" r="2.5" fill="#22c55e" />
                <text x="20" y="270" fill="#888" fontSize="7">1. Trazar circ. auxiliar con centro O₁ y radio R₁−R₂</text>
                <text x="20" y="282" fill="#888" fontSize="7">2. Desde O₂ trazar tangente a la circ. auxiliar</text>
                <text x="20" y="294" fill="#888" fontSize="7">3. Trasladar paralelamente a distancia R₂</text>
              </>
            )}
            {demo === 'tang-int' && (
              <>
                <text x="200" y="20" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">Tangentes interiores a dos circunferencias</text>
                <circle cx="120" cy="160" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="300" cy="160" r="35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="120" cy="160" r="2" fill="#888" />
                <circle cx="300" cy="160" r="2" fill="#888" />
                {/* Tangent lines crossing between circles */}
                <line x1="95" y1="115" x2="320" y2="190" stroke="#ef4444" strokeWidth="1.5" />
                <line x1="95" y1="205" x2="320" y2="130" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="95" cy="115" r="2.5" fill="#ef4444" />
                <circle cx="320" cy="190" r="2.5" fill="#ef4444" />
                <circle cx="95" cy="205" r="2.5" fill="#ef4444" />
                <circle cx="320" cy="130" r="2.5" fill="#ef4444" />
                <text x="20" y="270" fill="#888" fontSize="7">1. Trazar circ. auxiliar con centro O₁ y radio R₁+R₂</text>
                <text x="20" y="282" fill="#888" fontSize="7">2. Desde O₂ trazar tangente a la circ. auxiliar</text>
                <text x="20" y="294" fill="#888" fontSize="7">3. Las tangentes se cruzan entre las circunferencias</text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Arcos de enlace */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Arcos de Enlace</h2>
        <p>Un <strong>arco de enlace</strong> conecta suavemente dos elementos (rectas o curvas) manteniendo la tangencia. Es fundamental en el diseño de piezas mecánicas.</p>
        <svg viewBox="0 0 300 150" style={{ width: '100%', maxWidth: 650, display: 'block', margin: '1rem auto' }}>
          {/* Two perpendicular lines connected by arc */}
          <line x1="20" y1="120" x2="140" y2="120" stroke="var(--primary-color)" strokeWidth="2" />
          <line x1="200" y1="120" x2="200" y2="20" stroke="var(--primary-color)" strokeWidth="2" />
          <path d="M140 120 A 60 60 0 0 0 200 60" fill="none" stroke="#22c55e" strokeWidth="2" />
          <circle cx="200" cy="120" r="2" fill="#f59e0b" /><text x="205" y="128" fill="#f59e0b" fontSize="7">Centro arco</text>
          <circle cx="140" cy="120" r="2.5" fill="#22c55e" /><text x="130" y="135" fill="#22c55e" fontSize="7">T₁</text>
          <circle cx="200" cy="60" r="2.5" fill="#22c55e" /><text x="207" y="58" fill="#22c55e" fontSize="7">T₂</text>
          <text x="160" y="80" fill="#888" fontSize="7">R</text>
        </svg>
        <div className="info-box">
          <strong>Regla:</strong> El centro del arco de enlace está a distancia R de ambos elementos. Los puntos de tangencia se obtienen bajando perpendiculares desde el centro a cada elemento.
        </div>
      </div>

      {/* Ejercicios */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> Dada una circunferencia de R = 40 mm y un punto P exterior a 90 mm del centro, trazar las dos rectas tangentes desde P.</li>
          <li><strong>Lámina 2:</strong> Dos rectas que forman un ángulo de 60°. Trazar una circunferencia de R = 25 mm tangente a ambas.</li>
          <li><strong>Lámina 3:</strong> Dos circunferencias de R₁ = 40 mm y R₂ = 25 mm, con centros separados 120 mm. Trazar las tangentes exteriores.</li>
          <li><strong>Lámina 4:</strong> Con las mismas circunferencias, trazar las tangentes interiores.</li>
          <li><strong>Lámina 5:</strong> Enlazar dos rectas perpendiculares con un arco de R = 30 mm. Marcar los puntos de tangencia.</li>
          <li><strong>Lámina 6:</strong> Diseñar el perfil de una pieza mecánica simple que incluya al menos 3 arcos de enlace de diferentes radios.</li>
        </ul>
      </div>
    </div>
  );
};

export default TangenciasPage;

import React, { useState } from 'react';
import './DrawingStyles.css';

const NormalizacionDibujoPage = () => {
  const [escala, setEscala] = useState('1:1');
  const [acotSample, setAcotSample] = useState('lineal');

  const formatos = [
    { nombre: 'A0', ancho: 841, alto: 1189, sup: '1 m²' },
    { nombre: 'A1', ancho: 594, alto: 841, sup: '0.5 m²' },
    { nombre: 'A2', ancho: 420, alto: 594, sup: '0.25 m²' },
    { nombre: 'A3', ancho: 297, alto: 420, sup: '0.125 m²' },
    { nombre: 'A4', ancho: 210, alto: 297, sup: '0.0625 m²' },
  ];

  const lineas = [
    { tipo: 'Continua gruesa', uso: 'Contornos visibles, aristas visibles', grosor: '0.5–0.7 mm', svg: <line x1="0" y1="10" x2="120" y2="10" stroke="var(--primary-color)" strokeWidth="3" /> },
    { tipo: 'Continua fina', uso: 'Líneas de cota, auxiliares, rayado', grosor: '0.25–0.35 mm', svg: <line x1="0" y1="10" x2="120" y2="10" stroke="var(--primary-color)" strokeWidth="1" /> },
    { tipo: 'Trazos (oculta)', uso: 'Aristas y contornos ocultos', grosor: '0.35 mm', svg: <line x1="0" y1="10" x2="120" y2="10" stroke="var(--primary-color)" strokeWidth="2" strokeDasharray="8,4" /> },
    { tipo: 'Trazo y punto', uso: 'Ejes de simetría, centros', grosor: '0.25 mm', svg: <line x1="0" y1="10" x2="120" y2="10" stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="15,4,3,4" /> },
    { tipo: 'Trazo y dos puntos', uso: 'Posiciones extremas, contornos de piezas adyacentes', grosor: '0.25 mm', svg: <line x1="0" y1="10" x2="120" y2="10" stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="15,3,2,3,2,3" /> },
    { tipo: 'Ondulada (a mano)', uso: 'Líneas de rotura corta', grosor: '0.35 mm', svg: <path d="M0 10 Q10 2 20 10 Q30 18 40 10 Q50 2 60 10 Q70 18 80 10 Q90 2 100 10 Q110 18 120 10" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" /> },
  ];

  const escalas = {
    'reduccion': { label: 'Reducción', examples: ['1:2', '1:5', '1:10', '1:20', '1:50', '1:100'], desc: 'El dibujo es MENOR que el objeto real.' },
    'natural': { label: 'Natural', examples: ['1:1'], desc: 'El dibujo es IGUAL al tamaño del objeto real.' },
    'ampliacion': { label: 'Ampliación', examples: ['2:1', '5:1', '10:1'], desc: 'El dibujo es MAYOR que el objeto real.' },
  };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <div className="level-badge" style={{ background: '#7c3aed' }}>Unidad 1 — Semanas 1–6</div>
        <h1>Normalización</h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto' }}>
          El lenguaje universal del Dibujo Técnico. Normas IRAM: formatos, líneas, rótulos, acotación, escalas y plegado.
        </p>
      </div>

      {/* FORMATOS Serie A */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Formatos — Serie A (IRAM 4504)</h2>
        <p>Todos los formatos de la serie A derivan del <strong>A0</strong> (1 m²), dividiendo el lado mayor por la mitad. La relación entre lados es siempre <strong>1 : √2</strong>.</p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0' }}>
          {/* Visual de formatos anidados */}
          <svg viewBox="0 0 320 230" style={{ width: '100%', maxWidth: 320 }}>
            <rect x="10" y="10" width="300" height="210" fill="none" stroke="#555" strokeWidth="1" />
            <text x="160" y="120" textAnchor="middle" fill="#555" fontSize="12">A0</text>
            <rect x="10" y="10" width="150" height="210" fill="none" stroke="#666" strokeWidth="1" />
            <text x="85" y="120" textAnchor="middle" fill="#666" fontSize="11">A1</text>
            <rect x="10" y="10" width="150" height="105" fill="none" stroke="#888" strokeWidth="1" />
            <text x="85" y="65" textAnchor="middle" fill="#888" fontSize="10">A2</text>
            <rect x="10" y="10" width="75" height="105" fill="none" stroke="#aaa" strokeWidth="1" />
            <text x="47" y="65" textAnchor="middle" fill="#aaa" fontSize="9">A3</text>
            <rect x="10" y="10" width="75" height="52" fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="47" y="40" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="700">A4</text>
          </svg>

          <table className="iram-table" style={{ maxWidth: 400 }}>
            <thead><tr><th>Formato</th><th>Ancho (mm)</th><th>Alto (mm)</th><th>Superficie</th></tr></thead>
            <tbody>
              {formatos.map(f => (
                <tr key={f.nombre}>
                  <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{f.nombre}</td>
                  <td>{f.ancho}</td><td>{f.alto}</td><td>{f.sup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-box">
          <strong>Regla:</strong> Cada formato se obtiene doblando el anterior por la mitad en su lado mayor. A4 × 2 = A3 × 2 = A2 × 2 = A1 × 2 = A0.
        </div>
      </div>

      {/* RECUADRO Y RÓTULO */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Recuadro y Rótulo</h2>
        <p>Todo plano técnico lleva un <strong>recuadro</strong> (margen) y un <strong>rótulo</strong> (cajetín) en la esquina inferior derecha.</p>

        <svg viewBox="0 0 420 300" style={{ width: '100%', maxWidth: 500, display: 'block', margin: '1rem auto' }}>
          {/* Hoja */}
          <rect x="5" y="5" width="410" height="290" fill="rgba(255,255,255,0.03)" stroke="#555" strokeWidth="1" />
          {/* Margen */}
          <rect x="25" y="15" width="385" height="275" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
          {/* Margen izq mayor para archivado */}
          <line x1="25" y1="15" x2="25" y2="290" stroke="#f59e0b" strokeWidth="2" />
          <text x="16" y="155" fill="#f59e0b" fontSize="7" transform="rotate(-90,16,155)" textAnchor="middle">Archivado (20mm)</text>
          {/* Rótulo */}
          <rect x="260" y="240" width="150" height="50" fill="rgba(124,58,237,0.1)" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="260" y1="255" x2="410" y2="255" stroke="#7c3aed" strokeWidth="0.5" />
          <line x1="260" y1="270" x2="410" y2="270" stroke="#7c3aed" strokeWidth="0.5" />
          <line x1="340" y1="240" x2="340" y2="290" stroke="#7c3aed" strokeWidth="0.5" />
          <text x="300" y="250" textAnchor="middle" fill="#888" fontSize="6">Nombre</text>
          <text x="375" y="250" textAnchor="middle" fill="#888" fontSize="6">Fecha</text>
          <text x="335" y="265" textAnchor="middle" fill="#a78bfa" fontSize="7" fontWeight="700">TÍTULO DEL PLANO</text>
          <text x="300" y="282" textAnchor="middle" fill="#888" fontSize="6">Escala</text>
          <text x="375" y="282" textAnchor="middle" fill="#888" fontSize="6">N° de Lámina</text>
          {/* Labels */}
          <text x="215" y="152" textAnchor="middle" fill="#555" fontSize="14">Zona de dibujo</text>
          <text x="335" y="235" fill="#a78bfa" fontSize="7" textAnchor="middle">RÓTULO (Cajetín)</text>
          {/* Cotas del margen */}
          <text x="50" y="10" fill="#888" fontSize="6">10 mm</text>
        </svg>

        <div className="info-box">
          <strong>Márgenes IRAM:</strong> Izquierdo (archivado): 20 mm. Superior, derecho e inferior: 10 mm. El rótulo se ubica siempre en el ángulo inferior derecho.
        </div>
      </div>

      {/* LÍNEAS NORMALIZADAS */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Líneas Normalizadas (IRAM 4502)</h2>
        <p>Cada tipo de línea tiene un significado específico en el dibujo técnico.</p>

        <div style={{ overflowX: 'auto' }}>
          <table className="iram-table">
            <thead><tr><th>Tipo</th><th>Aspecto</th><th>Uso</th><th>Grosor</th></tr></thead>
            <tbody>
              {lineas.map((l, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{l.tipo}</td>
                  <td><svg viewBox="0 0 120 20" width={120} height={20}>{l.svg}</svg></td>
                  <td style={{ fontSize: '0.85rem' }}>{l.uso}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{l.grosor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-box">
          <strong>Regla de grosores:</strong> Se usa una relación <strong>2:1</strong> entre líneas gruesas y finas. Si la gruesa es 0.5 mm, la fina será 0.25 mm.
        </div>
      </div>

      {/* ACOTACIÓN */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Acotación (IRAM 4513)</h2>
        <p>La acotación indica las <strong>dimensiones reales</strong> del objeto, independientemente de la escala del dibujo. Elementos: línea de cota, líneas auxiliares, flechas y cifra de cota.</p>

        <div className="sim-selector">
          {['lineal', 'angular', 'radio', 'diametro'].map(t => (
            <button key={t} className={`sel-btn ${acotSample === t ? 'active' : ''}`} onClick={() => setAcotSample(t)}>
              {t === 'lineal' ? 'Lineal' : t === 'angular' ? 'Angular' : t === 'radio' ? 'Radio' : 'Diámetro'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: 350 }}>
            {acotSample === 'lineal' && (
              <>
                <rect x="50" y="80" width="200" height="60" fill="rgba(124,58,237,0.08)" stroke="var(--primary-color)" strokeWidth="2" />
                {/* Líneas auxiliares */}
                <line x1="50" y1="80" x2="50" y2="40" stroke="#888" strokeWidth="0.5" />
                <line x1="250" y1="80" x2="250" y2="40" stroke="#888" strokeWidth="0.5" />
                {/* Línea de cota */}
                <line x1="50" y1="50" x2="250" y2="50" stroke="var(--primary-color)" strokeWidth="1" />
                {/* Flechas */}
                <polygon points="50,50 58,47 58,53" fill="var(--primary-color)" />
                <polygon points="250,50 242,47 242,53" fill="var(--primary-color)" />
                {/* Cifra */}
                <text x="150" y="46" textAnchor="middle" fill="var(--primary-color)" fontSize="12" fontWeight="700">200</text>
                {/* Labels */}
                <text x="30" y="50" fill="#888" fontSize="7" textAnchor="end">Línea de cota</text>
                <text x="55" y="38" fill="#888" fontSize="7">Línea auxiliar</text>
                <text x="150" y="170" textAnchor="middle" fill="#aaa" fontSize="9">Acotación lineal</text>
              </>
            )}
            {acotSample === 'angular' && (
              <>
                <line x1="50" y1="150" x2="250" y2="150" stroke="var(--primary-color)" strokeWidth="2" />
                <line x1="50" y1="150" x2="200" y2="30" stroke="var(--primary-color)" strokeWidth="2" />
                <path d="M100 150 A 60 60 0 0 1 142 68" fill="none" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="142,68 137,77 145,76" fill="#a78bfa" />
                <text x="130" y="115" fill="#a78bfa" fontSize="12" fontWeight="700">45°</text>
                <text x="150" y="185" textAnchor="middle" fill="#aaa" fontSize="9">Acotación angular</text>
              </>
            )}
            {acotSample === 'radio' && (
              <>
                <circle cx="150" cy="100" r="60" fill="rgba(124,58,237,0.08)" stroke="var(--primary-color)" strokeWidth="2" />
                <line x1="150" y1="100" x2="210" y2="100" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="210,100 202,97 202,103" fill="#a78bfa" />
                <text x="175" y="95" fill="#a78bfa" fontSize="12" fontWeight="700">R60</text>
                <circle cx="150" cy="100" r="2" fill="#a78bfa" />
                <text x="150" y="185" textAnchor="middle" fill="#aaa" fontSize="9">Acotación de radio</text>
              </>
            )}
            {acotSample === 'diametro' && (
              <>
                <circle cx="150" cy="100" r="60" fill="rgba(124,58,237,0.08)" stroke="var(--primary-color)" strokeWidth="2" />
                <line x1="90" y1="100" x2="210" y2="100" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="90,100 98,97 98,103" fill="#a78bfa" />
                <polygon points="210,100 202,97 202,103" fill="#a78bfa" />
                <text x="150" y="95" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">⌀120</text>
                <text x="150" y="185" textAnchor="middle" fill="#aaa" fontSize="9">Acotación de diámetro</text>
              </>
            )}
          </svg>
        </div>

        <h3>Reglas de acotación</h3>
        <ul className="exercise-list">
          <li>La cifra de cota se coloca <strong>sobre</strong> la línea de cota (o a su izquierda si es vertical).</li>
          <li>Las líneas de cota no deben cruzarse entre sí.</li>
          <li>No se repiten cotas. Cada dimensión se indica una sola vez.</li>
          <li>Las cotas se expresan en <strong>milímetros</strong> (sin escribir la unidad).</li>
          <li>Las flechas tocan las líneas auxiliares de cota.</li>
        </ul>
      </div>

      {/* ESCALAS */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Escalas (IRAM 4505)</h2>
        <p>La escala es la relación entre la medida en el dibujo y la medida real del objeto.</p>

        <div className="drawing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {Object.entries(escalas).map(([key, val]) => (
            <div key={key} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>{val.label}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{val.desc}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                {val.examples.map(e => (
                  <span key={e} style={{ padding: '2px 8px', background: 'rgba(124,58,237,0.15)', borderRadius: 12, fontSize: '0.8rem', color: '#a78bfa' }}>{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="info-box" style={{ marginTop: '1rem' }}>
          <strong>Ejemplo:</strong> Un objeto de 500 mm dibujado a escala 1:5 → se dibuja a 500 ÷ 5 = <strong>100 mm</strong> en el papel.<br />
          Un tornillo de 10 mm dibujado a escala 5:1 → se dibuja a 10 × 5 = <strong>50 mm</strong> en el papel.
        </div>
      </div>

      {/* PLEGADO */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Plegado de Planos</h2>
        <p>Los planos se pliegan al tamaño <strong>A4</strong> (210 × 297 mm) para su archivo. El rótulo debe quedar siempre visible en la cara frontal.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <svg viewBox="0 0 200 140" style={{ width: 200 }}>
            <rect x="5" y="5" width="190" height="130" fill="rgba(124,58,237,0.05)" stroke="#a78bfa" strokeWidth="1" />
            <line x1="100" y1="5" x2="100" y2="135" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="4,2" />
            <text x="52" y="75" textAnchor="middle" fill="#888" fontSize="8">Doblez 1</text>
            <text x="150" y="75" textAnchor="middle" fill="#888" fontSize="8">Doblez 2</text>
            <line x1="5" y1="70" x2="195" y2="70" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="4,2" />
            <rect x="145" y="105" width="45" height="25" fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="1" rx="2" />
            <text x="168" y="120" textAnchor="middle" fill="#a78bfa" fontSize="6">Rótulo</text>
          </svg>
        </div>
        <div className="info-box">
          <strong>Importante:</strong> Primero se pliega en forma de acordeón (zigzag horizontal) y luego se dobla a la mitad verticalmente. El rótulo siempre queda a la vista.
        </div>
      </div>

      {/* CALIGRAFÍA */}
      <div className="drawing-card full-width">
        <h2 style={{ color: 'var(--primary-color)' }}>Caligrafía Normalizada</h2>
        <p>Las letras y números en un plano técnico deben seguir la norma IRAM 4503. Se usa trazo vertical o inclinado a 75°.</p>
        <svg viewBox="0 0 500 80" style={{ width: '100%', maxWidth: 500, display: 'block', margin: '1rem auto' }}>
          <text x="10" y="35" fill="var(--primary-color)" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="400" letterSpacing="4">
            ABCDEFGHIJ
          </text>
          <text x="10" y="65" fill="#a78bfa" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="400" letterSpacing="3">
            0123456789
          </text>
        </svg>
        <ul className="exercise-list">
          <li>Altura de mayúsculas: h (ej: 3.5 mm, 5 mm, 7 mm)</li>
          <li>Altura de minúsculas: 0.7 × h</li>
          <li>Grosor del trazo: h/10</li>
          <li>Separación entre letras: 0.2 × h</li>
          <li>Separación entre palabras: 0.6 × h</li>
        </ul>
      </div>

      {/* EJERCICIOS */}
      <div className="drawing-card full-width" style={{ borderLeft: '5px solid #f59e0b' }}>
        <h2 style={{ color: '#f59e0b' }}>Ejercicios Propuestos — Láminas</h2>
        <ul className="exercise-list">
          <li><strong>Lámina 1:</strong> En formato A3, trazar el recuadro normalizado con márgenes IRAM. Diseñar el rótulo completo con caligrafía normalizada.</li>
          <li><strong>Lámina 2:</strong> Dibujar las 6 tipos de líneas normalizadas con sus grosores correctos. Rotular cada una con su nombre y uso.</li>
          <li><strong>Lámina 3:</strong> Dado un rectángulo de 80×40 mm, acotarlo completamente. Luego acotar un círculo de ⌀60 con un agujero concéntrico de ⌀20.</li>
          <li><strong>Lámina 4:</strong> Dibujar una pieza rectangular de 120×80 mm con dos agujeros de ⌀15. Acotación completa. Escala 1:1.</li>
          <li><strong>Lámina 5:</strong> Reproducir la misma pieza a escala 2:1 y a escala 1:2. Comparar las acotaciones (deben ser iguales en ambos casos).</li>
          <li><strong>Lámina 6:</strong> Realizar el plegado normalizado de un plano A3 a tamaño A4.</li>
        </ul>
      </div>
    </div>
  );
};

export default NormalizacionDibujoPage;

import React, { useState } from 'react';
import './DrawingStyles.css';

const ScaleCalculator = () => {
    const [real, setReal] = useState(1000);
    const [scale, setScale] = useState(50);
    const result = (real / scale).toFixed(2);

    return (
        <div className="tool-box">
            <h4>📐 Calculadora de Escalas IRAM 4505</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                    <label style={{ fontSize: '0.8rem', opacity: 0.8 }}>Medida Real (mm)</label>
                    <input 
                        type="number" 
                        value={real} 
                        onChange={(e) => setReal(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: '#fff' }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', opacity: 0.8 }}>Escala 1:X</label>
                    <input 
                        type="number" 
                        value={scale} 
                        onChange={(e) => setScale(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: '#fff' }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.9rem' }}>Medida en el Papel:</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{result} mm</div>
            </div>
        </div>
    );
};

const IramQuiz = () => {
    const [qIdx, setQIdx] = useState(0);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);

    const questions = [
        { q: "¿Cuál es el margen izquierdo obligatorio (para perforación) en una hoja A4?", a: "25 mm", o: ["10 mm", "25 mm", "20 mm"] },
        { q: "En IRAM 4502, ¿cuál es el espesor usual de una línea Tipo A (visible)?", a: "0.8 mm", o: ["0.2 mm", "0.5 mm", "0.8 mm"] },
        { q: "¿Qué norma regula la caligrafía técnica (letras y números)?", a: "IRAM 4503", o: ["IRAM 4503", "IRAM 4505", "IRAM 4513"] }
    ];

    const handleAns = (ans) => {
        setSelected(ans);
        if (ans === questions[qIdx].a) setScore(s => s + 1);
    };

    if (finished) return (
        <div style={{ textAlign: 'center' }}>
            <p>Resultado: {score}/{questions.length}</p>
            <button className="sel-btn mini" onClick={() => { setQIdx(0); setFinished(false); setScore(0); setSelected(null); }}>Reiniciar</button>
        </div>
    );

    return (
        <div className="quiz-mini-box">
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{questions[qIdx].q}</p>
            <div style={{ display: 'grid', gap: '8px' }}>
                {questions[qIdx].o.map(o => (
                    <button 
                        key={o} 
                        className={`opt-btn mini ${selected ? (o === questions[qIdx].a ? 'correct' : (selected === o ? 'wrong' : '')) : ''}`}
                        onClick={() => !selected && handleAns(o)}
                        style={{ padding: '8px', fontSize: '0.8rem', borderRadius: '6px' }}
                    >
                        {o}
                    </button>
                ))}
            </div>
            {selected && (
                <button className="sel-btn mini" style={{ marginTop: '1rem', width: '100%' }} onClick={() => {
                    if (qIdx < questions.length - 1) { setQIdx(qIdx + 1); setSelected(null); }
                    else setFinished(true);
                }}>Siguiente</button>
            )}
        </div>
    );
};

const NormasIRAMPage = () => {
    const [format, setFormat] = useState('A4');

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <span className="level-badge">Standard IRAM</span>
                <h1>Normas IRAM - Dibujo Técnico</h1>
                <p>El lenguaje universal de la industria argentina.</p>
            </header>

            <div className="drawing-grid">
                {/* EXPLORADOR DE FORMATOS */}
                <section className="drawing-card full-width" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
                    <div>
                        <h2>IRAM 4504: Formatos y Plegado</h2>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>El soporte es el primer paso de la precisión.</p>
                        
                        <div style={{ display: 'flex', gap: '10px', margin: '1.5rem 0' }}>
                            {['A4', 'A3', 'A2'].map(f => (
                                <button key={f} className={`sel-btn ${format === f ? 'active' : ''}`} onClick={() => setFormat(f)}>Hoja {f}</button>
                            ))}
                        </div>

                        <div className="info-box">
                            <strong>Especificaciones {format}:</strong>
                            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                <li>Dimensiones: {format === 'A4' ? '210 x 297' : format === 'A3' ? '420 x 297' : '594 x 420'} mm</li>
                                <li>Margen Perforación: 25 mm</li>
                                <li>Otros Márgenes: 10 mm</li>
                                <li>Ancho Rótulo: 175 mm</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
                        <div style={{ 
                            width: format === 'A4' ? '140px' : format === 'A3' ? '200px' : '260px', 
                            height: format === 'A4' ? '200px' : format === 'A3' ? '140px' : '180px',
                            border: '1px solid #fff',
                            background: '#fff',
                            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                            position: 'relative',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                             <div style={{ position: 'absolute', left: '12%', top: '5%', right: '5%', bottom: '5%', border: '0.5px solid #ccc' }}></div>
                             <div style={{ position: 'absolute', right: '5%', bottom: '5%', width: '40%', height: '15%', border: '1px solid #00f2ff', background: 'rgba(0, 242, 255, 0.1)' }}></div>
                        </div>
                        <span style={{ position: 'absolute', bottom: '10px', fontSize: '0.7rem', opacity: 0.5 }}>Visualización del Recuadro y Rótulo</span>
                    </div>
                </section>

                {/* LINEAS Y ESCALAS */}
                <section className="drawing-card">
                    <h2>IRAM 4502: Alfabeto de Líneas</h2>
                    <table className="iram-table">
                        <tbody>
                            <tr><td><strong>Tipo A</strong></td><td>Visible gruesa</td><td>0.8 mm</td></tr>
                            <tr><td><strong>Tipo B</strong></td><td>Fina (Cotas)</td><td>0.2 mm</td></tr>
                            <tr><td><strong>Tipo E</strong></td><td>Ocultas</td><td>0.4 mm</td></tr>
                            <tr><td><strong>Tipo F</strong></td><td>Ejes / Simetría</td><td>0.2 mm</td></tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: '1.5rem' }}>
                        <IramQuiz />
                    </div>
                </section>

                <section className="drawing-card">
                    <ScaleCalculator />
                    <div className="info-box" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                        <strong>Escalas Normalizadas:</strong>
                        <p>Reducción: 1:2.5, 1:5, 1:10, 1:20, 1:50, 1:100.</p>
                        <p>Ampliación: 2:1, 5:1, 10:1.</p>
                    </div>
                </section>

                {/* VISUALIZACIÓN IA */}
                <section className="drawing-card full-width">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
                        <div>
                            <h3>La Lámina Profesional</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Observa cómo se integra el rótulo con los márgenes normalizados. El dibujo debe respetar siempre el balance de blancos.</p>
                        </div>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                            <img src={`${import.meta.env.BASE_URL || '/'}img/drawing/hoja_iram.png`.replace('//', '/')} alt="Hoja IRAM" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .tool-box { padding: 5px; }
                .quiz-mini-box { padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 12px; }
                .opt-btn.mini { padding: 8px; border: 1px solid var(--glass-border); background: transparent; color: #fff; cursor: pointer; text-align: left; }
                .opt-btn.mini:hover { border-color: var(--primary-color); }
                .opt-btn.mini.correct { border-color: #22c55e; color: #22c55e; background: rgba(34,197,94,0.1); }
                .opt-btn.mini.wrong { border-color: #ef4444; color: #ef4444; background: rgba(239,68,68,0.1); }
            `}</style>
        </div>
    );
};

export default NormasIRAMPage;

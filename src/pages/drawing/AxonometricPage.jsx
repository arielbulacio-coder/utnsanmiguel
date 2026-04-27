import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Edges, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import './DrawingStyles.css';

/* ───────────────────────────────────────────────────────────────────────────
   PIEZA DE DEMOSTRACIÓN AXONOMÉTRICA
   ─────────────────────────────────────────────────────────────────────────── */

const AxoPiece = ({ type }) => {
    return (
        <group scale={[1.5, 1.5, 1.5]}>
            {/* Cuerpo Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 1, 1]} />
                <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
                <Edges color="#fff" />
            </mesh>
            {/* Saliente Superior */}
            <mesh position={[-0.5, 0.75, 0]}>
                <boxGeometry args={[1, 0.5, 1]} />
                <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
                <Edges color="#fff" />
            </mesh>
            {/* Detalle Lateral */}
            <mesh position={[0.75, 0.25, 0.25]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#00f2ff" />
                <Edges color="#fff" />
            </mesh>
        </group>
    );
};

const AxoScene = ({ system }) => {
    // Configuración de cámara según el sistema
    // Isométrica: Ángulos iguales, coeficientes iguales
    // Caballera: Cara frontal real, eje fuga a 45° con Reducción (k=0.5)
    
    return (
        <>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-5, 5, 5]} intensity={1} />
            
            <AxoPiece type={system} />
            
            {system === 'ISOMETRICA' && (
                <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={80} />
            )}
            {system === 'CABALLERA' && (
                <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={80} />
            )}
            
            {/* En Caballera real (oblicua), necesitamos un shear. 
                Para este simulador educativo, usaremos PerspectiveCamera con ángulos controlados 
                para aproximar visualmente el concepto de "fuga" en educación técnica. */}
            {system === 'PERSPECTIVA' && (
                <PerspectiveCamera makeDefault position={[6, 4, 8]} fov={40} />
            )}

            <OrbitControls enableRotate={system === 'PERSPECTIVA'} enableZoom={true} />
            
            <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -0.5, 0]} />
        </>
    );
};

const AxoQuiz = () => {
    const [qIdx, setQIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState(null);

    const questions = [
        { 
            q: "¿A cuántos grados se dibujan los ejes X e Y en la perspectiva Isométrica?", 
            a: "30°", 
            o: ["30°", "45°", "60°"], 
            feedback: "En Isometría, ambos ejes laterales forman 30° con la horizontal para mantener proporciones iguales." 
        },
        { 
            q: "En Perspectiva Caballera, ¿qué coeficiente de reducción se aplica usualmente al eje de profundidad?", 
            a: "0.5 (K=1/2)", 
            o: ["1.0", "0.5 (K=1/2)", "0.8"], 
            feedback: "Se usa 0.5 para compensar la distorsión visual del ángulo a 45°." 
        },
        { 
            q: "¿Cuál de estas axonometrías permite ver la cara frontal sin deformación?", 
            a: "Perspectiva Caballera", 
            o: ["Isométrica", "Dimétrica", "Perspectiva Caballera"], 
            feedback: "La Caballera mantiene la cara frontal paralela al plano de dibujo." 
        }
    ];

    const handleAnswer = (ans) => {
        setSelected(ans);
        if (ans === questions[qIdx].a) setScore(s => s + 1);
    };

    if (finished) return (
        <div className="quiz-result card-inner" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>Resultados: Axonometría</h3>
            <div className="score-circle" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '1rem auto' }}>
                {Math.round((score/questions.length)*100)}%
            </div>
            <button className="sel-btn" onClick={() => { setQIdx(0); setScore(0); setFinished(false); setSelected(null); }}>Reintentar</button>
        </div>
    );

    return (
        <div className="quiz-container card-inner">
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Test de Conocimientos</h4>
            <p className="q-text">{questions[qIdx].q}</p>
            <div style={{ display: 'grid', gap: '10px', marginTop: '1rem' }}>
                {questions[qIdx].o.map(opt => (
                    <button 
                        key={opt}
                        className={`opt-btn ${selected ? (opt === questions[qIdx].a ? 'correct' : (selected === opt ? 'wrong' : '')) : ''}`}
                        onClick={() => !selected && handleAnswer(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            {selected && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                    <p style={{ fontSize: '0.85rem' }}>{questions[qIdx].feedback}</p>
                    <button className="sel-btn mini" style={{ marginTop: '0.5rem' }} onClick={() => {
                        if (qIdx < questions.length - 1) { setQIdx(qIdx + 1); setSelected(null); }
                        else setFinished(true);
                    }}>
                        {qIdx === questions.length - 1 ? 'Finalizar' : 'Siguiente →'}
                    </button>
                </div>
            )}
        </div>
    );
};

const AxonometricPage = () => {
    const [system, setSystem] = useState('ISOMETRICA');

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <span className="level-badge">Dibujo Técnico de Precisión</span>
                <h1>Axonometría Profesional</h1>
                <p>La representación tridimensional normalizada para comunicación técnica y manuales de usuario.</p>
            </header>

            <div className="drawing-grid">
                {/* SIMULADOR INTERACTIVO */}
                <section className="drawing-card full-width" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 1.5rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ margin: 0 }}>Simulador de Sistemas Axonométricos</h2>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Observa cómo cambian las proporciones según el método elegido.</p>
                            </div>
                            <div className="sim-selector" style={{ margin: 0 }}>
                                <button className={`sel-btn mini ${system === 'ISOMETRICA' ? 'active' : ''}`} onClick={() => setSystem('ISOMETRICA')}>Isométrica</button>
                                <button className={`sel-btn mini ${system === 'CABALLERA' ? 'active' : ''}`} onClick={() => setSystem('CABALLERA')}>Caballera</button>
                                <button className={`sel-btn mini ${system === 'PERSPECTIVA' ? 'active' : ''}`} onClick={() => setSystem('PERSPECTIVA')}>Libre (Orbit)</button>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '500px', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', marginTop: '1rem' }}>
                        <Canvas>
                            <Suspense fallback={null}>
                                <AxoScene system={system} />
                            </Suspense>
                        </Canvas>
                    </div>
                </section>

                {/* FUNDAMENTOS TEÓRICOS */}
                <section className="drawing-card">
                    <h3 style={{ color: 'var(--primary-color)' }}>📏 Perspectiva Isométrica (30°-30°)</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Es el sistema más utilizado por su simplicidad. No deforma las dimensiones en ninguno de sus ejes principales.
                    </p>
                    <div className="info-box">
                        <strong>Características Clave:</strong>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                            <li>Ángulos de 120° entre ejes X, Y, Z.</li>
                            <li>Sin coeficiente de reducción (K=1).</li>
                            <li>Fácil de medir directamente con escalímetro.</li>
                        </ul>
                    </div>
                </section>

                <section className="drawing-card">
                    <h3 style={{ color: '#ff00f2' }}>📐 Perspectiva Caballera (0°-45°)</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Prioriza la cara frontal de la pieza. La profundidad se proyecta a 45° permitiendo una lectura rápida del frente.
                    </p>
                    <div className="info-box" style={{ borderLeftColor: '#ff00f2' }}>
                        <strong>Reglas de Oro:</strong>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                            <li>Eje de profundidad suele usarse a 45°.</li>
                            <li><strong>Coeficiente de Reducción:</strong> Se debe dibujar la profundidad al 50% (K=0.5) para que el ojo la perciba natural.</li>
                        </ul>
                    </div>
                </section>

                {/* EVALUACIÓN Y PRÁCTICA */}
                <section className="drawing-card">
                    <AxoQuiz />
                </section>

                <section className="drawing-card">
                    <h3>📝 Práctica Recomendada</h3>
                    <ul className="exercise-list">
                        <li><strong>Lámina Axo-1:</strong> Dibujar un cubo de 50mm en Isometría y compararlo con uno en Caballera con K=0.5.</li>
                        <li><strong>Lámina Axo-2:</strong> Representar una pieza con perforaciones circulares (Elipses en Isometría).</li>
                    </ul>
                    <div className="info-box" style={{ marginTop: '1rem' }}>
                        <strong>Tip:</strong> Recuerda que en Isometría, los círculos se ven como elipses cuyos ejes mayores están a 90° del eje de la cara.
                    </div>
                </section>
            </div>
            
            <style>{`
                .opt-btn {
                    padding: 12px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: #fff;
                    text-align: left;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .opt-btn:hover { background: rgba(0,242,255,0.05); border-color: var(--primary-color); }
                .opt-btn.correct { background: rgba(34,197,94,0.15); border-color: #22c55e; color: #22c55e; }
                .opt-btn.wrong { background: rgba(239,68,68,0.15); border-color: #ef4444; color: #fca5a5; }
            `}</style>
        </div>
    );
};

export default AxonometricPage;


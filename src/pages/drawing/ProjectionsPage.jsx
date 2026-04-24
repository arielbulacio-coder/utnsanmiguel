import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Edges } from '@react-three/drei';
import * as THREE from 'three';
import './DrawingStyles.css';

/* ───────────────────────────────────────────────────────────────────────────
   PIEZAS 3D DINÁMICAS
   ─────────────────────────────────────────────────────────────────────────── */

const LPiece = () => (
    <group>
        <mesh position={[0, -0.75, 0]}>
            <boxGeometry args={[3, 0.5, 2]} />
            <meshStandardMaterial color="#60a5fa" metalness={0.4} roughness={0.4} />
            <Edges color="#1e40af" threshold={15} />
        </mesh>
        <mesh position={[-1, 0.25, 0]}>
            <boxGeometry args={[1, 1.5, 2]} />
            <meshStandardMaterial color="#60a5fa" metalness={0.4} roughness={0.4} />
            <Edges color="#1e40af" threshold={15} />
        </mesh>
    </group>
);

const WedgePiece = () => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.5, -1);
    shape.lineTo(1.5, -1);
    shape.lineTo(-1.5, 1);
    shape.closePath();

    return (
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <extrudeGeometry args={[shape, { depth: 2, bevelEnabled: false }]} />
            <meshStandardMaterial color="#f87171" metalness={0.4} roughness={0.4} />
            <Edges color="#991b1b" />
        </mesh>
    );
};

const StepPiece = () => (
    <group>
        <mesh position={[-0.75, -0.5, 0]}>
            <boxGeometry args={[1.5, 1, 2]} />
            <meshStandardMaterial color="#34d399" />
            <Edges color="#065f46" />
        </mesh>
        <mesh position={[0.75, -0.75, 0]}>
            <boxGeometry args={[1.5, 0.5, 2]} />
            <meshStandardMaterial color="#34d399" />
            <Edges color="#065f46" />
        </mesh>
    </group>
);

const DynamicPiece = ({ type }) => {
    const group = useRef();
    useFrame((_, delta) => {
        if (group.current) group.current.rotation.y += delta * 0.15;
    });

    return (
        <group ref={group}>
            {type === 'L' && <LPiece />}
            {type === 'WEDGE' && <WedgePiece />}
            {type === 'STEP' && <StepPiece />}
        </group>
    );
};

/* Proyección individual */
const Projection = ({ shape, color, title, position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <mesh>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments>
            <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
            <lineBasicMaterial color={color} />
        </lineSegments>
        <Text
            position={[0, 2.3, 0.05]}
            fontSize={0.25}
            color={color}
            anchorX="center"
            outlineWidth={0.02}
            outlineColor="#000"
        >
            {title}
        </Text>
    </group>
);

const GlassBox = ({ showPlanes, showProjections, pieceType }) => {
    const size = 5;

    // Alzado shapes
    const alzadoL = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.5, -1); s.lineTo(1.5, -1); s.lineTo(1.5, -0.5); s.lineTo(-0.5, -0.5); s.lineTo(-0.5, 1); s.lineTo(-1.5, 1); s.closePath();
        return s;
    }, []);

    const alzadoWedge = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.5, -1); s.lineTo(1.5, -1); s.lineTo(-1.5, 1); s.closePath();
        return s;
    }, []);

    const alzadoStep = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.5, -1); s.lineTo(1.5, -1); s.lineTo(1.5, -0.5); s.lineTo(0, -0.5); s.lineTo(0, 0); s.lineTo(-1.5, 0); s.closePath();
        return s;
    }, []);

    // Planta shapes
    const plantaRect = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.5, -1); s.lineTo(1.5, -1); s.lineTo(1.5, 1); s.lineTo(-1.5, 1); s.closePath();
        return s;
    }, []);

    // Lateral shapes
    const lateralL = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1, -1); s.lineTo(1, -1); s.lineTo(1, 1); s.lineTo(-1, 1); s.closePath();
        return s;
    }, []);

    const lateralWedge = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1, -1); s.lineTo(1, -1); s.lineTo(1, 1); s.lineTo(-1, 1); s.closePath();
        return s;
    }, []);

    const currentAlzado = pieceType === 'L' ? alzadoL : pieceType === 'WEDGE' ? alzadoWedge : alzadoStep;
    const currentPlanta = plantaRect;
    const currentLateral = lateralL; // Simplified for this demo

    const currentColor = pieceType === 'L' ? "#00f2ff" : pieceType === 'WEDGE' ? "#f87171" : "#34d399";
    const boxGeometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);

    return (
        <group>
            {showPlanes && (
                <group>
                    <mesh position={[0, 0, -size / 2]}>
                        <planeGeometry args={[size, size]} />
                        <meshStandardMaterial color="#00f2ff" transparent opacity={0.08} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh position={[0, -size / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[size, size]} />
                        <meshStandardMaterial color="#a78bfa" transparent opacity={0.08} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh position={[size / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[size, size]} />
                        <meshStandardMaterial color="#f59e0b" transparent opacity={0.08} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[boxGeometry]} />
                        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
                    </lineSegments>
                </group>
            )}

            {showProjections && (
                <>
                    <Projection shape={currentAlzado} color={currentColor} title="ALZADO" position={[0, 0, -size / 2 + 0.01]} />
                    <Projection shape={currentPlanta} color="#a78bfa" title="PLANTA" position={[0, -size / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <Projection shape={currentLateral} color="#f59e0b" title="LATERAL IZQ" position={[size / 2 - 0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

                    {/* Líneas de detalle */}
                    {pieceType === 'L' && (
                        <>
                            <group position={[0, -size / 2 + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                <line>
                                    <bufferGeometry attach="geometry" setFromPoints={[new THREE.Vector3(-0.5, -1, 0), new THREE.Vector3(-0.5, 1, 0)]} />
                                    <lineBasicMaterial attach="material" color="#a78bfa" opacity={0.5} transparent />
                                </line>
                            </group>
                            <group position={[size / 2 - 0.012, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                                <line>
                                    <bufferGeometry attach="geometry" setFromPoints={[new THREE.Vector3(-1, -0.5, 0), new THREE.Vector3(1, -0.5, 0)]} />
                                    <lineBasicMaterial attach="material" color="#f59e0b" opacity={0.5} transparent />
                                </line>
                            </group>
                        </>
                    )}
                </>
            )}
        </group>
    );
};

const Scene3D = ({ showPlanes, showProjections, pieceType }) => (
    <>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />

        <DynamicPiece type={pieceType} />
        <GlassBox showPlanes={showPlanes} showProjections={showProjections} pieceType={pieceType} />

        <OrbitControls enableDamping dampingFactor={0.1} minDistance={4} maxDistance={15} />
    </>
);

const Quiz = () => {
    const [qIdx, setQIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState(null);

    const questions = [
        { q: "¿En qué sistema el objeto se coloca ENTRE el observador y el plano de proyección?", a: "ISO E (Europeo)", o: ["ISO E (Europeo)", "ISO A (Americano)"], feedback: "En el sistema ISO E (Método del primer diedro), el objeto se proyecta hacia atrás hacia el plano." },
        { q: "La vista superior, también llamada Planta, se dibuja debajo del Alzado en:", a: "ISO E", o: ["ISO E", "ISO A"], feedback: "Es la disposición clásica del sistema europeo." },
        { q: "¿Qué nombre recibe la proyección frontal de un objeto?", a: "Alzado", o: ["Planta", "Alzado", "Perfil"], feedback: "El Alzado es la vista principal que define al objeto." },
        { q: "¿Cómo deben estar ubicadas las vistas entre sí?", a: "Alineadas", o: ["Alineadas", "Cerca una de otra", "En hojas separadas"], feedback: "La correspondencia entre vistas es obligatoria para interpretar las medidas." },
        { q: "¿Qué tipo de línea se usa para aristas ocultas?", a: "Tipo E (Trazos)", o: ["Tipo A (Continua)", "Tipo E (Trazos)", "Tipo F (Trazo y punto)"], feedback: "Las líneas de trazos representan lo que no vemos directamente." }
    ];

    const handleAnswer = (ans) => {
        setSelected(ans);
        const isCorrect = ans === questions[qIdx].a;
        if (isCorrect) setScore(s => s + 1);
        
        // El feedback se muestra automáticamente por el estado 'selected'
    };

    const nextQuestion = () => {
        if (qIdx < questions.length - 1) {
            setQIdx(i => i + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    if (finished) return (
        <div className="quiz-result card-inner">
            <h3>¡Evaluación Completada!</h3>
            <div className="score-circle">{Math.round((score / questions.length) * 100)}%</div>
            <p>Acertaste {score} de {questions.length} preguntas.</p>
            <button className="sel-btn" onClick={() => { setQIdx(0); setScore(0); setFinished(false); setSelected(null); }}>Reintentar</button>
        </div>
    );

    return (
        <div className="quiz-container card-inner">
            <div className="quiz-header">
                <span className="q-count">Pregunta {qIdx + 1} de {questions.length}</span>
                <div className="progress-bar"><div className="progress" style={{ width: `${((qIdx + 1) / questions.length) * 100}%` }}></div></div>
            </div>
            <h3 className="q-text">{questions[qIdx].q}</h3>
            <div className="quiz-options">
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
                <div className="quiz-feedback fade-in">
                    <p>{questions[qIdx].feedback}</p>
                    <button className="sel-btn mini" onClick={nextQuestion}>
                        {qIdx === questions.length - 1 ? 'Ver Resultado' : 'Siguiente →'}
                    </button>
                </div>
            )}
        </div>
    );
};

const ProjectionsPage = () => {
    const [showPlanes, setShowPlanes] = useState(true);
    const [showProjections, setShowProjections] = useState(true);
    const [pieceType, setPieceType] = useState('L');

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Proyecciones Ortogonales (Método Monge)</h1>
                <p>Cómo "desarmar" un objeto 3D para comunicarlo en un plano 2D.</p>
            </header>

            <div className="drawing-grid">
                {/* MÓDULO 3D — Caja de cristal interactiva */}
                <section className="drawing-card full-width" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 1.5rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'linear-gradient(135deg,#3b82f6,#a78bfa)', borderRadius: 8, fontWeight: 700, letterSpacing: 0.5 }}>SIMULADOR INTERACTIVO 3D</span>
                        </div>
                        <h2 style={{ marginTop: '0.3rem' }}>Caja de Cristal e ISO E</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            Selecciona una pieza y observa cómo se generan sus proyecciones en tiempo real.
                        </p>
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', margin: '1rem 0' }}>
                            <div className="piece-selector" style={{ background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '30px', border: '1px solid var(--glass-border)', display: 'flex', gap: 5 }}>
                                <button className={`sel-btn mini ${pieceType === 'L' ? 'active' : ''}`} onClick={() => setPieceType('L')}>Pieza en L</button>
                                <button className={`sel-btn mini ${pieceType === 'WEDGE' ? 'active' : ''}`} onClick={() => setPieceType('WEDGE')}>Cuña</button>
                                <button className={`sel-btn mini ${pieceType === 'STEP' ? 'active' : ''}`} onClick={() => setPieceType('STEP')}>Escalón</button>
                            </div>
                            <button className={`sel-btn ${showPlanes ? 'active' : ''}`} onClick={() => setShowPlanes(v => !v)}>
                                {showPlanes ? '✓ Planos Visibles' : 'Mostrar Planos'}
                            </button>
                            <button className={`sel-btn ${showProjections ? 'active' : ''}`} onClick={() => setShowProjections(v => !v)}>
                                {showProjections ? '✓ Proyecciones' : 'Mostrar Proyecciones'}
                            </button>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '520px', background: 'radial-gradient(ellipse at center, #0b1628 0%, #050810 100%)' }}>
                        <Canvas camera={{ position: [6, 5, 7], fov: 45 }}>
                            <Suspense fallback={null}>
                                <Scene3D showPlanes={showPlanes} showProjections={showProjections} pieceType={pieceType} />
                            </Suspense>
                        </Canvas>
                    </div>
                </section>

                {/* TEORIA: ISO E vs ISO A */}
                <section className="drawing-card">
                    <h2>Los dos grandes sistemas</h2>
                    <p>Existen dos formas principales de organizar estas vistas en el papel, dependiendo de dónde "pongamos" los planos.</p>
                    <div className="theory-box">
                        <div className="theory-item">
                            <h4 style={{ color: '#00f2ff' }}>ISO E (Europeo / Internacional)</h4>
                            <p>El objeto está entre el observador y el plano. <strong>Es el que usamos en Argentina.</strong></p>
                            <ul>
                                <li>Planta: Se dibuja ABAJO.</li>
                                <li>Lat. Derecha: Se dibuja a la IZQUIERDA.</li>
                            </ul>
                        </div>
                        <div className="theory-item">
                            <h4 style={{ color: '#ff00f2' }}>ISO A (Americano)</h4>
                            <p>El plano está entre el observador y el objeto (como una ventana).</p>
                            <ul>
                                <li>Planta: Se dibuja ARRIBA.</li>
                                <li>Lat. Derecha: Se dibuja a la DERECHA.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* EVALUACION */}
                <section className="drawing-card">
                    <h2>Auto-Evaluación</h2>
                    <p>Pon a prueba tus conocimientos sobre proyecciones.</p>
                    <Quiz />
                </section>

                {/* TEORIA AVANZADA */}
                <section className="drawing-card">
                    <h2>Glosario de Vistas</h2>
                    <div className="glossary-grid">
                        <div className="glossary-item"><strong>Alzado:</strong> Vista frontal. Es la que mejor define la forma del objeto.</div>
                        <div className="glossary-item"><strong>Planta:</strong> Vista superior. Muestra la profundidad y el ancho total.</div>
                        <div className="glossary-item"><strong>Perfil:</strong> Vista lateral. En ISO E, solemos dibujar el perfil izquierdo a la derecha.</div>
                    </div>
                    <div className="info-box" style={{ marginTop: '1.5rem' }}>
                        <strong>Tip:</strong> Siempre empieza dibujando el Alzado. Las demás vistas se proyectan a partir de él.
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Guía: Cómo Analizar una Pieza</h2>
                    <div className="step-guide">
                        <div className="guide-step"><span>1</span> Elige la cara con más detalles como Alzado.</div>
                        <div className="guide-step"><span>2</span> Imagina que giras la pieza 90° hacia adelante para la Planta.</div>
                        <div className="guide-step"><span>3</span> Gira 90° hacia la derecha para el Perfil Izquierdo.</div>
                    </div>
                </section>

                {/* 📝 LÁMINAS PROPUESTAS CON IMÁGENES IA */}
                <section className="drawing-card full-width">
                    <h2 style={{ color: 'var(--primary-color)' }}>📝 Láminas de Práctica Legislada</h2>
                    <p style={{ marginBottom: '2rem' }}>
                        A continuación se presentan las láminas propuestas para el ciclo lectivo. Utiliza el simulador superior para visualizar las piezas en 3D antes de comenzar el trazado técnico en papel.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: 'Lámina N°1: El Escalón',
                                desc: 'Estudio de vistas fundamentales en sistema ISO E. Enfoque en líneas visibles y ocultas.',
                                img: '/img/drawing/lamina_escalon.png'
                            },
                            {
                                title: 'Lámina N°2: Pieza en L',
                                desc: 'Proyecciones ortogonales con acotamiento básico. Relación entre vista frontal y lateral.',
                                img: '/img/drawing/lamina_l.png'
                            },
                            {
                                title: 'Lámina N°3: La Cuña (Plano Inclinado)',
                                desc: 'Representación de superficies inclinadas y su verdadera magnitud en proyecciones.',
                                img: '/img/drawing/lamina_cuna.png'
                            }
                        ].map((plate, index) => (
                            <div key={index} className="glass-card" style={{ margin: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--glass-border)' }}>
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{plate.title}</h3>
                                <div style={{ 
                                    borderRadius: '8px', 
                                    overflow: 'hidden', 
                                    border: '1px solid var(--glass-border)',
                                    background: '#fff',
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src={`${import.meta.env.BASE_URL || '/'}${plate.img}`.replace('//', '/')} 
                                        alt={plate.title}
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>{plate.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ 
                        marginTop: '2rem', 
                        padding: '1.5rem', 
                        background: 'rgba(0, 242, 255, 0.05)', 
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 242, 255, 0.2)' 
                    }}>
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>💡 Consejos para tus Láminas</h3>
                        <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <li><strong>Balance de Hoja:</strong> Calcula el espacio total de las tres vistas para centrarlas.</li>
                            <li><strong>Líneas Ocultas:</strong> Usa línea de trazos (Tipo E) para las aristas que no ves de frente.</li>
                            <li><strong>Escala:</strong> Asegúrate de usar la misma escala (1:1 o 2:1) en las tres proyecciones.</li>
                        </ul>
                    </div>
                </section>

                <section className="drawing-card full-width">
                    <h2>Alineación y Correspondencia (Método del Ingurtido)</h2>
                    <div className="vistas-graph">
                        <div className="vistas-main-grid">
                            <div className="vista-graph-item center">ALZADO (FRENTE)</div>
                            <div className="vista-graph-item bottom">PLANTA (SUPERIOR)</div>
                            <div className="vista-graph-item right">LATERAL IZQUIERDA</div>
                        </div>
                        <div className="vistas-explanation">
                            <p><strong>REGLA CRÍTICA:</strong> La correspondencia de medidas es la clave del dibujo técnico. Todo punto en el alzado debe tener su reflejo alineado en la planta y el perfil.</p>
                            <ul className="advanced-list" style={{ marginTop: '1rem' }}>
                                <li><strong>Ancho:</strong> Se traslada verticalmente entre Alzado y Planta.</li>
                                <li><strong>Altura:</strong> Se traslada horizontalmente entre Alzado y Perfil.</li>
                                <li><strong>Profundidad:</strong> Se traslada mediante un arco o línea de 45° entre Planta y Perfil.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .theory-box { display: grid; gap: 1.5rem; margin-top: 1rem; }
                .theory-item { padding: 1.2rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--glass-border); transition: 0.3s; }
                .theory-item:hover { background: rgba(255,255,255,0.06); }
                .theory-item h4 { margin-bottom: 0.8rem; font-size: 1.1rem; }
                .theory-item ul { padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-dim); }
                
                .glossary-grid { display: grid; gap: 10px; margin-top: 1rem; }
                .glossary-item { padding: 10px; border-bottom: 1px solid var(--glass-border); font-size: 0.9rem; }
                .glossary-item strong { color: var(--primary-color); display: block; }

                .step-guide { display: grid; gap: 12px; margin-top: 1rem; }
                .guide-step { display: flex; align-items: center; gap: 15px; font-size: 0.95rem; }
                .guide-step span { width: 28px; height: 28px; background: var(--primary-color); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }

                .quiz-container { margin-top: 1rem; min-height: 320px; position: relative; }
                .card-inner { animation: fadeIn 0.4s ease-out; }
                .q-count { font-size: 0.8rem; color: var(--text-dim); font-weight: bold; }
                .q-text { margin-bottom: 1.5rem; font-size: 1.2rem; min-height: 3rem; }
                .progress-bar { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin: 8px 0 20px; }
                .progress { height: 100%; background: var(--primary-color); border-radius: 3px; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                .quiz-options { display: grid; gap: 12px; }
                .opt-btn { padding: 14px 18px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); color: #fff; text-align: left; cursor: pointer; transition: all 0.2s; font-size: 0.95rem; }
                .opt-btn:hover:not(:disabled) { border-color: var(--primary-color); background: rgba(0, 242, 255, 0.04); transform: translateX(5px); }
                .opt-btn.correct { background: rgba(16, 185, 129, 0.15) !important; border-color: #10b981 !important; color: #10b981; font-weight: bold; }
                .opt-btn.wrong { background: rgba(239, 68, 68, 0.15) !important; border-color: #ef4444 !important; color: #fecaca; }
                
                .quiz-feedback { margin-top: 1.5rem; padding: 1rem; background: rgba(0,242,255,0.05); border-radius: 8px; border: 1px solid rgba(0,242,255,0.2); }
                .quiz-feedback p { font-size: 0.9rem; color: #00f2ff; margin-bottom: 1rem; line-height: 1.5; }
                
                .quiz-result { text-align: center; padding: 1rem 0; }
                .score-circle { width: 100px; height: 100px; border-radius: 50%; border: 6px solid var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin: 0 auto 1.5rem; color: var(--primary-color); background: rgba(0, 242, 255, 0.05); }
                
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fadeIn 0.3s ease-out; }

                .sel-btn.mini { padding: 8px 16px; font-size: 0.8rem; }
                .sel-btn.mini.active { background: var(--primary-color); color: #000; }

                .vistas-graph { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
                .vistas-main-grid { display: grid; grid-template-areas: "centro der" "planta ."; gap: 10px; }
                .vista-graph-item { padding: 1.5rem; border: 2px solid var(--primary-color); background: rgba(0, 242, 255, 0.05); border-radius: 8px; font-weight: bold; text-align: center; }
                .vista-graph-item.center { grid-area: centro; border-color: #fff; }
                .vista-graph-item.bottom { grid-area: planta; }
                .vista-graph-item.right { grid-area: der; }
                @media (max-width: 800px) { .vistas-graph { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default ProjectionsPage;

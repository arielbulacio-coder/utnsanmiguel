import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArquitecturaVonNeumannStyles.css';

const ArquitecturaVonNeumannPage = () => {
    const [phase, setPhase] = useState('IDLE'); // IDLE, FETCH, DECODE, EXECUTE, STORE
    const [dataFlow, setDataFlow] = useState({ active: false, type: '', from: '', to: '' });
    const [bottleneckActive, setBottleneckActive] = useState(false);
    const [instruction, setInstruction] = useState({ op: 'LOAD', addr: '0x1A', val: '42' });
    const [logs, setLogs] = useState(['Sistema iniciado. Esperando instrucción...']);
    const [cycleCount, setCycleCount] = useState(0);

    // Quiz State
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const questions = [
        {
            topic: 'Componentes Críticos',
            q: '¿Qué componente es responsable de realizar operaciones aritméticas y lógicas?',
            options: ['Memoria RAM', 'Unidad de Control', 'ALU (Unidad Aritmético Lógica)', 'Bus de Datos'],
            correct: 2,
            explanation: 'La ALU (Arithmetic Logic Unit) es la celda de la CPU que realiza los cálculos matemáticos y comparaciones lógicas.'
        },
        {
            topic: 'Componentes Críticos',
            q: '¿Cuál es la función principal de la Memoria Principal (RAM) en este modelo?',
            options: ['Guardar archivos permanentemente', 'Almacenar temporalmente instrucciones y datos', 'Controlar los periféricos de entrada', 'Enfriar el procesador'],
            correct: 1,
            explanation: 'La memoria RAM actúa como un espacio de trabajo rápido donde residen el programa en ejecución y los datos que la CPU necesita.'
        },
        {
            topic: 'Buses',
            q: '¿Qué bus se utiliza para indicar en qué posición de memoria se quiere leer o escribir?',
            options: ['Bus de Datos', 'Bus de Direcciones', 'Bus de Control', 'Bus de Identidad'],
            correct: 1,
            explanation: 'El bus de direcciones es unidireccional (sale de la CPU) y apunta a la dirección de memoria específica a la cual acceder.'
        },
        {
            topic: 'Buses',
            q: 'Si la CPU quiere realizar una operación de ESCRITURA en memoria, ¿qué bus envía la señal de sincronización?',
            options: ['Bus de Control', 'Bus de Datos', 'Bus de Direcciones', 'Bus de Poder'],
            correct: 0,
            explanation: 'El bus de control transporta señales como Read/Write, Clock y Reset para coordinar el tiempo de las operaciones.'
        },
        {
            topic: 'Cuello de Botella',
            q: '¿A qué se refiere el "Cuello de Botella" de Von Neumann?',
            options: ['A que la CPU genera demasiado calor', 'A la limitación de velocidad por compartir el bus entre instrucciones y datos', 'A que el teclado es más lento que el mouse', 'A la falta de memoria externa'],
            correct: 1,
            explanation: 'Ocurre porque el bus de comunicación no puede igualar la velocidad de procesamiento de la CPU, obligándola a esperar por los datos.'
        },
        {
            topic: 'General',
            q: '¿Qué diferencia principal tiene el Modelo de Von Neumann con el de Harvard?',
            options: ['Usa electricidad', 'Tiene CPU', 'Usa una sola memoria para datos e instrucciones', 'Es más rápido'],
            correct: 2,
            explanation: 'En Von Neumann, datos e instrucciones viajan por el mismo bus desde una memoria única. En Harvard, están separados.'
        }
    ];

    const handleAnswer = (index) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        if (index === questions[currentQuestion].correct) {
            setScore(prev => prev + 1);
            setFeedback({ type: 'correct', text: '¡Correcto! ' + questions[currentQuestion].explanation });
        } else {
            setFeedback({ type: 'error', text: 'Incorrecto. ' + questions[currentQuestion].explanation });
        }
    };

    const nextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setQuizStarted(false);
        setSelectedAnswer(null);
        setFeedback(null);
    };

    const addLog = (msg) => {
        setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    const runStep = () => {
        if (phase === 'IDLE') {
            setPhase('FETCH');
            setDataFlow({ active: true, type: 'ADDRESS', from: 'CPU', to: 'MEMORY' });
            addLog("⚡ [FETCH] CPU envía dirección " + instruction.addr + " por BUS DE DIRECCIONES");
        } else if (phase === 'FETCH') {
            setPhase('DECODE');
            setDataFlow({ active: true, type: 'DATA', from: 'MEMORY', to: 'CPU' });
            addLog("📥 [FETCH] Memoria responde con dato " + instruction.op + " por BUS DE DATOS");
        } else if (phase === 'DECODE') {
            setPhase('EXECUTE');
            setDataFlow({ active: true, type: 'CONTROL', from: 'CPU', to: 'ALU' });
            addLog("🧠 [DECODE] Unidad de Control interpreta operación: " + instruction.op);
        } else if (phase === 'EXECUTE') {
            setPhase('STORE');
            setDataFlow({ active: true, type: 'DATA', from: 'ALU', to: 'REGISTER' });
            addLog("🚀 [EXECUTE] Procesando dato: " + instruction.val);
        } else if (phase === 'STORE') {
            setPhase('IDLE');
            setDataFlow({ active: false, type: '', from: '', to: '' });
            setCycleCount(prev => prev + 1);
            addLog("✅ [STORE] Resultado guardado. Ciclo de instrucción completado.");
            // Generate next random instruction
            const ops = ['ADD', 'SUB', 'LOAD', 'STORE', 'MUL'];
            setInstruction({
                op: ops[Math.floor(Math.random() * ops.length)],
                addr: '0x' + Math.floor(Math.random() * 256).toString(16).toUpperCase(),
                val: Math.floor(Math.random() * 100).toString()
            });
        }
    };

    const toggleBottleneck = () => {
        setBottleneckActive(prev => !prev);
        if (!bottleneckActive) {
            addLog("⚠️ CUELLO DE BOTELLA ACTIVADO: La CPU debe esperar a la Memoria...");
        } else {
            addLog("⚡ CUELLO DE BOTELLA DESACTIVADO: Sistema equilibrado.");
        }
    };

    return (
        <div className="vn-container app-container">
            <Link to="/" className="btn-vn btn-secondary-vn" style={{ position: 'absolute', top: '2rem', left: '2rem', textDecoration: 'none' }}>
                ← Volver al Inicio
            </Link>

            <section className="vn-hero">
                <h1>Modelo de Von Neumann</h1>
                <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.8 }}>
                    Descubre cómo funciona el corazón de casi todas las computadoras modernas. 
                    Aprende sobre la interconexión entre componentes, los buses y los límites de la arquitectura funcional.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <span className="bus-pill pill-data">Bus de Datos</span>
                    <span className="bus-pill pill-address">Bus de Direcciones</span>
                    <span className="bus-pill pill-control">Bus de Control</span>
                </div>
            </section>

            <div className={`simulator-board ${bottleneckActive ? 'bottleneck-active' : ''}`}>
                <div className="bottleneck-overlay">
                    <h2>⚠️ TRÁFICO SATURADO: Von Neumann Bottleneck</h2>
                </div>

                {/* CPU */}
                <div className="component-box cpu-box" style={{ 
                    transform: phase === 'EXECUTE' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: phase === 'EXECUTE' ? '0 0 30px var(--cpu-color)' : 'none'
                }}>
                    <h3 style={{ color: 'var(--cpu-color)' }}>CPU</h3>
                    <div style={{ fontSize: '0.8rem', textAlign: 'left', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: phase === 'IDLE' ? 1 : 0.5 }}>
                            <span>PC:</span> <span>{instruction.addr}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: phase === 'FETCH' ? 1 : 0.8 }}>
                            <span>IR:</span> <span>{phase === 'FETCH' || phase === 'IDLE' ? '???' : instruction.op}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: phase === 'EXECUTE' || phase === 'STORE' ? 1 : 0.5 }}>
                            <span>ACC:</span> <span>{phase === 'STORE' ? instruction.val : '0'}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', width: '100%', fontSize: '0.7rem' }}>
                        <strong>Estado:</strong> {phase}
                    </div>
                </div>

                {/* BUSES INTERNOS (Lines) */}
                <div className={`bus-line bus-data ${dataFlow.type === 'DATA' ? 'active-bus' : ''}`} 
                     style={{ color: 'var(--bus-data)' }}></div>
                <div className={`bus-line bus-address ${dataFlow.type === 'ADDRESS' ? 'active-bus' : ''}`} 
                     style={{ color: 'var(--bus-address)' }}></div>
                <div className={`bus-line bus-control ${dataFlow.type === 'CONTROL' ? 'active-bus' : ''}`} 
                     style={{ color: 'var(--bus-control)' }}></div>

                {/* Memory */}
                <div className="component-box memory-box" style={{
                    transform: phase === 'FETCH' || phase === 'STORE' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: phase === 'FETCH' ? '0 0 30px var(--mem-color)' : 'none'
                }}>
                    <h3 style={{ color: 'var(--mem-color)' }}>Memoria RAM</h3>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {[0,1,2,3].map(i => (
                            <div key={i} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                fontSize: '0.7rem', 
                                background: 'rgba(0,0,0,0.3)', 
                                padding: '4px',
                                borderLeft: instruction.addr === `0x1${i}` ? '2px solid #fff' : 'none'
                            }}>
                                <span>0x1{i}</span>
                                <span>{instruction.addr === `0x1${i}` ? instruction.val : '00'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input/Output */}
                <div className="component-box io-box">
                    <div style={{ textAlign: 'center' }}>
                        <strong style={{ color: 'var(--io-color)' }}>ENTRADA</strong>
                        <div style={{ fontSize: '1.5rem' }}>⌨️ 🖱️</div>
                    </div>
                    <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <strong style={{ color: 'var(--io-color)' }}>SALIDAS</strong>
                        <div style={{ fontSize: '1.5rem' }}>🖥️ 🖨️</div>
                    </div>
                </div>
            </div>

            <div className="controls">
                <button className="btn-vn btn-primary-vn" onClick={runStep}>
                    {phase === 'IDLE' ? '🚀 Iniciar Ciclo' : '⏭️ Siguiente Paso'}
                </button>
                <button className={`btn-vn ${bottleneckActive ? 'btn-primary-vn' : 'btn-secondary-vn'}`} onClick={toggleBottleneck}>
                    {bottleneckActive ? '✅ Resolver Cuello Botella' : '⚠️ Activar Cuello Botella'}
                </button>
            </div>

            <div className="step-indicator">
                <strong>Ciclos completados: {cycleCount}</strong> | 
                <span style={{ marginLeft: '1rem', color: 'var(--primary-color)' }}>{logs[0]}</span>
            </div>

            <div className="vn-info-grid">
                <div className="info-card">
                    <h3 style={{ borderBottom: '2px solid var(--cpu-color)', paddingBottom: '0.5rem' }}>Componentes Críticos</h3>
                    <p>La arquitectura funcional se divide en tres bloques principales:</p>
                    <ul>
                        <li><strong>CPU (Unidad Central):</strong> Cerebro que procesa datos (contiene la ALU para cálculos y la UC para control).</li>
                        <li><strong>Memoria Principal:</strong> Espacio temporal donde residen instrucciones y datos.</li>
                        <li><strong>E/S (Entrada/Salida):</strong> Interfaces para interactuar con el mundo exterior.</li>
                    </ul>
                </div>

                <div className="info-card">
                    <h3 style={{ borderBottom: '2px solid var(--bus-data)', paddingBottom: '0.5rem' }}>Buses de Comunicación</h3>
                    <p>El sistema circulatorio que conecta todo:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div><span className="bus-pill pill-data">Datos</span> Instrucciones y operandos.</div>
                        <div><span className="bus-pill pill-address">Direcciones</span> Ubicaciones en la RAM.</div>
                        <div><span className="bus-pill pill-control">Control</span> Sincronización (Lectura/Escritura).</div>
                    </div>
                </div>

                <div className="info-card">
                    <h3 style={{ borderBottom: '2px solid #ef4444', paddingBottom: '0.5rem' }}>Cuello de Botella</h3>
                    <p>El <strong>Von Neumann Bottleneck</strong> ocurre porque la CPU es miles de veces más rápida que la transferencia de datos desde la Memoria.</p>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        Como comparten el mismo bus para instrucciones y datos, se genera un tiempo de espera que limita la velocidad total del sistema.
                    </p>
                </div>
            </div>

            {/* QUIZ SECTION */}
            <div className="glass-card" style={{ marginTop: '4rem', padding: '3rem' }}>
                {!quizStarted ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--primary-color)' }}>🏆 Autoevaluación</h2>
                        <p>¿Qué tanto has aprendido sobre la arquitectura de Von Neumann? Pon a prueba tus conocimientos.</p>
                        <button className="btn-vn btn-primary-vn" onClick={() => setQuizStarted(true)}>Comenzar Test</button>
                    </div>
                ) : showResult ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2>Resultado: {score} / {questions.length}</h2>
                        <div style={{ fontSize: '4rem', margin: '1rem 0' }}>
                            {score === questions.length ? '🥇' : score > questions.length / 2 ? '🥈' : '🥉'}
                        </div>
                        <p>{score === questions.length ? '¡Excelente! Eres un experto en computación.' : 'Sigue practicando para mejorar tu puntaje.'}</p>
                        <button className="btn-vn btn-primary-vn" onClick={resetQuiz}>Reintentar</button>
                    </div>
                ) : (
                    <div className="quiz-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="bus-pill pill-control">{questions[currentQuestion].topic}</span>
                            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                        </div>
                        <h3 style={{ marginBottom: '2rem' }}>{questions[currentQuestion].q}</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {questions[currentQuestion].options.map((opt, i) => (
                                <button 
                                    key={i} 
                                    className="btn-vn"
                                    onClick={() => handleAnswer(i)}
                                    style={{
                                        textAlign: 'left',
                                        background: selectedAnswer === i 
                                            ? (i === questions[currentQuestion].correct ? '#4caf50' : '#ef4444')
                                            : 'rgba(255,255,255,0.05)',
                                        color: selectedAnswer === i ? '#fff' : '#fff',
                                        border: selectedAnswer !== i && i === questions[currentQuestion].correct && selectedAnswer !== null
                                            ? '2px solid #4caf50'
                                            : '2px solid transparent'
                                    }}
                                    disabled={selectedAnswer !== null}
                                >
                                    {String.fromCharCode(65 + i)}) {opt}
                                </button>
                            ))}
                        </div>
                        {feedback && (
                            <div style={{ 
                                marginTop: '2rem', 
                                padding: '1rem', 
                                borderRadius: '12px',
                                background: feedback.type === 'correct' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                border: feedback.type === 'correct' ? '1px solid #4caf50' : '1px solid #ef4444'
                            }}>
                                {feedback.text}
                            </div>
                        )}
                        {selectedAnswer !== null && (
                            <button className="btn-vn btn-primary-vn" style={{ marginTop: '2rem', width: '100%' }} onClick={nextQuestion}>
                                {currentQuestion + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="glass-card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'left' }}>
                <h2 style={{ color: 'var(--primary-color)' }}>¿Sabías qué?</h2>
                <p>
                    A diferencia de otras arquitecturas (como Harvard), el modelo de Von Neumann utiliza <strong>una única memoria</strong> para almacenar tanto el programa (instrucciones) como los datos. Esto simplificó enormemente el diseño de las primeras computadoras, pero creó el desafío de velocidad que enfrentamos hoy en día.
                </p>
            </div>
        </div>
    );
};

export default ArquitecturaVonNeumannPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArquitecturaVonNeumannStyles.css';

const questions = [
    {
        q: '¿Quién propuso la arquitectura que utiliza una única memoria para datos e instrucciones?',
        options: ['Alan Turing', 'John von Neumann', 'Blaise Pascal', 'Ada Lovelace'],
        correct: 1,
        explanation: 'John von Neumann detalló este diseño en 1945, permitiendo que programas y datos compartan el mismo espacio.'
    },
    {
        q: '¿Cuál es la función principal de la ALU?',
        options: ['Almacenar archivos', 'Realizar cálculos matemáticos y lógicos', 'Controlar el mouse', 'Enfriar el procesador'],
        correct: 1,
        explanation: 'La Arithmetic Logic Unit es el motor de cálculo de la CPU.'
    },
    {
        q: '¿Qué componente coordina el flujo de datos dentro de la CPU?',
        options: ['Memoria RAM', 'Unidad de Control', 'Disco Rígido', 'Bus de Datos'],
        correct: 1,
        explanation: 'La Unidad de Control (UC) actúa como el director de orquesta del sistema.'
    },
    {
        q: '¿Cómo se llama el problema de velocidad causado por el canal compartido entre CPU y Memoria?',
        options: ['Cuello de botella de Von Neumann', 'Saturación de RAM', 'Fuga de memoria', 'Lag de bus'],
        correct: 0,
        explanation: 'Ocurre porque la CPU debe esperar a que los datos viajen por el bus compartido, limitando el rendimiento.'
    },
    {
        q: '¿Qué bus es unidireccional y sale de la CPU hacia la memoria?',
        options: ['Bus de Datos', 'Bus de Control', 'Bus de Direcciones', 'Bus de Poder'],
        correct: 2,
        explanation: 'El bus de direcciones solo lleva la ubicación de memoria que la CPU desea acceder.'
    },
    {
        q: '¿Qué registro almacena la dirección de la próxima instrucción a ejecutar?',
        options: ['Acumulador', 'Program Counter (PC)', 'Instruction Register (IR)', 'Stack Pointer'],
        correct: 1,
        explanation: 'El Contador de Programa (PC) siempre apunta a la siguiente instrucción en la lista.'
    },
    {
        q: '¿Qué registro contiene la instrucción que se está ejecutando actualmente?',
        options: ['Instruction Register (IR)', 'PC', 'MAR', 'MDR'],
        correct: 0,
        explanation: 'El Registro de Instrucción (IR) guarda el código de operación mientras es decodificado.'
    },
    {
        q: '¿Cuál es la primera fase del ciclo de instrucción?',
        options: ['Decode', 'Execute', 'Fetch (Búsqueda)', 'Store'],
        correct: 2,
        explanation: 'Fetch es el proceso de traer la instrucción desde la memoria RAM a la CPU.'
    },
    {
        q: '¿Qué bus transporta las señales de "Lectura" o "Escritura"?',
        options: ['Bus de Datos', 'Bus de Direcciones', 'Bus de Control', 'Bus Serial'],
        correct: 2,
        explanation: 'El bus de control sincroniza las acciones de los componentes.'
    },
    {
        q: 'En el modelo de Von Neumann, ¿dónde residen los programas antes de ejecutarse?',
        options: ['En el monitor', 'En la Memoria Principal (RAM)', 'Solo en el registro PC', 'En la ALU'],
        correct: 1,
        explanation: 'Tanto instrucciones como datos deben cargarse en la RAM para ser procesados.'
    },
    {
        q: '¿Qué arquitectura separa físicamente la memoria de datos de la de instrucciones?',
        options: ['Von Neumann', 'Arquitectura Harvard', 'X86', 'RISC'],
        correct: 1,
        explanation: 'Harvard usa buses independientes, evitando el "cuello de botella" tradicional.'
    },
    {
        q: '¿Qué componente de la CPU determina qué operación debe realizar la ALU?',
        options: ['Reloj del sistema', 'Unidad de Control', 'Registro de Estado', 'Caché'],
        correct: 1,
        explanation: 'La UC decodifica la instrucción y envía las señales de habilitación a la ALU.'
    },
    {
        q: '¿Qué sucede en la fase de "Write back" o Almacenamiento?',
        options: ['Se apaga la PC', 'Se borra la RAM', 'El resultado se guarda en memoria o registros', 'Se pide una nueva dirección'],
        correct: 2,
        explanation: 'Es el paso final donde el resultado del cálculo se hace persistente en el destino.'
    },
    {
        q: '¿Los buses de datos son bidireccionales?',
        options: ['No, solo van hacia la CPU', 'Sí, permiten lectura y escritura', 'Solo en PCs antiguas', 'Depende del sistema operativo'],
        correct: 1,
        explanation: 'Los buses de datos deben permitir que la información entre y salga de la CPU.'
    },
    {
        q: '¿Qué registro de la CPU guarda temporalmente los resultados de la ALU?',
        options: ['Program Counter', 'Acumulador', 'RAM', 'BIOS'],
        correct: 1,
        explanation: 'El acumulador es un registro de alta velocidad que guarda el resultado inmediato de una operación.'
    },
    {
        q: '¿Qué tipo de memoria es la RAM en este modelo?',
        options: ['Permanente', 'Volátil', 'De solo lectura', 'Mecánica'],
        correct: 1,
        explanation: 'Volátil significa que los datos se pierden al apagar el suministro eléctrico.'
    },
    {
        q: '¿El cuello de botella de Von Neumann se resuelve aumentando solo la velocidad de la CPU?',
        options: ['Sí, siempre', 'No, se requiere mayor ancho de banda en el bus', 'Depende de la placa de video', 'Sí, si es un procesador i7'],
        correct: 1,
        explanation: 'De nada sirve una CPU ultra rápida si el bus de datos es estrecho y lento.'
    },
    {
        q: '¿Qué bus determina la cantidad máxima de memoria direccionable?',
        options: ['Bus de Direcciones', 'Bus de Datos', 'Bus de Control', 'Bus USB'],
        correct: 0,
        explanation: 'El ancho del bus de direcciones (ej: 32 o 64 bits) determina cuántas posiciones puede "señalar" la CPU.'
    },
    {
        q: '¿Qué parte del sistema permite la comunicación con el exterior (pantalla, teclado)?',
        options: ['Unidad de Control', 'Unidad de Entrada/Salida', 'Caché L1', 'Buses internos'],
        correct: 1,
        explanation: 'Los periféricos se conectan a través de los puertos de E/S.'
    },
    {
        q: '¿Cuál es la unidad mínima de información que viaja por los buses?',
        options: ['Byte', 'Paquete', 'Bit', 'Kilobyte'],
        correct: 2,
        explanation: 'Un bit (0 o 1) es la unidad básica de toda transferencia electrónica digital.'
    }
];

const ArquitecturaVonNeumannPage = () => {
    // Simulator states
    const [phase, setPhase] = useState('IDLE'); // IDLE -> FETCH -> DECODE -> EXECUTE -> STORE
    const [packetPos, setPacketPos] = useState({ x: 0, y: 0, visible: false, color: 'var(--bus-data)' });
    const [logs, setLogs] = useState([{ id: 0, text: '💡 Sistema listo. Presiona un botón para ver el ciclo.', active: true }]);
    const [cpuState, setCpuState] = useState({ pc: '0x00', ir: '---', acc: '0' });
    const [memState, setMemState] = useState(['LOAD 15', 'ADD 25', 'STORE 40', 'SUB 10', '0', '0', '0', '0']);

    // Quiz states
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const addLog = (text) => {
        setLogs(prev => {
            const newLogs = prev.map(l => ({ ...l, active: false }));
            return [{ id: Date.now(), text, active: true }, ...newLogs].slice(0, 5);
        });
    };

    const triggerAnimation = (type) => {
        const colors = {
            'ADDRESS': 'var(--bus-address)',
            'DATA': 'var(--bus-data)',
            'CONTROL': 'var(--bus-control)'
        };
        setPacketPos({ visible: true, color: colors[type] || '#fff' });
        setTimeout(() => setPacketPos(prev => ({ ...prev, visible: false })), 1000);
    };

    const nextStep = () => {
        if (phase === 'IDLE') {
            setPhase('FETCH');
            triggerAnimation('ADDRESS');
            addLog("⚡ FETCH: El PC envía la dirección a la Memoria por el BUS DE DIRECCIONES.");
        } else if (phase === 'FETCH') {
            setPhase('DECODE');
            triggerAnimation('DATA');
            setCpuState(prev => ({ ...prev, ir: memState[parseInt(cpuState.pc, 16)] }));
            addLog("📥 DECODE: La instrucción viaja desde la Memoria a la CPU por el BUS DE DATOS.");
        } else if (phase === 'DECODE') {
            setPhase('EXECUTE');
            triggerAnimation('CONTROL');
            addLog(`🧠 EXECUTE: La Unidad de Control interpreta ${cpuState.ir}. La ALU realiza el cálculo.`);
        } else if (phase === 'EXECUTE') {
            setPhase('STORE');
            triggerAnimation('DATA');
            const result = Math.floor(Math.random() * 100);
            setCpuState(prev => ({ ...prev, acc: result }));
            addLog(`🚀 STORE: El resultado (${result}) se guarda en el Acumulador.`);
        } else {
            setPhase('IDLE');
            setCpuState(prev => ({ ...prev, pc: '0x' + (parseInt(prev.pc, 16) + 1).toString(16).padStart(2, '0').toUpperCase() }));
            addLog("✅ Ciclo completado. PC incremental para la próxima instrucción.");
        }
    };

    const handleAnswer = (idx) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(idx);
        if (idx === questions[currentQuestion].correct) {
            setScore(s => s + 1);
            setFeedback({ type: 'correct', text: `¡Correcto! ${questions[currentQuestion].explanation}` });
        } else {
            setFeedback({ type: 'wrong', text: `Incorrecto. ${questions[currentQuestion].explanation}` });
        }
    };

    const nextQuizStep = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(c => c + 1);
            setSelectedOpt(null);
            setFeedback(null);
        } else {
            setShowResults(true);
        }
    };

    return (
        <div className="vn-container">
            <Link to="/" className="btn-vn btn-secondary-vn" style={{ position: 'sticky', top: '1rem', zIndex: 100 }}>
                ← Volver
            </Link>

            <header className="vn-hero">
                <h1>Simulador de Von Neumann</h1>
                <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7, fontSize: '1.2rem' }}>
                    Entiende el funcionamiento interno de la computadora a través de esta experiencia interactiva.
                </p>
            </header>

            <main className="vn-simulation-wrapper">
                <div className="simulator-board">
                    {/* CPU Component */}
                    <div className={`component-box cpu-box ${phase === 'EXECUTE' ? 'pulse' : ''}`}>
                        <h2 style={{ color: 'var(--cpu-color)', margin: 0 }}>CPU</h2>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div className="glass-card" style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Contador (PC)</span>
                                <code>{cpuState.pc}</code>
                            </div>
                            <div className="glass-card" style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Instrucción (IR)</span>
                                <code>{cpuState.ir}</code>
                            </div>
                            <div className="glass-card" style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Acumulador</span>
                                <code>{cpuState.acc}</code>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--cpu-color)', fontWeight: 'bold' }}>UNIDAD DE CONTROL / ALU</div>
                    </div>

                    {/* Central Bus System */}
                    <div className="bus-system">
                        <div className="bus-trunk" style={{ background: phase === 'FETCH' ? 'var(--bus-address)' : 'rgba(255,255,255,0.1)' }}>
                            <span className="bus-label">Direcciones</span>
                            {packetPos.visible && packetPos.color === 'var(--bus-address)' && <div className="data-packet" style={{ backgroundColor: packetPos.color, left: '0%', animation: 'moveRight 1s linear forwards' }} />}
                        </div>
                        <div className="bus-trunk" style={{ background: phase === 'DECODE' || phase === 'STORE' ? 'var(--bus-data)' : 'rgba(255,255,255,0.1)' }}>
                            <span className="bus-label">Datos</span>
                            {packetPos.visible && packetPos.color === 'var(--bus-data)' && <div className="data-packet" style={{ backgroundColor: packetPos.color, right: '0%', animation: 'moveLeft 1s linear forwards' }} />}
                        </div>
                        <div className="bus-trunk" style={{ background: phase === 'EXECUTE' ? 'var(--bus-control)' : 'rgba(255,255,255,0.1)' }}>
                            <span className="bus-label">Control</span>
                            {packetPos.visible && packetPos.color === 'var(--bus-control)' && <div className="data-packet" style={{ backgroundColor: packetPos.color, left: '0%', animation: 'moveRight 1s linear forwards' }} />}
                        </div>
                    </div>

                    {/* RAM Component */}
                    <div className={`component-box memory-box ${phase === 'FETCH' ? 'pulse' : ''}`}>
                        <h2 style={{ color: 'var(--mem-color)', margin: 0 }}>Memoria RAM</h2>
                        <div style={{ width: '100%', display: 'grid', gap: '4px' }}>
                            {memState.map((val, i) => (
                                <div key={i} className="glass-card" style={{ padding: '4px 8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', borderLeft: parseInt(cpuState.pc, 16) === i ? '3px solid #fff' : 'none' }}>
                                    <span style={{ opacity: 0.5 }}>0x{i.toString(16).padStart(2, '0').toUpperCase()}</span>
                                    <code>{val}</code>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* I/O Component */}
                    <div className="io-box glass-card">
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'var(--io-color)', display: 'block', fontSize: '0.7rem' }}>INPUT</span>
                            <span style={{ fontSize: '1.5rem' }}>⌨️ 🖱️</span>
                        </div>
                        <div style={{ background: 'var(--io-color)', width: '2px', height: '100%' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'var(--io-color)', display: 'block', fontSize: '0.7rem' }}>OUTPUT</span>
                            <span style={{ fontSize: '1.5rem' }}>🖥️ 🔊</span>
                        </div>
                    </div>
                </div>

                <div className="vn-sidebar">
                    <div className="log-panel">
                        {logs.map(log => (
                            <div key={log.id} className={`log-entry ${log.active ? 'active' : ''}`}>
                                {log.text}
                            </div>
                        ))}
                    </div>
                    <div className="control-panel">
                        <button className="btn-vn btn-primary-vn" onClick={nextStep} style={{ padding: '1.5rem' }}>
                            {phase === 'IDLE' ? '▶️ INICIAR CICLO' : '⏭️ SIGUIENTE PASO'}
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>Estado: {phase}</div>
                    </div>
                </div>
            </main>

            <section className="quiz-card">
                {!quizStarted ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓 El Desafío de Von Neumann</h2>
                        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Completa el test de 20 preguntas para obtener tu certificado de experto en arquitecturas.</p>
                        <button className="btn-vn btn-primary-vn" onClick={() => setQuizStarted(true)} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                            Comenzar Evaluación
                        </button>
                    </div>
                ) : showResults ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h2 style={{ fontSize: '3rem' }}>¡Test Finalizado!</h2>
                        <div style={{ fontSize: '5rem', margin: '2rem' }}>
                            {score >= 18 ? '🏆' : score >= 12 ? '🥈' : '🥉'}
                        </div>
                        <h3>Puntaje: {score} / {questions.length}</h3>
                        <p>{score >= 15 ? '¡Excelente nivel teórico!' : 'Sigue repasando los conceptos fundamentales.'}</p>
                        <button className="btn-vn btn-primary-vn" onClick={() => window.location.reload()} style={{ marginTop: '2rem' }}>Reintentar</button>
                    </div>
                ) : (
                    <div className="quiz-container">
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 800, color: 'var(--primary-color)' }}>PREGUNTA {currentQuestion + 1} de 20</span>
                            <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                                <div style={{ width: `${((currentQuestion + 1) / 20) * 100}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                            </div>
                        </header>

                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', lineHeight: '1.4' }}>{questions[currentQuestion].q}</h2>

                        <div className="options-grid">
                            {questions[currentQuestion].options.map((opt, i) => (
                                <button
                                    key={i}
                                    className={`option-btn ${selectedOpt === i ? (i === questions[currentQuestion].correct ? 'correct' : 'wrong') : ''}`}
                                    onClick={() => handleAnswer(i)}
                                    disabled={selectedOpt !== null}
                                >
                                    <span style={{ opacity: 0.5, fontWeight: 900 }}>{String.fromCharCode(65 + i)}</span>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', borderLeft: '5px solid' + (feedback.type === 'correct' ? '#4caf50' : '#ef4444'), animation: 'slideIn 0.3s ease-out' }}>
                                <p style={{ margin: 0, fontWeight: 700 }}>{feedback.text}</p>
                                <button className="btn-vn btn-primary-vn" onClick={nextQuizStep} style={{ marginTop: '1.5rem', width: '100%' }}>
                                    {currentQuestion + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <style>{`
                @keyframes moveRight { from { left: 0%; } to { left: 100%; } }
                @keyframes moveLeft { from { right: 0%; } to { right: 100%; } }
                .glass-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; }
            `}</style>
        </div>
    );
};

export default ArquitecturaVonNeumannPage;

import React, { useState, useEffect } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    // States for simulations
    const [robotMoving, setRobotMoving] = useState(false);
    const [veladorOn, setVeladorOn] = useState(false);
    const [ventiladorOn, setVentiladorOn] = useState(false);
    const [aranaMoving, setAranaMoving] = useState(false);
    const [ampActive, setAmpActive] = useState(false);
    const [evitaActive, setEvitaActive] = useState(false);
    
    // Evita Simulation State
    const [evitaPos, setEvitaPos] = useState({ x: 20, y: 50 });
    const [evitaRotation, setEvitaRotation] = useState(0);
    const [sensorDist, setSensorDist] = useState(100);

    // Evita Simulation Logic
    useEffect(() => {
        let interval;
        if (evitaActive) {
            interval = setInterval(() => {
                setEvitaPos(prev => {
                    const obstacleX = 160;
                    const nextX = prev.x + (evitaRotation === 0 ? 2 : 0);
                    const nextY = prev.y + (evitaRotation === 90 ? 2 : 0);
                    
                    // Detect obstacle at 10cm (translated to pixels here)
                    const dist = Math.abs(obstacleX - nextX);
                    setSensorDist(dist);

                    if (dist < 40 && evitaRotation === 0) {
                        setEvitaRotation(90); // Turn down
                        return prev;
                    }
                    
                    if (nextY > 100) {
                        setEvitaRotation(0);
                        return { x: 20, y: 50 }; // Reset
                    }

                    return { x: nextX, y: nextY };
                });
            }, 50);
        } else {
            setEvitaPos({ x: 20, y: 50 });
            setEvitaRotation(0);
            setSensorDist(100);
        }
        return () => clearInterval(interval);
    }, [evitaActive, evitaRotation]);

    const getImagePath = (path) => {
        const base = import.meta.env.BASE_URL || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
    };

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num, children }) => {
        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section">
                                <h3>📋 Descripción</h3>
                                <p>{description}</p>
                            </div>

                            {functioning && (
                                <div className="proyecto-section">
                                    <h3>💡 Funcionamiento</h3>
                                    <p style={{ fontStyle: 'italic', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{functioning}</p>
                                </div>
                            )}

                            <div className="proyecto-section">
                                <h3>🚀 Prototipo Sugerido (Diseño IA)</h3>
                                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={getImagePath(imageSrc)} 
                                        alt={title} 
                                        style={{ width: '100%', display: 'block' }} 
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                    />
                                    <div style={{ display: 'none', padding: '2rem', textAlign: 'center', color: '#555' }}>
                                        <p style={{ fontSize: '2rem' }}>🖼️</p>
                                        <p>Cargando prototipo...</p>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: '#00f2ff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem' }}>
                                        Diseño Conceptual IA
                                    </div>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>🛠️ Materiales y Recursos</h3>
                                <div className="materials-list">
                                    <ul>
                                        {materials.map((mat, i) => <li key={i}>{mat}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>⚙️ Actividades Paso a Paso</h3>
                                <ol className="instructions-list">
                                    {instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#0a0a0a', minHeight: '300px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? 'Detener' : 'Activar Lógica'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`}>
                                        {simOn ? '>>> AUTO-NAV ACTIVE: ' + simStatus.on : '>>> IDLE: ' + simStatus.off}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Extra blocks for specific projects */}
                            {children}
                        </div>
                    </div>

                    <div className="proyecto-section" style={{ marginTop: '2rem' }}>
                        <h3>📺 Video Guía y Recursos</h3>
                        <div className="video-container">
                            <iframe 
                                title={title}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="proyectos-container fade-in">
            <header className="proyectos-header">
                <h1>🔌 Robótica y Programación</h1>
                <p>Proyectos integradores de electrónica, código y mecánica. De bloques a Arduino C++.</p>
                <div className="youtube-invite">
                    <span>🔴</span>
                    <p>¡Investiga más en YouTube buscando "Robot Arduino mBlock"!</p>
                </div>
            </header>

            <div className="proyecto-grid">
                
                {/* 1 - 4 (Shortened calls to keep file manageable) */}
                <ProjectCard num="1" title="Robot Móvil Simple" imageSrc="/proj_robot.png" videoId="h3M9_N-UoX0" description="Robot básico con botella." functioning="Motor DC + Transmisión simple." materials={["Botella", "Motores", "Pilas"]} instructions={["Perforar tapas", "Pegar motores", "Conectar"]} simOn={robotMoving} setSimOn={setRobotMoving} simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4rem'}}>🤖</div>} simStatus={{on:"Avance lineal",off:"Parado"}} />
                
                <ProjectCard num="2" title="Velador LED" imageSrc="/proj_velador.png" videoId="-BIs-z5g7tY" description="Lámpara reciclada." functioning="Cálculo de resistencia y polaridad." materials={["Lata", "LED", "CD"]} instructions={["Armar base", "Soldar LED", "Conectar USB"]} simOn={veladorOn} setSimOn={setVeladorOn} simContent={<div style={{fontSize:'4rem', color: veladorOn ? 'yellow' : '#444'}}>💡</div>} simStatus={{on:"Luz emitida",off:"Apagado"}} />

                <ProjectCard num="3" title="Ventilador Personal" imageSrc="/proj_ventilador.png" videoId="YqXf8zXW77A" description="Motor + Aspas CD." functioning="Energía eléctrica a mecánica rotatoria." materials={["Motor", "CD", "Soporte"]} instructions={["Cortar CD", "Fijar motor", "Energizar"]} simOn={ventiladorOn} setSimOn={setVentiladorOn} simContent={<div style={{fontSize:'4rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} simStatus={{on:"Aire fluyendo",off:"Estático"}} />

                <ProjectCard num="4" title="Araña Vibrobot" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" description="Movimiento por vibración." functioning="Masa desbalanceada en motor." materials={["Motor vibrador", "Pila botón", "Alambres"]} instructions={["Montar motor", "Poner patas", "Conectar pila"]} simOn={aranaMoving} setSimOn={setAranaMoving} simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4rem'}}>🕷️</div>} simStatus={{on:"Vibración",off:"Sueño"}} />

                {/* 5. AMPLIFICADOR TDA2005 */}
                <ProjectCard 
                    num="5"
                    title="Amplificador TDA 2005"
                    imageSrc="/proj_amp.png"
                    videoId="5VIda0n8t-E"
                    description="Audio Hi-Fi 20W con Bluetooth opcional."
                    functioning="Amplificación Clase AB con fuente de 12V."
                    materials={["TDA 2005", "Disipador", "Módulo BT", "Fuente 12V"]}
                    instructions={["Montar disipador", "Cablear TDA", "Vincular BT"]}
                    simOn={ampActive} setSimOn={setAmpActive}
                    simContent={<div style={{fontSize:'4rem', transform: ampActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s'}}>🔊</div>}
                    simStatus={{ on: "Reproduciendo", off: "Silencio" }}
                />

                {/* 6. ROBOT EVITA OBSTÁCULOS (ARDUINO + MBLOCK) */}
                <ProjectCard 
                    num="6"
                    title="Robot Evita Obstáculos (Arduino + mBlock)"
                    imageSrc="/proj_evita.png"
                    videoId="3oA-O9H-8Rk"
                    description="Un robot autónomo que detecta paredes y obstáculos mediante ultrasonido, capaz de decidir su trayectoria en tiempo real."
                    functioning={`Lógica: Medir Distancia → ¿D < 10cm? → SI: Detener y Girar | NO: Avanzar.
                    Utiliza mBlock para programación por bloques y Arduino IDE para la carga final.`}
                    materials={[
                        "Arduino UNO",
                        "2 Motores DC + Ruedas + Soporte",
                        "Sensor Ultrasonido HC-SR04 (Pines 2 y 3)",
                        "Driver de motor L298N (Control velocidad PWM)",
                        "Protoboard, cables y batería (Mínimo 7.4V)",
                        "Software: mBlock y Arduino IDE"
                    ]}
                    instructions={[
                        "Conectar el Sensor HC-SR04 (Trig:3, Echo:2).",
                        "Instalar el Driver L298N conectando motores y pines digitales 5 al 10.",
                        "Configurar mBlock para Arduino UNO y programar la lógica condicional.",
                        "Conectar por USB y subir el programa mediante 'Subir modo en vivo' o Arduino IDE.",
                        "Calibrar la velocidad PWM para un giro estable."
                    ]}
                    simOn={evitaActive}
                    setSimOn={setEvitaActive}
                    simContent={
                        <div style={{ position: 'relative', width: '200px', height: '150px', border: '1px solid #333' }}>
                            {/* Obstacle */}
                            <div style={{ position: 'absolute', width: '20px', height: '100px', background: '#f44', right: '10px', top: '25px', borderRadius: '5px' }}></div>
                            {/* Robot */}
                            <div style={{ 
                                position: 'absolute', 
                                left: `${evitaPos.x}px`, 
                                top: `${evitaPos.y}px`, 
                                width: '40px', 
                                height: '30px', 
                                background: '#333', 
                                border: '2px solid var(--primary-color)',
                                borderRadius: '5px',
                                transform: `rotate(${evitaRotation}deg)`,
                                transition: 'transform 0.3s ease'
                            }}>
                                {/* Sensor beam */}
                                {evitaActive && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        width: `${sensorDist}px`, 
                                        height: '2px', 
                                        background: sensorDist < 40 ? 'red' : 'rgba(0,242,255,0.3)', 
                                        left: '40px', 
                                        top: '14px',
                                        display: evitaRotation === 0 ? 'block' : 'none'
                                    }}></div>
                                )}
                                {/* Eyes */}
                                <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'silver', right: '-4px', top: '2px', borderRadius: '50%' }}></div>
                                <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'silver', right: '-4px', bottom: '2px', borderRadius: '50%' }}></div>
                            </div>
                        </div>
                    }
                    simStatus={{ on: `Buscando camino... Distancia: ${Math.round(sensorDist)}mm`, off: "Esperando Arduino" }}
                >
                    <div className="proyecto-section" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
                        <h4 style={{ color: 'var(--primary-color)' }}>🎒 Reflexión STEAM</h4>
                        <p style={{ fontSize: '0.85rem' }}>Relación con autos autónomos (Tesla, Waymo) y sensores de proximidad industrial. Este proyecto enseña el bucle de realimentación: Sentido → Procesado → Actuación.</p>
                        <a href="https://drive.google.com/file/d/1oppQrRAZqAeE_QlG7j9AAyKCmJf1J5Bj/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#d32f2f', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize:'0.8rem' }}>📥 Descargar Código Arduino IDE</a>
                    </div>
                </ProjectCard>

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '4rem', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    <p>⚠️ Importante: Verifica todas las conexiones antes de encender. Una conexión incorrecta puede dañar los componentes de Arduino.</p>
                    <p>© SimuTec - Proyecto Educativo. "Lo que empezó como un LED y una resistencia, ahora se convirtió en un robot autónomo."</p>
                </div>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

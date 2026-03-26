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
    const [solderActive, setSolderActive] = useState(false);
    
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
                    const dist = Math.abs(obstacleX - nextX);
                    setSensorDist(dist);
                    if (dist < 40 && evitaRotation === 0) {
                        setEvitaRotation(90);
                        return prev;
                    }
                    if (nextY > 100) {
                        setEvitaRotation(0);
                        return { x: 20, y: 50 };
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
                                    <h3>💡 Funcionamiento / Conceptos</h3>
                                    <p style={{ fontStyle: 'italic', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{functioning}</p>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🚀 Prototipo Sugerido (Diseño IA)</h3>
                                    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: '#00f2ff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem' }}>Diseño IA</div>
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🧪 Comparativa IA</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%' }} />
                                                <p style={{ fontSize: '0.7rem', textAlign: 'center', padding: '5px', background: src.color || '#333' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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

                            <div className="simulacion-area" style={{ background: '#0a0a0a', minHeight: '250px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? 'Detener' : 'Activar Lógica'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`}>
                                        {simOn ? '>>> ACTIVE: ' + simStatus.on : '>>> IDLE: ' + simStatus.off}
                                    </div>
                                </div>
                            </div>
                            
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '2rem' }}>
                            <h3>📺 Video Guía y Recursos</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '15px', overflow: 'hidden' }}>
                                <iframe 
                                    title={title} 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="proyectos-container fade-in">
            <header className="proyectos-header">
                <h1>🔌 Robótica y Módulos de Taller</h1>
                <p>Proyectos integradores de electrónica, código y habilidades técnicas. Aprende haciendo.</p>
                <div className="youtube-invite">
                    <span>🔴</span>
                    <p>¡Investiga más en YouTube buscando "Técnicas de Soldadura Electrónica" o "Robot Arduino"!</p>
                </div>
            </header>

            <div className="proyecto-grid">
                
                <ProjectCard num="1" title="Robot Móvil Simple" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" description="Robot básico con botella." materials={["Botella", "Motores", "Pilas"]} instructions={["Perforar tapas", "Pegar motores", "Conectar"]} simOn={robotMoving} setSimOn={setRobotMoving} simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4rem'}}>🤖</div>} simStatus={{on:"Avance lineal",off:"Parado"}} />
                
                <ProjectCard num="2" title="Velador LED" imageSrc="/proj_velador.png" videoId="-BIs-z5g7tY" description="Lámpara reciclada." materials={["Lata", "LED", "CD"]} instructions={["Armar base", "Soldar LED", "Conectar USB"]} simOn={veladorOn} setSimOn={setVeladorOn} simContent={<div style={{fontSize:'4rem', color: veladorOn ? 'yellow' : '#444'}}>💡</div>} simStatus={{on:"Luz emitida",off:"Apagado"}} />

                <ProjectCard num="3" title="Ventilador Personal" imageSrc="/proj_ventilador.png" videoId="YqXf8zXW77A" description="Motor + Aspas CD." materials={["Motor", "CD", "Soporte"]} instructions={["Cortar CD", "Fijar motor", "Energizar"]} simOn={ventiladorOn} setSimOn={setVentiladorOn} simContent={<div style={{fontSize:'4rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} simStatus={{on:"Aire fluyendo",off:"Estático"}} />

                <ProjectCard num="4" title="Araña Vibrobot" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" description="Movimiento por vibración." materials={["Motor vibrador", "Pila botón", "Alambres"]} instructions={["Montar motor", "Poner patas", "Conectar pila"]} simOn={aranaMoving} setSimOn={setAranaMoving} simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4rem'}}>🕷️</div>} simStatus={{on:"Vibración",off:"Sueño"}} />

                <ProjectCard num="5" title="Amplificador TDA 2005" imageSrc="/proj_amp.png" videoId="5VIda0n8t-E" description="Audio Hi-Fi 20W." materials={["TDA 2005", "Disipador", "Módulo BT", "Fuente 12V"]} instructions={["Montar disipador", "Cablear TDA", "Vincular BT"]} simOn={ampActive} setSimOn={setAmpActive} simContent={<div style={{fontSize:'4rem', transform: ampActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s'}}>🔊</div>} simStatus={{ on: "Reproduciendo", off: "Silencio" }} />

                <ProjectCard num="6" title="Robot Evita Obstáculos" imageSrc="/proj_evita.png" videoId="3oA-O9H-8Rk" description="Robot autónomo Arduino." functioning="Lógica: ¿Distancia < 10cm? → Girar." materials={["Arduino UNO", "Motores", "Sensor Ultrasonido", "L298N"]} instructions={["Conectar Sensor", "Driver L298N", "Programar mBlock"]} simOn={evitaActive} setSimOn={setEvitaActive} simContent={<div style={{fontSize:'3rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} simStatus={{ on: "Buscando camino", off: "Parado" }} />

                <ProjectCard 
                    num="7"
                    title="Práctica de Soldadura en Placa de Islas"
                    description="Soldadura de estaño profesional."
                    functioning="Nexo mecánico y eléctrico perfecto."
                    materials={["Soldador", "Estaño", "Perfboard"]}
                    instructions={["Calentar", "Aplicar estaño", "Enfriar"]}
                    imageSrc={[
                        { url: '/proj_soldadura_ok.png', label: '✅ CORRECTA', color: '#1b5e20' },
                        { url: '/proj_soldadura_error.png', label: '❌ INCORRECTA', color: '#b71c1c' }
                    ]}
                    simOn={solderActive} setSimOn={setSolderActive}
                    simContent={<div style={{fontSize:'4rem'}}>🩹</div>}
                    simStatus={{ on: "Soldando con precisión", off: "Frío" }}
                    videoId="GscBUnUonqM"
                />

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '4rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Proyecto Educativo. "En la prolijidad de la soldadura reside la fiabilidad de tu circuito."</p>
            </footer>
            <style>{`
                @keyframes evaporate { 0% { opacity: 0.8; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-30px); } }
                @keyframes pulse { from { transform: scaleY(0.8); } to { transform: scaleY(1.1); } }
            `}</style>
        </div>
    );
};

export default ProyectosReciclablesPage;

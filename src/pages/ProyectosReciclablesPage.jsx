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
    const [huertaActive, setHuertaActive] = useState(false);
    const [sumoActive, setSumoActive] = useState(false);
    const [futbolActive, setFutbolActive] = useState(false);

    const [isDay, setIsDay] = useState(true);

    // Auto-cycle for Solar Garden Day/Night
    useEffect(() => {
        let interval;
        if (huertaActive) {
            interval = setInterval(() => {
                setIsDay(prev => !prev);
            }, 6000);
        } else {
            setIsDay(true);
        }
        return () => clearInterval(interval);
    }, [huertaActive]);

    const getImagePath = (path) => {
        const base = import.meta.env.BASE_URL || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
    };

    // Component Simulation Elements
    const Comp = ({ label, color = '#333', children, style = {} }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', ...style }}>
            <div style={{ background: color, borderRadius: '8px', padding: '10px', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
        </div>
    );

    const Wire = ({ width, top, left, rotate = 0, color = 'red', active = false }) => (
        <div style={{ 
            position: 'absolute', 
            width: width, 
            height: '2px', 
            background: active ? '#00f2ff' : color, 
            top: top, 
            left: left, 
            transform: `rotate(${rotate}deg)`, 
            transformOrigin: '0 0', 
            zIndex: 0, 
            opacity: active ? 1 : 0.4,
            transition: 'all 0.3s ease',
            boxShadow: active ? `0 0 5px ${color}` : 'none'
        }}></div>
    );

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🚀 El Desafío del Inventor</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>🧠 Ciencia Aplicada (STEAM)</h3>
                                <div className="theory-block" style={{ fontSize: '0.88rem', whiteSpace: 'pre-line', background: 'rgba(0,12,25,0.7)', padding: '22px', borderRadius: '20px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.7', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)', color: '#eee' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Prototipo Real</h3>
                                    <div className="img-container" style={{ borderRadius: '20px', border: '1px solid #444', overflow: 'hidden' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🗺️ Planos de Ingeniería</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#111', borderRadius: '15px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.72rem', padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Materiales (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.92rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Armado</h3>
                                <ol className="instructions-list" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#050505', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.3)', minHeight: '400px', position: 'relative', overflow: 'hidden', padding: '25px', display: 'flex', flexDirection: 'column' }}>
                                {simContent}
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative', marginTop: 'auto' }}>
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Finalizar Prueba' : '▶️ Arrancar Sistema'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.1rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA OPERATIVO <<<' : '>>> EN ESPERA <<<'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '8px' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '4rem' }}>
                            <h3>📺 Soporte Audiovisual</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '30px', overflow: 'hidden', border: '1px solid #333' }}>
                                <iframe 
                                    title={title} 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    src={videoUrl}
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
            <header className="proyectos-header" style={{ borderBottom: '3px solid var(--primary-color)', paddingBottom: '3rem', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>🔬 SIMUTEC: INGENIERÍA Y ROBÓTICA</h1>
                <p style={{ fontSize: '1.4rem' }}>Laboratorio educativo de sistemas tecnológicos sustentables.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER REVISADO */}
                <ProjectCard 
                    num="1" title="Robot Móvil Eco-Rover" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construye un robot que corre usando una botella. Teoría: Motores DC y Rozamiento."
                    functioning={`🔬 CIENCIA DEL MOVIMIENTO:
                    • El Motor (Torque): Convierte corriente en giro mediante imanes.
                    • Neumáticos: Usamos el agarre de tapitas para vencer la inercia.`}
                    materials={["Botella plástica", "2 Motores DC", "Pilas AA", "Tapitas (Ruedas)"]} 
                    instructions={["Paso 1: Montaje de motores.", "Paso 2: Tracción directa.", "Paso 3: Testeo de polaridad."]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial / Motores 3V"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ opacity: 0.3, fontWeight: 'bold' }}>BOTELLA PET</span>
                                <div style={{ position: 'absolute', top: '-15px', color: '#00f2ff' }}>🍾</div>
                            </div>
                            <div style={{ position: 'absolute', left: '40px', top: '50px' }}>
                                <Comp label="MOTOR IZQ" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', left: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', top: '50px' }}>
                                <Comp label="MOTOR DER" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', right: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px' }}>
                                <Comp label="PILA 3V" color="#222">🔋</Comp>
                            </div>
                            <Wire width="60px" top="130px" left="90px" rotate={-45} active={robotMoving} color="red" />
                            <Wire width="60px" top="130px" left="150px" rotate={-135} active={robotMoving} color="black" />
                        </div>
                    } 
                />

                {/* 2. VELADOR LED REVISADO */}
                <ProjectCard 
                    num="2" title="Velador LED Sustentable" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Lámpara de bajo consumo usando un CD como base y una lata como reflector."
                    functioning={`🔌 ELECTRÓNICA:
                    • Jump Cuántico: Los electrones cruzan el diodo soltando fotones.
                    • Resistencia: Protege el chip de quemarse.`}
                    materials={["LED alta potencia", "Resistencia 220Ω", "Cable USB viejo", "Lata (Carcasa)", "CD (Base)"]} 
                    instructions={["Paso 1: Soldar resistencia al Anodo.", "Paso 2: Conectar puntas de cable USB.", "Paso 3: Montar en lata reflectora."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Fuente 5V USB / Resistencia 220Ω"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', border: '1px solid #888', opacity: 0.5 }}></div>
                            <span style={{ position: 'absolute', bottom: '15px', fontSize: '0.6rem', color: '#444' }}>CD BASE</span>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '3rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
                                <div style={{ marginTop: '40px' }}><Comp label="CAN" color="transparent">🥫</Comp></div>
                                <div style={{ position: 'absolute', bottom: '10px' }}>
                                    <Comp label="220Ω" color="#5a3a1f">▥</Comp>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', left: '20px', bottom: '40px' }}>
                                <Comp label="USB PLUG" color="#111">🔌</Comp>
                            </div>
                            <Wire width="80px" top="155px" left="60px" rotate={0} active={veladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 3. VENTILADOR REVISADO */}
                <ProjectCard 
                    num="3" title="Ventilador CD Engineering" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Ventilador de alta velocidad usando un CD deformado como aspas aerodinámicas."
                    functioning={`🌀 AERODINÁMICA:
                    • Sustentación: El diseño del CD empuja el aire hacia adelante.
                    • Energía Cinética: 5000 RPM promedio.`}
                    materials={["Motor DC", "CD (Hélice)", "Cable USB", "Base Madera"]} 
                    instructions={["Paso 1: Corte y dobles del CD.", "Paso 2: Unión al eje motor.", "Paso 3: Pruebas de caudal."]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Turbina Axial / Motor 5V"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="MOTOR TALLER" color="#222">🔘</Comp>
                            <div style={{ position: 'absolute', top: '10px', fontSize: '7rem', opacity: 0.9, ... (ventiladorOn ? {animation: 'spin 0.15s linear infinite'} : {}) }}>💿</div>
                            <div style={{ width: '80px', height: '80px', background: 'saddlebrown', borderRadius: '5px', marginTop: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.6rem', color: '#fff' }}>MADERA</span>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', bottom: '60px' }}>
                                <Comp label="USB 5V" color="#111">🔌</Comp>
                            </div>
                            <Wire width="60px" top="100px" left="180px" rotate={45} active={ventiladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 4. VIBROBOT REVISADO */}
                <ProjectCard 
                    num="4" title="Araña Vibrobot Shaker" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Robot que camina por vibración usando una masa excéntrica reciclada."
                    functioning={`🕷️ VIBRACIÓN:
                    • Masa Excéntrica: Genera fuerza centrífuga por desbalance.
                    • Elasticidad: Las patas de alambre actúan como resortes.`}
                    materials={["Micro-motor", "Contrapeso", "Pila CR2032", "Alambres (Patas)"]} 
                    instructions={["Paso 1: Montaje de peso descentrado.", "Paso 2: Diseño de patas en trípode.", "Paso 3: Encendido por presión."]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Shaking Bot / Pila 3V"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={aranaMoving ? 'arana-moving' : ''} style={{ position: 'relative', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid #444' }}>
                                <Comp label="MOTOR" color="#111">⚙️</Comp>
                                <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '1rem', animation: aranaMoving ? 'jitter 0.1s infinite' : 'none' }}>⚖️</div>
                                <div style={{ position: 'absolute', top: '-15px', left: '10px' }}>
                                    <Comp label="PILA 3V" color="#333">🔘</Comp>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '50px', marginTop: '10px' }}>
                                <div style={{ width: '2px', height: '40px', background: '#555', transform: 'rotate(20deg)' }}></div>
                                <div style={{ width: '2px', height: '40px', background: '#555', transform: 'rotate(-20deg)' }}></div>
                            </div>
                            <span style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>PATAS ALAMBRE</span>
                        </div>
                    } 
                />

                {/* Projects 5-10 (保持之前的详细版本) */}
                <ProjectCard num="5" title="Amplificador TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Potencia de audio analógica." functioning="🔊 Ganancia: El chip multiplica la onda del celu." materials={["TDA 2005", "Disipador"]} instructions={["Gestión térmica.", "Prueba de sonido."]} simOn={ampActive} setSimOn={setAmpActive} simStatus={{info: "Audio 20W"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="PHONO">🔊</Comp></div>} />
                <ProjectCard num="6" title="Robot Autónomo Arduino" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Navegación por ultrasonido." functioning="🛰️ Radar Murciélago: Sonido que rebota." materials={["Arduino UNO", "Sensor HC-SR04"]} instructions={["Lógica IF/ELSE.", "Test de motor."]} simOn={evitaActive} setSimOn={setEvitaActive} simStatus={{info: "Auto-Pilot"}} simContent={<div style={{display:'flex',gap:'20px'}}><Comp label="ARDUINO">🟦</Comp><Comp label="EYES">👀</Comp></div>} />
                <ProjectCard num="7" title="Taller de Soldadura" videoId="v=J5Sb21qbpEQ" description="Metalurgia electrónica." functioning="🩹 Punto Eutéctico: Metal fundido a 183°C." materials={["Soldador", "Estaño"]} instructions={["Correcto calentamiento.", "Unión brillante."]} simOn={solderActive} setSimOn={setSolderActive} simStatus={{info: "350°C Tip"}} simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="TIP">🖍️</Comp><Comp label="PAD">📍</Comp></div>} />
                <ProjectCard num="8" title="Huerta Solar Smart" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" description="Sustentabilidad con Grow LEDs." functioning="🌿 Fotosíntesis Forzada: Luz azul y roja." materials={["Panel Solar", "Regulador", "Grow LEDs"]} instructions={["Cálculo de Ah.", "Configuración de luz."]} simOn={huertaActive} setSimOn={setHuertaActive} simStatus={{info: "Panel 12V High"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px'}}><Comp label="SOLAR">☀️</Comp><Comp label="PLANT">🌱</Comp></div>} />
                <ProjectCard num="9" title="Robot Sumo de Competición" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" description="Combate robótico estratégico." functioning="🚜 CoG Bajo: Estabilidad ante empuje." materials={["Arduino", "Sensores TCRT5000"]} instructions={["Modo búsqueda.", "Seguidor de línea."]} simOn={sumoActive} setSimOn={setSumoActive} simStatus={{info: "Dohyo Scan"}} simContent={<div style={{border:'3px solid #eee',borderRadius:'50%',padding:'20px'}}><Comp label="SUMO">🚜</Comp></div>} />
                <ProjectCard num="10" title="Robot Futbolista BT" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" description="Control deportivo por Bluetooth." functioning="⚽ Vectores: Suma de fuerzas motoras." materials={["Arduino + BT", "Motores 4x4"]} instructions={["Pareo Bluetooth.", "Calibrar patada."]} simOn={futbolActive} setSimOn={setFutbolActive} simStatus={{info: "Stadium Mode"}} simContent={<div style={{background:'#1b5e20',padding:'20px'}}><Comp label="PLAYER">🚜</Comp><div style={{marginTop:'10px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>SIMUTEC 2026 - MODELO EDUCATIVO DE INGENIERÍA SUSTENTABLE</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Preparando a los técnicos del mañana hoy.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

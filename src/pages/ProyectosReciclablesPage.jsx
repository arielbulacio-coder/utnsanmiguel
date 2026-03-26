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
    const Comp = ({ label, color = '#555', children }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <div style={{ background: color, borderRadius: '8px', padding: '10px', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', position: 'relative' }}>
                {children}
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#888', textTransform: 'uppercase' }}>{label}</span>
        </div>
    );

    const Wire = ({ width, top, left, rotate = 0, color = 'red' }) => (
        <div style={{ position: 'absolute', width: width, height: '3px', background: color, top: top, left: left, transform: `rotate(${rotate}deg)`, transformOrigin: '0 0', zIndex: 0, opacity: 0.8 }}></div>
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
                                <h3>🧠 Ciencia Avanzada (Para Genios 🦾)</h3>
                                <div className="theory-block" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line', background: 'rgba(0,10,20,0.7)', padding: '25px', borderRadius: '20px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.7', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)', color: '#eee' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Prototipo en Laboratorio</h3>
                                    <div className="img-container" style={{ borderRadius: '20px', border: '1px solid #444', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🗺️ Ingeniería y Conexiones</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#111', borderRadius: '15px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.7rem', padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Lista de Materiales (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.95rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Armado</h3>
                                <ol className="instructions-list" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#080808', borderRadius: '25px', border: '2px solid rgba(0,242,255,0.3)', minHeight: '380px', position: 'relative', overflow: 'hidden', padding: '20px' }}>
                                {simContent}
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative', marginTop: 'auto' }}>
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Finalizar Prueba' : '▶️ Arrancar Sistema'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA OPERATIVO <<<' : '>>> EN ESPERA <<<'}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '4rem' }}>
                            <h3>📺 Video Tutorial de Soporte</h3>
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
                <p style={{ fontSize: '1.4rem' }}>Laboratorio educativo de sistemas tecnológicos sustentables para el siglo XXI.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER */}
                <ProjectCard 
                    num="1" title="Robot Móvil Eco-Rover" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construcción de un vehículo autoportante para investigar la transformación de energía eléctrica en par motor mecánico."
                    functioning={`🔬 CIENCIA DEL MOVIMIENTO:
                    • El Motor Mágico (Torque): La corriente crea un campo magnético que interactúa con imanes fijos. Esta fuerza (Ley de Ampere) hace girar el eje.
                    • Neumáticos Sustentables: Usamos el coeficiente de fricción de las tapitas recicladas para maximizar el agarre al suelo.
                    • Eficiencia Energética: Analizamos cómo el peso de la botella influye en el consumo de las pilas.`}
                    materials={["Botella plástica", "2 Motores DC", "Pilas AA", "Tapitas (Ruedas)"]} 
                    instructions={["Paso 1: Montaje de motores en paralelo.", "Paso 2: Conexión de tracción directa.", "Paso 3: Test de polaridad diferencial."]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción por Motores DC"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Comp label="CHASIS BOTELLA" color="rgba(255,255,255,0.05)">
                                <div style={{ width: '150px', height: '60px', border: '2px dashed #444', borderRadius: '30px' }}></div>
                                <div style={{ position: 'absolute', top: '20px', left: '-30px', ... (robotMoving ? {animation: 'spin 0.2s linear infinite'} : {}) }}>🎡</div>
                                <div style={{ position: 'absolute', top: '20px', right: '-30px', ... (robotMoving ? {animation: 'spin 0.2s linear infinite'} : {}) }}>🎡</div>
                            </Comp>
                            <div style={{ position: 'absolute', bottom: '20px', left: '80px' }}>
                                <Comp label="BATERÍA 3V" color="#222">🔋</Comp>
                            </div>
                            <Wire width="60px" top="130px" left="100px" rotate={-30} color={robotMoving ? '#00f2ff' : '#444'} />
                            <Wire width="60px" top="130px" left="160px" rotate={-150} color={robotMoving ? '#00f2ff' : '#444'} />
                        </div>
                    } 
                />

                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED Cuántico" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de iluminación de estado sólido basada en el salto de electrones en semiconductores."
                    functioning={`🔌 FÍSICA ELECTRÓNICA:
                    • Efecto Fotón: Los electrones cruzan la unión P-N liberando energía lumínica.
                    • Ley de Ohm: La resistencia protege al LED limitando la intensidad de corriente (I = V/R).
                    • Desacople USB: Gestión de 5V DC estables.`}
                    materials={["LED alta potencia", "Resistencia 220Ω", "Cable USB reciclado"]} 
                    instructions={["Paso 1: Soldadura de resistencia limitadora.", "Paso 2: Aislación térmica de bornes.", "Paso 3: Montaje en reflector CD."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Iluminación por Semiconductores"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center' }}>
                            <Comp label="ENTRADA USB" color="#111">🔌 5V</Comp>
                            <Comp label="RESISTENCIA" color="#5a3a1f">▥▥</Comp>
                            <Comp label="DIODO LED" color={veladorOn ? 'rgba(255,255,0,0.2)' : '#222'}>
                                <div style={{ fontSize: '3rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 40px yellow' : 'none' }}>💡</div>
                            </Comp>
                            <Wire width="50px" top="100px" left="80px" color={veladorOn ? '#00f2ff' : '#444'} />
                            <Wire width="50px" top="100px" left="160px" color={veladorOn ? '#00f2ff' : '#444'} />
                        </div>
                    } 
                />

                {/* 3. VENTILADOR */}
                <ProjectCard 
                    num="3" title="Ventilador Aerodinámico USB" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Estudio de la mecánica de fluidos y el ángulo de ataque en superficies alares (CD)."
                    functioning={`🌀 AERODINÁMICA APLICADA:
                    • Presión Diferencial: Al girar, la paleta crea una zona de baja presión que succiona el aire.
                    • Transferencia Térmica: El flujo de aire acelera la evaporación (convección forzada).`}
                    materials={["Motor DC", "CD reciclado", "Base estable", "Switch USB"]} 
                    instructions={["Paso 1: Deformación térmica de paletas.", "Paso 2: Equilibrado dinámico de hélice.", "Paso 3: Test de caudal de aire."]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Soplador Tangencial"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Comp label="MOTOR DC" color="#333">🔘</Comp>
                            <div style={{ position: 'absolute', fontSize: '6rem', opacity: 0.8, animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none' }}>🌀</div>
                            <div style={{ position: 'absolute', bottom: '10px' }}>
                                <Comp label="ENERGÍA USB" color="#111">🔌 5V</Comp>
                            </div>
                            <Wire width="80px" top="110px" left="140px" rotate={90} color={ventiladorOn ? '#00f2ff' : '#444'} />
                        </div>
                    } 
                />

                {/* 4. VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Robot Vibrobot" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Análisis de movimiento inercial mediante el uso de masa excéntrica o 'desbalance controlado'."
                    functioning={`🕷️ MECÁNICA VIBRATORIA:
                    • Fuerza Centrífuga: El peso descentrado genera saltos microscópicos.
                    • Vector de Empuje: Las patas inclinadas convierten la vibración en avance.`}
                    materials={["Micro-motor", "Pesito excéntrico", "Pila botón 3V"]} 
                    instructions={["Paso 1: Calibración de patas elásticas.", "Paso 2: Instalación de masa desbalanceada.", "Paso 3: Ajuste de paso cinético."]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Locomoción por Vibración"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '180px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                            <Comp label="PILA 3V" color="#555">💿</Comp>
                            <div className={aranaMoving ? 'arana-moving' : ''}>
                                <Comp label="MOTOR" color="#333">
                                    ⚙️<div style={{ position: 'absolute', right: '-10px', top: '5px', fontSize: '0.8rem' }}>⚖️</div>
                                </Comp>
                            </div>
                            <Wire width="60px" top="90px" left="110px" color={aranaMoving ? '#f0f' : '#444'} />
                            <div style={{ position: 'absolute', bottom: '20px', fontSize: '3rem', opacity: 0.3 }}>🕷️</div>
                        </div>
                    } 
                />

                {/* 5. AMPLIFICADOR */}
                <ProjectCard 
                    num="5" title="Amplificador TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" 
                    description="Ingeniería de señales de audio y amplificación de potencia analógica (Clase AB)."
                    functioning={`🔊 ELECTRÓNICA DE AUDIO:
                    • Ganancia: El chip multiplica la amplitud de la onda sonora original.
                    • Impedancia: Relación de carga entre la salida y el parlante (4/8 Ohm).`}
                    materials={["Chip TDA 2005", "Disipador aluminio", "Capacitores filtro"]} 
                    instructions={["Paso 1: Gestión térmica (Disipador).", "Paso 2: Esquema de filtrado de rizado.", "Paso 3: Prueba de fidelidad sonora."]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simStatus={{info: "Audio Amp 20W Peak"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '220px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
                            <Comp label="CHIP TDA" color="#111">🔳</Comp>
                            <Comp label="DISIPADOR" color="#777">〓〓</Comp>
                            <Comp label="CAPACITOR" color="#005">🥛</Comp>
                            <Comp label="PARLANTE" color="#222">
                                <div style={{ fontSize: '3rem', transform: ampActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s' }}>🔊</div>
                            </Comp>
                            <Wire width="100%" top="50px" left="0" color="#444" />
                        </div>
                    } 
                />

                {/* 6. EVITA OBSTACULOS */}
                <ProjectCard 
                    num="6" title="Robot Autónomo Arduino" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" 
                    description="Sistemas de navegación basados en el tiempo de vuelo de ondas ultrasónicas."
                    functioning={`🛰️ INTELIGENCIA ARTIFICIAL BÁSICA:
                    • Sonar: El sensor emite un pulso y mide cuándo vuelve. (D = T x V_sonido / 2).
                    • Lógica Binaria: Toma de decisiones via código Arduino.`}
                    materials={["Arduino UNO", "Sensor HC-SR04", "Ruedas/Motores", "Puente H"]} 
                    instructions={["Paso 1: Calibración de eco ultrasónico.", "Paso 2: Código de evasión de colisión.", "Paso 3: Gestión de latencia de cómputo."]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simStatus={{info: "Control Autónomo (Sonar)"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <Comp label="ARDUINO" color="#005a62">🟦</Comp>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Comp label="SENSOR ECO" color="#111">👀</Comp>
                                <Comp label="BATERIA 9V" color="#222">🔋</Comp>
                            </div>
                            {evitaActive && <div style={{ position: 'absolute', top: '100px', fontSize: '1rem', color: '#00f2ff', animation: 'jitter 0.5s infinite alternate' }}>(( 📡 ))</div>}
                            <div style={{ position: 'absolute', bottom: '10px', fontSize: '3.5rem' }}>🚜</div>
                        </div>
                    } 
                />

                {/* 7. SOLDADURA */}
                <ProjectCard 
                    num="7" title="Taller de Soldadura Pro" videoId="v=J5Sb21qbpEQ" 
                    description="Metalurgia de unión mediante aleaciones de estaño-plomo o estaño puro (Lead-Free)."
                    functioning={`🩹 CIENCIA DE MATERIALES:
                    • Transferencia Térmica: El soldador calienta el cobre y la pata por conducción.
                    • Capilaridad: La soldadura fluye sola buscando mojar las superficies.`}
                    materials={["Soldador tipo lápiz", "Estaño", "Placa Perfboard"]} 
                    instructions={["Paso 1: Limpieza de punta galvánica.", "Paso 2: Creación de unión intermetálica.", "Paso 3: Test de continuidad eléctrica."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ OK' }, { url: '/proj_soldadura_error.png', label: '❌ ERROR' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simStatus={{info: "Fusión Superficial"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                            <Comp label="SOLDADOR" color="#111">
                                <div style={{ fontSize: '3.5rem', transform: solderActive ? 'rotate(-15deg)' : 'none', transition: 'all 0.5s' }}>🖍️</div>
                            </Comp>
                            <div style={{ padding: '20px', border: '5px solid #2e7d32', borderRadius: '50%', background: solderActive ? 'rgba(0,255,0,0.1)' : 'transparent' }}>
                                <Comp label="UNIÓN PCB" color="#2e7d32">📍</Comp>
                            </div>
                            {solderActive && <div style={{ position: 'absolute', right: '50px', top: '50px', color: '#888', fontStyle: 'italic' }}>💨 (Humo flux)</div>}
                        </div>
                    } 
                />

                {/* 8. HUERTA SOLAR */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar Smart" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Sistema bioclimático automatizado para estudio de fotosíntesis forzada bajo espectro artificial."
                    functioning={`🌿 ECO-INGENIERÍA:
                    • Fotovoltaica: Los fotones se convierten en electrones libres.
                    • Biocultura: Usamos luz PAR (Azul/Rojo) para acelerar el metabolismo vegetal.`}
                    materials={["Panel Solar", "Regulador", "Batería", "Grow LEDs"]} 
                    instructions={["Paso 1: Instalación de red off-grid.", "Paso 2: Programación de ciclos de luz.", "Paso 3: Monitoreo de crecimiento mitótico."]} 
                    imageSrc={[{ url: '/proj_huerta_schem.png', label: '📑 Logica' }, { url: '/proj_huerta_wire.png', label: '🔌 Cables' }]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Gestión Energética Solar"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '250px', background: isDay ? '#1a1a1a' : '#050515', borderRadius: '25px', padding: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <Comp label="PANEL SOLAR" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="REGULADOR" color="#111">📟 {isDay ? '⚡' : '🔋'}</Comp>
                                <Comp label="BATERÍA" color="#222">🔋</Comp>
                                <Comp label="GROW LIGHTS" color="#111">
                                    <div style={{ color: !isDay && huertaActive ? '#f0f' : '#444' }}>🟣🟣</div>
                                </Comp>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize: '3rem' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO */}
                <ProjectCard 
                    num="9" title="Robot Sumo de Competición" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" 
                    description="Diseño robótico para combate deportivo basado en el equilibrio total y la detección infrarroja de perímetros."
                    functioning={`🚜 ESTRATEGIA MECÁNICA:
                    • CoG Bajo: Mantiene el robot estable ante empujes laterales.
                    • Reflexión IR: El sensor TCRT5000 detecta el cambio de blanco a negro en el borde.`}
                    materials={["Arduino", "Sensores TCRT5000", "Motores Torque", "Pala Metal"]} 
                    instructions={["Paso 1: Implementación de modo búsqueda.", "Paso 2: Calibración de reflectancia de piso.", "Paso 3: Test de fuerza de arrastre nominal."]} 
                    simOn={sumoActive} setSimOn={setSumoActive} 
                    simStatus={{info: "Modo Combate (Seek & Destroy)"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '200px', border: '5px solid #eee', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className={sumoActive ? 'moving' : ''}>
                                <Comp label="SUMO BOT" color="#222">
                                    🚜
                                    <div style={{ position: 'absolute', bottom: '-15px', display: 'flex', gap: '10px' }}>
                                        <div style={{ color: sumoActive ? 'red' : '#444' }}>👁️</div>
                                        <div style={{ color: sumoActive ? 'red' : '#444' }}>👁️</div>
                                    </div>
                                </Comp>
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                                <Comp label="CPU ARDUINO" color="#005">🟦</Comp>
                            </div>
                        </div>
                    } 
                />

                {/* 10. ROBOT FUTBOL */}
                <ProjectCard 
                    num="10" title="Robot Futbolista BT" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" 
                    description="Desarrollo de sistemas radio-controlados mediante protocolo Bluetooth para coordinación deportiva robótica."
                    functioning={`⚽ TELEMETRÍA Y CONTROL:
                    • UART Protocol: El robot traduce comandos seriales del celular en trayectorias.
                    • Servomécanica: Uso de actuadores de posición para el tiro a gol.`}
                    materials={["Arduino + HC-05", "Joystick App", "Motores 4x4", "Servo Pateador"]} 
                    instructions={["Paso 1: Vínculo serial Bluetooth.", "Paso 2: Programación de vectores de tracción.", "Paso 3: Calibración de fuerza de pateo."]} 
                    simOn={futbolActive} setSimOn={setFutbolActive} 
                    simStatus={{info: "Control Radiofrecuencia (BT)"}}
                    simContent={
                        <div style={{ position: 'relative', width: '280px', height: '220px', background: '#2e7d32', border: '2px solid #fff', borderRadius: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px' }}>
                                <Comp label="BT HC-05" color={futbolActive ? '#00f' : '#222'}>📡</Comp>
                                <Comp label="ARDUINO" color="#005">🟦</Comp>
                                <Comp label="SERVO PATADA" color="#555">📐</Comp>
                                <div className={futbolActive ? 'arana-moving' : ''}>
                                    <Comp label="PITCHER BOT" color="#111">🚜</Comp>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '15px', right: '40px', fontSize: '1.5rem', animation: futbolActive ? 'jitter 0.5s infinite' : 'none' }}>⚽</div>
                        </div>
                    } 
                />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>SIMUTEC 2026 - MODELO EDUCATIVO DE INGENIERÍA SUSTENTABLE</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>© SimonTec.com.ar - Preparando a los técnicos del mañana.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

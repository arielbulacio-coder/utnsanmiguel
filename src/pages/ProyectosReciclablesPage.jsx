import React, { useState, useEffect } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
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

    useEffect(() => {
        let interval;
        if (huertaActive) {
            interval = setInterval(() => {
                setIsDay(prev => !prev);
            }, 7000);
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

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num, children }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🚀 El Desafío del Inventor</h3>
                        <p style={{ fontSize: '1.02rem', lineHeight: '1.6' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            {functioning && (
                                <div className="proyecto-section theory-section">
                                    <h3>🧠 El Rincón de la Ciencia (Para Genios 🦾)</h3>
                                    <div className="theory-block" style={{ fontSize: '0.86rem', whiteSpace: 'pre-line', background: 'rgba(0,12,24,0.6)', padding: '22px', borderRadius: '15px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.6', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Foto del Prototipo Real</h3>
                                    <div className="img-container" style={{ borderRadius: '15px', border: '1px solid #333', overflow: 'hidden' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section highlight-gallery">
                                    <h3>🗺️ Planos y Guía de Conexión</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} className="gallery-item-full" style={{ background: '#111', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.72rem', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Lista de Materiales (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Hoja de Ruta (Construcción)</h3>
                                <ol className="instructions-list" style={{ fontSize: '0.92rem', lineHeight: '1.6', paddingLeft: '1.1rem' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '8px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '25px', border: '1px solid rgba(0,242,255,0.3)', minHeight: '280px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Detener Práctica' : '▶️ Probar Mecanismo'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '0.95rem', marginTop: '12px', fontWeight: 'bold' }}>
                                        {simOn ? 'ESTADO: SISTEMA ACTIVO ✔️' : 'ESTADO: STANDBY (ESPERANDO) ⏳'}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '3rem' }}>
                            <h3>📺 Video Tutorial (¡Seguí los pasos!)</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>
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
                <h1 style={{ fontSize: '2.8rem', fontWeight: '900' }}>🔬 SIMUTEC: INVENTORES DEL FUTURO</h1>
                <p style={{ fontSize: '1.3rem' }}>Aprendé ingeniería, electrónica y robótica creando tus propios prototipos del mundo real.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* Projects 1-8 (Condensed theory representation based on 13yo styles) */}
                <ProjectCard num="1" title="Robot Móvil Eco-Rover" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" description="Creamos un robot que corre usando una botella. Teoría: Motores magnéticos y rozamiento." functioning="🔬 El Motor Mágico (Electromagnetismo): El motor gira cuando la electricidad crea imanes invisibles adentro." materials={["Motor DC", "Botella", "Pilas"]} instructions={["Alinear tapitas", "Cableado en paralelo"]} simOn={robotMoving} setSimOn={setRobotMoving} simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4rem'}}>🤖</div>} simStatus={{on:"Motor en avance",off:"Apagado"}} />
                
                <ProjectCard num="2" title="Velador LED Cuántico" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" description="Luces que no gastan nada. Teoría: Semiconductores y fotones." functioning="🔌 Corazón del LED: Los electrones saltan en el chip y sueltan luz." materials={["LED", "Resistencia", "Cable USB"]} instructions={["Calcular resistencia", "Soldar patas"]} simOn={veladorOn} setSimOn={setVeladorOn} simContent={<div style={{fontSize:'4rem', color: veladorOn ? 'yellow' : '#444'}}>💡</div>} simStatus={{on:"Emisión de luz activa",off:"Diodo en pausa"}} />

                {/* (... omitting others for brevity to focus on new 9 & 10 ...) */}
                <ProjectCard num="3" title="Ventilador de Verano" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" description="Aerodinámica con CDs." functioning="🌀 Efecto Bernoulli: La hélice empuja el aire." materials={["Motor", "CD"]} instructions={["Doblar aspas", "Conectar USB"]} simOn={ventiladorOn} setSimOn={setVentiladorOn} simContent={<div style={{fontSize:'4.5rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} simStatus={{on:"Corriente de aire",off:"Estático"}} />
                <ProjectCard num="4" title="Araña Vibratoria" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" description="Movimiento por desbalance." functioning="🕷️ Física de Vibración: Un peso torcido hace saltar al robot." materials={["Motor", "Alambre"]} instructions={["Geometría de patas", "Contrapeso"]} simOn={aranaMoving} setSimOn={setAranaMoving} simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4.5rem'}}>🕷️</div>} simStatus={{on:"Salto cinético",off:"Reposo"}} />
                <ProjectCard num="5" title="Amplificador Clase AB" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Tu equipo de música casero." functioning="🔊 Potencia de Audio: El chip agranda la onda del celu." materials={["TDA 2005", "Disipador"]} instructions={["Montar aluminio", "Capacitores"]} simOn={ampActive} setSimOn={setAmpActive} simContent={<div style={{fontSize:'4.5rem', transform: ampActive ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.1s'}}>🔊</div>} simStatus={{ on: "Ganancia sonora (+dB)", off: "Silencio" }} />
                <ProjectCard num="6" title="Robot Evita Obstáculos" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Navegación inteligente Arduino." functioning="🛰️ Radar Murciélago: Sonido que rebota para ver paredes." materials={["Arduino", "Sensor Ultra", "Drivers"]} instructions={["Calibrar Echo", "Programar IF/ELSE"]} simOn={evitaActive} setSimOn={setEvitaActive} simContent={<div style={{fontSize:'3.5rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} simStatus={{ on: "Exploración autónoma", off: "Cortex Offline" }} />
                <ProjectCard num="7" title="Taller de Soldadura" videoId="v=J5Sb21qbpEQ" description="Metalurgia en miniatura." functioning="🩹 Punto Eutéctico: Metal que se funde a 183°C para unir pistas." materials={["Soldador", "Estaño"]} instructions={["Temperatura ideal", "Cono brillante"]} imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ OK' }, { url: '/proj_soldadura_error.png', label: '❌ ERROR' }]} simOn={solderActive} setSimOn={setSolderActive} simContent={<div style={{fontSize:'4.5rem'}}>🩹</div>} simStatus={{ on: "Bunta a 350°C", off: "Frío" }} />
                <ProjectCard num="8" title="Huerta Solar Inteligente" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" description="Controlando la fotosíntesis con el sol." functioning="🌿 Ciencia Biótica: Las plantas aman el azul y rojo." materials={["Panel Solar", "Grow LEDs"]} instructions={["Orientación Norte", "Riego Automático"]} imageSrc={[{ url: '/proj_huerta_schem.png', label: '📑 Logica' }, { url: '/proj_huerta_wire.png', label: '🔌 Cables' }]} simOn={huertaActive} setSimOn={setHuertaActive} simContent={<div style={{ position: 'relative', width: '220px', height: '160px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '20px', transition: 'background 2s linear', overflow: 'hidden' }}> <div style={{ position: 'absolute', width: '30px', height: '30px', background: isDay ? 'yellow' : '#fff', borderRadius: '50%', left: '150px', top: isDay ? '10px' : '30px', boxShadow: isDay ? '0 0 30px yellow' : '0 0 15px #fff', transition: 'all 2.5s ease' }}></div> {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '70px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.3), transparent)', top: '40px' }}></div>} <div style={{ position: 'absolute', bottom: '15px', left: '20px', display: 'flex', gap: '8px' }}> {[1,2,3].map(i=><div key={i} style={{width:'20px',height: huertaActive && !isDay ? '45px' : '25px', background:'#2e7d32', borderRadius:'10px 10px 0 0', transition:'height 3s ease' }}></div>)} </div> </div>} simStatus={{ on: isDay ? "Panel cargando... ☀️" : "Grow LEDs ON 💜", off: "Inactivo" }} />

                {/* 9. ROBOT SUMO */}
                <ProjectCard 
                    num="9"
                    title="Robot SUMO: Estrategia y Fuerza"
                    imageSrc="/proj_sumo.png"
                    videoId="a_A5uC6_QpY" 
                    description="¿Tu robot es lo suficientemente fuerte para empujar a su oponente fuera del círculo? Aprenderemos sobre equilibrio, sensores de piso y máxima potencia de empuje."
                    functioning={`🧠 LA CIENCIA DE LA LUCHA (MECÁNICA):
                    • Centro de Gravedad (CoG): Si tu robot es alto, se cae fácil. Tenemos que hacerlo bajo y pesado para que sea imposible de volcar.
                    • Sensores de Línea (IR): Usamos 'ojos infrarrojos' (TCRT5000) que miran al piso. Si detectan el borde blanco del círculo, ¡el robot da marcha atrás para no caerse!
                    • Coeficiente de Fricción: Usamos gomas con mucho agarre. Si las ruedas patinan, perdés la fuerza de empuje. ¡Física pura frente al rival!`}
                    materials={[
                        "Cerebro Arduino UNO",
                        "2 Sensores Infrarrojos (seguidores de línea)",
                        "Sensor Ultrasonido (para buscar al oponente)",
                        "2 Motores de torque alto (con reductores)",
                        "Pala frontal de metal o plástico rígido",
                        "Batería Li-Po de 7.4V"
                    ]}
                    instructions={[
                        "Paso 1: Construí un chasis compacto y pesado. ¡Cuanto más pese, más difícil es moverlo!",
                        "Paso 2: Poné la pala bien pegada al piso para que el otro robot no pueda meterse debajo de vos.",
                        "Paso 3: Programá los sensores infrarrojos para que cuando vean el color blanco del borde, frenen los motores.",
                        "Paso 4: ¡Entrená tu robot y desafiá a un compañero!"
                    ]}
                    simOn={sumoActive}
                    setSimOn={setSumoActive}
                    simContent={
                        <div style={{ position: 'relative', width: '220px', height: '160px', background: '#222', borderRadius: '50%', border: '8px solid #eee', overflow: 'hidden' }}>
                            <div className={sumoActive ? 'moving' : ''} style={{ position: 'absolute', left: '80px', top: '60px', fontSize: '3rem', filter: 'drop-shadow(0 0 10px red)' }}>🚜</div>
                            {sumoActive && <div style={{ position: 'absolute', right: '10px', bottom: '10px', fontSize: '0.6rem', color: '#00f2ff' }}>DETECTANDO RIVAL...</div>}
                        </div>
                    }
                    simStatus={{ on: "MODO ATAQUE: Escaneando Dohyo", off: "Fuera de combate" }}
                />

                {/* 10. ROBOT FÚTBOL */}
                <ProjectCard 
                    num="10"
                    title="Robot Futbolista: Control y Puntería"
                    imageSrc="/proj_futbol.png"
                    videoId="pIkTWh2V0Yw" 
                    description="¡Gritá un gol tecnológico! Vamos a crear un robot controlado por Bluetooth desde tu celular que sea capaz de llevar una pelota y patear al arco."
                    functioning={`⚽ FÍSICA DEL DEPORTE (CONTROL):
                    • Vectores de Movimiento: El robot se mueve sumando fuerzas. Adelante + Derecha = ¡Diagonal! Aprendemos a controlar cada motor por separado.
                    • Comunicación Bluetooth: Usamos una antena (HC-05) que recibe señales de radio desde tu teléfono. ¡Es como un control remoto invisible!
                    • Mecanismo de Golpe: Si usamos un servomotor, podemos crear un 'pateador' que libere energía elástica sobre la pelota.`}
                    materials={[
                        "Placa Arduino y Bluetooth HC-05",
                        "App de Control en el celular",
                        "Chasis liviano y veloz",
                        "Pala o 'cuchara' para llevar la pelota",
                        "Servomotor (para el mecanismo de patada)",
                        "4 Motores (Tracción 4x4)"
                    ]}
                    instructions={[
                        "Paso 1: Armá el chasis 'perfil bajo' para que la pelota se quede con vos y no se escape.",
                        "Paso 2: Conectá el módulo Bluetooth a los pines RX y TX del Arduino.",
                        "Paso 3: Usá una App de joystick en el celu para mandarle letras (W, A, S, D) al robot.",
                        "Paso 4: ¡Organizá un partido 2 vs 2 y poné a prueba tu puntería!"
                    ]}
                    simOn={futbolActive}
                    setSimOn={setFutbolActive}
                    simContent={
                        <div style={{ position: 'relative', width: '220px', height: '160px', background: '#1b5e20', borderRadius: '15px', border: '2px solid #fff', overflow: 'hidden' }}>
                           <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#fff', top: '80px' }}></div>
                           <div style={{ position: 'absolute', width: '40px', height: '40px', border: '2px solid #fff', borderRadius: '50%', left: '90px', top: '60px' }}></div>
                           <div className={futbolActive ? 'arana-moving' : ''} style={{ position: 'absolute', left: '30px', top: '70px', fontSize: '2.5rem' }}>🚜</div>
                           <div className={futbolActive ? 'moving' : ''} style={{ position: 'absolute', left: '140px', top: '75px', fontSize: '1.5rem' }}>⚽</div>
                        </div>
                    }
                    simStatus={{ on: "VÍNCULO BT OK: Dominio de pelota", off: "Desconectado" }}
                />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: '2px' }}>SIMUTEC 2026 - ¡EL LABORATORIO DE TUS SUEÑOS!</p>
                <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>Proyecto educativo integral de ciencia e ingeniería aplicada.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

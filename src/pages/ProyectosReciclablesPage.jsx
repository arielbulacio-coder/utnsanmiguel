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
    
    // Day/Night state for Garden
    const [isDay, setIsDay] = useState(true);
    
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

    // Garden Cycle Logic
    useEffect(() => {
        let interval;
        if (huertaActive) {
            interval = setInterval(() => {
                setIsDay(prev => !prev);
            }, 5000);
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
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section">
                                <h3>📋 Descripción General</h3>
                                <p>{description}</p>
                            </div>

                            {functioning && (
                                <div className="proyecto-section">
                                    <h3>🧪 Documentación Técnica y Científica</h3>
                                    <div style={{ fontStyle: 'italic', fontSize: '0.9rem', whiteSpace: 'pre-line', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', borderLeft: '3px solid var(--primary-color)' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🚀 Prototipo Sugerido</h3>
                                    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            <div className="proyecto-section">
                                <h3>🛠️ BOM (Lista de Componentes)</h3>
                                <div className="materials-list">
                                    <ul>
                                        {materials.map((mat, i) => <li key={i}>{mat}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>⚙️ Ejecución de la Práctica</h3>
                                <ol className="instructions-list">
                                    {instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#0a0a0a', minHeight: '250px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? 'Detener Simulación' : 'Iniciar Experimento'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`}>
                                        {simOn ? 'ACTIVE: ' + simStatus.on : 'IDLE: ' + simStatus.off}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '2rem' }}>
                            <h3>📺 Video Guía y Soporte</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
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
            <header className="proyectos-header">
                <h1>🔌 Robótica, Eco-Tecnología y STEAM</h1>
                <p>Proyectos integradores para un futuro sustentable. Ciencia aplicada a la realidad.</p>
            </header>

            <div className="proyecto-grid">
                
                <ProjectCard num="1" title="Robot Móvil Simple" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" description="Robot básico con botella." materials={["Botella", "Motores", "Pilas"]} instructions={["Perforar tapas", "Pegar motores"]} simOn={robotMoving} setSimOn={setRobotMoving} simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4rem'}}>🤖</div>} simStatus={{on:"Avance lineal",off:"Parado"}} />
                
                <ProjectCard num="2" title="Velador LED" imageSrc="/proj_velador.png" videoId="-BIs-z5g7tY" description="Lámpara reciclada." materials={["Lata", "LED", "CD"]} instructions={["Armar base", "Soldar LED"]} simOn={veladorOn} setSimOn={setVeladorOn} simContent={<div style={{fontSize:'4rem', color: veladorOn ? 'yellow' : '#444'}}>💡</div>} simStatus={{on:"Luz emitida",off:"Apagado"}} />

                <ProjectCard num="3" title="Ventilador Personal" imageSrc="/proj_ventilador.png" videoId="YqXf8zXW77A" description="Motor + Aspas CD." materials={["Motor", "CD", "Soporte"]} instructions={["Cortar CD", "Fijar motor"]} simOn={ventiladorOn} setSimOn={setVentiladorOn} simContent={<div style={{fontSize:'4rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} simStatus={{on:"Aire fluyendo",off:"Estático"}} />

                <ProjectCard num="4" title="Araña Vibrobot" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" description="Movimiento por vibración." materials={["Motor vibrador", "Pila botón"]} instructions={["Montar motor", "Poner patas"]} simOn={aranaMoving} setSimOn={setAranaMoving} simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4rem'}}>🕷️</div>} simStatus={{on:"Vibración",off:"Sueño"}} />

                <ProjectCard num="5" title="Amplificador TDA 2005" imageSrc="/proj_amp.png" videoId="5VIda0n8t-E" description="Audio Hi-Fi 20W." materials={["TDA 2005", "Disipador", "Módulo BT"]} instructions={["Montar disipador", "Cablear TDA"]} simOn={ampActive} setSimOn={setAmpActive} simContent={<div style={{fontSize:'4rem', transform: ampActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s'}}>🔊</div>} simStatus={{ on: "Reproduciendo", off: "Silencio" }} />

                <ProjectCard num="6" title="Robot Evita Obstáculos" imageSrc="/proj_evita.png" videoId="3oA-O9H-8Rk" description="Robot autónomo Arduino." functioning="Lógica: ¿Distancia < 10cm? → Girar." materials={["Arduino UNO", "Motores", "Sensor Ultrasonido", "L298N"]} instructions={["Conectar Sensor", "Driver L298N", "Programar mBlock"]} simOn={evitaActive} setSimOn={setEvitaActive} simContent={<div style={{fontSize:'3rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} simStatus={{ on: "Buscando camino", off: "Parado" }} />

                <ProjectCard num="7" title="Taller de Soldadura" videoId="J5Sb21qbpEQ" description="Soldadura profesional." materials={["Soldador", "Estaño", "Perfboard"]} instructions={["Limpiar punta", "Calentar unión", "Aplicar estaño"]} imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ OK' }, { url: '/proj_soldadura_error.png', label: '❌ ERROR' }]} simOn={solderActive} setSimOn={setSolderActive} simContent={<div style={{fontSize:'4rem'}}>🩹</div>} simStatus={{ on: "Soldando", off: "Frío" }} />

                {/* 8. HUERTA SOLAR INTELIGENTE - EXPANDED */}
                <ProjectCard 
                    num="8"
                    title="Huerta Solar: Fotobiología e Ingeniería Sustentable"
                    imageSrc="/proj_huerta.png"
                    videoId="Yf0BvGf7oXY" 
                    description="Desarrollo de un ecosistema de cultivo tecnificado que optimiza los ciclos de crecimiento vegetal mediante energía fotovoltaica e iluminación LED de espectro selectivo."
                    functioning={`🔬 FUNDAMENTOS CIENTÍFICOS:
                    • Espectro de Absorción: Las plantas no aprovechan toda la luz blanca. La Clorofila A y B tienen picos de absorción en el Azul (430-450nm - crecimiento estructural) y Rojo (640-680nm - floración y expansión foliar). Los Grow LEDs emiten exactamente estas longitudes de onda (espectro purpúra), evitando desperdiciar energía en el verde (que la planta refleja).
                    • Fotoperíodo Forzado: Al extender artificialmente las horas de luz tras el ocaso, se reduce el tiempo de cosecha hasta en un 30%, manteniendo activa la fase lumínica de la fotosíntesis.
                    
                    ⚡ INGENIERÍA ENERGÉTICA:
                    • Conversión Fotovoltaica: El panel utiliza el efecto fotoeléctrico en celdas de silicio para generar una diferencia de potencial.
                    • Eficiencia del Sistema: P(W) = V(V) x I(A). Calculamos la autonomía de la batería Ah para alimentar los LEDs durante 4-6 horas nocturnas sin degradar la celda química.
                    • Huella Verde: Por cada kW generado solarmente, se evita la emisión de aproximadamente 0.4kg de CO2 a la atmósfera.`}
                    materials={[
                        "Panel Solar Monocristalino (12V/10W)",
                        "Leds Grow High-Power (Espectro Red+Blue 3:1)",
                        "Regulador de Carga MPPT o PWM",
                        "Batería LiFePO4 o Plomo-Ácido (12V 7Ah)",
                        "Sensores de Humedad de suelo (Higrómetros)",
                        "Contenedor de Madera (Pino reciclado) o PVC Hydro"
                    ]}
                    instructions={[
                        "Cálculo Energético: Mide la corriente de cortocircuito del panel al sol del mediodía.",
                        "Estructura: Arma el cajón asegurando drenaje y aislamiento de los componentes eléctricos.",
                        "Circuito: Conecta el panel al regulador, y este a la batería. Une la tira LED a la salida controlada.",
                        "Calibración Lumínica: Asegura un índice de 12,000 a 15,000 Lux sobre la superficie de las hojas enviando los LEDs Grow.",
                        "Monitoreo: Registra la altura de la planta vs. un grupo de control sin LEDs para obtener datos estadísticos."
                    ]}
                    simOn={huertaActive}
                    setSimOn={setHuertaActive}
                    simContent={
                        <div style={{ position: 'relative', width: '200px', height: '150px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '15px', transition: 'background 2s linear', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', width: '40px', height: '40px', background: isDay ? 'yellow' : '#eee', borderRadius: '50%', left: '140px', top: isDay ? '20px' : '30px', boxShadow: isDay ? '0 0 20px yellow' : '0 0 10px #fff', transition: 'all 2s ease' }}></div>
                            {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '60px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.4), transparent)', top: '40px' }}></div>}
                            <div style={{ position: 'absolute', bottom: '10px', left: '20px', display: 'flex', gap: '5px' }}>
                                {[1,2,3].map(i=><div key={i} style={{width:'20px',height: huertaActive && !isDay ? '45px' : '25px', background:'#2e7d32', borderRadius:'10px 10px 0 0', transition:'height 2s ease' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: isDay ? "ACUMULANDO ENERGÍA SOLAR (Charging...)" : "FOTOSÍNTESIS NOCTURNA ACTIVA (Grow ON)", off: "Laboratorio en espera" }}
                >
                    <div className="proyecto-section" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <h4 style={{ color: 'var(--primary-color)' }}>🔬 Módulo STEAM Integrador</h4>
                        <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                            <p><strong>Naturales:</strong> Análisis del proceso de fotolisis del agua y fijación de CO2.</p>
                            <p><strong>Física:</strong> Ley de Ohm y espectro electromagnético visible (longitudes de onda en nanómetros).</p>
                            <p><strong>Matemática:</strong> Cálculo de áreas foliares y progresiones geométricas del crecimiento vegetal.</p>
                            <p><strong>Valores:</strong> Sustentabilidad, soberanía alimentaria y reducción de residuos tecnológicos.</p>
                        </div>
                    </div>
                </ProjectCard>

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '4rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Tecnología por un Planeta Sustentable.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

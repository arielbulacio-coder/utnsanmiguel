import React, { useState } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    const [robotMoving, setRobotMoving] = useState(false);
    const [veladorOn, setVeladorOn] = useState(false);
    const [ventiladorOn, setVentiladorOn] = useState(false);
    const [aranaMoving, setAranaMoving] = useState(false);
    const [ampActive, setAmpActive] = useState(false);

    // Helper to handle image paths with possible base URL
    const getImagePath = (path) => {
        const base = import.meta.env.BASE_URL || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
    };

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
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
                                    <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>{functioning}</p>
                                </div>
                            )}

                            <div className="proyecto-section">
                                <h3>🚀 Prototipo Sugerido (Diseño IA)</h3>
                                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={getImagePath(imageSrc)} 
                                        alt={title} 
                                        style={{ width: '100%', display: 'block' }} 
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div style={{ display: 'none', padding: '2rem', textAlign: 'center', color: '#555' }}>
                                        <p style={{ fontSize: '2rem' }}>🖼️</p>
                                        <p>No se pudo cargar la imagen: {imageSrc}</p>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        background: 'rgba(0,0,0,0.8)',
                                        color: '#00f2ff',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.65rem'
                                    }}>
                                        Diseño Conceptual IA
                                    </div>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>🛠️ Materiales Requeridos</h3>
                                <div className="materials-list">
                                    <ul>
                                        {materials.map((mat, i) => <li key={i}>{mat}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>⚙️ Instrucciones de Armado</h3>
                                <ol className="instructions-list">
                                    {instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#0a0a0a' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? 'Detener' : 'Activar Simulación'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`}>
                                        {simOn ? '>>> CIRCUIT CLOSED: ' + simStatus.on : '>>> CIRCUIT OPEN: ' + simStatus.off}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="proyecto-section" style={{ marginTop: '2rem' }}>
                        <h3>📺 Video Guía (YouTube)</h3>
                        <div className="video-container">
                            <iframe 
                                title={title}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
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
                <h1>🔌 Robótica y Proyectos Reciclables</h1>
                <p>Aprende las bases de la ingeniería construyendo tus propios prototipos funcionales de bajo costo.</p>
                <div className="youtube-invite">
                    <span>🔴</span>
                    <p>¡Investiga más en YouTube buscando "Robótica Educativa Reciclada" o proyectos de electrónica!</p>
                </div>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT SIMPLE */}
                <ProjectCard 
                    num="1"
                    title="Robot Móvil Simple"
                    imageSrc="/proj_robot.png"
                    videoId="h3M9_N-UoX0"
                    description="Un robot móvil básico que utiliza una botella como chasis. Es el primer paso para entender la tracción y los circuitos DC."
                    functioning="El motor convierte energía eléctrica en mecánica. El interruptor abre y cierra el paso de corriente desde el portapilas hacia los motores en paralelo."
                    materials={["1 Botella plástica", "2 Motores DC", "4 Tapas", "Pilas AA", "Cables e interruptor"]}
                    instructions={[
                        "Perfora las tapas y pégalas a los motores.",
                        "Pega los motores a la botella.",
                        "Realiza el cableado conectando los motores al portapilas mediando el interruptor."
                    ]}
                    simOn={robotMoving} setSimOn={setRobotMoving}
                    simContent={
                        <div className={`robot-viz ${robotMoving ? 'moving' : ''}`} style={{ position: 'relative', width: '200px', height: '100px' }}>
                            <div style={{ position: 'absolute', width: '120px', height: '50px', background: 'rgba(0, 242, 255, 0.2)', border: '2px solid var(--primary-color)', borderRadius: '10px 30px 30px 10px', left: '40px', top: '25px' }}></div>
                            <div style={{ position: 'absolute', width: '35px', height: '35px', background: 'white', borderRadius: '50%', border: '4px dashed #333', left: '50px', top: '65px', animation: robotMoving ? 'spin 0.5s linear infinite' : 'none' }}></div>
                            <div style={{ position: 'absolute', width: '35px', height: '35px', background: 'white', borderRadius: '50%', border: '4px dashed #333', left: '110px', top: '65px', animation: robotMoving ? 'spin 0.5s linear infinite' : 'none' }}></div>
                        </div>
                    }
                    simStatus={{ on: "Tracción constante.", off: "Sin corriente." }}
                />

                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2"
                    title="Velador de Escritorio LED"
                    imageSrc="/proj_velador.png"
                    videoId="-BIs-z5g7tY"
                    description="Lámpara funcional. Aprende sobre polaridad LED y cálculos de resistencias."
                    functioning="La resistencia de 220 ohms limita el flujo de corriente para no quemar el LED. El LED emite fotones cuando es atravesado por electrones en sentido correcto."
                    materials={["Lata de aluminio", "CDs usados", "Resistencia 220 Ohm", "LED alto brillo", "Cable USB"]}
                    instructions={[
                        "Limpia la lata y haz un orificio.",
                        "Pega la resistencia a la pata positiva del LED.",
                        "Conecta el cable USB al circuito y disfruta la luz."
                    ]}
                    simOn={veladorOn} setSimOn={setVeladorOn}
                    simContent={
                        <div className="velador-viz" style={{ position: 'relative', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {veladorOn && <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'radial-gradient(circle, #fff 0%, transparent 70%)', top: '-10px', filter: 'blur(10px)', zIndex: 1 }}></div>}
                            <div style={{ width: '20px', height: '20px', background: veladorOn ? '#fff' : '#444', borderRadius: '50% 50% 0 0', zIndex: 2 }}></div>
                            <div style={{ width: '40px', height: '80px', background: '#888', borderRadius: '5px' }}></div>
                            <div style={{ width: '80px', height: '10px', background: 'conic-gradient(red, yellow, blue, red)', opacity: 0.5, borderRadius: '50%' }}></div>
                        </div>
                    }
                    simStatus={{ on: "Haz de luz activo.", off: "Dormido." }}
                />

                {/* 3. VENTILADOR CD */}
                <ProjectCard 
                    num="3"
                    title="Ventilador de Escritorio"
                    imageSrc="/proj_ventilador.png"
                    videoId="YqXf8zXW77A"
                    description="Ventilador real hecho con un CD. Aerodinámica básica."
                    functioning="El motor utiliza magnetismo para girar su eje. Al girar las aspas inclinadas de CD, estas desplazan el aire hacia adelante."
                    materials={["Motor DC", "CD (aspas)", "Soporte cartón", "Cable USB"]}
                    instructions={[
                        "Corta y dobla el CD formando aspas.",
                        "Pégalas al eje del motor.",
                        "Conecta el cable USB o pilas para iniciar el flujo de aire."
                    ]}
                    simOn={ventiladorOn} setSimOn={setVentiladorOn}
                    simContent={
                        <div className="ventilador-viz" style={{ position: 'relative', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none', position: 'relative' }}>
                                <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', top: '40px', left: '40px', zIndex: 2 }}></div>
                                {[0, 120, 240].map(d => <div key={d} style={{ position: 'absolute', width: '40px', height: '30px', background: 'rgba(255,255,255,0.4)', left: '50px', top: '35px', transformOrigin: '-10px 15px', transform: `rotate(${d}deg)`, borderRadius: '0 20px 20px 0' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: "Viento detectado.", off: "Efecto Estático." }}
                />

                {/* 4. ARAÑA VIBROBOT */}
                <ProjectCard 
                    num="4"
                    title="Araña Robótica (Vibrobot)"
                    imageSrc="/proj_arana.png"
                    videoId="pGisAks_2sU"
                    description="Robot que se mueve mediante vibración de alta frecuencia."
                    functioning="El motor tiene una masa descentrada (pesito). Al girar, la fuerza centrífuga hace que el cuerpo 'salte' milimétricamente generando avance errático."
                    materials={["Motor vibrador", "Pila botón 3V", "Cepillo o alambres"]}
                    instructions={[
                        "Monta el motor sobre el cuerpo rígido.",
                        "Conecta la pila botón apretando los cables con cinta.",
                        "Ajusta las patas para maximizar el avance por vibración."
                    ]}
                    simOn={aranaMoving} setSimOn={setAranaMoving}
                    simContent={<div className={`arana-box ${aranaMoving ? 'arana-moving' : ''}`} style={{fontSize: '4rem'}}>🕷️</div>}
                    simStatus={{ on: "Frecuencia estable.", off: "Hibernando." }}
                />

                {/* 5. AMPLIFICADOR TDA2005 */}
                <ProjectCard 
                    num="5"
                    title="Amplificador de Audio TDA 2005"
                    imageSrc="/proj_amp.png"
                    videoId="5VIda0n8t-E" // Ejemplo TDA2005
                    description="Potente amplificador de audio Hi-Fi de 20W. Opcionalmente puedes agregar conexión Bluetooth."
                    functioning="El TDA 2005 es un circuito integrado de clase AB. Toma una señal de audio débil de tu celular o módulo BT y la aumenta usando una fuente de 12V para mover un parlante de gran tamaño."
                    materials={[
                        "Integrado TDA 2005R",
                        "Gran disipador de aluminio",
                        "Módulo Bluetooth XY-WRBT (opcional)",
                        "Condensadores: 2200uF (fuente), 470uF (salida)",
                        "Fuente 12V 3A",
                        "Parlante de 4 u 8 Ohmios"
                    ]}
                    instructions={[
                        "Atornilla el TDA 2005 al disipador con grasa siliconada.",
                        "Conecta los condensadores de acople a la entrada y salida según el diagrama (Mono Bridge).",
                        "Conecta el módulo Bluetooth alimentándolo con 5V (usa un 7805 si es necesario).",
                        "Conecta la salida de audio del módulo a la entrada del TDA 2005.",
                        "Conecta el parlante cuidando de no hacer cortocircuito."
                    ]}
                    simOn={ampActive} setSimOn={setAmpActive}
                    simContent={
                        <div className="amp-viz" style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#222', border: '5px solid #444', position: 'relative', overflow: 'hidden' }}>
                                {/* Cono Parlante animado */}
                                <div style={{ position: 'absolute', width: '60px', height: '60px', border: '2px solid #666', borderRadius: '50%', top: '5px', left: '5px', animation: ampActive ? 'pulse 0.2s infinite' : 'none' }}></div>
                                <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#333', borderRadius: '50%', top: '25px', left: '25px' }}></div>
                             </div>
                             {ampActive && <div style={{ marginTop: '10px', width: '100px', height: '2px', background: 'var(--primary-color)', animation: 'jitter 0.1s infinite' }}></div>}
                        </div>
                    }
                    simStatus={{ on: "Audio saliendo (20W). Bluetooth vinculado.", off: "Mudo." }}
                />

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Proyecto Educativo. Los proyectos electrónicos deben ser realizados con precaución.</p>
            </footer>
            
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ProyectosReciclablesPage;

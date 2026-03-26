import React, { useState } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    const [robotMoving, setRobotMoving] = useState(false);
    const [veladorOn, setVeladorOn] = useState(false);
    const [ventiladorOn, setVentiladorOn] = useState(false);
    const [aranaMoving, setAranaMoving] = useState(false);

    const ProjectCard = ({ title, description, objectives, materials, instructions, emoji, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
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

                            <div className="proyecto-section">
                                <h3>🚀 Prototipo Sugerido (Diseño IA)</h3>
                                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img src={imageSrc} alt={title} style={{ width: '100%', display: 'block' }} />
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
                                        Generado por IA
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

                            <div className="simulacion-area">
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
                <p>Aprende las bases de la ingeniería construyendo tus propios prototipos con materiales que ya tienes en casa. ¡Dale una segunda vida a la tecnología!</p>
                <div className="youtube-invite">
                    <span>🔴</span>
                    <p>¡Investiga más en YouTube buscando "Robótica Educativa Reciclada"!</p>
                </div>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT SIMPLE */}
                <ProjectCard 
                    num="1"
                    title="Robot Móvil Simple"
                    imageSrc="/proj_robot.png"
                    videoId="h3M9_N-UoX0" // Ejemplo de robot con botella
                    description="Un robot móvil básico que utiliza una botella como chasis. Es el primer paso para entender la tracción y los circuitos DC."
                    materials={[
                        "1 Botella de plástico (chasis)",
                        "2 Motores DC pequeños (6V)",
                        "4 Tapas de botella (ruedas)",
                        "1 Interruptor",
                        "Portapilas con 2 pilas AA",
                        "Cartón y silicona caliente"
                    ]}
                    instructions={[
                        "Perfora el centro de las 4 tapas y pégalas a los ejes de los motores (serán las ruedas).",
                        "Pega los dos motores a los costados traseros de la botella usando silicona.",
                        "En la parte delantera, pega un pedazo de cartón curvado para que actúe como apoyo deslizante.",
                        "Conecta los cables de los motores en paralelo (unidos entre sí).",
                        "Intercala el interruptor entre el positivo de la batería y los motores.",
                        "Pega el portapilas arriba de la botella para equilibrar el peso."
                    ]}
                    simOn={robotMoving}
                    setSimOn={setRobotMoving}
                    simContent={<div className={`robot-box ${robotMoving ? 'moving' : ''}`}>🤖</div>}
                    simStatus={{ on: "Motors spinning. Kinetic energy active.", off: "Idle. Ready to move." }}
                />

                {/* 2. VELADOR RECICLADO */}
                <ProjectCard 
                    num="2"
                    title="Velador de Escritorio LED"
                    imageSrc="/proj_velador.png"
                    videoId="-BIs-z5g7tY" // Ejemplo de lampara reciclada
                    description="Una lámpara funcional con LEDs de bajo consumo. Ideal para aprender sobre polaridad y componentes optoelectrónicos."
                    materials={[
                        "1 Lata de refresco vacía",
                        "2 CDs viejos (base y reflector)",
                        "1 LED de alto brillo (Blanco)",
                        "1 Resistencia de 220 ohms",
                        "Cable USB viejo o batería 9V",
                        "Cinta aislante"
                    ]}
                    instructions={[
                        "Limpia la lata y haz un orificio en la parte superior para pasar los cables.",
                        "Pega la lata sobre uno de los CDs para crear una base estable.",
                        "Suelda o une la resistencia a la pata más larga del LED (ánodo, positivo).",
                        "Conecta el cable rojo (+5V del USB) a la resistencia y el negro al cátodo del LED.",
                        "Coloca el LED dentro de la lata o en la punta de un sorbete flexible pegado a la base.",
                        "Cubre las conexiones con cinta para evitar cortocircuitos."
                    ]}
                    simOn={veladorOn}
                    setSimOn={setVeladorOn}
                    simContent={<div className={`velador-sim ${veladorOn ? 'velador-on' : 'velador-off'}`} style={{fontSize: '5rem'}}>💡</div>}
                    simStatus={{ on: "Photons emitted. Circuit closed.", off: "Dark. Circuit open." }}
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3"
                    title="Ventilador de Escritorio"
                    imageSrc="/proj_ventilador.png"
                    videoId="YqXf8zXW77A" // Ejemplo de ventilador con motor
                    description="Construye un ventilador que mueva aire real. Aprenderás sobre aspas, aerodinámica y conversión de energía rotatoria."
                    materials={[
                        "1 Motor DC pequeño (de juguete o DVD)",
                        "1 CD viejo (para las aspas)",
                        "Tubo de cartón o PVC (soporte)",
                        "Interruptor y Cables",
                        "Tapa de botella (nexo motor-aspas)"
                    ]}
                    instructions={[
                        "Corta el CD en 4 o 6 sectores sin llegar al centro para formar las aspas. Caliéntalas un poco con un encendedor para darles ángulo.",
                        "Pega la tapa de botella al centro del CD (aspas) y encájala en el eje del motor.",
                        "Monta el motor en el extremo del tubo de soporte.",
                        "Pasa los cables por dentro del tubo hasta la base.",
                        "Conecta el interruptor y la fuente de energía en la base del soporte.",
                        "Asegura la base con un bloque de madera o cartón pesado."
                    ]}
                    simOn={ventiladorOn}
                    setSimOn={setVentiladorOn}
                    simContent={
                        <div className={`ventilador-sim ${ventiladorOn ? 'ventilador-on' : ''}`}>
                            <svg viewBox="0 0 100 100" width="100" height="100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--primary-color)" strokeWidth="4" />
                                <circle cx="50" cy="50" r="10" fill="#fff" />
                                <path d="M50 50 L50 10 M50 50 L90 50 M50 50 L50 90 M50 50 L10 50" stroke="var(--primary-color)" strokeWidth="8" strokeLinecap="round" />
                                <path d="M50 50 Q75 10 90 40 Q60 60 50 50" fill="rgba(0,242,255,0.3)" />
                            </svg>
                        </div>
                    }
                    simStatus={{ on: "Spinning... Wind detected.", off: "Stopped. Static state." }}
                />

                {/* 4. ARAÑA ROBÓTICA (VIBROBOT) */}
                <ProjectCard 
                    num="4"
                    title="Araña Robótica (Vibrobot)"
                    imageSrc="/proj_arana.png"
                    videoId="pGisAks_2sU" // Ejemplo de vibrobot
                    description="Un robot que se desplaza mediante vibraciones de alta frecuencia. Parecerá que tiene vida propia al activarlo."
                    materials={[
                        "1 Motor de vibración (de celular viejo) o motor DC pequeño",
                        "1 Pila de botón (CR2032) o 2 pilas AA",
                        "Cepillo de dientes viejo (cabezal) o Alambres (patas)",
                        "Cinta doble faz",
                        "Ojitos locos (opcional)"
                    ]}
                    instructions={[
                        "Si usas un motor DC normal, pega un pedacito de goma de borrar desfasado al eje para que vibre al girar.",
                        "Pega el motor sobre el cuerpo (un trozo de cartón o el cabezal de un cepillo).",
                        "Dale forma de patas a 4 trozos de alambre y pégalos a los costados del cuerpo.",
                        "Conecta un cable a cada cara de la pila de botón usando cinta.",
                        "Asegura la pila y el interruptor en la 'espalda' de la araña.",
                        "Ajusta el ángulo de las patas para que el movimiento sea errático pero fluido."
                    ]}
                    simOn={aranaMoving}
                    setSimOn={setAranaMoving}
                    simContent={<div className={`arana-box ${aranaMoving ? 'arana-moving' : ''}`}>🕷️</div>}
                    simStatus={{ on: "Vibration frequency stabilized. Movement initiated.", off: "Dormant. Waiting for signals." }}
                />

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Proyecto Educativo. Los proyectos aquí presentados deben realizarse bajo supervisión adulta. ¡Sé creativo!</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

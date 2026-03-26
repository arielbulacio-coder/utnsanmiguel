import React, { useState } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    const [robotMoving, setRobotMoving] = useState(false);
    const [veladorOn, setVeladorOn] = useState(false);
    const [ventiladorOn, setVentiladorOn] = useState(false);
    const [aranaMoving, setAranaMoving] = useState(false);

    // Helper to handle image paths with possible base URL
    const getImagePath = (path) => {
        const base = import.meta.env.BASE_URL || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        // Ensure no double slashes
        return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
    };

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
                                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={getImagePath(imageSrc)} 
                                        alt={title} 
                                        style={{ width: '100%', display: 'block' }} 
                                        onError={(e) => {
                                            console.error("Failed to load image:", imageSrc);
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
                                        fontSize: '0.65rem',
                                        pointerEvents: 'none'
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
                <p>Construye tecnología real usando materiales recuperados. Aprende electrónica y mecánica de forma práctica y sustentable.</p>
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
                    videoId="h3M9_N-UoX0"
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
                    simContent={
                        <div className={`robot-viz ${robotMoving ? 'moving' : ''}`} style={{ position: 'relative', width: '200px', height: '120px' }}>
                            {/* Botella */}
                            <div style={{ position: 'absolute', width: '120px', height: '60px', background: 'rgba(0, 242, 255, 0.2)', border: '2px solid var(--primary-color)', borderRadius: '10px 30px 30px 10px', left: '40px', top: '30px' }}></div>
                            {/* Tapa Botella */}
                            <div style={{ position: 'absolute', width: '20px', height: '30px', background: 'white', left: '160px', top: '45px', borderRadius: '0 5px 5px 0' }}></div>
                            {/* Ruedas (Tapas) */}
                            <div className="wheel-spin" style={{ position: 'absolute', width: '35px', height: '35px', background: 'white', borderRadius: '50%', border: '4px dashed #333', left: '50px', top: '75px', animation: robotMoving ? 'spin 0.5s linear infinite' : 'none' }}></div>
                            <div className="wheel-spin" style={{ position: 'absolute', width: '35px', height: '35px', background: 'white', borderRadius: '50%', border: '4px dashed #333', left: '110px', top: '75px', animation: robotMoving ? 'spin 0.5s linear infinite' : 'none' }}></div>
                            {/* Portapilas */}
                            <div style={{ position: 'absolute', width: '40px', height: '20px', background: '#333', left: '70px', top: '20px', borderRadius: '3px', border: '1px solid #555' }}>
                                <div style={{ width: '80%', height: '4px', background: 'red', margin: '2px auto' }}></div>
                            </div>
                        </div>
                    }
                    simStatus={{ on: "Motores girando. Corriente fluyendo de las pilas.", off: "Circuito abierto. Sin movimiento." }}
                />

                {/* 2. VELADOR RECICLADO */}
                <ProjectCard 
                    num="2"
                    title="Velador de Escritorio LED"
                    imageSrc="/proj_velador.png"
                    videoId="-BIs-z5g7tY"
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
                    simContent={
                        <div className="velador-viz" style={{ position: 'relative', width: '150px', height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* LED Light Glow */}
                            {veladorOn && <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)', top: '-20px', zIndex: 1, filter: 'blur(5px)' }}></div>}
                            {/* Foco LED */}
                            <div style={{ width: '20px', height: '25px', background: veladorOn ? '#fff' : '#444', borderRadius: '50% 50% 0 0', zIndex: 2, boxShadow: veladorOn ? '0 0 20px #fff' : 'none' }}></div>
                            {/* Lata */}
                            <div style={{ width: '60px', height: '100px', background: 'linear-gradient(90deg, #888, #eee, #888)', borderRadius: '5px', position: 'relative', border: '1px solid #999' }}>
                                <div style={{ position: 'absolute', width: '100%', height: '10px', background: 'rgba(0,0,0,0.1)', top: '10px' }}></div>
                            </div>
                            {/* CD Base */}
                            <div style={{ width: '120px', height: '15px', background: 'conic-gradient(red, yellow, green, blue, purple, red)', opacity: 0.6, borderRadius: '50% / 30%', marginTop: '-10px', border: '1px solid rgba(255,255,255,0.2)' }}></div>
                            <div style={{ width: '120px', height: '15px', background: 'conic-gradient(red, yellow, green, blue, purple, red)', opacity: 0.4, borderRadius: '50% / 30%', marginTop: '5px', border: '1px solid rgba(255,255,255,0.2)' }}></div>
                        </div>
                    }
                    simStatus={{ on: "LED encendido. Resistencia limitando la corriente.", off: "Sin corriente. LED apagado." }}
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3"
                    title="Ventilador de Escritorio"
                    imageSrc="/proj_ventilador.png"
                    videoId="YqXf8zXW77A"
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
                        <div className="ventilador-viz" style={{ position: 'relative', height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none' }}>
                                {/* Centro CD */}
                                <div style={{ position: 'absolute', width: '30px', height: '30px', background: '#fff', borderRadius: '50%', top: '45px', left: '45px', border: '2px solid #ccc', zIndex: 2 }}></div>
                                {/* Aspas de CD */}
                                {[0, 90, 180, 270].map(deg => (
                                    <div key={deg} style={{ 
                                        position: 'absolute', 
                                        width: '50px', 
                                        height: '40px', 
                                        background: 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(200,200,200,0.3))', 
                                        top: '40px', 
                                        left: '60px', 
                                        transformOrigin: '-10px 20px', 
                                        transform: `rotate(${deg}deg)`,
                                        borderRadius: '0 20px 20px 0',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}></div>
                                ))}
                            </div>
                            {/* Motor Case */}
                            <div style={{ width: '40px', height: '40px', background: '#555', borderRadius: '5px', marginTop: '-80px', zIndex: -1 }}></div>
                            {/* Soporte Tubo */}
                            <div style={{ width: '15px', height: '80px', background: '#888', borderRadius: '2px' }}></div>
                            {/* Base */}
                            <div style={{ width: '80px', height: '15px', background: '#333', borderRadius: '5px' }}></div>
                        </div>
                    }
                    simStatus={{ on: "Aspas de CD girando. Conversión eléctrica a eólica.", off: "Motor inactivo. Aspas detenidas." }}
                />

                {/* 4. ARAÑA ROBÓTICA (VIBROBOT) */}
                <ProjectCard 
                    num="4"
                    title="Araña Robótica (Vibrobot)"
                    imageSrc="/proj_arana.png"
                    videoId="pGisAks_2sU"
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
                    simContent={
                        <div className={`arana-viz ${aranaMoving ? 'arana-moving' : ''}`} style={{ position: 'relative', width: '150px', height: '120px' }}>
                            {/* Cuerpo (Carton/Cepillo) */}
                            <div style={{ position: 'absolute', width: '60px', height: '40px', background: '#8b4513', borderRadius: '20px', left: '45px', top: '40px', border: '2px solid #5d2e0d' }}>
                                {/* Ojitos */}
                                <div style={{ position: 'absolute', width: '6px', height: '6px', background: 'white', borderRadius: '50%', left: '40px', top: '10px' }}></div>
                                <div style={{ position: 'absolute', width: '6px', height: '6px', background: 'white', borderRadius: '50%', left: '40px', top: '25px' }}></div>
                            </div>
                            {/* Motor Vibrador */}
                            <div style={{ position: 'absolute', width: '20px', height: '15px', background: 'silver', left: '60px', top: '30px', borderRadius: '3px', border: '1px solid #999' }}></div>
                            {/* Patas Alambre */}
                            {[
                                { t: '30px', l: '40px', r: '45deg' }, { t: '30px', l: '85px', r: '-45deg' },
                                { t: '70px', l: '40px', r: '135deg' }, { t: '70px', l: '85px', r: '-135deg' }
                            ].map((p, i) => (
                                <div key={i} style={{ 
                                    position: 'absolute', 
                                    width: '30px', 
                                    height: '3px', 
                                    background: '#333', 
                                    top: p.t, 
                                    left: p.l, 
                                    transform: `rotate(${p.r})`,
                                    animation: aranaMoving ? 'jitter 0.1s infinite' : 'none'
                                }}></div>
                            ))}
                        </div>
                    }
                    simStatus={{ on: "Motor desbalanceado vibrando. Movimiento por fricción.", off: "Araña en reposo." }}
                />

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Proyecto Educativo. Los proyectos aquí presentados deben realizarse bajo supervisión adulta. ¡Sé creativo!</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

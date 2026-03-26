import React, { useState, useEffect } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    // Estados de simulación para cada proyecto
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
    
    // Ciclo día/noche para la Huerta Solar
    const [isDay, setIsDay] = useState(true);

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

    // Componentes visuales para el simulador
    const Comp = ({ label, color = '#333', children, style = {} }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', ...style }}>
            <div style={{ background: color, borderRadius: '10px', padding: '12px', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 6px 15px rgba(0,0,0,0.6)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
        </div>
    );

    const Wire = ({ width, top, left, rotate = 0, color = 'red', active = false }) => (
        <div style={{ 
            position: 'absolute', 
            width: width, 
            height: '3px', 
            background: active ? '#00f2ff' : color, 
            top: top, 
            left: left, 
            transform: `rotate(${rotate}deg)`, 
            transformOrigin: '0 0', 
            zIndex: 0, 
            opacity: active ? 1 : 0.3,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: active ? `0 0 10px ${color}` : 'none'
        }}></div>
    );

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>📋 El Desafío del Tecnólogo</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#ddd' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>📚 Masterclass de Ingeniería (Corpus Teórico)</h3>
                                <div className="theory-block" style={{ fontSize: '0.92rem', whiteSpace: 'pre-line', background: 'rgba(0,15,30,0.8)', padding: '30px', borderRadius: '25px', borderLeft: '6px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.8', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)', color: '#fff', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🖼️ Prototipo de Referencia</h3>
                                    <div className="img-container" style={{ borderRadius: '25px', border: '1px solid #444', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🗺️ Planos de Ingeniería y Circuitos</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#0a0a0a', borderRadius: '20px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.75rem', padding: '12px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Bill of Materials (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.98rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Manufactura</h3>
                                <ol className="instructions-list" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '12px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '35px', border: '2px solid rgba(0,242,255,0.4)', minHeight: '450px', position: 'relative', overflow: 'hidden', padding: '30px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {simContent}
                                </div>
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative' }}>
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Finalizar Pruebas' : '▶️ Ejecutar Laboratorio'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.1rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA EN OPERACIÓN <<<' : '>>> SISTEMA EN STANDBY <<<'}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '8px', color: 'var(--primary-color)' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '5rem' }}>
                            <h3>📺 SOPORTE AUDIOVISUAL STEAM</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '35px', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.9)' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '4px solid var(--primary-color)', paddingBottom: '3rem', marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '3.2rem', fontWeight: '900', letterSpacing: '4px' }}>📡 SIMUTEC: INGENIERÍA Y CIENCIA</h1>
                <p style={{ fontSize: '1.5rem', fontWeight: '300' }}>Dominando las leyes de la física a través de la robótica y el diseño sustentable.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT MÓVIL ECO-ROVER */}
                <ProjectCard 
                    num="1" title="Unidad Móvil de Tracción Directa (Eco-Rover)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Desarrollo de un vehículo autoportante analógico para comprender la conversión de energía electroquímica (pilas) en par motor rotacional."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor DC y la Ley de Lorentz: Dentro del motor, la electricidad viaja por cables rodeados de imanes. Esta corriente genera una fuerza invisible (llamada Fuerza de Lorentz) que empuja el eje del motor y lo hace girar. ¡Es como un tirón magnético constante!
                    • Inercia y Rozamiento: La botella (nuestro chasis) se resiste a moverse (Inercia). Para vencer esto, las ruedas necesitan 'agarrarse' al suelo (Fricción). Si usamos tapitas lisas, el robot patinará; por eso añadimos goma o cinta para aumentar el coeficiente de rozamiento.
                    • La Fuerza Contraelectromotriz (Back EMF): Sorpresa... un motor que gira rápido se convierte en un pequeño generador. Genera un voltaje que 'va en contra' del de la pila, limitando la velocidad máxima. Es la razón por la cual el robot no acelera hasta el infinito.`}
                    materials={["Botella plástica (PET)", "2 Motores DC de 3V-6V", "Porta pilas con 2 pilas AA", "4 Tapitas de refresco", "Interruptor SPST"]} 
                    instructions={["Paso 1: Montaje de los motores alineados a 180° sobre el eje transversal de la botella.", "Paso 2: Conexión de motores en paralelo para asegurar que ambos reciban el mismo voltaje (3V).", "Paso 3: Modificación de superficies de rodado para maximizar el agarre mediante bandas elásticas.", "Paso 4: Test dinámico de avance lineal y corrección de deriva."]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Electrodinámica: Motores DC en paralelo"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ opacity: 0.3, fontWeight: 'bold' }}>CHASIS BOTELLA</span>
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

                {/* 2. VELADOR LED CUÁNTICO */}
                <ProjectCard 
                    num="2" title="Velador LED Cuántico (Estado Sólido)" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de una luminaria eficiente basada en el fenómeno de la electroluminiscencia en materiales semiconductores."
                    functioning={`🔌 CIENCIA DE LOS SEMICONDUCTORES:
                    • El Salto Cuántico: El LED no tiene un filamento que arde (como las bombillas viejas). Adentro, los electrones saltan entre dos tipos de cristales (Unión P-N). Al saltar, 'sueltan' energía extra en forma de una partícula de luz llamada Fotón.
                    • La Resistencia Protege: El LED es tan eficiente que intentaría tomar toda la electricidad de la batería hasta quemarse. Ponemos una Resistencia para 'frenar' ese flujo. Usamos la Ley de Ohm (V = I x R) para calcular cuánta energía le quitamos y así mantener al LED a salvo.
                    • El Reflector Parabólico: Usamos una lata de metal porque su forma refleja la luz hacia adelante, concentrando los fotones para que el velador ilumine mucho más.`}
                    materials={["Diodo LED de alta intensidad", "Resistencia de 220 o 330 Ohms", "Cable USB reciclado", "Lata cilíndrica (Metálica)", "CD viejo"]} 
                    instructions={["Paso 1: Identificación de polaridad del LED. La pata larga es el Ánodo (+) y la corta el Cátodo (-).", "Paso 2: Soldadura de la resistencia limitadora para evitar la ruptura térmica del chip.", "Paso 3: Conexión de alimentación a 5V (USB), verificando que la corriente no supere los 20mA.", "Paso 4: Montaje en reflector cóncavo (lata) para optimizar el haz luminoso."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Fotónica: Emisión de Luz por Semiconductores"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', border: '1px solid #888', opacity: 0.5 }}></div>
                            <span style={{ position: 'absolute', bottom: '15px', fontSize: '0.6rem', color: '#444' }}>CD (REFLECTOR BASE)</span>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '3rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
                                <div style={{ marginTop: '40px' }}><Comp label="CAN (FUTURO)" color="transparent">🥫</Comp></div>
                                <div style={{ position: 'absolute', bottom: '10px' }}>
                                    <Comp label="R 220Ω" color="#5a3a1f">▥</Comp>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', left: '20px', bottom: '40px' }}>
                                <Comp label="USB 5V" color="#111">🔌</Comp>
                            </div>
                            <Wire width="80px" top="155px" left="60px" rotate={0} active={veladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 3. VENTILADOR CD ENGINEERING */}
                <ProjectCard 
                    num="3" title="Ventilador CD (Ingeniería Aerodinámica)" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Construcción de una turbina axial mediante la deformación térmica de polímeros para el estudio de fluidos."
                    functioning={`🌀 DINÁMICA DE FLUIDOS Y FLUJOS:
                    • El Principio de Bernoulli: Cuando la hélice (CD) gira, su forma inclinada obliga al aire a moverse más rápido de un lado que del otro. Esto crea una diferencia de presión que 'empuja' el aire hacia adelante.
                    • Potencia y RPM: Los motores pequeños pueden girar a miles de Revoluciones por Minuto (RPM). Esa velocidad es la que permite que el ventilador mueva un gran caudal de aire.
                    • Equilibrio Dinámico: Si el CD no está perfectamente centrado, el robot vibrará porque el Centro de Gravedad está corrido. Aprenderemos a centrar el eje para un funcionamiento suave.`}
                    materials={["Motor DC de alta velocidad", "CD reciclado (Hélice)", "Cable USB", "Base de madera o cartón rígido"]} 
                    instructions={["Paso 1: División del CD en sectores angulares iguales para garantizar la simetría de masa.", "Paso 2: Aplicación de calor controlado para el dobles de alabeos (30° de ángulo de ataque).", "Paso 3: Fijación del cubo del ventilador al eje del motor mediante acople por presión.", "Paso 4: Conexión a fuente de 5V y test de orientación de flujo (Soplado vs Succión)."]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Aerodinámica: Transferencia de Momento Lineal"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="MOTOR DC" color="#222">🔘</Comp>
                            <div style={{ position: 'absolute', top: '10px', fontSize: '7rem', opacity: 0.9, ... (ventiladorOn ? {animation: 'spin 0.15s linear infinite'} : {}) }}>💿</div>
                            <div style={{ width: '80px', height: '80px', background: 'saddlebrown', borderRadius: '5px', marginTop: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.6rem', color: '#fff' }}>MADERA</span>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', bottom: '60px' }}>
                                <Comp label="USB POWER" color="#111">🔌</Comp>
                            </div>
                            <Wire width="60px" top="100px" left="180px" rotate={45} active={ventiladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 4. ARAÑA VIBROBOT SHAKER */}
                <ProjectCard 
                    num="4" title="Micro-Robot Araña (Vibrobot Shaker)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Experimento cinético sobre la locomoción por vibración mediante el uso de masa excéntrica reciclada."
                    functioning={`🕷️ FÍSICA DE LAS VIBRACIONES (CINETICA):
                    • Masa Excéntrica: Al ponerle un peso descentrado al motor, éste 'tiembla' al girar. Esto se llama Desbalance. Este desequilibrio genera una fuerza centrífuga que sacude todo el robot.
                    • Vector de Empuje: Las patas de alambre inclinadas funcionan como pequeños resortes. Cuando el robot vibra, las patas rebotan y lo lanzan en una sola dirección.
                    • Frecuencia de Resonancia: Si regulamos el voltaje, podemos hacer que el robot vibre tan rápido que empiece a caminar con movimientos muy fluidos.`}
                    materials={["Micro-motor DC", "Masa excéntrica (tuerca o estaño)", "Pila botón CR2032", "Alambres para patas"]} 
                    instructions={["Paso 1: Creación del desbalance en el eje motor mediante el agregado de masa asimétrica.", "Paso 2: Modelado de patas en configuración trípode para asegurar la estabilidad estática.", "Paso 3: Sistema de encendido por contacto directo de la pila al borne del motor.", "Paso 4: Análisis de desplazamiento según la rugosidad de la superficie de prueba."]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Física: Movimiento Oscilatorio Forzado"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={aranaMoving ? 'arana-moving' : ''} style={{ position: 'relative', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid #444' }}>
                                <Comp label="MOTOR" color="#111">⚙️</Comp>
                                <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '1rem', animation: aranaMoving ? 'jitter 0.1s infinite' : 'none' }}>⚖️</div>
                                <div style={{ position: 'absolute', top: '-15px', left: '10px' }}>
                                    <Comp label="PILA 3V" color="#333">💿</Comp>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '50px', marginTop: '10px' }}>
                                <div style={{ width: '2px', height: '40px', background: '#555', transform: 'rotate(20deg)' }}></div>
                                <div style={{ width: '2px', height: '40px', background: '#555', transform: 'rotate(-20deg)' }}></div>
                            </div>
                        </div>
                    } 
                />

                {/* 5. AMPLIFICADOR TDA 2005 */}
                <ProjectCard 
                    num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" 
                    description="Ingeniería de audio analógica para el procesamiento y amplificación de ondas sonoras."
                    functioning={`🔊 ELECTRÓNICA DE AUDIO (POTENCIA):
                    • La Amplificación Clase AB: El chip toma la señal débil del celular (milivoltios) y 'copia' su forma pero con mucha más energía usando la batería de 12V. Así, el parlante tiene fuerza suficiente para mover el aire y crear sonido fuerte.
                    • Impedancia de Carga: El parlante es una bobina con imanes. Su resistencia (medida en Ohms) define cuánta corriente le pedirá al amplificador.
                    • Disipación Térmica: Como el chip hace un gran esfuerzo, libera calor. El aluminio (disipador) ayuda a que ese calor pase al aire y el chip no se destruya por exceso de temperatura.`}
                    materials={["Chip TDA 2005", "Disipador de potencia (Aluminio)", "Capacitores de desacople (filtros)", "Parlante 4Ω / 8Ω", "Fuente Estabilizada 12V"]} 
                    instructions={["Paso 1: Montaje mecánico del chip al bloque disipador usando pasta térmica.", "Paso 2: Soldadura de la red de filtros para eliminar el 'ruido' (ripple) de la fuente de alimentación.", "Paso 3: Verificación de la ganancia de audio (+26dB nominal).", "Paso 4: Test de respuesta en frecuencia con generador de tonos."]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simStatus={{info: "Audio: Modulación de Amplitud de Señal"}}
                    simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="OUTPUT">🔊</Comp></div>} />

                {/* 6. ROBOT EVITA OBSTACULOS */}
                <ProjectCard 
                    num="6" title="Robot Autónomo que Esquiva Paredes" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" 
                    description="Navegación inteligente basada en la tecnología SONAR para la detección remota de objetos."
                    functioning={`🛰️ ROBÓTICA Y CIBERNÉTICA:
                    • El Radar de Ultrasonido: Lanza una onda de sonido invisible a 40.000 Hz. Cuando choca con algo (como una pared), el sonido rebota y vuelve al robot. Como sabemos la velocidad del sonido (343 m/s), el robot calcula la distancia al instante.
                    • Algoritmos de Decisión: Programamos al cerebro (Arduino) con lógica 'IF-THEN'. Si la distancia es menor a 15cm, el robot frena, mira a los lados y decide por dónde escapar.
                    • Puentes H (Control de Motores): Son compuertas electrónicas que permiten que el Arduino maneje motores con mucha corriente sin quemarse, permitiendo girar hacia adelante o atrás.`}
                    materials={["Microcontrolador Arduino UNO", "Sensor de ultrasonido HC-SR04", "Chasis de 2 ruedas + Motores DC", "Módulo Puente H (L298N)", "Batería 9V"]} 
                    instructions={["Paso 1: Calibración del sensor ultrasónico mediante mediciones manuales y monitor serie.", "Paso 2: Implementación de la lógica de evasión mediante bloques condicionales.", "Paso 3: Regulación de la velocidad de giro para evitar el sobreimpulso del robot.", "Paso 4: Prueba de navegación en entorno cerrado con obstáculos variables."]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simStatus={{info: "Cibernética: Navegación por Eco-localización"}}
                    simContent={<div style={{display:'flex',gap:'20px'}}><Comp label="CPU">🟦</Comp><Comp label="RADAR">👀</Comp></div>} />

                {/* 7. TALLER DE SOLDADURA */}
                <ProjectCard 
                    num="7" title="Taller de Soldadura y Metalurgia Electrónica" videoId="v=J5Sb21qbpEQ" 
                    description="Dominio del proceso de unión intermetálica definitiva mediante aleaciones de estaño-plomo."
                    functioning={`🩹 CIENCIA DE LOS MATERIALES (SOLDADURA):
                    • La Aleación Eutéctica: El estaño no es pegamento, es un metal que funde a baja temperatura (183°C). Buscamos crear una 'Capa Intermetálica' donde el estaño se mezcle molecularmente con el cobre de la placa.
                    • Tensión Superficial y Flux: El flux es una resina que limpia el óxido del metal. Sin ella, la soldadura no se 'mojaría' y quedaría como una bolita que se cae.
                    • Soldadura Fría: Si los componentes se mueven durante el enfriamiento, los cristales del metal se fracturan, creando una unión que falla al poco tiempo. Aprenderemos a hacer uniones brillantes y firmes.`}
                    materials={["Soldador tipo lápiz 30W/40W", "Alambre de estaño (Sn60/Pb40)", "Placa Perfboard", "Porta soldador + Esponja"]} 
                    instructions={["Paso 1: Preparación galvánica: limpieza técnica de la punta del soldador y de los pads.", "Paso 2: Transferencia de calor simultánea al pad y al pin del componente.", "Paso 3: Aplicación de aporte metálico (estaño) buscando la forma de cono perfecto.", "Paso 4: Inspección visual de fallas comunes: puentes de estaño y soldaduras frías."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ OK' }, { url: '/proj_soldadura_error.png', label: '❌ ERROR' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simStatus={{info: "Metalurgia: Unión por Difusión Molecular"}}
                    simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="SOLDADOR">🖍️</Comp><Comp label="PLACA">📍</Comp></div>} />

                {/* 8. HUERTA SOLAR SMART */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar con Iluminación PAR" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Sistemas bioclimáticos tecnificados con aprovechamiento fotovoltaico e iluminación forzada de espectro."
                    functioning={`🌿 ECO-INGENIERÍA Y BIOTECNOLOGÍA:
                    • El Efecto Fotovoltaico: El panel captura fotones del sol y excita electrones en el silicio para crear corriente eléctrica pura.
                    • Espectro PAR (Radiación Fotosintéticamente Activa): Las plantas no necesitan toda la luz del sol; prefieren el color Azul (para crecer fuertes) y Rojo (para dar frutos). Usamos LEDs 'Grow' que imitan esos colores exactos para acelerar el crecimiento hasta un 40%.
                    • Circuitos de Carga: Usamos un regulador para cuidar que la batería no se rompa por sobrecarga durante el día.`}
                    materials={["Panel Solar Monocristalino", "Regulador de Carga Inteligente", "Batería de Ciclo Profundo", "LEDs Grow (Azul/Rojo)", "Cajón con tierra y semillas"]} 
                    instructions={["Paso 1: Orientación técnica del panel (Azimut al Norte) para maximizar la irradiancia solar.", "Paso 2: Configuración del regulador para corte por bajo voltaje (protección de batería).", "Paso 3: Instalación de la suplementación lumínica nocturna calculando el fotoperiodo óptimo.", "Paso 4: Registro de crecimiento mediante mediciones comparativas diarias."]} 
                    imageSrc={[{ url: '/proj_huerta_schem.png', label: '📑 Ingeniería' }, { url: '/proj_huerta_wire.png', label: '🔌 Conexiones' }]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Sustentabilidad: Ingeniería de Energías Renovables"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '250px', background: isDay ? '#1a1a1a' : '#050515', borderRadius: '25px', padding: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <Comp label="SOLAR PANEL" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="REGULADOR" color="#111">📟</Comp>
                                <Comp label="BATERÍA" color="#222">🔋</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#444' }}><Comp label="LEDS GROW" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize: '3rem' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO ESTRATÉGICO */}
                <ProjectCard 
                    num="9" title="Robot Sumo de Competición (Estrategia)" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" 
                    description="Diseño de máquinas de combate robótico basadas en el par motor y la detección infrarroja de perímetros."
                    functioning={`🚜 ESTRATEGIA Y FÍSICA MECÁNICA:
                    • Centro de Gravedad (CoG): Diseñamos el robot petizo y pesado. Cuanto más bajo esté el peso, más difícil será que el oponente lo de vuelta. ¡Es pura mecánica de fuerzas!
                    • Sensores Infrarrojos (TCRT5000): Lanzamos luz infrarroja (invisible al ojo) al piso. Como el borde del ring es blanco y el centro negro, el robot se da cuenta de cuándo está por caerse y frena solo.
                    • Torque vs Velocidad: Usamos engranajes para que las ruedas tengan mucha fuerza (Torque), permitiendo empujar incluso oponentes más grandes.`}
                    materials={["Micro Arduino UNO", "Sensores Infrarrojos de piso", "Sensor de ultrasonido (ojos)", "Motores de alto torque", "Pala metálica frontal"]} 
                    instructions={["Paso 1: Construcción de chasis robusto con distribución de carga baja (CoG).", "Paso 2: Calibración de umbrales IR según la reflectancia del Dohyo (ring).", "Paso 3: Programación de rutinas de búsqueda y ataque autónomo.", "Paso 4: Competición de empuje midiendo la fuerza de arrastre en Newtons."]} 
                    simOn={sumoActive} setSimOn={setSumoActive} 
                    simStatus={{info: "Robótica de Competición: Dinámica de Sistemas"}}
                    simContent={<div style={{border:'3px solid #eee',borderRadius:'50%',padding:'20px'}}><Comp label="SUMO BOT">🚜</Comp></div>} />

                {/* 10. ROBOT FÚTBOL CONTROLADO */}
                <ProjectCard 
                    num="10" title="Robot Futbolista (Control Bluetooth)" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" 
                    description="Desarrollo de sistemas radio-controlados mediante protocolo serie Bluetooth para la coordinación deportiva."
                    functioning={`⚽ TELEMETRÍA Y CONTROL DE VECTORES:
                    • Comunicación Bluetooth (HC-05): Usamos radiofrecuencia para enviar códigos invisibles desde el celular. El robot los traduce en milisegundos en órdenes para sus motores.
                    • Vectores de Velocidad: Como tiene 4 ruedas, el robot puede sumar sus movimientos para ir en diagonal o rotar sobre su propio eje.
                    • Actuación de Precisión: Programamos un 'pateador' mecánico (servomotor) que golpea la pelota en el momento justo del pase.`}
                    materials={["Placa Arduino + Módulo HC-05", "Smartphone con App Joystick", "Chasis 4x4 + Motores", "Servomotor (Pateador)", "Pelota liviana"]} 
                    instructions={["Paso 1: Configuración de la comunicación UART (RX/TX) entre Bluetooth y Arduino.", "Paso 2: Programación de la matriz de tracción para control omnidireccional.", "Paso 3: Calibración del servomotor para la fuerza de pateo óptima.", "Paso 4: Práctica de maniobras de regateo y precisión de disparo al arco."]} 
                    simOn={futbolActive} setSimOn={setFutbolActive} 
                    simStatus={{info: "Sistemas Embebidos: Comunicación Inalámbrica"}}
                    simContent={<div style={{background:'#2e7d32',padding:'20px',borderRadius:'15px'}}><Comp label="PLAYER">🚜</Comp><div style={{marginTop:'10px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: '4px' }}>SIMUTEC 2026 - MODELO EDUCATIVO DE INGENIERÍA SUSTENTABLE</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Preparando a los técnicos que construirán el futuro.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

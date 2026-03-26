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

    // Componentes visuales para el laboratorio de simulación
    const Comp = ({ label, color = '#333', children, style = {} }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', ...style }}>
            <div style={{ background: color, borderRadius: '12px', padding: '14px', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 18px rgba(0,0,0,0.7)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: '900', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
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
            transition: 'all 0.5s cubic-bezier(0.1, 0.7, 1.0, 0.1)',
            boxShadow: active ? `0 0 12px ${color}` : 'none'
        }}></div>
    );

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🇦🇷 Desafío para Inventores</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#ccc' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>🧠 Clase de Ingeniería (Corpus Teórico)</h3>
                                <div className="theory-block" style={{ fontSize: '0.95rem', whiteSpace: 'pre-line', background: 'rgba(0,18,35,0.85)', padding: '32px', borderRadius: '28px', borderLeft: '7px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.8', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.15)', color: '#fff' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Foto del Prototipo Real</h3>
                                    <div className="img-container" style={{ borderRadius: '28px', border: '1px solid #555', overflow: 'hidden', background: '#111' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📑 Planos y Diagramas de Conexión</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '22px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#080808', borderRadius: '22px', border: '1px solid #444', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: 'auto', minHeight: '150px', objectFit: 'contain' }} />
                                                <p style={{ fontSize: '0.85rem', padding: '15px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)', background: 'rgba(0,0,0,0.5)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Materiales Necesarios (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '1.05rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Manufactura</h3>
                                <ol className="instructions-list" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '14px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '40px', border: '3px solid rgba(0,242,255,0.5)', minHeight: '520px', position: 'relative', overflow: 'hidden', padding: '35px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {simContent}
                                </div>
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative' }}>
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Frenar Pruebas' : '▶️ Ejecutar Simulación'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.25rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA ACTIVO <<<' : '>>> SISTEMA OFF <<<'}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px', color: 'var(--primary-color)' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '6rem' }}>
                            <h3>📺 SOPORTE AUDIOVISUAL PASO A PASO</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '45px', overflow: 'hidden', boxShadow: '0 30px 100px rgba(0,0,0,1)', border: '2px solid #333' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '5px solid var(--primary-color)', paddingBottom: '4rem', marginBottom: '7rem' }}>
                <h1 style={{ fontSize: '3.8rem', fontWeight: '900', letterSpacing: '6px' }}>🇦🇷 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.7rem', fontWeight: '300' }}>Laboratorio educativo nacional de ingeniería y diseño sustentable.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER */}
                <ProjectCard 
                    num="1" title="Eco-Rover (Unidad de Tracción PET)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construí un vehículo capaz de desplazarse usando una botella reciclada. Teoría de Motores DC y Rozamiento."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor y la Ley de Lorentz: Cuando hacés pasar corriente por los cables del motor, se genera una fuerza invisible en presencia de imanes. Esa fuerza invisible empuja el eje del motor y lo hace girar. ¡Es puro magnetismo laburando para vos!
                    • Inercia y Rozamiento: La botella se resiste a moverse por culpa de la Inercia. Para que salga arando, las ruedas necesitan 'agarrarse' al piso. Si usás tapitas lisas, el robot va a patinar; por eso tenés que meterle banda elástica para aumentar la fricción.
                    • Fuerza Contraelectromotriz (Back EMF): Cuando el motor gira re-fuerte, él mismo fabrica electricidad que intenta frenarlo. Esto limita la velocidad máxima de tu robot.`}
                    materials={["Botella plástica (PET)", "2 Motores DC", "Pilas AA", "4 Tapitas de gaseosa", "Interruptor"]} 
                    instructions={["Paso 1: Montá los motores alineados en la base de la botella.", "Paso 2: Conectalos en paralelo a las pilas.", "Paso 3: Verificá que la polaridad haga que ambas ruedas giren hacia adelante.", "Paso 4: ¡Dale arranque y probá tu Eco-Rover!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial: Motores en Paralelo"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ opacity: 0.3, fontWeight: 'bold' }}>CHASIS BOTELLA</span>
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
                                <Comp label="PILAS AA" color="#222">🔋</Comp>
                            </div>
                            <Wire width="60px" top="130px" left="90px" rotate={-45} active={robotMoving} color="red" />
                            <Wire width="60px" top="130px" left="150px" rotate={-135} active={robotMoving} color="black" />
                        </div>
                    } 
                />

                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED (Carcasa de Conserva)" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de iluminación eficiente usando materiales reciclados y física de semiconductores."
                    functioning={`🔌 CIENCIA DE LUCES (ELECTRÓNICA):
                    • Salto Cuántico: El LED emite luz gracias a que los electrones saltan entre cristales semiconductores, liberando energía en forma de fotones. ¡Es pura física moderna!
                    • El Rol de la Resistencia: Protege al LED limitando la corriente para evitar que se queme. Usamos la Ley de Ohm para calcular el valor exacto.
                    • Reflector Parabólico: Usamos la lata porque su forma ayuda a que la luz se concentre y no se disperse.`}
                    materials={["LED alta intensidad", "Resistencia 220 Ohms", "Puerto USB", "Lata de arvejas limpia", "CD viejo"]} 
                    instructions={["Paso 1: Soldá la resistencia a la pata positiva del LED.", "Paso 2: Conectá los 5V del cable USB.", "Paso 3: Montá la estructura dentro de la lata.", "Paso 4: ¡Usá el CD de base para un estilo re-pro!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Electrónica: Gestión de Fotones"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', border: '1px solid #888', opacity: 0.5 }}></div>
                            <span style={{ position: 'absolute', bottom: '15px', fontSize: '0.6rem', color: '#444' }}>CD BASE</span>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '30px', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
                                <div style={{ marginTop: '40px' }}><Comp label="LATA" color="transparent">🥫</Comp></div>
                                <div style={{ position: 'absolute', bottom: '10px' }}>
                                    <Comp label="RES. 220Ω" color="#5a3a1f">▥</Comp>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', left: '20px', bottom: '40px' }}>
                                <Comp label="PLUG USB" color="#111">🔌</Comp>
                            </div>
                            <Wire width="80px" top="155px" left="60px" rotate={0} active={veladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 3. VENTILADOR CD */}
                <ProjectCard 
                    num="3" title="Ventilador de Alta Velocidad (CD Unit)" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Hélice aerodinámica fabricada a partir de un CD reciclado para estudio de fluidos."
                    functioning={`🌀 AERODINÁMICA Y FLUIDOS:
                    • Efecto Bernoulli: La inclinación de las aspas del CD crea una diferencia de presión que tracciona el aire hacia adelante.
                    • Ángulo de Ataque: Tenés que doblar las aspas con calor pero sin pasarte, para que el motor no labure pesado.
                    • Energía Rotacional: Analizamos las RPM necesarias para generar un flujo de aire refrescante.`}
                    materials={["Motor DC", "CD viejo", "Madera para base", "Cable USB"]} 
                    instructions={["Paso 1: Cortá el CD y dale forma con calor suave.", "Paso 2: Fijá el motor a la base.", "Paso 3: Conectá al puerto USB.", "Paso 4: ¡Probá la potencia del aire!"]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Mecánica: Flujo de Aire Turbulento"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="MOTOR DC" color="#222">🔘</Comp>
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

                {/* 4. VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Araña Vibrobot (Ciempiés-Bot)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Un pequeño robot que se desplaza por vibración usando un motor descentrado."
                    functioning={`🕷️ FÍSICA DE VIBRACIÓN:
                    • Masa Excéntrica: Al ponerle un peso descentrado al motor, éste genera una fuerza que sacude todo el robot.
                    • Elasticidad: Las patas de alambre rebotan contra el suelo, convirtiendo el temblor en avance.
                    • Inercia: La rapidez de la vibración es clave para un caminado fluido.`}
                    materials={["Micro-motor DC", "Pesito para eje", "Pila botón 3V", "Alambre"]} 
                    instructions={["Paso 1: Armá las 6 patas elásticas.", "Paso 2: Agregá el contrapeso al motor.", "Paso 3: Conectá la pila directamente.", "Paso 4: ¡Mirá cómo corre por la mesa!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Cinética: Movimiento Oscilatorio"}}
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

                {/* 5. AMPLIFICADOR */}
                <ProjectCard num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Potencia sonora analógica." functioning="🔊 Ganancia: El chip amplifica la señal del celu. Disipación: El aluminio evita que se queme." materials={["Chip TDA 2005", "Disipador", "Batería 12V"]} instructions={["Montar disipador.", "Soldar capacitores.", "Test de audio."]} simOn={ampActive} setSimOn={setAmpActive} simStatus={{info: "20W Peak Power"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'25px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="SPEAKER">🔊</Comp></div>} />

                {/* 6. EVITA OBSTACULOS */}
                <ProjectCard num="6" title="Robot Evita-Paredes Inteligente" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Navegación autónoma con lógica cibernética." functioning="🛰️ Radar Eco: El ultrasonido mide distancias al toque. Lógica: 'Si está cerca, doblar'." materials={["Arduino UNO", "Sensor HC-SR04", "Batería 9V"]} instructions={["Calibrar sonar.", "Cargar código.", "Pruebas de ruta."]} simOn={evitaActive} setSimOn={setEvitaActive} simStatus={{info: "Sonar Activo (40kHz)"}} simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="ARDUINO">🟦</Comp><Comp label="EYES">👀</Comp></div>} />

                {/* 7. SOLDADURA */}
                <ProjectCard num="7" title="Taller de Soldadura Pro" videoId="v=J5Sb21qbpEQ" description="Metalurgia electrónica y uniones definitivas." functioning="🩹 Eutéctico: El estaño funde y se abraza al cobre. Tensión superficial: El flux limpia para una unión joya." materials={["Soldador", "Estaño", "Placa"]} instructions={["Calentar el pad.", "Aportar estaño.", "Dejar enfriar solo."]} simOn={solderActive} setSimOn={setSolderActive} simStatus={{info: "350°C Fusion Point"}} simContent={<div style={{display:'flex',gap:'40px'}}><Comp label="TIP">🖍️</Comp><Comp label="PAD">📍</Comp></div>} />

                {/* 8. HUERTA SOLAR SMART */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar con LEDs Grow" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Sustentabilidad y biotecnología aplicada al cultivo hogareño inteligente con energía limpia."
                    functioning={`🌿 ECO-INGENIERÍA Y BIOPOTENCIA:
                    • Energía Fotovoltaica: El panel convierte fotones en corriente eléctrica líquida que guardamos en la batería.
                    • Espectro PAR: Las plantas crecen re-rápido porque les damos luz Azul (tallo) y Roja (fruto) en el momento justo.
                    • Gestión de Carga: El regulador cuida tu batería pasando de modo Carga a Flote automáticamente.`}
                    materials={["Panel Solar", "Regulador", "Batería", "LEDs Grow"]} 
                    instructions={["Paso 1: Orientá el panel al Norte.", "Paso 2: Instalá el regulador inteligente.", "Paso 3: Colocá las luces PAR.", "Paso 4: ¡Mirá el crecimiento tecnológico!"]} 
                    imageSrc={[{ url: '/proj_huerta_schem.png', label: '📑 Ingeniería' }, { url: '/proj_huerta_wire.png', label: '🔌 Cables' }]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Energía: Gestión Fotovoltaica Activa"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '280px', background: isDay ? '#1a1a1a' : '#050515', borderRadius: '30px', padding: '20px', border: '2px solid #333' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Comp label="SOLAR" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="REGULADOR" color="#111">📟</Comp>
                                <Comp label="BATERÍA" color="#222">🔋</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#333' }}><Comp label="GROW LIGHTS" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '4rem', transform: huertaActive && !isDay ? 'scale(1.1)' : 'scale(1)' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO */}
                <ProjectCard num="9" title="Robot Sumo de Competición" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" description="Fuerza bruta y estrategia robótica." functioning="🚜 CoG: Peso abajo para que no te vuelquen. Sensores IR: Ven el borde y esquivan la caída." materials={["Arduino", "Sensores TCRT5000"]} instructions={["Asegurar peso bajo.", "Cargar código Sumo.", "Lucha en el ring."]} simOn={sumoActive} setSimOn={setSumoActive} simStatus={{info: "Search & Destroy Active"}} simContent={<div style={{border:'5px solid #eee',borderRadius:'50%',padding:'30px'}}><Comp label="SUMO BOT">🚜</Comp></div>} />

                {/* 10. ROBOT FUTBOL */}
                <ProjectCard num="10" title="Robot Futbolista BT" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" description="Control Bluetooth y puntería al arco." functioning="⚽ Bluetooth: Antena 2.4GHz para control remoto. Servo: Pega un chuzazo a la pelota." materials={["Arduino + BT", "Servo Pateador"]} instructions={["Vincular Bluetooth.", "Testear patada.", "Jugar 2 vs 2."]} simOn={futbolActive} setSimOn={setFutbolActive} simStatus={{info: "BT Stadium Connected"}} simContent={<div style={{background:'#1b5e20',padding:'30px',borderRadius:'25px',border:'2px solid #fff'}}><Comp label="GOAT BOT">🚜</Comp><div style={{marginTop:'15px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '10rem', textAlign: 'center', opacity: 0.8, padding: '10rem', borderTop: '3px solid rgba(0,242,255,0.4)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: '4px' }}>SIMUTEC 2026 - INGENIERÍA NACIONAL ARGENTINA</p>
                <p style={{ fontSize: '1.2rem', marginTop: '15px' }}>© SimonTec.com.ar - Laboratorio Tecnológico de Vanguardia.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

import React, { useState, useEffect } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    // Estados de simulación (Control de Laboratorio)
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
    
    // Ciclo de Iluminación PAR (Huerta Solar)
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

    // Componentes del Simulador de Hardware
    const Comp = ({ label, color = '#333', children, style = {} }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', ...style }}>
            <div style={{ background: color, borderRadius: '12px', padding: '14px', border: '2px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 25px rgba(0,0,0,0.8)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
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
            opacity: active ? 1 : 0.35,
            transition: 'all 0.5s ease-in-out',
            boxShadow: active ? `0 0 15px ${color}` : 'none'
        }}></div>
    );

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: '900' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🇦🇷 Proyecto Tecnológico Escolar</h3>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', color: '#eee' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid" style={{ gridTemplateColumns: '1.3fr 1fr', gap: '3.5rem' }}>
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>📚 Manual de Ingeniería y Teoría Científica</h3>
                                <div className="theory-block" style={{ fontSize: '1rem', whiteSpace: 'pre-line', background: 'rgba(0,25,50,0.85)', padding: '35px', borderRadius: '30px', borderLeft: '8px solid var(--primary-color)', marginBottom: '2rem', lineHeight: '1.9', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.2)', color: '#fff', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7)' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Prototipo Final en Laboratorio</h3>
                                    <div className="img-container" style={{ borderRadius: '30px', border: '1px solid #555', overflow: 'hidden', background: '#000' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📑 Glosario Visual: Componentes y Esplazamientos</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#050505', borderRadius: '25px', border: '1px solid #444', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: 'auto', minHeight: '180px', objectFit: 'contain' }} />
                                                <p style={{ fontSize: '0.9rem', padding: '18px', textAlign: 'center', fontWeight: '900', color: 'var(--primary-color)', background: 'rgba(0,0,0,0.7)', textTransform: 'uppercase' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Los Materiales (Listado BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.12)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '1.1rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Manufactura Técnica</h3>
                                <ol className="instructions-list" style={{ fontSize: '1.15rem', lineHeight: '2' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '18px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '45px', border: '4px solid rgba(0,242,255,0.6)', minHeight: '550px', position: 'relative', overflow: 'hidden', padding: '40px', display: 'flex', flexDirection: 'column', boxShadow: '0 0 40px rgba(0,242,255,0.2)' }}>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {simContent}
                                </div>
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative' }}>
                                    <button className="btn-toggle-sim" style={{ padding: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }} onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Finalizar Pruebas de Campo' : '▶️ Ejecutar Simulación de Laboratorio'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.4rem', marginTop: '20px', fontWeight: '900' }}>
                                        {simOn ? '>>> SISTEMA EN OPERACIÓN <<<' : '>>> SISTEMA EN STANDBY <<<'}
                                    </div>
                                    <div style={{ fontSize: '1rem', opacity: 0.9, marginTop: '10px', color: 'var(--primary-color)', fontWeight: 'bold' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '7rem' }}>
                            <h3>📺 SOPORTE AUDIOVISUAL TÉCNICO</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,1)', border: '2px solid var(--primary-color)' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '6px solid var(--primary-color)', paddingBottom: '5rem', marginBottom: '8rem', background: 'linear-gradient(180deg, rgba(0,20,40,0.8) 0%, transparent 100%)' }}>
                <h1 style={{ fontSize: '4.2rem', fontWeight: '900', letterSpacing: '8px' }}>🇦🇷 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.9rem', fontWeight: '300', opacity: 0.9 }}>Laboratorio Nacional de Ingeniería, Diseño Sustentable y Biotecnología.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER ARGIE */}
                <ProjectCard 
                    num="1" title="Unidad de Tracción Diferencial (Eco-Rover)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construí un vehículo capaz de desplazarse mediante la conversión de energía electroquímica. Estudio de Motores DC y Rozamiento Estático."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor y la Ley de Lorentz: Cuando hacés pasar corriente por los bobinados del motor, se genera un campo magnético que interactúa con los imanes permanentes. Esta fuerza (Fuerza de Lorentz) produce el par motor necesario para que el eje gire. ¡Es pura física aplicada laburando para vos!
                    • Inercia y Rozamiento: El chasis (la botella PET) se resiste al cambio de velocidad por culpa de la Inercia. Para que el robot logre avanzar, las ruedas (tapitas) necesitan 'agarrarse' al suelo. Si usás tapitas lisas, el robot va a patinar; por eso tenés que meterle bandas de goma para aumentar el coeficiente de fricción.
                    • Fuerza Contraelectromotriz (Back EMF): Cuando los motores giran re-rápido, ellos mismos se comportan como generadores y crean un voltaje que se opone al de la pila. Esto actúa como un limitador natural de velocidad.`}
                    materials={["Chasis de Botella PET", "2 Motores DC de Corriente Continua", "Porta pilas para pilas AA", "4 Ruedas de Tapita Reciclada", "Cables de conexión"]} 
                    instructions={["Paso 1: Montá los motores alineados sobre el eje transversal de la botella.", "Paso 2: Realizá la conexión eléctrica en paralelo para mantener el voltaje constante (3V).", "Paso 3: Verificá la polaridad para asegurar que ambos vectores de tracción apunten hacia adelante.", "Paso 4: ¡Dale arranque al interruptor y probá el rendimiento de tu Eco-Rover!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial: Motores en Paralelo en CC"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ opacity: 0.3, fontWeight: '900' }}>CHASIS BOTELLA</span>
                            </div>
                            <div style={{ position: 'absolute', left: '40px', top: '50px' }}>
                                <Comp label="ACTUADOR DC IZQ" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', left: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', top: '50px' }}>
                                <Comp label="ACTUADOR DC DER" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', right: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px' }}>
                                <Comp label="CELDAS 3V" color="#222">🔋</Comp>
                            </div>
                            <Wire width="60px" top="130px" left="90px" rotate={-45} active={robotMoving} color="red" />
                            <Wire width="60px" top="130px" left="150px" rotate={-135} active={robotMoving} color="black" />
                        </div>
                    } 
                />

                {/* 2. VELADOR LED ARGIE */}
                <ProjectCard 
                    num="2" title="Velador LED (Carcasa Reflectora de Conservas)" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de una luminaria eficiente basada en el salto cuántico de electrones en semiconductores. Estudio de la Ley de Ohm."
                    functioning={`🔌 CIENCIA DE LOS SEMICONDUCTORES:
                    • Salto Cuántico y Fotones: El LED no tiene un filamento incandescente. Adentro, los electrones saltan entre cristales semiconductores. Al saltar, liberan energía en forma de luz (fotones). ¡Es pura física cuántica laburando en tu mesa!
                    • Regulador por Resistencia: El LED es re-sensible. Si le mandás toda la energía de la fuente USB, lo freís mediante ruptura térmica. Por eso tenés que colocar una Resistencia de 220 Ohms para limitar el flujo de corriente. Aplicamos la Ley de Ohm (V=IxR) para proteger el componente.
                    • Geometría Reflectora: Usamos una lata cilíndrica para rebotar los fotones hacia un solo eje, optimizando la iluminación del espacio de laburo.`}
                    materials={["Diodo LED de alta intensidad", "Resistencia de 220 Ω", "Cable de alimentación USB", "Lata de arvejas (Carcasa)", "CD (Base reflectante)"]} 
                    instructions={["Paso 1: Identificá la polaridad del LED. Soldá la resistencia a la pata más larga (Ánodo).", "Paso 2: Pelá el cable USB y conectá los 5V directos al circuito respetando el código de colores.", "Paso 3: Montá la estructura mecánicamente dentro de la lata aislada.", "Paso 4: ¡Usá el CD de base para mejorar la estética técnica!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Fotónica: Emisión por Semiconductores en Estado Sólido"}}
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
                                <Comp label="ENTRADA USB" color="#111">🔌</Comp>
                            </div>
                            <Wire width="80px" top="155px" left="60px" rotate={0} active={veladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 3. VENTILADOR CD */}
                <ProjectCard 
                    num="3" title="Ventilador CD (Turbina Axial Aerodinámica)" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Desarrollo de una hélice de alto flujo mediante la deformación técnica de polímeros. Estudio del Efecto Bernoulli."
                    functioning={`🌀 AERODINÁMICA Y MECÁNICA DE FLUIDOS:
                    • El Efecto Bernoulli: Al girar el CD con un ángulo de ataque determinado, generás una diferencia de presión entre las caras de la hélice. Esa diferencia de presión 'tracciona' el aire hacia adelante. ¡Es la misma física de sustentación que hace volar a los aviones comerciales!
                    • Par Motor y RPM: Los motores DC giran a miles de Revoluciones por Minuto (RPM). Esa velocidad cinética es la que permite desplazar un gran caudal de aire por segundo.
                    • Balance Dinámico: Si tu hélice está descentrada, la Unidad de Tracción va a vibrar por descompensación de masas. Tenés que equilibrarla para que el giro sea re-suave.`}
                    materials={["Motor DC de 5V", "CD Reciclado (Hélice)", "Madera para chasis estable", "Cable de alimentación USB"]} 
                    instructions={["Paso 1: Realizá los cortes radiales en el CD y aplicá calor para el dobles de alabes.", "Paso 2: Fijá el motor perpendicularmente a la base de madera para mayor estabilidad mecánica.", "Paso 3: Realizá el conexionado USB verificando el sentido de rotación deseado.", "Paso 4: ¡Probá la capacidad de refrigeración de tu turbina axial!"]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Mecánica de Fluidos: Flujo de Aire Turbulento Controlado"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="MOTOR TERMINAL" color="#222">🔘</Comp>
                            <div style={{ position: 'absolute', top: '10px', fontSize: '7rem', opacity: 0.9, ... (ventiladorOn ? {animation: 'spin 0.15s linear infinite'} : {}) }}>💿</div>
                            <div style={{ width: '80px', height: '80px', background: 'saddlebrown', borderRadius: '5px', marginTop: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.6rem', color: '#fff' }}>CHASIS MADERA</span>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', bottom: '60px' }}>
                                <Comp label="USB POWER" color="#111">🔌</Comp>
                            </div>
                            <Wire width="60px" top="100px" left="180px" rotate={45} active={ventiladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 4. VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Robot Araña (Vibrobot Cinético)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Experimento de locomoción por vibración mediante el uso de una masa excéntrica. Estudio sobre inercia rotacional."
                    functioning={`🕷️ FÍSICA DE OSCILACIÓN Y MOVIMIENTO:
                    • Masa Excéntrica: Al colocar un desbalance de masa en el eje del motor, éste genera una fuerza que cambia de dirección constantemente al girar. Esto se llama Fuerza Centrífuga Cíclica. El desequilibrio es lo que hace que el robot 'tiemble' re-fuerte.
                    • Elasticidad y Propulsión: Las patas de alambre actúan como resortes. Al vibrar el motor, las patas rebotan contra el suelo miles de veces por segundo y lanzan al robot hacia adelante.
                    • Ley de Inercia: La frecuencia del micro-motor es capaz de vencer la inercia del robot entero para desplazarlo por fricción sobre la mesa.`}
                    materials={["Micro-motor DC", "Masa excéntrica (Contrapeso)", "Batería tipo moneda 3V", "Alambres metálicos"]} 
                    instructions={["Paso 1: Diseñá las 6 patas elásticas para asegurar el equilibrio estático inicial.", "Paso 2: Integrá el contrapeso asimétrico al eje del motor para generar la vibración constante.", "Paso 3: Realizá el puente eléctrico directo entre los bornes del motor y la batería del sistema.", "Paso 4: ¡Dejalo en el piso y analizá el vector de desplazamiento resultante!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Cinética: Locomoción por Movimiento Oscilatorio Forzado"}}
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
                <ProjectCard num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Procesamiento de potencia sonora analógica mediante circuitos integrados clase AB." functioning="🔊 Ganancia de Audio: El chip amplifica la señal del celu. Disipación Térmica: El aluminio evacúa el calor generado por el laburo del circuito." materials={["Circuito TDA 2005", "Disipador", "Batería 12V"]} instructions={["Montar disipador.", "Soldar capacitores.", "Test de audio."]} simOn={ampActive} setSimOn={setAmpActive} simStatus={{info: "20W Peak Power en Sistemas de Audio"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'25px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="PARLANTE">🔊</Comp></div>} />

                {/* 6. EVITA OBSTACULOS */}
                <ProjectCard num="6" title="Robot Evita-Obstáculos Autónomo" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Navegación inteligente asistida por sonar. Estudio de la tecnología ultrasónica." functioning="🛰️ Radar por Eco-localización: El sensor mide distancias mediante pulsos de 40kHz. Lógica Binaria: Programamos decisiones via microcontrolador." materials={["Arduino UNO", "Sensor HC-SR04", "Batería 9V"]} instructions={["Calibrar sonar.", "Cargar código.", "Ruta autónoma."]} simOn={evitaActive} setSimOn={setEvitaActive} simStatus={{info: "Cibernética: Sonar Activo por Ultrasonido"}} simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="ARDUINO">🟦</Comp><Comp label="SENSORES">👀</Comp></div>} />

                {/* 7. SOLDADURA */}
                <ProjectCard num="7" title="Taller de Soldadura Técnica" videoId="v=J5Sb21qbpEQ" description="Metalurgia electrónica y uniones intermetálicas definitivas mediante aleación Sn/Pb." functioning="🩹 Punto Eutéctico: El estaño funde y se mezcla molecularmente con el cobre. Capilaridad: El flux limpia el pad para una unión perfecta." materials={["Soldador Lapiz", "Estaño", "Placa"]} instructions={["Calentar el pad.", "Aportar estaño.", "Solidificación."]} simOn={solderActive} setSimOn={setSolderActive} simStatus={{info: "Manufactura: Soldadura por Punto Eutéctico a 350°C"}} simContent={<div style={{display:'flex',gap:'40px'}}><Comp label="SOLDADOR">🖍️</Comp><Comp label="CIRCUITO">📍</Comp></div>} />

                {/* 8. HUERTA SOLAR SMART (CON MÁS IMAGENES) */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar con Iluminación PAR" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Ingeniería sustentable aplicada al cultivo tecnificado mediante aprovechamiento fotovoltaico."
                    functioning={`🌿 ECO-BIOTECNOLOGÍA Y ENERGÍA FOTOVOLTAICA:
                    • Conversión Fotovoltaica: El panel captura fotones solares y excita los electrones del Silicio para generar Corriente Continua (CC) re-limpia.
                    • Espectro Fotoperiódico (PAR): Las plantas crecen re-rápido porque les damos luz Azul (450nm) para tallos fuertes y Roja (660nm) para flores y frutos. Usamos LEDs Grow que 'aceleran' la fotosíntesis forzada.
                    • Gestión Energética: El regulador de carga inteligente cuida la batería mediante algoritmos de protección por sobrevoltaje.`}
                    materials={["Panel Solar 12V", "Regulador de Carga", "Batería Recargable", "LEDs Grow PAR"]} 
                    instructions={["Paso 1: Orientación del panel al Norte.", "Paso 2: Instalación del regulador de carga.", "Paso 3: Colocación de luminaria PAR.", "Paso 4: ¡Registro del crecimiento vegetal biotecnológico!"]} 
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Ingeniería Lógica' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Guía de Cables' },
                        { url: '/proj_huerta_night.png', label: '🌙 Ciclo Nocturno' },
                        { url: '/proj_huerta_panel.png', label: '☀️ Celda Solar' },
                        { url: '/proj_huerta_control.png', label: '📟 Controlador' },
                        { url: '/proj_huerta.png', label: '🌿 Planta Lab' }
                    ]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Sustentabilidad: Gestión Fotovoltaica Inteligente"}}
                    simContent={
                        <div style={{ position: 'relative', width: '310px', height: '300px', background: isDay ? '#151515' : '#050520', borderRadius: '35px', padding: '25px', border: '2px solid #333' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Comp label="SOLAR CELL" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="CPU SOLAR" color="#111">📟</Comp>
                                <Comp label="POWER BANK" color="#222">🔋</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#333' }}><Comp label="PAR LIGHTS" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '25px', right: '40px', fontSize: '4.5rem', transition: 'transform 2s', transform: huertaActive && !isDay ? 'scale(1.15)' : 'scale(1)' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO */}
                <ProjectCard num="9" title="Robot Sumo de Competición" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" description="Máquinas de combate deportivo basadas en el equilibrio técnico y la reflexión infrarroja." functioning="🚜 Geometría de Tracción: Centro de gravedad bajo para evitar el vuelco. Sensores Infrarrojos: Detectan el perímetro del Dohyo para esquivar la caída." materials={["Arduino", "Sensores IR TCRT5000"]} instructions={["Chasis robusto.", "Calibrar sensores.", "Combate en pista."]} simOn={sumoActive} setSimOn={setSimOn} simStatus={{info: "Combate: Algoritmos de Búsqueda Seguros"}} simContent={<div style={{border:'5px solid #eee',borderRadius:'50%',padding:'35px'}}><Comp label="SUMO BOT">🚜</Comp></div>} />

                {/* 10. ROBOT FUTBOL */}
                <ProjectCard num="10" title="Robot Futbolista Controlado (¡Gol Argentino!)" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" description="Coordinación deportiva mediante telemetría inalámbrica y servomécanica." functioning="⚽ Bluetooth UART: Protocolo de comunicación a 2.4GHz para control remoto. Servomecanismo: Pega un chuzazo mecánico a la pelota con un actuador de posición." materials={["Arduino + HC-05", "Servo de Patada"]} instructions={["Vinculación inalámbrica.", "Calibrar tiro.", "Torneo 2 vs 2."]} simOn={futbolActive} setSimOn={setFutbolActive} simStatus={{info: "Telemetría: Conexión Inalámbrica Estable"}} simContent={<div style={{background:'#1b5e20',padding:'35px',borderRadius:'30px',border:'3px solid #fff'}}><Comp label="GOAT 10">🚜</Comp><div style={{marginTop:'18px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '12rem', textAlign: 'center', opacity: 0.8, padding: '12rem', borderTop: '4px solid rgba(0,242,255,0.5)', background: 'linear-gradient(0deg, rgba(0,20,40,0.8) 0%, transparent 100%)' }}>
                <p style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-color)', letterSpacing: '5px' }}>SIMUTEC 2026 - INGENIERÍA NACIONAL ARGENTINA</p>
                <p style={{ fontSize: '1.2rem', marginTop: '18px' }}>© SimonTec.com.ar - Laboratorio Tecnológico de Vanguardia Escolar.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

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
            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>{label}</span>
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
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', minWidth: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: '900' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🤖 Robótica Educativa: El Desafío</h3>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', color: '#eee' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>📚 Manual del Pequeño Ingeniero</h3>
                                <div className="theory-block" style={{ fontSize: '1rem', whiteSpace: 'pre-line', background: 'rgba(0,25,50,0.85)', padding: '35px', borderRadius: '30px', borderLeft: '8px solid var(--primary-color)', marginBottom: '2rem', lineHeight: '1.9', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.2)', color: '#fff', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7)' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Prototipo Terminada</h3>
                                    <div className="img-container" style={{ borderRadius: '30px', border: '1px solid #555', overflow: 'hidden', background: '#000' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📑 Glosario Visual de Robótica</h3>
                                    <div className="gallery-grid">
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
                                <h3>🛠️ Materiales Necesarios (BOM)</h3>
                                <div className="materials-list">
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

                            <div className="simulacion-area" style={{ minHeight: '550px', position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,242,255,0.2)' }}>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    {simContent}
                                </div>
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative', width: '100%' }}>
                                    <button className="btn-toggle-sim" style={{ padding: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }} onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Frenar el Laboratorio' : '▶️ ¡Dale vida al Robot!'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.4rem', marginTop: '20px', fontWeight: '900' }}>
                                        {simOn ? '>>> SISTEMA EN OPERACIÓN <<<' : '>>> SISTEMA EN STANDBY <<<'}
                                    </div>
                                    <div style={{ fontSize: '1rem', opacity: 0.9, marginTop: '10px', color: 'var(--primary-color)', fontWeight: 'bold' }}>{simStatus?.info}</div>
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
            <header className="proyectos-header" style={{ borderBottom: '6px solid var(--primary-color)', paddingBottom: '3.5rem', marginBottom: '5rem', background: 'linear-gradient(180deg, rgba(0,20,40,0.8) 0%, transparent 100%)' }}>
                <h1 style={{ fontWeight: '900', letterSpacing: '5px' }}>🚀 ROBÓTICA EDUCATIVA: PROYECTOS CON RECICLADOS</h1>
                <p style={{ fontSize: '1.7rem', fontWeight: '300', opacity: 0.9 }}>Tecnología inteligente, sustentable e innovadora para el siglo XXI.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT EXPLORADOR */}
                <ProjectCard 
                    num="1" title="Robot Explorador Terrestre (Eco-Bot)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construí tu primer robot móvil usando una botella reciclada. Aprendé cómo los motores de corriente continua (CC) nos permiten explorar el entorno."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor y la Ley de Lorentz: Cuando hacés pasar corriente por los bobinados del motor, se genera un campo magnético que interactúa con los imanes permanentes. Esta fuerza produce el par motor necesario para que el eje gire. 
                    • Inercia y Rozamiento: El chasis (la botella PET) se resiste al cambio de velocidad por culpa de la Inercia. Para que el robot logre avanzar, las ruedas necesitan 'agarrarse' al suelo.
                    • Fuerza Contraelectromotriz (Back EMF): Cuando los motores giran re-rápido, ellos mismos crean un voltaje que se opone al de la pila, limitando la velocidad máxima.`}
                    materials={["Chasis PET", "2 Motores CC de 3V", "Pilas AA", "Ruedas de Tapita"]} 
                    instructions={["Paso 1: Pegá los motores a la base de la botella.", "Paso 2: Conectalos en paralelo a las pilas.", "Paso 3: Verificá que la polaridad sea correcta.", "Paso 4: ¡Dejá que tu explorador recorra la mesa!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial Activa"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)' }}></div>
                            <div style={{ position: 'absolute', left: '40px', top: '50px' }}>
                                <Comp label="MOTOR A" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', left: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', top: '50px' }}>
                                <Comp label="MOTOR B" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', right: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                        </div>
                    } 
                />

                {/* 2. LUMINARIA ELECTRÓNICA */}
                <ProjectCard 
                    num="2" title="Luminaria Electrónica Sustentable" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de un sistema de iluminación inteligente usando semiconductores y materiales de desecho metálico."
                    functioning={`🔌 CIENCIA DE LOS SEMICONDUCTORES:
                    • Salto Cuántico: El LED emite fotones gracias a que los electrones saltan entre cristales semiconductores.
                    • Regulador por Resistencia: Limitamos el flujo de corriente para evitar la ruptura térmica mediante una resistencia de 220 Ω.
                    • Geometría Reflectora: Usamos una lata cilíndrica para rebotar los fotones hacia un solo eje.`}
                    materials={["LED Brillante", "Resistencia Limitadora", "Cable USB", "Lata de Conserva", "CD"]} 
                    instructions={["Paso 1: Soldá la resistencia al LED.", "Paso 2: Conectá los 5V USB.", "Paso 3: Montá el reflector.", "Paso 4: ¡Iluminá tu espacio de estudio!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Fotónica Aplicada"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', opacity: 0.5 }}></div>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '30px', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
                            </div>
                        </div>
                    } 
                />

                {/* 3. TURBO VENTILADOR */}
                <ProjectCard 
                    num="3" title="Turbo-Ventilador Experimental" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Desarrollo de una turbina de flujo axial optimizada mediante materiales poliméricos deformados térmicamente."
                    functioning={`🌀 DINÁMICA DE FLUIDOS:
                    • Efecto Bernoulli: La diferencia de presión generada por las aspas tracciona el aire hacia adelante.
                    • Par Motor: Los motores DC giran a miles de RPM convirtiendo la energía eléctrica en cinética de aire.
                    • Balance Dinámico: Evitamos la vibración centrando el eje de rotación.`}
                    materials={["Motor DC Rápido", "CD Reciclado", "Hélice Térmica", "Soporte Estable"]} 
                    instructions={["Paso 1: Deformá el CD con calor.", "Paso 2: Acoplá el motor.", "Paso 3: Conectá la potencia.", "Paso 4: ¡Sentí la fuerza del aire!"]} 
                    simOn={ventiladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Flotabilidad y Flujo de Aire"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="CORE MOTOR" color="#222">🔘</Comp>
                            <div style={{ position: 'absolute', top: '10px', fontSize: '7rem', opacity: 0.9, ... (ventiladorOn ? {animation: 'spin 0.15s linear infinite'} : {}) }}>💿</div>
                        </div>
                    } 
                />

                {/* 4. ENJAMBRE VIBROBOT */}
                <ProjectCard 
                    num="4" title="Enjambre de Micro-Robots Vibratorios" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Mini-robots capables de desplazarse mediante impulsos vibratorios rítmicos. Estudio de la cinemática experimental."
                    functioning={`🕷️ FÍSICA DE OSCILACIÓN:
                    • Masa Excéntrica: Generamos una fuerza centrífuga cíclica mediante un desbalance en el eje.
                    • Elasticidad: Las patas actúan como resortes que convierten el temblor en avance direccional.
                    • Fricción Estática: La vibración vence la inercia del sistema permitiendo el desplazamiento.`}
                    materials={["Micro-motor DC", "Masa Desbalanceada", "Pila Botón", "Patas de Alambre"]} 
                    instructions={["Paso 1: Armá la estructura elástica.", "Paso 2: Acoplá la masa excéntrica.", "Paso 3: Cerrá el circuito.", "Paso 4: ¡Mirá el comportamiento del enjambre!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Cinética de Vibración"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={aranaMoving ? 'arana-moving' : ''} style={{ position: 'relative', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                                <Comp label="CORE ACTUADOR" color="#111">⚙️</Comp>
                                <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '1rem', animation: aranaMoving ? 'jitter 0.1s infinite' : 'none' }}>⚖️</div>
                            </div>
                        </div>
                    } 
                />

                {/* 5. AUDIO HI-FI */}
                <ProjectCard num="5" title="Sistema de Audio Hi-Fi DIY" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Procesamiento analógico de potencia sonora para reproductores digitales." functioning="🔊 Ganancia: Amplificamos señales débiles. Disipación: El aluminio evacúa calor eficiente." materials={["Chip TDA 2005", "Disipador Térmico"]} instructions={["Montar chip.", "Soldar filtros.", "Calibrar entrada."]} simOn={ampActive} setSimOn={setAmpActive} simStatus={{info: "Procesamiento de Audio"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'25px'}}><Comp label="AMPLIFICADOR">🔳</Comp><Comp label="SALIDA">🔊</Comp></div>} />

                {/* 6. ROBOT EVASOR */}
                <ProjectCard num="6" title="Robot Inteligente Autónomo (Evasor)" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Entidad robótica capaz de tomar decisiones espaciales mediante sonar por eco-localización." functioning="🛰️ Ultrasonido: Pulsos de 40kHz para mapear el entorno. Lógica: Algoritmos de evasión por software." materials={["Arduino", "Sensor Ultrasónico"]} instructions={["Configurar sonar.", "Cargar lógica.", "Ruta libre."]} simOn={evitaActive} setSimOn={setEvitaActive} simStatus={{info: "Navegación Cibernética"}} simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="ARDUINO">🟦</Comp><Comp label="OJOS SONAR">👀</Comp></div>} />

                {/* 7. PRACTICA SOLDADURA */}
                <ProjectCard num="7" title="Práctica de Soldadura Profesional" videoId="v=J5Sb21qbpEQ" description="Dominio de uniones intermetálicas definitivas. Un arte esencial para todo técnico." functioning="🩹 Eutéctico: Aleación Sn/Pb para uniones de baja resistencia. Flux: Limpieza química para mojado de pads." materials={["Soldador", "Estaño", "Flux"]} instructions={["Calentar placa.", "Aportar metal.", "Enfriamiento."]} simOn={solderActive} setSimOn={setSolderActive} simStatus={{info: "Manufactura PCB"}} simContent={<div style={{display:'flex',gap:'40px'}}><Comp label="PUNTA TÉRMICA">🖍️</Comp><Comp label="PAD PCB">📍</Comp></div>} />

                {/* 8. HUERTA TECNIFICADA */}
                <ProjectCard 
                    num="8" title="Sistema de Huerta Tecnificada Solar" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Automatización de cultivos mediante energía fotovoltaica y optimización lumínica PAR."
                    functioning={`🌿 ECO-TECNOLOGÍA:
                    • Fotovoltaica: Los fotones excitan al Silicio para generar electricidad.
                    • PAR: Luz Azul (450nm) y Roja (660nm) para fotosíntesis forzada.
                    • Gestión: El regulador protege la batería inteligentemente.`}
                    materials={["Panel Fotovoltaico", "Regulador Inteligente", "Luminaria Grow"]} 
                    instructions={["Paso 1: Orientar al Norte.", "Paso 2: Conectar batería.", "Paso 3: Configurar luces.", "Paso 4: ¡Cultivar ciencia!"]} 
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Ingeniería' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Conexiones' },
                        { url: '/proj_huerta_night.png', label: '🌙 Ciclo Nocturno' },
                        { url: '/proj_huerta_panel.png', label: '☀️ Celda Solar' },
                        { url: '/proj_huerta_control.png', label: '📟 Controlador' },
                        { url: '/proj_huerta.png', label: '🌿 Planta Lab' }
                    ]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Gestión Bio-Solar"}}
                    simContent={
                        <div style={{ position: 'relative', width: '310px', height: '300px', background: isDay ? '#151515' : '#050520', borderRadius: '35px', padding: '25px', border: '2px solid #333' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Comp label="SOLAR" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="CONTROLLER" color="#111">📟</Comp>
                                <Comp label="BATTERY" color="#222">🔋</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#333' }}><Comp label="GROW LIGHT" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '25px', right: '40px', fontSize: '4.5rem' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. DESAFIO SUMO */}
                <ProjectCard num="9" title="Robot de Competición: Desafío de Sumo" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" description="Máquina de combate autónoma diseñada para el control espacial y el empuje de alta potencia." functioning="🚜 Geometría: Centro de gravedad bajo. Percepción: Sensores infrarrojos para detección de bordes y enemigos." materials={["Arduino", "Motores High Torque"]} instructions={["Armar chasis pesado.", "Lógica de ataque.", "Duelo en el ring."]} simOn={sumoActive} setSimOn={setSumoActive} simStatus={{info: "Algoritmo de Combate"}} simContent={<div style={{border:'5px solid #eee',borderRadius:'50%',padding:'35px'}}><Comp label="RETA SUMO">🚜</Comp></div>} />

                {/* 10. TORNEO FUTBOL */}
                <ProjectCard num="10" title="Robot de Competición: Torneo de Fútbol" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" description="Sistema de telemetría y actuación mecánica de alta velocidad para deportes robóticos." functioning="⚽ Bluetooth: Comunicación inalámbrica a 2.4GHz. Actuador: Servomecanismo de posición para disparo de precisión." materials={["Arduino + BT", "Servo de Tiro"]} instructions={["Sincronizar móvil.", "Probar patada.", "¡Ganar el torneo!"]} simOn={futbolActive} setSimOn={setFutbolActive} simStatus={{info: "Telemetría Estable"}} simContent={<div style={{background:'#1b5e20',padding:'35px',borderRadius:'30px',border:'3px solid #fff'}}><Comp label="CRAK 10">🚜</Comp><div style={{marginTop:'18px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '12rem', textAlign: 'center', opacity: 0.8, padding: '10rem', borderTop: '4px solid rgba(0,242,255,0.5)' }}>
                <p style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-color)', letterSpacing: '5px' }}>TECNOLOGÍA E INNOVACIÓN - SIMUTEC 2026</p>
                <p style={{ fontSize: '1.2rem', marginTop: '18px' }}>© SimonTec.com.ar - Proyectos tecnológicos, sustentables e innovadores.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

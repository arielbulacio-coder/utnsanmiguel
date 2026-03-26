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
                        <h3>🇦🇷 Proyecto Tecnológico Escolar</h3>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', color: '#eee' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
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
                                    <h3>📑 Glosario Visual de Componentes</h3>
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
                                <h3>🛠️ Los Materiales (Listado BOM)</h3>
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
                                        {simOn ? '🛑 Finalizar Pruebas' : '▶️ Ejecutar Simulación'}
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
                <h1 style={{ fontWeight: '900', letterSpacing: '5px' }}>🇦🇷 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.7rem', fontWeight: '300', opacity: 0.9 }}>Laboratorio Nacional de Ingeniería, Diseño Sustentable y Biotecnología.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER */}
                <ProjectCard 
                    num="1" title="Unidad de Tracción Diferencial (Eco-Rover)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construí un vehículo capaz de desplazarse mediante la conversión de energía electroquímica. Estudio de Motores DC y Rozamiento Estático."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor y la Ley de Lorentz: Cuando hacés pasar corriente por los bobinados del motor, se genera un campo magnético que interactúa con los imanes permanentes. Esta fuerza produce el par motor necesario para que el eje gire. 
                    • Inercia y Rozamiento: El chasis (la botella PET) se resiste al cambio de velocidad por culpa de la Inercia. Para que el robot logre avanzar, las ruedas necesitan 'agarrarse' al suelo.
                    • Fuerza Contraelectromotriz (Back EMF): Cuando los motores giran re-rápido, ellos mismos crean un voltaje que se opone al de la pila, limitando la velocidad máxima.`}
                    materials={["Chasis de Botella PET", "2 Motores DC", "Pilas AA", "4 Tapitas de Gaseosa"]} 
                    instructions={["Paso 1: Montá los motores alineados.", "Paso 2: Realizá la conexión eléctrica en paralelo.", "Paso 3: Verificá la polaridad.", "Paso 4: ¡Probá tu Eco-Rover!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial: Motores en Paralelo"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', width: '130px', height: '60px', background: 'rgba(0,242,255,0.05)', borderRadius: '30px', border: '2px solid rgba(0,242,255,0.2)' }}></div>
                            <div style={{ position: 'absolute', left: '40px', top: '50px' }}>
                                <Comp label="ACTUADOR IZQ" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', left: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', right: '40px', top: '50px' }}>
                                <Comp label="ACTUADOR DER" color="#222">🔘</Comp>
                                <div style={{ position: 'absolute', right: '-35px', top: '10px', fontSize: '2.5rem', ... (robotMoving ? {animation: 'spin 0.3s linear infinite'} : {}) }}>☸️</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px' }}>
                                <Comp label="CELDAS 3V" color="#222">🔋</Comp>
                            </div>
                        </div>
                    } 
                />

                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED (Carcasa Reflectora)" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseño de una luminaria eficiente basada en el salto cuántico de electrones. Estudio de la Ley de Ohm."
                    functioning={`🔌 CIENCIA DE LOS SEMICONDUCTORES:
                    • Salto Cuántico: El LED emite fotones gracias a que los electrones saltan entre cristales semiconductores.
                    • Regulador por Resistencia: Limitamos el flujo de corriente para evitar la ruptura térmica mediante una resistencia de 220 Ω.
                    • Geometría Reflectora: Usamos una lata cilíndrica para rebotar los fotones hacia un solo eje.`}
                    materials={["Diodo LED", "Resistencia de 220 Ω", "Cable USB", "Lata de arvejas", "CD"]} 
                    instructions={["Paso 1: Soldá la resistencia al LED.", "Paso 2: Conectá los 5V USB.", "Paso 3: Montá dentro de la lata.", "Paso 4: ¡Usá el CD de base!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Fotónica: Emisión por Semiconductores"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', opacity: 0.5 }}></div>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '30px', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
                            </div>
                        </div>
                    } 
                />

                {/* 3. VENTILADOR CD */}
                <ProjectCard 
                    num="3" title="Ventilador CD (Turbina Axial)" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Desarrollo de una hélice de alto flujo mediante polímeros reciclados. Estudio del Efecto Bernoulli."
                    functioning={`🌀 DINÁMICA DE FLUIDOS:
                    • Efecto Bernoulli: La diferencia de presión generada por las aspas tracciona el aire hacia adelante.
                    • Par Motor: Los motores DC giran a miles de RPM convirtiendo la energía eléctrica en cinética de aire.
                    • Balance Dinámico: Evitamos la vibración centrando el eje de rotación.`}
                    materials={["Motor DC", "CD Reciclado", "Base de Madera", "Cable USB"]} 
                    instructions={["Paso 1: Cortá y doblá el CD.", "Paso 2: Fijá el motor a la base.", "Paso 3: Conectá al USB.", "Paso 4: ¡Probá tu turbina!"]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simStatus={{info: "Mecánica: Flujo de Aire Turbulento"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Comp label="MOTOR DC" color="#222">🔘</Comp>
                            <div style={{ position: 'absolute', top: '10px', fontSize: '7rem', opacity: 0.9, ... (ventiladorOn ? {animation: 'spin 0.15s linear infinite'} : {}) }}>💿</div>
                        </div>
                    } 
                />

                {/* 4. VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Robot Araña (Vibrobot)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Experimento de locomoción por vibración. Estudio sobre inercia rotacional y fuerzas centrífugas."
                    functioning={`🕷️ FÍSICA DE OSCILACIÓN:
                    • Masa Excéntrica: Generamos una fuerza centrífuga cíclica mediante un desbalance en el eje.
                    • Elasticidad: Las patas actúan como resortes que convierten el temblor en avance direccional.
                    • Fricción Estática: La vibración vence la inercia del sistema permitiendo el desplazamiento.`}
                    materials={["Micro-motor DC", "Masa excéntrica", "Pila botón 3V", "Alambres"]} 
                    instructions={["Paso 1: Diseñá las 6 patas.", "Paso 2: Integrá el contrapeso.", "Paso 3: Conectá la batería.", "Paso 4: ¡Mirá cómo corre!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simStatus={{info: "Cinética: Locomoción por Vibración"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={aranaMoving ? 'arana-moving' : ''} style={{ position: 'relative', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                                <Comp label="CORE MOTOR" color="#111">⚙️</Comp>
                                <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '1rem', animation: aranaMoving ? 'jitter 0.1s infinite' : 'none' }}>⚖️</div>
                            </div>
                        </div>
                    } 
                />

                {/* 5. AMPLIFICADOR */}
                <ProjectCard num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" description="Procesamiento analógico de potencia sonora." functioning="🔊 Ganancia: Amplificamos milivoltios a vatios realies. Disipación: El aluminio evacúa calor." materials={["TDA 2005", "Batería 12V"]} instructions={["Montar disipador.", "Soldar capacitores.", "Test de audio."]} simOn={ampActive} setSimOn={setAmpActive} simStatus={{info: "Audio de Alta Fidelidad"}} simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'25px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="DB">🔊</Comp></div>} />

                {/* 6. EVITA OBSTACULOS */}
                <ProjectCard num="6" title="Robot Evita-Obstáculos Autónomo" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" description="Navegación inteligente asistida por sonar." functioning="🛰️ Ultrasonido: Enviamos pulsos a 40kHz y medimos el eco. Lógica: Decisiones autonómas por código." materials={["Arduino", "Sensor HC-SR04"]} instructions={["Calibrar sonar.", "Cargar código.", "Ruta libre."]} simOn={evitaActive} setSimOn={setEvitaActive} simStatus={{info: "Cibernética: Sonar Activo"}} simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="ARDUINO">🟦</Comp><Comp label="SENS">👀</Comp></div>} />

                {/* 7. SOLDADURA */}
                <ProjectCard num="7" title="Taller de Soldadura Técnica" videoId="v=J5Sb21qbpEQ" description="Metalurgia electrónica y uniones intermetálicas." functioning="🩹 Eutéctico: El estaño se mezcla con el cobre atómicamente. Flux: Limpieza química del pad." materials={["Soldador", "Estaño", "Pasta"]} instructions={["Calentar placa.", "Aportar estaño.", "Punto espejo."]} simOn={solderActive} setSimOn={setSolderActive} simStatus={{info: "Manufactura Técnica"}} simContent={<div style={{display:'flex',gap:'40px'}}><Comp label="PUNTA">🖍️</Comp><Comp label="PAD">📍</Comp></div>} />

                {/* 8. HUERTA SOLAR SMART */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar con Iluminación PAR" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Ingeniería sustentable y biotecnología aplicada."
                    functioning={`🌿 ECO-TECNOLOGÍA:
                    • Fotovoltaica: Los fotones excitan al Silicio para generar electricidad.
                    • PAR: Luz Azul (450nm) y Roja (660nm) para fotosíntesis forzada.
                    • Gestión: El regulador protege la batería inteligentemente.`}
                    materials={["Panel Solar", "Regulador", "LEDs Grow"]} 
                    instructions={["Paso 1: Panel al Norte.", "Paso 2: Conectar regulador.", "Paso 3: Luces PAR.", "Paso 4: ¡Crecer!"]} 
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Ingeniería' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Conexiones' },
                        { url: '/proj_huerta_night.png', label: '🌙 Ciclo Nocturno' },
                        { url: '/proj_huerta_panel.png', label: '☀️ Celda Solar' },
                        { url: '/proj_huerta_control.png', label: '📟 Controlador' },
                        { url: '/proj_huerta.png', label: '🌿 Planta Lab' }
                    ]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Gestión Inteligente"}}
                    simContent={
                        <div style={{ position: 'relative', width: '310px', height: '300px', background: isDay ? '#151515' : '#050520', borderRadius: '35px', padding: '25px', border: '2px solid #333' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Comp label="SOLAR" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="CPU" color="#111">📟</Comp>
                                <Comp label="BATT" color="#222">🔋</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#333' }}><Comp label="GROW" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '25px', right: '40px', fontSize: '4.5rem' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO */}
                <ProjectCard num="9" title="Robot Sumo de Competición" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" description="Equilibrio técnico y estrategia autónoma." functioning="🚜 Geometría: CoG bajo para estabilidad. Infrarrojo: Detección de perímetro TCRT5000." materials={["Arduino", "Motores Torque"]} instructions={["Armar chasis.", "Testear IR.", "Entrar al ring."]} simOn={sumoActive} setSimOn={setSumoActive} simStatus={{info: "Búsqueda Infrarroja"}} simContent={<div style={{border:'5px solid #eee',borderRadius:'50%',padding:'35px'}}><Comp label="SUMO BOT">🚜</Comp></div>} />

                {/* 10. ROBOT FUTBOL */}
                <ProjectCard num="10" title="Robot Futbolista Controlado" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" description="Telemetría inalámbrica y servomécanica deportiva." functioning="⚽ Bluetooth UART: Control vía radiofrecuencia. Serovmecanismo: Actuador de tiro de precisión." materials={["Arduino", "Bluetooth", "Servo"]} instructions={["Vincular BT.", "Calibrar servo.", "Arranque 2v2."]} simOn={futbolActive} setSimOn={setFutbolActive} simStatus={{info: "Conectividad Bluetooth"}} simContent={<div style={{background:'#1b5e20',padding:'35px',borderRadius:'30px',border:'3px solid #fff'}}><Comp label="GOAT 10">🚜</Comp><div style={{marginTop:'18px'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '12rem', textAlign: 'center', opacity: 0.8, padding: '10rem', borderTop: '4px solid rgba(0,242,255,0.5)' }}>
                <p style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-color)', letterSpacing: '5px' }}>SIMUTEC 2026</p>
                <p style={{ fontSize: '1.2rem', marginTop: '18px' }}>© SimonTec.com.ar - Laboratorio Tecnológico Escolar.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

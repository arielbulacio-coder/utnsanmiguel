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
    
    // Ciclo día/noche para la Huerta Solar (Simula el paso de las horas en la huerta)
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        let interval;
        if (huertaActive) {
            interval = setInterval(() => {
                setIsDay(prev => !prev);
            }, 7000); // 7 segundos de "día" y 7 de "noche" (LEDs ON)
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
                        <h3>🇦🇷 Desafío para Inventores (¡Metele Garra!)</h3>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#ccc' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            <div className="proyecto-section theory-section">
                                <h3>🧠 Clase de Ingeniería (Corpus de Ciencia Re-Pro)</h3>
                                <div className="theory-block" style={{ fontSize: '0.94rem', whiteSpace: 'pre-line', background: 'rgba(0,18,35,0.85)', padding: '32px', borderRadius: '28px', borderLeft: '7px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.8', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.15)', color: '#fff', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)' }}>
                                    {functioning}
                                </div>
                            </div>

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Foto del Laboratorio (Referencia Real)</h3>
                                    <div className="img-container" style={{ borderRadius: '28px', border: '1px solid #555', overflow: 'hidden', boxShadow: '0 18px 45px rgba(0,0,0,0.7)' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📑 Planos, Diagramas y Conexiones</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '22px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ background: '#080808', borderRadius: '22px', border: '1px solid #444', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.78rem', padding: '14px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Los Materiales (BOM - Listado de Laburo)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '22px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '1rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Manufactura (Pasos de armado)</h3>
                                <ol className="instructions-list" style={{ fontSize: '1.05rem', lineHeight: '1.9' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '14px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '40px', border: '3px solid rgba(0,242,255,0.5)', minHeight: '480px', position: 'relative', overflow: 'hidden', padding: '35px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {simContent}
                                </div>
                                <div className="sim-controls" style={{ zIndex: 10, position: 'relative' }}>
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Frenar el Laboratorio' : '▶️ ¡Dale Play a la Ciencia!'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1.2rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA LABURANDO <<<' : '>>> SISTEMA EN REPOSO <<<'}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '8px', color: 'var(--primary-color)' }}>{simStatus.info}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '5rem' }}>
                            <h3>📺 SOPORTE AUDIOVISUAL (Mirá cómo se hace)</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,1)' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '4px solid var(--primary-color)', paddingBottom: '3.5rem', marginBottom: '6rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '5px' }}>🇦🇷 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.6rem', fontWeight: '300' }}>Dominá las leyes de la física laburando con proyectos de ingeniería sustentable.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ECO ROVER ARGIE */}
                <ProjectCard 
                    num="1" title="Robot Eco-Rover (Bebida-Bot)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construí un vehículo que se mueve solo usando una botella de plástico. Aprendé cómo los motores transforman la pila en movimiento."
                    functioning={`🔬 CLASE MAGISTRAL DE MOVIMIENTO:
                    • El Motor y la Ley de Lorentz: Cuando hacés pasar corriente por los cables del motor, se genera una fuerza invisible en presencia de imanes. Esa fuerza (Fuerza de Lorentz) empuja el eje del motor y lo hace girar. ¡Es como un tirón magnético constante que no para de laburar!
                    • Inercia y Rozamiento: La botella (nuestro chasis) se resiste a moverse por culpa de la Inercia. Para que salga arando, las ruedas necesitan 'agarrarse' al piso. Si usás tapitas lisas, el robot va a patinar como loco; por eso tenés que meterle gomas o cinta para aumentar el agarre (coeficiente de fricción).
                    • La Fuerza Contraelectromotriz (Back EMF): Fijate este secreto... cuando el motor gira re rápido, él mismo fabrica electricidad que intenta frenarlo. Es por esto que tu robot tiene una velocidad máxima y no sigue acelerando para siempre.`}
                    materials={["Botella de plástico (PET)", "2 Motores DC de 3V", "Porta pilas y 2 pilas AA", "4 Tapitas de gaseosa", "Interruptor"]} 
                    instructions={["Paso 1: Pegá los motores bien derechitos en la parte de atrás de la botella.", "Paso 2: Conectalos en paralelo para que a cada motor le lleguen los 3 voltios de las pilas.", "Paso 3: Si un motor gira para el otro lado, dalo vuelta o cambiá los cables de posición.", "Paso 4: ¡Dale arranque al interruptor y mirá cómo corre tu Eco-Rover!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simStatus={{info: "Tracción Diferencial: Motores en Paralelo"}}
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
                                <Comp label="PILAS AA" color="#222">🔋</Comp>
                            </div>
                            <Wire width="60px" top="130px" left="90px" rotate={-45} active={robotMoving} color="red" />
                            <Wire width="60px" top="130px" left="150px" rotate={-135} active={robotMoving} color="black" />
                        </div>
                    } 
                />

                {/* 2. VELADOR LED ARGIE */}
                <ProjectCard 
                    num="2" title="Velador LED Cuántico (Lata-Lamp)" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseñá una lámpara que no gasta nada usando un CD y una lata de conservas. Metéte en la física de los electrones."
                    functioning={`🔌 CIENCIA DE LUCES (ELECTRÓNICA):
                    • Salto Cuántico: El LED no tiene un pelito que se quema como las lamparitas comunes de antes. Adentro, los electrones saltan entre cristales (semiconductores). Al saltar, sueltan energía en forma de luz (fotones). ¡Tenés física cuántica laburando para vos en tu mesa!
                    • Resistencia Guardian: El LED es re-delicado. Si le mandás toda la energía de golpe, lo freís en un segundo. Por eso ponés una Resistencia que 'atina' la corriente. Usás la Ley de Ohm (V=IxR) para calcular el freno justo que necesita.
                    • Reflector de CD: Usamos un CD viejo porque su superficie es un espejo re-pro que rebota los fotones para que iluminen más.`}
                    materials={["LED de alto brillo", "Resistencia de 220 Ohms", "Puerto USB reciclado", "Lata de arvejas limpia", "CD viejo"]} 
                    instructions={["Paso 1: Pelá el cable USB y buscá el cable rojo (+) y el negro (-).", "Paso 2: Soldá la resistencia a la pata larga del LED (Anodo). No te equivoques que sino no prende.", "Paso 3: Aislá todo con cinta para que no haya cortos entre los cables.", "Paso 4: Pegá la luz adentro de la lata y usá el CD de base. ¡Fijate qué bien que luce!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simStatus={{info: "Electrónica: Gestión de Fotones"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', bottom: '30px', width: '120px', height: '10px', background: 'silver', borderRadius: '50%', border: '1px solid #888', opacity: 0.5 }}></div>
                            <span style={{ position: 'absolute', bottom: '15px', fontSize: '0.6rem', color: '#444' }}>CD BASE</span>
                            <div style={{ width: '70px', height: '100px', background: 'linear-gradient(to bottom, #777, #333)', borderRadius: '10px 10px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', fontSize: '3rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none' }}>💡</div>
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

                {/* 3. VENTILADOR ARGIE */}
                <ProjectCard 
                    num="3" title="Ventilador CD (Turbo Aerodinámico)" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Hacé tu propio ventilador para el verano usando un CD como hélice. Teoría de fluidos y calor."
                    functioning={`🌀 AERODINÁMICA Y FLUIDOS:
                    • El Efecto Bernoulli: Cuando el CD gira inclinado, corta el aire de una forma que crea una presión diferente adelante y atrás. Eso 'chupa' el aire y lo tira con fuerza hacia vos. ¡Es la misma física que hace que los aviones vuelen!
                    • Ángulo de Ataque: Tenés que doblar las aspas del CD con calor, pero no mucho. Si las doblás mucho, el motor va a laburar re-pesado y se puede quemar. Si las doblás poco, no tira aire. ¡Buscá el punto justo!
                    • Vibraciones: Si el CD está descentrado, tu ventilador va a caminar solo por la mesa. Tenés que equilibrar el peso para que el giro sea perfecto.`}
                    materials={["Motor DC rápido", "CD viejo", "Base de madera", "Cable USB", "Corcho"]} 
                    instructions={["Paso 1: Cortá el CD y doblá las puntitas con calor suave (¡ojo con quemarte!).", "Paso 2: Centrá el motor sobre la base de madera para que no vibre.", "Paso 3: Conectá los cables al USB y probá para qué lado sopla.", "Paso 4: Si tira aire para atrás, dalo vuelta o cambiá los cables del puerto USB."]} 
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
                                <Comp label="ENERGÍA USB" color="#111">🔌</Comp>
                            </div>
                            <Wire width="60px" top="100px" left="180px" rotate={45} active={ventiladorOn} color="red" />
                        </div>
                    } 
                />

                {/* 4. VIBROBOT ARGIE */}
                <ProjectCard 
                    num="4" title="Micro-Araña Vibrobot" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Un robot chiquito que camina vibrando. Teoría sobre fuerza centrífuga y desequilibrio."
                    functioning={`🕷️ FÍSICA DE VIBRACIÓN (SISTEMAS):
                    • Masa Excéntrica: Al ponerle un pesito desbalanceado en un costado del eje al motor, éste 'tiembla' como loco al girar. Ese desequilibrio genera una fuerza que llamamos centrífuga. 
                    • Elasticidad: Las patas de alambre son re-elásticas. Cuando el motor vibra, las patas rebotan contra la mesa miles de veces por segundo y lanzan al robot hacia adelante.
                    • Inercia Rotacional: Como el pesito es chiquito pero gira a mil, la energía que desplaza es suficiente para mover todo el robot.`}
                    materials={["Micro-motor (de joystick o celular)", "Tuerca para el pesito", "Pila botón 3V", "Alambre"]} 
                    instructions={["Paso 1: Armá 6 patas de alambre y pegalas a una base liviana.", "Paso 2: Poné el motor arriba y pegale un pedacito de estaño o una tuerca en la punta del eje.", "Paso 3: Conectá la pila directamente al motor. No necesitás cables largos.", "Paso 4: ¡Soltala en una superficie lisa y mirá cómo corre solita!"]} 
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

                {/* 5. AMPLIFICADOR ARGIE */}
                <ProjectCard 
                    num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" 
                    description="Armáte tu propio equipo de música potente. Ingeniería de sonido y modulación."
                    functioning={`🔊 ELECTRÓNICA DE SONIDO:
                    • Ganancia: El chip toma la música de tu celu y la 'fotocopia' a gran escala usando los 12V de una batería. ¡Hacés que la señal sea re-gigante!
                    • Respuesta en Frecuencia: Un buen amplificador tiene que poder mover tanto el bajo (frecuencias bajas) como los agudos. Usamos capacitores (filtros) para que el sonido salga limpito.
                    • Calor y Disipación: El chip labura tanto que calienta. Si no le ponés el aluminio (disipador), se quema. El calor es el enemigo número 1 de la electrónica.`}
                    materials={["Chip TDA 2005", "Disipador de aluminio", "Capacitores", "Parlante grande", "Batería 12V"]} 
                    instructions={["Paso 1: Atornillá el chip al aluminio antes de prenderlo. ¡Fundamental!", "Paso 2: Soldá todo el circuito siguiendo el diagrama de las pistas.", "Paso 3: Conectá la entrada a un cable jack para enchufar el celu.", "Paso 4: ¡Subí el volumen y sorprendéte cómo suena tu proyecto de ingeniería!"]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simStatus={{info: "Audio: Ganancia de Potencia Analógica"}}
                    simContent={<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}><Comp label="CHIP TDA">🔳</Comp><Comp label="OUTPUT">🔊</Comp></div>} />

                {/* 6. EVITA OBSTACULOS ARGIE */}
                <ProjectCard 
                    num="6" title="Robot Evita-Paredes Autónomo" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" 
                    description="Programá un robot con ojos de ultrasonido. Teoría del radar y la inteligencia artificial."
                    functioning={`🛰️ ROBÓTICA Y RADAR:
                    • El Radar Murciélago: Tu robot grita un sonido que no escuchamos (ultrasonido). El sonido rebota en la pared y vuelve. El Arduino mide el tiempo y calcula la distancia exactita. ¡Sabe a qué distancia está la pared antes de tocarla!
                    • Decisión Lógica: En el código usás 'Condicionales'. Si la distancia es menor a 20cm, frenás y doblás. Estás haciendo que el robot tenga su propio instinto de supervivencia.
                    • Puente H: Es el músculo que maneja los motores. El Arduino le dice para dónde ir y el Puente H le manda la fuerza de las pilas.`}
                    materials={["Placa Arduino UNO", "Sensor ultrasonido HC-SR04", "Chasis metálico y motores", "Puente H L298N", "Batería 9V"]} 
                    instructions={["Paso 1: Armá el chasis y poné los motores. Fijate que las ruedas giren libre.", "Paso 2: Instalás los 'ojos' de ultrasonido en la trompa del robot.", "Paso 3: Conectás todos los cables al Arduino. No te olvides del negativo común.", "Paso 4: Cargá el programa y soltalo en una habitación. ¡Mirá cómo se las ingenia para no chocar!"]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simStatus={{info: "Control: Navegación por Eco-localización"}}
                    simContent={<div style={{display:'flex',gap:'20px'}}><Comp label="CPU ARDUINO">🟦</Comp><Comp label="RADAR SONAR">👀</Comp></div>} />

                {/* 7. SOLDADURA ARGIE */}
                <ProjectCard 
                    num="7" title="Taller de Soldadura Técnica" videoId="v=J5Sb21qbpEQ" 
                    description="Dominá el arte de unir metales con calor. Un técnico que sabe soldar tiene el futuro asegurado."
                    functioning={`🩹 METALURGIA ELECTRÓNICA:
                    • El Estaño: Es un metal que funde a 183°C. Al derretirse, se 'abraza' atómicamente con el cobre de la placa. No es pegamiento, es una unión real de metales.
                    • Capilaridad: Cuando la placa está a la temperatura justa, el estaño fluye solito y se mete en todos lados. Si la punta está sucia, el estaño queda como una bolita (soldadura fría) y no sirve para nada.
                    • Flux: Es el ácido que limpia la mugre del cobre para que el estaño se pegue bien. El estaño re-pro ya trae flux adentro.`}
                    materials={["Soldador tipo lápiz", "Estaño de buena calidad", "Placa de práctica", "Esponja húmeda"]} 
                    instructions={["Paso 1: Calentá la pata y el círculo de cobre al mismo tiempo.", "Paso 2: Acercale el estaño. ¡No lo soples! Si lo soplás, la soldadura se fractura.", "Paso 3: El estaño tiene que quedar brillante como un espejito. Si quedó opaco, está mal.", "Paso 4: Cortá el sobrante de la pata y revisá que no toque nada más."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ JOYA' }, { url: '/proj_soldadura_error.png', label: '❌ RE-MAL' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simStatus={{info: "Manufactura: Soldadura de Punto Eutéctico"}}
                    simContent={<div style={{display:'flex',gap:'30px'}}><Comp label="SOLDA TIP">🖍️</Comp><Comp label="PCB PAD">📍</Comp></div>} />

                {/* 8. HUERTA SOLAR ARGIE - EXPLAYADO */}
                <ProjectCard 
                    num="8" title="Eco-Huerta Solar Smart con LEDs Grow" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="Creá una huerta de alta tecnología que usa el Sol para alimentar luces especiales. Dominá la energía solar y la biotecnología."
                    functioning={`🌿 ECO-INGENIERÍA Y BIOPOTENCIA (FULL DETAIL):
                    • La Magia del Panel Fotovoltaico: El panel está hecho de láminas de Silicio. Cuando los fotones del sol golpean los átomos de Silicio, 'patean' a los electrones y los ponen a correr. ¡Eso es la electricidad! Estamos robándole energía al Sol para guardarla en nuestra batería.
                    • Radiación Fotosintéticamente Activa (PAR): Las plantas no son fanáticas de toda la luz. Ellas aman el color Azul (para que el tallo sea re-grueso) y el Rojo (para fabricar flores y frutos re-grandes). Usamos LEDs Grow que 'bombardean' a la planta con esos colores exactos. ¡Hacés que la planta crea que siempre es mediodía de verano!
                    • Ciclo de Carga y Gestión: El Regulador de carga es el cerebro. Cuida que la batería no se pase de voltaje (Bulk) y, cuando ya está llena, la mantiene 'acariciándola' con un poquito de energía (Flote). Esto asegura que tu huerta tenga energía incluso si llueve por dos días.
                    • Microclima: Al usar luces artificiales controlamos el 'Fotoperiodo'. Podemos engañar a una planta de invierno para que crezca en verano, o viceversa. ¡Sos básicamente un Dios de la botánica!`}
                    materials={["Panel Solar de 12V", "Regulador de carga inteligente", "Batería de gel o litio", "Tiras de LED Grow (Onda PAR)", "Tierra fértil y semillas"]} 
                    instructions={["Paso 1: Ubicá el panel solar apuntando al Norte. En Argentina el sol siempre está 'allá arriba' tirando al norte.", "Paso 2: Conectá los bornes de la batería al regulador. ¡Siempre hacé esto primero antes del panel!", "Paso 3: Instalá las luces por encima de las plantas, a unos 20cm para no darles calor de más.", "Paso 4: Poné las semillas y ajustá el ciclo de luz a 14 horas por día. ¡Fijate cómo crecen re-rápido!"]} 
                    imageSrc={[{ url: '/proj_huerta_schem.png', label: '📑 Plano Técnico' }, { url: '/proj_huerta_wire.png', label: '🔌 Conexiones' }]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simStatus={{info: "Sustentabilidad: Gestión Fotovoltaica y PAR"}}
                    simContent={
                        <div style={{ position: 'relative', width: '300px', height: '250px', background: isDay ? '#1a1a1a' : '#050515', borderRadius: '25px', padding: '15px', border: '1px solid #333' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <Comp label="SOLAR PANEL" color="#003">{isDay ? '☀️' : '🌙'}</Comp>
                                <Comp label="REGULADOR" color="#111">📟</Comp>
                                <Comp label="BATERÍA" color="#222">🔋 {isDay ? '⚡' : '🔻'}</Comp>
                                <div style={{ color: !isDay && huertaActive ? '#f0f' : '#333' }}><Comp label="LEDS GROW" color="transparent">🟣🟣</Comp></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '15px', right: '25px', fontSize: '3.5rem', transition: 'transform 2s', transform: huertaActive && !isDay ? 'scale(1.2)' : 'scale(1)' }}>🌱</div>
                        </div>
                    } 
                />

                {/* 9. ROBOT SUMO ARGIE */}
                <ProjectCard 
                    num="9" title="Robot Sumo: Competencia y Fuerza" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" 
                    description="Diseñá un tanque robótico para sacar al rival de la pista. Teoría de tracción y sensores IR."
                    functioning={`🚜 ESTRATEGIA DE COMBATE (LÓGICA):
                    • Centro de Masa: El truco para que no te saquen volando es ser re-pesado y petizo. Si ponés todo el peso cerca del suelo, tu robot es una roca.
                    • Sensor de Piso (Infrarrojo): Usamos el TCRT5000. Es un sensor que manda luz invisible al piso. Si ve blanco (el borde del ring), le avisa al Arduino: '¡EPA! ¡Frená que nos caemos!'. Ahí el robot da marcha atrás solo.
                    • Tracción 4x4: Con cuatro motores tenés el doble de empuje. Si el otro tiene 2 motores, le vas a ganar por pura potencia física.`}
                    materials={["Arduino UNO", "2 Sensores TCRT5000 (Piso)", "Sensores ultrasonido (Enemigo)", "Motores de alto torque", "Chasis pesado"]} 
                    instructions={["Paso 1: Armá el chasis y ponele pesitos o tornillos para que sea difícil de mover.", "Paso 2: Instalás los sensores de piso en las esquinas delanteras.", "Paso 3: Programá el Arduino para que cuando detecte blanco, dé media vuelta.", "Paso 4: ¡Metelo al círculo y fijate si es capaz de empujar a un oponente solo!"]} 
                    simOn={sumoActive} setSimOn={setSumoActive} 
                    simStatus={{info: "Competencia: Algoritmos de Búsqueda IR"}}
                    simContent={<div style={{border:'3px solid #eee',borderRadius:'50%',padding:'25px'}}><Comp label="SUMO BOT">🚜</Comp></div>} />

                {/* 10. ROBOT FUTBOL ARGIE */}
                <ProjectCard 
                    num="10" title="Robot Futbolista BT (¡Golazo!)" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" 
                    description="Controlá tu robot desde el celu por Bluetooth y armá un torneo de fútbol robótico. Teoría de radiofrecuencia."
                    functioning={`⚽ EL DEPORTE DE LOS ROBOTS (PRO):
                    • El Bluetooth HC-05: Es una antena de 2.4GHz (como el Wi-Fi) pero para distancias cortas. Tu celu manda letras (como 'W', 'A', 'S', 'D') y el Arduino las lee para saber a qué motor darle corriente.
                    • Tracción Vectorial: Como manejás cada rueda por separado, podés hacer que el robot doble sobre su propio eje re-rápido. ¡Es la clave para gambetear al rival!
                    • Actuador de Tiro: Usamos un Servomotor. Es un motor con cerebro que sabé exactamente en qué posición está. Cuando apretás el botón de tiro, el servo pega un 'chuzazo' y manda la pelota al arco.`}
                    materials={["Arduino + Bluetooth HC-05", "Joystick en el celu", "4 Motores DC rápidos", "Servomotor (Pateador)", "Chasis 'bajito'"]} 
                    instructions={["Paso 1: Vinculá el Bluetooth con el celu usando el código 1234.", "Paso 2: Conectá los motores cuidando de no tapar la antena del Bluetooth.", "Paso 3: Cargá el código que interpreta los comandos del joystick.", "Paso 4: ¡Organizá un partido y fijate quién tiene más puntería!"]} 
                    simOn={futbolActive} setSimOn={setFutbolActive} 
                    simStatus={{info: "Conectividad: Control Remoto vía Radiofrecuencia"}}
                    simContent={<div style={{background:'#1b5e20',padding:'25px',borderRadius:'20px',border:'2px solid #fff'}}><Comp label="JUGADOR 10">🚜</Comp><div style={{marginTop:'12px', textAlign:'center'}}>⚽</div></div>} />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '8rem', borderTop: '2px solid rgba(0,242,255,0.3)' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: '3px' }}>SIMUTEC 2026 - MODELO EDUCATIVO NACIONAL</p>
                <p style={{ fontSize: '1rem', marginTop: '12px' }}>© SimonTec.com.ar - Laboratorio de Inventores Argentinos.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

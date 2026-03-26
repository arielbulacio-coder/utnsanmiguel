import React, { useState, useEffect } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
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

    const ProjectCard = ({ title, description, functioning, materials, instructions, simContent, simStatus, simOn, setSimOn, videoId, imageSrc, num, children }) => {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;

        return (
            <div className="proyecto-card">
                <div className="proyecto-content">
                    <h2 className="proyecto-title">
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>🚀 El Desafío del Inventor</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            {functioning && (
                                <div className="proyecto-section theory-section">
                                    <h3>🧠 La Ciencia detrás del Proyecto (¡Para Genios!)</h3>
                                    <div className="theory-block" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line', background: 'rgba(0,10,20,0.6)', padding: '25px', borderRadius: '15px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.7', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)', color: '#eee' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Prototipo en el Laboratorio</h3>
                                    <div className="img-container" style={{ borderRadius: '15px', border: '1px solid #333', overflow: 'hidden' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section highlight-gallery">
                                    <h3>🗺️ Guía Técnica y Planos</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} className="gallery-item-full" style={{ background: '#111', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ Materiales Necesarios (BOM)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.95rem' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Construcción</h3>
                                <ol className="instructions-list" style={{ fontSize: '1rem', lineHeight: '1.7', paddingLeft: '1.2rem' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '25px', border: '1px solid rgba(0,242,255,0.3)', minHeight: '300px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Detener Práctica' : '▶️ Probar Funcionamiento'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1rem', marginTop: '15px', fontWeight: 'bold' }}>
                                        {simOn ? '>>> SISTEMA EN MARCHA <<<' : '>>> ESPERANDO ÓRDENES <<<'}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '3.5rem' }}>
                            <h3>📺 Video Tutorial (¡Seguí los pasos!)</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '3px solid var(--primary-color)', paddingBottom: '3rem', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '2px' }}>🔬 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.4rem', opacity: 0.9 }}>Aprendé tecnología real creando tus propios inventos y robots sustentables.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT MÓVIL SIMPLE */}
                <ProjectCard 
                    num="1" title="Robot Móvil Eco-Rover" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="¿Te imaginás construir un vehículo que se mueva solo usando una botella reciclada? En este desafío vamos a aprender cómo los motores convierten la electricidad en movimiento real."
                    functioning={`🔬 ¿QUÉ PASA POR DENTRO? (LA CIENCIA):
                    • El Motor Mágico: Los motores funcionan gracias al electromagnetismo. Cuando la corriente pasa por adentro, interactúa con imanes y hace que el eje gire con fuerza (eso lo llamamos Torque).
                    • Fuerza Contraelectromotriz (Back EMF): ¡Este es un secreto de ingenieros! Cuando el motor gira muy rápido, él mismo genera un poquito de electricidad que intenta frenarlo. Es como si el robot tuviera su propio límite de velocidad natural.
                    • Tracción y Fricción: Aprendemos a elegir las ruedas. Si patinan en el piso, no hay avance. Por eso le ponemos 'neumáticos' de goma o cinta a nuestras tapitas recicladas.`}
                    materials={["Botella plástica vacía", "2 Motores con sus cables", "Porta pilas y 2 pilas AA", "Tapas de botella (ruedas)", "Cinta o pegamento caliente"]} 
                    instructions={["Paso 1: Pegá los motores a la botella con pegamento. ¡Tienen que estar bien alineados para que el robot vaya derecho!", "Paso 2: Pelá los cables y conectalos a las pilas. Probá si las ruedas giran para el mismo lado.", "Paso 3: Si una rueda gira al revés, ¡no te asustes! Solo da vuelta los dos cables de ese motor.", "Paso 4: Poné el robot en el piso y dale arranque. ¡Acabás de crear transporte robótico!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4.5rem'}}>🤖</div>} 
                    simStatus={{on:"Motores en operación nominal",off:"Circuito abierto (Sin corriente)"}} 
                />
                
                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED Cuántico" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Diseñamos una lámpara moderna que casi no gasta energía. Vamos a entender el secreto de los LEDs, los mismos que están en las pantallas de todos los celulares."
                    functioning={`🔌 CIENCIA DE LUCES (ELECTRÓNICA):
                    • ¿Por qué brilla un LED?: Adentro de ese plástico hay un chip de material 'semiconductor'. Cuando los electrones saltan de un lado a otro (Unión P-N), sueltan energía en forma de luz (fotones). ¡Es pura física cuántica en tu mano!
                    • El Guardián del LED (Resistencia): El LED es muy sensible y glotón. Si le damos mucha electricidad de golpe, se quema. Por eso ponemos una resistencia que 'limita' la corriente (Ley de Ohm).
                    • Potencia USB: Usamos los 5 Voltios de un cable viejo. Es seguro, eficiente y nos enseña a reciclar cables que iban a la basura.`}
                    materials={["Diodo LED de alta potencia", "Resistencia de 220 o 330 ohm", "Cable USB reciclado", "Lata de conservas limpia", "Un CD viejo para reflejar la luz"]} 
                    instructions={["Paso 1: Identificá los cables del USB. Buscamos el cable rojo (+) y el negro (-). El blanco y verde no los usamos.", "Paso 2: Identificá la pata larga del LED (Anodo). Ahí soldamos la resistencia.", "Paso 3: Conectá el cable rojo a la resistencia y el negro a la pata corta del LED.", "Paso 4: Usá el CD como base reflectante y armá el velador dentro de la lata. ¡Iluminación Hi-Tech!"]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 35px yellow' : 'none'}}>💡</div>} 
                    simStatus={{on:"Flujo de electrones activo / Luz ON",off:"Sin polarización (Apagado)"}} 
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3" title="Ventilador de Verano USB" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Aprendé cómo se mueve el aire y creá un ventilador potente usando un CD reciclado como hélice de alta velocidad."
                    functioning={`🌀 CIENCIA DEL AIRE (AERODINÁMICA):
                    • El Truco de Bernoulli: Al girar inclinado, la hélice empuja el aire hacia adelante creando una diferencia de presión. ¡Así es como los aviones logran volar también!
                    • Ángulo de Ataque: Si doblás mucho las paletas del CD, el motor va a ir muy lento porque hace mucha fuerza. Hay que buscar el ángulo justo para que el aire sea fuerte pero el motor libre.
                    • Energía Rotacional: Un motor pequeño puede girar a más de 5.000 vueltas por minuto (RPM). Esa velocidad es la clave para refrescar tu laboratorio.`}
                    materials={["Motor DC de alta velocidad", "Un CD viejo (será nuestra hélice)", "Cargador USB viejo", "Un corcho o tapita para centrar el eje"]} 
                    instructions={["Paso 1: Cortá el CD en 6 o 8 partes iguales (pétalos) usando una tijera o cúter con cuidado.", "Paso 2: Con calor (un encendedor lejos), ablandá el plástico y girá cada pétalo unos 30 grados.", "Paso 3: Pegá el motor a una base firme y el CD al eje del motor cuidando que no vibre.", "Paso 4: Conectá al USB y disfrutá de un ventilador creado totalmente por vos."]} 
                    simOn={ventiladorOn} setSimOn={setVentiladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} 
                    simStatus={{on:"Turbulencia controlada activa",off:"Hélice en reposo estático"}} 
                />

                {/* 4. ARAÑA VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Robot Araña (Vibrobot)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Un pequeño robot que camina vibrando. Vamos a ver cómo algo que parece un error (el desbalance) puede generar movimiento inteligente en la mesa."
                    functioning={`🕷️ FÍSICA DE VIBRACIONES (CINETICA):
                    • Masa Excéntrica: Al ponerle un peso de un solo lado al motor, éste se vuelve 'loco' al girar y genera una fuerza centrífuga que sacude todo el robot.
                    • El Truco de las Patas: Las patas de alambre inclinadas hacen que la araña 'salte' hacia adelante miles de veces por segundo en una micro-escala.
                    • Resonancia Estructural: Si la vibración es muy rápida y coincide con el rebote de las patas, ¡el robot corre como un bicho de verdad!` }
                    materials={["Motor de juguete pequeño", "Un pesito (tuerca o gota de estaño)", "Pila botón CR2032 (3V)", "Alambres para las patas"]} 
                    instructions={["Paso 1: Formá 6 patas con el alambre y pegalas a una base de cartón o plástico liviano.", "Paso 2: Pegá el motor arriba y el pesito en un costado de su eje (esto es la clave para que vibre).", "Paso 3: Conectá la pila directamente a los cables del motor.", "Paso 4: ¡Soltala en la mesa y observá cómo su descontrol se vuelve un caminado rápido!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4.5rem'}}>🕷️</div>} 
                    simStatus={{on:"Movimiento cinético vibratorio",off:"Equilibrio estático total"}} 
                />

                {/* 5. AMPLIFICADOR TDA 2005 */}
                <ProjectCard 
                    num="5" title="Amplificador de Sonido Hi-Fi" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" 
                    description="¡Construí tu propio equipo de música potente! Vamos a ver cómo logramos que una señal chiquita del celular se convierta en un sonido que mueva el aire."
                    functioning={`🔊 INGENIERÍA DE AUDIO (AMPLIFICACIÓN):
                    • El Chip TDA 2005: Es un componente 'clase AB'. Su trabajo es tomar la onda débil que sale de tu celu y 'agrandarla' usando la energía de una batería de 12V.
                    • ¿Por qué calienta tanto?: Convertir electricidad en música genera calor. Por eso usamos un disipador de aluminio para que el chip no se queme por alta temperatura.
                    • Filtros (Capacitores): Estos componentes guardan energía como tanques de agua para que cuando la canción tenga un 'bajo' fuerte, el amplificador tenga energía de sobra.`}
                    materials={["Chip TDA 2005", "Disipador de calor de aluminio", "Capacitores de 2200uF y 100uF", "Parlante de 4 o 8 ohms", "Fuente de 12V (Batería o Cargador)"]} 
                    instructions={["Paso 1: Atornillá el chip al aluminio. ¡Es fundamental! Si lo usás al aire se quema en segundos.", "Paso 2: Soldá cuidadosamente los componentes siguiendo el plano técnico del docente.", "Paso 3: Conectá la entrada de audio a tu teléfono cuidando que los cables no se toquen entre sí.", "Paso 4: ¡Dale energía y sentí cómo tu música suena con fuerza tecnológica!"]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simContent={<div style={{fontSize:'4.5rem', transform: ampActive ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.1s ease-out'}}>🔊</div>} 
                    simStatus={{ on: "Ganancia de señal activa (+26dB)", off: "Silencio / Bias en reposo" }} 
                />

                {/* 6. ROBOT EVITA OBSTÁCULOS */}
                <ProjectCard 
                    num="6" title="Robot Autónomo Inteligente (Arduino)" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" 
                    description="Este robot tiene 'ojos' de ultrasonido. Vamos a programar su cerebro (Arduino) para que tome decisiones solo, tal como los autos del futuro de Tesla."
                    functioning={`🛰️ ROBÓTICA Y CIBERNÉTICA:
                    • El Radar Ultrasonido (HC-SR04): El robot tira un sonido que no escuchamos, éste rebota en la pared y vuelve. Calculando el tiempo, el robot sabe exactamente a qué distancia está el obstáculo.
                    • Programación (Lógica): Escribimos el código: 'Si la distancia es menor a 15cm, frená, girá a la derecha y seguí'. ¡Eso es inteligencia robótica básica!
                    • Driver de Motores: Es el componente que recibe las órdenes suaves del cerebro Arduino y les da la potencia real a las ruedas.`}
                    materials={["Placa Arduino UNO", "Sensor de ultrasonido (los ojitos)", "Chasis de 2 ruedas y motores", "Módulo Puente H (L298N)", "Batería de 9V"]} 
                    instructions={["Paso 1: Armá la estructura del robot instalando los motores y la rueda loca atrás.", "Paso 2: Conectá el sensor en el frente del robot bien derechito.", "Paso 3: Conectá todos los cables al Arduino. ¡Revisá dos veces que no haya cortos!", "Paso 4: Cargá el programa desde la computadora y ponelo a prueba en una pista de obstáculos."]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simContent={<div style={{fontSize:'3.5rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} 
                    simStatus={{ on: "Nivel lógico 1 (Procesando...)", off: "Cortex Offline (Esperando carga)" }} 
                />

                {/* 7. TALLER DE SOLDADURA */}
                <ProjectCard 
                    num="7" title="Taller de Soldadura Pro: Uniendo Metales" videoId="v=J5Sb21qbpEQ" 
                    description="La habilidad número 1 de cualquier técnico. Vamos a aprender a hacer uniones eléctricas perfectas usando metales fundidos y calor controlado."
                    functioning={`🩹 CIENCIA DE MATERIALES (SOLDADURA):
                    • Punto Eutéctico: El estaño que usamos es una mezcla mágica que se derrite a los 183°C. Buscamos el equilibrio para que el metal 'fluya' sobre el cobre.
                    • Capilaridad: La soldadura bien hecha tiene forma de volcán. Eso es porque el metal líquido se 'pega' atómicamente al componente.
                    • Soldadura Fría: Si movés el cable mientras se está enfriando, la unión queda opaca y se rompe fácil. ¡Hay que estar muy firme!` }
                    materials={["Soldador tipo lápiz de 30W o 40W", "Alambre de estaño con núcleo de resina", "Placa de práctica (Perfboard)", "Componentes quemados para practicar"]} 
                    instructions={["Paso 1: Limpiá la punta del soldador con una esponja húmeda hasta que brille.", "Paso 2: Calentá la placa y la pata del componente juntas por 2 segundos.", "Paso 3: Acercá el estaño desde el costado. ¡Tiene que derretirse solo si la temperatura es buena!", "Paso 4: Primero sacás el estaño y después el soldador. ¡No soples! Dejá que enfríe solo."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ VOLCÁN PERFECTO' }, { url: '/proj_soldadura_error.png', label: '❌ BOLA FALLIDA (FRIA)' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simContent={<div style={{fontSize:'4.5rem'}}>🩹</div>} 
                    simStatus={{ on: "Transferencia térmica activa (350°C)", off: "Equilibrio térmico (Punta fría)" }} 
                />

                {/* 8. HUERTA SOLAR INTELIGENTE */}
                <ProjectCard 
                    num="8" title="Huerta Solar con Luces Grow" imageSrc="/proj_huerta.png" videoId="zFfP1vS8Z4c" 
                    description="¿Sabías que podés hacer crecer comida usando tecnología de satélites? Vamos a usar el sol para alimentar luces especiales que aceleran a las plantas."
                    functioning={`🌿 ECO-TECNOLOGÍA (STEAM):
                    • Fotosíntesis Forzada: Las plantas aman la luz Azul y Roja. Usamos LEDs de esos colores para que crean que siempre es verano y crezcan locamente rápido.
                    • Energía Solar Fotovoltaica: El panel solar captura fotones del sol y los convierte en electricidad limpia que guardamos en una batería.
                    • Cuidado Ambiental: Al cultivar en casa usando energía del sol, estamos reduciendo la huella de carbono del planeta. ¡Sos un héroe ambiental!`}
                    materials={["Panel Solar Monocristalino", "Regulador de carga (el cerebro solar)", "Batería de 12V", "Tira de LEDs Grow (Pink/Blue)", "Cajón con tierra y semillas"]} 
                    instructions={[
                        "Paso 1: Ubicá el panel solar apuntando bien al Norte para captar todo el sol del día.",
                        "Paso 2: Conectá el panel al regulador. El regulador cuidará que la batería no se rompa.",
                        "Paso 3: Conectá tus luces LED Grow sobre las plantas. No las pongas muy cerca para no darles calor excesivo.",
                        "Paso 4: ¡Compará el crecimiento de tus plantas con las de afuera y sorprendete!"
                    ]}
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Ingeniería Lógica' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Guía de Cables' },
                        { url: '/proj_huerta.png', label: '🌿 Diseño Final' }
                    ]}
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simContent={
                        <div style={{ position: 'relative', width: '220px', height: '160px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '20px', transition: 'background 2s linear', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', width: '32px', height: '32px', background: isDay ? 'yellow' : '#eee', borderRadius: '50%', left: '160px', top: isDay ? '10px' : '30px', boxShadow: isDay ? '0 0 30px yellow' : '0 0 15px #fff', transition: 'all 2.5s ease' }}></div>
                            {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '70px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.35), transparent)', top: '35px' }}></div>}
                            <div style={{ position: 'absolute', bottom: '15px', left: '20px', display: 'flex', gap: '8px' }}>
                                {[1,2,3,4].map(i=><div key={i} style={{width:'20px',height: huertaActive && !isDay ? '50px' : '30px', background:'#2e7d32', borderRadius:'10px 10px 0 0', transition:'height 3s ease-out' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: isDay ? "Panel cargando batería... ☀️" : "Grow LEDs ACTIVOS 💜", off: "Sustentabilidad en pausa" }}
                />

                {/* 9. ROBOT SUMO */}
                <ProjectCard 
                    num="9" title="Robot SUMO: Estrategia y Fuerza" imageSrc="/proj_sumo.png" videoId="a_A5uC6_QpY" 
                    description="¿Tu robot es lo suficientemente fuerte para empujar a su oponente fuera del círculo? Aprenderemos sobre equilibrio, sensores de piso y potencia de empuje."
                    functioning={`🚜 ESTRATEGIA DE COMBATE (MECÁNICA):
                    • Centro de Masa: Para que no te den vuelta, tu robot tiene que ser bajo y muy pesado. ¡Eso lo hace casi imposible de empujar!
                    • Ojos Infrarrojos (TCRT5000): Usamos sensores que miran al piso para ver el borde blanco del círculo. Si el robot lo ve, ¡frena solo para no caerse del ring!
                    • Fricción y Agarre: Usamos gomas con mucha adherencia. Si tus ruedas resbalan, perdés el combate. ¡Física pura frente al rival!`}
                    materials={["Arduino UNO", "2 Sensores IR de piso", "Sensor de ultrasonido (ojos)", "2 Motores de mucha fuerza", "Pala metálica frontal", "Batería Li-Po"]} 
                    instructions={[
                        "Paso 1: Armá un chasis compacto y ponele peso extra si podés (hasta 500g).",
                        "Paso 2: Instalá la pala bien pegada al suelo para que el otro robot no pueda levantarte.",
                        "Paso 3: Programá el Arduino para que cuando los sensores de piso vean 'blanco', de marcha atrás rápido.",
                        "Paso 4: ¡Probá tu código buscando una caja y tratá de que el robot la empuje solo!"
                    ]}
                    simOn={sumoActive} setSimOn={setSumoActive}
                    simContent={
                        <div style={{ position: 'relative', width: '220px', height: '160px', background: '#222', borderRadius: '50%', border: '8px solid #eee', overflow: 'hidden' }}>
                            <div className={sumoActive ? 'moving' : ''} style={{ position: 'absolute', left: '85px', top: '55px', fontSize: '3.5rem', filter: 'drop-shadow(0 0 10px red)' }}>🚜</div>
                        </div>
                    }
                    simStatus={{ on: "MODO LUCHA: Escaneando Dohyo", off: "Inactivo en vestuarios" }}
                />

                {/* 10. ROBOT FÚTBOL */}
                <ProjectCard 
                    num="10" title="Robot Futbolista: Control por Celular" imageSrc="/proj_futbol.png" videoId="pIkTWh2V0Yw" 
                    description="¡Gritá un gol tecnológico! Vamos a crear un robot controlado por Bluetooth desde tu celular que sea capaz de llevar una pelota y patear al arco."
                    functioning={`⚽ EL DEPORTE DE LOS ROBOTS (CONTROL):
                    • Vectores de Movimiento: El robot se mueve sumando fuerzas. Adelante + Derecha = ¡Diagonal! Aprendemos a controlar 4 motores al mismo tiempo.
                    • Comunicación Bluetooth (HC-05): Usamos una antena invisible que recibe señales desde tu teléfono. ¡Es como telepatía tecnológica!
                    • Mecanismo de Patada: Podemos usar un servomotor para que, cuando aprietes un botón, el robot le pegue un golpe fuerte a la pelota.`}
                    materials={["Placa Arduino + Bluetooth HC-05", "App de joystick en el celu", "Chasis de 4 ruedas rápido", "Pala cóncava para la pelota", "Servomotor de 9g (pateador)"]} 
                    instructions={[
                        "Paso 1: Armá el chasis 'perfil bajo' para que la pelota no se escape por abajo.",
                        "Paso 2: Conectá el Bluetooth a los pines del Arduino. ¡Acordate de desconectarlo al cargar el programa!",
                        "Paso 3: Vinculá tu celu con el robot mediante el código 1234 en el Bluetooth.",
                        "Paso 4: ¡Hacete unos pases con un compañero y organizá un torneo de robótica!"
                    ]}
                    simOn={futbolActive} setSimOn={setFutbolActive}
                    simContent={
                        <div style={{ position: 'relative', width: '220px', height: '160px', background: '#1b5e20', borderRadius: '15px', border: '3px solid #fff', overflow: 'hidden' }}>
                           <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#fff', top: '80px' }}></div>
                           <div className={futbolActive ? 'arana-moving' : ''} style={{ position: 'absolute', left: '25px', top: '65px', fontSize: '2.5rem' }}>🚜</div>
                           <div className={futbolActive ? 'moving' : ''} style={{ position: 'absolute', left: '150px', top: '80px', fontSize: '1.2rem' }}>⚽</div>
                        </div>
                    }
                    simStatus={{ on: "CONEXIÓN BT ESTABLE: Juego activo", off: "Joystick apagado" }}
                />

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: '2px' }}>SIMUTEC 2026 - MODELO EDUCATIVO DE INGENIERÍA</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>"El futuro lo construís vos, un componente a la vez."</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

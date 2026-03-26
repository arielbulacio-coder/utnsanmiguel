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
                        <h3>🚀 ¿De qué se trata este desafío?</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            {functioning && (
                                <div className="proyecto-section theory-section">
                                    <h3>🧠 La Ciencia detrás del Proyecto (¡Para Genios!)</h3>
                                    <div className="theory-block" style={{ fontSize: '0.88rem', whiteSpace: 'pre-line', background: 'rgba(0,10,20,0.6)', padding: '25px', borderRadius: '15px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.6', textAlign: 'justify', border: '1px solid rgba(0,242,255,0.1)' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>📸 Foto del Prototipo Real</h3>
                                    <div className="img-container" style={{ borderRadius: '15px', border: '1px solid #333', overflow: 'hidden' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section highlight-gallery">
                                    <h3>🗺️ Guía de Armado y Conexiones</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} className="gallery-item-full" style={{ background: '#111', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.75rem', padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ ¿Qué materiales necesitamos?</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>✅ {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ ¡Manos a la obra! (Paso a paso)</h3>
                                <ol className="instructions-list" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '25px', border: '1px solid rgba(0,242,255,0.3)', minHeight: '320px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Detener Práctica' : '▶️ Probar Funcionamiento'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontSize: '1rem', marginTop: '15px' }}>
                                        {simOn ? '>>> SISTEMA EN MARCHA <<<' : '>>> ESPERANDO ÓRDENES <<<'}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '3.5rem' }}>
                            <h3>📺 Video Tutorial (¡Mirá cómo se hace!)</h3>
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
            <header className="proyectos-header" style={{ borderBottom: '3px solid var(--primary-color)', paddingBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: '900' }}>🔬 SIMUTEC: ROBÓTICA Y CIENCIA</h1>
                <p style={{ fontSize: '1.3rem' }}>Aprendé tecnología creando tus propios robots e inventos sustentables.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT MÓVIL SIMPLE */}
                <ProjectCard 
                    num="1" title="Robot Móvil 'Eco-Rover'" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="¿Te imaginás construir un vehículo que se mueva solo usando una botella reciclada? En este desafío vamos a aprender cómo los motores convierten la electricidad en movimiento."
                    functioning={`🔬 ¿QUÉ PASA POR DENTRO? (MARCO TEÓRICO):
                    • El Motor Mágico: Los motores funcionan gracias al electromagnetismo. Cuando la corriente pasa por adentro, interactúa con imanes y hace que el eje gire con fuerza (Torque).
                    • Velocidad y Potencia: ¿Sabías que si las ruedas son más chicas el robot tiene más fuerza para arrancar, pero si son más grandes corre más rápido? Eso es la ingeniería de tracción.
                    • El Freno Eléctrico (Back EMF): Cuando el motor gira muy rápido, él mismo genera un poquito de electricidad que intenta frenarlo. ¡Es como si el robot tuviera su propio límite de velocidad natural!`}
                    materials={["Botella plástica vacía", "2 Motores con sus cables", "Porta pilas y 2 pilas AA", "Tapas de botella (serán nuestras ruedas)", "Cinta o pegamento"]} 
                    instructions={["Paso 1: Pegá los motores a los costados de la botella. ¡Tienen que quedar bien derechitos!", "Paso 2: Conectá los cables de los motores a la pila. ¡Si gira para atrás, invertí los cables!", "Paso 3: Poné las tapitas en los ejes de los motores. Si patinan, poneles una gomita elástica.", "Paso 4: ¡Soltalo en el piso y mirá cómo avanza!"]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4.5rem'}}>🤖</div>} 
                    simStatus={{on:"Motor girando a máxima potencia",off:"Circuito abierto (Sin corriente)"}} 
                />
                
                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED Sustentable" imageSrc="/proj_velador.png" videoId="P7K-MiwXo6g" 
                    description="Creamos una lámpara moderna que no gasta nada de energía. Vamos a entender el secreto de los LEDs, los componentes que están en las pantallas de todos los celulares."
                    functioning={`🔌 CIENCIA DE LUCES (ELECTRÓNICA):
                    • ¿Por qué brilla un LED?: Adentro de ese plástico hay un material 'semiconductor' (Unión P-N). Cuando los electrones saltan, sueltan energía en forma de luz (fotones). ¡Es pura física cuántica en tu mano!
                    • El Guardián del LED (Resistencia): El LED es muy sensible. Si le damos mucha electricidad de golpe, se quema. Por eso ponemos una resistencia que 'frena' la corriente (Ley de Ohm).
                    • USB: Usamos 5 Voltios de un cargador viejo. Es seguro y eficiente.`}
                    materials={["Un LED de tu color favorito", "Una resistencia de 220 o 330 ohm", "Un cable USB que no uses más", "Una lata de conservas limpia", "Un CD viejo para que refleje la luz"]} 
                    instructions={["Paso 1: Pelá las puntas del cable USB. Buscamos el cable rojo (+) y el negro (-).", "Paso 2: Soldá la resistencia a la pata más larga del LED (el ánodo).", "Paso 3: Conectá el cable negro a la pata corta y el rojo a la resistencia.", "Paso 4: Armá todo dentro de la lata y usá el CD como pantalla para que la luz sea más linda."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 35px yellow' : 'none'}}>💡</div>} 
                    simStatus={{on:"Luz emitida (Fotones activos)",off:"Sin polarización (Apagado)"}} 
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3" title="Ventilador de Verano USB" imageSrc="/proj_ventilador.png" videoId="0XfR0fGq7e8" 
                    description="Aprendé cómo se mueve el aire y creá un ventilador potente usando un CD reciclado como hélice."
                    functioning={`🌀 CIENCIA DEL AIRE (AERODINÁMICA):
                    • El Truco de Bernoulli: Al girar inclinado, la hélice 'empuja' el aire hacia adelante creando una zona de baja presión atrás. ¡Así es como vuelan los aviones también!
                    • Ángulo de Ataque: Si doblás mucho las paletas, hacés mucho ruido pero movés poco aire. Hay que buscar el ángulo perfecto (unos 30 grados).
                    • RPM: Un ventilador casero puede girar a más de 5000 vueltas por minuto. ¡Cuidado con los dedos!`}
                    materials={["Motor DC potente", "Un CD viejo (será nuestra hélice)", "Cargador USB", "Un corcho o tapita para el eje"]} 
                    instructions={["Paso 1: Marcá 6 líneas en el CD y cortalo con cuidado (¡pedí ayuda si es difícil!).", "Paso 2: Usá un encendedor o vela para calentar el centro de las paletas y doblarlas un poquito.", "Paso 3: Pegá el corcho al centro del CD y después al motor.", "Paso 4: Conectá el motor al USB y sentí la brisa."]} 
                    simOn={ventiladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} 
                    simStatus={{on:"Flujo turbulento en marcha",off:"Hélice en reposo"}} 
                />

                {/* 4. ARAÑA VIBROBOT */}
                <ProjectCard 
                    num="4" title="Micro-Robot Araña (Vibrobot)" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Un pequeño robot que camina vibrando. Vamos a ver cómo algo que parece un error (el desbalance) puede generar movimiento inteligente."
                    functioning={`🕷️ FÍSICA DE VIBRACIONES:
                    • Masa Excéntrica: Al ponerle un peso de un solo lado al motor, éste se vuelve 'loco' al girar y genera una fuerza centrífuga que sacude todo el robot.
                    • El Truco de las Patas: Las patas de alambre inclinadas hacen que la araña 'salte' hacia adelante miles de veces por segundo.
                    • Resonancia: Si la vibración es muy rápida, ¡el robot puede hasta bailar sobre la mesa!`}
                    materials={["Motor de juguete", "Un pesito (puede ser una gota de estaño o una tuerca)", "Un clip o alambre para las patas", "Una pila botón (3V)"]} 
                    instructions={["Paso 1: Formá 6 patas con el alambre y pegalas a la base.", "Paso 2: Pegá el pesito en un costado del eje del motor (eso lo hará vibrar).", "Paso 3: Pegá la pila arriba del motor.", "Paso 4: ¡Conectá y mirá cómo camina tu araña robótica!"]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4.5rem'}}>🕷️</div>} 
                    simStatus={{on:"Energía cinética activa",off:"Equilibrio total"}} 
                />

                {/* 5. AMPLIFICADOR TDA 2005 */}
                <ProjectCard 
                    num="5" title="Amplificador de Sonido Pro" imageSrc="/proj_amp.png" videoId="cEoyOaW9a9k" 
                    description="¡Construí tu propio equipo de música! Vamos a ver cómo logramos que una señal chiquita del celular se convierta en un sonido potente."
                    functioning={`🔊 INGENIERÍA DE AUDIO:
                    • Amplificación (Clase AB): El chip TDA 2005 toma la onda de música y le da mucha más corriente usando la batería. ¡Así el parlante puede moverse con fuerza!
                    • El Calor es Energía: El chip se calienta mucho al trabajar a toda potencia. Por eso usamos un disipador de aluminio para que no se 'derrita' (Protección Térmica).
                    • Señal vs Ruido: Aprendemos a filtrar la electricidad para que no se escuche ese soplido feo de fondo.`}
                    materials={["Chip TDA 2005", "Un pedazo de aluminio (Disipador)", "Capacitores (filtros)", "Parlante de 4 o 8 ohms", "Fuente de 12V (una batería)"]} 
                    instructions={["Paso 1: Atornillá el chip al aluminio. ¡Es muy importante para que no se queme!", "Paso 2: Seguí el diagrama para soldar los capacitores. Son como 'tanques de agua' que guardan energía.", "Paso 3: Conectá la entrada de audio a tu celu o compu.", "Paso 4: ¡Dale energía y subí el volumen!"]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simContent={<div style={{fontSize:'4.5rem', transform: ampActive ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.15s ease-out'}}>🔊</div>} 
                    simStatus={{ on: "Onda sonora amplificada", off: "Silencio total" }} 
                />

                {/* 6. ROBOT EVITA OBSTÁCULOS */}
                <ProjectCard 
                    num="6" title="Robot Autónomo que Esquiva Paredes" imageSrc="/proj_evita.png" videoId="f-a4Kz2p2vY" 
                    description="Este robot tiene 'ojos' de ultrasonido. Vamos a programar su cerebro (Arduino) para que tome decisiones solo, tal como un auto autónomo."
                    functioning={`🛰️ INTELIGENCIA ARTIFICIAL Y SENSORES:
                    • El radar del murciélago (Ultrasonido): El robot tira un sonido que no escuchamos, rebota en la pared y vuelve. Calculando el tiempo, sabe a qué distancia está la pared.
                    • Programación (Lógica): Le enseñamos al robot: 'Si la distancia es menor a 10cm, frená y girá'. ¡Es el comienzo de la IA!
                    • Puente H: Es el componente que nos permite hacer que los motores vayan para adelante o para atrás por código.`}
                    materials={["Placa Arduino UNO", "Sensor de distancia (el que parece ojos)", "Ruedas y motores", "Un chasis para armar todo", "Batería de 9V"]} 
                    instructions={["Paso 1: Montá los motores y el sensor en frente del robot.", "Paso 2: Conectá todo a la placa Arduino. ¡Cuidado de no mezclar los cables!", "Paso 3: Escribí el código en la compu y mandalo al robot.", "Paso 4: Ponelo en el suelo y poné tu mano en frente de él. ¡Tiene que escaparse!"]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simContent={<div style={{fontSize:'3.5rem', animation: evitaActive ? 'jitter 0.15s infinite' : 'none'}}>🛰️</div>} 
                    simStatus={{ on: "Sistema de navegación activo", off: "Esperando programa" }} 
                />

                {/* 7. TALLER DE SOLDADURA */}
                <ProjectCard 
                    num="7" title="Taller de Soldadura: ¡Uniendo Metales!" videoId="v=J5Sb21qbpEQ" 
                    description="La habilidad más importante para un técnico. Vamos a aprender a hacer conexiones eléctricas perfectas usando metales fundidos."
                    functioning={`🩹 CIENCIA DE LOS METALES:
                    • El punto de fusión: El estaño que usamos se derrite a los 183°C. Buscamos el equilibrio exacto para que el metal fluya como agua sobre el cobre.
                    • Capilaridad: ¿Viste que la soldadura tiene forma de volcán? Eso es porque el metal líquido se 'pega' molecularmente al pad.
                    • Soldadura Fría: Si movés el componente mientras se enfría, la unión se rompe por dentro. ¡Por eso hay que quedarse bien quieto!` }
                    materials={["Soldador tipo lápiz", "Alambre de estaño", "Placa de práctica con islas", "Lupa (opcional)"]} 
                    instructions={["Paso 1: Limpiá la punta del soldador hasta que brille.", "Paso 2: Calentá la isla de la placa y la pata del componente al mismo tiempo.", "Paso 3: Acercá el estaño desde el otro lado. ¡Tiene que derretirse solo!", "Paso 4: Sacá el estaño y después el soldador. Esperá 2 segundos sin mover nada."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ VOLCÁN PERFECTO' }, { url: '/proj_soldadura_error.png', label: '❌ BOLA FALLIDA' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simContent={<div style={{fontSize:'4.5rem'}}>🩹</div>} 
                    simStatus={{ on: "Soldador a 350°C (Cuidado)", off: "Punta fría" }} 
                />

                {/* 8. HUERTA SOLAR INTELIGENTE */}
                <ProjectCard 
                    num="8" title="Huerta Solar con Luces Especiales" 
                    description="¿Sabías que podés hacer crecer tus plantas más rápido con tecnología? Vamos a usar el sol para alimentar luces que imitan lo mejor de la naturaleza."
                    functioning={`🔬 CIENCIA DE LAS PLANTAS (STEAM):
                    • Fotosíntesis forzada: A las plantas les encanta la luz Azul (para crecer fuertes) y Roja (para dar frutos). Usamos LEDs de esos colores para que 'crean' que siempre es de día.
                    • Energía Limpia: El panel solar convierte los rayos del sol en electricidad pura que guardamos en una batería.
                    • Ecología: Al cultivar en casa, reducimos la contaminación del transporte de comida. ¡Sos parte de la solución ambiental!`}
                    materials={[
                        "Panel Solar mediano (12V)",
                        "Regulador de carga (el cerebro de la batería)",
                        "Batería recargable",
                        "Tira de LEDs de colores (Grow LEDs)",
                        "Un cajón con tierra y tus semillas favoritas"
                    ]}
                    instructions={[
                        "Paso 1: Poné el panel solar donde le dé el sol bien fuerte (apuntando al norte).",
                        "Paso 2: Conectá el panel al regulador y después a la batería. ¡Fijate bien los colores de los cables!",
                        "Paso 3: Conectá las luces LED sobre tus plantas. No las pegues mucho para no darles calor.",
                        "Paso 4: Mirá cómo crecen tus plantas comparadas con las que no tienen luces. ¡Anotá tus resultados!"
                    ]}
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Plano de los Cables' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Conexiones Reales' },
                        { url: '/proj_huerta.png', label: '🌿 Así tiene que quedar' }
                    ]}
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simContent={
                        <div style={{ position: 'relative', width: '240px', height: '180px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '25px', transition: 'background 2s linear', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', width: '35px', height: '35px', background: isDay ? 'yellow' : '#eee', borderRadius: '50%', left: '170px', top: isDay ? '15px' : '35px', boxShadow: isDay ? '0 0 35px yellow' : '0 0 20px #fff', transition: 'all 2.5s ease' }}></div>
                            {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '80px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.4), transparent)', top: '40px' }}></div>}
                            <div style={{ position: 'absolute', bottom: '15px', left: '25px', display: 'flex', gap: '8px' }}>
                                {[1,2,3,4].map(i=><div key={i} style={{width:'22px',height: huertaActive && !isDay ? '60px' : '30px', background:'#2e7d32', borderRadius:'10px 10px 0 0', transition:'height 4s ease-in-out' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: isDay ? "Panel cargando... ☀️" : "Luces de crecimiento ACTIVAS 💜", off: "Invernadero apagado" }}
                >
                    <div className="proyecto-section" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '2rem', marginTop: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '1rem' }}>🔬 ¿Qué estamos aprendiendo?</h4>
                        <div style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6' }}>
                            <p><strong>Naturales:</strong> Cómo comen las plantas y qué luz prefieren.</p>
                            <p><strong>Matemática:</strong> Medimos cuánto crecen cada día y hacemos gráficos.</p>
                            <p><strong>Tecnología:</strong> Usamos chips y energía solar para cuidar el planeta.</p>
                        </div>
                    </div>
                </ProjectCard>

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)' }}>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>SIMUTEC © 2026 - ¡EL FUTURO LO CREÁS VOS!</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Proyecto educativo para jóvenes inventores.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

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
            }, 8000);
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
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>📋 Introducción y Objetivos Pedagógicos</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            {functioning && (
                                <div className="proyecto-section theory-section">
                                    <h3>🧪 Corpus Teórico y Científico Detallado</h3>
                                    <div className="theory-block" style={{ fontSize: '0.82rem', whiteSpace: 'pre-line', background: 'rgba(0,0,0,0.5)', padding: '25px', borderRadius: '15px', borderLeft: '5px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.6', textAlign: 'justify', color: '#e0e0e0' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🚀 Referencia Tecnológica</h3>
                                    <div className="img-container" style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section gall-sec">
                                    <h3>🗺️ Documentación de Ingeniería y Diagramas</h3>
                                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} className="gallery-item-full" style={{ background: '#111', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                                <p style={{ fontSize: '0.7rem', padding: '8px', textAlign: 'center', fontWeight: '600', color: 'var(--primary-color)' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>🛠️ BOM (Especificaciones de Componentes)</h3>
                                <div className="materials-list" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <ul style={{ padding: 0, listStyle: 'none' }}>
                                        {materials.map((mat, i) => <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>• {mat}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="proyecto-section">
                                <h3>⚙️ Protocolo de Construcción y Testeo</h3>
                                <ol className="instructions-list" style={{ fontSize: '0.9rem', lineHeight: '1.7', paddingLeft: '1.2rem' }}>
                                    {instructions.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#000', borderRadius: '20px', border: '1px solid rgba(0,242,255,0.25)', minHeight: '300px' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Detener Laboratorio' : '▶️ Ejecutar Simulación'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`} style={{ fontWeight: 'bold' }}>
                                        {simOn ? 'ESTADO: OPERACIÓN NOMINAL' : 'ESTADO: SISTEMA EN STANDBY'}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '3rem' }}>
                            <h3>📺 Registro Audiovisual y Soporte STEAM</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
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
            <header className="proyectos-header" style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '3rem' }}>
                <h1 style={{ fontWeight: '900', letterSpacing: '4px' }}>📡 SIMUTEC: INGENIERÍA Y ROBÓTICA</h1>
                <p style={{ fontSize: '1.4rem' }}>Compendio técnico-científico para el desarrollo de competencias tecnológicas de vanguardia.</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT MÓVIL DIRECTA */}
                <ProjectCard 
                    num="1" title="Unidad Móvil de Tracción Directa (Rover)" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construcción de un vehículo autónomo simple para investigar la interacción entre energía eléctrica y movimiento mecánico (Transducción)."
                    functioning={`🔬 MARCO CIENTÍFICO AVANZADO:
                    • Electrodinámica: El motor de corriente continua (DC) opera bajo la Ley de Ampere. El Torque (T) generado es proporcional al flujo de corriente (I) y la constante del motor (Kt): T = Kt x I.
                    • Fuerza Contraelectromotriz (Back EMF): A medida que el motor gira, genera un voltaje opuesto (Vb) que limita la velocidad máxima: V = I x R + Vb. Donde Vb es proporcional a la velocidad angular (ω).
                    • Cinemática de Traslación: Se estudia la fricción estática (μs) necesaria para iniciar el movimiento sin patinamiento de los neumáticos reciclados (tapas).
                    • Ingeniería de Tracción: Relación de diámetros. Una rueda pequeña entrega más torque inicial, una grande más velocidad final.`}
                    materials={["Motores DC de imán permanente (3V-9V)", "Batería de polímero de litio o pilas alcalinas", "Chasis autoportante de material polimérico", "Ejes de acero o madera", "Interruptor de palanca SPST"]} 
                    instructions={["Diseño estructural: Centrar el centro de masa (CoM) para evitar el vuelco del rover.", "Soldadura de potencia: Asegurar uniones de baja resistencia ohmica en los bornes del motor.", "Test de polaridad: Verificar que ambos motores giren en sentido horario para avance lineal.", "Optimización de tracción: Añadir bandas elásticas a las tapas para aumentar el coeficiente de fricción μ."]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4.5rem'}}>🤖</div>} 
                    simStatus={{on:"Carga de baterías nominal",off:"Circuito abierto"}} 
                />
                
                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Lámpara de Estado Sólido (LED Technology)" imageSrc="/proj_velador.png" videoId="-BIs-z5g7tY" 
                    description="Diseño de iluminación eficiente basado en física de semiconductores y gestión de potencia USB."
                    functioning={`🔌 INGENIERÍA DE SEMICONDUCTORES:
                    • Efecto Electroluminiscente: Al polarizar directamente el diodo (V > Vf), los electrones recombinan con huecos en la unión P-N, liberando fotones cuya energía (E = h x f) define el color.
                    • Característica V-I: A diferencia de una lámpara incandescente, el LED tiene una relación exponencial. Un pequeño aumento de voltaje por encima del umbral dispara la corriente peligrosamente.
                    • Resistencia de Carga: Calculada mediante R = (Vcc - Vf) / If. Donde If es la corriente de operación nominal (típicamente 20mA).
                    • PWM (Pulse Width Modulation): Explicación teórica de cómo atenuar la luz (dimming) variando el ciclo de trabajo (Duty Cycle) sin disipar calor extra en resistencias.`}
                    materials={["Diodo LED de alto brillo (3.2V / 20mA)", "Resistencia de película de carbón (220Ω - 1/4W)", "Reflector parabólico reciclado (CD)", "Conector USB estándar (GND + 5V)", "Estructura disipadora"]} 
                    instructions={["Cálculo del balance de potencia: P = V_resistencia x I. Verificar que no supere los 250mW.", "Montaje del LED sobre el eje óptico del difusor CD para maximizar el flujo luminoso.", "Polarización: El terminal largo (ánodo) se conecta al positivo de 5V tras la resistencia.", "Verificar temperatura tras 10 minutos para asegurar estabilidad térmica del chip."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 30px yellow' : 'none'}}>💡</div>} 
                    simStatus={{on:"Flujo de electrones activo",off:"Bloqueo de portadores"}} 
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3" title="Ventilador: Aerodinámica e Ingeniería de Fluidos" imageSrc="/proj_ventilador.png" videoId="YqXf8zXW77A" 
                    description="Estudio de la mecánica de fluidos y la transformación de energía rotacional en caudal de aire."
                    functioning={`🌀 DINÁMICA DE FLUIDOS Y FLUJOS:
                    • Ecuación de Continuidad y Bernoulli: El perfil alar de las aspas crea una diferencia de presión estática (V1 < V2 → P1 > P2), succionando aire del reverso y proyectándolo al frente.
                    • Ángulo de Ataque: Se analiza el coeficiente de sustentación (Cl). Un ángulo excesivo genera turbulencia (pérdida de flujo) y carga excesiva al motor, reduciendo las RPM.
                    • Efecto Doppler y Ruido: Relación entre la velocidad periférica de la punta de la aspa y la frecuencia del sonido emitido.
                    • Eficiencia del Motor: Relación entre Potencia Eléctrica consumida (VxI) y Potencia Aerodinámica (Caudal x ∆P).`}
                    materials={["Motor de alta velocidad (12.000 RPM nominal)", "Aspas de polímero (CD deformado térmicamente)", "Bastidor rígido con amortiguación de vibraciones", "Cableado de cobre de alta conductividad"]} 
                    instructions={["Plegado aerodinámico: Calentar el CD a 150°C y rotar las aspas 30° respecto al plano de rotación.", "Equilibrado dinámico: Asegurar que el CoG del ventilador coincida con el eje para evitar fuerzas radiales destructivas.", "Test de caudal: Medir la distancia a la que la corriente de aire es capaz de mover una hoja de papel estándar.", "Acoplamiento: Fijación del eje mediante presión controlada o adhesivo epóxico."]} 
                    simOn={ventiladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4.5rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} 
                    simStatus={{on:"Caudal de aire laminar",off:"Energía potencial"}} 
                />

                {/* 4. ARAÑA VIBROBOT */}
                <ProjectCard 
                    num="4" title="Vibrobot: Análisis de Mecánica Vibratoria" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Experimento cinético sobre la locomoción mediante la transferencia de momento por masa excéntrica."
                    functioning={`🕷️ FÍSICA DE LAS VIBRACIONES:
                    • Desbalance de Masa: El motor porta una masa (me) a una distancia (r) del eje. La rotación genera una fuerza centrífuga F = me x ω² x r.
                    • Resonancia Estructural: El sistema vibra a una frecuencia (f) definida por el voltaje. Si f coincide con la frecuencia natural de las patas, la amplitud aumenta drásticamente.
                    • Vector de Empuje: Las patas inclinadas actúan como trinquetes, permitiendo deslizamiento en una dirección y oponiendo fricción en la otra, convirtiendo el 'sacudón' en avance lineal.
                    • Amortiguación: Cómo la superficie (mesa) absorbe o refleja la energía cinética del vibrobot.`}
                    materials={["Micro-motor con masa excéntrica", "Pila de litio CR2032 (3V)", "Alambre de acero (patas)", "Soporte centrífugo de baja densidad"]} 
                    instructions={["Construcción de patas: Usar geometría de trípode doble para asegurar estabilidad estática.", "Montaje de masa: Si se usa un motor común, añadir una gota de estaño o pegamento pesada de un solo lado del eje.", "Ajuste de fase: Variar el ángulo de las patas para optimizar el vector de desplazamiento frontal.", "Prueba de superficies: Comparar velocidad en vidrio vs madera (diferencia en μ)."]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4.5rem'}}>🕷️</div>} 
                    simStatus={{on:"Vibración armónica forzada",off:"Centro de masa estático"}} 
                />

                {/* 5. AMPLIFICADOR TDA 2005 */}
                <ProjectCard 
                    num="5" title="Ingeniería de Audio Hi-Fi (TDA 2005)" imageSrc="/proj_amp.png" videoId="5VIda0n8t-E" 
                    description="Construcción de un amplificador de potencia analógico de 20W para el estudio de señales y fidelidad de audio."
                    functioning={`🔊 ELECTRÓNICA ANALÓGICA SUPERIOR:
                    • Topología Clase AB: El TDA 2005 utiliza transistores complementarios para cada semiciclo de la onda senoidal, optimizando la linealidad frente a la Clase B.
                    • Ratio de Señal-Ruido (SNR): Uso de capacitores de desacople para filtrar el 'ripple' de la fuente conmutada.
                    • THD (Total Harmonic Distortion): Se analiza por qué la sobre-amplificación recorta la onda (clipping), generando armónicos no deseados.
                    • Impedancia y Potencia: Relación P = V² / Z. El amplificador entrega más potencia a un altavoz de 4Ω que a uno de 8Ω, duplicando la demanda de corriente.
                    • Puente (Bridge Mode): Configuración de dos etapas en contrafase para cuadruplicar la potencia efectiva sobre la carga.`}
                    materials={["Circuito Integrado TDA 2005 (Double Power Amp)", "Bloque disipador de aluminio (convección pasiva)", "Capacitores de 2200uF (Filtro de rizado)", "Módulo Receptor BT 5.0 Stack", "Fuente Estabilizada 12V 3A"]} 
                    instructions={["Gestión Térmica: Aplicar grasa de silicona entre el IC y el aluminio para reducir la resistencia térmica Rth.", "Blindaje: Mantener los cables de entrada de señal (baja potencia) alejados de los de alimentación para evitar inducción de ruidos (HUM).", "Calibración de Gain: Ajustar el preamplificador para evitar la saturación de la etapa de entrada.", "Protección: Instalar fusible de 3A en la línea de Vcc para proteger el IC ante cortocircuitos en la salida."]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simContent={<div style={{fontSize:'4.5rem', transform: ampActive ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.15s ease-out'}}>🔊</div>} 
                    simStatus={{ on: "Amplitud de salida: +26dB", off: "Bias de corriente mínimo" }} 
                />

                {/* 6. ROBOT EVITA OBSTÁCULOS */}
                <ProjectCard 
                    num="6" title="Sistemas Inteligentes Autónomos (Arduino)" imageSrc="/proj_evita.png" videoId="3oA-O9H-8Rk" 
                    description="Integración de microsistemas y sensores para la navegación autónoma y toma de decisiones en tiempo real."
                    functioning={`🛰️ ROBÓTICA Y CIBERNÉTICA:
                    • Telemetría Ultrasónica: El sensor HC-SR04 emite un tren de pulsos (Trigger). El eco (Echo) retorna tras rebotar. Distancia (cm) = Microsegundos / 58.
                    • Algoritmos de Decisión: Estructura de procesamiento 'Percepción-Decisión-Acción'. Se estudia la latencia de respuesta frente a la velocidad del rover.
                    • Driver L298N (Puente H): Control de motores bidireccionales mediante señales digitales. Permite invertir la polaridad magnética sin interruptores mecánicos.
                    • Gestión de Energía: Separación de la alimentación del microcontrolador (lógica) y los motores (potencia) para evitar ruidos eléctricos (picos de inducción) que reseteen la CPU.`}
                    materials={["Microcontrolador Arduino UNO R3", "Sensores ultrasónicos de 40kHz", "Módulo Puente H L298NDual Channel", "Sistema de tracción diferencial", "Batería de alta descarga Li-Po"]} 
                    instructions={["Calibración de Sensor: Ajustar el sensor por software para filtrar falsos positivos generados por superficies absorbentes (alfombras).", "Mapping lógico: Programar un 'giro de evasión' de 90° si el obstáculo está a menos de 20 unidades.", "Control PWM: Definir la velocidad de crucero en 180 (0-255) para un balance óptimo entre autonomía y capacidad de reacción.", "Debugging: Utilizar el monitor serie para visualizar las lecturas de distancia en tiempo real."]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simContent={<div style={{fontSize:'3.5rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} 
                    simStatus={{ on: "Procesador cargado (Main Loop)", off: "Memoria Flash inactiva" }} 
                />

                {/* 7. TALLER DE SOLDADURA */}
                <ProjectCard 
                    num="7" title="Soldadura y Metalurgia de Unión" videoId="J5Sb21qbpEQ" 
                    description="Dominio del proceso físico de unión atómica entre metales mediante aporte de aleación eutéctica."
                    functioning={`🩹 CIENCIA DE LOS MATERIALES:
                    • Aleación Sn/Pb 60-40: Buscamos el punto eutéctico, donde el material pasa de sólido a líquido casi instantáneamente a 183°C.
                    • Capa Intermetálica (IML): La verdadera unión no es pegamento, es una zona de micrones donde el estaño se mezcla con el cobre del pad. Si se aplica poco calor, la capa no se forma (Soldadura fría).
                    • Tensión Superficial: El Flux (resina) reduce la tensión del estaño líquido, permitiendo que 'fluya' y moje perfectamente la isla circular.
                    • Gradiente Térmico: Importancia de calentar primero los elementos más masivos para evitar 'choques térmicos' que fracturen la unión.`}
                    materials={["Soldador de punta cerámica 40W", "Estaño 0.8mm con núcleo de resina", "Placa Perfboard de fibra de vidrio FR4", "Limpiador de puntas (lana de latón o esponja húmeda)"]} 
                    instructions={["Preparación: Limpiar los pads con alcohol isopropílico para eliminar óxidos superficiales.", "Soldado: Aplicar la punta del soldador tocando el pad y el pin simultáneamente durante 2 segundos.", "Aporte: Acercar el estaño al lado opuesto del soldador. Si fluye solo, la temperatura es correcta.", "Inspección: El resultado debe ser una superficie brillante (indicativo de enfriamiento lento y correcto) y forma piramidal."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ UNIÓN INTERMETÁLICA OK' }, { url: '/proj_soldadura_error.png', label: '❌ FRACTURA / BOLA FRÍA' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simContent={<div style={{fontSize:'4.5rem'}}>🩹</div>} 
                    simStatus={{ on: "Transferencia de calor Q activa", off: "Equilibrio térmico" }} 
                />

                {/* 8. HUERTA SOLAR INTELIGENTE */}
                <ProjectCard 
                    num="8" title="Eco-Ingeniería: Huerta Solar de Alta Eficiencia" 
                    description="Sistema bioclimático tecnificado para la investigación avanzada en fotovoltaica y biotecnología vegetal."
                    functioning={`🔬 FOTOTECNOLOGÍA Y BIOLOGÍA APLICADA:
                    • Irradiancia Solar (W/m²): El panel aprovecha la energía de los fotones solares para excitar electrones en el silicio (Efecto Fotovoltaico). Calculamos la Irradiancia bajo STC (Standard Test Conditions).
                    • Espectro PAR (Photosynthetically Active Radiation): Los Grow LEDs emiten energía concentrada en picos de 450nm y 660nm, optimizando la tasa de fotólisis del agua en la fase clara de la fotosíntesis.
                    • Tasa de Crecimiento Logarítmico: Análisis matemático de cómo la suplementación lumínica nocturna afecta la división celular (Mitosis) en los meristemas de la planta.
                    • Ingeniería Eléctrica Off-Grid: Uso de reguladores MPPT (Maximum Power Point Tracking) para maximizar la transferencia de potencia del panel a la batería ajustando la impedancia de carga.`}
                    materials={[
                        "Panel Solar Monocristalino de alta eficiencia",
                        "Regulador Digital con control de descarga profunda",
                        "Banco de baterías de ciclo profundo (Células Li-NMC)",
                        "Sensores de espectro lumínico e Higrometría dual",
                        "Cajón hidropónico de polietileno de alta densidad"
                    ]}
                    instructions={[
                        "Cálculo de Autonomía: Determinar Ah de la batería según consumo total de LEDs y horas de sol pico de la región.",
                        "Instalación: Orientación y Azimut. Ajustar inclinación según latitud para máxima exposición anual.",
                        "Seguridad: Instalar diodos de protección anti-retorno para evitar que la batería se descargue por el panel de noche.",
                        "Bio-Monitoreo: Realizar mediciones diarias de Lux, temperatura y humedad foliar para generar gráficos de correlación."
                    ]}
                    imageSrc={[
                        { url: '/proj_huerta_schem.png', label: '📑 Ingeniería del Circuito' },
                        { url: '/proj_huerta_wire.png', label: '🔌 Guía de Interconexión' },
                        { url: '/proj_huerta.png', label: '🌿 Prototipo de Bio-Sustentable' }
                    ]}
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simContent={
                        <div style={{ position: 'relative', width: '240px', height: '180px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '20px', transition: 'background 2s linear', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', width: '35px', height: '35px', background: isDay ? 'yellow' : '#eee', borderRadius: '50%', left: '170px', top: isDay ? '15px' : '35px', boxShadow: isDay ? '0 0 30px yellow' : '0 0 15px #fff', transition: 'all 2.5s ease' }}></div>
                            {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '80px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.4), transparent)', top: '35px' }}></div>}
                            <div style={{ position: 'absolute', bottom: '15px', left: '25px', display: 'flex', gap: '8px' }}>
                                {[1,2,3,4].map(i=><div key={i} style={{width:'22px',height: huertaActive && !isDay ? '60px' : '30px', background:'#1b5e20', borderRadius:'10px 10px 0 0', transition:'height 4s ease-in-out' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: isDay ? "Absorción fotovoltaica máxima" : "Emisión grow activa (PAR High)", off: "Sistema en recalibración" }}
                >
                    <div className="proyecto-section" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '2rem', marginTop: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', marginBottom: '1rem' }}>🔬 Laboratorio STEAM Integrado</h4>
                        <div style={{ fontSize: '0.82rem', color: '#ccc', lineHeight: '1.6' }}>
                            <p><strong>Física:</strong> Termodinámica de celdas solares y Ley de Wien (radiación del cuerpo negro).</p>
                            <p><strong>Química:</strong> Composición de pigmentos fotosintéticos y ciclo de Calvin.</p>
                            <p><strong>Ingeniería:</strong> Diseño de sistemas redundantes y Smart Control mediante sensores IoT.</p>
                        </div>
                    </div>
                </ProjectCard>

            </div>

            <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.8, padding: '6rem', borderTop: '1px solid rgba(0,242,255,0.2)', background: 'linear-gradient(to bottom, transparent, rgba(0,242,255,0.05))' }}>
                <p style={{ fontSize: '1rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-color)' }}>SIMUTEC © 2026 - MODELO EDUCATIVO DE INGENIERÍA SUSTENTABLE</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Preparando a los técnicos del mañana para los desafíos globales.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

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
    const [evitaPos, setEvitaPos] = useState({ x: 20, y: 50 });
    const [evitaRotation, setEvitaRotation] = useState(0);
    const [sensorDist, setSensorDist] = useState(100);

    useEffect(() => {
        let interval;
        if (evitaActive) {
            interval = setInterval(() => {
                setEvitaPos(prev => {
                    const obstacleX = 160;
                    const nextX = prev.x + (evitaRotation === 0 ? 2 : 0);
                    const nextY = prev.y + (evitaRotation === 90 ? 2 : 0);
                    const dist = Math.abs(obstacleX - nextX);
                    setSensorDist(dist);
                    if (dist < 40 && evitaRotation === 0) {
                        setEvitaRotation(90);
                        return prev;
                    }
                    if (nextY > 100) {
                        setEvitaRotation(0);
                        return { x: 20, y: 50 };
                    }
                    return { x: nextX, y: nextY };
                });
            }, 50);
        } else {
            setEvitaPos({ x: 20, y: 50 });
            setEvitaRotation(0);
            setSensorDist(100);
        }
        return () => clearInterval(interval);
    }, [evitaActive, evitaRotation]);

    useEffect(() => {
        let interval;
        if (huertaActive) {
            interval = setInterval(() => {
                setIsDay(prev => !prev);
            }, 5000);
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
                        <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{num}</span>
                        {title}
                    </h2>
                    
                    <div className="proyecto-section technical-header">
                        <h3>📋 Descripción y Alcance Curricular</h3>
                        <p>{description}</p>
                    </div>

                    <div className="proyecto-info-grid">
                        <div className="info-left">
                            {functioning && (
                                <div className="proyecto-section theory-section">
                                    <h3>🧪 Marco Teórico y Científico</h3>
                                    <div className="theory-block" style={{ fontStyle: 'italic', fontSize: '0.88rem', whiteSpace: 'pre-line', background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '15px', borderLeft: '4px solid var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                        {functioning}
                                    </div>
                                </div>
                            )}

                            {imageSrc && !Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🚀 Referencia de Prototipaje</h3>
                                    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#111', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={getImagePath(imageSrc)} alt={title} style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </div>
                            )}

                            {Array.isArray(imageSrc) && (
                                <div className="proyecto-section">
                                    <h3>🧪 Documentación Visual</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {imageSrc.map((src, i) => (
                                            <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <img src={getImagePath(src.url)} alt={src.label} style={{ width: '100%' }} />
                                                <p style={{ fontSize: '0.7rem', textAlign: 'center', padding: '5px', background: src.color || '#333' }}>{src.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="proyecto-section">
                                <h3>🛠️ BOM (Bill of Materials)</h3>
                                <div className="materials-list">
                                    <ul>
                                        {materials.map((mat, i) => <li key={i}>{mat}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-right">
                            <div className="proyecto-section">
                                <h3>⚙️ Desarrollo del Proyecto (Step-by-Step)</h3>
                                <ol className="instructions-list">
                                    {instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                                </ol>
                            </div>

                            <div className="simulacion-area" style={{ background: '#0a0a0a', minHeight: '280px', borderRadius: '15px', border: '1px solid rgba(0,242,255,0.2)' }}>
                                {simContent}
                                <div className="sim-controls">
                                    <button className="btn-toggle-sim" onClick={() => setSimOn(!simOn)}>
                                        {simOn ? '🛑 Detener Simulación' : '▶️ Iniciar Laboratorio Virtual'}
                                    </button>
                                    <div className={`sim-status ${simOn ? 'status-on' : 'status-off'}`}>
                                        {simOn ? 'SISTEMA ACTIVO: ' + simStatus.on : 'MODO STANDBY: ' + simStatus.off}
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>

                    {videoId && (
                        <div className="proyecto-section" style={{ marginTop: '3rem' }}>
                            <h3>📺 Material Audiovisual de Apoyo</h3>
                            <div className="video-container" style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
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
            <header className="proyectos-header">
                <h1>🔌 Robótica, Eco-Tecnología y STEAM Integrado</h1>
                <p>Módulos de ingeniería y ciencias experimentales. Aprendizaje basado en proyectos (ABP).</p>
            </header>

            <div className="proyecto-grid">
                
                {/* 1. ROBOT MÓVIL SIMPLE */}
                <ProjectCard 
                    num="1" title="Robot Móvil Simple de Tracción Directa" imageSrc="/proj_robot.png" videoId="9-yLdInA_6c" 
                    description="Construcción de un chasis autoportante con materiales reciclados para el estudio de la tracción mecánica y el electromagnetismo aplicado."
                    functioning={`🔬 FUNDAMENTOS FÍSICOS:
                    • Principio de Lorentz: El motor DC convierte energía eléctrica en mecánica mediante la interacción del campo magnético de los imanes internos y la corriente en el rotor.
                    • Cinemática Lineal: V = d / t. Analizamos la velocidad constante obtenida mediante la relación de voltaje y carga.
                    • Fricción y Tracción: Estudio del coeficiente de rozamiento neumático-suelo (tapas de botella vs superficie) y su importancia en la transferencia de potencia.`}
                    materials={["Botella plástica (Chasis)", "2 Motores DC 3V-6V", "Pilas AA 1.5V", "Tapas de botella (Ruedas)", "Interruptor simple"]} 
                    instructions={["Perforar el centro exacto de las tapas para minimizar la excentricidad.", "Fijar los motores al chasis asegurando la alineación paralela de los ejes.", "Realizar el cableado en paralelo para asegurar el mismo voltaje en ambos motores.", "Añadir una rueda loca o deslizador frontal para permitir el giro por diferencial."]} 
                    simOn={robotMoving} setSimOn={setRobotMoving} 
                    simContent={<div className={robotMoving ? 'moving' : ''} style={{fontSize:'4rem'}}>🤖</div>} 
                    simStatus={{on:"Avance por tracción directa",off:"Circuito abierto"}} 
                />
                
                {/* 2. VELADOR LED */}
                <ProjectCard 
                    num="2" title="Velador LED: Teoría de Semiconductores" imageSrc="/proj_velador.png" videoId="-BIs-z5g7tY" 
                    description="Diseño de un sistema de iluminación ambiental utilizando componentes de estado sólido y materiales plásticos/metálicos reutilizados."
                    functioning={`🔌 INGENIERÍA ELECTRÓNICA:
                    • Diodo Emisor de Luz (LED): Estudio de la unión P-N. Los electrones caen en huecos emitiendo fotones.
                    • Ley de Ohm Aplicada: V = I x R. Calculamos la resistencia limitadora para evitar la ruptura térmica del componente (R = (V_fuente - V_led) / I_deseada).
                    • Potenciometría: Uso de divisores de tensión para el control de la intensidad lumínica (dimmer básico).`}
                    materials={["Lata de conserva (Cuerpo)", "LED de alto brillo", "Resistencia de 220-470 ohm", "CD viejo (Difusor)", "Cable USB reciclado"]} 
                    instructions={["Soldar la resistencia en serie al ánodo del LED.", "Preparar el CD como base reflectora para maximizar el ángulo de emisión.", "Conectar el cable USB, identificando el pinout de 5V y GND.", "Ensamblar el circuito dentro de la lata asegurando aislación eléctrica."]} 
                    simOn={veladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4rem', color: veladorOn ? 'yellow' : '#444', textShadow: veladorOn ? '0 0 20px yellow' : 'none'}}>💡</div>} 
                    simStatus={{on:"Luz emitida (Fotones activos)",off:"Diodo en corte"}} 
                />

                {/* 3. VENTILADOR PERSONAL */}
                <ProjectCard 
                    num="3" title="Ventilador: Aerodinámica y Fluids" imageSrc="/proj_ventilador.png" videoId="YqXf8zXW77A" 
                    description="Módulo de estudio sobre la transferencia de cantidad de movimiento mediante aspas deformadas térmicamente."
                    functioning={`🌀 DINÁMICA DE FLUIDOS:
                    • Principio de Bernoulli: La forma de las aspas crea una diferencia de presión que genera el flujo de aire.
                    • Ángulo de Ataque: Se analiza cómo la inclinación térmica del CD (aspas) afecta el caudal de aire desplazado.
                    • Conservación de Energía: Energía Eléctrica → Energía Magnética → Energía Cinética Rotacional.`}
                    materials={["Motor DC de alta revolución", "CD reciclado (Paletas)", "Soporte de madera o cartón", "Interruptor", "Fuente de 5V-9V"]} 
                    instructions={["Cortar el CD en 6 u 8 secciones radiales sin llegar al centro.", "Aplicar calor controlado para rotar cada sección unos 30-45 grados.", "Fijar el motor al soporte con adhesivo estructural.", "Montar el CD en el eje y asegurar la estabilidad dinámica."]} 
                    simOn={ventiladorOn} setSimOn={setVeladorOn} 
                    simContent={<div style={{fontSize:'4rem', animation: ventiladorOn ? 'spin 0.2s linear infinite' : 'none'}}>🌀</div>} 
                    simStatus={{on:"Flujo turbulento generado",off:"Inercia cero"}} 
                />

                {/* 4. ARAÑA VIBROBOT */}
                <ProjectCard 
                    num="4" title="Vibrobot: Movimiento por Masa Excéntrica" imageSrc="/proj_arana.png" videoId="pGisAks_2sU" 
                    description="Experimento sobre la conversión de vibraciones en desplazamientos lineales mediante el uso de una masa desbalanceada."
                    functioning={`🕷️ MECÁNICA VIBRATORIA:
                    • Fuerza Centrífuga: La masa descentrada en el eje del motor genera una fuerza radial cambiante.
                    • Resonancia y Fricción: Las patas de la araña (alambres) transforman la vibración circular en saltos microscópicos que producen traslación.
                    • Estática vs Dinámica: Cómo el centro de gravedad afecta la dirección del movimiento.`}
                    materials={["Motor vibrador (o motor común con contrapeso)", "Pila botón 3V", "Clips de papel o alambre", "Cuerpo de tapita plástica"]} 
                    instructions={["Doblar los alambres para formar 6 patas simétricas.", "Pegar el motor sobre el cuerpo pero con el contrapeso fuera de la base.", "Conectar la pila asegurando un contacto firme.", "Ajustar las patas para cambiar la trayectoria del robot."]} 
                    simOn={aranaMoving} setSimOn={setAranaMoving} 
                    simContent={<div className={aranaMoving ? 'arana-moving' : ''} style={{fontSize:'4rem'}}>🕷️</div>} 
                    simStatus={{on:"Vibración traslacional",off:"Equilibrio estático"}} 
                />

                {/* 5. AMPLIFICADOR TDA 2005 */}
                <ProjectCard 
                    num="5" title="Amplificador Hi-Fi TDA 2005" imageSrc="/proj_amp.png" videoId="5VIda0n8t-E" 
                    description="Ingeniería de audio de potencia. Construcción de un amplificador clase AB para el estudio de señales analógicas y gestión térmica."
                    functioning={`🔊 ELECTRÓNICA DE POTENCIA:
                    • Clase AB: El TDA 2005 combina la linealidad de la Clase A con la eficiencia de la B para reducir la distorsión de cruce.
                    • Impedancia: Z = R + jX. Importancia de acoplar la salida a parlantes de 4 u 8 ohms.
                    • Disipación de Calor: Q = I² x R. Se estudia la transferencia térmica mediante el disipador metálico para evitar el apagado por protección.`}
                    materials={["Circuito Integrado TDA 2005", "Disipador de aluminio grueso", "Capacitores electrolíticos (1000uF - 2200uF)", "Módulo Bluetooth 5.0", "Fuente 12V 2Ah"]} 
                    instructions={["Montar el TDA en el disipador usando grasa siliconada.", "Cablear los capacitores de desacople lo más cerca posible de los pines de alimentación.", "Integrar el módulo BT para la entrada de señal analógica.", "Verificar la temperatura de operación tras 5 minutos de uso."]} 
                    simOn={ampActive} setSimOn={setAmpActive} 
                    simContent={<div style={{fontSize:'4rem', transform: ampActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s'}}>🔊</div>} 
                    simStatus={{ on: "Amplitud máxima (dB)", off: "Señal en reposo" }} 
                />

                {/* 6. ROBOT EVITA OBSTÁCULOS */}
                <ProjectCard 
                    num="6" title="Robot Evitador: Sensores y Lógica" imageSrc="/proj_evita.png" videoId="3oA-O9H-8Rk" 
                    description="Introducción a la inteligencia artificial básica y control de bucle cerrado mediante microcontroladores."
                    functioning={`🛰️ PROCESAMIENTO DE DATOS:
                    • Ultrasonido (HC-SR04): Emisión de pulsos a 40kHz. Calculamos Distancia = (Tiempo x Velocidad del sonido) / 2.
                    • Lógica de Control: Estructura condicional (IF-ELSE). Si el sensor detecta objeto a < 10cm, se activa el algoritmo de giro.
                    • PWM (Pulse Width Modulation): Control de la velocidad de los motores mediante la variación del ciclo de trabajo.`}
                    materials={["Arduino UNO", "Chasis robotizado", "Sensor HC-SR04", "Driver L298N", "Batería 9V/Li-po"]} 
                    instructions={["Montar el sensor en la parte frontal con ángulo de 90° respecto al suelo.", "Conectar el driver L298N para el control de potencia de los motores.", "Cargar el código desde mBlock o Arduino IDE.", "Testear la capacidad de respuesta ante obstáculos de diferentes materiales."]} 
                    simOn={evitaActive} setSimOn={setEvitaActive} 
                    simContent={<div style={{fontSize:'3rem', animation: evitaActive ? 'jitter 0.1s infinite' : 'none'}}>🛰️</div>} 
                    simStatus={{ on: "Mapping & Avoidance activo", off: "Procesador en IDLE" }} 
                />

                {/* 7. TALLER DE SOLDADURA */}
                <ProjectCard 
                    num="7" title="Soldadura Profesional en Placas" videoId="J5Sb21qbpEQ" 
                    description="Entrenamiento en habilidades motrices finas y procesos metalúrgicos de unión eléctrica."
                    functioning={`🩹 CIENCIA DE MATERIALES:
                    • Punto Eutéctico: La aleación de estaño (60/40) funde a 183°C. Buscamos la temperatura ideal para asegurar fluidez sin dañar el pad.
                    • Capilaridad: Cómo el estaño líquido 'moja' el cobre de la isla formando una unión mecánica cónica.
                    • Oxidación y Flux: Función de la resina para limpiar óxidos y permitir la adherencia molecular.`}
                    materials={["Soldador tipo lápiz 30W-40W", "Estaño de alta pureza", "Placa de islas redondas (Perfboard)", "Esponja vegetal limpia-punta"]} 
                    instructions={["Mantener la punta del soldador siempre estañada y brillante.", "Calentar simultáneamente la pista y el terminal del componente.", "Aportar estaño por el lado opuesto al calor para verificar temperatura.", "Inspeccionar que la soldadura sea cónica y brillante, no una 'bola'."]} 
                    imageSrc={[{ url: '/proj_soldadura_ok.png', label: '✅ CÓNICA / BRILLANTE' }, { url: '/proj_soldadura_error.png', label: '❌ BOLA / OPACA' }]} 
                    simOn={solderActive} setSimOn={setSolderActive} 
                    simContent={<div style={{fontSize:'4rem'}}>🩹</div>} 
                    simStatus={{ on: "Punta a 350°C", off: "Temperatura ambiente" }} 
                />

                {/* 8. HUERTA SOLAR INTELIGENTE */}
                <ProjectCard 
                    num="8" title="Huerta Solar: Fotobiología STEAM" imageSrc="/proj_huerta.png" videoId="Yf0BvGf7oXY" 
                    description="Módulo avanzado de agricultura tecnificada y energías alternativas."
                    functioning={`🔬 FUNDAMENTOS CIENTÍFICOS:
                    • Espectro Fotobiótico: Las plantas absorben picos específicos en Azul (430nm) y Rojo (660nm). Los Grow LEDs maximizan la tasa de fotosíntesis (Tasa de Fijación de CO2).
                    • Ingeniería Fotovoltaica: Cálculo del rendimiento del panel solar. P(W) = V x I. Se estudia la carga de celdas LiFePO4 para autonomía nocturna.
                    • Matemáticas Aplicadas: Estudio de la progresión de crecimiento foliar mediante registros estadísticos semanales.`}
                    materials={["Panel Solar 12V", "LEDs Grow Red/Blue", "Regulador de Carga", "Batería recargable", "Contenedor reciclado"]} 
                    instructions={["Calibrar el ángulo del panel solar según la latitud local.", "Montar las Grow Lights asegurando un área de cobertura uniforme sobre el cultivo.", "Medir el voltaje de batería durante el ciclo de descarga nocturno.", "Analizar variables bióticas vs control sin suplementación lumínica."]} 
                    simOn={huertaActive} setSimOn={setHuertaActive} 
                    simContent={
                        <div style={{ position: 'relative', width: '200px', height: '150px', background: isDay ? '#87CEEB' : '#0a0a20', borderRadius: '15px', transition: 'background 2s linear', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', width: '30px', height: '30px', background: isDay ? 'yellow' : '#eee', borderRadius: '50%', left: '150px', top: isDay ? '10px' : '20px', boxShadow: isDay ? '0 0 20px yellow' : '0 0 10px #fff', transition: 'all 2s ease' }}></div>
                            {!isDay && huertaActive && <div style={{ position: 'absolute', width: '100%', height: '50px', background: 'linear-gradient(to bottom, rgba(255,0,255,0.3), transparent)', top: '30px' }}></div>}
                            <div style={{ position: 'absolute', bottom: '10px', left: '20px', display: 'flex', gap: '5px' }}>
                                {[1,2,3].map(i=><div key={i} style={{width:'15px',height: huertaActive && !isDay ? '40px' : '20px', background:'#2e7d32', borderRadius:'8px 8px 0 0', transition:'height 2s ease' }}></div>)}
                            </div>
                        </div>
                    }
                    simStatus={{ on: isDay ? "Panel en fase de carga" : "Grow LEDs en fase lumínica", off: "Sistema inactivo" }}
                />

            </div>

            <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.7, padding: '4rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>© SimuTec - Tecnología para un Planeta Sustentable. Enfoque Educativo STEAM Integrado.</p>
            </footer>
        </div>
    );
};

export default ProyectosReciclablesPage;

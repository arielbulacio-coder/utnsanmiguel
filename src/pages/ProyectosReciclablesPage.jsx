import React, { useState } from 'react';
import './ProyectosReciclablesStyles.css';

const ProyectosReciclablesPage = () => {
    const [robotMoving, setRobotMoving] = useState(false);
    const [veladorOn, setVeladorOn] = useState(false);
    const [ventiladorOn, setVentiladorOn] = useState(false);

    return (
        <div className="proyectos-container fade-in">
            <div className="proyectos-header">
                <h1>Robótica con Materiales Reciclables</h1>
                <p>Proyectos prácticos para aprender electrónica y mecánica reutilizando materiales cotidianos.</p>
            </div>

            {/* Proyecto 1: Robot Simple */}
            <div className="proyecto-card">
                <h2 className="proyecto-title">1) Robot Simple (Introducción a la Mecánica y Electrónica Básica)</h2>
                
                <div className="proyecto-section">
                    <h3>Descripción del Proyecto</h3>
                    <p>Construcción de un robot móvil muy básico, a menudo un modelo bípedo o con ruedas, utilizando elementos como botellas de plástico, cartón, tapas, y motores de juguetes viejos o componentes electrónicos de bajo costo (como motores DC, portapilas, interruptores).</p>
                </div>

                <div className="proyecto-section">
                    <h3>Objetivos de Aprendizaje</h3>
                    <ul>
                        <li>Comprender el funcionamiento de un circuito simple.</li>
                        <li>Transformación de energía eléctrica en cinética (movimiento).</li>
                        <li>Principios de la mecánica básica (ejes, engranajes rudimentarios si aplica).</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Materiales Clave</h3>
                    <ul>
                        <li>Botellas o envases de plástico.</li>
                        <li>Cartón grueso.</li>
                        <li>Palitos de madera o brochetas (para ejes).</li>
                        <li>Tapas de botellas (para ruedas o pies).</li>
                        <li>Motor de vibración o motor DC pequeño.</li>
                        <li>Interruptor simple, portapilas y baterías.</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Resultado Esperado</h3>
                    <p>Un pequeño robot capaz de moverse en línea recta o vibrar/deambular sobre una superficie plana.</p>
                </div>

                <div className="simulacion-box">
                    <h3>Simulación Interactiva: Robot Simple</h3>
                    <div className={`robot-sim ${robotMoving ? 'robot-moving' : ''}`}>
                        🤖
                    </div>
                    <br />
                    <button 
                        className="btn-simular" 
                        onClick={() => setRobotMoving(!robotMoving)}
                    >
                        {robotMoving ? 'Detener Robot' : 'Activar Robot'}
                    </button>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        {robotMoving ? 'El circuito está cerrado. Energía eléctrica convirtiéndose en movimiento lineal/vibratorio.' : 'El circuito está abierto. El motor no recibe energía.'}
                    </p>
                </div>
            </div>

            {/* Proyecto 2: Velador */}
            <div className="proyecto-card">
                <h2 className="proyecto-title">2) Velador (Aplicación de Iluminación y Circuitos Sencillos)</h2>
                
                <div className="proyecto-section">
                    <h3>Descripción del Proyecto</h3>
                    <p>Diseño y construcción de una lámpara de mesa o velador funcional, utilizando principalmente latas, botellas de vidrio o plástico, CDs viejos, y otros materiales reciclados para la estructura y la pantalla. La fuente de luz será un LED de bajo consumo o una tira de LEDs, integrando un circuito simple con un interruptor.</p>
                </div>

                <div className="proyecto-section">
                    <h3>Objetivos de Aprendizaje</h3>
                    <ul>
                        <li>Entender la polaridad de los LEDs.</li>
                        <li>La necesidad de resistencias (si aplica) para proteger el componente.</li>
                        <li>Diseño de estructuras estables y aplicación práctica de la iluminación en el hogar.</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Materiales Clave</h3>
                    <ul>
                        <li>Latas de refresco o conservas, botellas de plástico grandes.</li>
                        <li>CDs/DVDs viejos (como base reflectante).</li>
                        <li>Cable, interruptor.</li>
                        <li>LED de alto brillo o tira de LED.</li>
                        <li>Resistencia (si es necesaria).</li>
                        <li>Portapilas o fuente de alimentación USB reciclada.</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Resultado Esperado</h3>
                    <p>Un velador decorativo y funcional que utiliza componentes de bajo consumo y materiales reciclados en su estructura.</p>
                </div>

                <div className="simulacion-box">
                    <h3>Simulación Interactiva: Circuito LED Velador</h3>
                    <div 
                        className={`velador-sim ${veladorOn ? 'velador-on' : 'velador-off'}`}
                        onClick={() => setVeladorOn(!veladorOn)}
                        style={{ display: 'inline-block' }}
                    >
                        💡
                    </div>
                    <br />
                    <button 
                        className="btn-simular" 
                        onClick={() => setVeladorOn(!veladorOn)}
                    >
                        {veladorOn ? 'Apagar Lámpara' : 'Encender Lámpara'}
                    </button>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        {veladorOn ? 'Interruptor en posición ON. Corriente fluye respetando polaridad (+ a -).' : 'Interruptor en posición OFF. El circuito está abierto.'}
                    </p>
                </div>
            </div>

            {/* Proyecto 3: Ventilador Personal */}
            <div className="proyecto-card">
                <h2 className="proyecto-title">3) Ventilador Personal (Conversión de Energía y Movimiento Rotatorio)</h2>
                
                <div className="proyecto-section">
                    <h3>Descripción del Proyecto</h3>
                    <p>Creación de un pequeño ventilador de escritorio, impulsado por un motor DC (como los de juguetes o impresoras viejas), con aspas hechas de plástico de botellas o CDs cortados. La base y la carcasa se construirán con materiales como cartón, envases plásticos o tubos de PVC reciclados.</p>
                </div>

                <div className="proyecto-section">
                    <h3>Objetivos de Aprendizaje</h3>
                    <ul>
                        <li>Observar la conversión de energía eléctrica a energía eólica y movimiento rotatorio.</li>
                        <li>Entender la importancia del balance de las aspas para evitar vibraciones excesivas.</li>
                        <li>Practicar la conexión de un motor a una fuente de energía (pila o USB reciclado).</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Materiales Clave</h3>
                    <ul>
                        <li>Motor DC pequeño (recuperado de juguetes, lectoras de CD).</li>
                        <li>Aspas de ventilador improvisadas (hechas de tapas plásticas o CDs moldeados al calor).</li>
                        <li>Base y estructura de cartón o plástico reciclado.</li>
                        <li>Interruptor, cable y tubo de soporte (ej. marcador plástico vacío).</li>
                        <li>Fuente de alimentación (pila AA/AAA o cable USB viejo).</li>
                    </ul>
                </div>

                <div className="proyecto-section">
                    <h3>Resultado Esperado</h3>
                    <p>Un pequeño ventilador de escritorio funcional, seguro y construido en su totalidad con materiales útiles recuperados.</p>
                </div>

                <div className="simulacion-box">
                    <h3>Simulación Interactiva: Motor DC Ventilador</h3>
                    <div className="ventilador-sim-container" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                        <div className={`ventilador-sim ${ventiladorOn ? 'ventilador-on' : ''}`}>
                            <svg viewBox="0 0 100 100" width="80" height="80">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--primary-color)" strokeWidth="4" />
                                <circle cx="50" cy="50" r="10" fill="var(--glass-border)" />
                                {/* Aspas */}
                                <path d="M50 50 Q60 20 50 10 Q40 20 50 50" fill="var(--text-dim)" opacity="0.8" />
                                <path d="M50 50 Q80 40 90 50 Q80 60 50 50" fill="var(--text-dim)" opacity="0.8" />
                                <path d="M50 50 Q40 80 50 90 Q60 80 50 50" fill="var(--text-dim)" opacity="0.8" />
                                <path d="M50 50 Q20 60 10 50 Q20 40 50 50" fill="var(--text-dim)" opacity="0.8" />
                            </svg>
                        </div>
                    </div>
                    <button 
                        className="btn-simular" 
                        onClick={() => setVentiladorOn(!ventiladorOn)}
                    >
                        {ventiladorOn ? 'Frenar Motor' : 'Encender Motor'}
                    </button>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        {ventiladorOn ? 'Circuito cerrado. Motor DC girando por inducción electromagnética. Aire fluyendo.' : 'Motor detenido. Sin flujo de corriente.'}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ProyectosReciclablesPage;

import React, { useState, useEffect, useRef } from 'react';
import './ElectricityBasicsStyles.css';

const SoldaduraPage = () => {
    const [section, setSection] = useState('teoria');

    // Simulador estado
    const [power, setPower] = useState(false);
    const [watts, setWatts] = useState(40);
    const [tipTemp, setTipTemp] = useState(25);
    const [tinned, setTinned] = useState(false);
    const [tipDirty, setTipDirty] = useState(false);
    const [contact, setContact] = useState(false);
    const [solderApplied, setSolderApplied] = useState(false);
    const [contactSeconds, setContactSeconds] = useState(0);
    const [jointState, setJointState] = useState('vacio'); // vacio | calentando | aplicando | retirando | bueno | frio | quemado | puente
    const [feedback, setFeedback] = useState('');
    const intervalRef = useRef(null);

    // Calentamiento del cautín
    useEffect(() => {
        const target = power ? (watts >= 40 ? 380 : 320) : 25;
        const step = power ? (watts >= 40 ? 8 : 6) : -10;
        const id = setInterval(() => {
            setTipTemp((prev) => {
                if (power && prev < target) return Math.min(prev + step, target);
                if (!power && prev > 25) return Math.max(prev - 4, 25);
                return prev;
            });
        }, 200);
        return () => clearInterval(id);
    }, [power, watts]);

    // Suciedad de la punta con uso prolongado
    useEffect(() => {
        if (tipTemp > 350 && power) {
            const id = setTimeout(() => setTipDirty(true), 8000);
            return () => clearTimeout(id);
        }
    }, [tipTemp, power]);

    // Cronómetro de contacto
    useEffect(() => {
        if (contact) {
            intervalRef.current = setInterval(() => {
                setContactSeconds((s) => s + 0.1);
            }, 100);
        } else {
            clearInterval(intervalRef.current);
            setContactSeconds(0);
        }
        return () => clearInterval(intervalRef.current);
    }, [contact]);

    // Lógica de la junta
    useEffect(() => {
        if (!contact) {
            if (jointState === 'aplicando' || jointState === 'calentando') {
                evaluarJunta();
            }
            return;
        }

        if (tipTemp < 280) {
            setJointState('frio');
            setFeedback('❌ El cautín no está suficientemente caliente. La unión quedará fría (opaca, granulada).');
            return;
        }

        if (tipDirty && !solderApplied) {
            setFeedback('⚠️ La punta está sucia (oxidada). Limpiá con esponja húmeda antes de soldar.');
        }

        if (contactSeconds < 1.5) {
            setJointState('calentando');
            setFeedback('🔥 Calentando pad + terminal del componente... Mantené 1-2 segundos antes de aplicar estaño.');
        } else if (contactSeconds >= 1.5 && contactSeconds < 4 && solderApplied) {
            setJointState('aplicando');
            setFeedback('✅ Buen momento: el estaño fluye hacia la zona caliente.');
        } else if (contactSeconds >= 6) {
            setJointState('quemado');
            setFeedback('🔥🔥 ¡Demasiado tiempo! Riesgo de dañar el componente o despegar la pista.');
        }
    }, [contactSeconds, contact, tipTemp, tipDirty, solderApplied, jointState]);

    const evaluarJunta = () => {
        if (tipTemp < 280) {
            setJointState('frio');
            setFeedback('❌ Soldadura fría: punta a baja temperatura. Repetí calentando primero.');
            return;
        }
        if (contactSeconds >= 1.5 && contactSeconds <= 4 && solderApplied && tinned) {
            setJointState('bueno');
            setFeedback('🏆 ¡Excelente! Forma de volcán, brillante y simétrica. Soldadura correcta.');
        } else if (!solderApplied) {
            setJointState('vacio');
            setFeedback('Aplicá estaño después de calentar el pad.');
        } else if (contactSeconds < 1.5 && solderApplied) {
            setJointState('frio');
            setFeedback('❌ Soldadura fría: el estaño no llegó a fluir bien. Calentá más antes de aplicar.');
        } else if (contactSeconds > 6) {
            setJointState('quemado');
            setFeedback('🔥 Quemada: posible daño al componente o pista despegada.');
        }
    };

    const limpiarPunta = () => {
        setTipDirty(false);
        setFeedback('🧽 Punta limpia con esponja húmeda.');
    };

    const estanarPunta = () => {
        if (tipTemp < 300) {
            setFeedback('⚠️ Calentá el cautín primero (mín. 300°C).');
            return;
        }
        setTinned(true);
        setFeedback('✨ Punta estañada: una capa fina de estaño protege y conduce mejor el calor.');
    };

    const reset = () => {
        setContact(false);
        setSolderApplied(false);
        setJointState('vacio');
        setContactSeconds(0);
        setFeedback('');
    };

    const jointColor = {
        vacio: '#666',
        calentando: '#ff9800',
        aplicando: '#ffeb3b',
        bueno: '#c0c0c0',
        frio: '#888',
        quemado: '#5d2e00',
        puente: '#aaa'
    };

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>🔥 Soldadura Electrónica</h1>
                <p>Soldador tipo lápiz de 30/40W: técnica, simulación interactiva y errores comunes.</p>
            </header>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <button className={`mat-btn ${section === 'teoria' ? 'active' : ''}`} onClick={() => setSection('teoria')}>📘 Teoría</button>
                <button className={`mat-btn ${section === 'tecnica' ? 'active' : ''}`} onClick={() => setSection('tecnica')}>🛠️ Técnica paso a paso</button>
                <button className={`mat-btn ${section === 'simulador' ? 'active' : ''}`} onClick={() => setSection('simulador')}>🎮 Simulador</button>
                <button className={`mat-btn ${section === 'errores' ? 'active' : ''}`} onClick={() => setSection('errores')}>⚠️ Errores</button>
                <button className={`mat-btn ${section === 'desoldar' ? 'active' : ''}`} onClick={() => setSection('desoldar')}>🔄 Desoldar</button>
            </div>

            <div className="electricity-grid">

                {section === 'teoria' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>El soldador tipo lápiz</h2>
                            <p>El <strong>soldador (cautín) tipo lápiz</strong> es la herramienta básica para soldar componentes electrónicos. Su nombre viene de su forma alargada y delgada, similar a un lápiz, que permite gran precisión.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#4facfe' }}>30 W</h3>
                                    <p>Ideal para electrónica fina: PCB, componentes SMD, cables delgados. Bajo riesgo de dañar el componente.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#ffeb3b' }}>40 W</h3>
                                    <p>Uso general: pads más grandes, tierra (GND) en placas con planos de cobre amplios, cables medianos. Más versátil.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#f44336' }}>{'>'} 60 W</h3>
                                    <p>Para chapa, conectores grandes o cables gruesos. <strong>NO</strong> usar en electrónica fina: quema componentes y despega pistas.</p>
                                </div>
                            </div>
                        </section>

                        <section className="elec-card full-width">
                            <h2>Partes del soldador</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>🔌 Cable de red:</strong> alimenta la resistencia interna desde 220 V.</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>🔥 Resistencia (elemento calefactor):</strong> transforma la corriente eléctrica en calor (efecto Joule).</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>📐 Mango aislante:</strong> protege la mano del calor (madera, plástico técnico o cerámica).</li>
                                <li style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginBottom: '0.5rem' }}><strong>✏️ Punta (tip):</strong> generalmente de cobre con baño de hierro/níquel. Es la parte que transfiere calor al pad.</li>
                            </ul>
                        </section>

                        <section className="elec-card full-width">
                            <h2>Materiales necesarios</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🪙 Estaño (60/40 o 63/37)</strong>
                                    <p>Aleación Sn-Pb. La 60/40 es la más común; la 63/37 es eutéctica (cambio sólido-líquido instantáneo). Diámetro 0.8-1 mm para electrónica.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🧪 Flux (resina)</strong>
                                    <p>Limpia el óxido y mejora la adherencia. Suele venir incluido en el alma del estaño ("rosin core").</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🧽 Esponja húmeda</strong>
                                    <p>Para limpiar la punta entre soldaduras. Mantenerla siempre húmeda con agua destilada.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🥽 Gafas de seguridad</strong>
                                    <p>Las salpicaduras de estaño y flux pueden saltar a los ojos. Uso obligatorio.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🌬️ Ventilación</strong>
                                    <p>El humo del flux es irritante. Trabajar en lugar ventilado o con extractor.</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(79,172,254,0.05)', borderRadius: '8px' }}>
                                    <strong>🪃 Soporte (cradle)</strong>
                                    <p>Base con espiral metálica para apoyar el cautín caliente sin riesgo de quemaduras o incendios.</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {section === 'tecnica' && (
                    <section className="elec-card full-width">
                        <h2>Técnica correcta: paso a paso</h2>
                        <ol style={{ paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>1. Calentar el cautín</strong> (~30-60 s). Una punta lista trabaja entre <strong>320 y 380 °C</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>2. Estañar la punta:</strong> aplicar una pequeña cantidad de estaño en la punta caliente. Esto crea una capa que conduce mejor el calor y evita oxidación.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>3. Limpiar la punta:</strong> pasarla por la esponja húmeda. Debe quedar brillante y plateada.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>4. Apoyar la punta sobre el pad y el terminal del componente al mismo tiempo</strong>. Calentar ambas superficies durante <strong>1-2 segundos</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>5. Aplicar el estaño del lado opuesto</strong> a la punta del cautín. El estaño debe fundirse por contacto con el pad caliente, no con la punta.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>6. Retirar el estaño primero, luego el cautín</strong>. Tiempo total: 3-4 segundos por unión.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>7. No mover el componente</strong> hasta que el estaño solidifique (1-2 s). Una buena junta tiene forma de <strong>volcán brillante</strong>.
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>8. Cortar el sobrante</strong> del terminal con cortadora de electrónica, cerca de la junta.
                            </li>
                        </ol>

                        <div className="highlight" style={{ marginTop: '1rem' }}>
                            🏆 Regla de oro: <em>"calentar el pad, no el estaño"</em>. El estaño debe fluir por capilaridad sobre superficie caliente.
                        </div>
                    </section>
                )}

                {section === 'simulador' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>🎮 Simulador de soldadura</h2>
                            <p>Practicá la técnica controlando temperatura, tiempo y aplicación de estaño.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#4facfe' }}>⚙️ Cautín</h3>
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <label>Potencia: </label>
                                        <button className={`mat-btn ${watts === 30 ? 'active' : ''}`} onClick={() => setWatts(30)}>30 W</button>
                                        <button className={`mat-btn ${watts === 40 ? 'active' : ''}`} onClick={() => setWatts(40)}>40 W</button>
                                    </div>
                                    <button className="mat-btn" style={{ background: power ? '#f44336' : '#4caf50', width: '100%' }} onClick={() => setPower(!power)}>
                                        {power ? '⏻ Apagar' : '⏻ Encender'}
                                    </button>

                                    <div style={{ marginTop: '1rem', textAlign: 'center', padding: '1rem', background: '#000', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '2rem', color: tipTemp > 350 ? '#f44336' : tipTemp > 280 ? '#ff9800' : tipTemp > 100 ? '#ffeb3b' : '#666' }}>
                                            🌡️ {Math.round(tipTemp)} °C
                                        </div>
                                        <small style={{ color: tipTemp > 350 ? '#4caf50' : '#aaa' }}>
                                            {tipTemp < 100 ? 'Frío' : tipTemp < 280 ? 'Calentando...' : tipTemp < 350 ? 'Casi listo' : 'Listo para soldar ✅'}
                                        </small>
                                    </div>

                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <button className="mat-btn" onClick={limpiarPunta} disabled={!tipDirty}>🧽 Limpiar punta {tipDirty && '(sucia)'}</button>
                                        <button className="mat-btn" onClick={estanarPunta} disabled={tinned}>✨ Estañar punta {tinned && '✓'}</button>
                                    </div>

                                    {tipDirty && <div style={{ marginTop: '0.5rem', color: '#f44336', fontSize: '0.85rem' }}>⚠️ Punta oxidada: rendimiento reducido.</div>}
                                </div>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#ffeb3b' }}>🔧 Acciones de soldado</h3>
                                    <button
                                        className="mat-btn"
                                        style={{ width: '100%', marginBottom: '0.5rem', background: contact ? '#ff9800' : '#444' }}
                                        onMouseDown={() => setContact(true)}
                                        onMouseUp={() => setContact(false)}
                                        onMouseLeave={() => setContact(false)}
                                        onTouchStart={() => setContact(true)}
                                        onTouchEnd={() => setContact(false)}
                                        disabled={!power}
                                    >
                                        {contact ? `🔥 Apoyando... ${contactSeconds.toFixed(1)} s` : '👇 Mantener: Apoyar punta sobre pad'}
                                    </button>

                                    <button
                                        className="mat-btn"
                                        style={{ width: '100%', marginBottom: '0.5rem', background: solderApplied ? '#4caf50' : '#444' }}
                                        onClick={() => setSolderApplied(!solderApplied)}
                                        disabled={!contact}
                                    >
                                        🪙 {solderApplied ? 'Estaño aplicado ✓' : 'Aplicar estaño'}
                                    </button>

                                    <button className="mat-btn" style={{ width: '100%' }} onClick={reset}>↺ Reiniciar junta</button>
                                </div>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                    <h3 style={{ color: '#a855f7' }}>🔬 Junta soldada</h3>
                                    <div style={{ height: '160px', background: '#1a1a1a', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                        {/* PCB pad */}
                                        <div style={{ position: 'absolute', bottom: '40px', width: '60%', height: '8px', background: '#1a4d2e', borderRadius: '2px' }}></div>
                                        {/* Terminal */}
                                        <div style={{ position: 'absolute', bottom: '40px', width: '4px', height: '60px', background: '#888' }}></div>
                                        {/* Soldadura */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '44px',
                                            width: jointState === 'bueno' ? '40px' : jointState === 'puente' ? '80px' : '20px',
                                            height: jointState === 'bueno' ? '24px' : jointState === 'frio' ? '14px' : jointState === 'quemado' ? '30px' : '0',
                                            background: jointColor[jointState],
                                            borderRadius: jointState === 'bueno' ? '50% 50% 20% 20% / 80% 80% 20% 20%' : '4px',
                                            boxShadow: jointState === 'bueno' ? '0 0 12px rgba(192,192,192,0.6)' : 'none',
                                            transition: 'all 0.3s'
                                        }}></div>
                                        {/* Cautín */}
                                        {contact && (
                                            <div style={{ position: 'absolute', top: '10px', fontSize: '2.5rem', transform: 'rotate(-30deg)' }}>🖋️</div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '4px', width: '100%', textAlign: 'center', color: '#666', fontSize: '0.75rem' }}>PCB</div>
                                    </div>
                                    <div style={{ marginTop: '0.5rem', textAlign: 'center', fontWeight: 'bold', color: jointColor[jointState] }}>
                                        Estado: {jointState.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {feedback && (
                                <div className="highlight" style={{ marginTop: '1rem', textAlign: 'left' }}>
                                    {feedback}
                                </div>
                            )}
                        </section>

                        <section className="elec-card full-width">
                            <h3>📋 Cómo usar el simulador</h3>
                            <ol>
                                <li>Encendé el cautín y esperá que llegue a {'>'} 350°C.</li>
                                <li>Estañá la punta (capa fina protectora).</li>
                                <li>Mantené presionado <em>"Apoyar punta sobre pad"</em> durante 1-2 s para calentar.</li>
                                <li>Sin soltar el botón anterior, hacé clic en <em>"Aplicar estaño"</em>.</li>
                                <li>Soltá ambos. Una junta correcta = forma de volcán brillante.</li>
                            </ol>
                        </section>
                    </>
                )}

                {section === 'errores' && (
                    <section className="elec-card full-width">
                        <h2>⚠️ Errores comunes y cómo evitarlos</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>❄️ Soldadura fría</h3>
                                <p><strong>Síntoma:</strong> superficie opaca, granulada, agrietada.</p>
                                <p><strong>Causa:</strong> punta poco caliente o tiempo insuficiente.</p>
                                <p><strong>Solución:</strong> recalentar la junta y agregar un poco de estaño/flux fresco.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🔥 Junta quemada</h3>
                                <p><strong>Síntoma:</strong> pad despegado, componente decolorado, flux carbonizado.</p>
                                <p><strong>Causa:</strong> demasiado tiempo de contacto o cautín de potencia excesiva.</p>
                                <p><strong>Solución:</strong> usar 30-40 W en electrónica fina, máx. 4 s por junta.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🌉 Puente entre pads</h3>
                                <p><strong>Síntoma:</strong> exceso de estaño que une dos pistas.</p>
                                <p><strong>Causa:</strong> demasiado estaño o pads muy cercanos.</p>
                                <p><strong>Solución:</strong> retirar con malla de desoldar (wick) o bomba de succión.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🟫 Punta oxidada</h3>
                                <p><strong>Síntoma:</strong> punta negruzca, no acepta estaño, baja transferencia de calor.</p>
                                <p><strong>Causa:</strong> uso prolongado sin estañar, esponja seca.</p>
                                <p><strong>Solución:</strong> limpiar con esponja húmeda + estañar inmediatamente. Si está muy dañada, lijar suavemente y re-estañar.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>🧊 Movimiento durante enfriado</h3>
                                <p><strong>Síntoma:</strong> superficie agrietada o con "pelos".</p>
                                <p><strong>Causa:</strong> mover el componente antes de que el estaño solidifique.</p>
                                <p><strong>Solución:</strong> mantener firme 2 s después de retirar el cautín.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3 style={{ color: '#f44336' }}>💨 Quemar componentes sensibles</h3>
                                <p><strong>Síntoma:</strong> componentes (LED, IC) que no funcionan tras soldar.</p>
                                <p><strong>Causa:</strong> calor excesivo en patillas sensibles.</p>
                                <p><strong>Solución:</strong> usar zócalo (socket) para ICs y disipadores tipo cocodrilo en LEDs/diodos durante el soldado.</p>
                            </div>
                        </div>
                    </section>
                )}

                {section === 'desoldar' && (
                    <section className="elec-card full-width">
                        <h2>🔄 Desoldado: cómo retirar componentes</h2>
                        <p>Desoldar permite reparar placas, recuperar componentes o corregir errores de montaje.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#4facfe' }}>🥢 Bomba de desoldar (chupador)</h3>
                                <p>Dispositivo de succión a resorte. Se carga el émbolo, se calienta la junta con el cautín y al disparar absorbe el estaño líquido.</p>
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    <li>Cargar el émbolo (clic).</li>
                                    <li>Calentar la junta con el cautín hasta licuar el estaño.</li>
                                    <li>Apoyar la boquilla justo al lado y disparar.</li>
                                    <li>Limpiar la boquilla y repetir si queda residuo.</li>
                                </ol>
                                <p><strong>Tip:</strong> agregar un poco de estaño fresco antes de succionar facilita el proceso (renueva el flux).</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#a855f7' }}>🧶 Malla de desoldar (solder wick)</h3>
                                <p>Malla de cobre trenzada impregnada con flux. Por capilaridad absorbe el estaño fundido.</p>
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    <li>Apoyar la malla sobre la junta.</li>
                                    <li>Apoyar el cautín caliente sobre la malla.</li>
                                    <li>El estaño sube a la malla por capilaridad.</li>
                                    <li>Cortar el tramo usado y descartar.</li>
                                </ol>
                                <p><strong>Tip:</strong> ideal para limpiar puentes y restos finos en pads SMD.</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#ffeb3b' }}>♨️ Pistola de aire caliente</h3>
                                <p>Para componentes SMD: calienta uniformemente toda la zona hasta que todas las patillas se sueltan.</p>
                                <p><strong>Cuidado:</strong> proteger componentes vecinos con cinta Kapton, ajustar temperatura (300-350 °C) y caudal moderado.</p>
                            </div>

                            <div className="elec-card" style={{ padding: '1rem' }}>
                                <h3 style={{ color: '#f44336' }}>🚫 Lo que NO hay que hacer</h3>
                                <ul>
                                    <li>Tirar del componente con fuerza estando frío → despega pistas.</li>
                                    <li>Insistir más de 5-6 s sobre la misma junta → quema el sustrato (FR4).</li>
                                    <li>Reutilizar bomba sucia sin limpiar → traba el émbolo.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default SoldaduraPage;

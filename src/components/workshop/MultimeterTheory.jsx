import React from 'react';

const MultimeterTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Multímetro Digital</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                    <img
                        src="https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=600&h=400&fit=crop"
                        alt="Multímetro"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
            <p>
                El multímetro (o téster) es el instrumento de medición eléctrica más utilizado. Permite medir múltiples magnitudes fundamentales en un solo dispositivo mediante la selección de la escala adecuada.
            </p>

            <div className="grid-responsive-3col" style={{ marginTop: '2rem', gap: '1.5rem' }}>
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #ef4444' }}>
                    <h3 style={{ color: '#ef4444' }}>Voltaje (V)</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        Se mide en <strong>paralelo</strong> con el componente. Existe Voltaje Continuo (VDC ⎓) para baterías y Alterno (VAC ~) para redes domiciliarias.
                    </p>
                </div>
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #3b82f6' }}>
                    <h3 style={{ color: '#3b82f6' }}>Resistencia (Ω)</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        Se mide <strong>sin tensión</strong> en el circuito. El multímetro inyecta una pequeña corriente para calcular el valor según la Ley de Ohm.
                    </p>
                </div>
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #eab308' }}>
                    <h3 style={{ color: '#eab308' }}>Corriente (A)</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        Se mide en <strong>serie</strong>, abriendo el circuito para que la corriente pase a través del instrumento. Requiere cambiar la punta roja al borne de mA o 10A.
                    </p>
                </div>
            </div>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ color: 'var(--primary-color)' }}>Multímetro Digital (DMM)</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        Muestra el valor exacto en una pantalla LCD. Son más precisos, resistentes a golpes y fáciles de leer. Incluyen funciones automáticas (Auto-rango).
                    </p>
                </div>
                <div className="glass-card" style={{ margin: 0, borderLeft: '4px solid #ef4444' }}>
                    <h3 style={{ color: '#ef4444' }}>Tester Analógico (VOM)</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        Utiliza una aguja móvil. Son excelentes para observar tendencias o señales que varían rápidamente. Requieren que el usuario elija la escala correcta y lea el arco correspondiente.
                    </p>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444' }}>
                <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🚨 Guía: Cómo NO Quemar tu Multímetro
                </h3>
                <p style={{ fontWeight: 'bold' }}>Sigue estas pautas para proteger tu instrumento y tu seguridad:</p>

                <div className="grid-responsive-2col" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                    <div>
                        <h4 style={{ color: '#ef4444' }}>1. El Error del Voltaje en modo Ohm</h4>
                        <p style={{ fontSize: '0.85rem' }}>
                            <strong>Escenario:</strong> Pones el tester en escala de Resistencia (Ω) o Continuidad y mides un tomacorriente o batería.
                            <br /><strong>Consecuencia:</strong> El tester intentará inyectar corriente mientras recibe tensión externa. Suele quemar el fusible interno o el convertidor A/D.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: '#ef4444' }}>2. Amperaje sin Carga</h4>
                        <p style={{ fontSize: '0.85rem' }}>
                            <strong>Escenario:</strong> Conectas las puntas en modo Amperios (A) directamente a los bornes de una batería.
                            <br /><strong>Consecuencia:</strong> Creas un <strong>Cortocircuito</strong>. En modo Amperios, el tester tiene una resistencia interna casi nula.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: '#ef4444' }}>3. Puntas en el borne Incorrecto</h4>
                        <p style={{ fontSize: '0.85rem' }}>
                            <strong>Escenario:</strong> Dejas la punta roja en el borne de "10A" y mides voltaje (V).
                            <br /><strong>Consecuencia:</strong> Cortocircuito inmediato a través del tester. Siempre verifica que la punta roja esté en el borne "V/Ω" para mediciones comunes.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: '#ef4444' }}>4. Sobre-escala en Analógicos</h4>
                        <p style={{ fontSize: '0.85rem' }}>
                            <strong>Escenario:</strong> Medir 220V AC con la escala de 10V DC.
                            <br /><strong>Consecuencia:</strong> La aguja golpeará violentamente el tope derecho, pudiendo doblarse o dañar el mecanismo de bobina móvil.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultimeterTheory;

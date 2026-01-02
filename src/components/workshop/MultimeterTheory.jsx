import React from 'react';

const MultimeterTheory = () => {
    return (
        <div className="glass-card section-container">
            <h2>El Multímetro Digital</h2>
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

            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444' }}>
                <h3 style={{ color: '#ef4444' }}>⚠️ Seguridad Crítica</h3>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                    <li><strong>¡Nunca mida resistencia en un circuito con energía!</strong> Podría dañar el instrumento.</li>
                    <li>Sujete siempre las puntas por la parte aislada; nunca toque las puntas metálicas durante una medición.</li>
                    <li>Si no conoce el valor a medir, empiece siempre por la <strong>escala más alta</strong> para evitar sobrecargas.</li>
                </ul>
            </div>
        </div>
    );
};

export default MultimeterTheory;

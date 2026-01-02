import React from 'react';

const ElectronicsTools = () => {
    const tools = [
        {
            title: 'Soldador de Estaño (Cautín)',
            description: 'Instrumento para calentar y fundir la aleación de estaño en las uniones de componentes electrónicos.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Soldering_iron.jpg',
            use: 'Mantenga la punta limpia usando una esponja húmeda. Estaño de buena calidad (60/40) facilita el trabajo.'
        },
        {
            title: 'Bomba de Desoldar',
            description: 'Dispositivo de succión por vacío que retira el estaño fundido para desoldar componentes de una placa.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Solder_sucker.jpg',
            use: 'Cargue el émbolo, caliente la soldadura con el cautín y dispare la bomba sobre el estaño líquido.'
        },
        {
            title: 'Pinza de Precisión (Bruselas)',
            description: 'Pinzas finas para manipular componentes pequeños (SMD) y realizar puentes en circuitos electrónicos.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Tweezers.jpg',
            use: 'Existen de punta recta, curva y antiestáticas. Úselas para evitar daños por ESD en componentes sensibles.'
        },
        {
            title: 'Protoboard (Placa de Pruebas)',
            description: 'Tablero con orificios conectados internamente para realizar prototipos rápidos de circuitos sin necesidad de soldar.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Breadboard_with_components.jpg',
            use: 'Los terminales de los componentes no deben estar flojos. Use cables de calibre adecuado para no dañar los contactos.'
        },
        {
            title: 'Osciloscopio',
            description: 'Instrumento que permite visualizar señales eléctricas en el tiempo, mostrando voltajes y frecuencias gráficamente.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Oscilloscope.jpg',
            use: 'Asegúrese de conectar correctamente la masa (GND) para no crear cortocircuitos accidentales en la placa.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Herramientas de Electrónica</h2>
            <p style={{ marginBottom: '2rem' }}>
                La electrónica requiere precisión extrema y cuidado con la electricidad estática. Estas herramientas son esenciales en el laboratorio.
            </p>

            <div className="grid-responsive-2col">
                {tools.map((tool, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                            <img src={tool.img} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#a855f7', margin: '0 0 0.5rem 0' }}>{tool.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.description}</p>
                            <div style={{ background: 'rgba(168, 85, 247, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
                                <small><strong>🔬 Tip de precisión:</strong> {tool.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)' }}>
                <h3 style={{ color: '#a855f7' }}>Estación de Soldado</h3>
                <p>
                    Una buena soldadura debe ser <strong>brillante</strong> y tener forma de volcán. Si está opaca o granulada ("soldadura fría"), la conexión será deficiente y propensa a fallos mecánicos y eléctricos.
                </p>
            </div>
        </div>
    );
};

export default ElectronicsTools;

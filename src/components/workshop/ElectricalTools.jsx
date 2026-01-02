import React from 'react';

const ElectricalTools = () => {
    const tools = [
        {
            title: 'Pinza Universal',
            description: 'La herramienta más versátil del electricista. Permite sujetar, doblar, apretar y cortar cables conductores.',
            img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
            use: 'Verifique que el aislamiento de los mangos sea adecuado para la tensión de trabajo (ej. 1000V).'
        },
        {
            title: 'Alicate de Corte Diagonal',
            description: 'Diseñado específicamente para cortar cables y alambres de cobre o aluminio. Su forma permite cortar a ras de una superficie.',
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
            use: 'No intente cortar alambres de acero endurecido con un alicate común, ya que dañará el filo.'
        },
        {
            title: 'Buscapolo (Destornillador de Fase)',
            description: 'Dispositivo en forma de destornillador con una lámpara de neón que permite identificar si un conductor tiene tensión (fase).',
            img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
            use: 'Haga contacto con el dedo en la parte metálica superior y la punta en el conductor. La lámpara enciende si hay tensión.'
        },
        {
            title: 'Pelacables Automático',
            description: 'Herramienta que permite retirar el aislamiento plástico de los cables sin dañar los hilos de cobre interiores.',
            img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
            use: 'Ajuste la longitud de pelado necesaria y presione firmemente para un corte limpio.'
        },
        {
            title: 'Multímetro (Tester)',
            description: 'Instrumento para medir magnitudes eléctricas como voltaje (V), corriente (A) y resistencia (Ω).',
            img: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400&h=300&fit=crop',
            use: 'Seleccione siempre la escala adecuada antes de conectar las puntas. Empiece por la escala más alta si no está seguro.'
        },
        {
            title: 'Cinta Aisladora',
            description: 'Cinta de PVC con adhesivo sensible a la presión, utilizada para aislar empalmes de hilos y cables eléctricos.',
            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            use: 'Aplique la cinta estirándola ligeramente para que se adhiera con firmeza y cubra bien el cobre expuesto.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Herramientas de Electricidad</h2>
            <p style={{ marginBottom: '2rem' }}>
                La seguridad es la prioridad absoluta en las instalaciones eléctricas. Estas herramientas deben tener aislamientos certificados.
            </p>

            <div className="grid-responsive-2col">
                {tools.map((tool, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                            <img src={tool.img} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#eab308', margin: '0 0 0.5rem 0' }}>{tool.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.description}</p>
                            <div style={{ background: 'rgba(234, 179, 8, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #eab308' }}>
                                <small><strong>⚡ Tip de seguridad:</strong> {tool.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #eab308', background: 'rgba(234, 179, 8, 0.05)' }}>
                <h3 style={{ color: '#eab308' }}>5 Reglas de Oro</h3>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                    <li>Corte efectivo de todas las fuentes de tensión.</li>
                    <li>Prevenir cualquier posible realimentación (bloqueo).</li>
                    <li>Verificar la ausencia de tensión.</li>
                    <li>Puesta a tierra y en cortocircuito.</li>
                    <li>Señalización de la zona de trabajo.</li>
                </ol>
            </div>
        </div>
    );
};

export default ElectricalTools;
